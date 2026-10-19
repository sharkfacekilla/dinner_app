"use client";

import { Clock, ChefHat } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recipe } from "@/lib/recipes";

interface RecipePreviewDialogProps {
  recipe: Recipe | null;
  open: boolean;
  isRandomPick: boolean;
  onPickAnother: () => void;
  onClose: () => void;
}

// Shared by the Dashboard and All Recipes pages (random pick + recipe preview)
export function RecipePreviewDialog({
  recipe,
  open,
  isRandomPick,
  onPickAnother,
  onClose,
}: RecipePreviewDialogProps) {
  // Locked modal: only the buttons can close it
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5 text-primary" />
            {isRandomPick
              ? `Your Recipe Pick, ${recipe?.title}!`
              : recipe?.title}
          </DialogTitle>
          <DialogDescription>
            {isRandomPick
              ? "Here's your randomly selected recipe"
              : "Recipe details and cooking instructions"}
          </DialogDescription>
        </DialogHeader>

        {recipe && (
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ChefHat className="h-16 w-16 text-muted-foreground/40" />
                </div>
              )}
            </div>
            <div>
              {isRandomPick && (
                <h3 className="mb-2 text-xl font-semibold">
                  {recipe.title}
                </h3>
              )}
              <p className="mb-4 text-sm text-muted-foreground">
                {recipe.description}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{recipe.category}</Badge>
                <Badge variant="outline">
                  <Clock className="mr-1 h-3 w-3" />
                  {recipe.cookTime + recipe.prepTime} min
                </Badge>
                <Badge
                  variant={
                    recipe.difficulty === "Easy"
                      ? "secondary"
                      : recipe.difficulty === "Medium"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1" asChild>
                <a href={`/recipes/${recipe.id}`}>Let&apos;s Cook!</a>
              </Button>
              {isRandomPick ? (
                <Button variant="outline" onClick={onPickAnother}>
                  Pick Another
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
