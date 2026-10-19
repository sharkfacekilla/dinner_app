import { useState, useMemo } from "react";
import type { Recipe } from "@/lib/recipes";

export type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "time-asc"
  | "time-desc";

export interface FilterState {
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
  sortBy: SortOption;
}

export interface FilterSetters {
  setSearchQuery: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  setSelectedDifficulty: (value: string) => void;
  setSortBy: (value: SortOption) => void;
}

// Pass `true` to only show favorites (used by the Favorites page)
export function useRecipesFilter(recipes: Recipe[], onlyFavorites: boolean = false) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = [...recipes].filter((recipe) => {
      if (onlyFavorites && !recipe.isFavorite) return false;

      const matchesSearch = recipe.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || recipe.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" ||
        recipe.difficulty === selectedDifficulty;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });

    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "time-asc":
        filtered.sort(
          (a, b) => a.cookTime + a.prepTime - (b.cookTime + b.prepTime),
        );
        break;
      case "time-desc":
        filtered.sort(
          (a, b) => b.cookTime + b.prepTime - (a.cookTime + a.prepTime),
        );
        break;
    }

    return filtered;
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty, sortBy, onlyFavorites]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSearchQuery("");
  };

  return {
    state: { searchQuery, selectedCategory, selectedDifficulty, sortBy } as FilterState,
    setters: {
      setSearchQuery,
      setSelectedCategory,
      setSelectedDifficulty,
      setSortBy,
    } as FilterSetters,
    filteredAndSortedRecipes,
    clearFilters,
    activeFiltersCount: [
      selectedCategory !== "All",
      selectedDifficulty !== "All",
    ].filter(Boolean).length,
  };
}
