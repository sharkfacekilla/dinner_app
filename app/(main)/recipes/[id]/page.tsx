import { notFound } from "next/navigation";
import { RecipeDetail } from "@/app/components/recipedetail";
import { getRecipe } from "@/lib/data/recipes";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
