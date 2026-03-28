import { describe, it, expect, beforeEach, vi } from "vitest";

import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { GameRepository } from "@/db/repositories/game.repository";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

import { GameService } from "./game.service";

vi.mock("@/db/repositories/game.repository", () => ({
  GameRepository: {
    create: vi.fn(),
    findByChatAndMessage: vi.fn(),
    updateDate: vi.fn(),
    delete: vi.fn(),
    deleteByChatAndMessage: vi.fn(),
  },
}));

vi.mock("@/db/repositories/transaction.repository", () => ({
  TransactionRepository: {
    add: vi.fn(),
    deleteByGameId: vi.fn(),
  },
}));

vi.mock("../stats.service", () => ({
  StatsService: {
    recalcStats: vi.fn(),
  },
}));

describe("GameService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createGame", () => {
    it("создаёт игру и возвращает gameId", () => {
      const mockGameId = 42;
      (GameRepository.create as any).mockReturnValue(mockGameId);

      const result = GameService.createGame(123, 456, "2026-03-28");

      expect(GameRepository.create).toHaveBeenCalledWith(
        123,
        456,
        "2026-03-28",
      );
      expect(result).toBe(mockGameId);
      // recalcStats не должен вызываться при создании
      expect(StatsService.recalcStats).not.toHaveBeenCalled();
    });
  });

  describe("addTransactions", () => {
    it("добавляет транзакции и пересчитывает статистику", () => {
      const gameId = 1;
      const transactions: ParsedTransaction[] = [
        { username: "user1", amount: 100, type: "in" },
        { username: "user2", amount: 200, type: "out" },
      ];

      const savedCount = GameService.addTransactions(gameId, transactions);

      expect(TransactionRepository.add).toHaveBeenCalledTimes(2);
      expect(TransactionRepository.add).toHaveBeenNthCalledWith(
        1,
        gameId,
        "user1",
        100,
        "in",
      );
      expect(TransactionRepository.add).toHaveBeenNthCalledWith(
        2,
        gameId,
        "user2",
        200,
        "out",
      );
      expect(savedCount).toBe(2);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
    });

    it("корректно обрабатывает пустой массив транзакций", () => {
      const gameId = 1;
      const savedCount = GameService.addTransactions(gameId, []);

      expect(TransactionRepository.add).not.toHaveBeenCalled();
      expect(savedCount).toBe(0);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateGame", () => {
    it("обновляет дату, удаляет старые транзакции, добавляет новые и пересчитывает статистику", () => {
      const gameId = 1;
      const newDate = "2026-03-29";
      const newTransactions: ParsedTransaction[] = [
        { username: "user1", amount: 50, type: "in" },
      ];

      // Шпионим за addTransactions, чтобы проверить его вызов
      const addSpy = vi.spyOn(GameService, "addTransactions");

      const result = GameService.updateGame(gameId, newDate, newTransactions);

      expect(GameRepository.updateDate).toHaveBeenCalledWith(gameId, newDate);
      expect(TransactionRepository.deleteByGameId).toHaveBeenCalledWith(gameId);
      expect(addSpy).toHaveBeenCalledWith(gameId, newTransactions);
      expect(result).toBe(1); // addTransactions вернёт 1

      addSpy.mockRestore();
    });
  });

  describe("deleteGame", () => {
    it("удаляет игру и связанные транзакции, пересчитывает статистику, возвращает true", () => {
      const chatId = 123;
      const messageId = 456;
      const mockGame = {
        id: 5,
        chat_id: chatId,
        message_id: messageId,
        game_date: null,
        created_at: "",
      };
      (GameRepository.findByChatAndMessage as any).mockReturnValue(mockGame);
      (TransactionRepository.deleteByGameId as any).mockReturnValue(3); // количество удалённых транзакций

      const result = GameService.deleteGame(chatId, messageId);

      expect(GameRepository.findByChatAndMessage).toHaveBeenCalledWith(
        chatId,
        messageId,
      );
      expect(TransactionRepository.deleteByGameId).toHaveBeenCalledWith(5);
      expect(GameRepository.delete).toHaveBeenCalledWith(5);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("возвращает false, если игра не найдена", () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);

      const result = GameService.deleteGame(123, 456);

      expect(GameRepository.findByChatAndMessage).toHaveBeenCalledWith(
        123,
        456,
      );
      expect(TransactionRepository.deleteByGameId).not.toHaveBeenCalled();
      expect(GameRepository.delete).not.toHaveBeenCalled();
      expect(StatsService.recalcStats).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
