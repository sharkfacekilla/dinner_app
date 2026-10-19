"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { visibleTo } from "@/lib/data/recipes";
import { idSchema, recipeSchema, usernameSchema, type RecipeInput } from "@/lib/validations/recipe";

// Every action starts with requireUser() (outside the try, so its redirect isn't swallowed)
// and validates its input: server actions are public endpoints, the UI isn't a security boundary.

export async function createRecipe(input: RecipeInput) {
  const user = await requireUser();

  const parsed = recipeSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid recipe" };
  }
  const data = parsed.data;

  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        ownerId: user.id,
        title: data.title,
        description: data.description,
        image: data.image,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        difficulty: data.difficulty,
        category: data.category,
        tags: data.tags,
        // Nested writes automatically handle the ID linking
        ingredients: { create: data.ingredients },
        instructions: { create: data.instructions },
      },
    });

    // Clear the cache so the new recipe shows up immediately on every page
    revalidatePath("/", "layout");

    return { success: true, id: newRecipe.id };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to create recipe" };
  }
}

export async function toggleFavorite(recipeId: string, isFavorite: boolean) {
  const user = await requireUser();
  if (!idSchema.safeParse(recipeId).success || typeof isFavorite !== "boolean") {
    return { success: false, error: "Invalid request" };
  }

  try {
    // You can only favorite recipes you can see
    const recipe = await prisma.recipe.findFirst({
      where: { AND: [{ id: recipeId }, visibleTo(user.id)] },
      select: { id: true },
    });
    if (!recipe) return { success: false, error: "Recipe not found" };

    const key = { userId_recipeId: { userId: user.id, recipeId } };
    if (isFavorite) {
      await prisma.favorite.upsert({ where: key, create: { userId: user.id, recipeId }, update: {} });
    } else {
      await prisma.favorite.deleteMany({ where: { userId: user.id, recipeId } });
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to update favorite" };
  }
}

export async function setRecipeShare(recipeId: string, username: string, shared: boolean) {
  const user = await requireUser();
  const id = idSchema.safeParse(recipeId);
  const name = usernameSchema.safeParse(username);
  if (!id.success || !name.success || typeof shared !== "boolean") {
    return { success: false, error: "Invalid request" };
  }

  try {
    // Only the owner can change who a recipe is shared with
    const recipe = await prisma.recipe.findFirst({
      where: { id: id.data, ownerId: user.id },
      select: { id: true },
    });
    if (!recipe) return { success: false, error: "Recipe not found" };

    const target = await prisma.user.findUnique({ where: { username: name.data }, select: { id: true } });
    if (!target || target.id === user.id) return { success: false, error: "User not found" };

    if (shared) {
      await prisma.recipeShare.upsert({
        where: { recipeId_userId: { recipeId: recipe.id, userId: target.id } },
        create: { recipeId: recipe.id, userId: target.id },
        update: {},
      });
    } else {
      await prisma.recipeShare.deleteMany({ where: { recipeId: recipe.id, userId: target.id } });
      // Their favorite on it goes too, since they can't see it anymore
      await prisma.favorite.deleteMany({ where: { recipeId: recipe.id, userId: target.id } });
    }

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to update sharing" };
  }
}
