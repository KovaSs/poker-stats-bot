import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";
import { runMigrations } from "./migrator";

let db: Database.Database;

export function initDB(): Database.Database {
  // Используем абсолютный путь внутри контейнера
  const dbPath = path.join("/app", "data", "stats.db");
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.info(`[DB] Создана директория: ${dir}`);
  }
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
