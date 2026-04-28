import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface UserRow {
  telegram_id: number | null;
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
  game_ids: string; // JSON array
}

export const UserRepository = {
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
    logger.info(`[DB] Upsert пользователя ${user.username}`);
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
    logger.info(`[DB] Вставлено ${users.length} пользователей`);
  },

  findByTelegramId(telegramId: number): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE telegram_id = ?`);
    const row = stmt.get(telegramId) as UserRow | undefined;
    return row || null;
  },

  findByUsername(username: string): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE username = ?`);
    const row = stmt.get(username) as UserRow | undefined;
    return row || null;
  },

  clear(): void {
    getDB().prepare(`DELETE FROM users`).run();
  },
};
