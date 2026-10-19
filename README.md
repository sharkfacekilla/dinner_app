# Decide My Dinner

Self-hosted recipe app (working title) for the homelab. Rebuilt from the Gemini chat history.

**Stack:** Next.js 16.4.2 (App Router, Turbopack) · React 19 · Tailwind v4 · shadcn/ui · next-themes · Prisma 7.8 + PostgreSQL (`@prisma/adapter-pg`)

## Getting started

```bash
cp .env.example .env        # then set a real password: openssl rand -hex 32
npm install                 # also runs `prisma generate` (postinstall)
npm run db:up               # docker compose up -d  (Postgres 15, localhost only)
npm run db:migrate          # apply migrations + regenerate the Prisma client
npm run user -- add <name>  # create your account (asks for a password)
npm run db:seed -- <name>   # optional: 12 sample recipes for that account (replaces its recipes)
npm run dev                 # http://localhost:3000
```

Pages read from Postgres (`lib/data/recipes.ts`). `lib/mock-data.ts` only holds the category/difficulty lists and the sample recipes used by the seed.

## Accounts and security

- Accounts exist only through the CLI: `npm run user -- add|passwd|remove <name>`, `npm run user -- list`. There is no sign-up or password reset on the website.
- Recipes are private to their owner. The owner can share a recipe with specific people (Share button on the recipe page); they can view and favorite it, not change it. Favorites are per person.
- Every page, data function and server action checks the session (`requireUser()` in `lib/auth/session.ts`); `proxy.ts` only does a convenience redirect plus the CSP nonce.
- Passwords: scrypt (`lib/auth/password.ts`), minimum 8 characters. Sessions: random token in an HttpOnly/Secure cookie, only its SHA-256 stored in the `Session` table; 14 days. `passwd` logs that account out everywhere.
- Login: 5 failures per username or address in 15 minutes blocks further tries for that window.
- Server action input is validated with Zod (`lib/validations/recipe.ts`).
- Headers: strict nonce-based CSP (`proxy.ts`), plus nosniff, frame DENY, no-referrer, HSTS etc. (`next.config.ts`).
- Production needs HTTPS (the session cookie is Secure); browsers make an exception for `http://localhost`.

## Layout

| Path | What |
| --- | --- |
| `app/layout.tsx` | html/body, theme provider (gets the CSP nonce) |
| `app/(main)/layout.tsx` | Logged-in area: tooltip + sidebar providers, sidebar + `<main>` |
| `app/login/` | Login page |
| `app/globals.css` | Warm-brown/orange oklch theme (light + dark), sidebar hover overrides |
| `app/components/sidebar.tsx` | Collapsible icon sidebar, nav, light/dark toggle, log out |
| `app/components/dashboard.tsx` | Dashboard, random pick, locked recipe dialog |
| `app/components/recipecard.tsx` | Card with favorite heart + optional `footer` slot |
| `app/components/randomrecipebutton.tsx` | Animated dice button (icon-only on mobile) |
| `app/components/recipespage.tsx`, `favoritespage.tsx` | List pages built from `app/components/recipes/*` |
| `app/components/recipedetail.tsx` (+ `recipeheader`, `recipestats`, `cookingprogress`, `ingredientlist`, `instructionlist`) | Recipe page with cooking mode |
| `app/components/createrecipeform.tsx` (+ `recipes/recipebasicinfo`, `recipeingredientlist`, `recipeinstructionlist`) | New recipe form |
| `lib/hooks/useCookingManager.ts` | Cooking mode, screen wake lock, progress |
| `lib/hooks/useRecipesFilter.ts` | Search / filter / sort (+ favorites only) |
| `lib/data/recipes.ts` | `getRecipes` / `getRecipe` / `getOtherUsers`; all reads filtered to what the user may see |
| `lib/actions/recipe.ts` | `createRecipe`, `toggleFavorite`, `setRecipeShare` server actions |
| `lib/actions/auth.ts` | `login`, `logout` |
| `lib/auth/` | Password hashing, sessions (`requireUser`), login rate limit |
| `scripts/user.ts` | Account CLI |
| `proxy.ts` | CSP nonce + redirect to /login |
| `lib/prisma.ts` | Prisma client singleton with the pg adapter |
| `prisma/schema.prisma` | Recipe, Ingredient, Instruction, User, Session, Favorite, RecipeShare |
| `prisma/seed.ts` | Seeds the sample recipes |
