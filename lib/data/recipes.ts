import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/app/generated/prisma/client";
import { requireUser } from "@/lib/auth/session";
import type { Recipe } from "@/lib/recipes";

// Who may see a recipe: its owner, or someone it was shared with.
// Every read goes through this, so there's one place the rule lives.
export function visibleTo(userId: string): Prisma.RecipeWhereInput {
  return { OR: [{ ownerId: userId }, { shares: { some: { userId } } }] };
}

const withRelations = (userId: string) =>
  ({
    ingredients: { orderBy: { id: "asc" } },
    instructions: { orderBy: { step: "asc" } },
    owner: { select: { username: true } },
    favorites: { where: { userId }, select: { userId: true } },
    shares: { select: { user: { select: { username: true } } } },
  }) satisfies Prisma.RecipeInclude;

type DbRecipe = Prisma.RecipeGetPayload<{ include: ReturnType<typeof withRelations> }>;

// The DB allows nulls (the form fields are optional), the UI type doesn't.
// Fill in safe defaults here so the components don't have to.
function toRecipe(r: DbRecipe, userId: string): Recipe {
  const isOwner = r.ownerId === userId;
  return {
    id: r.id,
    title: r.title,
    description: r.description ?? "",
    image: r.image ?? undefined,
    cookTime: r.cookTime ?? 0,
    prepTime: r.prepTime ?? 0,
    difficulty: (r.difficulty ?? "Easy") as Recipe["difficulty"],
    category: r.category ?? "Other",
    createdAt: r.createdAt,
    servings: r.servings ?? 1,
    tags: r.tags,
    isFavorite: r.favorites.length > 0,
    isOwner,
    ownerName: r.owner.username,
    // Only the owner gets to see who else has it
    sharedWith: isOwner ? r.shares.map((s) => s.user.username) : undefined,
    ingredients: r.ingredients.map((i) => ({
      name: i.name,
      amount: i.amount ?? "",
      unit: i.unit ?? "",
    })),
    instructions: r.instructions.map((s) => ({
      step: s.step,
      text: s.text,
      tip: s.tip ?? undefined,
    })),
  };
}

export async function getRecipes(): Promise<Recipe[]> {
  const user = await requireUser();
  const recipes = await prisma.recipe.findMany({
    where: visibleTo(user.id),
    include: withRelations(user.id),
    orderBy: { createdAt: "desc" },
  });
  return recipes.map((r) => toRecipe(r, user.id));
}

// Returns null both for "doesn't exist" and "not yours", so nobody can probe for other people's recipes
export async function getRecipe(id: string): Promise<Recipe | null> {
  const user = await requireUser();
  const recipe = await prisma.recipe.findFirst({
    where: { AND: [{ id }, visibleTo(user.id)] },
    include: withRelations(user.id),
  });
  return recipe ? toRecipe(recipe, user.id) : null;
}

// Everyone you could share a recipe with (all accounts except yours)
export async function getOtherUsers(): Promise<string[]> {
  const user = await requireUser();
  const users = await prisma.user.findMany({
    where: { id: { not: user.id } },
    select: { username: true },
    orderBy: { username: "asc" },
  });
  return users.map((u) => u.username);
}
