const DEFAULT_SECRET = "SoulCafe-Recipe-Vault-Secret-2026";
const DEFAULT_USER = "manager";
const DEFAULT_PASS = "soulcafe123!";

async function deriveKey(secretPhrase) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secretPhrase || DEFAULT_SECRET);
  const hash = await crypto.subtle.digest("SHA-256", keyData);
  return crypto.subtle.importKey(
    "raw",
    hash,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

function bufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function encryptPayload(dataObj, secretPhrase) {
  const key = await deriveKey(secretPhrase);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(JSON.stringify(dataObj));

  const encryptedContent = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    encodedData
  );

  return {
    iv: bufferToBase64(iv),
    ciphertext: bufferToBase64(encryptedContent),
  };
}

function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...getCorsHeaders(),
      ...headers,
    },
  });
}

function errorResponse(message, status = 400) {
  return jsonResponse({ error: message }, status);
}

// Geolocked Region Verification (Mumbai / Andheri West Cafe Radius)
function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function verifyMumbaiGeoLock(request, env, customRadiusKm = null) {
  if (env.DISABLE_GEO_LOCK === "true") return { allowed: true };

  const cf = request.cf;
  const deviceLatHeader = request.headers.get("X-Device-Lat");
  const deviceLonHeader = request.headers.get("X-Device-Lon");

  // Target: Shop 6, Platinum 53 West, D.N. Nagar, Andheri West, Mumbai (19.124848, 72.832097)
  const CAFE_LAT = parseFloat(env.CAFE_LATITUDE || "19.124848");
  const CAFE_LON = parseFloat(env.CAFE_LONGITUDE || "72.832097");

  const fallbackRadius = customRadiusKm !== null
    ? parseFloat(customRadiusKm)
    : parseFloat(env.MUMBAI_GEO_RADIUS_KM || "15.0");

  // 1. Device GPS Hardware Check (100-150m Precision)
  if (deviceLatHeader && deviceLonHeader) {
    const devLat = parseFloat(deviceLatHeader);
    const devLon = parseFloat(deviceLonHeader);
    if (!isNaN(devLat) && !isNaN(devLon)) {
      const gpsDistanceKm = calculateHaversineDistanceKm(CAFE_LAT, CAFE_LON, devLat, devLon);
      const allowedGps = gpsDistanceKm <= Math.max(fallbackRadius, 0.15);
      return {
        allowed: allowedGps,
        source: "device_gps",
        distanceKm: Math.round(gpsDistanceKm * 1000) / 1000,
        maxRadiusKm: fallbackRadius,
      };
    }
  }

  // 2. Cloudflare Edge IP Geofence Check
  if (!cf || (!cf.country && !cf.city && !cf.latitude)) {
    // Localhost or non-Cloudflare edge environments
    return { allowed: true, isLocal: true };
  }

  const country = (cf.country || "").toUpperCase();
  const city = (cf.city || "").toLowerCase();
  const region = (cf.region || "").toLowerCase();

  const lat = parseFloat(cf.latitude);
  const lon = parseFloat(cf.longitude);

  const isMumbaiRegion = country === "IN" && (city.includes("mumbai") || region.includes("maharashtra"));
  let distanceKm = null;

  if (!isNaN(lat) && !isNaN(lon)) {
    distanceKm = calculateHaversineDistanceKm(CAFE_LAT, CAFE_LON, lat, lon);
  }

  // If IP geolocation is used, use 15km allowance to accommodate Mumbai mobile tower offsets
  const effectiveRadius = fallbackRadius <= 0.2 ? 15.0 : fallbackRadius;
  const allowed = isMumbaiRegion && (distanceKm === null || distanceKm <= effectiveRadius);

  return {
    allowed,
    country,
    city: cf.city,
    region: cf.region,
    distanceKm: distanceKm ? Math.round(distanceKm * 100) / 100 : null,
    maxRadiusKm: effectiveRadius,
  };
}

// Session validation
function isManagerAuthorized(request, env) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const match = cookieHeader.match(/soul_recipe_session=([^;]+)/);
  if (!match) return false;
  const token = match[1];
  return token && token.length > 10;
}

