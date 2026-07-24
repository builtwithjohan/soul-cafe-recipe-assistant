(function () {
  "use strict";

  const MASTER = {
    recipes: [
      {
        name: "Confit Garlic",
        ingredients: [
          { item: "Peeled Garlic", amount: "50 gm" },
          { item: "Olive Oil", amount: "100 gm" },
          { item: "Rosemary", amount: "5 gm" },
          { item: "Black Pepper", amount: "2 gm" },
        ],
        instructions: [
          "Add the peeled garlic cloves to a small saucepan.",
          "Pour in olive oil until the garlic is fully submerged (approx. 100g).",
          "Cook on lowest heat (do not boil) for 15 minutes until garlic is soft and lightly golden.",
          "Add rosemary.",
          "Let cool then grind garlic and oil together and store it in an airtight jar in the refrigerator.",
        ],
      },
      {
        name: "Hot Honey",
        ingredients: [
          { item: "Honey", amount: "50 gm" },
          { item: "Chilli Flakes", amount: "3 gm" },
          { item: "Apple Cider Vinegar", amount: "5 gm" },
          { item: "Water", amount: "10 gm" },
        ],
        instructions: [
          "In a small pan, add honey and chili flakes.",
          "Gently heat on low for 2-3 minutes. Do not boil.",
          "Turn off the heat and stir in apple cider vinegar.",
          "Let it steep for 5-10 minutes.",
          "Strain (optional) for a smooth texture or keep the flakes in.",
          "Store it in a clean container in the refrigerator.",
        ],
      },
      {
        name: "Thecha Sauce",
        ingredients: [
          { item: "Roasted Green Chilli", amount: "100 gm" },
          { item: "Garlic", amount: "30 gm" },
          { item: "Peanut", amount: "50 gm" },
          { item: "Coriander", amount: "100 gm" },
          { item: "Jeera", amount: "20 gm" },
          { item: "Sunflower Oil", amount: "50 gm" },
          { item: "Salt", amount: "5 gm" },
        ],
        instructions: [
          "Wash and remove tops of green chillies.",
          "Light roast peanuts and chillies separately; let cool.",
          "Grind peanuts, then jeera, garlic, salt, and chillies.",
          "Add ground peanuts back, grind everything together.",
          "Mix in oil and store in a clean container in the fridge.",
        ],
      },
      {
        name: "Garlic Butter",
        ingredients: [
          { item: "Butter", amount: "85 gm" },
          { item: "Garlic", amount: "10 gm" },
          { item: "Parsley", amount: "5 gm" },
          { item: "Salt", amount: "2 gm" },
          { item: "Pepper", amount: "3 gm" },
        ],
        instructions: [
          "Soften butter at room temperature.",
          "Grind garlic and combine with butter.",
          "Mix in parsley, salt, and pepper.",
          "Store in an airtight container in the refrigerator.",
        ],
      },
      {
        name: "Tandoori Paneer",
        ingredients: [
          { item: "Malia Paneer", amount: "500 gm" },
          { item: "Sunflower Oil", amount: "30 gm" },
          { item: "Mirchi Powder", amount: "7 gm" },
          { item: "Ginger Garlic Paste", amount: "20 gm" },
          { item: "Garam Masala", amount: "3 gm" },
          { item: "Salt", amount: "5 gm" },
          { item: "Kasuri Methi", amount: "2 gm" },
          { item: "Lemon Juice", amount: "15 gm" },
          { item: "Curd", amount: "100 gm" },
        ],
        instructions: [
          "Cut paneer into small cubes.",
          "Heat oil and add spices, ginger garlic paste, and salt.",
          "Add crushed kasuri methi to paneer and mix.",
          "Turn off heat, wait 5 minutes, then mix in curd.",
        ],
      },
      {
        name: "Mushroom Patty",
        ingredients: [
          { item: "Roasted Mushroom", amount: "220 gm" },
          { item: "White Onion", amount: "50 gm" },
          { item: "Garlic", amount: "10 gm" },
          { item: "Oregano", amount: "1 gm" },
          { item: "Breadcrumbs", amount: "25 gm" },
          { item: "Processed Cheese", amount: "20 gm" },
          { item: "Salt", amount: "15 gm" },
          { item: "Peri-Peri", amount: "15 gm" },
          { item: "Pealed Potato", amount: "Not specified" },
        ],
        instructions: [
          "Saute garlic and onions in oil; add mushrooms and cook until dry.",
          "Cool slightly and mix with breadcrumbs, cheese, potato, salt, pepper, and herbs.",
          "Form into 70 gm patties; add more crumbs if needed to hold shape.",
        ],
      },
      {
        name: "Coleslaw",
        ingredients: [
          { item: "Cabbage", amount: "50 gm" },
          { item: "Carrot", amount: "20 gm" },
          { item: "Apple", amount: "15 gm" },
          { item: "Mayonnaise", amount: "25 gm" },
          { item: "Salt", amount: "1 gm" },
          { item: "Black Pepper", amount: "1 gm" },
          { item: "Lemon Juice", amount: "1 gm" },
        ],
        instructions: [
          "Finely slice vegetables and apple.",
          "Whisk mayo with salt and lemon juice.",
          "Combine veggies with dressing and refrigerate.",
        ],
      },
      {
        name: "Pickled Red Cabbage",
        ingredients: [
          { item: "Red cabbage", amount: "50 gm" },
          { item: "White Vinegar", amount: "25 gm" },
          { item: "Water", amount: "25 gm" },
          { item: "Salt", amount: "2 gm" },
          { item: "Sugar", amount: "20 gm" },
          { item: "Black Peppercorn", amount: "1 gm" },
        ],
        instructions: [
          "Place sliced cabbage in a jar.",
          "Heat vinegar, water, sugar, and salt until dissolved.",
          "Pour hot mixture over cabbage and refrigerate after cooling.",
        ],
      },
      {
        name: "Pickled Onion",
        ingredients: [
          { item: "Red Onion", amount: "50 gm" },
          { item: "White Vinegar", amount: "25 gm" },
          { item: "Water", amount: "25 gm" },
          { item: "Salt", amount: "2 gm" },
          { item: "Sugar", amount: "20 gm" },
          { item: "Black Pepper", amount: "1 gm" },
        ],
        instructions: [
          "Place sliced onions in a jar.",
          "Heat pickling liquid until sugar/salt dissolve.",
          "Pour over onions and refrigerate.",
        ],
      },
      {
        name: "Spicy Hummus",
        ingredients: [
          { item: "Chickpeas", amount: "150 gm" },
          { item: "Tahini", amount: "20 gm" },
          { item: "Garlic Chilli Sauce", amount: "30 gm" },
          { item: "Olive Oil", amount: "25 gm" },
          { item: "Ice Cubes", amount: "8 gm" },
          { item: "Salt", amount: "3 gm" },
        ],
        instructions: [
          "Soak and boil chickpeas until soft.",
          "Grind chickpeas with ice.",
          "Combine with homemade tahini, chilli garlic sauce, olive oil, and salt.",
          "Blend until smooth.",
        ],
      },
      {
        name: "Falafel",
        ingredients: [
          { item: "Soaked Chickpea", amount: "250 gm" },
          { item: "Onion Rough Cut", amount: "75 gm" },
          { item: "Garlic", amount: "12 gm" },
          { item: "Coriander", amount: "20 gm" },
          { item: "Parsley", amount: "30 gm" },
          { item: "Cumin", amount: "4 gm" },
          { item: "Salt", amount: "6 gm" },
          { item: "Pepper", amount: "2 gm" },
          { item: "Baking Soda", amount: "1 gm" },
          { item: "Sesame Seed", amount: "5 gm" },
        ],
        instructions: [
          "Grind soaked chickpeas with ice until fine.",
          "Grind onions, garlic, and parsley until coarse/sticky.",
          "Mix both parts with baking soda and refrigerate.",
        ],
      },
      {
        name: "Potato Masala Filling",
        ingredients: [
          { item: "Sunflower oil", amount: "8 gm" },
          { item: "Mustard Seed", amount: "3 gm" },
          { item: "Curry Leaf", amount: "2 gm" },
          { item: "Ginger", amount: "20 gm" },
          { item: "Green Chilli", amount: "15 gm" },
          { item: "Turmeric", amount: "3 gm" },
          { item: "Boiled Mash Potato", amount: "350 gm" },
          { item: "Salt", amount: "7 gm" },
          { item: "Coriander", amount: "7 gm" },
        ],
        instructions: [
          "Crackle mustard seeds in oil; saute aromatics and onions.",
          "Add turmeric, potatoes, salt, and water.",
          "Cook 3-4 minutes, then finish with lemon and coriander.",
        ],
      },
      {
        name: "Mint Cilantro Sauce",
        ingredients: [
          { item: "Blanched Coriander", amount: "100 gm" },
          { item: "Green Chilli", amount: "1-3 gm" },
          { item: "Mint Leaf Paste", amount: "25 gm" },
          { item: "Eggless Mayo", amount: "250 gm" },
          { item: "Lemon Juice", amount: "5 gm" },
          { item: "Salt", amount: "2 gm" },
        ],
        instructions: [
          "Grind mint into paste; finely chop coriander.",
          "Grind all greens together.",
          "Mix with mayo, lemon juice, and salt; store in squeeze bottle.",
        ],
      },
      {
        name: "Sriracha Schezwan Sauce",
        ingredients: [
          { item: "Eggless Mayo", amount: "50 gm" },
          { item: "Chilli Garlic Sauce", amount: "50 gm" },
          { item: "Schezwan Sauce", amount: "50 gm" },
        ],
        instructions: [
          "Combine all ingredients by weight.",
          "Mix well and store in squeeze bottle in the fridge.",
        ],
      },
      {
        name: "Pesto",
        ingredients: [
          { item: "Cleaned Basil Leaves", amount: "500 gm" },
          { item: "Garlic Peeled", amount: "50 gm" },
          { item: "Amul Cheese Cube", amount: "3 cubes" },
          { item: "Olive Oil", amount: "100 ml" },
          { item: "Walnuts", amount: "30 gm" },
          { item: "Salt", amount: "4 gm" },
          { item: "Black Pepper", amount: "2 gm" },
        ],
        instructions: [
          "Grind basil leaves into a thick paste.",
          "Grind walnuts into paste and combine with basil.",
          "Grind garlic with some basil paste, spices, and oil.",
          "Combine all and hand-mix remaining oil.",
        ],
      },
      {
        name: "Crumbles for Muffins",
        ingredients: [
          { item: "Maida", amount: "60 gm" },
          { item: "Sugar", amount: "100 gm" },
          { item: "Salt", amount: "2 gm" },
          { item: "Butter", amount: "56 gm" },
        ],
        instructions: [
          "Whisk dry ingredients.",
          "Hand-mix butter until it forms crumbles.",
        ],
      },
      {
        name: "Samosa",
        ingredients: [
          { item: "Potato", amount: "500 gm" },
          { item: "Maida", amount: "500 gm" },
          { item: "Ajwain", amount: "5 gm" },
          { item: "Salt", amount: "7.5 gm" },
          { item: "Oil/Ghee", amount: "60 ml" },
          { item: "Cumin Seeds", amount: "5 gm" },
          { item: "Hing", amount: "0.5 gm" },
          { item: "Green Chilli", amount: "5 gm" },
          { item: "Spices (Haldi, Coriander, Amchur, Fennel)", amount: "Varies" },
          { item: "Coriander/Curry Leaves", amount: "5 gm each" },
        ],
        instructions: [
          "Crumble pressure-cooked potatoes.",
          "Saute spices and aromatics in oil; combine with potatoes.",
          "Mix maida, ajwain, salt, and ghee for dough.",
        ],
      },
      {
        name: "Chocolate Ganache",
        ingredients: [
          { item: "Dark chocolate compound", amount: "150 gm" },
          { item: "Fresh Cream", amount: "200 gm" },
        ],
        instructions: [
          "Melt chocolate pieces in microwave.",
          "Heat cream and mix with melted chocolate.",
        ],
      },
      {
        name: "Brioche Bread",
        ingredients: [
          { item: "Maida", amount: "440 gm" },
          { item: "Yeast", amount: "12 gm" },
          { item: "Salt", amount: "7 gm" },
          { item: "Sugar", amount: "30 gm" },
          { item: "Warm milk", amount: "250 ml" },
          { item: "Yogurt / Milk Powder", amount: "30 ml" },
        ],
        instructions: [
          "Mix dry ingredients; add milk/yogurt to form dough.",
          "Knead 3-4 mins, gradually add butter, knead 8-10 mins more.",
          "Rise 1.5-2 hours, shape, rise again 45-60 mins.",
          "Bake at 180C for 18-30 mins.",
        ],
      },
      {
        name: "Vada Pav Dry Chutney",
        ingredients: [
          { item: "Roasted Peanuts", amount: "50 gm" },
          { item: "Roasted Red Chilli", amount: "3 pieces" },
          { item: "Chilli powder", amount: "2 gm" },
          { item: "Jeera", amount: "15 gm" },
          { item: "Salt", amount: "3 gm" },
          { item: "Garlic", amount: "10 gm" },
        ],
        instructions: [
          "Roast peanuts and chillies.",
          "Grind peanuts, then jeera, garlic, salt, and chilli powder.",
          "Mix grounded peanuts back in with oil and store.",
        ],
      },
      {
        name: "Guacamole",
        ingredients: [
          { item: "Avocado", amount: "1/2 piece" },
          { item: "Onion", amount: "3 gm" },
          { item: "Tomato", amount: "3 gm" },
          { item: "Garlic clove", amount: "1 piece" },
          { item: "Salt", amount: "2 gm" },
          { item: "Pepper", amount: "2 gm" },
        ],
        instructions: [
          "Warm and smash avocado.",
          "Mix with finely chopped tomato, onion, salt, and pepper.",
        ],
      },
      {
        name: "Almond Butter",
        ingredients: [
          { item: "Butter", amount: "100 gm" },
          { item: "Maida", amount: "100 gm" },
          { item: "Powdered sugar", amount: "100 gm" },
          { item: "Almond flour", amount: "100 gm" },
        ],
        instructions: ["Mix all ingredients well at room temperature."],
      },
      {
        name: "Lotus Biscoff Soul Cake Spread",
        ingredients: [
          { item: "Hot Water", amount: "75 ml" },
          { item: "Normal Water", amount: "75 ml" },
          { item: "Lotus Biscoff Biscuit", amount: "1 packet" },
          { item: "Condensed Milk", amount: "45 ml" },
        ],
        instructions: [
          "Take hot water and normal water in the grinding pot.",
          "Add lotus biscoff biscuits to the water.",
          "Add condensed milk.",
          "Blend until smooth.",
        ],
      },
      {
        name: "Thecha Korean Bun",
        ingredients: [
          { item: "Korean Bun", amount: "1" },
          { item: "Thecha", amount: "1 gm" },
          { item: "Cream Cheese", amount: "35 gm" },
          { item: "Mozzarella", amount: "5 gm" },
          { item: "Parsley", amount: "2 gm" },
          { item: "Salt", amount: "2 gm" },
          { item: "Pepper", amount: "2 gm" },
          { item: "Oregano", amount: "0.5 gm" },
          { item: "Chilli Flakes", amount: "0.25 gm" },
        ],
        instructions: [
          "Warm the cream cheese for 15 seconds in the microwave to soften it.",
          "Warm the mozzarella with the cream cheese for 10 seconds.",
          "Transfer the mixture to a mixing bowl.",
          "Add thecha, oregano, chilli flakes, salt, and pepper.",
          "Mix everything together.",
          "Transfer the mixture into a piping bag.",
          "Cut the piping bag tip slightly before filling it.",
          "Cut an X-shape into the bun without slicing through completely.",
          "Fill the bun with the mixture.",
          "Add chilli flakes and oregano on top.",
          "Place parsley leaf in the center.",
          "Cover the bun with cling wrap and store it in the freezer.",
        ],
      },
      {
        name: "Banana Walnut Bread",
        ingredients: [
          { item: "Banana", amount: "4 pieces" },
          { item: "Olive Oil", amount: "60 ml" },
          { item: "Lactose Free Milk or Almond Milk", amount: "180 ml" },
          { item: "Honey", amount: "120 gm" },
          { item: "Walnuts", amount: "25 gm" },
          { item: "Cinnamon Powder", amount: "5 gm" },
          { item: "Baking Powder", amount: "5 gm" },
          { item: "Baking Soda", amount: "2.5 gm" },
          { item: "Salt", amount: "2 pinch" },
          { item: "Ragi Atta", amount: "120 gm" },
          { item: "Jowar Atta", amount: "120 gm" },
        ],
        instructions: [
          "Smash the bananas using a fork in a plate.",
          "Transfer the smashed bananas into a bowl.",
          "Add olive oil and lactose-free milk or almond milk.",
          "Add honey.",
          "Roughly chop the walnuts and reserve half for topping.",
          "Add cinnamon powder, baking powder, baking soda, salt, ragi atta, and jowar atta.",
          "Whisk the whole mixture using a hand whisk.",
          "Grease a rectangular bread tray and line it with butter paper.",
          "Transfer the mixture into the tray.",
          "Top with the remaining walnuts.",
          "Bake at 180°C for 40 minutes.",
          "Check doneness with a wooden skewer and bake an additional 10 minutes if needed.",
          "Cool at room temperature for 1 hour.",
          "Remove the loaf from the tray and cut into 1-inch slices.",
          "Store in a bread box or wrap tightly and freeze.",
        ],
      },
      {
        name: "New York Cheesecake",
        ingredients: [
          { item: "Cream Cheese", amount: "500 gm" },
          { item: "Milkmaid", amount: "220 gm" },
          { item: "Fresh Cream", amount: "200 gm" },
          { item: "Maida", amount: "20 gm" },
          { item: "Corn Flour", amount: "20 gm" },
          { item: "Vanilla Essence", amount: "5 gm" },
          { item: "Biscuits", amount: "8 pieces" },
        ],
        instructions: [
          "Break the biscuits, add butter, and set the base in a pan.",
          "Bake for 2 minutes in the microwave, then chill the pan in the fridge.",
          "Warm the cream cheese in the oven for 30 seconds at a time until soft like butter.",
          "Add milkmaid, fresh cream, maida, corn flour, and vanilla essence.",
          "Whisk thoroughly until the desired consistency is reached.",
          "Bake in a water bath for 35 minutes at 230°C in an OTG.",
          "Serve warm or cold based on guest preference.",
        ],
      },
      {
        name: "Burnt Basque Cheesecake",
        ingredients: [
          { item: "Cream Cheese", amount: "500 gm" },
          { item: "Milkmaid", amount: "150 gm" },
          { item: "Curd / Yogurt", amount: "60 gm" },
          { item: "Fresh Cream", amount: "200 gm" },
          { item: "Maida", amount: "20 gm" },
          { item: "Corn Flour", amount: "20 gm" },
          { item: "Vanilla Essence", amount: "5 gm" },
        ],
        instructions: [
          "Warm the cream cheese in the microwave for 30 seconds at a time until soft like butter.",
          "Put the cream cheese in a mixing bowl.",
          "Add milkmaid, fresh cream, maida, corn flour, and vanilla essence.",
          "Whisk thoroughly until the desired consistency is reached.",
          "Grease the tin with butter and line it with butter paper.",
          "Pour the batter into the tin and place it in the OTG.",
          "Bake for 35 minutes at 230°C in the OTG.",
        ],
      },
    ],
  };

  const SKIP = new Set([]);

  const EMOJI_RULES = [
    [/cheesecake|muffin|crumble/, "🍰"],
    [/ganache|chocolate/, "🍫"],
    [/honey/, "🍯"],
    [/butter/, "🧈"],
    [/paneer|cheese/, "🧀"],
    [/brioche|bread|bun/, "🍞"],
    [/pickled|cabbage|coleslaw|onion/, "🥬"],
    [/falafel|patty|samosa|potato|masala/, "🧆"],
    [/guacamole|avocado/, "🥑"],
    [/pesto|thecha|chutney|sauce|schezwan|hummus|cilantro/, "🥫"],
    [/garlic/, "🧄"],
  ];

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function emojiFor(name) {
    const key = String(name || "").toLowerCase();
    for (const [pattern, emoji] of EMOJI_RULES) {
      if (pattern.test(key)) return emoji;
    }
    return "🫙";
  }

  function toRecipe(master) {
    return {
      id: "comp-" + slugify(master.name),
      name: master.name,
      emoji: emojiFor(master.name),
      description: "Base Recipe",
      category: "component",
      servings: 1,
      time: "",
      difficulty: "Easy",
      ingredients: (master.ingredients || []).map((ing) => ({
        name: ing.item,
        quantity: ing.amount,
      })),
      steps: (master.instructions || []).map((action) => ({
        ingredient: "",
        quantity: "",
        placement: "",
        action: action,
        duration: "",
      })),
    };
  }

  const COMPONENTS = MASTER.recipes
    .filter((master) => !SKIP.has(String(master.name).toLowerCase()))
    .map(toRecipe);

  const RECIPE_LINKS = {
    "confit garlic": "comp-confit-garlic",
    "hot honey": "comp-hot-honey",
    thecha: "comp-thecha-sauce",
    "garlic butter": "comp-garlic-butter",
    "tandoori paneer": "comp-tandoori-paneer",
    "tandoori paneer filling": "comp-tandoori-paneer",
    "mushroom patty": "comp-mushroom-patty",
    coleslaw: "comp-coleslaw",
    "pickled red cabbage": "comp-pickled-red-cabbage",
    "pickled cabbage": "comp-pickled-red-cabbage",
    "pickled onion": "comp-pickled-onion",
    "pickled red onion": "comp-pickled-onion",
    "spicy hummus": "comp-spicy-hummus",
    "spicy hummus dip": "comp-spicy-hummus",
    falafel: "comp-falafel",
    "potato masala filling": "comp-potato-masala-filling",
    "mint cilantro sauce": "comp-mint-cilantro-sauce",
    "cilantro mayo": "comp-mint-cilantro-sauce",
    "cilantro mayo dip": "comp-mint-cilantro-sauce",
    "mint mayo": "comp-mint-cilantro-sauce",
    "mint mayo sauce": "comp-mint-cilantro-sauce",
    "sriracha schezwan sauce": "comp-sriracha-schezwan-sauce",
    "sriracha schezwan dip": "comp-sriracha-schezwan-sauce",
    "schezwan sriracha dip": "comp-sriracha-schezwan-sauce",
    pesto: "comp-pesto",
    "pesto sauce": "comp-pesto",
    samosa: "comp-samosa",
    "chocolate ganache": "comp-chocolate-ganache",
    brioche: "comp-brioche-bread",
    "brioche bread": "comp-brioche-bread",
    "vada pav dry chutney": "comp-vada-pav-dry-chutney",
    "vada paav dry chutney": "comp-vada-pav-dry-chutney",
    "vara pav dry chutney": "comp-vada-pav-dry-chutney",
    guacamole: "comp-guacamole",
    "almond butter": "comp-almond-butter",
    "lotus biscoff sauce": "comp-lotus-biscoff-soul-cake-spread",
    "lotus biscoff spread": "comp-lotus-biscoff-soul-cake-spread",
    "thecha korean bun": "comp-thecha-korean-bun",
    "banana walnut bread": "comp-banana-walnut-bread",
    "new york cheesecake": "comp-new-york-cheesecake",
    "burnt basque cheesecake": "comp-burnt-basque-cheesecake",
  };

  window.COMPONENTS = COMPONENTS;
  window.RECIPE_LINKS = RECIPE_LINKS;
})();
