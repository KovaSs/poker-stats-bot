import { GameRepository, TransactionRepository } from "@/db/repositories";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

export const GameService = {
  updateGame(
    gameId: number,
    newDate: string,
    newTransactions: ParsedTransaction[],
  ): number {
    GameRepository.updateDate(gameId, newDate);
    // Удаляем старые транзакции
    TransactionRepository.deleteByGameId(gameId);
    // Добавляем новые (внутри вызывается recalcStats)
    const savedCount = this.addTransactions(gameId, newTransactions);
    return savedCount;
  },

  deleteGame(chatId: number, messageId: number): boolean {
    const game = GameRepository.findByChatAndMessage(chatId, messageId);
    if (!game) return false;

    // Удаляем транзакции игры
    TransactionRepository.deleteByGameId(game.id);
    // Удаляем саму игру
    GameRepository.delete(game.id);
    // Пересчитываем статистику
    StatsService.recalcStats();
    return true;
  },

  addTransactions(gameId: number, transactions: ParsedTransaction[]): number {
    let savedCount = 0;
    for (const tx of transactions) {
      TransactionRepository.add(gameId, tx.username, tx.amount, tx.type);
      savedCount++;
    }
    // Пересчитываем агрегированную статистику после добавления транзакций
    StatsService.recalcStats();
    return savedCount;
  },

  createGame(
    chatId: number,
    messageId: number | null,
    gameDate?: string,
  ): number {
    const gameId = GameRepository.create(chatId, messageId, gameDate);
    // Статистика будет пересчитана после добавления транзакций
    return gameId;
  },
};
