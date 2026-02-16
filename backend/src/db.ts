import Database from "better-sqlite3";

let db: Database.Database;

interface UserRow {
  username: string;
  telegram_id: number | null;
  total_in: number;
  total_out: number;
  games_count: number;
  game_ids: string;
}

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
  console.log("[DB] Таблица users создана");

  // Миграция: если существовала таблица user_stats, переносим данные
  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='user_stats'`,
    )
    .get();
  if (tableExists) {
    console.log(
      "[DB] Обнаружена старая таблица user_stats, выполняем миграцию...",
    );
    db.exec(`
      INSERT OR IGNORE INTO users (username, total_in, total_out)
      SELECT username, total_in, total_out FROM user_stats
    `);
    db.exec(`DROP TABLE user_stats`);
    console.log("[DB] Миграция завершена, таблица user_stats удалена");
  }

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

export function getGameIdByChatAndMessage(
  chatId: number,
  messageId: number,
): number | null {
  const stmt = db.prepare(
    `SELECT id FROM games WHERE chat_id = ? AND message_id = ?`,
  );
  const row = stmt.get(chatId, messageId) as { id: number } | undefined;
  if (row) {
    console.log(
      `[DB] Найдена игра ID ${row.id} для чата ${chatId}, сообщения ${messageId}`,
    );
    return row.id;
  }
  console.log(
    `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена`,
  );
  return null;
}

export function updateGameDate(gameId: number, gameDate: string): void {
  const stmt = db.prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
  stmt.run(gameDate, gameId);
  console.log(`[DB] Дата игры ${gameId} обновлена на ${gameDate}`);
}

export function deleteTransactionsByGameId(gameId: number): void {
  const stmt = db.prepare(`DELETE FROM transactions WHERE game_id = ?`);
  const info = stmt.run(gameId);
  console.log(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
}

export function deleteGameAndTransactions(
  chatId: number,
  messageId: number,
): boolean {
  const gameId = getGameIdByChatAndMessage(chatId, messageId);
  if (!gameId) {
    console.log(
      `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена, удалять нечего`,
    );
    return false;
  }

  deleteTransactionsByGameId(gameId);

  const stmt = db.prepare(`DELETE FROM games WHERE id = ?`);
  const info = stmt.run(gameId);
  console.log(
    `[DB] Удалена игра ID ${gameId}, изменено строк: ${info.changes}`,
  );
  return true;
}

export function addTransaction(
  gameId: number,
  username: string,
  amount: number,
  type: "in" | "out",
  telegramId?: number | null,
): void {
  const stmt = db.prepare(
    `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
  );
  const info = stmt.run(gameId, username, amount, type);
  console.log(
    `[DB] addTransaction успешно: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
  );

  // Обновляем или создаём запись в users
  let user: UserRow | undefined;
  if (telegramId) {
    user = db
      .prepare(`SELECT * FROM users WHERE telegram_id = ?`)
      .get(telegramId) as UserRow | undefined;
  }
  if (!user) {
    user = db
      .prepare(`SELECT * FROM users WHERE username = ?`)
      .get(username) as UserRow | undefined;
  }

  const currentGameIds = user ? JSON.parse(user.game_ids) : [];
  if (!currentGameIds.includes(gameId)) {
    currentGameIds.push(gameId);
  }

  const newTotalIn = (user ? user.total_in : 0) + (type === "in" ? amount : 0);
  const newTotalOut =
    (user ? user.total_out : 0) + (type === "out" ? amount : 0);
  const newGamesCount = user ? currentGameIds.length : 1;

  if (user) {
    const updateStmt = db.prepare(`
      UPDATE users
      SET total_in = ?, total_out = ?, games_count = ?, game_ids = ?
      WHERE username = ?
    `);
    updateStmt.run(
      newTotalIn,
      newTotalOut,
      newGamesCount,
      JSON.stringify(currentGameIds),
      user.username,
    );
    console.log(`[DB] Обновлён пользователь ${user.username}`);
  } else {
    const insertStmt = db.prepare(`
      INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertStmt.run(
      username,
      telegramId || null,
      newTotalIn,
      newTotalOut,
      newGamesCount,
      JSON.stringify(currentGameIds),
    );
    console.log(`[DB] Создан новый пользователь ${username}`);
  }
}

