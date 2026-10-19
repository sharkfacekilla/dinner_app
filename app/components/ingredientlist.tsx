import { ChefHat } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { Ingredient } from "@/lib/recipes"

interface IngredientListProps {
  ingredients: Ingredient[]
  checkedIngredients: string[]
  onToggle: (setter: (prev: string[]) => string[]) => void
}

// Ingredients are always clickable (handy for shopping/prep), even outside cooking mode
export function IngredientList({ ingredients, checkedIngredients, onToggle }: IngredientListProps) {
  const toggleIngredient = (name: string) => {
    onToggle((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    )
  }

  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5 text-primary" />
          Ingredients
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {checkedIngredients.length} of {ingredients.length} ready
        </p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="flex items-start gap-3">
              <Checkbox
                id={`ingredient-${index}`}
                checked={checkedIngredients.includes(ingredient.name)}
                onCheckedChange={() => toggleIngredient(ingredient.name)}
                className="mt-0.5"
              />
              <label
                htmlFor={`ingredient-${index}`}
                className={`flex-1 cursor-pointer text-sm leading-relaxed ${
                  checkedIngredients.includes(ingredient.name) ? "text-muted-foreground line-through" : ""
                }`}
              >
                <span className="font-medium">
                  {ingredient.amount}
                  {ingredient.unit ? ` ${ingredient.unit}` : ""}
                </span>{" "}
                {ingredient.name}
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
