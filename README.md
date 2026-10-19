# Decide My Dinner

Self-hosted recipe app (working title) for the homelab. Rebuilt from the Gemini chat history.

**Stack:** Next.js 16.2.4 (App Router, Turbopack) · React 19 · Tailwind v4 · shadcn/ui · next-themes · Prisma 7.8 + PostgreSQL (`@prisma/adapter-pg`)

## Getting started

```bash
cp .env.example .env        # DATABASE_URL for the local Postgres container
npm install                 # also runs `prisma generate` (postinstall)
npm run db:up               # docker compose up -d  (Postgres 15)
npm run db:migrate          # prisma migrate dev  (creates prisma/migrations)
npm run dev                 # http://localhost:3000
```

The UI still runs on mock data (`lib/mock-data.ts`), so the database is only needed for **Save Recipe** on `/recipes/new`.

## Layout

| Path | What |
| --- | --- |
| `app/layout.tsx` | Theme provider, tooltip + sidebar providers, sidebar + `<main>` |
| `app/globals.css` | Warm-brown/orange oklch theme (light + dark), sidebar hover overrides |
| `app/components/sidebar.tsx` | Collapsible icon sidebar, nav, light/dark toggle |
| `app/components/dashboard.tsx` | Dashboard, random pick, locked recipe dialog |
| `app/components/recipecard.tsx` | Card with favorite heart + optional `footer` slot |
| `app/components/randomrecipebutton.tsx` | Animated dice button (icon-only on mobile) |
| `app/components/recipespage.tsx`, `favoritespage.tsx` | List pages built from `app/components/recipes/*` |
| `app/components/recipedetail.tsx` (+ `recipeheader`, `recipestats`, `cookingprogress`, `ingredientlist`, `instructionlist`) | Recipe page with cooking mode |
| `app/components/createrecipeform.tsx` (+ `recipes/recipebasicinfo`, `recipeingredientlist`, `recipeinstructionlist`) | New recipe form |
| `lib/hooks/useCookingManager.ts` | Cooking mode, screen wake lock, progress |
| `lib/hooks/useRecipesFilter.ts` | Search / filter / sort (+ favorites only) |
| `lib/actions/recipe.ts` | `createRecipe` server action (Prisma) |
| `lib/prisma.ts` | Prisma client singleton with the pg adapter |
| `prisma/schema.prisma` | Recipe, Ingredient, Instruction |