export function recalcStats(): void {
  console.log("[DB] recalcStats начат");

  // Сначала очистим users
  db.prepare(`DELETE FROM users`).run();

  // Собираем все транзакции и группируем по username
  const rows = db
    .prepare(
      `
    SELECT username, game_id,
           SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END) as total_in,
           SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END) as total_out
    FROM transactions
    GROUP BY username, game_id
  `,
    )
    .all() as any[];

  // Агрегируем по пользователям
  const userMap = new Map<
    string,
    { total_in: number; total_out: number; games: Set<number> }
  >();
  for (const row of rows) {
    const key = row.username;
    if (!userMap.has(key)) {
      userMap.set(key, { total_in: 0, total_out: 0, games: new Set() });
    }
    const user = userMap.get(key)!;
    user.total_in += row.total_in;
    user.total_out += row.total_out;
    user.games.add(row.game_id);
  }

  // Вставляем агрегированные данные в users
  const insertStmt = db.prepare(`
    INSERT INTO users (username, total_in, total_out, games_count, game_ids)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const [username, data] of userMap.entries()) {
    const gameIds = Array.from(data.games);
    insertStmt.run(
      username,
      data.total_in,
      data.total_out,
      gameIds.length,
      JSON.stringify(gameIds),
    );
  }

  console.log(
    `[DB] recalcStats завершён, обработано пользователей: ${userMap.size}`,
  );
}

export function getFilteredStats(
  filter?: string | "all",
): {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}[] {
  let sql = `
    SELECT
      t.username,
      COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0) as total_in,
      COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) as total_out,
      COUNT(DISTINCT t.game_id) as games_count
    FROM transactions t
    JOIN games g ON t.game_id = g.id
  `;
  const params: any[] = [];

  if (filter === "all") {
    // без фильтрации по дате
  } else if (filter && /^\d{4}$/.test(filter)) {
    sql += ` WHERE g.game_date LIKE ?`;
    params.push(`${filter}%`);
  } else if (!filter) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().slice(0, 10);
    sql += ` WHERE g.game_date >= ?`;
    params.push(dateStr);
  } else {
    console.log(
      `[DB] getFilteredStats: неверный фильтр "${filter}", используем без фильтрации`,
    );
  }

  sql += ` GROUP BY t.username ORDER BY (total_out - total_in) DESC`;

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as any[];
  console.log(
    `[DB] getFilteredStats: получено ${rows.length} записей, фильтр: ${filter || "last year"}`,
  );
  return rows;
}

export function getFilteredScores(
  filter?: string | "all",
): { username: string; score: number }[] {
  let sql = `
    SELECT
      t.username,
      (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
    FROM transactions t
    JOIN games g ON t.game_id = g.id
  `;
  const params: any[] = [];

  if (filter === "all") {
    // без фильтрации
  } else if (filter && /^\d{4}$/.test(filter)) {
    sql += ` WHERE g.game_date LIKE ?`;
    params.push(`${filter}%`);
  } else if (!filter) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().slice(0, 10);
    sql += ` WHERE g.game_date >= ?`;
    params.push(dateStr);
  } else {
    console.log(
      `[DB] getFilteredScores: неверный фильтр "${filter}", используем без фильтрации`,
    );
  }

  sql += ` GROUP BY t.username ORDER BY score DESC`;

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as any[];
  console.log(
    `[DB] getFilteredScores: получено ${rows.length} записей, фильтр: ${filter || "last year"}`,
  );
  return rows;
}

// Старые функции для совместимости
export function getAllStats(): {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}[] {
  return getFilteredStats();
}

export function getAllScores(): { username: string; score: number }[] {
  return getFilteredScores();
}
