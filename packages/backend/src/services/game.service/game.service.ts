import { inject, injectable } from "tsyringe";

import { GameRepository, TransactionRepository } from "@/db/repositories";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

@injectable()
export class GameService {
  constructor(
    @inject(GameRepository) private readonly gameRepository: GameRepository,
    @inject(TransactionRepository) private readonly transactionRepository: TransactionRepository,
    @inject(StatsService) private readonly statsService: StatsService,
  ) {}

  updateGame(
    gameId: number,
    newDate: string,
    newTransactions: ParsedTransaction[],
  ): number {
    this.gameRepository.updateDate(gameId, newDate);
    this.transactionRepository.deleteByGameId(gameId);
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

  addTransactions(gameId: number, transactions: ParsedTransaction[]): number {
    let savedCount = 0;
    for (const tx of transactions) {
      this.transactionRepository.add(gameId, tx.username, tx.amount, tx.type);
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
