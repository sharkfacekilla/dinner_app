"use client";

import { useState } from "react";
import { useRecipesFilter } from "@/lib/hooks/useRecipesFilter";
import { categories, difficulties } from "@/lib/mock-data";
import { RecipeFilters } from "./recipes/recipefilters";
import { RecipesHeader } from "./recipes/recipepageheader";
import { ActiveFilterBadges } from "./recipes/activefilterbadge";
import {
  RecipeSortAndToggle,
  type ViewMode,
} from "./recipes/recipesortandtoggle";
import { EmptyState } from "./recipes/emptystate";
import { RecipeGrid } from "./recipes/recipegrid";
import { RecipeList } from "./recipes/recipelist";
import type { Recipe } from "@/lib/recipes";
import { useRecipePreview } from "@/lib/hooks/useRecipePreview";
import { RandomRecipeButton } from "./randomrecipebutton";
import { RecipePreviewDialog } from "./recipepreviewdialog";

export function RecipesPage({ recipes }: { recipes: Recipe[] }) {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const { state, setters, filteredAndSortedRecipes, clearFilters } =
    useRecipesFilter(recipes);
  // Picks from the recipes currently listed, so filters narrow the random pick
  const { pickRandom, dialogProps } = useRecipePreview(filteredAndSortedRecipes);

  return (
    <div className="flex flex-1 flex-col">
      <RecipesHeader
        count={filteredAndSortedRecipes.length}
        action={<RandomRecipeButton onPick={pickRandom} />}
      />

      <div className="border-b border-border bg-card/50 px-4 py-3 sm:px-6 sm:py-4">
        {/* Filters and Sort/Toggle share one responsive row */}
        <div className="flex flex-col gap-2 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <RecipeFilters
            state={state}
            setters={setters}
            onClear={clearFilters}
            categories={categories}
            difficulties={difficulties}
          />
          <RecipeSortAndToggle
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={state.sortBy}
            setSortBy={setters.setSortBy}
          />
        </div>
        {/* Active badges sit on their own line, only when filters are active */}
        <ActiveFilterBadges state={state} setters={setters} />
      </div>

      <main className="flex-1 overflow-auto p-4 sm:p-6">
        {filteredAndSortedRecipes.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : viewMode === "grid" ? (
          <RecipeGrid recipes={filteredAndSortedRecipes} />
        ) : (
          <RecipeList recipes={filteredAndSortedRecipes} />
        )}
      </main>

      <RecipePreviewDialog {...dialogProps} />
    </div>
  );
}
