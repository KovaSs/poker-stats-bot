import { inject, injectable } from "tsyringe";

import { TransactionRepository, UserIdentityRepository } from "@/db/repositories";

export type Filter = {
  year?: string;
  all?: boolean;
  sinceDate?: string;
  platform?: string;
  sort?: string;
  order?: string;
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
    @inject(UserIdentityRepository) private readonly userIdentityRepository: UserIdentityRepository,
  ) {}

  recalcStats(): void {
    // Таблица users удалена (миграция 009), статистика считается в реальном времени
  }

  private applySort(f: Filter, sort?: string, order?: string): Filter {
    return { ...f, order, sort };
  }

  getFilteredScores(
    chatId?: number,
    filter?: string | "all",
    platform?: string,
    sort?: string,
    order?: string,
  ) {
    const f = this.applySort(buildFilter(filter), sort, order);
    f.platform = platform;
    return this.transactionRepository.getFilteredScores(chatId, f);
  }

  getFilteredStats(
    chatId?: number,
    filter?: string | "all",
    platform?: string,
    sort?: string,
    order?: string,
  ) {
    const f = this.applySort(buildFilter(filter), sort, order);
    f.platform = platform;
    return this.transactionRepository.getFilteredStats(chatId, f);
  }

  getAvailableYears(chatId?: number, platform?: string): string[] {
    return this.transactionRepository.getDistinctYears(chatId, platform);
  }

  getFilteredStatsForUser(
    globalUserId: number,
    filter?: string | "all",
    platform?: string,
    sort?: string,
    order?: string,
  ) {
    const f = this.applySort(buildFilter(filter), sort, order);
    f.platform = platform;
    return this.transactionRepository.getFilteredStatsByGlobalUserId(globalUserId, f);
  }

  getFilteredScoresForUser(
    globalUserId: number,
    filter?: string | "all",
    platform?: string,
    sort?: string,
    order?: string,
  ) {
    const f = this.applySort(buildFilter(filter), sort, order);
    f.platform = platform;
    return this.transactionRepository.getFilteredScoresByGlobalUserId(globalUserId, f);
  }
}
