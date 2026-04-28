import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface TransactionRow {
  type: "in" | "out";
  created_at: string;
  username: string;
  game_id: number;
  amount: number;
  id: number;
}

export const TransactionRepository = {
  getFilteredStats(
    chatId: number,
    filter?: { year?: string; sinceDate?: string },
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
      WHERE g.chat_id = ?
    `;
    const params: (string | number)[] = [chatId];

    if (filter?.year) {
      sql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY (total_out - total_in) DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as {
      games_count: number;
      total_out: number;
      username: string;
      total_in: number;
    }[];
    logger.info(`[DB] getFilteredStats: получено ${rows.length} записей`);
    return rows;
  },

  getFilteredScores(
    chatId: number,
    filter?: { year?: string; sinceDate?: string },
  ): { username: string; score: number }[] {
    let sql = `
      SELECT
        t.username,
        (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      WHERE g.chat_id = ?
    `;
    const params: (string | number)[] = [chatId];

    if (filter?.year) {
      sql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY score DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as {
      username: string;
      score: number;
    }[];
    logger.info(`[DB] getFilteredScores: получено ${rows.length} записей`);
    return rows;
  },

  getGroupedByUsernameAndGame(): {
    username: string;
    game_id: number;
    total_in: number;
    total_out: number;
  }[] {
    const stmt = getDB().prepare(`
      SELECT username, game_id,
            SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END) as total_in,
            SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END) as total_out
      FROM transactions
      GROUP BY username, game_id
    `);
    return stmt.all() as {
      total_out: number;
      username: string;
      total_in: number;
      game_id: number;
    }[];
  },

  add(
    gameId: number,
    username: string,
    amount: number,
    type: "in" | "out",
  ): number {
    const stmt = getDB().prepare(
      `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
    );
    const info = stmt.run(gameId, username, amount, type);
    logger.info(
      `[DB] addTransaction: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
    );
    return Number(info.lastInsertRowid);
  },

  getDistinctYears(chatId: number): string[] {
    const stmt = getDB().prepare(`
      SELECT DISTINCT strftime('%Y', game_date) as year
      FROM games
      WHERE chat_id = ? AND game_date IS NOT NULL
      ORDER BY year DESC
    `);
    const rows = stmt.all(chatId) as { year: string }[];
    return rows.map((row) => row.year);
  },
  deleteByGameId(gameId: number): number {
    const stmt = getDB().prepare(`DELETE FROM transactions WHERE game_id = ?`);
    const info = stmt.run(gameId);
    logger.info(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
    return info.changes;
  },
};
