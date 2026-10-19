import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Utensils, Plus, Trash2, Lightbulb } from "lucide-react";

interface InstructionInput {
  id: string;
  text: string;
  tip: string;
}

interface RecipeInstructionListProps {
  instructions: InstructionInput[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: "text" | "tip", value: string) => void;
}

export function RecipeInstructionList({
  instructions,
  onAdd,
  onRemove,
  onUpdate,
}: RecipeInstructionListProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Utensils className="h-5 w-5 text-primary" />
          Instructions
        </CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="gap-1"
        >
          <Plus className="h-4 w-4" /> Add Step
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {instructions.map((instruction, index) => (
          <div key={instruction.id} className="flex gap-4">
            {/* Step Number Bubble */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
              {index + 1}
            </div>

            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Step description..."
                value={instruction.text}
                onChange={(e) =>
                  onUpdate(instruction.id, "text", e.target.value)
                }
                className="bg-background/50 min-h-[80px]"
              />
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-amber-500 shrink-0" />
                <Input
                  placeholder="Optional tip..."
                  value={instruction.tip}
                  onChange={(e) =>
                    onUpdate(instruction.id, "tip", e.target.value)
                  }
                  className="border-dashed bg-transparent text-sm h-8"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => onRemove(instruction.id)}
              disabled={instructions.length === 1}
              className="mt-1"
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
