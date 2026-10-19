"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

type IngredientData = { name: string; amount?: string | null; unit?: string | null };
type InstructionData = { step: number; text: string; tip?: string | null };

export type CreateRecipeData = {
  title: string;
  description: string | null;
  image: string | null;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  difficulty: string | null;
  category: string | null;
  tags: string[];
  ingredients: IngredientData[];
  instructions: InstructionData[];
};

export async function createRecipe(data: CreateRecipeData) {
  try {
    const newRecipe = await prisma.recipe.create({
      data: {
        title: data.title,
        description: data.description || null,
        image: data.image || null,
        prepTime: data.prepTime || null,
        cookTime: data.cookTime || null,
        servings: data.servings || null,
        difficulty: data.difficulty || null,
        category: data.category || null,
        tags: data.tags,
        // Nested writes automatically handle the ID linking
        ingredients: {
          create: data.ingredients.map((ing) => ({
            name: ing.name,
            amount: ing.amount || null,
            unit: ing.unit || null,
          })),
        },
        instructions: {
          create: data.instructions.map((inst) => ({
            step: inst.step,
            text: inst.text,
            tip: inst.tip || null,
          })),
        },
      },
    });

    // Clear the cache so the new recipe shows up immediately
    revalidatePath("/recipes");

    return { success: true, id: newRecipe.id };
  } catch (error) {
    console.error("Database Error:", error);
    return { success: false, error: "Failed to create recipe" };
  }
}
