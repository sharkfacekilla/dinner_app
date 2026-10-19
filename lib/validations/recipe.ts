// Server-side validation for everything the recipe actions accept.
// The browser can send anything, so types and sizes are checked here, not just in the form.
import { z } from "zod";

const optionalText = (max: number) =>
  z.string().trim().max(max).nullish().transform((v) => v || null);

const optionalInt = (max: number) => z.number().int().min(0).max(max).nullish().transform((v) => v ?? null);

export const recipeSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: optionalText(2000),
  prepTime: optionalInt(10_000),
  cookTime: optionalInt(10_000),
  servings: optionalInt(1_000),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).nullish().transform((v) => v ?? null),
  category: optionalText(50),
  tags: z.array(z.string().trim().min(1).max(50)).max(30),
  ingredients: z
    .array(
      z.object({
        name: z.string().trim().min(1).max(200),
        amount: optionalText(50),
        unit: optionalText(50),
      }),
    )
    .max(200),
  instructions: z
    .array(
      z.object({
        step: z.number().int().min(1).max(500),
        text: z.string().trim().min(1).max(5000),
        tip: optionalText(1000),
      }),
    )
    .max(200),
});

export type RecipeInput = z.input<typeof recipeSchema>;

// cuid ids: short and alphanumeric
export const idSchema = z.string().regex(/^[a-z0-9]{1,40}$/);
export const usernameSchema = z.string().trim().toLowerCase().regex(/^[a-z0-9_-]{1,50}$/);
