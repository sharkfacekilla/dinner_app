import { useState } from "react";
import type { Recipe } from "@/lib/recipes";

// State for the recipe preview popup: open it for a random pick or a specific recipe
export function useRecipePreview(recipes: Recipe[]) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRandomPick, setIsRandomPick] = useState(false);

  const pickRandom = () => {
    if (recipes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setSelectedRecipe(recipes[randomIndex]);
    setIsRandomPick(true);
    setIsDialogOpen(true);
  };

  const viewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRandomPick(false);
    setIsDialogOpen(true);
  };

  const dialogProps = {
    recipe: selectedRecipe,
    open: isDialogOpen,
    isRandomPick,
    onPickAnother: pickRandom,
    onClose: () => setIsDialogOpen(false),
  };

  return { pickRandom, viewRecipe, dialogProps };
}
