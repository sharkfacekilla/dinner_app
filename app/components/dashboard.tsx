"use client";

import { ChefHat } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { RecipeCard } from "./recipecard";
import { RandomRecipeButton } from "./randomrecipebutton";
import { Recipe } from "@/lib/recipes";
import { useRecipePreview } from "@/lib/hooks/useRecipePreview";
import { RecipePreviewDialog } from "./recipepreviewdialog";

export function Dashboard({ recipes }: { recipes: Recipe[] }) {
  const { pickRandom, viewRecipe, dialogProps } = useRecipePreview(recipes);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:gap-4 sm:px-6">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-1 items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, Chef!</p>
          </div>
          <RandomRecipeButton onPick={pickRandom} />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <section className="mb-5 sm:mb-8">
          <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-14 sm:w-14">
                <ChefHat className="h-5 w-5 text-primary sm:h-7 sm:w-7" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 xl:grid-cols-4 2xl:grid-cols-5">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onClick={() => viewRecipe(recipe)}
              />
            ))}
          </div>
        </section>
      </main>

      <RecipePreviewDialog {...dialogProps} />
    </div>
  );
}
