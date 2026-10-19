import { Check, Lightbulb, UtensilsCrossed } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Instruction } from "@/lib/recipes"

interface InstructionListProps {
  instructions: Instruction[]
  completedSteps: number[]
  cookingMode: boolean
  onToggle: (setter: (prev: number[]) => number[]) => void
  recipeTitle: string
}

export function InstructionList({ instructions, completedSteps, cookingMode, onToggle, recipeTitle }: InstructionListProps) {
  // Steps stay locked behind cooking mode
  const toggleStep = (step: number) => {
    if (!cookingMode) return
    onToggle((prev: number[]) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    )
  }

  const isComplete = instructions && completedSteps.length === instructions.length && instructions.length > 0

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          Instructions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {instructions ? (
          <ol className="space-y-6">
            {instructions.map((instruction) => (
              <li key={instruction.step} className="relative list-none">
                <div
                  className={`flex gap-4 rounded-xl p-4 transition-all ${
                    cookingMode
                      ? completedSteps.includes(instruction.step)
                        ? "bg-accent/20"
                        : "bg-secondary/50 hover:bg-secondary"
                      : ""
                  }`}
                >
                  <button
                    onClick={() => toggleStep(instruction.step)}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold transition-all ${
                      cookingMode ? "cursor-pointer" : "cursor-default"
                    } ${
                      completedSteps.includes(instruction.step)
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {completedSteps.includes(instruction.step) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      instruction.step
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`leading-relaxed ${
                        completedSteps.includes(instruction.step)
                          ? "text-muted-foreground"
                          : ""
                      }`}
                    >
                      {instruction.text}
                    </p>
                    {instruction.tip && (
                      <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                        <Lightbulb className="h-4 w-4 shrink-0 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-primary">Tip:</span>{" "}
                          {instruction.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {instruction.step < instructions.length && (
                  <Separator className="my-2 ml-4 h-4 w-px bg-border" />
                )}
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted-foreground">
            No instructions available for this recipe yet.
          </p>
        )}

        {/* Completion Message */}
        {isComplete && (
          <div className="mt-8 rounded-xl bg-accent/20 p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <Check className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Recipe Complete!</h3>
            <p className="text-muted-foreground">
              Enjoy your homemade {recipeTitle}!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
