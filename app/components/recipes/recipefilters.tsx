import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FilterSetters, FilterState } from "@/lib/hooks/useRecipesFilter";

interface RecipeFiltersProps {
  state: FilterState;
  setters: FilterSetters;
  onClear: () => void;
  categories: readonly string[];
  difficulties: readonly string[];
}

export function RecipeFilters({
  state,
  setters,
  onClear,
  categories,
  difficulties,
}: RecipeFiltersProps) {
  const { searchQuery, selectedCategory, selectedDifficulty } = state;
  const activeFiltersCount = [
    selectedCategory !== "All",
    selectedDifficulty !== "All",
  ].filter(Boolean).length;

  return (
    <div className="grid flex-1 grid-cols-2 gap-2 sm:flex sm:flex-row sm:items-center sm:gap-3">
      <div className="relative col-span-2 flex-1 sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setters.setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        value={selectedCategory}
        onValueChange={setters.setSelectedCategory}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category: string) => (
            <SelectItem key={category} value={category}>
              {category === "All" ? "All categories" : category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={selectedDifficulty}
        onValueChange={setters.setSelectedDifficulty}
      >
        <SelectTrigger className="w-full sm:w-[150px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          {difficulties.map((difficulty: string) => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty === "All" ? "All difficulties" : difficulty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {(activeFiltersCount > 0 || searchQuery) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="col-span-2 gap-1.5 text-muted-foreground hover:text-foreground sm:col-span-1"
        >
          <X className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  );
}
