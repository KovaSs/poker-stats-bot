import { TransactionRepository, UserRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

export type Filter = { year?: string; all?: boolean; sinceDate?: string };

function buildFilter(filter?: string | "all"): Filter {
  if (filter === "all") {
    return { all: true };
  }
  if (filter && /^\d{4}$/.test(filter)) {
    return { year: filter };
  }
  // по умолчанию последний год
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const sinceDate = oneYearAgo.toISOString().slice(0, 10);
  return { sinceDate };
}

export const StatsService = {
  recalcStats(): void {
    logger.info("[StatsService] Пересчёт статистики...");
    // Очищаем таблицу users
    UserRepository.clear();

    // Получаем агрегированные данные по пользователям и играм
    const rows = TransactionRepository.getGroupedByUsernameAndGame();

    const userMap = new Map<
      string,
      { total_in: number; total_out: number; games: Set<number> }
    >();
    for (const row of rows) {
      const key = row.username;
      if (!userMap.has(key)) {
        userMap.set(key, { games: new Set(), total_out: 0, total_in: 0 });
      }
      const user = userMap.get(key)!;
      user.total_in += row.total_in;
      user.total_out += row.total_out;
      user.games.add(row.game_id);
    }

    // Подготовка данных для вставки
    const usersToInsert = Array.from(userMap.entries()).map(
      ([username, data]) => ({
        game_ids: JSON.stringify(Array.from(data.games)),
        games_count: data.games.size,
        total_out: data.total_out,
        total_in: data.total_in,
        username,
      }),
    );

    UserRepository.insertMany(usersToInsert);
    logger.info(
      `[StatsService] Пересчёт завершён, обработано пользователей: ${usersToInsert.length}`,
    );
  },

  getFilteredScores(chatId: number, filter?: string | "all") {
    const f = buildFilter(filter);
    if (f.all) {
      return TransactionRepository.getFilteredScores(chatId);
    }
    if (f.year) {
      return TransactionRepository.getFilteredScores(chatId, { year: f.year });
    }
    return TransactionRepository.getFilteredScores(chatId, {
      sinceDate: f.sinceDate,
    });
  },

  getFilteredStats(chatId: number, filter?: string | "all") {
    const f = buildFilter(filter);
    if (f.all) {
      return TransactionRepository.getFilteredStats(chatId);
    }
    if (f.year) {
      return TransactionRepository.getFilteredStats(chatId, { year: f.year });
    }
    return TransactionRepository.getFilteredStats(chatId, {
      sinceDate: f.sinceDate,
    });
  },

  getAvailableYears(chatId: number): string[] {
    return TransactionRepository.getDistinctYears(chatId);
  },
};
