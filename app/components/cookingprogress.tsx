import { ChefHat } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CookingProgressProps {
  progress: number
  completedCount: number
  totalCount: number
}

export function CookingProgress({ progress, completedCount, totalCount }: CookingProgressProps) {
  return (
    <Card className="mb-6 border-primary/30 bg-primary/5">
      <CardContent className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ChefHat className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">Cooking in Progress</p>
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} steps completed
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-32 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
