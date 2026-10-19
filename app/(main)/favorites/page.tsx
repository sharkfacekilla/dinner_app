import { FavoritesPage } from "@/app/components/favoritespage";
import { getRecipes } from "@/lib/data/recipes";

export default async function Page() {
  const recipes = await getRecipes();
  return <FavoritesPage recipes={recipes} />;
}
