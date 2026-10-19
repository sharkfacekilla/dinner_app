import Link from "next/link";
import { ChefHat, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteToggle } from "./favoritetoggle";
import type { Recipe } from "@/lib/recipes";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="space-y-3">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="group flex flex-col sm:flex-row cursor-pointer gap-4 rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md relative"
        >
          {/* List View Favorite Toggle */}
          <div className="absolute top-2 right-2 z-10">
            <FavoriteToggle initialFavorite={recipe.isFavorite} />
          </div>
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <ChefHat className="h-8 w-8 text-muted-foreground/40" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="mb-1 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                {recipe.title}
              </h3>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {recipe.description}
              </p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {recipe.category}
              </Badge>
              <Badge variant="outline" className="gap-1 text-xs">
                <Clock className="h-3 w-3" />
                {recipe.cookTime + recipe.prepTime} min
              </Badge>
              <Badge
                variant={
                  recipe.difficulty === "Easy"
                    ? "secondary"
                    : recipe.difficulty === "Medium"
                      ? "outline"
                      : "destructive"
                }
                className="text-xs"
              >
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center sm:pl-4">
            <Link href={`/recipes/${recipe.id}`} className="w-full sm:w-auto">
              <Button className="w-full pt-6 pb-6 pe-4 ps-4">View Recipe</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
