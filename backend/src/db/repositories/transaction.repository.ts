import { getDB } from "../connection";

export interface TransactionRow {
  id: number;
  game_id: number;
  username: string;
  amount: number;
  type: "in" | "out";
  created_at: string;
}

export const TransactionRepository = {
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
    console.log(
      `[DB] addTransaction: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
    );
    return Number(info.lastInsertRowid);
  },

  deleteByGameId(gameId: number): number {
    const stmt = getDB().prepare(`DELETE FROM transactions WHERE game_id = ?`);
    const info = stmt.run(gameId);
    console.log(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
    return info.changes;
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
    return stmt.all() as any[];
  },

  getFilteredStats(filter?: { year?: string; sinceDate?: string }): {
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

    if (filter?.year) {
      sql += ` WHERE g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` WHERE g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY (total_out - total_in) DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as any[];
    console.log(`[DB] getFilteredStats: получено ${rows.length} записей`);
    return rows;
  },

  getFilteredScores(filter?: {
    year?: string;
    sinceDate?: string;
  }): { username: string; score: number }[] {
    let sql = `
      SELECT
        t.username,
        (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
         COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
      FROM transactions t
      JOIN games g ON t.game_id = g.id
    `;
    const params: any[] = [];

    if (filter?.year) {
      sql += ` WHERE g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` WHERE g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY score DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as any[];
    console.log(`[DB] getFilteredScores: получено ${rows.length} записей`);
    return rows;
  },
};
