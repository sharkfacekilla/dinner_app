// Loads the sample recipes from lib/mock-data.ts into one user's account.
// Run with `npm run db:seed -- <username>` (defaults to the oldest account).
// Replaces that user's recipes only, so it's safe to re-run.
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { mockRecipes } from "../lib/mock-data";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const username = process.argv[2];
  const owner = username
    ? await prisma.user.findUnique({ where: { username } })
    : await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!owner) {
    throw new Error(
      username ? `No user "${username}"` : "No users yet. Create one first: npm run user -- add <username>",
    );
  }

  await prisma.recipe.deleteMany({ where: { ownerId: owner.id } }); // ingredients/instructions cascade

  for (const r of mockRecipes) {
    await prisma.recipe.create({
      data: {
        ownerId: owner.id,
        title: r.title,
        description: r.description,
        image: r.image,
        prepTime: r.prepTime,
        cookTime: r.cookTime,
        servings: r.servings,
        difficulty: r.difficulty,
        category: r.category,
        tags: r.tags,
        favorites: r.isFavorite ? { create: { userId: owner.id } } : undefined,
        createdAt: r.createdAt,
        ingredients: { create: r.ingredients },
        instructions: { create: r.instructions },
      },
    });
  }

  console.log(`Seeded ${mockRecipes.length} recipes for "${owner.username}"`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
