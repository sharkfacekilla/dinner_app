import { Dashboard } from "@/app/components/dashboard";
import { getRecipes } from "@/lib/data/recipes";

export default async function Home() {
  const recipes = await getRecipes();
  return <Dashboard recipes={recipes} />;
}