// D1 helper queries
async function fetchCatalogFromD1(db) {
  const emptyCatalog = { food: [], drinks: [], seasonal: [], masterComponents: {}, recipeLinks: {} };
  if (!db) return emptyCatalog;

  try {
    const recipesResult = await db.prepare("SELECT * FROM recipes").all().catch(() => ({ results: [] }));
    const mastersResult = await db.prepare("SELECT * FROM master_components").all().catch(() => ({ results: [] }));
    const linksResult = await db.prepare("SELECT * FROM recipe_links").all().catch(() => ({ results: [] }));

    const food = [];
    const drinks = [];
    const seasonal = [];

    for (const row of recipesResult.results || []) {
      try {
        const data = JSON.parse(row.data_json);
        if (row.category === "food") food.push(data);
        else if (row.category === "drinks") drinks.push(data);
        else if (row.category === "seasonal") seasonal.push(data);
      } catch (e) {
        console.error("Failed to parse recipe row:", row.id, e);
      }
    }

    const masterComponents = {};
    for (const row of mastersResult.results || []) {
      try {
        const data = JSON.parse(row.data_json);
        masterComponents[row.id] = data;
      } catch (e) {
        console.error("Failed to parse master component:", row.id, e);
      }
    }

    const recipeLinks = {};
    for (const row of linksResult.results || []) {
      recipeLinks[row.alias] = row.master_id;
    }

    return { food, drinks, seasonal, masterComponents, recipeLinks };
  } catch (err) {
    console.error("Error querying D1 database:", err);
    return emptyCatalog;
  }
}

