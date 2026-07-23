(function () {
  "use strict";

  function initializeSoulCafeApp() {

  const IMPORT_STORAGE_KEY = "soul-cafe-imported-recipes";
  const GATE_CONFIG_STORAGE_KEY = "soul-cafe-local-gate-config";
  const GATE_SESSION_STORAGE_KEY = "soul-cafe-local-gate-session";
  const GATE_DISABLED_STORAGE_KEY = "soul-cafe-local-gate-disabled";
  const INGREDIENT_TRACKER_STORAGE_KEY = "soul-cafe-ingredient-tracker";
  const RECIPE_VIEWS_STORAGE_KEY = "soul-cafe-recipe-views";
  const RECIPE_RUNS_STORAGE_KEY = "soul-cafe-recipe-runs";
  const METRICS_LEDGER_STORAGE_KEY = "soul-cafe-metrics-ledger";
  const ORDER_QUEUE_STORAGE_KEY = "soul-cafe-order-queue";
  const PREPARED_ORDERS_STORAGE_KEY = "soul-cafe-prepared-orders";
  const MANAGER_GATE_CONFIG_STORAGE_KEY = "soul-cafe-manager-gate-config";
  const MANAGER_GATE_SESSION_STORAGE_KEY = "soul-cafe-manager-gate-session";
  const GATE_ATTEMPTS_STORAGE_KEY = "soul-cafe-local-gate-attempts";
  const MANAGER_ATTEMPTS_STORAGE_KEY = "soul-cafe-manager-gate-attempts";
  const DRINK_TEMPERATURE_KEYS = ["hot", "cold"];
  const DRINK_SIZE_KEYS = ["175ml", "250ml", "325ml", "350ml"];
  
  
  const LEGACY_LOCAL_SEED_HASH =
    "b5fe581ca491a4f00138b5f2a6bc7e23653718b552fd06d909f277c0ed92e435";
  const LEGACY_MANAGER_SEED_HASH =
    "5a834494bd52bc46bf74ef8cd4265c661aab6d9cada8537a8605ab3cfb4c9434";
  
  
  const DEFAULT_LOCAL_ADMIN = {
    username: "admin",
    passwordHash: "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9", 
    localOnly: true,
  };
  const DEFAULT_MANAGER_ADMIN = {
    username: "manager",
    passwordHash: "866485796cfa8d7c0cf7111640205b83076433547577511d81f8030ae99ecea5", 
  };

  const views = {
    landing: document.getElementById("view-landing"),
    home: document.getElementById("view-home"),
    overview: document.getElementById("view-overview"),
    cook: document.getElementById("view-cook"),
    done: document.getElementById("view-done"),
    menus: document.getElementById("view-menus"),
    ordering: document.getElementById("view-ordering"),
    dashboard: document.getElementById("view-dashboard"),
  };

  const ui = {
    homeBtn: document.getElementById("homeBtn"),
    searchInput: document.getElementById("searchInput"),
    recipeGrid: document.getElementById("recipeGrid"),
    noResults: document.getElementById("noResults"),
    catFoodTab: document.getElementById("catFoodTab"),
    catDrinksTab: document.getElementById("catDrinksTab"),
    catMasterTab: document.getElementById("catMasterTab"),
    drinkSubtabs: document.getElementById("drinkSubtabs"),
    chefQueueList: document.getElementById("chefQueueList"),
    chefQueueStatus: document.getElementById("chefQueueStatus"),
    chefQueueSection: document.getElementById("chefQueueSection"),
    openRecipesWorkspaceBtn: document.getElementById("openRecipesWorkspaceBtn"),
    openMenusWorkspaceBtn: document.getElementById("openMenusWorkspaceBtn"),
    openOrderingWorkspaceBtn: document.getElementById("openOrderingWorkspaceBtn"),
    openDashboardWorkspaceBtn: document.getElementById("openDashboardWorkspaceBtn"),
    openImportBtn: document.getElementById("openImportBtn"),
    downloadTemplateBtn: document.getElementById("downloadTemplateBtn"),

    ovBackBtn: document.getElementById("ovBackBtn"),
    ovEmoji: document.getElementById("ovEmoji"),
    ovName: document.getElementById("ovName"),
    ovDesc: document.getElementById("ovDesc"),
    ovMeta: document.getElementById("ovMeta"),
    ovDrinkOptions: document.getElementById("ovDrinkOptions"),
    ovTemperatureGroup: document.getElementById("ovTemperatureGroup"),
    ovTemperatureOptions: document.getElementById("ovTemperatureOptions"),
    ovSizeGroup: document.getElementById("ovSizeGroup"),
    ovSizeOptions: document.getElementById("ovSizeOptions"),
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
    doneBackBtn: document.getElementById("doneBackBtn"),

    importDialog: document.getElementById("importDialog"),
    closeImportBtn: document.getElementById("closeImportBtn"),
    importFileInput: document.getElementById("importFileInput"),
    importText: document.getElementById("importText"),
    importRecipesBtn: document.getElementById("importRecipesBtn"),
    pasteSampleBtn: document.getElementById("pasteSampleBtn"),
    clearImportedBtn: document.getElementById("clearImportedBtn"),
    importStatus: document.getElementById("importStatus"),

    gateUsernameInput: document.getElementById("gateUsernameInput"),
    gatePasswordInput: document.getElementById("gatePasswordInput"),
    saveGateBtn: document.getElementById("saveGateBtn"),
    disableGateBtn: document.getElementById("disableGateBtn"),
    gateStatus: document.getElementById("gateStatus"),
    openDashboardBtn: document.getElementById("openDashboardBtn"),

    loginDialog: document.getElementById("loginDialog"),
    loginUsernameInput: document.getElementById("loginUsernameInput"),
    loginPasswordInput: document.getElementById("loginPasswordInput"),
    loginSubmitBtn: document.getElementById("loginSubmitBtn"),
    loginStatus: document.getElementById("loginStatus"),

    dashboardDateInput: document.getElementById("dashboardDateInput"),
    dashboardSummary: document.getElementById("dashboardSummary"),
    ingredientTableBody: document.getElementById("ingredientTableBody"),
    recipeViewsTableBody: document.getElementById("recipeViewsTableBody"),
    exportIngredientTrackerBtn: document.getElementById("exportIngredientTrackerBtn"),
    exportRecipeViewsBtn: document.getElementById("exportRecipeViewsBtn"),
    managerLogoutBtn: document.getElementById("managerLogoutBtn"),

    managerLoginDialog: document.getElementById("managerLoginDialog"),
    managerUsernameInput: document.getElementById("managerUsernameInput"),
    managerPasswordInput: document.getElementById("managerPasswordInput"),
    managerLoginSubmitBtn: document.getElementById("managerLoginSubmitBtn"),
    managerLoginStatus: document.getElementById("managerLoginStatus"),

    orderCustomerInput: document.getElementById("orderCustomerInput"),
    orderRecipeSelect: document.getElementById("orderRecipeSelect"),
    orderQtyInput: document.getElementById("orderQtyInput"),
    orderTypeSelect: document.getElementById("orderTypeSelect"),
    addOrderBtn: document.getElementById("addOrderBtn"),
    clearOrdersBtn: document.getElementById("clearOrdersBtn"),
    clearPreparedOrdersBtn: document.getElementById("clearPreparedOrdersBtn"),
    orderingStatus: document.getElementById("orderingStatus"),
    orderQueueBody: document.getElementById("orderQueueBody"),
    preparedOrdersBody: document.getElementById("preparedOrdersBody"),
  };

  const foodRecipes = Array.isArray(window.RECIPES) ? window.RECIPES : [];
  const drinkRecipes = Array.isArray(window.DRINKS) ? window.DRINKS : [];
  const seasonalRecipes = Array.isArray(window.SEASONAL_SPECIALS) ? window.SEASONAL_SPECIALS : [];
  const componentRecipes = Array.isArray(window.COMPONENTS) ? window.COMPONENTS : [];
  const baseRecipes = [...foodRecipes, ...drinkRecipes, ...seasonalRecipes, ...componentRecipes];

  const state = {
    recipes: [],
    importedRecipes: [],
    selectedRecipe: null,
    recipeBackStack: [],
    stepIndex: 0,
    search: "",
    category: "food",
    drinkType: "hot",
    selectedDrinkOptions: {},
    gateConfig: null,
    isAuthorized: true,
    managerGateConfig: null,
    isManagerAuthorized: false,
    ingredientTracker: {},
    recipeViewsByDay: {},
    recipeRunsByDay: {},
    metricsLedger: [],
    orderQueue: [],
    preparedOrders: [],
    activeRecipeStartAt: null,
    activeOrderContext: null,
  };

  const store =
    window.AppStore && typeof window.AppStore.createPubSubStore === "function"
      ? window.AppStore.createPubSubStore()
      : {
          subscribe: function () {
            return function () {};
          },
          publish: function () {},
        };

  const subscribe = store.subscribe;
  const publish = store.publish;

  function navigateTo(viewName) {
    const viewEl = views[viewName];
    const alreadyActive = viewEl && viewEl.classList.contains("is-active");
    setActiveView(viewName);
    if (!alreadyActive && window.AppRouter && typeof window.AppRouter.ensureHashForView === "function") {
      window.AppRouter.ensureHashForView(viewName);
    }
  }

  function isLocalRuntime() {
    const host = window.location.hostname;
    const protocol = window.location.protocol;
    return protocol === "file:" || host === "localhost" || host === "127.0.0.1";
  }

  async function sha256Hex(value) {
    if (!window.crypto || !window.crypto.subtle) return "";
    const data = new TextEncoder().encode(String(value));
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

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

  function normalizeBooleanOptions(entry, keys) {
    const source = entry && typeof entry === "object" ? entry : {};
    const result = {};

    keys.forEach((key) => {
      if (source[key] === true) {
        result[key] = true;
      }
    });

    return result;
  }

  function normalizeTemperatureValue(value) {
    const normalized = toText(value, "").toLowerCase();
    if (normalized === "hot") return "hot";
    if (normalized === "cold" || normalized === "iced") return "cold";
    return normalized;
  }

  function normalizeIngredientList(entries) {
    return Array.isArray(entries) ? entries.map(normalizeIngredient).filter(Boolean) : [];
  }

  function normalizeDrinkIngredientVariants(entry) {
    const source = entry && typeof entry === "object" ? entry : {};
    const result = {};

    DRINK_TEMPERATURE_KEYS.forEach((temperature) => {
      const sizes = source[temperature];
      if (!sizes || typeof sizes !== "object") return;

      const normalizedSizes = {};
      DRINK_SIZE_KEYS.forEach((size) => {
        const ingredients = normalizeIngredientList(sizes[size]);
        if (ingredients.length) {
          normalizedSizes[size] = ingredients;
        }
      });

      if (Object.keys(normalizedSizes).length) {
        result[temperature] = normalizedSizes;
      }
    });

    return result;
  }

  function drinkConfigFor(recipe) {
    return {
      temperatures: normalizeBooleanOptions(recipe && recipe.temperatures, DRINK_TEMPERATURE_KEYS),
      sizes: normalizeBooleanOptions(recipe && recipe.sizes, DRINK_SIZE_KEYS),
      ingredientVariants: normalizeDrinkIngredientVariants(recipe && recipe.ingredientVariants),
    };
  }

  function isDrinkRecipe(recipe) {
    return recipeCategoryOf(recipe) === "drinks";
  }

  function listDrinkTemperatures(recipe) {
    const config = drinkConfigFor(recipe);
    const available = new Set();

    DRINK_TEMPERATURE_KEYS.forEach((temperature) => {
      if (config.temperatures[temperature] || config.ingredientVariants[temperature]) {
        available.add(temperature);
      }
    });

    const drinkType = normalizeTemperatureValue(recipe && recipe.drinkType);
    if (drinkType === "hot" || drinkType === "cold") {
      available.add(drinkType);
    }

    return DRINK_TEMPERATURE_KEYS.filter((temperature) => available.has(temperature));
  }

  function listDrinkSizes(recipe, temperature) {
    const config = drinkConfigFor(recipe);
    const available = new Set();

    DRINK_SIZE_KEYS.forEach((size) => {
      if (config.sizes[size]) {
        available.add(size);
      }
    });

    const variantSizes = config.ingredientVariants[temperature] || {};
    DRINK_SIZE_KEYS.forEach((size) => {
      if (variantSizes[size]) {
        available.add(size);
      }
    });

    if (!available.size) {
      DRINK_TEMPERATURE_KEYS.forEach((key) => {
        const sizes = config.ingredientVariants[key] || {};
        DRINK_SIZE_KEYS.forEach((size) => {
          if (sizes[size]) {
            available.add(size);
          }
        });
      });
    }

    return DRINK_SIZE_KEYS.filter((size) => available.has(size));
  }

  function activeDrinkSelectionFor(recipe) {
    if (!isDrinkRecipe(recipe)) return null;

    const temperatures = listDrinkTemperatures(recipe);
    const defaultTemperature = temperatures[0] || "";
    const hasSizeOptions = listDrinkSizes(recipe, defaultTemperature).length > 0;
    if (!temperatures.length && !hasSizeOptions) return null;

    const stored = state.selectedDrinkOptions[recipe.id] || {};
    const temperature = temperatures.includes(stored.temperature) ? stored.temperature : defaultTemperature;
    const sizes = listDrinkSizes(recipe, temperature);
    const size = sizes.includes(stored.size) ? stored.size : sizes[0] || "";

    state.selectedDrinkOptions[recipe.id] = { temperature, size };
    return state.selectedDrinkOptions[recipe.id];
  }

  function activeIngredientsFor(recipe) {
    const baseIngredients = normalizeIngredientList(recipe && recipe.ingredients);
    if (!isDrinkRecipe(recipe)) return baseIngredients;

    const selection = activeDrinkSelectionFor(recipe);
    if (!selection) return baseIngredients;

    const config = drinkConfigFor(recipe);
    const variantsByTemperature = config.ingredientVariants[selection.temperature] || {};
    const variantIngredients = variantsByTemperature[selection.size] || [];

    return variantIngredients.length ? variantIngredients : baseIngredients;
  }

  function searchableIngredientsFor(recipe) {
    const seen = new Map();

    normalizeIngredientList(recipe && recipe.ingredients).forEach((ingredient) => {
      seen.set(`${ingredient.name}|${ingredient.quantity}`, ingredient);
    });

    const config = drinkConfigFor(recipe);
    DRINK_TEMPERATURE_KEYS.forEach((temperature) => {
      const sizes = config.ingredientVariants[temperature] || {};
      DRINK_SIZE_KEYS.forEach((size) => {
        (sizes[size] || []).forEach((ingredient) => {
          seen.set(`${ingredient.name}|${ingredient.quantity}`, ingredient);
        });
      });
    });

    return Array.from(seen.values());
  }

  function formatDrinkOptionLabel(value) {
    if (value === "hot") return "Hot";
    if (value === "cold") return "Cold";
    return value;
  }

  function updateDrinkSelection(recipe, nextSelection) {
    if (!recipe || !recipe.id) return;

    const current = activeDrinkSelectionFor(recipe) || { temperature: "", size: "" };
    state.selectedDrinkOptions[recipe.id] = {
      temperature: Object.prototype.hasOwnProperty.call(nextSelection, "temperature")
        ? nextSelection.temperature
        : current.temperature,
      size: Object.prototype.hasOwnProperty.call(nextSelection, "size") ? nextSelection.size : current.size,
    };
  }

  function renderDrinkOptionButtons(container, values, selectedValue, onSelect) {
    if (!container) return;

    container.innerHTML = "";
    values.forEach((value) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "drink-option-chip";
      button.classList.toggle("is-active", value === selectedValue);
      button.setAttribute("aria-pressed", String(value === selectedValue));
      button.textContent = formatDrinkOptionLabel(value);
      button.addEventListener("click", () => onSelect(value));
      container.appendChild(button);
    });
  }

  function renderOverviewDrinkOptions(recipe) {
    if (!ui.ovDrinkOptions || !ui.ovTemperatureGroup || !ui.ovSizeGroup) return;

    const selection = activeDrinkSelectionFor(recipe);
    if (!selection) {
      ui.ovDrinkOptions.hidden = true;
      ui.ovTemperatureGroup.hidden = true;
      ui.ovSizeGroup.hidden = true;
      if (ui.ovTemperatureOptions) ui.ovTemperatureOptions.innerHTML = "";
      if (ui.ovSizeOptions) ui.ovSizeOptions.innerHTML = "";
      return;
    }

    const temperatures = listDrinkTemperatures(recipe);
    const sizes = listDrinkSizes(recipe, selection.temperature);

    ui.ovDrinkOptions.hidden = false;
    ui.ovTemperatureGroup.hidden = !temperatures.length;
    ui.ovSizeGroup.hidden = !sizes.length;

    renderDrinkOptionButtons(ui.ovTemperatureOptions, temperatures, selection.temperature, (temperature) => {
      updateDrinkSelection(recipe, { temperature, size: "" });
      openRecipeOverview(recipe.id, { keepStack: true, orderId: state.activeOrderContext && state.activeOrderContext.orderId });
    });

    renderDrinkOptionButtons(ui.ovSizeOptions, sizes, activeDrinkSelectionFor(recipe).size, (size) => {
      updateDrinkSelection(recipe, { size });
      openRecipeOverview(recipe.id, { keepStack: true, orderId: state.activeOrderContext && state.activeOrderContext.orderId });
    });
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

    if (!steps.length) return null;

    const id = toText(recipe.id, "") || `imported-${slugify(name)}-${index + 1}`;

    return {
      id,
      name,
      emoji: toText(recipe.emoji, "🍽️"),
      description: toText(recipe.description, "Imported recipe"),
      category: toText(recipe.category, "food"),
      drinkType: toText(recipe.drinkType, ""),
      servings: Number.isFinite(Number(recipe.servings)) ? Number(recipe.servings) : 2,
      time: toText(recipe.time, "20 min"),
      difficulty: ["Easy", "Medium", "Hard"].includes(recipe.difficulty)
        ? recipe.difficulty
        : "Easy",
      ingredients,
      temperatures: normalizeBooleanOptions(recipe.temperatures, DRINK_TEMPERATURE_KEYS),
      sizes: normalizeBooleanOptions(recipe.sizes, DRINK_SIZE_KEYS),
      ingredientVariants: normalizeDrinkIngredientVariants(recipe.ingredientVariants),
      steps,
      source: "imported",
    };
  }

  function normalizeDifficulty(value) {
    const level = toText(value, "").toLowerCase();
    if (level === "medium") return "Medium";
    if (level === "hard") return "Hard";
    return "Easy";
  }

  function normalizeRowsToRecipes(rows) {
    const groups = new Map();

    rows.forEach((row, index) => {
      if (!row || typeof row !== "object") return;

      const recipeName = toText(row.recipe_name || row.name, "");
      if (!recipeName) return;

      const recipeId = toText(row.recipe_id || row.id, "") || `imported-${slugify(recipeName)}`;

      if (!groups.has(recipeId)) {
        groups.set(recipeId, {
          id: recipeId,
          name: recipeName,
          emoji: toText(row.recipe_emoji || row.emoji, "🍽️"),
          description: toText(row.recipe_description || row.description, "Imported recipe"),
          servings: Number.isFinite(Number(row.recipe_servings || row.servings))
            ? Number(row.recipe_servings || row.servings)
            : 2,
          time: toText(row.recipe_time || row.time, "20 min"),
          difficulty: normalizeDifficulty(row.recipe_difficulty || row.difficulty),
          ingredients: [],
          steps: [],
          source: "imported",
        });
      }

      const recipe = groups.get(recipeId);
      const ingredientName = toText(row.ingredient_name || "", "");
      const ingredientQuantity = toText(row.ingredient_quantity || "", "");

      if (ingredientName && ingredientQuantity) {
        const existingIngredient = recipe.ingredients.find(
          (ing) => ing.name === ingredientName && ing.quantity === ingredientQuantity
        );
        if (!existingIngredient) {
          recipe.ingredients.push({ name: ingredientName, quantity: ingredientQuantity });
        }
      }

      const stepIngredient = toText(row.step_ingredient || "", "");
      const stepQuantity = toText(row.step_quantity || "", "");
      const stepPlacement = toText(row.step_placement || "", "");
      const stepAction = toText(row.step_action || "", "");
      const stepDuration = toText(row.step_duration || "", "");
      const stepOrderRaw = Number(row.step_order);
      const stepOrder = Number.isFinite(stepOrderRaw) ? stepOrderRaw : index + 1;

      if (stepIngredient && stepQuantity && stepPlacement && stepAction) {
        recipe.steps.push({
          ingredient: stepIngredient,
          quantity: stepQuantity,
          placement: stepPlacement,
          action: stepAction,
          duration: stepDuration,
          _stepOrder: stepOrder,
        });
      }
    });

    const prepared = Array.from(groups.values()).map((recipe) => {
      recipe.steps.sort((a, b) => a._stepOrder - b._stepOrder);
      recipe.steps = recipe.steps.map((step) => {
        const cleaned = {
          ingredient: step.ingredient,
          quantity: step.quantity,
          placement: step.placement,
          action: step.action,
        };
        if (step.duration) cleaned.duration = step.duration;
        return cleaned;
      });
      return recipe;
    });

    return prepared.map((recipe, idx) => normalizeRecipe(recipe, idx)).filter(Boolean);
  }

  function setImportStatus(message, kind) {
    if (!ui.importStatus) return;
    ui.importStatus.textContent = message;
    ui.importStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.importStatus.classList.add("is-success");
    if (kind === "error") ui.importStatus.classList.add("is-error");
  }

  function setGateStatus(message, kind) {
    if (!ui.gateStatus) return;
    ui.gateStatus.textContent = message;
    ui.gateStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.gateStatus.classList.add("is-success");
    if (kind === "error") ui.gateStatus.classList.add("is-error");
  }

  function setLoginStatus(message, kind) {
    if (!ui.loginStatus) return;
    ui.loginStatus.textContent = message;
    ui.loginStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.loginStatus.classList.add("is-success");
    if (kind === "error") ui.loginStatus.classList.add("is-error");
  }

  function setManagerLoginStatus(message, kind) {
    if (!ui.managerLoginStatus) return;
    ui.managerLoginStatus.textContent = message;
    ui.managerLoginStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.managerLoginStatus.classList.add("is-success");
    if (kind === "error") ui.managerLoginStatus.classList.add("is-error");
  }

  function readAttemptRecord(key) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      if (!parsed || typeof parsed !== "object") return { fails: 0, lockUntil: 0 };
      return { fails: Number(parsed.fails) || 0, lockUntil: Number(parsed.lockUntil) || 0 };
    } catch (_error) {
      return { fails: 0, lockUntil: 0 };
    }
  }

  function writeAttemptRecord(key, record) {
    try {
      localStorage.setItem(key, JSON.stringify(record));
    } catch (_error) {}
  }

  function attemptLockRemainingMs(key) {
    const remaining = readAttemptRecord(key).lockUntil - Date.now();
    return remaining > 0 ? remaining : 0;
  }

  function registerFailedAttempt(key) {
    const fails = readAttemptRecord(key).fails + 1;
    const waitSeconds = Math.min(300, 5 * Math.pow(2, fails - 1));
    writeAttemptRecord(key, { fails, lockUntil: Date.now() + waitSeconds * 1000 });
    return waitSeconds;
  }

  function clearFailedAttempts(key) {
    try {
      localStorage.removeItem(key);
    } catch (_error) {}
  }

  function describeWait(ms) {
    const seconds = Math.max(1, Math.ceil(ms / 1000));
    if (seconds < 60) return seconds + " second" + (seconds === 1 ? "" : "s");
    const minutes = Math.ceil(seconds / 60);
    return minutes + " minute" + (minutes === 1 ? "" : "s");
  }

  function setOrderingStatus(message, kind) {
    if (!ui.orderingStatus) return;
    ui.orderingStatus.textContent = message;
    ui.orderingStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.orderingStatus.classList.add("is-success");
    if (kind === "error") ui.orderingStatus.classList.add("is-error");
  }

  function setChefQueueStatus(message, kind) {
    if (!ui.chefQueueStatus) return;
    ui.chefQueueStatus.textContent = message;
    ui.chefQueueStatus.classList.remove("is-success", "is-error");
    if (kind === "success") ui.chefQueueStatus.classList.add("is-success");
    if (kind === "error") ui.chefQueueStatus.classList.add("is-error");
  }

  function getTodayKey() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseStoredObject(rawValue) {
    if (!rawValue) return {};
    try {
      const parsed = JSON.parse(rawValue);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_error) {
      return {};
    }
  }

  function saveImportedRecipes() {
    try {
      localStorage.setItem(IMPORT_STORAGE_KEY, JSON.stringify(state.importedRecipes));
    } catch (_error) {
    }
  }

  function saveGateConfig(config) {
    try {
      localStorage.setItem(GATE_CONFIG_STORAGE_KEY, JSON.stringify(config));
      localStorage.removeItem(GATE_DISABLED_STORAGE_KEY);
    } catch (_error) {
    }
  }

  function saveManagerGateConfig(config) {
    try {
      localStorage.setItem(MANAGER_GATE_CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch (_error) {
    }
  }

  function loadManagerGateConfig() {
    try {
      const raw = localStorage.getItem(MANAGER_GATE_CONFIG_STORAGE_KEY);
      if (!raw) {
        saveManagerGateConfig(DEFAULT_MANAGER_ADMIN);
        return DEFAULT_MANAGER_ADMIN;
      }

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return DEFAULT_MANAGER_ADMIN;
      const username = toText(parsed.username, "");
      const passwordHash = toText(parsed.passwordHash, "");
      if (!username || !passwordHash) return DEFAULT_MANAGER_ADMIN;
      if (passwordHash === LEGACY_MANAGER_SEED_HASH) {
        
        saveManagerGateConfig(DEFAULT_MANAGER_ADMIN);
        return DEFAULT_MANAGER_ADMIN;
      }
      return { username, passwordHash };
    } catch (_error) {
      return DEFAULT_MANAGER_ADMIN;
    }
  }

  function saveIngredientTracker() {
    try {
      localStorage.setItem(INGREDIENT_TRACKER_STORAGE_KEY, JSON.stringify(state.ingredientTracker));
    } catch (_error) {
    }
  }

  function loadIngredientTracker() {
    return parseStoredObject(localStorage.getItem(INGREDIENT_TRACKER_STORAGE_KEY));
  }

  function saveRecipeViewsByDay() {
    try {
      localStorage.setItem(RECIPE_VIEWS_STORAGE_KEY, JSON.stringify(state.recipeViewsByDay));
    } catch (_error) {
    }
  }

  function loadRecipeViewsByDay() {
    return parseStoredObject(localStorage.getItem(RECIPE_VIEWS_STORAGE_KEY));
  }

  function saveRecipeRunsByDay() {
    try {
      localStorage.setItem(RECIPE_RUNS_STORAGE_KEY, JSON.stringify(state.recipeRunsByDay));
    } catch (_error) {
    }
  }

  function loadRecipeRunsByDay() {
    return parseStoredObject(localStorage.getItem(RECIPE_RUNS_STORAGE_KEY));
  }

  function saveOrderQueue() {
    try {
      localStorage.setItem(ORDER_QUEUE_STORAGE_KEY, JSON.stringify(state.orderQueue));
    } catch (_error) {
    }
  }

  function loadOrderQueue() {
    try {
      const parsed = JSON.parse(localStorage.getItem(ORDER_QUEUE_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function savePreparedOrders() {
    try {
      localStorage.setItem(PREPARED_ORDERS_STORAGE_KEY, JSON.stringify(state.preparedOrders));
    } catch (_error) {
    }
  }

  function loadPreparedOrders() {
    try {
      const parsed = JSON.parse(localStorage.getItem(PREPARED_ORDERS_STORAGE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  function commitOrderQueue(nextQueue, source) {
    state.orderQueue = Array.isArray(nextQueue) ? nextQueue : [];
    saveOrderQueue();
    publish("orders:changed", { source: source || "local" });
  }

  function commitPreparedOrders(nextPrepared, source) {
    state.preparedOrders = Array.isArray(nextPrepared) ? nextPrepared : [];
    savePreparedOrders();
    publish("orders:changed", { source: source || "local" });
  }

  function syncOrdersFromStorage() {
    state.orderQueue = loadOrderQueue();
    state.preparedOrders = loadPreparedOrders();
    publish("orders:changed", { source: "storage" });
  }

  function saveMetricsLedger() {
    try {
      localStorage.setItem(METRICS_LEDGER_STORAGE_KEY, JSON.stringify(state.metricsLedger));
    } catch (_error) {
    }
  }

  function loadMetricsLedger() {
    try {
      const parsed = JSON.parse(localStorage.getItem(METRICS_LEDGER_STORAGE_KEY) || "[]");
      if (!Array.isArray(parsed)) return [];
      return parsed.filter((item) => item && typeof item === "object" && item.type && item.day);
    } catch (_error) {
      return [];
    }
  }

  function resetMetricAggregates() {
    state.ingredientTracker = {};
    state.recipeViewsByDay = {};
    state.recipeRunsByDay = {};
  }

  function applyMetricEntryToAggregates(entry) {
    const day = toText(entry.day, "");
    if (!day) return;

    if (entry.type === "recipe_view") {
      const recipeId = toText(entry.recipeId, "");
      const recipeName = toText(entry.recipeName, recipeId);
      if (!recipeId) return;

      const dayViews = state.recipeViewsByDay[day] || {};
      const current = dayViews[recipeId] || { recipeId, recipeName, views: 0 };
      current.views += 1;
      current.recipeName = recipeName;
      dayViews[recipeId] = current;
      state.recipeViewsByDay[day] = dayViews;
      return;
    }

    if (entry.type === "ingredient_use") {
      const ingredientName = toText(entry.ingredientName, "");
      const quantity = toText(entry.quantity, "");
      if (!ingredientName) return;

      const dayTracker = state.ingredientTracker[day] || {};
      const key = ingredientName.toLowerCase();
      const current = dayTracker[key] || {
        ingredientName,
        timesUsed: 0,
        totalQuantityUsed: 0,
        quantityCounts: {},
      };

      current.timesUsed += 1;
      current.totalQuantityUsed += parseQuantityToNumber(quantity);
      if (quantity) {
        current.quantityCounts[quantity] = (current.quantityCounts[quantity] || 0) + 1;
      }

      dayTracker[key] = current;
      state.ingredientTracker[day] = dayTracker;
      return;
    }

    if (entry.type === "recipe_run") {
      const recipeId = toText(entry.recipeId, "");
      const recipeName = toText(entry.recipeName, recipeId);
      if (!recipeId) return;

      const dayRuns = state.recipeRunsByDay[day] || {};
      const current = dayRuns[recipeId] || {
        recipeId,
        recipeName,
        runCount: 0,
        totalTimeMinutes: 0,
        totalCostOfSale: 0,
        expectedPrepMinutes: Number(entry.expectedPrepMinutes || 0),
        costOfSalePerRun: Number(entry.costOfSalePerRun || 0),
      };

      current.runCount += 1;
      current.recipeName = recipeName;
      current.expectedPrepMinutes = Number(entry.expectedPrepMinutes || current.expectedPrepMinutes || 0);
      current.costOfSalePerRun = Number(entry.costOfSalePerRun || current.costOfSalePerRun || 0);
      current.totalTimeMinutes += Number(entry.actualMinutes || current.expectedPrepMinutes || 0);
      current.totalCostOfSale += Number(entry.costOfSalePerRun || current.costOfSalePerRun || 0);

      dayRuns[recipeId] = current;
      state.recipeRunsByDay[day] = dayRuns;
    }
  }

  function rebuildAggregatesFromLedger() {
    resetMetricAggregates();
    state.metricsLedger.forEach((entry) => {
      applyMetricEntryToAggregates(entry);
    });
  }

  function appendMetricEntries(entries) {
    const list = Array.isArray(entries) ? entries : [entries];
    if (!list.length) return;

    const normalized = list
      .filter(Boolean)
      .map((entry, idx) => {
        return {
          id: `metric-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 8)}`,
          at: Date.now(),
          ...entry,
        };
      });

    state.metricsLedger.push(...normalized);
    saveMetricsLedger();
    rebuildAggregatesFromLedger();

    saveIngredientTracker();
    saveRecipeViewsByDay();
    saveRecipeRunsByDay();
  }

  function parseQuantityToNumber(quantityText) {
    const text = toText(quantityText, "").replace(",", ".");
    if (!text) return 0;

    const fractionMatch = text.match(/(\d+)\s*\/\s*(\d+)/);
    if (fractionMatch) {
      const numerator = Number(fractionMatch[1]);
      const denominator = Number(fractionMatch[2]);
      if (denominator) return numerator / denominator;
    }

    const numberMatch = text.match(/\d+(\.\d+)?/);
    if (!numberMatch) return 0;
    return Number(numberMatch[0]) || 0;
  }

  function setGateDisabledPreference(isDisabled) {
    try {
      if (isDisabled) {
        localStorage.setItem(GATE_DISABLED_STORAGE_KEY, "1");
      } else {
        localStorage.removeItem(GATE_DISABLED_STORAGE_KEY);
      }
    } catch (_error) {
    }
  }

  function loadGateConfig() {
    if (!isLocalRuntime()) return null;

    try {
      if (localStorage.getItem(GATE_DISABLED_STORAGE_KEY) === "1") {
        return null;
      }

      const raw = localStorage.getItem(GATE_CONFIG_STORAGE_KEY);
      if (!raw) {
        
        return null;
      }

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      const username = toText(parsed.username, "");
      const passwordHash = toText(parsed.passwordHash, "");
      if (!username || !passwordHash) return null;
      if (passwordHash === LEGACY_LOCAL_SEED_HASH) {
        
        try {
          localStorage.removeItem(GATE_CONFIG_STORAGE_KEY);
        } catch (_removeError) {}
        return null;
      }
      return { username, passwordHash, localOnly: true };
    } catch (_error) {
      return null;
    }
  }

  function clearGateConfig() {
    try {
      localStorage.removeItem(GATE_CONFIG_STORAGE_KEY);
      sessionStorage.removeItem(GATE_SESSION_STORAGE_KEY);
      setGateDisabledPreference(true);
    } catch (_error) {
    }
  }

  function isGateSessionValid(config) {
    if (!config) return true;
    try {
      const raw = sessionStorage.getItem(GATE_SESSION_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return parsed && parsed.username === config.username && parsed.authorized === true;
    } catch (_error) {
      return false;
    }
  }

  function markGateSessionAuthorized(username) {
    try {
      sessionStorage.setItem(
        GATE_SESSION_STORAGE_KEY,
        JSON.stringify({ username, authorized: true, at: Date.now() })
      );
    } catch (_error) {
    }
  }

  function isManagerSessionValid(config) {
    if (!config) return false;
    try {
      const raw = sessionStorage.getItem(MANAGER_GATE_SESSION_STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return parsed && parsed.username === config.username && parsed.authorized === true;
    } catch (_error) {
      return false;
    }
  }

  function markManagerSessionAuthorized(username) {
    try {
      sessionStorage.setItem(
        MANAGER_GATE_SESSION_STORAGE_KEY,
        JSON.stringify({ username, authorized: true, at: Date.now() })
      );
    } catch (_error) {
    }
  }

  function clearManagerSession() {
    try {
      sessionStorage.removeItem(MANAGER_GATE_SESSION_STORAGE_KEY);
    } catch (_error) {
    }
  }

  function trackRecipeView(recipe) {
    if (!recipe || !recipe.id) return;

    appendMetricEntries({
      type: "recipe_view",
      day: getTodayKey(),
      recipeId: recipe.id,
      recipeName: recipe.name,
    });

    if (state.isManagerAuthorized && views.dashboard?.classList.contains("is-active")) {
      const selectedDay = ui.dashboardDateInput.value || getTodayKey();
      renderDashboard(selectedDay);
    }
  }

  function trackIngredientsUsed(recipe) {
    const ingredients = activeIngredientsFor(recipe);
    if (!ingredients.length) return;

    const day = getTodayKey();
    const entries = ingredients
      .map((ing) => {
        const ingredientName = toText(ing && ing.name, "");
        if (!ingredientName) return null;
        return {
          type: "ingredient_use",
          day,
          recipeId: recipe.id,
          recipeName: recipe.name,
          ingredientName,
          quantity: toText(ing && ing.quantity, ""),
        };
      })
      .filter(Boolean);

    appendMetricEntries(entries);

    if (state.isManagerAuthorized && views.dashboard?.classList.contains("is-active")) {
      const selectedDay = ui.dashboardDateInput.value || getTodayKey();
      renderDashboard(selectedDay);
    }
  }

  function trackRecipeRun(recipe, actualMinutes) {
    if (!recipe || !recipe.id) return;

    appendMetricEntries({
      type: "recipe_run",
      day: getTodayKey(),
      recipeId: recipe.id,
      recipeName: recipe.name,
      actualMinutes: Number(actualMinutes || 0),
      expectedPrepMinutes: Number(recipe.expectedPrepMinutes || 0),
      costOfSalePerRun: Number(recipe.costOfSale || 0),
    });

    if (state.isManagerAuthorized && views.dashboard?.classList.contains("is-active")) {
      const selectedDay = ui.dashboardDateInput.value || getTodayKey();
      renderDashboard(selectedDay);
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
    const trimmed = String(rawText || "").trim();
    if (!trimmed) {
      return { ok: false, error: "No import data found. Paste JSON or CSV and try again." };
    }

    const looksLikeJson = trimmed.startsWith("{") || trimmed.startsWith("[");
    if (!looksLikeJson) {
      const csvRows = parseCsvRows(trimmed);
      if (!csvRows.length) {
        return {
          ok: false,
          error:
            "CSV data is empty or invalid. Add the header row and recipe records, then try again.",
        };
      }

      const csvRecipes = normalizeRowsToRecipes(csvRows);
      if (!csvRecipes.length) {
        return {
          ok: false,
          error:
            "No valid recipes found in CSV. Required fields include recipe_name, ingredient_name, ingredient_quantity, step_ingredient, step_quantity, step_placement, and step_action.",
        };
      }

      return { ok: true, recipes: csvRecipes };
    }

    let parsed;
    try {
      parsed = JSON.parse(trimmed);
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

  function parseCsvRows(csvText) {
    if (!(window.XLSX && window.XLSX.utils)) return [];
    try {
      const workbook = window.XLSX.read(csvText, { type: "string", raw: false });
      const firstSheetName = workbook.SheetNames[0];
      if (!firstSheetName) return [];
      const sheet = workbook.Sheets[firstSheetName];
      if (!sheet) return [];
      return window.XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false });
    } catch (_error) {
      return [];
    }
  }

  function openImportDialog() {
    setImportStatus("", null);
    if (ui.importDialog && typeof ui.importDialog.showModal === "function") {
      ui.importDialog.showModal();
      return;
    }

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
      setImportStatus("Please choose a JSON, CSV, XLS, or XLSX file first.", "error");
      return;
    }

    try {
      const fileName = String(file.name || "").toLowerCase();
      const isSpreadsheet = fileName.endsWith(".xls") || fileName.endsWith(".xlsx");

      if (isSpreadsheet) {
        if (!(window.XLSX && window.XLSX.read)) {
          setImportStatus("Spreadsheet parser is unavailable. Reload and try again.", "error");
          return;
        }

        const buffer = await file.arrayBuffer();
        const workbook = window.XLSX.read(buffer, { type: "array", raw: false });
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          setImportStatus("The spreadsheet has no sheets to import.", "error");
          return;
        }

        const rows = window.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
          defval: "",
          raw: false,
        });

        const recipes = normalizeRowsToRecipes(rows);
        if (!recipes.length) {
          setImportStatus(
            "No valid recipes found in spreadsheet. Check required template columns.",
            "error"
          );
          return;
        }

        importFromText(JSON.stringify(recipes));
        return;
      }

      const text = await file.text();
      importFromText(text);
    } catch (_error) {
      setImportStatus("Could not read the selected file.", "error");
    }
  }

  function downloadTemplate() {
    const csvTemplate = [
      "recipe_id,recipe_name,recipe_emoji,recipe_description,recipe_servings,recipe_time,recipe_difficulty,ingredient_name,ingredient_quantity,step_order,step_ingredient,step_quantity,step_placement,step_action,step_duration",
      'soul-cafe-tomato-omelette,Tomato Omelette,🍳,Soft omelette with fresh tomato and herbs.,1,10 min,Easy,Eggs,2,1,Eggs + salt,2 + 1/4 tsp,In a bowl,Whisk until smooth.,1 min',
      'soul-cafe-tomato-omelette,Tomato Omelette,🍳,Soft omelette with fresh tomato and herbs.,1,10 min,Easy,Tomato,"1 small, chopped",2,Tomato,1 small,Into the egg mix,Stir to combine.,30 sec',
      'soul-cafe-tomato-omelette,Tomato Omelette,🍳,Soft omelette with fresh tomato and herbs.,1,10 min,Easy,Salt,1/4 tsp,3,Egg mixture,All of it,Into a greased hot pan,"Cook until set, fold and serve.",3 min',
    ].join("\n");

    const blob = new Blob([csvTemplate], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "soul-cafe-recipe-template.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function formatQuantityCounts(quantityCounts) {
    if (!quantityCounts || typeof quantityCounts !== "object") return "";
    return Object.entries(quantityCounts)
      .map(([qty, count]) => `${qty} x${count}`)
      .join(" | ");
  }

  function renderDashboardSummary(day) {
    const dayViews = state.recipeViewsByDay[day] || {};
    const dayIngredients = state.ingredientTracker[day] || {};
    const dayRuns = state.recipeRunsByDay[day] || {};
    const totalRecipeViews = Object.values(dayViews).reduce(
      (sum, item) => sum + Number(item.views || 0),
      0
    );
    const totalIngredientUses = Object.values(dayIngredients).reduce(
      (sum, item) => sum + Number(item.timesUsed || 0),
      0
    );
    const totalRuns = Object.values(dayRuns).reduce((sum, item) => sum + Number(item.runCount || 0), 0);
    const totalCostOfSale = Object.values(dayRuns).reduce(
      (sum, item) => sum + Number(item.totalCostOfSale || 0),
      0
    );

    ui.dashboardSummary.innerHTML = "";

    const cards = [
      { label: "Date", value: day },
      { label: "Recipe Views", value: String(totalRecipeViews) },
      { label: "Ingredient Uses", value: String(totalIngredientUses) },
      { label: "Unique Ingredients", value: String(Object.keys(dayIngredients).length) },
      { label: "Recipe Runs", value: String(totalRuns) },
      { label: "Total Cost of Sale", value: `INR ${totalCostOfSale.toFixed(2)}` },
    ];

    cards.forEach((cardData) => {
      const card = document.createElement("div");
      card.className = "dashboard-card";

      const label = document.createElement("span");
      label.className = "dashboard-card-label";
      label.textContent = cardData.label;

      const value = document.createElement("span");
      value.className = "dashboard-card-value";
      value.textContent = cardData.value;

      card.appendChild(label);
      card.appendChild(value);
      ui.dashboardSummary.appendChild(card);
    });
  }

  function renderIngredientTrackerTable(day) {
    const dayIngredients = state.ingredientTracker[day] || {};
    const list = Object.values(dayIngredients).sort((a, b) => {
      return Number(b.timesUsed || 0) - Number(a.timesUsed || 0);
    });

    ui.ingredientTableBody.innerHTML = "";

    if (!list.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.textContent = "No ingredient usage tracked for this day.";
      row.appendChild(cell);
      ui.ingredientTableBody.appendChild(row);
      return;
    }

    list.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.ingredientName;

      const usedCell = document.createElement("td");
      usedCell.textContent = String(item.timesUsed || 0);

      const totalQtyCell = document.createElement("td");
      totalQtyCell.textContent = Number(item.totalQuantityUsed || 0).toFixed(2);

      const qtyCell = document.createElement("td");
      qtyCell.textContent = formatQuantityCounts(item.quantityCounts);

      row.appendChild(nameCell);
      row.appendChild(usedCell);
      row.appendChild(totalQtyCell);
      row.appendChild(qtyCell);
      ui.ingredientTableBody.appendChild(row);
    });
  }

  function renderRecipeViewsTable(day) {
    const dayViews = state.recipeViewsByDay[day] || {};
    const dayRuns = state.recipeRunsByDay[day] || {};
    const list = Object.values(dayViews).sort((a, b) => {
      return Number(b.views || 0) - Number(a.views || 0);
    });

    const runOnly = Object.values(dayRuns).filter((run) => !dayViews[run.recipeId]);
    runOnly.forEach((run) => {
      list.push({ recipeId: run.recipeId, recipeName: run.recipeName, views: 0 });
    });

    ui.recipeViewsTableBody.innerHTML = "";

    if (!list.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 6;
      cell.textContent = "No recipe views tracked for this day.";
      row.appendChild(cell);
      ui.recipeViewsTableBody.appendChild(row);
      return;
    }

    list.forEach((item) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.recipeName || item.recipeId;

      const viewsCell = document.createElement("td");
      viewsCell.textContent = String(item.views || 0);

      const runData = dayRuns[item.recipeId] || null;
      const runCount = Number((runData && runData.runCount) || 0);
      const totalTime = Number((runData && runData.totalTimeMinutes) || 0);
      const avgTime = runCount ? totalTime / runCount : 0;
      const perRunCost = Number((runData && runData.costOfSalePerRun) || 0);
      const totalCost = Number((runData && runData.totalCostOfSale) || 0);

      const runsCell = document.createElement("td");
      runsCell.textContent = String(runCount);

      const avgTimeCell = document.createElement("td");
      avgTimeCell.textContent = runCount ? `${avgTime.toFixed(1)} min` : "-";

      const perRunCostCell = document.createElement("td");
      perRunCostCell.textContent = `INR ${perRunCost.toFixed(2)}`;

      const totalCostCell = document.createElement("td");
      totalCostCell.textContent = `INR ${totalCost.toFixed(2)}`;

      row.appendChild(nameCell);
      row.appendChild(viewsCell);
      row.appendChild(runsCell);
      row.appendChild(avgTimeCell);
      row.appendChild(perRunCostCell);
      row.appendChild(totalCostCell);
      ui.recipeViewsTableBody.appendChild(row);
    });
  }

  function renderDashboard(day) {
    renderDashboardSummary(day);
    renderIngredientTrackerTable(day);
    renderRecipeViewsTable(day);
  }

  function downloadCsv(lines, fileName) {
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  function escapeCsv(value) {
    const text = String(value == null ? "" : value);
    if (!/[",\n]/.test(text)) return text;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function exportIngredientTrackerCsv(day) {
    const dayIngredients = state.ingredientTracker[day] || {};
    const lines = ["date,ingredient_name,times_used,quantity_notes"];

    Object.values(dayIngredients).forEach((item) => {
      lines.push(
        [
          day,
          escapeCsv(item.ingredientName),
          Number(item.timesUsed || 0),
          escapeCsv(formatQuantityCounts(item.quantityCounts)),
        ].join(",")
      );
    });

    if (lines.length === 1) {
      lines.push([day, "", 0, ""].join(","));
    }

    downloadCsv(lines, `ingredient-tracker-${day}.csv`);
  }

  function exportRecipeViewsCsv(day) {
    const dayViews = state.recipeViewsByDay[day] || {};
    const lines = ["date,recipe_id,recipe_name,views"];

    Object.values(dayViews).forEach((item) => {
      lines.push(
        [
          day,
          escapeCsv(item.recipeId),
          escapeCsv(item.recipeName),
          Number(item.views || 0),
        ].join(",")
      );
    });

    if (lines.length === 1) {
      lines.push([day, "", "", 0].join(","));
    }

    downloadCsv(lines, `recipe-views-${day}.csv`);
  }

  function openManagerDashboard() {
    if (!state.managerGateConfig) {
      state.managerGateConfig = loadManagerGateConfig();
    }

    if (!isManagerSessionValid(state.managerGateConfig)) {
      state.isManagerAuthorized = false;
      setManagerLoginStatus("", null);
      ui.managerUsernameInput.value = state.managerGateConfig.username;
      ui.managerPasswordInput.value = "";

      if (ui.managerLoginDialog && typeof ui.managerLoginDialog.showModal === "function") {
        ui.managerLoginDialog.showModal();
      } else {
        ui.managerLoginDialog?.setAttribute("open", "open");
      }
      return;
    }

    state.isManagerAuthorized = true;
    const day = ui.dashboardDateInput.value || getTodayKey();
    ui.dashboardDateInput.value = day;
    renderDashboard(day);
    navigateTo("dashboard");
  }

  async function submitManagerLogin() {
    const config = state.managerGateConfig || loadManagerGateConfig();

    const lockedMs = attemptLockRemainingMs(MANAGER_ATTEMPTS_STORAGE_KEY);
    if (lockedMs > 0) {
      setManagerLoginStatus("Too many attempts. Try again in " + describeWait(lockedMs) + ".", "error");
      return;
    }

    const username = toText(ui.managerUsernameInput.value, "");
    const password = String(ui.managerPasswordInput.value || "").trim();

    if (!username || !password) {
      setManagerLoginStatus("Enter username and password.", "error");
      return;
    }

    const hash = await sha256Hex(password);
    if (!hash || username !== config.username || hash !== config.passwordHash) {
      const waitSeconds = registerFailedAttempt(MANAGER_ATTEMPTS_STORAGE_KEY);
      setManagerLoginStatus(
        "Invalid manager credentials. Try again in " + describeWait(waitSeconds * 1000) + ".",
        "error"
      );
      ui.managerPasswordInput.value = "";
      return;
    }

    clearFailedAttempts(MANAGER_ATTEMPTS_STORAGE_KEY);
    markManagerSessionAuthorized(username);
    state.isManagerAuthorized = true;
    setManagerLoginStatus("Signed in.", "success");

    if (ui.managerLoginDialog && typeof ui.managerLoginDialog.close === "function") {
      ui.managerLoginDialog.close();
    } else {
      ui.managerLoginDialog?.removeAttribute("open");
    }

    const day = ui.dashboardDateInput.value || getTodayKey();
    ui.dashboardDateInput.value = day;
    renderDashboard(day);
    navigateTo("dashboard");
  }

  function managerLogout() {
    state.isManagerAuthorized = false;
    clearManagerSession();
    navigateTo("landing");
  }

  function renderOrderQueue() {
    ui.orderQueueBody.innerHTML = "";

    if (!state.orderQueue.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.textContent = "No active orders in queue.";
      row.appendChild(cell);
      ui.orderQueueBody.appendChild(row);
      return;
    }

    state.orderQueue.forEach((order) => {
      const row = document.createElement("tr");
      [order.at, order.customer, order.recipeName, String(order.quantity), order.orderType].forEach(
        (value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        }
      );
      ui.orderQueueBody.appendChild(row);
    });

    renderChefQueueList();
    renderPreparedOrders();
  }

  function renderPreparedOrders() {
    if (!ui.preparedOrdersBody) return;

    ui.preparedOrdersBody.innerHTML = "";

    if (!state.preparedOrders.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 5;
      cell.textContent = "No prepared orders recorded yet.";
      row.appendChild(cell);
      ui.preparedOrdersBody.appendChild(row);
      return;
    }

    state.preparedOrders.forEach((order) => {
      const row = document.createElement("tr");
      [order.preparedAt, order.customer, order.recipeName, String(order.quantity), order.orderType].forEach(
        (value) => {
          const cell = document.createElement("td");
          cell.textContent = value;
          row.appendChild(cell);
        }
      );
      ui.preparedOrdersBody.appendChild(row);
    });
  }

  function renderChefQueueList() {
    if (!ui.chefQueueList) return;

    ui.chefQueueList.innerHTML = "";
    const queued = state.orderQueue.filter((order) => order.status !== "prepared");

    if (ui.chefQueueSection) {
      ui.chefQueueSection.hidden = queued.length === 0;
    }

    if (!queued.length) {
      return;
    }

    queued.forEach((order) => {
      const item = document.createElement("div");
      item.className = "chef-queue-item";

      const details = document.createElement("div");
      details.className = "chef-queue-details";

      const title = document.createElement("strong");
      title.textContent = `${order.recipeName} x${order.quantity}`;

      const meta = document.createElement("span");
      meta.textContent = `${order.customer} • ${order.orderType} • ${order.at}`;

      details.appendChild(title);
      details.appendChild(meta);

      const action = document.createElement("button");
      action.type = "button";
      action.className = "btn btn-primary btn-sm";
      action.textContent = "Prepare";
      action.addEventListener("click", () => {
        startQueuedOrder(order.id);
      });

      item.appendChild(details);
      item.appendChild(action);
      ui.chefQueueList.appendChild(item);
    });
  }

  function startQueuedOrder(orderId) {
    const order = state.orderQueue.find((item) => item.id === orderId);
    if (!order) {
      setChefQueueStatus("Order not found in queue.", "error");
      return;
    }

    state.activeOrderContext = { orderId: order.id };
    openRecipeOverview(order.recipeId, { orderId: order.id });
    setChefQueueStatus(`Preparing ${order.recipeName} for ${order.customer}.`, "success");
  }

  function markLinkedOrderPrepared() {
    if (!state.activeOrderContext || !state.activeOrderContext.orderId) return;

    const orderId = state.activeOrderContext.orderId;
    const idx = state.orderQueue.findIndex((item) => item.id === orderId);
    if (idx === -1) {
      state.activeOrderContext = null;
      return;
    }

    const order = state.orderQueue[idx];
    const nextQueue = state.orderQueue.slice();
    nextQueue.splice(idx, 1);

    const preparedAt = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nextPrepared = [
      {
      id: `prepared-${Date.now()}`,
      preparedAt,
      customer: order.customer,
      recipeId: order.recipeId,
      recipeName: order.recipeName,
      quantity: order.quantity,
      orderType: order.orderType,
      },
      ...state.preparedOrders,
    ];

    commitOrderQueue(nextQueue, "prepare");
    commitPreparedOrders(nextPrepared, "prepare");

    ui.doneText.textContent = `Great work. ${order.recipeName} for ${order.customer} is prepared and dequeued.`;
    setChefQueueStatus(`Order prepared and removed from queue: ${order.recipeName} x${order.quantity}.`, "success");
    state.activeOrderContext = null;
  }

  function renderOrderRecipeOptions() {
    ui.orderRecipeSelect.innerHTML = "";
    state.recipes
      .filter((recipe) => recipe.category !== "component")
      .forEach((recipe) => {
        const option = document.createElement("option");
        option.value = recipe.id;
        option.textContent = recipe.name;
        ui.orderRecipeSelect.appendChild(option);
      });
  }

  function addOrderToQueue() {
    const customer = toText(ui.orderCustomerInput.value, "Guest");
    const recipeId = toText(ui.orderRecipeSelect.value, "");
    const orderType = toText(ui.orderTypeSelect.value, "Dine-in");
    const quantity = Math.max(1, Number(ui.orderQtyInput.value || 1));
    const recipe = state.recipes.find((item) => item.id === recipeId);

    if (!recipe) {
      setOrderingStatus("Select a valid recipe for the order.", "error");
      return;
    }

    const now = new Date();
    const at = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const nextQueue = [
      {
      id: `order-${Date.now()}`,
      at,
      customer,
      recipeId,
      recipeName: recipe.name,
      quantity,
      orderType,
      status: "queued",
      },
      ...state.orderQueue,
    ];

    commitOrderQueue(nextQueue, "add");
    setOrderingStatus("Order added to queue.", "success");
    ui.orderCustomerInput.value = "";
    ui.orderQtyInput.value = "1";
  }

  function clearOrderQueue() {
    commitOrderQueue([], "clear");
    setOrderingStatus("Order queue cleared.", "success");
  }

  function clearPreparedOrders() {
    commitPreparedOrders([], "clear-prepared");
    setOrderingStatus("Prepared orders history cleared.", "success");
  }

  function openChefRecipesWorkspace() {
    if (!enforceLocalLoginGate()) {
      renderRecipeCards();
      return;
    }

    renderRecipeCards();
    navigateTo("home");
  }

  function openMenusWorkspace() {
    navigateTo("menus");
  }

  function openOrderingWorkspace() {
    renderOrderRecipeOptions();
    renderOrderQueue();
    navigateTo("ordering");
  }

  function enforceLocalLoginGate() {
    if (!isLocalRuntime()) {
      state.isAuthorized = true;
      return true;
    }

    const config = state.gateConfig;
    if (!config) {
      state.isAuthorized = true;
      return true;
    }

    if (isGateSessionValid(config)) {
      state.isAuthorized = true;
      return true;
    }

    state.isAuthorized = false;
    setLoginStatus("", null);
    ui.loginPasswordInput.value = "";
    ui.loginUsernameInput.value = config.username;

    if (ui.loginDialog && typeof ui.loginDialog.showModal === "function") {
      ui.loginDialog.showModal();
    } else {
      ui.loginDialog?.setAttribute("open", "open");
    }

    return false;
  }

  async function saveLocalGate() {
    if (!isLocalRuntime()) {
      setGateStatus("Local gate can only be configured on localhost or file:// runtime.", "error");
      return;
    }

    const username = toText(ui.gateUsernameInput.value, "");
    const password = String(ui.gatePasswordInput.value || "").trim();

    if (!username || !password) {
      setGateStatus("Enter both username and password to enable the gate.", "error");
      return;
    }

    const passwordHash = await sha256Hex(password);
    if (!passwordHash) {
      setGateStatus("Secure hashing is unavailable in this browser.", "error");
      return;
    }

    state.gateConfig = { username, passwordHash, localOnly: true };
    saveGateConfig(state.gateConfig);
    markGateSessionAuthorized(username);
    state.isAuthorized = true;
    ui.gatePasswordInput.value = "";
    setGateStatus("Local gate enabled. It will apply only on local runtime.", "success");
    renderRecipeCards();
  }

  function disableLocalGate() {
    state.gateConfig = null;
    state.isAuthorized = true;
    clearGateConfig();
    setGateDisabledPreference(true);
    if (ui.loginDialog && typeof ui.loginDialog.close === "function") {
      ui.loginDialog.close();
    } else {
      ui.loginDialog?.removeAttribute("open");
    }
    setGateStatus("Local gate disabled.", "success");
    renderRecipeCards();
  }

  async function submitLocalGateLogin() {
    const config = state.gateConfig;
    if (!config) {
      state.isAuthorized = true;
      if (ui.loginDialog && typeof ui.loginDialog.close === "function") {
        ui.loginDialog.close();
      } else {
        ui.loginDialog?.removeAttribute("open");
      }
      return;
    }

    const lockedMs = attemptLockRemainingMs(GATE_ATTEMPTS_STORAGE_KEY);
    if (lockedMs > 0) {
      setLoginStatus("Too many attempts. Try again in " + describeWait(lockedMs) + ".", "error");
      return;
    }

    const username = toText(ui.loginUsernameInput.value, "");
    const password = String(ui.loginPasswordInput.value || "").trim();

    if (!username || !password) {
      setLoginStatus("Enter username and password.", "error");
      return;
    }

    const passwordHash = await sha256Hex(password);
    if (username !== config.username || passwordHash !== config.passwordHash) {
      const waitSeconds = registerFailedAttempt(GATE_ATTEMPTS_STORAGE_KEY);
      setLoginStatus("Invalid credentials. Try again in " + describeWait(waitSeconds * 1000) + ".", "error");
      ui.loginPasswordInput.value = "";
      return;
    }

    clearFailedAttempts(GATE_ATTEMPTS_STORAGE_KEY);
    markGateSessionAuthorized(username);
    state.isAuthorized = true;
    setLoginStatus("Signed in.", "success");

    if (ui.loginDialog && typeof ui.loginDialog.close === "function") {
      ui.loginDialog.close();
    } else {
      ui.loginDialog?.removeAttribute("open");
    }

    renderRecipeCards();
    navigateTo("home");
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

  function recipeCategoryOf(recipe) {
    if (recipe.category === "drinks") return "drinks";
    if (recipe.category === "component") return "component";
    return "food";
  }

  function recipeMatchesCategory(recipe) {
    const category = recipeCategoryOf(recipe);
    if (category !== state.category) return false;
    if (state.category === "drinks" && state.drinkType) {
      if (state.drinkType === "soul-special") {
        return (recipe.drinkType || "") === "soul-special";
      }

      const temperature = normalizeTemperatureValue(state.drinkType);
      const availableTemperatures = listDrinkTemperatures(recipe);
      if (availableTemperatures.length) {
        return availableTemperatures.includes(temperature);
      }

      return normalizeTemperatureValue(recipe.drinkType) === temperature;
    }
    return true;
  }

  function filteredRecipes() {
    const q = state.search.trim().toLowerCase();

    return state.recipes.filter((recipe) => {
      if (!recipeMatchesCategory(recipe)) return false;
      if (!q) return true;
      return (
        recipe.name.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        searchableIngredientsFor(recipe).some((ing) => ing.name.toLowerCase().includes(q))
      );
    });
  }

  function renderRecipeCards() {
    if (!state.isAuthorized) {
      ui.recipeGrid.innerHTML = "";
      ui.recipeGrid.hidden = true;
      ui.noResults.hidden = true;
      return;
    }

    ui.recipeGrid.hidden = false;
    const list = filteredRecipes();
    ui.recipeGrid.innerHTML = "";

    if (!list.length) {
      ui.noResults.hidden = false;
      ui.noResults.textContent = state.search.trim()
        ? "No recipes match your search."
        : state.category === "drinks"
        ? "No drinks in this category yet."
        : state.category === "component"
        ? "No master recipes in this category yet."
        : "No recipes yet.";
      return;
    }

    ui.noResults.hidden = true;

    list.forEach((recipe) => {
      const queuedForRecipe = state.orderQueue.filter(
        (order) => order.status !== "prepared" && order.recipeId === recipe.id
      );

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

      const temperatures = listDrinkTemperatures(recipe);
      const sizes = listDrinkSizes(recipe, "");

      if (queuedForRecipe.length) {
        card.classList.add("has-queue");
        const queueTop = document.createElement("span");
        queueTop.className = "card-queue-top";
        queueTop.textContent = `Q ${queuedForRecipe.length}`;
        card.appendChild(queueTop);
      }

      card.appendChild(emoji);
      card.appendChild(name);
      card.appendChild(desc);
      card.appendChild(meta);

      if (temperatures.length || sizes.length) {
        const optionMeta = document.createElement("div");
        optionMeta.className = "card-option-meta";

        temperatures.forEach((temperature) => {
          optionMeta.appendChild(createMetaChip(formatDrinkOptionLabel(temperature), "chip-outline"));
        });

        sizes.forEach((size) => {
          optionMeta.appendChild(createMetaChip(size, "chip-outline"));
        });

        card.appendChild(optionMeta);
      }

      card.addEventListener("click", () => {
        if (queuedForRecipe.length) {
          startQueuedOrder(queuedForRecipe[0].id);
          return;
        }
        openRecipeOverview(recipe.id);
      });

      ui.recipeGrid.appendChild(card);
    });
  }

  function setCategory(category) {
    state.category = category === "drinks" || category === "component" ? category : "food";
    const isDrinks = state.category === "drinks";
    const isMaster = state.category === "component";

    if (ui.catFoodTab) {
      ui.catFoodTab.classList.toggle("is-active", state.category === "food");
      ui.catFoodTab.setAttribute("aria-selected", String(state.category === "food"));
    }
    if (ui.catDrinksTab) {
      ui.catDrinksTab.classList.toggle("is-active", isDrinks);
      ui.catDrinksTab.setAttribute("aria-selected", String(isDrinks));
    }
    if (ui.catMasterTab) {
      ui.catMasterTab.classList.toggle("is-active", isMaster);
      ui.catMasterTab.setAttribute("aria-selected", String(isMaster));
    }
    if (ui.drinkSubtabs) {
      ui.drinkSubtabs.hidden = !isDrinks;
    }

    renderRecipeCards();
  }

  function setDrinkType(drinkType) {
    state.drinkType = drinkType || "hot";

    if (ui.drinkSubtabs) {
      ui.drinkSubtabs.querySelectorAll(".cat-subtab").forEach((button) => {
        const isActive = button.getAttribute("data-drink") === state.drinkType;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", String(isActive));
      });
    }

    renderRecipeCards();
  }

  function linkedRecipeIdFor(ingredientName) {
    const key = String(ingredientName || "").trim().toLowerCase().replace(/\s+/g, " ");
    if (!key) return null;
    const links = window.RECIPE_LINKS || {};
    return Object.prototype.hasOwnProperty.call(links, key) ? links[key] : null;
  }

  function openRecipeOverview(recipeId, options) {
    const recipe = state.recipes.find((r) => r.id === recipeId);
    if (!recipe) return;

    const context = options && typeof options === "object" ? options : {};

    if (context.parentId && context.parentId !== recipeId) {
      state.recipeBackStack.push(context.parentId);
    } else if (!context.keepStack) {
      state.recipeBackStack = [];
    }

    state.activeOrderContext = context.orderId ? { orderId: context.orderId } : null;

    trackRecipeView(recipe);
    state.selectedRecipe = recipe;
    state.stepIndex = 0;

    ui.ovEmoji.textContent = recipe.emoji;
    ui.ovName.textContent = recipe.name;
    ui.ovDesc.textContent = recipe.description;

    ui.ovMeta.innerHTML = "";
    ui.ovMeta.appendChild(createMetaChip(recipe.time));
    ui.ovMeta.appendChild(createMetaChip(`${recipe.servings} servings`));
    ui.ovMeta.appendChild(createMetaChip(recipe.difficulty, `diff-${recipe.difficulty}`));

    renderOverviewDrinkOptions(recipe);

    ui.ovIngredients.innerHTML = "";
    activeIngredientsFor(recipe).forEach((ing) => {
      const li = document.createElement("li");

      const linkedId = linkedRecipeIdFor(ing.name);
      const hasLink =
        linkedId && linkedId !== recipe.id && state.recipes.some((r) => r.id === linkedId);

      let name;
      if (hasLink) {
        name = document.createElement("button");
        name.type = "button";
        name.className = "ing-name ing-link";
        name.title = "View base recipe";
        name.addEventListener("click", () => openRecipeOverview(linkedId, { parentId: recipe.id }));
      } else {
        name = document.createElement("span");
        name.className = "ing-name";
      }
      name.textContent = ing.name;

      const qty = document.createElement("span");
      qty.className = "ing-qty";
      qty.textContent = ing.quantity;

      li.appendChild(name);
      li.appendChild(qty);
      ui.ovIngredients.appendChild(li);
    });

    updateOverviewBackLink();
    navigateTo("overview");
  }

  function updateOverviewBackLink() {
    if (!ui.ovBackBtn) return;
    if (state.recipeBackStack.length) {
      const parentId = state.recipeBackStack[state.recipeBackStack.length - 1];
      const parent = state.recipes.find((r) => r.id === parentId);
      ui.ovBackBtn.textContent = parent ? `← Back to ${parent.name}` : "← Back";
    } else {
      ui.ovBackBtn.textContent = "← All recipes";
    }
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

    ui.stepCard.classList.remove("confirm-flash");
    ui.stepCard.style.animation = "none";
    void ui.stepCard.offsetWidth;
    ui.stepCard.style.animation = "pop-in 0.3s ease both";
  }

  function openCookView() {
    if (!state.selectedRecipe) return;
    state.stepIndex = 0;
    state.activeRecipeStartAt = Date.now();
    updateStepView();
    navigateTo("cook");
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

    const elapsedMs = Date.now() - Number(state.activeRecipeStartAt || Date.now());
    const elapsedMinutes = Math.max(1, Math.round(elapsedMs / 60000));
    trackIngredientsUsed(recipe);
    trackRecipeRun(recipe, elapsedMinutes);

    ui.doneEmoji.textContent = recipe.emoji;
    ui.doneTitle.textContent = `${recipe.name} is ready!`;
    ui.doneText.textContent = "Great work. Every step is complete and your dish is ready to serve.";
    if (state.recipeBackStack.length) {
      const parentId = state.recipeBackStack[state.recipeBackStack.length - 1];
      const parent = state.recipes.find((r) => r.id === parentId);
      ui.cookAgainBtn.textContent = parent ? `Back to ${parent.name}` : "Back to parent recipe";
      ui.doneBackBtn?.setAttribute("hidden", "hidden");
    } else {
      ui.cookAgainBtn.textContent = "Cook again";
      ui.doneBackBtn?.removeAttribute("hidden");
    }
    markLinkedOrderPrepared();
    navigateTo("done");
  }

  function returnToRecipeContext() {
    if (state.recipeBackStack.length) {
      const parentId = state.recipeBackStack.pop();
      openRecipeOverview(parentId, { keepStack: true });
      return;
    }

    if (state.selectedRecipe) {
      openRecipeOverview(state.selectedRecipe.id);
      return;
    }

    openChefRecipesWorkspace();
  }

  function attachEvents() {
    ui.searchInput.addEventListener("input", (event) => {
      state.search = event.target.value || "";
      renderRecipeCards();
    });

    ui.catFoodTab?.addEventListener("click", () => setCategory("food"));
    ui.catDrinksTab?.addEventListener("click", () => setCategory("drinks"));
    ui.catMasterTab?.addEventListener("click", () => setCategory("component"));
    ui.drinkSubtabs?.querySelectorAll(".cat-subtab").forEach((button) => {
      button.addEventListener("click", () => setDrinkType(button.getAttribute("data-drink")));
    });

    ui.homeBtn.addEventListener("click", () => {
      openChefRecipesWorkspace();
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

      setImportStatus("Paste JSON/CSV or upload a supported file before importing.", "error");
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

    ui.saveGateBtn?.addEventListener("click", saveLocalGate);
    ui.disableGateBtn?.addEventListener("click", disableLocalGate);
    ui.loginSubmitBtn?.addEventListener("click", submitLocalGateLogin);
    ui.openDashboardBtn?.addEventListener("click", openManagerDashboard);
    ui.managerLoginSubmitBtn?.addEventListener("click", submitManagerLogin);
    ui.managerLogoutBtn?.addEventListener("click", managerLogout);
    ui.openRecipesWorkspaceBtn?.addEventListener("click", openChefRecipesWorkspace);
    ui.openMenusWorkspaceBtn?.addEventListener("click", openMenusWorkspace);
    ui.openOrderingWorkspaceBtn?.addEventListener("click", openOrderingWorkspace);
    ui.openDashboardWorkspaceBtn?.addEventListener("click", openManagerDashboard);
    ui.addOrderBtn?.addEventListener("click", addOrderToQueue);
    ui.clearOrdersBtn?.addEventListener("click", clearOrderQueue);
    ui.clearPreparedOrdersBtn?.addEventListener("click", clearPreparedOrders);

    ui.dashboardDateInput?.addEventListener("change", () => {
      if (!state.isManagerAuthorized) return;
      const day = ui.dashboardDateInput.value || getTodayKey();
      ui.dashboardDateInput.value = day;
      renderDashboard(day);
    });

    ui.exportIngredientTrackerBtn?.addEventListener("click", () => {
      if (!state.isManagerAuthorized) {
        openManagerDashboard();
        return;
      }
      const day = ui.dashboardDateInput.value || getTodayKey();
      exportIngredientTrackerCsv(day);
    });

    ui.exportRecipeViewsBtn?.addEventListener("click", () => {
      if (!state.isManagerAuthorized) {
        openManagerDashboard();
        return;
      }
      const day = ui.dashboardDateInput.value || getTodayKey();
      exportRecipeViewsCsv(day);
    });

    ui.ovBackBtn?.addEventListener("click", () => {
      if (state.recipeBackStack.length) {
        const parentId = state.recipeBackStack.pop();
        openRecipeOverview(parentId, { keepStack: true });
      } else {
        openChefRecipesWorkspace();
      }
    });

    ui.startCookBtn.addEventListener("click", openCookView);
    ui.confirmBtn.addEventListener("click", confirmCurrentStep);
    ui.prevBtn.addEventListener("click", goToPreviousStep);

    ui.cookAgainBtn.addEventListener("click", () => {
      returnToRecipeContext();
    });

    ui.doneBackBtn?.addEventListener("click", () => {
      returnToRecipeContext();
    });

    document.querySelectorAll("[data-nav]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-nav");
        if (!target) return;

        if (target === "landing") {
          navigateTo("landing");
          return;
        }

        if (target === "home") {
          openChefRecipesWorkspace();
          return;
        }

        if (target === "overview" && state.selectedRecipe) {
          navigateTo("overview");
          return;
        }

        if (target === "dashboard") {
          openManagerDashboard();
          return;
        }
      });
    });

    subscribe("orders:changed", () => {
      renderOrderQueue();
      renderChefQueueList();
      renderPreparedOrders();
      renderRecipeCards();
    });

    window.addEventListener("storage", (event) => {
      if (!event || !event.key) return;
      if (event.key === ORDER_QUEUE_STORAGE_KEY || event.key === PREPARED_ORDERS_STORAGE_KEY) {
        syncOrdersFromStorage();
      }
    });
  }

  function init() {
    state.importedRecipes = loadImportedRecipes();
    state.gateConfig = loadGateConfig();
    state.managerGateConfig = loadManagerGateConfig();
    state.metricsLedger = loadMetricsLedger();
    if (state.metricsLedger.length) {
      rebuildAggregatesFromLedger();
    } else {
      state.ingredientTracker = loadIngredientTracker();
      state.recipeViewsByDay = loadRecipeViewsByDay();
      state.recipeRunsByDay = loadRecipeRunsByDay();
    }
    state.orderQueue = loadOrderQueue();
    state.preparedOrders = loadPreparedOrders();
    state.isManagerAuthorized = isManagerSessionValid(state.managerGateConfig);
    mergeRecipes();

    if (!state.recipes.length) {
      ui.recipeGrid.innerHTML = "";
      ui.noResults.hidden = false;
      ui.noResults.textContent = "No recipes are available yet. Import recipes to begin.";
      return;
    }

    attachEvents();

    if (!isLocalRuntime() && ui.saveGateBtn && ui.disableGateBtn) {
      ui.saveGateBtn.disabled = true;
      ui.disableGateBtn.disabled = true;
      setGateStatus("Local login gate controls are disabled outside localhost/file:// runtime.", "error");
    } else if (state.gateConfig) {
      ui.gateUsernameInput.value = state.gateConfig.username;
      setGateStatus("Local gate is enabled. Default admin is seeded for local testing.", "success");
    } else {
      setGateStatus("Local gate is currently disabled.", null);
    }

    if (ui.dashboardDateInput) {
      ui.dashboardDateInput.value = getTodayKey();
    }

    renderOrderRecipeOptions();
    renderOrderQueue();
    renderPreparedOrders();

    state.isAuthorized = !state.gateConfig || isGateSessionValid(state.gateConfig);
    renderRecipeCards();

    function resolveRoute() {
      const hasRouter = window.AppRouter && typeof window.AppRouter.viewFromHash === "function";
      const routeView = hasRouter ? window.AppRouter.viewFromHash(window.location.hash) : "landing";

      if (routeView === "home") {
        openChefRecipesWorkspace();
        return;
      }

      if (routeView === "overview" || routeView === "cook" || routeView === "done") {
        
        
        if (state.selectedRecipe) {
          setActiveView(routeView);
        } else {
          openChefRecipesWorkspace();
        }
        return;
      }

      if (routeView === "menus") {
        openMenusWorkspace();
        return;
      }

      if (routeView === "ordering") {
        openOrderingWorkspace();
        return;
      }

      if (routeView === "dashboard") {
        openManagerDashboard();
        return;
      }

      navigateTo("landing");
    }

    window.addEventListener("hashchange", resolveRoute);
    resolveRoute();
  }

  init();
  }

  window.SoulCafeCore = {
    initializeSoulCafeApp,
  };
})();
