"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/recipes";
import { ChefHat, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleFavorite as saveFavorite } from "@/lib/actions/recipe";
import { ShareDialog } from "./sharedialog";

interface RecipeCardProps {
  recipe: Recipe
  onClick?: () => void
  footer?: React.ReactNode // Optional slot for a button/link (e.g. "View Recipe")
}

export function RecipeCard({ recipe, onClick, footer }: RecipeCardProps) {
  // Initialize state from the recipe data
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite)
  const totalTime = recipe.cookTime + recipe.prepTime

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the card's onClick from firing
    const next = !isFavorite
    setIsFavorite(next) // Update right away, roll back if the save fails
    const result = await saveFavorite(recipe.id, next)
    if (!result.success) setIsFavorite(!next)
  }

  return (
    <Card
      className="group cursor-pointer gap-0 overflow-hidden border-border/50 py-0 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-muted sm:aspect-[4/5]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <ChefHat className="h-10 w-10 text-muted-foreground/40 sm:h-16 sm:w-16" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        {/* Heart + Share Overlay */}
        <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-1 sm:top-3 sm:left-3">
          <button
            onClick={toggleFavorite}
            className="rounded-full bg-black/35 p-1.5 backdrop-blur-sm transition-all hover:bg-black/50 active:scale-90"
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-white/80"
              )}
            />
          </button>
          {recipe.isOwner && (
            <ShareDialog recipeId={recipe.id} sharedWith={recipe.sharedWith ?? []} variant="icon" />
          )}
        </div>

        <Badge
          variant="secondary"
          className="absolute top-2 right-2 max-w-[45%] truncate bg-card/90 text-[10px] text-card-foreground backdrop-blur-sm sm:top-3 sm:right-3 sm:max-w-none sm:text-xs"
        >
          {recipe.category}
        </Badge>
      </div>
      <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="mb-1 line-clamp-2 text-sm leading-snug font-semibold sm:mb-2 sm:text-lg text-card-foreground transition-colors group-hover:text-primary">
          {recipe.title}
        </h3>
        {!recipe.isOwner && recipe.ownerName && (
          <p className="mb-1 line-clamp-1 text-[11px] font-medium text-primary sm:-mt-1 sm:mb-2 sm:text-xs">Shared by {recipe.ownerName}</p>
        )}
        <p className="mb-2 line-clamp-2 text-xs text-muted-foreground sm:mb-3 sm:text-sm">
          {recipe.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground sm:gap-1.5 sm:text-sm">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{totalTime} min</span>
          </div>
          <Badge
            variant={
              recipe.difficulty === "Easy"
                ? "secondary"
                : recipe.difficulty === "Medium"
                ? "outline"
                : "destructive"
            }
            className="text-[10px] sm:text-xs"
          >
            {recipe.difficulty}
          </Badge>
        </div>
        {footer}
      </CardContent>
    </Card>
  )
}
