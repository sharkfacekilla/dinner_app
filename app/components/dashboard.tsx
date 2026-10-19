"use client";

import { useState } from "react";
import { Clock, ChefHat } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./recipecard";
import { RandomRecipeButton } from "./randomrecipebutton";
import { Recipe } from "@/lib/recipes";
import { mockRecipes } from "@/lib/mock-data";

export function Dashboard() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRandomPick, setIsRandomPick] = useState(false);

  const handleRandomPick = () => {
    const randomIndex = Math.floor(Math.random() * mockRecipes.length);
    setSelectedRecipe(mockRecipes[randomIndex]);
    setIsRandomPick(true);
    setIsDialogOpen(true);
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsRandomPick(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, Chef!</p>
          </div>
          <RandomRecipeButton onPick={handleRandomPick} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6">
        <section className="mb-8">
          <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                <ChefHat className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {"Can't decide what to cook?"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Let us pick a random recipe for you!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Recently Added
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              View All
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => handleViewRecipe(recipe)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Locked modal: only the buttons can close it */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-md"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-primary" />
              {isRandomPick
                ? `Your Recipe Pick, ${selectedRecipe?.title}!`
                : selectedRecipe?.title}
            </DialogTitle>
            <DialogDescription>
              {isRandomPick
                ? "Here's your randomly selected recipe"
                : "Recipe details and cooking instructions"}
            </DialogDescription>
          </DialogHeader>

          {selectedRecipe && (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                {selectedRecipe.image ? (
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
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
                    {selectedRecipe.title}
                  </h3>
                )}
                <p className="mb-4 text-sm text-muted-foreground">
                  {selectedRecipe.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedRecipe.category}</Badge>
                  <Badge variant="outline">
                    <Clock className="mr-1 h-3 w-3" />
                    {selectedRecipe.cookTime + selectedRecipe.prepTime} min
                  </Badge>
                  <Badge
                    variant={
                      selectedRecipe.difficulty === "Easy"
                        ? "secondary"
                        : selectedRecipe.difficulty === "Medium"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" asChild>
                  <a href={`/recipes/${selectedRecipe.id}`}>Let&apos;s Cook!</a>
                </Button>
                {isRandomPick ? (
                  <Button variant="outline" onClick={handleRandomPick}>
                    Pick Another
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
