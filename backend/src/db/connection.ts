import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";
import { runMigrations } from "./migrator";

let db: Database.Database;

function getDatabasePath(): string {
  if (process.env.NODE_ENV === "production") {
    // В Docker-контейнере база данных находится в /app/data
    return path.join("/app", "data", "stats.db");
  }
  // В режиме разработки используем корневую папку data, расположенную на уровень выше папки backend
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

  runMigrations(db);
  return db;
}

export function getDB(): Database.Database {
  if (!db) throw new Error("DB not initialized");
  return db;
}
