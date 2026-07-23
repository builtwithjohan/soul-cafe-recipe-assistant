(function () {
  "use strict";

  function toSteps(actions) {
    return actions.map((action) => ({
      ingredient: "",
      quantity: "",
      placement: "",
      action: action,
      duration: "",
    }));
  }

  function ingredient(name, quantity) {
    return { name: name, quantity: quantity };
  }

  function hotSizes(size175, size250, size325) {
    return {
      hot: {
        "175ml": size175,
        "250ml": size250,
        "325ml": size325,
      },
    };
  }

  function coldSizes(size250, size325, size350) {
    return {
      cold: {
        "250ml": size250,
        "325ml": size325,
        "350ml": size350,
      },
    };
  }

  const DRINKS = [
    {
      id: "cafe-latte",
      name: "Cafe Latte",
      emoji: "☕",
      description: "Hot Drink",
      category: "drinks",
      drinkType: "hot",
      servings: 1,
      time: "5 min",
      difficulty: "Easy",
      temperatures: { hot: true, cold: false },
      sizes: { "175ml": true, "250ml": true, "325ml": true, "350ml": false },
      ingredients: [
        ingredient("Espresso", "1 shot"),
        ingredient("Steamed Milk", "180 ml"),
        ingredient("Sugar", "1 tsp"),
      ],
      ingredientVariants: hotSizes(
        [ingredient("Espresso", "1 shot"), ingredient("Steamed Milk", "125 ml"), ingredient("Sugar", "1 tsp")],
        [ingredient("Espresso", "1 shot"), ingredient("Steamed Milk", "180 ml"), ingredient("Sugar", "1 tsp")],
        [ingredient("Espresso", "2 shots"), ingredient("Steamed Milk", "240 ml"), ingredient("Sugar", "1.5 tsp")]
      ),
      steps: toSteps([
        "Pull a single shot of espresso into a cup.",
        "Steam the milk until glossy and velvety.",
        "Pour the steamed milk over the espresso.",
        "Serve hot.",
      ]),
    },
    {
      id: "masala-chai",
      name: "Masala Chai",
      emoji: "🍵",
      description: "Hot Drink",
      category: "drinks",
      drinkType: "hot",
      servings: 1,
      time: "8 min",
      difficulty: "Easy",
      temperatures: { hot: true, cold: false },
      sizes: { "175ml": true, "250ml": true, "325ml": true, "350ml": false },
      ingredients: [
        ingredient("Water", "100 ml"),
        ingredient("Milk", "100 ml"),
        ingredient("Tea leaves", "1 tsp"),
        ingredient("Chai masala", "1/4 tsp"),
        ingredient("Ginger", "1 slice"),
        ingredient("Sugar", "2 tsp"),
      ],
      ingredientVariants: hotSizes(
        [
          ingredient("Water", "75 ml"),
          ingredient("Milk", "75 ml"),
          ingredient("Tea leaves", "3/4 tsp"),
          ingredient("Chai masala", "1/8 tsp"),
          ingredient("Ginger", "1 small slice"),
          ingredient("Sugar", "1.5 tsp"),
        ],
        [
          ingredient("Water", "100 ml"),
          ingredient("Milk", "100 ml"),
          ingredient("Tea leaves", "1 tsp"),
          ingredient("Chai masala", "1/4 tsp"),
          ingredient("Ginger", "1 slice"),
          ingredient("Sugar", "2 tsp"),
        ],
        [
          ingredient("Water", "140 ml"),
          ingredient("Milk", "140 ml"),
          ingredient("Tea leaves", "1.25 tsp"),
          ingredient("Chai masala", "1/3 tsp"),
          ingredient("Ginger", "2 slices"),
          ingredient("Sugar", "2.5 tsp"),
        ]
      ),
      steps: toSteps([
        "Boil the water with ginger and chai masala.",
        "Add the tea leaves and simmer for 2 minutes.",
        "Add the milk and sugar, then bring to a boil.",
        "Strain into a cup and serve hot.",
      ]),
    },
    {
      id: "hot-chocolate",
      name: "Hot Chocolate",
      emoji: "☕",
      description: "Hot Drink",
      category: "drinks",
      drinkType: "hot",
      servings: 1,
      time: "6 min",
      difficulty: "Easy",
      temperatures: { hot: true, cold: false },
      sizes: { "175ml": true, "250ml": true, "325ml": true, "350ml": false },
      ingredients: [
        ingredient("Milk", "200 ml"),
        ingredient("Dark chocolate", "30 gm"),
        ingredient("Cocoa powder", "1 tsp"),
        ingredient("Sugar", "1 tsp"),
      ],
      ingredientVariants: hotSizes(
        [
          ingredient("Milk", "150 ml"),
          ingredient("Dark chocolate", "22 gm"),
          ingredient("Cocoa powder", "3/4 tsp"),
          ingredient("Sugar", "3/4 tsp"),
        ],
        [
          ingredient("Milk", "200 ml"),
          ingredient("Dark chocolate", "30 gm"),
          ingredient("Cocoa powder", "1 tsp"),
          ingredient("Sugar", "1 tsp"),
        ],
        [
          ingredient("Milk", "260 ml"),
          ingredient("Dark chocolate", "38 gm"),
          ingredient("Cocoa powder", "1.25 tsp"),
          ingredient("Sugar", "1.5 tsp"),
        ]
      ),
      steps: toSteps([
        "Warm the milk in a saucepan over low heat.",
        "Add the chopped dark chocolate and cocoa powder.",
        "Whisk until smooth and fully melted.",
        "Pour into a mug and serve hot.",
      ]),
    },
    {
      id: "classic-cold-coffee",
      name: "Classic Cold Coffee",
      emoji: "🧊",
      description: "Iced Drink",
      category: "drinks",
      drinkType: "iced",
      servings: 1,
      time: "5 min",
      difficulty: "Easy",
      temperatures: { hot: false, cold: true },
      sizes: { "175ml": false, "250ml": true, "325ml": true, "350ml": true },
      ingredients: [
        ingredient("Chilled milk", "200 ml"),
        ingredient("Instant coffee", "1 tsp"),
        ingredient("Sugar", "2 tsp"),
        ingredient("Ice cubes", "4"),
        ingredient("Vanilla ice cream", "1 scoop"),
      ],
      ingredientVariants: coldSizes(
        [
          ingredient("Chilled milk", "200 ml"),
          ingredient("Instant coffee", "1 tsp"),
          ingredient("Sugar", "2 tsp"),
          ingredient("Ice cubes", "4"),
          ingredient("Vanilla ice cream", "1 scoop"),
        ],
        [
          ingredient("Chilled milk", "250 ml"),
          ingredient("Instant coffee", "1.25 tsp"),
          ingredient("Sugar", "2.5 tsp"),
          ingredient("Ice cubes", "5"),
          ingredient("Vanilla ice cream", "1 scoop"),
        ],
        [
          ingredient("Chilled milk", "275 ml"),
          ingredient("Instant coffee", "1.5 tsp"),
          ingredient("Sugar", "3 tsp"),
          ingredient("Ice cubes", "6"),
          ingredient("Vanilla ice cream", "1.5 scoops"),
        ]
      ),
      steps: toSteps([
        "Blend the chilled milk, coffee, and sugar until frothy.",
        "Add the ice cubes and blend briefly.",
        "Pour into a tall glass.",
        "Top with a scoop of vanilla ice cream and serve.",
      ]),
    },
    {
      id: "iced-lemon-tea",
      name: "Iced Lemon Tea",
      emoji: "🧋",
      description: "Iced Drink",
      category: "drinks",
      drinkType: "iced",
      servings: 1,
      time: "7 min",
      difficulty: "Easy",
      temperatures: { hot: false, cold: true },
      sizes: { "175ml": false, "250ml": true, "325ml": true, "350ml": true },
      ingredients: [
        ingredient("Brewed black tea", "200 ml"),
        ingredient("Lemon juice", "15 ml"),
        ingredient("Sugar syrup", "20 ml"),
        ingredient("Ice cubes", "5"),
        ingredient("Lemon slice", "1"),
      ],
      ingredientVariants: coldSizes(
        [
          ingredient("Brewed black tea", "200 ml"),
          ingredient("Lemon juice", "15 ml"),
          ingredient("Sugar syrup", "20 ml"),
          ingredient("Ice cubes", "5"),
          ingredient("Lemon slice", "1"),
        ],
        [
          ingredient("Brewed black tea", "260 ml"),
          ingredient("Lemon juice", "18 ml"),
          ingredient("Sugar syrup", "24 ml"),
          ingredient("Ice cubes", "6"),
          ingredient("Lemon slice", "1"),
        ],
        [
          ingredient("Brewed black tea", "280 ml"),
          ingredient("Lemon juice", "20 ml"),
          ingredient("Sugar syrup", "26 ml"),
          ingredient("Ice cubes", "7"),
          ingredient("Lemon slice", "1"),
        ]
      ),
      steps: toSteps([
        "Brew the black tea and let it cool.",
        "Stir in the lemon juice and sugar syrup.",
        "Fill a glass with ice cubes.",
        "Pour the tea over the ice and garnish with a lemon slice.",
      ]),
    },
  ];

  window.DRINKS = DRINKS;
})();
