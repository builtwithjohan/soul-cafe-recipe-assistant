const RECIPES = [
  {
    id: "pesto-flatbread-pizza",
    name: "Pesto Flatbread Pizza",
    emoji: "🍕",
    description: "Crispy flatbread topped with pesto, mozzarella, vegetables, and fresh rocket.",
    servings: 1,
    time: "15 min",
    difficulty: "Easy",
    ingredients: [
      { name: "Flat Bread", quantity: "1 piece" },
      { name: "Pesto Sauce", quantity: "25 gm" },
      { name: "Mozzarella Cheese", quantity: "50 gm" },
      { name: "Cherry Tomato", quantity: "10 gm" },
      { name: "Rocket", quantity: "5 gm" },
      { name: "Black Olives", quantity: "5 gm" },
      { name: "Capsicum", quantity: "10 gm" },
      { name: "Oregano Sachet", quantity: "1 piece" },
      { name: "Chilli Flakes Sachet", quantity: "1 piece" },
    ],
    steps: [
      { ingredient: "Oven", quantity: "220 C preheat", placement: "In the OTG oven", action: "Preheat oven to 220 C (430 F) before assembling the pizza.", duration: "5 min" },
      { ingredient: "Flat Bread + Pesto Sauce", quantity: "1 piece + 25 gm", placement: "On the flatbread base", action: "Spread pesto generously across the flatbread.", duration: "1 min" },
      { ingredient: "Mozzarella Cheese + Cherry Tomato + Capsicum + Black Olives", quantity: "50 gm + 10 gm + 10 gm + 5 gm", placement: "Evenly over the pesto layer", action: "Top the flatbread with cheese and vegetables.", duration: "1 min" },
      { ingredient: "Assembled pizza", quantity: "1", placement: "Into the preheated oven", action: "Bake until golden and bubbly at 180 C.", duration: "5-7 min" },
      { ingredient: "Rocket", quantity: "5 gm", placement: "On top after baking", action: "Finish with fresh rocket and a light drizzle of olive oil.", duration: "30 sec" },
      { ingredient: "Oregano Sachet + Chilli Flakes Sachet", quantity: "1 piece + 1 piece", placement: "Served on the side", action: "Serve with oregano and chilli flakes.", duration: "15 sec" },
    ],
  },
];

window.RECIPES = RECIPES;
