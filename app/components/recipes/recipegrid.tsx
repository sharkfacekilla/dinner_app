import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "../recipecard";
import type { Recipe } from "@/lib/recipes";

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4 2xl:grid-cols-5">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          footer={
            <Link href={`/recipes/${recipe.id}`} className="w-full">
              <Button className="w-full mt-3 h-8 text-xs sm:mt-4 sm:h-9 sm:text-sm">View Recipe</Button>
            </Link>
          }
        />
      ))}
    </div>
  );
}
