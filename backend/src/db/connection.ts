import Database from "better-sqlite3";
import path from "path";

import { logger } from "@/config/logger";

import { runMigrations } from "./migrator";

let db: Database.Database;

export function initDB(): Database.Database {
  const dbPath = path.join(__dirname, "../../../data/stats.db");
  db = new Database(dbPath);
  logger.info("[DB] База данных инициализирована");

  // Применяем миграции
  runMigrations(db);

  return db;
}

export function getDB(): Database.Database {
  if (!db) throw new Error("DB not initialized");
  return db;
}
