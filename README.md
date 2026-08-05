# Soul Cafe Cook Guide

A lightweight guided-cooking web app that helps you pick a recipe and complete it step by step.

## Features

- Recipe list with search
- Recipe overview with ingredients and metadata
- Guided cooking mode with progress tracking
- JSON recipe import support
- Downloadable recipe template support
- Local MCP server for recipe editing and recipe-link management
- Authenticated manager recipe editor backed by persistent source files

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Node.js recipe service
- Model Context Protocol SDK

## Project Structure

- `index.html`: Main single-page application shell
- `src/styles.css`: Application and manager editor styling
- `src/modules/core/app-core.js`: Browser state, workflows, dashboard, and API client
- `src/recipes.js`: Live food recipe source
- `src/drinks.js`: Drink recipe source
- `src/seasonal.js`: Seasonal recipe source
- `src/components.js`: Raw master recipes, browser components, and child/master links
- `mcp/recipe-store.js`: Shared file-backed recipe repository
- `mcp/server.js`: Stdio MCP adapter for AI clients
- `mcp/http-server.js`: Authenticated HTTP API and static web server

## MCP Server

The `mcp/` folder contains a local Model Context Protocol server that can:

- list recipe collections
- search recipes
- read a recipe by id or name
- create or update recipes in food, drinks, seasonal, and master collections
- delete recipes
- manage child-to-master recipe links used by the app

To run it locally:

1. Open a terminal in `mcp/`.
2. Install dependencies once with `npm install`.
3. Start the server with `npm start`.

The MCP server and web API edit the same source files. Updates made from either interface are therefore visible to both after the app refreshes its catalog.

### Connect in VS Code / Copilot Chat

This repo includes a workspace MCP config at `.vscode/mcp.json`.

1. Keep dependencies installed in `mcp/`.
2. Open this workspace in VS Code.
3. Ensure MCP servers are enabled in Copilot Chat.
4. Reload the VS Code window if the server does not appear immediately.

Configured server name: `soul-cafe-recipe-mcp`.

## Run Locally

Use the Node web service when you want the application to read and update persistent recipes:

1. In `mcp/`, install dependencies once with `npm install`.
2. Copy `.env.example` settings into `.env` if `.env` does not already exist.
3. Set a strong `RECIPE_ADMIN_PASSWORD`. Keep `.env` private.
4. Run `npm run web` from `mcp/`.
5. Open `http://localhost:8787`.
6. Open the Manager Dashboard and sign in with `RECIPE_ADMIN_USERNAME` and `RECIPE_ADMIN_PASSWORD`.

The web service provides:

- `GET /api/catalog` for the browser recipe catalog
- server-authenticated recipe CRUD for food, drinks, seasonal recipes, and raw masters
- child ingredient alias to master recipe linking
- an HttpOnly, same-site manager session cookie
- static delivery of the application from the same origin

Opening `index.html` directly or using a separate static server still displays bundled recipes, but persistent manager editing is unavailable because the `/api` service is not present.

### Manager Editor

The Manager Dashboard includes a **Recipe Source Editor**:

1. Choose `Food`, `Drinks`, `Seasonal`, or `Master Recipes`.
2. Select an existing recipe or choose **New Recipe**.
3. Edit the JSON and save. The JSON shape follows the selected source collection.
4. Use the link controls to connect an ingredient alias such as `pesto sauce` to a master recipe such as `Pesto`.

Deletes require browser confirmation. The server independently checks the manager session on every write; browser state alone cannot authorize a source-file change.

## Cloudflare Native Deployment & DevTools Recipe Security

This version supports **Cloudflare Workers** with **Cloudflare D1** (Serverless SQLite at the edge) and **AES-256-GCM DevTools payload obfuscation**.

### Features

1. **Recipe DevTools Obfuscation**:
   - Plain text static JS recipe files (`src/recipes.js`, `src/drinks.js`, etc.) are **not** downloaded directly by the browser.
   - The Cloudflare Worker encrypts `/api/catalog` responses using **AES-256-GCM**.
   - Opening browser **DevTools → Network** or **Sources** shows only scrambled ciphertext (Base64).
   - `src/crypto-helper.js` decrypts the payload in volatile browser memory on startup.

2. **Persistent D1 Database**:
   - Manager recipe edits and additions persist directly to Cloudflare D1 database bindings (`RECIPE_DB`).

3. **Remote MCP Server (`/mcp`)**:
   - AI tools (Copilot, Cursor, Claude Desktop) connect via Remote HTTP/SSE MCP at `https://<your-worker>.workers.dev/mcp`.

### Cloudflare Deployment Steps

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Create Cloudflare D1 Database:
   ```bash
   wrangler d1 create soul_cafe_recipes
   ```
   Update the `database_id` in `wrangler.toml`.

3. Run D1 Schema & Seed Migrations:
   ```bash
   wrangler d1 execute soul_cafe_recipes --file=migrations/0001_init.sql
   wrangler d1 execute soul_cafe_recipes --file=migrations/0002_seed_data.sql
   ```

4. Deploy to Cloudflare Workers:
   ```bash
   wrangler deploy
   ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
