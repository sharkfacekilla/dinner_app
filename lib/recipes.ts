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
  hasPhoto?: boolean; // true = uploaded photo (used in the PDF); false = none or a sample URL
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
  isOwner?: boolean; // false = someone shared it with you
  ownerName?: string;
  sharedWith?: string[]; // usernames; only filled in for the owner
};
