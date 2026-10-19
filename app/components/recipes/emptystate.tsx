import { ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ChefHat className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        No recipes found
      </h3>
      <p className="mb-4 max-w-sm text-sm text-muted-foreground">
        Try adjusting your search or filters to find what you&apos;re
        looking for.
      </p>
      <Button variant="outline" onClick={onClear}>
        Clear all filters
      </Button>
    </div>
  );
}
