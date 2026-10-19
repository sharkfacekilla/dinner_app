import { notFound } from "next/navigation";
import { RecipeDetail } from "../../components/recipedetail";
import { mockRecipes } from "@/lib/mock-data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = mockRecipes.find((r) => r.id === id);

  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
