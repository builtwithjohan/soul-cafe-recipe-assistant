import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const ROOT = path.resolve(import.meta.dirname, "..");

async function loadJsFile(filePath, exportNames) {
  const content = await readFile(filePath, "utf8");
  const sandbox = { window: {}, module: { exports: {} } };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(content, sandbox);

  const exports = sandbox.module.exports || {};
  const win = sandbox.window || {};

  for (const name of exportNames) {
    if (exports[name]) return exports[name];
    if (win[name]) return win[name];
    if (sandbox[name]) return sandbox[name];
  }
  return null;
}

function escapeSqlString(str) {
  return String(str || "").replace(/'/g, "''");
}

function slugify(val) {
  return String(val || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  const foodRecipes = await loadJsFile(path.join(ROOT, "src/recipes.js"), ["RECIPES"]);
  const drinkRecipes = await loadJsFile(path.join(ROOT, "src/drinks.js"), ["DRINKS"]);
  const seasonalRecipes = await loadJsFile(path.join(ROOT, "src/seasonal.js"), ["SEASONAL_SPECIALS"]);
  const masterComponents = await loadJsFile(path.join(ROOT, "src/components.js"), ["COMPONENTS", "MASTER"]);
  const recipeLinks = await loadJsFile(path.join(ROOT, "src/components.js"), ["RECIPE_LINKS"]);

  const sqlLines = ["-- Seed data migration for D1 database"];

  // Insert Food recipes
  if (Array.isArray(foodRecipes)) {
    for (const item of foodRecipes) {
      const id = escapeSqlString(item.id || slugify(item.name));
      const title = escapeSqlString(item.name || item.title || id);
      const recipeObj = { ...item, id, category: item.category || "food" };
      const jsonStr = escapeSqlString(JSON.stringify(recipeObj));
      sqlLines.push(`INSERT OR REPLACE INTO recipes (id, category, title, data_json) VALUES ('${id}', 'food', '${title}', '${jsonStr}');`);
    }
  }

  // Insert Drinks recipes
  if (Array.isArray(drinkRecipes)) {
    for (const item of drinkRecipes) {
      const id = escapeSqlString(item.id || slugify(item.name));
      const title = escapeSqlString(item.name || item.title || id);
      const recipeObj = { ...item, id, category: item.category || "drinks" };
      const jsonStr = escapeSqlString(JSON.stringify(recipeObj));
      sqlLines.push(`INSERT OR REPLACE INTO recipes (id, category, title, data_json) VALUES ('${id}', 'drinks', '${title}', '${jsonStr}');`);
    }
  }

  // Insert Seasonal recipes
  if (Array.isArray(seasonalRecipes)) {
    for (const item of seasonalRecipes) {
      const id = escapeSqlString(item.id || slugify(item.name));
      const title = escapeSqlString(item.name || item.title || id);
      const recipeObj = { ...item, id, category: item.category || "seasonal" };
      const jsonStr = escapeSqlString(JSON.stringify(recipeObj));
      sqlLines.push(`INSERT OR REPLACE INTO recipes (id, category, title, data_json) VALUES ('${id}', 'seasonal', '${title}', '${jsonStr}');`);
    }
  }

  // Insert Master components
  let masterItems = [];
  if (masterComponents) {
    if (Array.isArray(masterComponents.recipes)) {
      masterItems = masterComponents.recipes;
    } else if (Array.isArray(masterComponents)) {
      masterItems = masterComponents;
    } else if (typeof masterComponents === "object") {
      masterItems = Object.values(masterComponents);
    }
  }

  for (const item of masterItems) {
    if (!item || typeof item !== "object") continue;
    const id = escapeSqlString(item.id || slugify(item.name));
    const name = escapeSqlString(item.name || id);
    const recipeObj = { ...item, id, category: "component" };
    const jsonStr = escapeSqlString(JSON.stringify(recipeObj));
    sqlLines.push(`INSERT OR REPLACE INTO master_components (id, name, data_json) VALUES ('${id}', '${name}', '${jsonStr}');`);
  }

  // Insert Recipe links
  if (recipeLinks && typeof recipeLinks === "object") {
    for (const [alias, masterId] of Object.entries(recipeLinks)) {
      const escapedAlias = escapeSqlString(alias);
      const escapedMaster = escapeSqlString(masterId);
      sqlLines.push(`INSERT OR REPLACE INTO recipe_links (alias, master_id) VALUES ('${escapedAlias}', '${escapedMaster}');`);
    }
  }

  const outputPath = path.join(ROOT, "migrations/0002_seed_data.sql");
  await writeFile(outputPath, sqlLines.join("\n"), "utf8");
  console.log(`Successfully generated ${outputPath} with ${sqlLines.length - 1} SQL statements.`);
}

main().catch(console.error);
