import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "../recipecard";
import type { Recipe } from "@/lib/recipes";

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          footer={
            <Link href={`/recipes/${recipe.id}`} className="w-full">
              <Button className="w-full mt-4 -mb-4 p-6">View Recipe</Button>
            </Link>
          }
        />
      ))}
    </div>
  );
}
