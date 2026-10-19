import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth/session";
import { visibleTo } from "@/lib/data/recipes";
import { idSchema } from "@/lib/validations/recipe";

// Serves an uploaded recipe photo. Same rule as the recipe itself:
// only the owner and people it's shared with can load it; everyone else gets 404.
export async function GET(_req: Request, ctx: RouteContext<"/images/[recipeId]">) {
  const user = await requireUser();
  const { recipeId } = await ctx.params;
  if (!idSchema.safeParse(recipeId).success) return new Response("Not found", { status: 404 });

  const image = await prisma.recipeImage.findFirst({
    where: { recipeId, recipe: visibleTo(user.id) },
    select: { data: true },
  });
  if (!image) return new Response("Not found", { status: 404 });

  return new Response(new Uint8Array(image.data), {
    headers: {
      "Content-Type": "image/jpeg",
      // URLs carry ?v=<updatedAt>, so a changed photo gets a new URL; private = browser cache only
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
