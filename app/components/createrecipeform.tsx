"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Minus,
  ChefHat,
  Clock,
  Users,
  Utensils,
  Tag,
  ImageIcon,
  Lightbulb,
  GripVertical,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, difficulties } from "@/lib/mock-data";
import type { Ingredient, Instruction } from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { createRecipe } from "@/lib/actions/recipe";
import type { RecipeInput } from "@/lib/validations/recipe";
import { RecipeIngredientList } from "./recipes/recipeingredientlist";
import { RecipeInstructionList } from "./recipes/recipeinstructionlist";
import { RecipeBasicInfo } from "./recipes/recipebasicinfo";
interface IngredientInput extends Ingredient {
  id: string;
}
interface InstructionInput {
  id: string;
  text: string;
  tip: string;
}
export function CreateRecipeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { id: "1", name: "", amount: "", unit: "" },
  ]);
  const [instructions, setInstructions] = useState<InstructionInput[]>([
    { id: "1", text: "", tip: "" },
  ]);
  // Ingredient handlers
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: Date.now().toString(), name: "", amount: "", unit: "" },
    ]);
  };
  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((i) => i.id !== id));
    }
  };
  const updateIngredient = (
    id: string,
    field: keyof Ingredient,
    value: string,
  ) => {
    setIngredients(
      ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  };
  // Instruction handlers
  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { id: Date.now().toString(), text: "", tip: "" },
    ]);
  };
  const removeInstruction = (id: string) => {
    if (instructions.length > 1) {
      setInstructions(instructions.filter((i) => i.id !== id));
    }
  };
  const updateInstruction = (
    id: string,
    field: "text" | "tip",
    value: string,
  ) => {
    setInstructions(
      instructions.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  };
  // Tag handlers
  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };
  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const recipe = {
      title,
      description: description || null,
      image: imageUrl || null,
      prepTime: parseInt(prepTime) || null,
      cookTime: parseInt(cookTime) || null,
      servings: parseInt(servings) || null,
      // Checked against Easy/Medium/Hard on the server
      difficulty: (difficulty || null) as RecipeInput["difficulty"],
      category: category || null,
      tags,
      ingredients: ingredients
        .filter((i) => i.name.trim())
        .map(({ id, ...rest }) => rest),
      instructions: instructions
        .filter((i) => i.text.trim())
        .map(({ id, text, tip }, index) => ({
          step: index + 1,
          text,
          tip: tip || null,
        })),
    };
    const result = await createRecipe(recipe);
    if (result.success) {
      setIsSubmitting(false);
      router.push(`/recipes/${result.id}`);
    } else {
      // Handle error (e.g., toast notification)
      alert(result.error);
      setIsSubmitting(false);
    }
  };
  const updateBasicField = (field: string, value: any) => {
    const setters: Record<string, Function> = {
      title: setTitle,
      description: setDescription,
      imageUrl: setImageUrl,
      prepTime: setPrepTime,
      cookTime: setCookTime,
      servings: setServings,
      difficulty: setDifficulty,
      category: setCategory,
      tagInput: setTagInput, // Added this
    };
    setters[field]?.(value);
  };
  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <SidebarTrigger className="-ml-2" />
        <Separator orientation="vertical" className="h-6" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ChefHat className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Create New Recipe</h1>
              <p className="text-sm text-muted-foreground">Add a new recipe</p>
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !title || !category || !difficulty}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Recipe"}
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-7xl mx-auto">
          <RecipeBasicInfo
            data={{
              title,
              description,
              imageUrl,
              prepTime,
              cookTime,
              servings,
              difficulty,
              category,
              tags,
              tagInput,
            }}
            updateField={updateBasicField}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onTagKeyDown={handleTagKeyDown}
            categories={categories}
            difficulties={difficulties}
          />
          <RecipeIngredientList
            ingredients={ingredients}
            onAdd={addIngredient}
            onRemove={removeIngredient}
            onUpdate={updateIngredient}
          />
          <RecipeInstructionList
            instructions={instructions}
            onAdd={addInstruction}
            onRemove={removeInstruction}
            onUpdate={updateInstruction}
          />
        </form>
      </main>
    </div>
  );
}
