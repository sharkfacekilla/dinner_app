// Not wired up yet: you paused on validation ("too confusing for now").
// Use recipeSchema.safeParse(data) in lib/actions/recipe.ts when you are ready.

import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  image: z.string().url().optional().nullable().or(z.literal("")),
  prepTime: z.coerce.number().int().nonnegative().optional().nullable(),
  cookTime: z.coerce.number().int().nonnegative().optional().nullable(),
  servings: z.coerce.number().int().positive().optional().nullable(),
  difficulty: z.string().min(1, "Difficulty is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  ingredients: z.array(z.object({
    name: z.string().min(1),
    amount: z.string().optional(),
    unit: z.string().optional(),
  })),
  instructions: z.array(z.object({
    step: z.number(),
    text: z.string().min(1),
    tip: z.string().optional().nullable(),
  })),
});
