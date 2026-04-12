import { Database } from "better-sqlite3";

export interface Migration {
  name: string;
  up: (db: Database) => void;
}

export const migrations: Migration[] = [
  {
    name: "001_initial_schema",
    up: (db: Database) => {
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
          FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE
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

      // Индексы
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_transactions_game_id ON transactions(game_id);
        CREATE INDEX IF NOT EXISTS idx_games_game_date ON games(game_date);
      `);
    },
  },
  {
    name: "002_migrate_user_stats",
    up: (db: Database) => {
      // Проверяем существование старой таблицы user_stats
      const tableExists = db
        .prepare(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='user_stats'`,
        )
        .get();
      if (tableExists) {
        db.exec(`
          INSERT OR IGNORE INTO users (username, total_in, total_out)
          SELECT username, total_in, total_out FROM user_stats
        `);
        db.exec(`DROP TABLE user_stats`);
      }
    },
  },
];
