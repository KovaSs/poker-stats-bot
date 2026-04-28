import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";

import { runMigrations } from "./migrator";

let db: Database.Database;

function getDatabasePath(): string {
  if (process.env.DB_PATH) return process.env.DB_PATH;
  if (process.env.NODE_ENV === "production") {
    return path.join("/app", "data", "stats.db");
  }
  // Разработка: от packages/backend поднимаемся на два уровня до корня
  return path.resolve(process.cwd(), "../../data/stats.db");
}

export function initDB(): Database.Database {
  const dbPath = getDatabasePath();
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.info(`[DB] Создана директория: ${dir}`);
  }
  db = new Database(dbPath);
  logger.info(`[DB] База данных инициализирована: ${dbPath}`);

  // Применяем миграции (они безопасны, так как проверяют существование таблиц)
  runMigrations(db);

  return db;
}

export function getDB(): Database.Database {
  if (!db) throw new Error("DB not initialized");
  return db;
}
