import Link from "next/link";
import { ChefHat, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteToggle } from "./favoritetoggle";
import { ShareDialog } from "../sharedialog";
import type { Recipe } from "@/lib/recipes";

export function RecipeList({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="space-y-3">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="group relative flex cursor-pointer flex-wrap gap-3 rounded-xl border border-border/50 bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md sm:flex-nowrap sm:gap-4 sm:p-4"
        >
          {/* List View Favorite Toggle */}
          <div className="absolute top-2 right-2 z-10 flex items-center">
            <ShareDialog
              recipeId={recipe.id}
              isOwner={Boolean(recipe.isOwner)}
              sharedWith={recipe.sharedWith ?? []}
              variant="icon"
              tone="muted"
            />
            <FavoriteToggle recipeId={recipe.id} initialFavorite={recipe.isFavorite} />
          </div>
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-24">
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
          <div className="flex min-w-0 flex-1 flex-col justify-between pr-16">
            <div>
              <h3 className="mb-1 font-semibold text-card-foreground transition-colors group-hover:text-primary">
                {recipe.title}
              </h3>
              {!recipe.isOwner && recipe.ownerName && (
                <p className="mb-1 text-xs font-medium text-primary">Shared by {recipe.ownerName}</p>
              )}
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
          <div className="flex w-full items-center sm:w-auto sm:pl-4">
            <Link href={`/recipes/${recipe.id}`} className="w-full sm:w-auto">
              <Button className="h-8 w-full text-xs sm:h-auto sm:pt-6 sm:pb-6 sm:pe-4 sm:ps-4 sm:text-sm">View Recipe</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