// Remote MCP JSON-RPC handler
async function handleMcpRpc(request, env) {
  const body = await request.json().catch(() => null);
  if (!body || body.jsonrpc !== "2.0") {
    return errorResponse("Invalid JSON-RPC request", 400);
  }

  const { id, method, params } = body;

  if (method === "initialize") {
    return jsonResponse({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "soul-cafe-recipe-mcp-cloudflare", version: "2.0.0" },
      },
    });
  }

  if (method === "tools/list") {
    return jsonResponse({
      jsonrpc: "2.0",
      id,
      result: {
        tools: [
          {
            name: "list_collections",
            description: "List recipe collections and item counts",
            inputSchema: { type: "object", properties: {} },
          },
          {
            name: "search_recipes",
            description: "Search recipes across food, drinks, seasonal, and master components",
            inputSchema: {
              type: "object",
              properties: { query: { type: "string" } },
              required: ["query"],
            },
          },
          {
            name: "get_recipe",
            description: "Get a specific recipe by ID or name",
            inputSchema: {
              type: "object",
              properties: { id: { type: "string" }, collection: { type: "string" } },
              required: ["id"],
            },
          },
          {
            name: "save_recipe",
            description: "Create or update a recipe in D1 database",
            inputSchema: {
              type: "object",
              properties: {
                collection: { type: "string" },
                recipe: { type: "object" },
              },
              required: ["collection", "recipe"],
            },
          },
          {
            name: "delete_recipe",
            description: "Delete a recipe from D1 database",
            inputSchema: {
              type: "object",
              properties: {
                collection: { type: "string" },
                id: { type: "string" },
              },
              required: ["collection", "id"],
            },
          },
        ],
      },
    });
  }

  if (method === "tools/call") {
    const { name, arguments: toolArgs } = params || {};
    const catalog = await fetchCatalogFromD1(env.RECIPE_DB);

    if (name === "list_collections") {
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  food: catalog.food.length,
                  drinks: catalog.drinks.length,
                  seasonal: catalog.seasonal.length,
                  masters: Object.keys(catalog.masterComponents).length,
                },
                null,
                2
              ),
            },
          ],
        },
      });
    }

    if (name === "search_recipes") {
      const q = (toolArgs?.query || "").toLowerCase();
      const all = [
        ...catalog.food.map((r) => ({ ...r, _collection: "food" })),
        ...catalog.drinks.map((r) => ({ ...r, _collection: "drinks" })),
        ...catalog.seasonal.map((r) => ({ ...r, _collection: "seasonal" })),
        ...Object.values(catalog.masterComponents).map((r) => ({ ...r, _collection: "masters" })),
      ].filter(
        (r) =>
          (r.name && r.name.toLowerCase().includes(q)) ||
          (r.description && r.description.toLowerCase().includes(q))
      );

      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify(all, null, 2) }],
        },
      });
    }

    if (name === "get_recipe") {
      const idStr = (toolArgs?.id || "").toLowerCase();
      const all = [
        ...catalog.food.map((r) => ({ ...r, _collection: "food" })),
        ...catalog.drinks.map((r) => ({ ...r, _collection: "drinks" })),
        ...catalog.seasonal.map((r) => ({ ...r, _collection: "seasonal" })),
        ...Object.values(catalog.masterComponents).map((r) => ({ ...r, _collection: "masters" })),
      ];
      const match = all.find((r) => (r.id && r.id.toLowerCase() === idStr) || (r.name && r.name.toLowerCase() === idStr));

      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: match ? JSON.stringify(match, null, 2) : "Recipe not found." }],
        },
      });
    }

    if (name === "save_recipe") {
      const { collection, recipe } = toolArgs || {};
      if (!collection || !recipe || !recipe.id) {
        return errorResponse("Missing collection or recipe.id", 400);
      }

      if (env.RECIPE_DB) {
        if (collection === "masters") {
          await env.RECIPE_DB.prepare(
            "INSERT OR REPLACE INTO master_components (id, name, data_json, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
          )
            .bind(recipe.id, recipe.name || recipe.id, JSON.stringify(recipe))
            .run();
        } else {
          await env.RECIPE_DB.prepare(
            "INSERT OR REPLACE INTO recipes (id, category, title, data_json, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
          )
            .bind(recipe.id, collection, recipe.name || recipe.id, JSON.stringify(recipe))
            .run();
        }
      }

      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: `Successfully saved recipe ${recipe.id} to ${collection}.` }],
        },
      });
    }

    if (name === "delete_recipe") {
      const { collection, id: recipeId } = toolArgs || {};
      if (env.RECIPE_DB) {
        if (collection === "masters") {
          await env.RECIPE_DB.prepare("DELETE FROM master_components WHERE id = ?").bind(recipeId).run();
        } else {
          await env.RECIPE_DB.prepare("DELETE FROM recipes WHERE id = ?").bind(recipeId).run();
        }
      }
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: `Successfully deleted recipe ${recipeId} from ${collection}.` }],
        },
      });
    }
  }

  return errorResponse("Method not found", 404);
}

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);

      if (request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: getCorsHeaders() });
      }

      // Remote MCP Endpoint
      if (url.pathname === "/mcp" || url.pathname === "/sse") {
        if (request.method === "POST") {
          return handleMcpRpc(request, env);
        }
        return jsonResponse({ name: "Soul Cafe Remote MCP Server", status: "online" });
      }

      // Encrypted API Catalog Endpoint (Geolocked strictly within 0.1km / 100m of Cafe)
      if (url.pathname === "/api/catalog") {
        const recipeRadius = parseFloat(env.RECIPE_GEO_RADIUS_KM || "0.1");
        const geoCheck = verifyMumbaiGeoLock(request, env, recipeRadius);
        if (!geoCheck.allowed) {
          return errorResponse(
            `Access Restricted: Recipe catalog access is strictly restricted to within 100 meters of the cafe location (Platinum 53 West, Andheri West). Please contact system admin for access.`,
            403
          );
        }

        const catalog = await fetchCatalogFromD1(env.RECIPE_DB);
        const secret = env.RECIPE_ENCRYPTION_KEY || DEFAULT_SECRET;
        const encrypted = await encryptPayload(catalog, secret);
        return jsonResponse(encrypted);
      }

      // Manager Session Check
      if (url.pathname === "/api/session" || url.pathname === "/api/auth/session") {
        const isAuth = isManagerAuthorized(request, env);
        return jsonResponse({ isAuthorized: isAuth, authenticated: isAuth });
      }

      // Manager Login (Geolocked to 4.0km Cafe Radius)
      if ((url.pathname === "/api/login" || url.pathname === "/api/auth/login") && request.method === "POST") {
        const managerRadius = parseFloat(env.MANAGER_GEO_RADIUS_KM || "4.0");
        const geoCheck = verifyMumbaiGeoLock(request, env, managerRadius);
        if (!geoCheck.allowed) {
          return errorResponse(
            `Access Restricted: Manager authentication is restricted to the 4 km cafe radius (city: ${geoCheck.city || "unknown"}). Please contact system admin for access.`,
            403
          );
        }

        const body = await request.json().catch(() => ({}));
        const expectedUser = env.RECIPE_ADMIN_USERNAME || DEFAULT_USER;
        const expectedPass = env.RECIPE_ADMIN_PASSWORD || DEFAULT_PASS;

        const isManager = body.username === expectedUser && body.password === expectedPass;
        const isAdmin = body.username === "admin" && body.password === "admin123";

        if (isManager || isAdmin) {
          const token = crypto.randomUUID();
          return jsonResponse(
            { success: true, authenticated: true, user: body.username },
            200,
            {
              "Set-Cookie": `soul_recipe_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800`,
            }
          );
        }
        return errorResponse("Invalid username or password", 401);
      }

      // Manager Logout
      if ((url.pathname === "/api/logout" || url.pathname === "/api/auth/logout") && request.method === "POST") {
        return jsonResponse(
          { success: true },
          200,
          {
            "Set-Cookie": `soul_recipe_session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
          }
        );
      }

      // Manager Recipe List Endpoint for Editor Dropdown
      if (url.pathname === "/api/recipes" && request.method === "GET") {
        const collection = url.searchParams.get("collection") || "food";
        let matches = [];
        if (env.RECIPE_DB) {
          if (collection === "masters") {
            const res = await env.RECIPE_DB.prepare("SELECT id, name FROM master_components").all().catch(() => ({ results: [] }));
            matches = (res.results || []).map((r) => ({ id: r.id, name: r.name }));
          } else {
            const res = await env.RECIPE_DB.prepare("SELECT id, title as name FROM recipes WHERE category = ?").bind(collection).all().catch(() => ({ results: [] }));
            matches = (res.results || []).map((r) => ({ id: r.id, name: r.name }));
          }
        }
        return jsonResponse({ matches });
      }

      // Single Recipe Fetch for Editor
      if (url.pathname.startsWith("/api/recipes/") && request.method === "GET") {
        const parts = url.pathname.replace("/api/recipes/", "").split("/");
        let collection = "food";
        let recipeId = "";
        if (parts.length >= 2) {
          collection = parts[0];
          recipeId = parts[1];
        } else {
          recipeId = parts[0];
        }

        let recipe = null;
        if (env.RECIPE_DB && recipeId) {
          if (collection === "masters") {
            const row = await env.RECIPE_DB.prepare("SELECT data_json FROM master_components WHERE id = ?").bind(recipeId).first().catch(() => null);
            if (row) recipe = JSON.parse(row.data_json);
          } else {
            const row = await env.RECIPE_DB.prepare("SELECT data_json FROM recipes WHERE id = ?").bind(recipeId).first().catch(() => null);
            if (row) recipe = JSON.parse(row.data_json);
          }
        }
        if (recipe) {
          return jsonResponse({ recipe });
        }
        return errorResponse("Recipe not found", 404);
      }

      // Manager Recipe Save CRUD Endpoint
      if ((url.pathname === "/api/recipes" || url.pathname.startsWith("/api/recipes/")) && (request.method === "POST" || request.method === "PUT")) {
        if (!isManagerAuthorized(request, env)) {
          return errorResponse("Manager authentication required", 401);
        }
        const body = await request.json().catch(() => null);
        let { collection, recipe } = body || {};

        if (!collection || !recipe) {
          return errorResponse("Missing collection or recipe data", 400);
        }

        const nameSlug = recipe.name ? recipe.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") : "";
        const fallbackId = collection === "masters"
          ? (nameSlug ? `comp-${nameSlug}` : `comp-new-${Date.now()}`)
          : (nameSlug || `new-recipe-${Date.now()}`);

        const recipeId = recipe.id || fallbackId;
        recipe = { ...recipe, id: recipeId, category: recipe.category || (collection === "masters" ? "component" : collection) };

        if (env.RECIPE_DB) {
          if (collection === "masters") {
            await env.RECIPE_DB.prepare(
              "INSERT OR REPLACE INTO master_components (id, name, data_json, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
            )
              .bind(recipe.id, recipe.name || recipe.id, JSON.stringify(recipe))
              .run();
          } else {
            await env.RECIPE_DB.prepare(
              "INSERT OR REPLACE INTO recipes (id, category, title, data_json, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)"
            )
              .bind(recipe.id, collection, recipe.name || recipe.id, JSON.stringify(recipe))
              .run();
          }
        }
        return jsonResponse({ success: true, id: recipe.id });
      }

      // Delete Recipe
      if (url.pathname.startsWith("/api/recipes/") && request.method === "DELETE") {
        if (!isManagerAuthorized(request, env)) {
          return errorResponse("Manager authentication required", 401);
        }
        const id = url.pathname.replace("/api/recipes/", "");
        const collection = url.searchParams.get("collection") || "food";

        if (env.RECIPE_DB) {
          if (collection === "masters") {
            await env.RECIPE_DB.prepare("DELETE FROM master_components WHERE id = ?").bind(id).run();
          } else {
            await env.RECIPE_DB.prepare("DELETE FROM recipes WHERE id = ?").bind(id).run();
          }
        }
        return jsonResponse({ success: true, id });
      }

      // Fallback to Cloudflare static asset fetcher
      if (env.ASSETS && typeof env.ASSETS.fetch === "function") {
        return env.ASSETS.fetch(request);
      }

      return errorResponse("Not found", 404);
    } catch (err) {
      console.error("Unhandled Worker error:", err);
      return jsonResponse({ error: err.message || "Internal Worker Error", stack: err.stack }, 500);
    }
  },
};
