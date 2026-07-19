import { Database } from "better-sqlite3";

export interface Migration {
  up: (db: Database) => void;
  name: string;
}

export const migrations: Migration[] = [
  {
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
    name: "001_initial_schema",
  },
  {
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
    name: "002_migrate_user_stats",
  },
  {
    up: (db: Database) => {
      const columnExists = db
        .prepare(
          `SELECT name FROM pragma_table_info('games') WHERE name = 'platform'`,
        )
        .get();
      if (!columnExists) {
        db.exec(
          `ALTER TABLE games ADD COLUMN platform TEXT DEFAULT 'telegram'`,
        );
      }
    },
    name: "003_add_platform_to_games",
  },
  {
    up: (db: Database) => {
      for (const col of ["vk_wall_post_id", "vk_wall_owner_id"]) {
        const exists = db
          .prepare(
            `SELECT name FROM pragma_table_info('games') WHERE name = ?`,
          )
          .get(col);
        if (!exists) {
          db.exec(`ALTER TABLE games ADD COLUMN ${col} INTEGER DEFAULT NULL`);
        }
      }
    },
    name: "004_add_vk_wall_post_fields",
  },
  {
    up: (db: Database) => {
      const exists = db
        .prepare(
          `SELECT name FROM pragma_table_info('games') WHERE name = ?`,
        )
        .get("community_message_id");
      if (!exists) {
        db.exec(
          `ALTER TABLE games ADD COLUMN community_message_id INTEGER DEFAULT NULL`,
        );
      }
    },
    name: "005_add_community_message_id",
  },
  {
    up: (db: Database) => {
      const tgColExists = db
        .prepare(`SELECT name FROM pragma_table_info('games') WHERE name = ?`)
        .get("telegram_bot_message_id");
      if (!tgColExists) {
        db.exec(
          `ALTER TABLE games ADD COLUMN telegram_bot_message_id INTEGER DEFAULT NULL`,
        );
      }
    },
    name: "006_add_telegram_bot_message_id",
  },
  {
    up: (db: Database) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS global_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          vk_id INTEGER UNIQUE,
          telegram_id INTEGER UNIQUE,
          email TEXT UNIQUE,
          role TEXT NOT NULL DEFAULT 'user' CHECK(role IN ('admin', 'user')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      db.exec(`
        CREATE TABLE IF NOT EXISTS user_identities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          global_user_id INTEGER NOT NULL REFERENCES global_users(id) ON DELETE CASCADE,
          platform TEXT NOT NULL,
          chat_id INTEGER NOT NULL,
          username TEXT NOT NULL,
          platform_user_id TEXT,
          UNIQUE(platform, chat_id, username)
        )
      `);

      db.exec(`CREATE INDEX IF NOT EXISTS idx_global_users_vk_id ON global_users(vk_id)`);
      db.exec(`CREATE INDEX IF NOT EXISTS idx_global_users_telegram_id ON global_users(telegram_id)`);
      db.exec(`CREATE INDEX IF NOT EXISTS idx_user_identities_lookup ON user_identities(platform, chat_id, username)`);
      db.exec(`CREATE INDEX IF NOT EXISTS idx_user_identities_global_user ON user_identities(global_user_id)`);
    },
    name: "007_add_global_users_and_identities",
  },
  {
    up: (db: Database) => {
      const identities = db.prepare(`
        SELECT DISTINCT t.username, g.chat_id, COALESCE(g.platform, 'telegram') as platform
        FROM transactions t
        JOIN games g ON t.game_id = g.id
      `).all() as { username: string; chat_id: number; platform: string }[];

      const insertUser = db.prepare(`
        INSERT OR IGNORE INTO global_users (role) VALUES ('user')
      `);

      const insertIdentity = db.prepare(`
        INSERT OR IGNORE INTO user_identities (global_user_id, platform, chat_id, username)
        VALUES (?, ?, ?, ?)
      `);

      const insertMany = db.transaction(() => {
        for (const row of identities) {
          const existing = db.prepare(`
            SELECT gu.id FROM global_users gu
            LEFT JOIN user_identities ui ON ui.global_user_id = gu.id
            WHERE ui.platform = ? AND ui.chat_id = ? AND ui.username = ?
            LIMIT 1
          `).get(row.platform, row.chat_id, row.username) as { id: number } | undefined;

          if (!existing) {
            const info = insertUser.run();
            const newId = Number(info.lastInsertRowid);
            insertIdentity.run(newId, row.platform, row.chat_id, row.username);
          }
        }
      });

      insertMany();
    },
    name: "008_migrate_existing_users",
  },
  {
    up: (db: Database) => {
      const globalUsersExists = db
        .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='global_users'`)
        .get();
      const usersExists = db
        .prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`)
        .get();

      if (globalUsersExists && usersExists) {
        db.exec(`DROP TABLE IF EXISTS users`);
      }
    },
    name: "009_drop_old_users_table",
  },
  {
    up: (db: Database) => {
      const exists = db
        .prepare(`SELECT name FROM pragma_table_info('global_users') WHERE name = ?`)
        .get("name");
      if (!exists) {
        db.exec(`ALTER TABLE global_users ADD COLUMN name TEXT DEFAULT NULL`);
      }
    },
    name: "010_add_name_to_global_users",
  },
];
