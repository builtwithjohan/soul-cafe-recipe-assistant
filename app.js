/*
  Soul Cafe Guided Cooking
  - Recipe search and selection
  - Ingredient overview
  - Step-by-step guided mode with per-step confirmation
  - Friendly JSON recipe import
*/
(function () {
  "use strict";

  const IMPORT_STORAGE_KEY = "soul-cafe-imported-recipes";

  const views = {
    home: document.getElementById("view-home"),
    overview: document.getElementById("view-overview"),
    cook: document.getElementById("view-cook"),
    done: document.getElementById("view-done"),
  };

  const ui = {
    homeBtn: document.getElementById("homeBtn"),
    searchInput: document.getElementById("searchInput"),
    recipeGrid: document.getElementById("recipeGrid"),
    noResults: document.getElementById("noResults"),
    openImportBtn: document.getElementById("openImportBtn"),
    downloadTemplateBtn: document.getElementById("downloadTemplateBtn"),

    ovEmoji: document.getElementById("ovEmoji"),
    ovName: document.getElementById("ovName"),
    ovDesc: document.getElementById("ovDesc"),
    ovMeta: document.getElementById("ovMeta"),
    ovIngredients: document.getElementById("ovIngredients"),
    startCookBtn: document.getElementById("startCookBtn"),

    stepCounter: document.getElementById("stepCounter"),
    progressBar: document.getElementById("progressBar"),
    stepCard: document.getElementById("stepCard"),
    stepBadge: document.getElementById("stepBadge"),
    stepIngredient: document.getElementById("stepIngredient"),
    stepQuantity: document.getElementById("stepQuantity"),
    stepPlacement: document.getElementById("stepPlacement"),
    stepAction: document.getElementById("stepAction"),
    stepDurationWrap: document.getElementById("stepDurationWrap"),
    stepDuration: document.getElementById("stepDuration"),
    prevBtn: document.getElementById("prevBtn"),
    confirmBtn: document.getElementById("confirmBtn"),

    doneEmoji: document.getElementById("doneEmoji"),
    doneTitle: document.getElementById("doneTitle"),
    doneText: document.getElementById("doneText"),
    cookAgainBtn: document.getElementById("cookAgainBtn"),

    importDialog: document.getElementById("importDialog"),
    closeImportBtn: document.getElementById("closeImportBtn"),
    importFileInput: document.getElementById("importFileInput"),
    importText: document.getElementById("importText"),
    importRecipesBtn: document.getElementById("importRecipesBtn"),
    pasteSampleBtn: document.getElementById("pasteSampleBtn"),
    clearImportedBtn: document.getElementById("clearImportedBtn"),
    importStatus: document.getElementById("importStatus"),
  };

  const baseRecipes = Array.isArray(window.RECIPES) ? window.RECIPES.slice() : [];

  const state = {
    recipes: [],
    importedRecipes: [],
    selectedRecipe: null,
    stepIndex: 0,
    search: "",
  };

  function slugify(value) {
    return String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  function toText(value, fallback) {
    const text = String(value || "").trim();
    return text || fallback;
  }

  function normalizeIngredient(entry) {
    if (!entry || typeof entry !== "object") return null;
    const name = toText(entry.name, "");
    const quantity = toText(entry.quantity, "");
    if (!name || !quantity) return null;
    return { name, quantity };
  }

  function normalizeStep(entry) {
    if (!entry || typeof entry !== "object") return null;

    const ingredient = toText(entry.ingredient, "");
    const quantity = toText(entry.quantity, "");
    const placement = toText(entry.placement, "");
    const action = toText(entry.action, "");
    const duration = toText(entry.duration, "");

    if (!ingredient || !quantity || !placement || !action) return null;

    return duration
      ? { ingredient, quantity, placement, action, duration }
      : { ingredient, quantity, placement, action };
  }

  function normalizeRecipe(recipe, index) {
    if (!recipe || typeof recipe !== "object") return null;

    const name = toText(recipe.name, "");
    if (!name) return null;

    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.map(normalizeIngredient).filter(Boolean)
      : [];

    const steps = Array.isArray(recipe.steps) ? recipe.steps.map(normalizeStep).filter(Boolean) : [];

    if (!ingredients.length || !steps.length) return null;

    const id = toText(recipe.id, "") || `imported-${slugify(name)}-${index + 1}`;

    return {
      id,
      name,
      emoji: toText(recipe.emoji, "🍽️"),
      description: toText(recipe.description, "Imported recipe"),
      servings: Number.isFinite(Number(recipe.servings)) ? Number(recipe.servings) : 2,
      time: toText(recipe.time, "20 min"),
      difficulty: ["Easy", "Medium", "Hard"].includes(recipe.difficulty)
        ? recipe.difficulty
        : "Easy",
      ingredients,
      steps,
      source: "imported",
    };
  }

  function setImportStatus(message, kind) {
    if (!ui.importStatus) return;
    ui.importStatus.textContent = message;
    ui.importStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.importStatus.classList.add("is-success");
    if (kind === "error") ui.importStatus.classList.add("is-error");
  }

  function saveImportedRecipes() {
    try {
      localStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(state.importedRecipes));
    } catch (_error) {
      // Ignore storage failures (private mode / strict settings).
    }
  }

  function loadImportedRecipes() {
    try {
      const raw = localStorage.getItem(IMPORT_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      const list = Array.isArray(parsed) ? parsed : [];
      return list.map((item, index) => normalizeRecipe(item, index)).filter(Boolean);
    } catch (_error) {
      return [];
    }
  }

  function mergeRecipes() {
    const map = new Map();
    [...baseRecipes, ...state.importedRecipes].forEach((recipe) => {
      map.set(recipe.id, recipe);
    });
    state.recipes = Array.from(map.values());
  }

  function parseImportText(rawText) {
    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch (_error) {
      return { ok: false, error: "Invalid JSON. Please fix formatting and try again." };
    }

    const rawList = Array.isArray(parsed) ? parsed : [parsed];
    const normalized = rawList.map((recipe, index) => normalizeRecipe(recipe, index)).filter(Boolean);

    if (!normalized.length) {
      return {
        ok: false,
        error:
          "No valid recipes found. Each recipe needs name, ingredients[{name, quantity}] and steps[{ingredient, quantity, placement, action}].",
      };
    }

    return { ok: true, recipes: normalized };
  }

  function openImportDialog() {
    setImportStatus("", null);
    if (ui.importDialog && typeof ui.importDialog.showModal === "function") {
      ui.importDialog.showModal();
      return;
    }

    // Fallback for environments without dialog support.
    ui.importDialog?.setAttribute("open", "open");
  }

  function closeImportDialog() {
    if (ui.importDialog && typeof ui.importDialog.close === "function") {
      ui.importDialog.close();
      return;
    }
    ui.importDialog?.removeAttribute("open");
  }

  function importFromText(rawText) {
    const result = parseImportText(rawText);
    if (!result.ok) {
      setImportStatus(result.error, "error");
      return;
    }

    const existingIds = new Set(state.importedRecipes.map((r) => r.id));
    const nextImported = state.importedRecipes.slice();
    let added = 0;

    result.recipes.forEach((recipe) => {
      if (existingIds.has(recipe.id)) {
        // Keep IDs unique by appending a timestamp for imported duplicates.
        recipe.id = `${recipe.id}-${Date.now()}`;
      }
      existingIds.add(recipe.id);
      nextImported.push(recipe);
      added += 1;
    });

    state.importedRecipes = nextImported;
    saveImportedRecipes();
    mergeRecipes();
    renderRecipeCards();

    setImportStatus(`Imported ${added} recipe${added > 1 ? "s" : ""} successfully.`, "success");
    ui.importText.value = "";
    ui.importFileInput.value = "";
  }

  async function importFromFile(file) {
    if (!file) {
      setImportStatus("Please choose a JSON file first.", "error");
      return;
    }

    try {
      const text = await file.text();
      importFromText(text);
    } catch (_error) {
      setImportStatus("Could not read the selected file.", "error");
    }
  }

  function downloadTemplate() {
    const template = [
      {
        id: "soul-cafe-tomato-omelette",
        name: "Tomato Omelette",
        emoji: "🍳",
        description: "Soft omelette with fresh tomato and herbs.",
        servings: 1,
        time: "10 min",
        difficulty: "Easy",
        ingredients: [
          { name: "Eggs", quantity: "2" },
          { name: "Tomato", quantity: "1 small, chopped" },
          { name: "Salt", quantity: "1/4 tsp" },
        ],
        steps: [
          {
            ingredient: "Eggs + salt",
            quantity: "2 + 1/4 tsp",
            placement: "In a bowl",
            action: "Whisk until smooth.",
            duration: "1 min",
          },
          {
            ingredient: "Tomato",
            quantity: "1 small",
            placement: "Into the egg mix",
            action: "Stir to combine.",
            duration: "30 sec",
          },
          {
            ingredient: "Egg mixture",
            quantity: "All of it",
            placement: "Into a greased hot pan",
            action: "Cook until set, fold and serve.",
            duration: "3 min",
          },
        ],
      },
    ];

    const blob = new Blob([JSON.stringify(template, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "soul-cafe-recipe-template.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function createMetaChip(label, className) {
    const chip = document.createElement("span");
    chip.className = `chip ${className || ""}`.trim();
    chip.textContent = label;
    return chip;
  }

  function setActiveView(viewName) {
    Object.entries(views).forEach(([key, element]) => {
      if (!element) return;
      element.classList.toggle("is-active", key === viewName);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function filteredRecipes() {
    const q = state.search.trim().toLowerCase();
    if (!q) return state.recipes;

    return state.recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.ingredients.some((ing) => ing.name.toLowerCase().includes(q))
      );
    });
  }

  function renderRecipeCards() {
    const list = filteredRecipes();
    ui.recipeGrid.innerHTML = "";

    if (!list.length) {
      ui.noResults.hidden = false;
      return;
    }

    ui.noResults.hidden = true;

    list.forEach((recipe) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "recipe-card";
      card.setAttribute("role", "listitem");

      const emoji = document.createElement("span");
      emoji.className = "card-emoji";
      emoji.textContent = recipe.emoji;

      const name = document.createElement("h2");
      name.className = "card-name";
      name.textContent = recipe.name;

      const desc = document.createElement("p");
      desc.className = "card-desc";
      desc.textContent = recipe.description;

      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.appendChild(createMetaChip(`${recipe.time}`));
      meta.appendChild(createMetaChip(`${recipe.servings} servings`));
      meta.appendChild(createMetaChip(recipe.difficulty, `diff-${recipe.difficulty}`));

      card.appendChild(emoji);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(meta);

      card.addEventListener("click", () => {
        openRecipeOverview(recipe.id);
      });

      ui.recipeGrid.appendChild(card);
    });
  }

  function openRecipeOverview(recipeId) {
    const recipe = state.recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    state.selectedRecipe = recipe;
    state.stepIndex = 0;

    ui.ovEmoji.textContent = recipe.emoji;
    ui.ovName.textContent = recipe.name;
    ui.ovDesc.textContent = recipe.description;

    ui.ovMeta.innerHTML = "";
    ui.ovMeta.appendChild(createMetaChip(recipe.time));
    ui.ovMeta.appendChild(createMetaChip(`${recipe.servings} servings`));
    ui.ovMeta.appendChild(createMetaChip(recipe.difficulty, `diff-${recipe.difficulty}`));

    ui.ovIngredients.innerHTML = "";
    recipe.ingredients.forEach((ing) => {
      const li = document.createElement("li");

      const name = document.createElement("span");
      name.className = "ing-name";
      name.textContent = ing.name;

      const qty = document.createElement("span");
      qty.className = "ing-qty";
      qty.textContent = ing.quantity;

      li.appendChild(name);
      li.appendChild(qty);
      ui.ovIngredients.appendChild(li);
    });

    setActiveView("overview");
  }

  function updateStepView() {
    const recipe = state.selectedRecipe;
    if (!recipe) return;

    const steps = recipe.steps || [];
    const max = steps.length;

    if (!max) return;

    const step = steps[state.stepIndex];
    const displayIndex = state.stepIndex + 1;

    ui.stepCounter.textContent = `Step ${displayIndex} of ${max}`;
    ui.stepBadge.textContent = String(displayIndex);
    ui.stepIngredient.textContent = step.ingredient;
    ui.stepQuantity.textContent = step.quantity;
    ui.stepPlacement.textContent = step.placement;
    ui.stepAction.textContent = step.action;

    if (step.duration) {
      ui.stepDurationWrap.hidden = false;
      ui.stepDuration.textContent = `Estimated time: ${step.duration}`;
    } else {
      ui.stepDurationWrap.hidden = true;
    }

    const pct = (displayIndex / max) * 100;
    ui.progressBar.style.width = `${pct}%`;

    ui.prevBtn.disabled = state.stepIndex === 0;
    ui.confirmBtn.textContent =
      state.stepIndex === max - 1 ? "Confirm & Finish ✓" : "Confirm & Next →";

    // Re-trigger a subtle entry animation for each new step card.
    ui.stepCard.classList.remove("confirm-flash");
    ui.stepCard.style.animation = "none";
    void ui.stepCard.offsetWidth;
    ui.stepCard.style.animation = "pop-in 0.3s ease both";
  }

  function openCookView() {
    if (!state.selectedRecipe) return;
    state.stepIndex = 0;
    updateStepView();
    setActiveView("cook");
  }

  function confirmCurrentStep() {
    const recipe = state.selectedRecipe;
    if (!recipe) return;

    ui.confirmBtn.classList.remove("confirm-flash");
    void ui.confirmBtn.offsetWidth;
    ui.confirmBtn.classList.add("confirm-flash");

    const isLast = state.stepIndex >= recipe.steps.length - 1;
    if (isLast) {
      openDoneView();
      return;
    }

    state.stepIndex += 1;
    updateStepView();
  }

  function goToPreviousStep() {
    if (state.stepIndex <= 0) return;
    state.stepIndex -= 1;
    updateStepView();
  }

  function openDoneView() {
    const recipe = state.selectedRecipe;
    if (!recipe) return;

    ui.doneEmoji.textContent = recipe.emoji;
    ui.doneTitle.textContent = `${recipe.name} is ready!`;
    ui.doneText.textContent = "Great work. Every step is complete and your dish is ready to serve.";
    setActiveView("done");
  }

  function attachEvents() {
    ui.searchInput.addEventListener("input", (event) => {
      state.search = event.target.value || "";
      renderRecipeCards();
    });

    ui.homeBtn.addEventListener("click", () => {
      setActiveView("home");
    });

    ui.openImportBtn?.addEventListener("click", openImportDialog);
    ui.closeImportBtn?.addEventListener("click", closeImportDialog);
    ui.downloadTemplateBtn?.addEventListener("click", downloadTemplate);

    ui.importRecipesBtn?.addEventListener("click", () => {
      const pastedText = ui.importText.value.trim();
      const selectedFile = ui.importFileInput.files && ui.importFileInput.files[0];

      if (pastedText) {
        importFromText(pastedText);
        return;
      }

      if (selectedFile) {
        importFromFile(selectedFile);
        return;
      }

      setImportStatus("Paste JSON or upload a file before importing.", "error");
    });

    ui.importFileInput?.addEventListener("change", async () => {
      const selectedFile = ui.importFileInput.files && ui.importFileInput.files[0];
      if (selectedFile) {
        await importFromFile(selectedFile);
      }
    });

    ui.pasteSampleBtn?.addEventListener("click", () => {
      ui.importText.value = JSON.stringify(
        {
          name: "Cafe Masala Toast",
          emoji: "🥪",
          description: "Quick toasted bread with masala topping.",
          servings: 1,
          time: "8 min",
          difficulty: "Easy",
          ingredients: [
            { name: "Bread slices", quantity: "2" },
            { name: "Butter", quantity: "1 tbsp" },
            { name: "Chaat masala", quantity: "1/2 tsp" },
          ],
          steps: [
            {
              ingredient: "Butter",
              quantity: "1 tbsp",
              placement: "On both bread slices",
              action: "Spread evenly.",
              duration: "30 sec",
            },
            {
              ingredient: "Bread slices",
              quantity: "2",
              placement: "On hot griddle",
              action: "Toast both sides until golden.",
              duration: "3 min",
            },
            {
              ingredient: "Chaat masala",
              quantity: "1/2 tsp",
              placement: "Over toasted bread",
              action: "Sprinkle and serve hot.",
              duration: "20 sec",
            },
          ],
        },
        null,
        2
      );
      setImportStatus("Sample JSON inserted. Click Import Now.", "success");
    });

    ui.clearImportedBtn?.addEventListener("click", () => {
      state.importedRecipes = [];
      saveImportedRecipes();
      mergeRecipes();
      renderRecipeCards();
      setImportStatus("Imported recipes cleared.", "success");
    });

    ui.startCookBtn.addEventListener("click", openCookView);
    ui.confirmBtn.addEventListener("click", confirmCurrentStep);
    ui.prevBtn.addEventListener("click", goToPreviousStep);

    ui.cookAgainBtn.addEventListener("click", () => {
      if (!state.selectedRecipe) {
        setActiveView("home");
        return;
      }
      openRecipeOverview(state.selectedRecipe.id);
    });

    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-nav");
        if (!target) return;

        if (target === "home") {
          setActiveView("home");
          return;
        }

        if (target === "overview" && state.selectedRecipe) {
          setActiveView("overview");
        }
      });
    });
  }

  function init() {
    state.importedRecipes = loadImportedRecipes();
    mergeRecipes();

    if (!state.recipes.length) {
      ui.recipeGrid.innerHTML = "";
      ui.noResults.hidden = false;
      ui.noResults.textContent = "No recipes are available yet. Import recipes to begin.";
      return;
    }

    attachEvents();
    renderRecipeCards();
    setActiveView("home");
  }

  init();
})();
