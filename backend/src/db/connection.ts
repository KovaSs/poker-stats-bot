import Database from "better-sqlite3";
import path from "path";

import { logger } from "../config/logger";

let db: Database.Database;

export function initDB(): Database.Database {
  const dbPath = path.join(__dirname, "../../../data/stats.db");
  db = new Database(dbPath);
  logger.info("[DB] База данных инициализирована");

  // Таблица games
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      message_id INTEGER,
      game_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица transactions
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER,
      username TEXT,
      amount INTEGER,
      type TEXT CHECK(type IN ('in', 'out')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(game_id) REFERENCES games(id)
    )
  `);

  // Таблица users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      telegram_id INTEGER,
      total_in INTEGER DEFAULT 0,
      total_out INTEGER DEFAULT 0,
      games_count INTEGER DEFAULT 0,
      game_ids TEXT DEFAULT '[]'
    )
  `);

  // Миграция старой таблицы user_stats (если есть)
  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='user_stats'`,
    )
    .get();
  if (tableExists) {
    logger.info(
      "[DB] Обнаружена старая таблица user_stats, выполняем миграцию...",
    );
    db.exec(`
      INSERT OR IGNORE INTO users (username, total_in, total_out)
      SELECT username, total_in, total_out FROM user_stats
    `);
    db.exec(`DROP TABLE user_stats`);
    logger.info("[DB] Миграция завершена");
  }

  return db;
}

export function getDB(): Database.Database {
  if (!db) throw new Error("DB not initialized");
  return db;
}
