import { GameRepository, TransactionRepository } from "../db/repositories";
import { ParsedTransaction } from "./parser.service";

export const GameService = {
  createGame(
    chatId: number,
    messageId: number | null,
    gameDate?: string,
  ): number {
    return GameRepository.create(chatId, messageId, gameDate);
  },

  addTransactions(gameId: number, transactions: ParsedTransaction[]): number {
    let savedCount = 0;
    for (const tx of transactions) {
      TransactionRepository.add(gameId, tx.username, tx.amount, tx.type);
      savedCount++;
    }
    return savedCount;
  },

  updateGame(
    gameId: number,
    newDate: string,
    newTransactions: ParsedTransaction[],
  ): number {
    GameRepository.updateDate(gameId, newDate);
    TransactionRepository.deleteByGameId(gameId);
    return this.addTransactions(gameId, newTransactions);
  },

  deleteGame(chatId: number, messageId: number): boolean {
    return GameRepository.deleteByChatAndMessage(chatId, messageId);
  },
};
