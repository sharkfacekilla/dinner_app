export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
};

export type Instruction = {
  step: number;
  text: string;
  tip?: string; // Optional because not every step has one
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  image?: string;
  cookTime: number;
  prepTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  createdAt: Date;
  servings: number;
  tags: string[];
  ingredients: Ingredient[];
  instructions: Instruction[];
  isFavorite?: boolean;
};
