import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { FilterSetters, FilterState } from "@/lib/hooks/useRecipesFilter";

export function ActiveFilterBadges({
  state,
  setters,
}: {
  state: FilterState;
  setters: FilterSetters;
}) {
  const { searchQuery, selectedCategory, selectedDifficulty } = state;
  const hasFilters =
    searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All";

  if (!hasFilters) return null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {searchQuery && (
        <Badge variant="secondary" className="gap-1">
          Search: {searchQuery}
          <button
            onClick={() => setters.setSearchQuery("")}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {selectedCategory !== "All" && (
        <Badge variant="secondary" className="gap-1">
          {selectedCategory}
          <button
            onClick={() => setters.setSelectedCategory("All")}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {selectedDifficulty !== "All" && (
        <Badge variant="secondary" className="gap-1">
          {selectedDifficulty}
          <button
            onClick={() => setters.setSelectedDifficulty("All")}
            className="ml-1 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}
