import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChefHat, Plus, GripVertical, Trash2 } from "lucide-react";
import type { Ingredient } from "@/lib/recipes";

// Using the same ID wrapper you had in your main form
interface IngredientInput extends Ingredient {
  id: string;
}

interface RecipeIngredientListProps {
  ingredients: IngredientInput[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Ingredient, value: string) => void;
}

export function RecipeIngredientList({
  ingredients,
  onAdd,
  onRemove,
  onUpdate,
}: RecipeIngredientListProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <ChefHat className="h-5 w-5 text-primary" />
          Ingredients
        </CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="gap-1"
        >
          <Plus className="h-4 w-4" /> Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex items-center gap-3">
            <GripVertical className="h-4 w-4 text-muted-foreground/30 shrink-0" />
            <Input
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) =>
                onUpdate(ingredient.id, "name", e.target.value)
              }
              className="flex-[2] bg-background/50"
            />
            <Input
              placeholder="Amt"
              value={ingredient.amount}
              onChange={(e) =>
                onUpdate(ingredient.id, "amount", e.target.value)
              }
              className="flex-1 bg-background/50"
            />
            <Input
              placeholder="Unit"
              value={ingredient.unit}
              onChange={(e) =>
                onUpdate(ingredient.id, "unit", e.target.value)
              }
              className="flex-1 bg-background/50"
            />
            <Button
              variant="ghost"
              size="icon"
              type="button" // Important so it doesn't trigger form submit
              onClick={() => onRemove(ingredient.id)}
              disabled={ingredients.length === 1}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
