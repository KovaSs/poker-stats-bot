import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";
import { runMigrations } from "./migrator";

let db: Database.Database;

function getDatabasePath(): string {
  // Если путь явно передан через окружение – используем его
  if (process.env.DB_PATH) {
    return process.env.DB_PATH;
  }

  // В production (Docker) используем /app/data/stats.db
  if (process.env.NODE_ENV === "production") {
    return path.join("/app", "data", "stats.db");
  }

  // В разработке – папка data на уровень выше backend
  return path.join(process.cwd(), "..", "data", "stats.db");
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
