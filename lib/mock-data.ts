import type { Recipe } from "./recipes";

export const mockRecipes: Recipe[] = [
  {
    id: "1",
    title: "Classic Margherita Pizza",
    description:
      "A traditional Italian pizza with fresh mozzarella, tomatoes, and basil on a crispy thin crust",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&h=600&fit=crop",
    cookTime: 15,
    prepTime: 30,
    difficulty: "Medium",
    category: "Italian",
    createdAt: new Date("2024-01-15"),
    isFavorite: true,
    servings: 4,
    tags: ["pizza", "vegetarian", "classic"],
    ingredients: [
      { name: "Pizza dough", amount: "1", unit: "lb" },
      { name: "San Marzano tomatoes", amount: "1", unit: "can (14 oz)" },
      { name: "Fresh mozzarella", amount: "8", unit: "oz" },
      { name: "Fresh basil leaves", amount: "1/4", unit: "cup" },
      { name: "Extra virgin olive oil", amount: "2", unit: "tbsp" },
      { name: "Garlic", amount: "2", unit: "cloves" },
      { name: "Salt", amount: "1", unit: "tsp" },
      { name: "Black pepper", amount: "1/2", unit: "tsp" },
    ],
    instructions: [
      {
        step: 1,
        text: "Preheat your oven to 500°F (260°C) with a pizza stone or baking sheet inside for at least 30 minutes.",
        tip: "A hot oven is key to crispy crust!",
      },
      {
        step: 2,
        text: "Crush the San Marzano tomatoes by hand and mix with minced garlic, salt, and a drizzle of olive oil.",
      },
      {
        step: 3,
        text: "Stretch the pizza dough on a floured surface to about 12 inches in diameter.",
      },
      {
        step: 4,
        text: "Spread a thin layer of the tomato sauce over the dough, leaving a 1-inch border for the crust.",
      },
      {
        step: 5,
        text: "Tear the fresh mozzarella into pieces and distribute evenly over the pizza.",
      },
      {
        step: 6,
        text: "Carefully transfer the pizza to the hot stone and bake for 10-12 minutes until the crust is golden and cheese is bubbling.",
      },
      {
        step: 7,
        text: "Remove from oven, top with fresh basil leaves and a drizzle of olive oil. Let rest for 2 minutes before slicing.",
        tip: "Add basil after baking to keep it fresh and vibrant.",
      },
    ],
  },
  {
    id: "2",
    title: "Chicken Tikka Masala",
    description:
      "Tender chicken in a creamy, spiced tomato sauce served over fluffy basmati rice",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=600&fit=crop",
    cookTime: 35,
    prepTime: 20,
    difficulty: "Medium",
    category: "Indian",
    createdAt: new Date("2024-01-14"),
    isFavorite: true,
    servings: 4,
    tags: ["curry", "chicken", "spicy"],
    ingredients: [
      { name: "Boneless chicken thighs", amount: "1.5", unit: "lbs" },
      { name: "Plain yogurt", amount: "1", unit: "cup" },
      { name: "Garam masala", amount: "2", unit: "tbsp" },
      { name: "Cumin", amount: "1", unit: "tsp" },
      { name: "Paprika", amount: "1", unit: "tsp" },
      { name: "Crushed tomatoes", amount: "1", unit: "can (14 oz)" },
      { name: "Heavy cream", amount: "1", unit: "cup" },
      { name: "Onion", amount: "1", unit: "large" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Ginger", amount: "1", unit: "inch piece" },
      { name: "Butter", amount: "3", unit: "tbsp" },
      { name: "Fresh cilantro", amount: "1/4", unit: "cup" },
    ],
    instructions: [
      {
        step: 1,
        text: "Cut chicken into bite-sized pieces and marinate in yogurt, half the garam masala, cumin, and paprika for at least 30 minutes.",
        tip: "Marinating overnight gives the best flavor!",
      },
      {
        step: 2,
        text: "Thread chicken onto skewers and grill or broil until slightly charred, about 4 minutes per side.",
      },
      {
        step: 3,
        text: "In a large pan, melt butter and sauté diced onion until golden brown, about 8 minutes.",
      },
      {
        step: 4,
        text: "Add minced garlic and ginger, cook for 1 minute until fragrant.",
      },
      {
        step: 5,
        text: "Add crushed tomatoes and remaining garam masala. Simmer for 15 minutes.",
      },
      {
        step: 6,
        text: "Stir in heavy cream and add the grilled chicken. Simmer for 10 more minutes.",
      },
      {
        step: 7,
        text: "Garnish with fresh cilantro and serve over basmati rice.",
      },
    ],
  },
  {
    id: "3",
    title: "Fresh Garden Salad",
    description:
      "Crisp mixed greens with cherry tomatoes, cucumbers, and a light vinaigrette dressing",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=600&fit=crop",
    cookTime: 0,
    prepTime: 15,
    difficulty: "Easy",
    category: "Healthy",
    createdAt: new Date("2024-01-13"),
    servings: 2,
    tags: ["salad", "vegetarian", "quick", "healthy"],
    ingredients: [
      { name: "Mixed salad greens", amount: "6", unit: "cups" },
      { name: "Cherry tomatoes", amount: "1", unit: "cup" },
      { name: "Cucumber", amount: "1", unit: "medium" },
      { name: "Red onion", amount: "1/4", unit: "small" },
      { name: "Extra virgin olive oil", amount: "3", unit: "tbsp" },
      { name: "Balsamic vinegar", amount: "1", unit: "tbsp" },
      { name: "Dijon mustard", amount: "1", unit: "tsp" },
      { name: "Honey", amount: "1", unit: "tsp" },
      { name: "Salt and pepper", amount: "to taste", unit: "" },
    ],
    instructions: [
      {
        step: 1,
        text: "Wash and dry the mixed greens thoroughly.",
        tip: "A salad spinner works great for this!",
      },
      {
        step: 2,
        text: "Halve the cherry tomatoes and slice the cucumber into thin rounds.",
      },
      { step: 3, text: "Thinly slice the red onion and separate into rings." },
      {
        step: 4,
        text: "Whisk together olive oil, balsamic vinegar, Dijon mustard, and honey in a small bowl.",
      },
      {
        step: 5,
        text: "Arrange greens in a large bowl, top with tomatoes, cucumber, and onion.",
      },
      {
        step: 6,
        text: "Drizzle with vinaigrette just before serving and toss gently.",
      },
    ],
  },
  {
    id: "4",
    title: "Beef Bourguignon",
    description:
      "A rich French stew with tender beef, mushrooms, and pearl onions braised in red wine",
    image:
      "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=400&h=600&fit=crop",
    cookTime: 180,
    prepTime: 45,
    difficulty: "Hard",
    category: "French",
    createdAt: new Date("2024-01-12"),
    servings: 6,
    tags: ["stew", "beef", "french", "wine"],
    ingredients: [
      { name: "Beef chuck", amount: "3", unit: "lbs" },
      { name: "Bacon", amount: "6", unit: "oz" },
      { name: "Red Burgundy wine", amount: "1", unit: "bottle (750ml)" },
      { name: "Beef broth", amount: "2", unit: "cups" },
      { name: "Tomato paste", amount: "2", unit: "tbsp" },
      { name: "Pearl onions", amount: "1", unit: "lb" },
      { name: "Cremini mushrooms", amount: "1", unit: "lb" },
      { name: "Carrots", amount: "4", unit: "medium" },
      { name: "Garlic", amount: "4", unit: "cloves" },
      { name: "Fresh thyme", amount: "4", unit: "sprigs" },
      { name: "Bay leaves", amount: "2", unit: "" },
      { name: "All-purpose flour", amount: "3", unit: "tbsp" },
      { name: "Butter", amount: "4", unit: "tbsp" },
    ],
    instructions: [
      {
        step: 1,
        text: "Cut beef into 2-inch cubes and pat dry. Season generously with salt and pepper.",
      },
      {
        step: 2,
        text: "Cook bacon in a Dutch oven until crispy. Remove and set aside, leaving the fat.",
        tip: "The bacon fat adds incredible flavor to the dish.",
      },
      {
        step: 3,
        text: "Brown the beef in batches in the bacon fat, about 3 minutes per side. Don't overcrowd the pan.",
      },
      {
        step: 4,
        text: "Remove beef and sauté sliced carrots for 5 minutes. Add garlic and tomato paste, cook 1 minute.",
      },
      {
        step: 5,
        text: "Pour in wine and beef broth, scraping up browned bits. Add thyme and bay leaves.",
      },
      {
        step: 6,
        text: "Return beef and bacon to pot. Cover and braise in a 325°F oven for 2-3 hours until beef is tender.",
      },
      {
        step: 7,
        text: "Meanwhile, sauté pearl onions and mushrooms in butter until golden.",
      },
      {
        step: 8,
        text: "Add onions and mushrooms to the stew for the last 30 minutes of cooking.",
      },
      {
        step: 9,
        text: "Remove bay leaves and thyme sprigs. Adjust seasoning and serve with crusty bread or mashed potatoes.",
      },
    ],
  },
  {
    id: "5",
    title: "Fluffy Pancakes",
    description:
      "Light and airy buttermilk pancakes perfect for a lazy weekend breakfast",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop",
    cookTime: 20,
    prepTime: 10,
    difficulty: "Easy",
    category: "Breakfast",
    createdAt: new Date("2024-01-11"),
    servings: 4,
    tags: ["breakfast", "pancakes", "sweet", "weekend"],
    ingredients: [
      { name: "All-purpose flour", amount: "2", unit: "cups" },
      { name: "Buttermilk", amount: "2", unit: "cups" },
      { name: "Eggs", amount: "2", unit: "large" },
      { name: "Butter (melted)", amount: "4", unit: "tbsp" },
      { name: "Sugar", amount: "3", unit: "tbsp" },
      { name: "Baking powder", amount: "2", unit: "tsp" },
      { name: "Baking soda", amount: "1", unit: "tsp" },
      { name: "Salt", amount: "1/2", unit: "tsp" },
      { name: "Vanilla extract", amount: "1", unit: "tsp" },
      { name: "Maple syrup", amount: "for serving", unit: "" },
      { name: "Fresh berries", amount: "for serving", unit: "" },
    ],
    instructions: [
      {
        step: 1,
        text: "Whisk together flour, sugar, baking powder, baking soda, and salt in a large bowl.",
      },
      {
        step: 2,
        text: "In another bowl, whisk buttermilk, eggs, melted butter, and vanilla.",
        tip: "Make sure the melted butter has cooled slightly so it doesn't cook the eggs!",
      },
      {
        step: 3,
        text: "Pour wet ingredients into dry and stir until just combined. Lumps are okay!",
        tip: "Overmixing makes pancakes tough.",
      },
      {
        step: 4,
        text: "Heat a griddle or non-stick pan over medium heat. Lightly butter the surface.",
      },
      {
        step: 5,
        text: "Pour 1/4 cup batter per pancake. Cook until bubbles form on surface and edges look set, about 2-3 minutes.",
      },
      {
        step: 6,
        text: "Flip and cook another 1-2 minutes until golden brown.",
      },
      {
        step: 7,
        text: "Serve warm with maple syrup, butter, and fresh berries.",
      },
    ],
  },
  {
    id: "6",
    title: "Homemade Ramen",
    description:
      "Rich pork broth with handmade noodles, soft-boiled egg, and tender chashu pork",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=600&fit=crop",
    cookTime: 240,
    prepTime: 60,
    difficulty: "Hard",
    category: "Japanese",
    createdAt: new Date("2024-01-10"),
    isFavorite: true,
    servings: 4,
    tags: ["ramen", "japanese", "noodles", "soup"],
    ingredients: [
      { name: "Pork bones", amount: "4", unit: "lbs" },
      { name: "Pork belly", amount: "2", unit: "lbs" },
      { name: "Ramen noodles", amount: "1", unit: "lb" },
      { name: "Eggs", amount: "4", unit: "large" },
      { name: "Soy sauce", amount: "1/2", unit: "cup" },
      { name: "Mirin", amount: "1/4", unit: "cup" },
      { name: "Sake", amount: "1/4", unit: "cup" },
      { name: "Ginger", amount: "3", unit: "inch piece" },
      { name: "Garlic", amount: "1", unit: "head" },
      { name: "Green onions", amount: "6", unit: "stalks" },
      { name: "Nori sheets", amount: "4", unit: "" },
      { name: "Sesame oil", amount: "2", unit: "tbsp" },
    ],
    instructions: [
      {
        step: 1,
        text: "Blanch pork bones in boiling water for 10 minutes, then drain and rinse to remove impurities.",
      },
      {
        step: 2,
        text: "In a large pot, cover bones with fresh water. Add ginger and halved garlic head. Simmer for 4-6 hours.",
        tip: "The longer you simmer, the richer the broth!",
      },
      {
        step: 3,
        text: "Make chashu: Roll pork belly and tie with kitchen twine. Braise in soy sauce, mirin, sake, and water for 2-3 hours until tender.",
      },
      {
        step: 4,
        text: "Soft-boil eggs for 6.5 minutes, then shock in ice water. Peel and marinate in chashu braising liquid for at least 2 hours.",
      },
      {
        step: 5,
        text: "Strain the broth and season with soy sauce and sesame oil to taste.",
      },
      { step: 6, text: "Cook ramen noodles according to package directions." },
      { step: 7, text: "Slice chashu and halve the marinated eggs." },
      {
        step: 8,
        text: "Assemble bowls: noodles first, then hot broth, topped with chashu, egg, green onions, and nori.",
      },
    ],
  },
  {
    id: "7",
    title: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon with a honey garlic glaze and roasted vegetables",
    cookTime: 20,
    prepTime: 15,
    difficulty: "Easy",
    category: "Seafood",
    createdAt: new Date("2024-01-09"),
    servings: 4,
    tags: ["salmon", "seafood", "healthy", "grilled"],
    ingredients: [
      { name: "Salmon fillets", amount: "4", unit: "(6 oz each)" },
      { name: "Honey", amount: "3", unit: "tbsp" },
      { name: "Soy sauce", amount: "2", unit: "tbsp" },
      { name: "Garlic", amount: "3", unit: "cloves" },
      { name: "Olive oil", amount: "2", unit: "tbsp" },
      { name: "Lemon", amount: "1", unit: "" },
      { name: "Asparagus", amount: "1", unit: "bunch" },
      { name: "Cherry tomatoes", amount: "1", unit: "cup" },
      { name: "Salt and pepper", amount: "to taste", unit: "" },
      { name: "Fresh dill", amount: "2", unit: "tbsp" },
    ],
    instructions: [
      {
        step: 1,
        text: "Whisk together honey, soy sauce, minced garlic, and juice of half the lemon for the glaze.",
      },
      {
        step: 2,
        text: "Pat salmon dry and season with salt and pepper. Brush with half the glaze.",
      },
      {
        step: 3,
        text: "Toss asparagus and cherry tomatoes with olive oil, salt, and pepper.",
      },
      {
        step: 4,
        text: "Preheat grill to medium-high heat (400°F).",
        tip: "Oil the grill grates to prevent sticking.",
      },
      {
        step: 5,
        text: "Grill salmon skin-side down for 4-5 minutes. Flip, brush with remaining glaze, and cook 3-4 more minutes.",
      },
      {
        step: 6,
        text: "Grill vegetables alongside the salmon until tender and slightly charred.",
      },
      {
        step: 7,
        text: "Serve salmon over vegetables, garnished with fresh dill and remaining lemon slices.",
      },
    ],
  },
  {
    id: "8",
    title: "Chocolate Lava Cake",
    description:
      "Decadent individual chocolate cakes with a gooey molten center",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=600&fit=crop",
    cookTime: 14,
    prepTime: 20,
    difficulty: "Medium",
    category: "Dessert",
    createdAt: new Date("2024-01-08"),
    isFavorite: true,
    servings: 4,
    tags: ["dessert", "chocolate", "baking"],
    ingredients: [
      { name: "Dark chocolate (70%)", amount: "6", unit: "oz" },
      { name: "Unsalted butter", amount: "6", unit: "tbsp" },
      { name: "Eggs", amount: "2", unit: "large" },
      { name: "Egg yolks", amount: "2", unit: "" },
      { name: "Granulated sugar", amount: "1/4", unit: "cup" },
      { name: "All-purpose flour", amount: "2", unit: "tbsp" },
      { name: "Vanilla extract", amount: "1", unit: "tsp" },
      { name: "Salt", amount: "1/4", unit: "tsp" },
      { name: "Powdered sugar", amount: "for dusting", unit: "" },
      { name: "Vanilla ice cream", amount: "for serving", unit: "" },
    ],
    instructions: [
      {
        step: 1,
        text: "Preheat oven to 425°F. Butter and flour four 6-oz ramekins.",
      },
      {
        step: 2,
        text: "Melt chocolate and butter together in a double boiler or microwave, stirring until smooth.",
        tip: "Don't overheat - chocolate can seize!",
      },
      {
        step: 3,
        text: "Whisk eggs, egg yolks, and sugar until thick and pale, about 2 minutes.",
      },
      {
        step: 4,
        text: "Fold the chocolate mixture into the egg mixture, then gently fold in flour, vanilla, and salt.",
      },
      { step: 5, text: "Divide batter evenly among prepared ramekins." },
      {
        step: 6,
        text: "Bake for exactly 12-14 minutes until edges are firm but center is soft.",
        tip: "Timing is crucial - set a timer!",
      },
      {
        step: 7,
        text: "Let cool 1 minute, then run a knife around edges and invert onto plates.",
      },
      {
        step: 8,
        text: "Dust with powdered sugar and serve immediately with vanilla ice cream.",
      },
    ],
  },
  {
    id: "9",
    title: "Thai Green Curry",
    description:
      "Aromatic coconut curry with tender chicken, bamboo shoots, and Thai basil",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=600&fit=crop",
    cookTime: 25,
    prepTime: 20,
    difficulty: "Medium",
    category: "Thai",
    createdAt: new Date("2024-01-07"),
    servings: 4,
    tags: ["curry", "thai", "chicken", "spicy"],
    ingredients: [
      { name: "Chicken breast", amount: "1.5", unit: "lbs" },
      { name: "Green curry paste", amount: "3", unit: "tbsp" },
      { name: "Coconut milk", amount: "2", unit: "cans (14 oz each)" },
      { name: "Bamboo shoots", amount: "1", unit: "can (8 oz)" },
      { name: "Thai eggplant", amount: "1", unit: "cup" },
      { name: "Fish sauce", amount: "2", unit: "tbsp" },
      { name: "Palm sugar", amount: "1", unit: "tbsp" },
      { name: "Thai basil", amount: "1", unit: "cup" },
      { name: "Kaffir lime leaves", amount: "4", unit: "" },
      { name: "Red chili", amount: "2", unit: "" },
      { name: "Jasmine rice", amount: "2", unit: "cups" },
    ],
    instructions: [
      { step: 1, text: "Slice chicken into thin strips. Set aside." },
      {
        step: 2,
        text: "Heat 1/2 cup of coconut cream (thick part from top of can) in a wok over medium-high heat.",
      },
      {
        step: 3,
        text: "Add curry paste and fry for 1-2 minutes until fragrant.",
        tip: "Frying the paste in coconut cream releases its flavors.",
      },
      {
        step: 4,
        text: "Add chicken and stir-fry until no longer pink, about 4-5 minutes.",
      },
      {
        step: 5,
        text: "Pour in remaining coconut milk, add bamboo shoots and eggplant. Simmer for 10 minutes.",
      },
      {
        step: 6,
        text: "Season with fish sauce and palm sugar. Add torn kaffir lime leaves.",
      },
      {
        step: 7,
        text: "Remove from heat and stir in Thai basil. Garnish with sliced red chili.",
      },
      { step: 8, text: "Serve hot over jasmine rice." },
    ],
  },
  {
    id: "10",
    title: "Classic Caesar Salad",
    description:
      "Crisp romaine lettuce with creamy Caesar dressing, parmesan, and homemade croutons",
    image:
      "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=600&fit=crop",
    cookTime: 0,
    prepTime: 20,
    difficulty: "Easy",
    category: "Healthy",
    createdAt: new Date("2024-01-06"),
    servings: 4,
    tags: ["salad", "classic", "quick"],
    ingredients: [
      { name: "Romaine lettuce", amount: "2", unit: "heads" },
      { name: "Parmesan cheese", amount: "1/2", unit: "cup (shaved)" },
      { name: "Anchovy fillets", amount: "4", unit: "" },
      { name: "Garlic", amount: "2", unit: "cloves" },
      { name: "Egg yolks", amount: "2", unit: "" },
      { name: "Dijon mustard", amount: "1", unit: "tsp" },
      { name: "Lemon juice", amount: "2", unit: "tbsp" },
      { name: "Olive oil", amount: "1/2", unit: "cup" },
      { name: "Worcestershire sauce", amount: "1", unit: "tsp" },
      { name: "Crusty bread", amount: "4", unit: "slices" },
    ],
    instructions: [
      {
        step: 1,
        text: "Make croutons: Cube bread, toss with olive oil and garlic, bake at 375°F for 10-12 minutes until golden.",
      },
      {
        step: 2,
        text: "For dressing: Mash anchovies and garlic into a paste in a large wooden bowl.",
        tip: "A mortar and pestle works great for this!",
      },
      {
        step: 3,
        text: "Whisk in egg yolks, mustard, lemon juice, and Worcestershire sauce.",
      },
      {
        step: 4,
        text: "Slowly drizzle in olive oil while whisking to create a creamy emulsion.",
      },
      { step: 5, text: "Wash and dry romaine, tear into bite-sized pieces." },
      { step: 6, text: "Toss lettuce with dressing until well coated." },
      {
        step: 7,
        text: "Top with shaved parmesan and croutons. Serve immediately.",
      },
    ],
  },
  {
    id: "11",
    title: "BBQ Pulled Pork",
    description:
      "Slow-cooked pork shoulder in tangy BBQ sauce, perfect for sandwiches",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=600&fit=crop",
    cookTime: 480,
    prepTime: 30,
    difficulty: "Medium",
    category: "American",
    createdAt: new Date("2024-01-05"),
    servings: 8,
    tags: ["bbq", "pork", "slow-cooker", "sandwiches"],
    ingredients: [
      { name: "Pork shoulder (bone-in)", amount: "5", unit: "lbs" },
      { name: "Brown sugar", amount: "1/4", unit: "cup" },
      { name: "Paprika", amount: "2", unit: "tbsp" },
      { name: "Garlic powder", amount: "1", unit: "tbsp" },
      { name: "Onion powder", amount: "1", unit: "tbsp" },
      { name: "Cumin", amount: "1", unit: "tsp" },
      { name: "Cayenne pepper", amount: "1/2", unit: "tsp" },
      { name: "Apple cider vinegar", amount: "1/2", unit: "cup" },
      { name: "BBQ sauce", amount: "2", unit: "cups" },
      { name: "Chicken broth", amount: "1", unit: "cup" },
      { name: "Brioche buns", amount: "8", unit: "" },
      { name: "Coleslaw", amount: "for serving", unit: "" },
    ],
    instructions: [
      {
        step: 1,
        text: "Mix brown sugar, paprika, garlic powder, onion powder, cumin, and cayenne to make a dry rub.",
      },
      {
        step: 2,
        text: "Pat pork shoulder dry and coat generously with the dry rub. Refrigerate overnight if possible.",
        tip: "The longer it marinates, the more flavorful!",
      },
      {
        step: 3,
        text: "Place pork in slow cooker. Add chicken broth and apple cider vinegar.",
      },
      {
        step: 4,
        text: "Cook on low for 8-10 hours or high for 5-6 hours until meat is fall-apart tender.",
      },
      {
        step: 5,
        text: "Remove pork and shred with two forks, discarding any large fat pieces and the bone.",
      },
      {
        step: 6,
        text: "Skim fat from cooking liquid and add 1 cup of liquid back to the shredded pork.",
      },
      {
        step: 7,
        text: "Mix in BBQ sauce to taste - start with 1 cup and add more as desired.",
      },
      {
        step: 8,
        text: "Toast brioche buns and pile high with pulled pork. Top with coleslaw.",
      },
    ],
  },
  {
    id: "12",
    title: "Mushroom Risotto",
    description:
      "Creamy arborio rice with mixed wild mushrooms, white wine, and parmesan",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=600&fit=crop",
    cookTime: 35,
    prepTime: 15,
    difficulty: "Medium",
    category: "Italian",
    createdAt: new Date("2024-01-04"),
    servings: 4,
    tags: ["risotto", "mushroom", "italian", "vegetarian"],
    ingredients: [
      { name: "Arborio rice", amount: "1.5", unit: "cups" },
      { name: "Mixed wild mushrooms", amount: "1", unit: "lb" },
      { name: "Vegetable broth", amount: "6", unit: "cups" },
      { name: "Dry white wine", amount: "1/2", unit: "cup" },
      { name: "Shallots", amount: "2", unit: "" },
      { name: "Garlic", amount: "3", unit: "cloves" },
      { name: "Butter", amount: "4", unit: "tbsp" },
      { name: "Parmesan cheese", amount: "1", unit: "cup (grated)" },
      { name: "Fresh thyme", amount: "2", unit: "tsp" },
      { name: "Olive oil", amount: "2", unit: "tbsp" },
      { name: "Salt and pepper", amount: "to taste", unit: "" },
    ],
    instructions: [
      {
        step: 1,
        text: "Heat broth in a saucepan and keep warm over low heat.",
      },
      {
        step: 2,
        text: "Clean and slice mushrooms. Sauté in olive oil and 1 tbsp butter until golden. Season and set aside.",
      },
      {
        step: 3,
        text: "In a large pan, melt 2 tbsp butter. Sauté minced shallots until translucent, add garlic for 30 seconds.",
      },
      {
        step: 4,
        text: "Add rice and toast, stirring constantly, until edges become translucent (about 2 minutes).",
        tip: "Toasting the rice is key for perfect texture!",
      },
      { step: 5, text: "Add wine and stir until absorbed." },
      {
        step: 6,
        text: "Add warm broth one ladle at a time, stirring frequently. Wait until each addition is absorbed before adding more.",
      },
      {
        step: 7,
        text: "Continue for 18-20 minutes until rice is creamy but still al dente.",
      },
      {
        step: 8,
        text: "Remove from heat. Stir in remaining butter, parmesan, thyme, and sautéed mushrooms.",
      },
      {
        step: 9,
        text: "Season to taste and serve immediately with extra parmesan.",
      },
    ],
  },
];

export const categories = [
  "All",
  "Italian",
  "Indian",
  "Japanese",
  "Thai",
  "French",
  "American",
  "Healthy",
  "Breakfast",
  "Seafood",
  "Dessert",
];

export const difficulties = ["All", "Easy", "Medium", "Hard"] as const;
