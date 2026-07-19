import { inject, injectable } from "tsyringe";

import { TransactionRepository, UserRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

export type Filter = {
  year?: string;
  all?: boolean;
  sinceDate?: string;
  platform?: string;
};

function buildFilter(filter?: string | "all"): Filter {
  if (filter === "all") {
    return { all: true };
  }
  if (filter && /^\d{4}$/.test(filter)) {
    return { year: filter };
  }
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const sinceDate = oneYearAgo.toISOString().slice(0, 10);
  return { sinceDate };
}

@injectable()
export class StatsService {
  constructor(
    @inject(TransactionRepository) private readonly transactionRepository: TransactionRepository,
    @inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  recalcStats(): void {
    logger.info("[StatsService] Пересчёт статистики...");
    this.userRepository.clear();

    const rows = this.transactionRepository.getGroupedByUsernameAndGame();

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

    const usersToInsert = Array.from(userMap.entries()).map(
      ([username, data]) => ({
        game_ids: JSON.stringify(Array.from(data.games)),
        games_count: data.games.size,
        total_out: data.total_out,
        total_in: data.total_in,
        username,
      }),
    );

    this.userRepository.insertMany(usersToInsert);
    logger.info(
      `[StatsService] Пересчёт завершён, обработано пользователей: ${usersToInsert.length}`,
    );
  }

  getFilteredScores(
    chatId?: number,
    filter?: string | "all",
    platform?: string,
  ) {
    const f = buildFilter(filter);
    f.platform = platform;
    if (f.all) {
      return this.transactionRepository.getFilteredScores(chatId, { platform });
    }
    if (f.year) {
      return this.transactionRepository.getFilteredScores(chatId, {
        year: f.year,
        platform,
      });
    }
    return this.transactionRepository.getFilteredScores(chatId, {
      sinceDate: f.sinceDate,
      platform,
    });
  }

  getFilteredStats(
    chatId?: number,
    filter?: string | "all",
    platform?: string,
  ) {
    const f = buildFilter(filter);
    f.platform = platform;
    if (f.all) {
      return this.transactionRepository.getFilteredStats(chatId, { platform });
    }
    if (f.year) {
      return this.transactionRepository.getFilteredStats(chatId, {
        year: f.year,
        platform,
      });
    }
    return this.transactionRepository.getFilteredStats(chatId, {
      sinceDate: f.sinceDate,
      platform,
    });
  }

  getAvailableYears(chatId?: number, platform?: string): string[] {
    return this.transactionRepository.getDistinctYears(chatId, platform);
  }
}
