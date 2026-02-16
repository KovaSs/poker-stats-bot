import Database from "better-sqlite3";

let db: Database.Database;

export function initDB() {
  db = new Database("./data/stats.db");
  console.log("[DB] База данных инициализирована");

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

  // Таблица user_stats
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_stats (
      username TEXT PRIMARY KEY,
      total_in INTEGER DEFAULT 0,
      total_out INTEGER DEFAULT 0
    )
  `);

  console.log("[DB] Все таблицы готовы");
}

export function createGame(
  chatId: number,
  messageId: number | null,
  gameDate?: string,
): number {
  const stmt = db.prepare(
    `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
  );
  const info = stmt.run(chatId, messageId, gameDate || null);
  console.log(
    `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}`,
  );
  return Number(info.lastInsertRowid);
}

export function addTransaction(
  gameId: number,
  username: string,
  amount: number,
  type: "in" | "out",
): void {
  const stmt = db.prepare(
    `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
  );
  const info = stmt.run(gameId, username, amount, type);
  console.log(
    `[DB] addTransaction успешно: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
  );
}

export function recalcStats(): void {
  console.log("[DB] recalcStats начат");
  const count = db
    .prepare(`SELECT COUNT(*) as count FROM transactions`)
    .get() as { count: number };
  console.log(`[DB] Всего записей в transactions: ${count.count}`);

  if (count.count === 0) {
    db.prepare(`DELETE FROM user_stats`).run();
    return;
  }

  db.prepare(`DELETE FROM user_stats`).run();

  const insert = db.prepare(`
    INSERT INTO user_stats (username, total_in, total_out)
    SELECT
      username,
      COALESCE(SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END), 0) as total_in,
      COALESCE(SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END), 0) as total_out
    FROM transactions
    GROUP BY username
  `);
  const info = insert.run();
  console.log(
    `[DB] recalcStats завершён, добавлено записей в user_stats: ${info.changes}`,
  );
}

export function getAllStats(): {
  username: string;
  total_in: number;
  total_out: number;
}[] {
  const rows = db
    .prepare(`SELECT username, total_in, total_out FROM user_stats`)
    .all() as any[];
  rows.sort((a, b) => b.total_out - b.total_in - (a.total_out - a.total_in));
  console.log(`[DB] getAllStats: получено ${rows.length} записей`);
  return rows;
}

export function getAllScores(): { username: string; score: number }[] {
  const rows = db
    .prepare(
      `SELECT username, (total_out - total_in) as score FROM user_stats ORDER BY score DESC`,
    )
    .all() as any[];
  console.log(`[DB] getAllScores: получено ${rows.length} записей`);
  return rows;
}
