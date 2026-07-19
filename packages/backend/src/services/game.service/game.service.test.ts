import { describe, it, expect, beforeEach, vi } from "vitest";

import { ParsedTransaction } from "../parser.service";

import { GameService } from "./game.service";

describe("GameService", () => {
  const mockGameRepo = {
    deleteByChatAndMessage: vi.fn(),
    findByChatAndMessage: vi.fn(),
    updateDate: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
  };

  const mockTxRepo = {
    deleteByGameId: vi.fn(),
    add: vi.fn(),
  };

  const mockStatsSvc = {
    recalcStats: vi.fn(),
  };

  const gameService = new GameService(
    mockGameRepo as never,
    mockTxRepo as never,
    mockStatsSvc as never,
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createGame", () => {
    it("создаёт игру и возвращает gameId", () => {
      const mockGameId = 42;
      mockGameRepo.create.mockReturnValue(mockGameId);

      const result = gameService.createGame(123, 456, "2026-03-28");

      expect(mockGameRepo.create).toHaveBeenCalledWith(
        123,
        456,
        "2026-03-28",
        "telegram",
      );
      expect(result).toBe(mockGameId);
      expect(mockStatsSvc.recalcStats).not.toHaveBeenCalled();
    });
  });

  describe("addTransactions", () => {
    it("добавляет транзакции и пересчитывает статистику", () => {
      const gameId = 1;
      const transactions: ParsedTransaction[] = [
        { username: "user1", amount: 100, type: "in" },
        { username: "user2", amount: 200, type: "out" },
      ];

      const savedCount = gameService.addTransactions(gameId, transactions);

      expect(mockTxRepo.add).toHaveBeenCalledTimes(2);
      expect(mockTxRepo.add).toHaveBeenNthCalledWith(
        1,
        gameId,
        "user1",
        100,
        "in",
      );
      expect(mockTxRepo.add).toHaveBeenNthCalledWith(
        2,
        gameId,
        "user2",
        200,
        "out",
      );
      expect(savedCount).toBe(2);
      expect(mockStatsSvc.recalcStats).toHaveBeenCalledTimes(1);
    });

    it("корректно обрабатывает пустой массив транзакций", () => {
      const gameId = 1;
      const savedCount = gameService.addTransactions(gameId, []);

      expect(mockTxRepo.add).not.toHaveBeenCalled();
      expect(savedCount).toBe(0);
      expect(mockStatsSvc.recalcStats).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateGame", () => {
    it("обновляет дату, удаляет старые транзакции, добавляет новые и пересчитывает статистику", () => {
      const gameId = 1;
      const newDate = "2026-03-29";
      const newTransactions: ParsedTransaction[] = [
        { username: "user1", amount: 50, type: "in" },
      ];

      const addSpy = vi.spyOn(gameService, "addTransactions");

      const result = gameService.updateGame(gameId, newDate, newTransactions);

      expect(mockGameRepo.updateDate).toHaveBeenCalledWith(gameId, newDate);
      expect(mockTxRepo.deleteByGameId).toHaveBeenCalledWith(gameId);
      expect(addSpy).toHaveBeenCalledWith(gameId, newTransactions);
      expect(result).toBe(1);

      addSpy.mockRestore();
    });
  });

  describe("deleteGame", () => {
    it("удаляет игру и связанные транзакции, пересчитывает статистику, возвращает true", () => {
      const chatId = 123;
      const messageId = 456;
      const mockGame = {
        message_id: messageId,
        chat_id: chatId,
        game_date: null,
        created_at: "",
        id: 5,
      };
      mockGameRepo.findByChatAndMessage.mockReturnValue(mockGame);
      mockTxRepo.deleteByGameId.mockReturnValue(3);

      const result = gameService.deleteGame(chatId, messageId);

      expect(mockGameRepo.findByChatAndMessage).toHaveBeenCalledWith(
        chatId,
        messageId,
      );
      expect(mockTxRepo.deleteByGameId).toHaveBeenCalledWith(5);
      expect(mockGameRepo.delete).toHaveBeenCalledWith(5);
      expect(mockStatsSvc.recalcStats).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("возвращает false, если игра не найдена", () => {
      mockGameRepo.findByChatAndMessage.mockReturnValue(null);

      const result = gameService.deleteGame(123, 456);

      expect(mockGameRepo.findByChatAndMessage).toHaveBeenCalledWith(
        123,
        456,
      );
      expect(mockTxRepo.deleteByGameId).not.toHaveBeenCalled();
      expect(mockGameRepo.delete).not.toHaveBeenCalled();
      expect(mockStatsSvc.recalcStats).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
