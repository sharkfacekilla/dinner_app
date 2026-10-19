import { Clock, Timer, UtensilsCrossed, Users } from "lucide-react"
import type { Recipe } from "@/lib/recipes"

export function RecipeStats({ recipe }: { recipe: Recipe }) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
  }

  const totalTime = recipe.cookTime + recipe.prepTime

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4">
        <Timer className="mb-2 h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">Prep Time</span>
        <span className="font-semibold">{formatTime(recipe.prepTime)}</span>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4">
        <Clock className="mb-2 h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">Cook Time</span>
        <span className="font-semibold">{formatTime(recipe.cookTime)}</span>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4">
        <UtensilsCrossed className="mb-2 h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-semibold">{formatTime(totalTime)}</span>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-4">
        <Users className="mb-2 h-5 w-5 text-primary" />
        <span className="text-sm text-muted-foreground">Servings</span>
        <span className="font-semibold">{recipe.servings || 4}</span>
      </div>
    </div>
  )
}
