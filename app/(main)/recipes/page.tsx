import { RecipesPage } from "@/app/components/recipespage";
import { getRecipes } from "@/lib/data/recipes";

export default async function Page() {
  const recipes = await getRecipes();
  return <RecipesPage recipes={recipes} />;
}
