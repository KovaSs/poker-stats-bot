import { inject, injectable } from "tsyringe";

import { GameRepository, GlobalUserRepository, TransactionRepository, UserIdentityRepository } from "@/db/repositories";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

@injectable()
export class GameService {
  constructor(
    @inject(GameRepository) private readonly gameRepository: GameRepository,
    @inject(TransactionRepository) private readonly transactionRepository: TransactionRepository,
    @inject(GlobalUserRepository) private readonly globalUserRepository: GlobalUserRepository,
    @inject(UserIdentityRepository) private readonly userIdentityRepository: UserIdentityRepository,
    @inject(StatsService) private readonly statsService: StatsService,
  ) {}

  private ensureUserIdentity(platform: string, chatId: number, username: string, platformUserId?: string | number): void {
    const existing = this.userIdentityRepository.findByPlatformAndChat(platform, chatId, username);
    if (existing) return;

    const globalUserId = this.globalUserRepository.create();
    this.userIdentityRepository.create(globalUserId, platform, chatId, username, platformUserId);
  }

  updateGame(
    gameId: number,
    newDate: string,
    newTransactions: ParsedTransaction[],
  ): number {
    this.gameRepository.updateDate(gameId, newDate);
    this.transactionRepository.deleteByGameId(gameId);
    const game = this.gameRepository.findById(gameId);
    if (game) {
      const savedCount = this.addTransactions(gameId, newTransactions, game.platform || "telegram", game.chat_id);
      return savedCount;
    }
    const savedCount = this.addTransactions(gameId, newTransactions);
    return savedCount;
  }

  deleteGame(chatId: number, messageId: number): boolean {
    const game = this.gameRepository.findByChatAndMessage(chatId, messageId);
    if (!game) return false;

    this.transactionRepository.deleteByGameId(game.id);
    this.gameRepository.delete(game.id);
    this.statsService.recalcStats();
    return true;
  }

  addTransactions(gameId: number, transactions: ParsedTransaction[], platform?: string, chatId?: number): number {
    let savedCount = 0;
    for (const tx of transactions) {
      this.transactionRepository.add(gameId, tx.username, tx.amount, tx.type);
      if (platform && chatId) {
        this.ensureUserIdentity(platform, chatId, tx.username);
      }
      savedCount++;
    }
    this.statsService.recalcStats();
    return savedCount;
  }

  createGame(
    chatId: number,
    messageId: number | null,
    gameDate?: string,
    platform: string = "telegram",
  ): number {
    const gameId = this.gameRepository.create(chatId, messageId, gameDate, platform);
    return gameId;
  }
}
