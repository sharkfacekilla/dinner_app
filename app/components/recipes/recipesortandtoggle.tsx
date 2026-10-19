import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { SortOption } from "@/lib/hooks/useRecipesFilter";

export type ViewMode = "grid" | "list";

interface RecipeSortAndToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
}

export function RecipeSortAndToggle({
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
}: RecipeSortAndToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sortBy}
            onValueChange={(v) => setSortBy(v as SortOption)}
          >
            <DropdownMenuRadioItem value="newest">
              Newest First
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="oldest">
              Oldest First
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-asc">
              Name (A-Z)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="name-desc">
              Name (Z-A)
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="time-asc">
              Quickest First
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="time-desc">
              Longest First
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center rounded-md border border-input bg-background p-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-7 w-7 p-0", viewMode === "grid" && "bg-muted")}
          onClick={() => setViewMode("grid")}
        >
          <Grid3X3 className="h-4 w-4" />
          <span className="sr-only">Grid view</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-7 w-7 p-0", viewMode === "list" && "bg-muted")}
          onClick={() => setViewMode("list")}
        >
          <List className="h-4 w-4" />
          <span className="sr-only">List view</span>
        </Button>
      </div>
    </div>
  );
}
