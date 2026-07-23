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

  const SEASONAL_SPECIALS = [
    {
      id: "soul-signature-cold-brew",
      name: "Soul Signature Cold Brew",
      emoji: "✨",
      description: "Soul Special",
      category: "drinks",
      drinkType: "soul-special",
      servings: 1,
      time: "5 min",
      difficulty: "Easy",
      ingredients: [
        { name: "Cold brew concentrate", quantity: "120 ml" },
        { name: "Water", quantity: "80 ml" },
        { name: "Vanilla syrup", quantity: "15 ml" },
        { name: "Ice cubes", quantity: "5" },
        { name: "Orange peel", quantity: "1" },
      ],
      steps: toSteps([
        "Fill a glass with ice cubes.",
        "Pour in the cold brew concentrate and water.",
        "Add the vanilla syrup and stir.",
        "Twist an orange peel over the top and drop it in.",
        "Serve chilled.",
      ]),
    },
    {
      id: "winter-spiced-mocha",
      name: "Winter Spiced Mocha",
      emoji: "✨",
      description: "Soul Special",
      category: "drinks",
      drinkType: "soul-special",
      servings: 1,
      time: "8 min",
      difficulty: "Easy",
      ingredients: [
        { name: "Espresso", quantity: "1 shot" },
        { name: "Steamed milk", quantity: "160 ml" },
        { name: "Dark chocolate", quantity: "20 gm" },
        { name: "Cinnamon", quantity: "1 pinch" },
        { name: "Nutmeg", quantity: "1 pinch" },
      ],
      steps: toSteps([
        "Melt the dark chocolate into the hot espresso.",
        "Steam the milk with a pinch of cinnamon.",
        "Combine the milk with the chocolate espresso.",
        "Dust with nutmeg and serve warm.",
      ]),
    },
  ];

  window.SEASONAL_SPECIALS = SEASONAL_SPECIALS;
})();
