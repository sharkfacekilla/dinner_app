import { renderToBuffer } from "@react-pdf/renderer";
import { prisma } from "@/lib/prisma";
import { getRecipe } from "@/lib/data/recipes";
import { RecipeDocument } from "@/lib/pdf/recipe-document";
import { idSchema } from "@/lib/validations/recipe";

// The recipe as a PDF. ?print=1 opens it in the browser (for printing) instead of downloading.
// getRecipe() requires a login and only returns recipes you own or that were shared with you.
export async function GET(req: Request, ctx: RouteContext<"/recipes/[id]/pdf">) {
  const { id } = await ctx.params;
  if (!idSchema.safeParse(id).success) return new Response("Not found", { status: 404 });

  const recipe = await getRecipe(id);
  if (!recipe) return new Response("Not found", { status: 404 });

  const photo = recipe.hasPhoto
    ? (await prisma.recipeImage.findUnique({ where: { recipeId: id }, select: { data: true } }))?.data ?? null
    : null;

  const pdf = await renderToBuffer(RecipeDocument({ recipe, photo }));

  // ASCII-only file name, e.g. "classic-margherita-pizza.pdf"
  const slug =
    recipe.title
      .normalize("NFKD")
      .replace(/[^\w\s-]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "-")
      .slice(0, 80) || "recipe";
  const disposition = new URL(req.url).searchParams.has("print") ? "inline" : "attachment";

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${disposition}; filename="${slug}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
