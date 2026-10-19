"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper component for List View favorites to maintain independent state
export function FavoriteToggle({ initialFavorite }: { initialFavorite?: boolean }) {
  const [isFav, setIsFav] = useState(initialFavorite);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFav(!isFav);
      }}
      className="p-2 transition-transform active:scale-90"
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors",
          isFav ? "fill-red-500 text-red-500" : "text-muted-foreground/30",
        )}
      />
    </button>
  );
}
