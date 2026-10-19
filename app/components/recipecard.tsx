"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Recipe } from "@/lib/recipes";
import { ChefHat, Clock, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecipeCardProps {
  recipe: Recipe
  onClick?: () => void
  footer?: React.ReactNode // Optional slot for a button/link (e.g. "View Recipe")
}

export function RecipeCard({ recipe, onClick, footer }: RecipeCardProps) {
  // Initialize state from the recipe data
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite)
  const totalTime = recipe.cookTime + recipe.prepTime

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent the card's onClick from firing
    setIsFavorite(!isFavorite)
    // TODO: call your API / Server Action here once favorites live in the database
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <ChefHat className="h-16 w-16 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

        {/* Heart Overlay */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 left-3 z-10 rounded-full p-1.5 transition-all hover:bg-black/10 active:scale-90"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-white/80"
            )}
          />
        </button>

        <Badge
          variant="secondary"
          className="absolute top-3 right-3 bg-card/90 text-card-foreground backdrop-blur-sm"
        >
          {recipe.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-card-foreground transition-colors group-hover:text-primary">
          {recipe.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
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
            className="text-xs"
          >
            {recipe.difficulty}
          </Badge>
        </div>
        {footer}
      </CardContent>
    </Card>
  )
}
