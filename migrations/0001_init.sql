-- Initial D1 database schema for Soul Cafe Recipe Assistant

CREATE TABLE IF NOT EXISTS recipes (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL, -- 'food', 'drinks', 'seasonal'
  title TEXT NOT NULL,
  data_json TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS master_components (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  data_json TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recipe_links (
  alias TEXT PRIMARY KEY,
  master_id TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
