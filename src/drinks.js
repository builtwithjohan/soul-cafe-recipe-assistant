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

  function ingredients(entries) {
    return entries.map((entry) => ingredient(entry[0], entry[1]));
  }

  function drink(config) {
    const temperature = config.temperature;
    const variants = Object.fromEntries(
      Object.entries(config.variants).map(([size, entries]) => [size, ingredients(entries)])
    );
    const preferredSize = temperature === "hot" ? "250ml" : "325ml";
    const baseIngredients = variants[preferredSize] || variants[Object.keys(variants)[0]] || [];

    return {
      id: config.id,
      name: config.name,
      emoji: config.emoji || (temperature === "hot" ? "☕" : "🧊"),
      description: config.description || (temperature === "hot" ? "Hot Drink" : "Iced Drink"),
      category: "drinks",
      drinkType: temperature === "hot" ? "hot" : "iced",
      servings: 1,
      time: config.time || "5 min",
      difficulty: config.difficulty || "Easy",
      temperatures: { hot: temperature === "hot", cold: temperature === "cold" },
      sizes: {
        "175ml": Boolean(variants["175ml"]),
        "250ml": Boolean(variants["250ml"]),
        "325ml": Boolean(variants["325ml"]),
        "350ml": Boolean(variants["350ml"]),
      },
      ingredients: baseIngredients,
      ingredientVariants: { [temperature]: variants },
      steps: toSteps(config.steps),
    };
  }

  const DRINKS = [
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
      sizes: { "175ml": true, "250ml": true, "325ml": false, "350ml": true },
      ingredients: [ingredient("Chocolate Sauce", "45 gm"), ingredient("Milk", "180 ml")],
      ingredientVariants: {
        hot: {
          "175ml": [ingredient("Chocolate Sauce", "30 gm"), ingredient("Milk", "120 ml")],
          "250ml": [ingredient("Chocolate Sauce", "45 gm"), ingredient("Milk", "180 ml")],
          "350ml": [ingredient("Chocolate Sauce", "60 gm"), ingredient("Milk", "240 ml")],
        },
      },
      steps: toSteps([
        "Place a pitcher on the weighing scale.",
        "Add chocolate sauce and milk as measured.",
        "Steam the milk and chocolate together, stirring with a spoon.",
        "Pour into a serving cup and dust with cocoa powder.",
        "Serve with a dessert spoon.",
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
        ingredient("Ice", "120 gm"),
        ingredient("Milk", "90 ml"),
        ingredient("Whip Cream", "45 gm"),
        ingredient("Espresso", "60 ml"),
        ingredient("Syrup (if any)", "21 ml"),
      ],
      ingredientVariants: coldSizes(
        [
          ingredient("Ice", "100 gm"),
          ingredient("Milk", "60 ml"),
          ingredient("Whip Cream", "30 gm"),
          ingredient("Espresso", "45 ml"),
          ingredient("Syrup (if any)", "15 ml"),
        ],
        [
          ingredient("Ice", "120 gm"),
          ingredient("Milk", "90 ml"),
          ingredient("Whip Cream", "45 gm"),
          ingredient("Espresso", "60 ml"),
          ingredient("Syrup (if any)", "21 ml"),
        ],
        [
          ingredient("Ice", "140 gm"),
          ingredient("Milk", "90 ml"),
          ingredient("Whip Cream", "45 gm"),
          ingredient("Espresso", "60 ml"),
          ingredient("Syrup (if any)", "21 ml"),
        ]
      ),
      steps: toSteps([
        "Pull a double espresso.",
        "Place a shaker on the weighing scale and tare to zero.",
        "Add whipping cream, espresso, milk, syrup if requested, and ice.",
        "Shake for 3 minutes.",
        "Pour into a clean glass and serve with a straw.",
      ]),
    },
    {
      id: "iced-lemon-tea",
      name: "Lemon Iced Tea",
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
        ingredient("Ice", "100 gm"),
        ingredient("Water", "180 ml"),
        ingredient("Lemon Iced Tea Syrup", "45 ml"),
      ],
      ingredientVariants: coldSizes(
        [
          ingredient("Ice", "100 gm"),
          ingredient("Water", "120 ml"),
          ingredient("Lemon Iced Tea Syrup", "30 ml"),
        ],
        [
          ingredient("Ice", "100 gm"),
          ingredient("Water", "180 ml"),
          ingredient("Lemon Iced Tea Syrup", "45 ml"),
        ],
        [
          ingredient("Ice", "120 gm"),
          ingredient("Water", "180 ml"),
          ingredient("Lemon Iced Tea Syrup", "45 ml"),
        ]
      ),
      steps: toSteps([
        "Place a shaker on the weighing scale.",
        "Add ice, water, lemon iced tea syrup, and mint leaves.",
        "Shake for 3 minutes.",
        "Pour into a clean iced-tea glass and serve with a straw.",
      ]),
    },
    drink({
      id: "espresso",
      name: "Espresso",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"]],
        "250ml": [["Espresso", "60 ml"]],
        "350ml": [["Espresso", "60 ml"]],
      },
      steps: ["Pull a 30 ml shot from 9 gm coffee grounds."],
    }),
    drink({
      id: "cortado",
      name: "Cortado",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk", "30 ml"], ["Syrup (as required)", "7 ml"]],
        "250ml": [["Espresso", "60 ml"], ["Milk", "60 ml"], ["Syrup (as required)", "15 ml"]],
        "350ml": [["Espresso", "60 ml"], ["Milk", "60 ml"], ["Syrup (as required)", "15 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Steam the milk in a pitcher.",
        "Add the espresso to a serving cup.",
        "Add steamed milk in equal proportion to the espresso.",
      ],
    }),
    drink({
      id: "macchiato",
      name: "Macchiato",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk foam", "5 gm"], ["Syrup (as required)", "7 ml"]],
        "250ml": [["Espresso", "60 ml"], ["Milk foam", "10 gm"], ["Syrup (as required)", "15 ml"]],
        "350ml": [["Espresso", "60 ml"], ["Milk foam", "10 gm"], ["Syrup (as required)", "15 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup.",
        "Top the espresso with milk foam.",
      ],
    }),
    drink({
      id: "hot-americano",
      name: "Hot Americano",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Water", "120 ml"]],
        "250ml": [["Espresso", "45 ml"], ["Water", "180 ml"]],
        "350ml": [["Espresso", "60 ml"], ["Water", "240 ml"]],
      },
      steps: ["Pull the espresso shot.", "Add the espresso to a serving cup.", "Add hot water and serve."],
    }),
    drink({
      id: "cappuccino",
      name: "Cappuccino",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "45 ml"], ["Milk", "90 ml"], ["Milk Foam", "30 gm"], ["Syrup (as required)", "7 ml"]],
        "250ml": [["Espresso", "60 ml"], ["Milk", "120 ml"], ["Milk Foam", "50 gm"], ["Syrup (as required)", "10.5 ml"]],
        "350ml": [["Espresso", "90 ml"], ["Milk", "180 ml"], ["Milk Foam", "60 gm"], ["Syrup (as required)", "15 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup.",
        "Add the steamed milk and finish with latte art.",
      ],
    }),
    drink({
      id: "latte",
      name: "Latte",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk", "110 ml"], ["Foam", "30 gm"], ["Syrup (as required)", "7 ml"]],
        "250ml": [["Espresso", "45 ml"], ["Milk", "150 ml"], ["Foam", "35 gm"], ["Syrup (as required)", "10.5 ml"]],
        "350ml": [["Espresso", "60 ml"], ["Milk", "220 ml"], ["Foam", "50 gm"], ["Syrup (as required)", "15 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup.",
        "Add the steamed milk and finish with latte art.",
      ],
    }),
    drink({
      id: "flat-white",
      name: "Flat White",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk", "140 ml"], ["Syrup (as required)", "7 ml"]],
        "250ml": [["Espresso", "45 ml"], ["Milk", "200 ml"], ["Syrup (as required)", "10.5 ml"]],
        "350ml": [["Espresso", "60 ml"], ["Milk", "270 ml"], ["Syrup (as required)", "15 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup.",
        "Add the steamed milk and finish with latte art.",
      ],
    }),
    drink({
      id: "hot-mocha-sea-salt-mocha",
      name: "Mocha Hot / Sea Salt Mocha Hot",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk", "120 ml"], ["Chocolate Sauce", "15 ml"], ["Sea Salt (optional)", "3 spins"]],
        "250ml": [["Espresso", "45 ml"], ["Milk", "180 ml"], ["Chocolate Sauce", "22 ml"], ["Sea Salt (optional)", "4 spins"]],
        "350ml": [["Espresso", "60 ml"], ["Milk", "240 ml"], ["Chocolate Sauce", "30 ml"], ["Sea Salt (optional)", "5 spins"]],
      },
      steps: [
        "Pull an espresso shot and add chocolate sauce.",
        "For Sea Salt Mocha, stir the sea salt into the espresso twice.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup, then add steamed milk.",
        "Finish with latte art, cocoa powder, or chocolate sauce.",
      ],
    }),
    drink({
      id: "nutmeg-cinnamon-latte",
      name: "Nutmeg Cinnamon Latte",
      temperature: "hot",
      variants: {
        "175ml": [["Espresso", "30 ml"], ["Milk", "120 ml"], ["Foam", "30 gm"], ["Cinnamon", "2 gm"], ["Nutmeg", "1 gm"]],
        "250ml": [["Espresso", "60 ml"], ["Milk", "150 ml"], ["Foam", "40 gm"], ["Cinnamon", "2 gm"], ["Nutmeg", "1 gm"]],
        "350ml": [["Espresso", "60 ml"], ["Milk", "180 ml"], ["Foam", "60 gm"], ["Cinnamon", "4 gm"], ["Nutmeg", "2 gm"]],
      },
      steps: [
        "Pull an espresso shot.",
        "Grate nutmeg into the espresso and add cinnamon powder twice using a stirrer.",
        "Steam the milk to the correct temperature.",
        "Add the espresso to a serving cup, then add steamed milk and finish with latte art.",
      ],
    }),
    drink({
      id: "french-hot-chocolate",
      name: "French Hot Chocolate",
      temperature: "hot",
      variants: {
        "175ml": [["Callebaut Chocolate", "25 gm"], ["Milk", "130 ml"], ["Chocolate Sauce", "15 ml"]],
        "250ml": [["Callebaut Chocolate", "25 gm"], ["Milk", "200 ml"], ["Chocolate Sauce", "20 gm"]],
        "350ml": [["Callebaut Chocolate", "50 gm"], ["Milk", "280 ml"], ["Chocolate Sauce", "20 ml"]],
      },
      steps: [
        "Place a pitcher on the weighing scale.",
        "Add Callebaut callets, chocolate sauce, and milk as measured.",
        "Steam and stir the milk and chocolate together.",
        "Pour into a serving cup, dust with cocoa powder, and serve with a dessert spoon.",
      ],
    }),
    drink({
      id: "affogato",
      name: "Affogato",
      temperature: "cold",
      variants: {
        "250ml": [["Espresso", "30 ml"], ["Vanilla Ice Cream", "50 gm"]],
      },
      steps: [
        "Pull a double espresso.",
        "Add two scoops of vanilla ice cream to a clean cup.",
        "Pour over the espresso and serve with a dessert spoon.",
      ],
    }),
    drink({
      id: "iced-americano",
      name: "Iced Americano",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Espresso", "30 ml"], ["Water", "90 ml"]],
        "325ml": [["Ice", "80 gm"], ["Espresso", "60 ml"], ["Water", "180 ml"]],
        "350ml": [["Ice", "120 gm"], ["Espresso", "60 ml"], ["Water", "180 ml"]],
      },
      steps: ["Pull the espresso shot.", "Add water and ice to a clean glass.", "Pour in the espresso and serve with a straw."],
    }),
    drink({
      id: "iced-cappuccino",
      name: "Iced Cappuccino",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Espresso", "30 ml"], ["Milk", "120 ml"], ["Syrup (if any)", "15 ml"]],
        "325ml": [["Ice", "100 gm"], ["Espresso", "45 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
        "350ml": [["Ice", "120 gm"], ["Espresso", "45 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
      },
      steps: [
        "Pull the espresso shot.",
        "Add ice and milk to a shaker, then pour in the espresso.",
        "Shake for 3 minutes.",
        "Pour into a clean glass and serve with a straw.",
      ],
    }),
    drink({
      id: "iced-latte",
      name: "Iced Latte",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Espresso", "30 ml"], ["Milk", "120 ml"], ["Syrup (if any)", "15 ml"]],
        "325ml": [["Ice", "100 gm"], ["Espresso", "45 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
        "350ml": [["Ice", "120 gm"], ["Espresso", "60 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
      },
      steps: ["Pull the espresso shot.", "Add ice and milk to a clean glass.", "Pour in the espresso and serve with a straw."],
    }),
    drink({
      id: "iced-flat-white",
      name: "Iced Flat White",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Espresso", "30 ml"], ["Milk", "120 ml"], ["Syrup (if any)", "15 ml"]],
        "325ml": [["Ice", "100 gm"], ["Espresso", "45 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
        "350ml": [["Ice", "120 gm"], ["Espresso", "60 ml"], ["Milk", "180 ml"], ["Syrup (if any)", "21 ml"]],
      },
      steps: ["Pull the espresso shot.", "Add ice and milk to a clean glass.", "Pour in the espresso and serve with a straw."],
    }),
    drink({
      id: "iced-chocolate",
      name: "Iced Chocolate",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Milk", "120 ml"], ["Chocolate Sauce", "30 gm"]],
        "325ml": [["Ice", "120 gm"], ["Milk", "160 ml"], ["Chocolate Sauce", "45 gm"]],
        "350ml": [["Ice", "140 gm"], ["Milk", "160 ml"], ["Chocolate Sauce", "45 gm"]],
      },
      steps: [
        "Place a shaker on the weighing scale.",
        "Add the measured ice, milk, and chocolate sauce.",
        "Shake for 3 minutes.",
        "Pour into a clean glass.",
      ],
    }),
    drink({
      id: "coconut-iced-filter-coffee",
      name: "Coconut Iced Filter Coffee",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Espresso", "60 ml"], ["Coconut Milk", "60 ml"], ["Cinnamon", "2 dashes"], ["Jaggery", "17.5 gm"]],
        "325ml": [["Ice", "120 gm"], ["Espresso", "60 ml"], ["Coconut Milk", "80 ml"], ["Cinnamon", "3 dashes"], ["Jaggery", "20 gm"]],
        "350ml": [["Ice", "140 gm"], ["Espresso", "90 ml"], ["Coconut Milk", "120 ml"], ["Cinnamon", "3 dashes"], ["Jaggery", "25 gm"]],
      },
      steps: [
        "Place a shaker on the weighing scale.",
        "Add ice, coconut milk, jaggery powder, cinnamon, and espresso as measured.",
        "Shake for 3 minutes.",
        "Pour into a clean glass.",
      ],
    }),
    drink({
      id: "iced-mocha",
      name: "Iced Mocha",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Milk", "90 ml"], ["Espresso", "30 ml"], ["Chocolate Sauce", "15 ml"]],
        "325ml": [["Ice", "120 gm"], ["Milk", "135 ml"], ["Espresso", "45 ml"], ["Chocolate Sauce", "23 ml"]],
        "350ml": [["Ice", "140 gm"], ["Milk", "135 ml"], ["Espresso", "60 ml"], ["Chocolate Sauce", "23 ml"]],
      },
      steps: [
        "Pull the espresso shot and add chocolate sauce.",
        "Place a shaker on the weighing scale and add ice and milk.",
        "Add the espresso mixture and shake for 3 minutes.",
        "Pour into a clean glass.",
      ],
    }),
    drink({
      id: "iced-sea-salt-mocha",
      name: "Iced Sea Salt Mocha",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Milk", "90 ml"], ["Espresso", "30 ml"], ["Chocolate Sauce", "15 ml"], ["Sea Salt", "1 gm"]],
        "325ml": [["Ice", "120 gm"], ["Milk", "135 ml"], ["Espresso", "45 ml"], ["Chocolate Sauce", "23 ml"], ["Sea Salt", "1 gm"]],
        "350ml": [["Ice", "140 gm"], ["Milk", "135 ml"], ["Espresso", "45 ml"], ["Chocolate Sauce", "23 ml"], ["Sea Salt", "4-5 circles"]],
      },
      steps: [
        "Pull the espresso shot, stir in sea salt twice, and add chocolate sauce.",
        "Place a shaker on the weighing scale and add ice and milk.",
        "Add the espresso mixture and shake for 3 minutes.",
        "Pour into a clean glass.",
      ],
    }),
    drink({
      id: "classic-cold-brew",
      name: "Classic Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "150 ml"]],
        "325ml": [["Ice", "120 gm"], ["Cold Brew", "200 ml"]],
        "350ml": [["Ice", "120 gm"], ["Cold Brew", "220 ml"]],
      },
      steps: ["Add ice to a clean glass.", "Shake the cold brew bottle well.", "Pour the measured cold brew into the glass and serve with a straw."],
    }),
    drink({
      id: "vietnamese-cold-brew",
      name: "Vietnamese Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Condensed Milk", "30 gm or 2 tbsp"], ["Ice", "100 gm"], ["Cold Brew", "120 ml"]],
        "325ml": [["Condensed Milk", "45 gm or 3 tbsp"], ["Ice", "120 gm"], ["Cold Brew", "160 ml"]],
        "350ml": [["Condensed Milk", "45 gm or 3 tbsp"], ["Ice", "140 gm"], ["Cold Brew", "160 ml"]],
      },
      steps: ["Place a clean glass on the weighing scale and tare to zero.", "Add ice, condensed milk, and cold brew as measured.", "Stir well and serve."],
    }),
    drink({
      id: "sparkling-vanilla-brew",
      name: "Sparkling Vanilla Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "80 gm"], ["Soda", "100 ml"], ["Vanilla Syrup", "15 ml"], ["Cold Brew", "60 ml"]],
        "325ml": [["Ice", "100 gm"], ["Soda", "120 ml"], ["Vanilla Syrup", "21 ml"], ["Cold Brew", "90 ml"]],
        "350ml": [["Ice", "100 gm"], ["Soda", "150 ml"], ["Vanilla Syrup", "21 ml"], ["Cold Brew", "90 ml"]],
      },
      steps: ["Add ice, soda, and vanilla syrup to a clean glass.", "Shake the cold brew bottle well.", "Pour cold brew over an inverted spoon to form a layer.", "Serve with a straw."],
    }),
    drink({
      id: "orange-cold-brew",
      name: "Orange Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "100 ml"], ["Orange Juice", "50 ml"], ["Vanilla Syrup", "7 ml"]],
        "325ml": [["Ice", "120 gm"], ["Cold Brew", "120 ml"], ["Orange Juice", "60 ml"], ["Vanilla Syrup", "7 ml"]],
        "350ml": [["Ice", "140 gm"], ["Cold Brew", "120 ml"], ["Orange Juice", "60 ml"], ["Vanilla Syrup", "7 ml"]],
      },
      steps: ["Add ice, orange juice, and vanilla syrup to a clean glass.", "Shake the cold brew bottle well.", "Pour cold brew over an inverted spoon to form a layer.", "Serve with a straw."],
    }),
    drink({
      id: "ginger-ale-cold-brew",
      name: "Ginger Ale Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "60 ml"], ["Ginger Ale", "90 ml"]],
        "325ml": [["Ice", "120 gm"], ["Cold Brew", "80 ml"], ["Ginger Ale", "120 ml"]],
        "350ml": [["Ice", "120 gm"], ["Cold Brew", "90 ml"], ["Ginger Ale", "135 ml"]],
      },
      steps: ["Add ice and ginger ale to a clean glass.", "Shake the cold brew bottle well.", "Pour cold brew over an inverted spoon to form a layer.", "Serve with a straw."],
    }),
    drink({
      id: "sweet-vanilla-cream-cold-brew",
      name: "Sweet Vanilla Cream Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "120 ml"], ["Vanilla Syrup", "10 ml"], ["Whip Cream", "10 gm"]],
        "325ml": [["Ice", "110 gm"], ["Cold Brew", "180 ml"], ["Vanilla Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
        "350ml": [["Ice", "120 gm"], ["Cold Brew", "180 ml"], ["Vanilla Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
      },
      steps: ["Add ice to a clean glass.", "Shake the cold brew bottle well and pour it into the glass.", "Add vanilla syrup and top with whipped cream.", "Stir with a bar spoon and serve with a straw."],
    }),
    drink({
      id: "sweet-hazelnut-cream-cold-brew",
      name: "Sweet Hazelnut Cream Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "120 ml"], ["Hazelnut Syrup", "10 ml"], ["Whip Cream", "10 gm"]],
        "325ml": [["Ice", "110 gm"], ["Cold Brew", "180 ml"], ["Hazelnut Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
        "350ml": [["Ice", "120 gm"], ["Cold Brew", "180 ml"], ["Hazelnut Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
      },
      steps: ["Add ice to a clean glass.", "Shake the cold brew bottle well and pour it into the glass.", "Add hazelnut syrup and top with whipped cream.", "Stir with a bar spoon and serve with a straw."],
    }),
    drink({
      id: "chocolate-cold-brew-cold-foam",
      name: "Chocolate Cold Brew Cold Foam",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Cold Brew", "120 ml"], ["Chocolate Syrup", "10 ml"], ["Whip Cream", "10 gm"]],
        "325ml": [["Ice", "110 gm"], ["Cold Brew", "180 ml"], ["Chocolate Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
        "350ml": [["Ice", "120 gm"], ["Cold Brew", "180 ml"], ["Chocolate Syrup", "15 ml"], ["Whip Cream", "15 gm"]],
      },
      steps: [
        "Whisk whipping cream, milk, and chocolate sauce into a pourable cold foam.",
        "Add ice to a clean glass.",
        "Shake the cold brew bottle well and pour it into the glass.",
        "Add cold foam slowly over an inverted spoon to form a layer.",
      ],
    }),
    drink({
      id: "tiramisu-cold-foam-cold-brew",
      name: "Tiramisu Cold Foam Cold Brew",
      temperature: "cold",
      variants: {
        "250ml": [["Cold Brew", "120 ml"], ["Tiramisu Syrup", "18.5 ml (3 pumps)"], ["Ice", "100 gm"], ["Milk", "15 ml"], ["Whip Cream", "30 ml"]],
        "325ml": [["Cold Brew", "180 ml"], ["Tiramisu Syrup", "4 pumps"], ["Ice", "100 gm"], ["Milk", "15 ml"], ["Whip Cream", "30 ml"]],
        "350ml": [["Cold Brew", "180 ml"], ["Tiramisu Syrup", "4 pumps"], ["Ice", "100 gm"], ["Milk", "15 ml"], ["Whip Cream", "30 ml"]],
      },
      steps: [
        "Whisk whipping cream, milk, and tiramisu syrup into a pourable cold foam.",
        "Add ice to a clean glass.",
        "Shake the cold brew bottle well and pour it into the glass.",
        "Add cold foam slowly over an inverted spoon and dust with cocoa powder.",
      ],
    }),
    drink({
      id: "peach-iced-tea",
      name: "Peach Iced Tea",
      emoji: "🧋",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "100 gm"], ["Water", "120 ml"], ["Peach Iced Tea Syrup", "30 ml"]],
        "325ml": [["Ice", "100 gm"], ["Water", "180 ml"], ["Peach Iced Tea Syrup", "45 ml"]],
        "350ml": [["Ice", "120 gm"], ["Water", "180 ml"], ["Peach Iced Tea Syrup", "45 ml"]],
      },
      steps: ["Add ice, water, peach iced tea syrup, and mint leaves to a shaker.", "Shake for 3 minutes.", "Pour into a clean iced-tea glass and serve with a straw."],
    }),
    drink({
      id: "cool-green-ocean-iced-tea",
      name: "Cool Green Ocean Iced Tea",
      emoji: "🧋",
      temperature: "cold",
      variants: {
        "250ml": [["Cool Green Ocean Tea", "1 gm or 2 tsp"], ["Water", "150 ml"], ["Ice", "100 gm"], ["Honey", "30 gm"]],
        "325ml": [["Cool Green Ocean Tea", "1 gm or 3 tsp"], ["Water", "200 ml"], ["Ice", "120 gm"], ["Honey", "40 gm"]],
        "350ml": [["Cool Green Ocean Tea", "1 gm or 3 tsp"], ["Water", "220 ml"], ["Ice", "140 gm"], ["Honey", "45 gm"]],
      },
      steps: ["Brew the tea leaves in 30 ml warm water for 5 minutes.", "Add ice, water, honey, and the brewed tea to a shaker.", "Shake well, pour into an iced-tea glass, and serve with a straw."],
    }),
    drink({
      id: "purple-iced-tea",
      name: "Purple Iced Tea",
      emoji: "🧋",
      temperature: "cold",
      variants: {
        "250ml": [["4 pm Purple Tea", "1 gm or 2 tsp"], ["Water", "150 ml"], ["Ice", "100 gm"], ["Honey", "30 gm"]],
        "325ml": [["4 pm Purple Tea", "1 gm or 3 tsp"], ["Water", "200 ml"], ["Ice", "120 gm"], ["Honey", "40 gm"]],
        "350ml": [["4 pm Purple Tea", "1 gm or 3 tsp"], ["Water", "220 ml"], ["Ice", "140 gm"], ["Honey", "45 gm"]],
      },
      steps: ["Brew the tea leaves in 30 ml warm water for 5 minutes.", "Add ice, water, honey, and the brewed tea to a shaker.", "Shake well, pour into an iced-tea glass, and serve with a straw."],
    }),
    drink({
      id: "blueberry-iced-tea",
      name: "Blueberry Iced Tea",
      emoji: "🧋",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "80 gm"], ["Blueberry Powder", "60 gm"], ["Water", "120 ml"]],
      },
      steps: ["Add ice, water, and blueberry powder to a shaker.", "Shake for 3 minutes.", "Pour into a clean iced-tea glass and serve with a straw."],
    }),
    drink({
      id: "classic-green-tea",
      name: "Classic Green Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["Green Tea", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["Green Tea", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["Green Tea", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the tea leaves in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "english-breakfast-tea",
      name: "English Breakfast Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["English Breakfast Tea", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["English Breakfast Tea", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["English Breakfast Tea", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the tea leaves in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "chamomile-tea",
      name: "Chamomile Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["Chamomile Flowers", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["Chamomile Flowers", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["Chamomile Flowers", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the chamomile flowers in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "himalayan-butterfly-blue-pea-tea",
      name: "Himalayan Butterfly Blue Pea Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["Butterfly Blue Pea Tea", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["Butterfly Blue Pea Tea", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["Butterfly Blue Pea Tea", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the blue pea flowers in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "cool-green-ocean-tea",
      name: "Cool Green Ocean Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["Cool Green Ocean Tea", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["Cool Green Ocean Tea", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["Cool Green Ocean Tea", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the tea leaves in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "4-pm-purple-tea",
      name: "4 pm Purple Tea - Hibiscus and Butterfly Pea Tea",
      emoji: "🍵",
      temperature: "hot",
      variants: {
        "175ml": [["4 pm Purple Tea", "1 gm"], ["Hot Water", "180 ml"]],
        "250ml": [["4 pm Purple Tea", "1 gm"], ["Hot Water", "260 ml"]],
        "350ml": [["4 pm Purple Tea", "1.5 gm"], ["Hot Water", "360 ml"]],
      },
      steps: ["Brew the tea flowers in 30 ml warm water in a French press.", "Strain into a clean cup and add the remaining hot water.", "Serve with honey on the side."],
    }),
    drink({
      id: "classic-matcha",
      name: "Classic Matcha",
      emoji: "🍵",
      temperature: "cold",
      variants: {
        "250ml": [["Hot Water", "40 ml"], ["Matcha", "4 gm"], ["Ice", "100 gm"], ["Water", "100 ml"]],
        "325ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "120 gm"], ["Water", "150 ml"]],
        "350ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "140 gm"], ["Water", "150 ml"]],
      },
      steps: ["Whisk matcha with hot water for 5 minutes.", "Add ice and water to a clean glass.", "Strain in the matcha, stir well, and serve with a straw."],
    }),
    drink({
      id: "strawberry-cold-foam-matcha",
      name: "Strawberry Cold Foam Matcha",
      emoji: "🍵",
      temperature: "cold",
      variants: {
        "250ml": [["Hot Water", "40 ml"], ["Matcha", "4 gm"], ["Whip Cream", "15 gm"], ["Strawberry Crush", "10 gm"], ["Milk", "80 ml"], ["Ice", "100 gm"]],
        "325ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Whip Cream", "20 gm"], ["Strawberry Crush", "15 gm"], ["Milk", "110 ml"], ["Ice", "120 gm"]],
        "350ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Whip Cream", "20 gm"], ["Strawberry Crush", "15 gm"], ["Milk", "110 ml"], ["Ice", "140 gm"]],
      },
      steps: ["Froth whipping cream, strawberry syrup, and a little milk into a pourable cold foam.", "Whisk matcha with hot water for 5 minutes.", "Add strawberry crush, ice, and milk to a clean glass.", "Strain in the matcha, top with cold foam, and serve with a straw."],
    }),
    drink({
      id: "matcha-latte",
      name: "Matcha Latte",
      emoji: "🍵",
      temperature: "cold",
      variants: {
        "250ml": [["Hot Water", "40 ml"], ["Matcha", "4 gm"], ["Ice", "100 gm"], ["Milk", "100 ml"]],
        "325ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "120 gm"], ["Milk", "130 ml"]],
        "350ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "140 gm"], ["Milk", "130 ml"]],
      },
      steps: ["Whisk matcha with hot water for 5 minutes.", "Add ice and milk to a clean glass.", "Strain in the matcha, stir well, and serve with a straw."],
    }),
    drink({
      id: "dirty-matcha",
      name: "Dirty Matcha",
      emoji: "🍵",
      temperature: "cold",
      variants: {
        "250ml": [["Hot Water", "40 ml"], ["Matcha", "4 gm"], ["Ice", "90 gm"], ["Milk", "90 ml"], ["Espresso", "30 ml"]],
        "325ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "90 gm"], ["Milk", "135 ml"], ["Espresso", "45 ml"]],
        "350ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "120 gm"], ["Milk", "135 ml"], ["Espresso", "45 ml"]],
      },
      steps: ["Pull an espresso shot and whisk matcha with hot water for 5 minutes.", "Add ice and milk to a clean glass.", "Add espresso, then matcha, and serve with a straw."],
    }),
    drink({
      id: "strawberry-matcha",
      name: "Strawberry Matcha",
      emoji: "🍵",
      temperature: "cold",
      variants: {
        "250ml": [["Hot Water", "40 ml"], ["Matcha", "4 gm"], ["Ice", "100 gm"], ["Water", "100 ml"], ["Strawberry Syrup", "7 ml"]],
        "325ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "120 gm"], ["Water", "150 ml"], ["Strawberry Syrup", "10 ml"]],
        "350ml": [["Hot Water", "50 ml"], ["Matcha", "5 gm"], ["Ice", "140 gm"], ["Water", "150 ml"], ["Strawberry Syrup", "10 ml"]],
      },
      steps: ["Whisk matcha with hot water for 5 minutes.", "Add ice, water, and strawberry syrup to a clean glass.", "Strain in the matcha, stir well, and serve with a straw."],
    }),
    drink({
      id: "hot-pour-over",
      name: "Whisky / Ethiopian / Tanzanian Hot Pour Over",
      emoji: "☕",
      temperature: "hot",
      variants: { "250ml": [["Coffee Beans", "20 gm"], ["Water", "320 ml"], ["Filter", "1"]] },
      time: "5 min",
      steps: [
        "Grind 20 gm coffee beans at grind size 15.",
        "Clean the V60 and jar, wet the cone filter, and add level coffee grounds.",
        "Use water at 90°C.",
        "Pour 50 ml from the center outward every 30 seconds until brewing is complete at 2 minutes.",
        "Discard the filter, swirl the jar, and serve.",
      ],
    }),
    drink({
      id: "iced-pour-over",
      name: "Whisky / Ethiopian / Tanzanian Iced Pour Over",
      emoji: "🧊",
      temperature: "cold",
      variants: { "250ml": [["Ice", "100 gm"], ["Coffee Beans", "20 gm"], ["Water", "320 ml"], ["Filter", "1"]] },
      time: "5 min",
      steps: [
        "Grind 20 gm coffee beans at grind size 15.",
        "Clean the V60 and jar, add ice to the jar, wet the cone filter, and add level coffee grounds.",
        "Use water at 90°C.",
        "Pour 50 ml from the center outward every 30 seconds until brewing is complete at 2 minutes.",
        "Discard the filter, swirl the jar, and serve.",
      ],
    }),
    drink({
      id: "french-press",
      name: "French Press",
      emoji: "☕",
      temperature: "hot",
      variants: { "250ml": [["Coffee Beans", "20 gm"], ["Water", "320 ml"]] },
      time: "10 min",
      steps: ["Grind 20 gm coffee beans at grind size 15.", "Add coffee and hot water to a French press.", "Close the lid and brew for 10 minutes.", "Press and strain into a cup."],
    }),
    drink({
      id: "south-indian-filter-coffee",
      name: "South Indian Filter Coffee",
      emoji: "☕",
      temperature: "hot",
      variants: { "250ml": [["Coffee Beans", "20 gm"], ["Water", "80 ml"], ["Milk", "90 ml"]] },
      time: "10 min",
      steps: ["Add coffee grounds and hot water to a filter coffee strainer.", "Close the lid and brew for 10 minutes.", "Steam the milk.", "Strain the coffee into a cup and add hot milk."],
    }),
    drink({
      id: "strawberry-frappe",
      name: "Strawberry Frappe",
      emoji: "🥤",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "120 gm"], ["Milk", "60 ml"], ["Frappe Powder", "30 gm"], ["Espresso", "30 ml"], ["Strawberry Syrup", "15 ml"]],
        "325ml": [["Ice", "140 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Strawberry Syrup", "21 ml"]],
        "350ml": [["Ice", "160 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Strawberry Syrup", "21 ml"]],
      },
      steps: ["Pull an espresso shot.", "Add ice, milk, strawberry syrup, frappe powder, and espresso to a shaker.", "Shake for 3 minutes and pour into a clean glass."],
    }),
    drink({
      id: "hazelnut-frappe",
      name: "Hazelnut Frappe",
      emoji: "🥤",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "120 gm"], ["Milk", "60 ml"], ["Frappe Powder", "30 gm"], ["Espresso", "30 ml"], ["Hazelnut Syrup", "15 ml"]],
        "325ml": [["Ice", "140 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Hazelnut Syrup", "21 ml"]],
        "350ml": [["Ice", "160 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Hazelnut Syrup", "21 ml"]],
      },
      steps: ["Pull an espresso shot.", "Add ice, milk, hazelnut syrup, frappe powder, and espresso to a shaker.", "Shake for 3 minutes and pour into a clean glass."],
    }),
    drink({
      id: "tiramisu-frappe",
      name: "Tiramisu Frappe",
      emoji: "🥤",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "120 gm"], ["Milk", "60 ml"], ["Frappe Powder", "30 gm"], ["Espresso", "30 ml"], ["Tiramisu Syrup", "15 ml"]],
        "325ml": [["Ice", "140 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Tiramisu Syrup", "21 ml"]],
        "350ml": [["Ice", "160 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Tiramisu Syrup", "21 ml"]],
      },
      steps: ["Pull an espresso shot.", "Add ice, milk, tiramisu syrup, frappe powder, and espresso to a shaker.", "Shake for 3 minutes and pour into a clean glass."],
    }),
    drink({
      id: "caramel-frappe",
      name: "Caramel Frappe",
      emoji: "🥤",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "120 gm"], ["Milk", "60 ml"], ["Frappe Powder", "30 gm"], ["Espresso", "30 ml"], ["Caramel Syrup", "15 ml"]],
        "325ml": [["Ice", "140 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Caramel Syrup", "21 ml"]],
        "350ml": [["Ice", "160 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Caramel Syrup", "21 ml"]],
      },
      steps: ["Pull an espresso shot.", "Add ice, milk, caramel syrup, frappe powder, and espresso to a shaker.", "Shake for 3 minutes and pour into a clean glass."],
    }),
    drink({
      id: "chocolate-frappe",
      name: "Chocolate Frappe",
      emoji: "🥤",
      temperature: "cold",
      variants: {
        "250ml": [["Ice", "120 gm"], ["Milk", "60 ml"], ["Frappe Powder", "30 gm"], ["Espresso", "30 ml"], ["Chocolate Sauce", "15 ml"]],
        "325ml": [["Ice", "140 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Chocolate Sauce", "21 ml"]],
        "350ml": [["Ice", "160 gm"], ["Milk", "90 ml"], ["Frappe Powder", "45 gm"], ["Espresso", "30 ml"], ["Chocolate Sauce", "21 ml"]],
      },
      steps: ["Pull an espresso shot.", "Add ice, milk, chocolate sauce, frappe powder, and espresso to a shaker.", "Shake for 3 minutes and pour into a clean glass."],
    }),
  ];

  window.DRINKS = DRINKS;
})();
