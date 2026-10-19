"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Printer,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookingManager } from "@/lib/hooks/useCookingManager";
import { RecipeHeader } from "./recipeheader";
import { RecipeStats } from "./recipestats";
import { CookingProgress } from "./cookingprogress";
import { IngredientList } from "./ingredientlist";
import { InstructionList } from "./instructionlist";
import type { Recipe } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { toggleFavorite } from "@/lib/actions/recipe";
import { ShareDialog } from "./sharedialog";

export function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [isFavorite, setIsFavorite] = useState(recipe.isFavorite);

  const handleFavorite = async () => {
    const next = !isFavorite;
    setIsFavorite(next); // Update right away, roll back if the save fails
    const result = await toggleFavorite(recipe.id, next);
    if (!result.success) setIsFavorite(!next);
  };

  const {
    completedSteps,
    setCompletedSteps,
    checkedIngredients,
    setCheckedIngredients,
    cookingMode,
    setCookingMode,
    progress,
  } = useCookingManager(recipe.id, recipe.instructions?.length || 0);

  return (
    <div className={`min-h-screen ${cookingMode ? "bg-card" : ""}`}>
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/recipes">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Recipes</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant={cookingMode ? "default" : "outline"}
              size="sm"
              onClick={() => setCookingMode(!cookingMode)}
              className="gap-2"
            >
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">
                {cookingMode ? "Exit Cooking Mode" : "Start Cooking"}
              </span>
            </Button>
            <ShareDialog
              recipeId={recipe.id}
              isOwner={Boolean(recipe.isOwner)}
              sharedWith={recipe.sharedWith ?? []}
            />
            <Button variant="ghost" size="icon" onClick={handleFavorite}>
              <Heart
                className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")}
              />
            </Button>
            {/* Prints the designed PDF rather than the web page */}
            <Button variant="ghost" size="icon" asChild>
              <a href={`/recipes/${recipe.id}/pdf?print=1`} target="_blank" rel="noopener" aria-label="Print">
                <Printer className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <RecipeHeader recipe={recipe} />
        <RecipeStats recipe={recipe} />

        {/* Main "Start Cooking Mode" call-to-action */}
        <div className="mb-8">
          <Button
            variant={cookingMode ? "destructive" : "default"}
            size="lg"
            onClick={() => setCookingMode(!cookingMode)}
            className={`
              w-full h-14 text-lg font-bold gap-3 rounded-xl transition-all duration-300 shadow-md
              ${!cookingMode ? "bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:scale-[1.01]" : "hover:shadow-destructive/20"}
            `}
          >
            {cookingMode ? (
              <>
                <UtensilsCrossed className="h-6 w-6" />
                Stop Cooking
              </>
            ) : (
              <>
                <Sparkles className="h-6 w-6 animate-pulse" />
                Start Cooking Mode
              </>
            )}
          </Button>
          {!cookingMode && (
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Keep your screen on and track your progress while you cook
            </p>
          )}
        </div>

        {cookingMode && (
          <CookingProgress
            progress={progress}
            completedCount={completedSteps.length}
            totalCount={recipe.instructions?.length || 0}
          />
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <IngredientList
            ingredients={recipe.ingredients}
            checkedIngredients={checkedIngredients}
            onToggle={setCheckedIngredients}
          />
          <InstructionList
            instructions={recipe.instructions}
            completedSteps={completedSteps}
            cookingMode={cookingMode}
            onToggle={setCompletedSteps}
            recipeTitle={recipe.title}
          />
        </div>
      </div>
    </div>
  );
}
