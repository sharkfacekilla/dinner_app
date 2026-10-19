import { ChefHat } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/recipes"

export function RecipeHeader({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mb-8 grid gap-6 lg:grid-cols-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted lg:aspect-square">
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <ChefHat className="h-24 w-24 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
        <Badge variant="secondary" className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm">
          {recipe.category}
        </Badge>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mb-4 flex flex-wrap gap-2">
          {recipe.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {recipe.title}
        </h1>
        <p className="mb-6 text-lg text-muted-foreground">{recipe.description}</p>
        <Badge
          variant={
            recipe.difficulty === "Easy" ? "secondary" : recipe.difficulty === "Medium" ? "outline" : "destructive"
          }
          className="w-fit text-sm"
        >
          {recipe.difficulty} Difficulty
        </Badge>
      </div>
    </div>
  )
}
