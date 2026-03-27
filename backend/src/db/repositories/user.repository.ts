import { getDB } from "../connection";

export interface UserRow {
  username: string;
  telegram_id: number | null;
  total_in: number;
  total_out: number;
  games_count: number;
  game_ids: string; // JSON array
}

export const UserRepository = {
  findByUsername(username: string): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE username = ?`);
    return stmt.get(username) as UserRow | null;
  },

  findByTelegramId(telegramId: number): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE telegram_id = ?`);
    return stmt.get(telegramId) as UserRow | null;
  },

  upsert(user: Partial<UserRow> & { username: string }): void {
    // Сначала пробуем обновить, если есть, иначе вставляем
    const existing = this.findByUsername(user.username);
    const newGameIds = user.game_ids
      ? user.game_ids
      : existing
        ? existing.game_ids
        : "[]";

    const stmt = getDB().prepare(`
      INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(username) DO UPDATE SET
        telegram_id = COALESCE(excluded.telegram_id, users.telegram_id),
        total_in = excluded.total_in,
        total_out = excluded.total_out,
        games_count = excluded.games_count,
        game_ids = excluded.game_ids
    `);
    stmt.run(
      user.username,
      user.telegram_id || null,
      user.total_in || 0,
      user.total_out || 0,
      user.games_count || 0,
      newGameIds,
    );
    console.log(`[DB] Upsert пользователя ${user.username}`);
  },

  clear(): void {
    getDB().prepare(`DELETE FROM users`).run();
  },

  insertMany(
    users: {
      username: string;
      total_in: number;
      total_out: number;
      games_count: number;
      game_ids: string;
    }[],
  ): void {
    const stmt = getDB().prepare(`
      INSERT INTO users (username, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?)
    `);
    const insert = getDB().transaction((users) => {
      for (const u of users) {
        stmt.run(
          u.username,
          u.total_in,
          u.total_out,
          u.games_count,
          u.game_ids,
        );
      }
    });
    insert(users);
    console.log(`[DB] Вставлено ${users.length} пользователей`);
  },
};
