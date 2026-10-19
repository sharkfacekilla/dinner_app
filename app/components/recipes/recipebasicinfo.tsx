"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, ImageIcon, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoProps {
  data: {
    title: string;
    description: string;
    imageUrl: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    difficulty: string;
    category: string;
    tags: string[];
    tagInput: string;
  };
  updateField: (field: string, value: any) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
  onTagKeyDown: (e: React.KeyboardEvent) => void;
  categories: readonly string[];
  difficulties: readonly string[];
}

export function RecipeBasicInfo({ 
  data, 
  updateField, 
  onAddTag, 
  onRemoveTag, 
  onTagKeyDown, 
  categories, 
  difficulties 
}: BasicInfoProps) {
  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Utensils className="h-5 w-5 text-primary" />
          Basic Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Recipe Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Grandma's Apple Pie"
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A brief description of your recipe..."
            value={data.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={3}
            className="bg-background/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Image URL
          </Label>
          <Input
            id="image"
            placeholder="https://example.com/recipe-image.jpg"
            value={data.imageUrl}
            onChange={(e) => updateField("imageUrl", e.target.value)}
            className="bg-background/50"
          />
          {data.imageUrl && (
            <div className="relative mt-2 aspect-video w-64 overflow-hidden rounded-lg border border-border">
              <img
                src={data.imageUrl}
                alt="Recipe preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
        </div>
        
        {/* Your original 4-column stats grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="prepTime">Prep Time (min)</Label>
            <Input
              id="prepTime"
              type="number"
              value={data.prepTime}
              onChange={(e) => updateField("prepTime", e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cookTime">Cook Time (min)</Label>
            <Input
              id="cookTime"
              type="number"
              value={data.cookTime}
              onChange={(e) => updateField("cookTime", e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="servings">Servings</Label>
            <Input
              id="servings"
              type="number"
              value={data.servings}
              onChange={(e) => updateField("servings", e.target.value)}
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty *</Label>
            <Select value={data.difficulty} onValueChange={(v) => updateField("difficulty", v)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {difficulties.filter((d) => d !== "All").map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Your original 2-column category/tags grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={data.category} onValueChange={(v) => updateField("category", v)}>
              <SelectTrigger className="bg-background/50">
                <SelectValue placeholder="Select a category..." />
              </SelectTrigger>
              <SelectContent>
                {categories.filter((c) => c !== "All").map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add tag..."
                value={data.tagInput}
                onChange={(e) => updateField("tagInput", e.target.value)}
                onKeyDown={onTagKeyDown}
                className="bg-background/50"
              />
              <Button type="button" variant="secondary" onClick={onAddTag}>
                Add
              </Button>
            </div>
            {data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {data.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 cursor-pointer"
                    onClick={() => onRemoveTag(tag)}
                  >
                    {tag} <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
