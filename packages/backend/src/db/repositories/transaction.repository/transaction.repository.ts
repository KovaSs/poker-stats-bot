import { injectable } from "tsyringe";

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

const SORT_COLUMNS: Record<string, string> = {
  balance: "(total_out - total_in)",
  games_count: "games_count",
  total_out: "total_out",
  total_in: "total_in",
};

function buildSort(sort?: string, order?: string): string {
  if (!sort) return "";
  const column = SORT_COLUMNS[sort];
  if (!column) return "";
  const dir = order === "asc" ? "ASC" : "DESC";
  return ` ORDER BY ${column} ${dir}`;
}

function buildParams(
  chatId?: number,
  filter?: { year?: string; sinceDate?: string; platform?: string; sort?: string; order?: string },
): { sql: string; params: (string | number)[]; orderBy: string } {
  const params: (string | number)[] = [];
  let sql = "";
  const orderBy = buildSort(filter?.sort, filter?.order);

  if (chatId !== undefined) {
    sql += ` AND g.chat_id = ?`;
    params.push(chatId);
  }

  if (filter?.year) {
    sql += ` AND g.game_date LIKE ?`;
    params.push(`${filter.year}%`);
  } else if (filter?.sinceDate) {
    sql += ` AND g.game_date >= ?`;
    params.push(filter.sinceDate);
  }

  if (filter?.platform) {
    sql += ` AND g.platform = ?`;
    params.push(filter.platform);
  }

  return { orderBy, params, sql };
}

@injectable()
export class TransactionRepository {
  getFilteredStats(
    chatId?: number,
    filter?: { year?: string; sinceDate?: string; platform?: string; sort?: string; order?: string },
  ): {
    username: string;
    total_in: number;
    total_out: number;
    games_count: number;
  }[] {
    const { sql: filterSql, orderBy, params } = buildParams(chatId, filter);
    const finalOrder = orderBy || " ORDER BY (total_out - total_in) DESC";
    const sql = `
      SELECT
        t.username,
        COALESCE(gu.name, t.username) as name,
        COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0) as total_in,
        COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) as total_out,
        COUNT(DISTINCT g.game_date) as games_count
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      LEFT JOIN user_identities ui ON ui.username = t.username AND ui.platform = g.platform AND ui.chat_id = g.chat_id
      LEFT JOIN global_users gu ON gu.id = ui.global_user_id
      WHERE 1=1${filterSql}
      GROUP BY COALESCE(gu.id, t.username)${finalOrder}
    `;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as {
      name: string;
      games_count: number;
      total_out: number;
      username: string;
      total_in: number;
    }[];
    logger.info(`[DB] getFilteredStats: получено ${rows.length} записей`);
    return rows;
  }

  getFilteredScores(
    chatId?: number,
    filter?: { year?: string; sinceDate?: string; platform?: string; sort?: string; order?: string },
  ): { username: string; score: number }[] {
    const { sql: filterSql, orderBy, params } = buildParams(chatId, filter);
    const finalOrder = orderBy || " ORDER BY score DESC";
    const sql = `
      SELECT
        t.username,
        (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      WHERE 1=1${filterSql}
      GROUP BY t.username${finalOrder}
    `;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as {
      username: string;
      score: number;
    }[];
    logger.info(`[DB] getFilteredScores: получено ${rows.length} записей`);
    return rows;
  }

  getFilteredStatsByGlobalUserId(
    globalUserId: number,
    filter?: { year?: string; sinceDate?: string; platform?: string; sort?: string; order?: string },
  ): {
    username: string;
    total_in: number;
    total_out: number;
    games_count: number;
  }[] {
    let filterSql = "";
    const params: (string | number)[] = [globalUserId];
    const orderBy = buildSort(filter?.sort, filter?.order);

    if (filter?.year) {
      filterSql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      filterSql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    if (filter?.platform) {
      filterSql += ` AND g.platform = ?`;
      params.push(filter.platform);
    }

    const finalOrder = orderBy || " ORDER BY (total_out - total_in) DESC";

    const sql = `
      SELECT
        ui.username,
        COALESCE(gu.name, ui.username) as name,
        COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0) as total_in,
        COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) as total_out,
        COUNT(DISTINCT g.game_date) as games_count
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      JOIN user_identities ui ON ui.username = t.username AND ui.platform = g.platform AND ui.chat_id = g.chat_id
      LEFT JOIN global_users gu ON gu.id = ui.global_user_id
      WHERE ui.global_user_id = ?${filterSql}
      GROUP BY ui.global_user_id${finalOrder}
    `;

    const stmt = getDB().prepare(sql);
    return stmt.all(...params) as {
      name: string;
      games_count: number;
      total_out: number;
      username: string;
      total_in: number;
    }[];
  }

  getFilteredScoresByGlobalUserId(
    globalUserId: number,
    filter?: { year?: string; sinceDate?: string; platform?: string; sort?: string; order?: string },
  ): { username: string; score: number }[] {
    let filterSql = "";
    const params: (string | number)[] = [globalUserId];
    const orderBy = buildSort(filter?.sort, filter?.order);

    if (filter?.year) {
      filterSql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      filterSql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    if (filter?.platform) {
      filterSql += ` AND g.platform = ?`;
      params.push(filter.platform);
    }

    const finalOrder = orderBy || " ORDER BY score DESC";

    const sql = `
      SELECT
        ui.username,
        (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      JOIN user_identities ui ON ui.username = t.username AND ui.platform = g.platform AND ui.chat_id = g.chat_id
      WHERE ui.global_user_id = ?${filterSql}
      GROUP BY ui.username${finalOrder}
    `;

    const stmt = getDB().prepare(sql);
    return stmt.all(...params) as { username: string; score: number }[];
  }

  getDistinctYears(chatId?: number, platform?: string): string[] {
    let sql = `
      SELECT DISTINCT strftime('%Y', game_date) as year
      FROM games
      WHERE game_date IS NOT NULL
    `;
    const params: (string | number)[] = [];

    if (chatId !== undefined) {
      sql += ` AND chat_id = ?`;
      params.push(chatId);
    }

    if (platform) {
      sql += ` AND platform = ?`;
      params.push(platform);
    }

    sql += ` ORDER BY year DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as { year: string }[];
    return rows.map((row) => row.year);
  }

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
  }

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
  }

  deleteByGameId(gameId: number): number {
    const stmt = getDB().prepare(`DELETE FROM transactions WHERE game_id = ?`);
    const info = stmt.run(gameId);
    logger.info(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
    return info.changes;
  }
}
