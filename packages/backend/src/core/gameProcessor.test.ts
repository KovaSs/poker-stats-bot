import { vi, describe, it, expect, beforeEach } from "vitest";

import * as gameProcessor from "./gameProcessor";

import type { IMessage } from "./types";

vi.mock("@/db/repositories", () => ({
  GameRepository: {
    findByChatAndMessage: vi.fn(),
  },
}));

vi.mock("@/services", () => ({
  GameService: {
    addTransactions: vi.fn(),
    createGame: vi.fn(),
    updateGame: vi.fn(),
    deleteGame: vi.fn(),
  },
  ParserService: {
    extractGameDateFromText: vi.fn(),
    parseTransactions: vi.fn(),
  },
  StatsService: {
    recalcStats: vi.fn(),
  },
}));

vi.mock("@/config/logger", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";

describe("processGameMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const baseMessage: IMessage = {
    text: "@testbot game 16.02.2025\nВход:\n+500 | User",
    fromUsername: "testuser",
    platform: "telegram",
    fromUserId: 67890,
    messageId: 111,
    chatId: 12345,
  };

  it("создаёт игру при корректном сообщении", async () => {
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockReturnValue("2025-02-16");
    (ParserService.parseTransactions as ReturnType<typeof vi.fn>).mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    (GameService.createGame as ReturnType<typeof vi.fn>).mockReturnValue(42);
    (GameService.addTransactions as ReturnType<typeof vi.fn>).mockReturnValue(1);

    const result = await gameProcessor.processGameMessage(baseMessage);

    expect(result.ok).toBe(true);
    expect(result.reply).toContain("✅ Игра от 2025-02-16 успешно создана");
    expect(GameService.createGame).toHaveBeenCalledWith(
      12345, 111, "2025-02-16", "telegram",
    );
    expect(GameService.addTransactions).toHaveBeenCalledWith(42, [
      { username: "User", amount: 500, type: "in" },
    ]);
  });

  it("создаёт игру с платформой vk", async () => {
    const vkMessage: IMessage = {
      text: "game 16.02.2025\nВход:\n+300 | VKUser",
      platform: "vk",
      messageId: 222,
      chatId: 54321,
    };
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockReturnValue("2025-02-16");
    (ParserService.parseTransactions as ReturnType<typeof vi.fn>).mockReturnValue([
      { username: "VKUser", amount: 300, type: "in" },
    ]);
    (GameService.createGame as ReturnType<typeof vi.fn>).mockReturnValue(99);
    (GameService.addTransactions as ReturnType<typeof vi.fn>).mockReturnValue(1);

    const result = await gameProcessor.processGameMessage(vkMessage);

    expect(result.ok).toBe(true);
    expect(GameService.createGame).toHaveBeenCalledWith(
      54321, 222, "2025-02-16", "vk",
    );
  });

  it("возвращает ok:false, reply:null если нет 'game' в тексте", async () => {
    const msg: IMessage = { ...baseMessage, text: "просто текст" };
    const result = await gameProcessor.processGameMessage(msg);
    expect(result.ok).toBe(false);
    expect(result.reply).toBeNull();
  });

  it("возвращает ошибку если нет транзакций", async () => {
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockReturnValue("2025-02-16");
    (ParserService.parseTransactions as ReturnType<typeof vi.fn>).mockReturnValue([]);

    const result = await gameProcessor.processGameMessage(baseMessage);

    expect(result.ok).toBe(false);
    expect(result.reply).toContain("Не найдено ни одной корректной записи");
    expect(GameService.createGame).not.toHaveBeenCalled();
  });

  it("обновляет существующую игру для редактируемого сообщения", async () => {
    const editedMsg: IMessage = { ...baseMessage, isEdited: true };
    (GameRepository.findByChatAndMessage as ReturnType<typeof vi.fn>).mockReturnValue({
      game_date: "2025-02-16", message_id: 111, chat_id: 12345, id: 10,
    });
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockReturnValue("2025-02-16");
    (ParserService.parseTransactions as ReturnType<typeof vi.fn>).mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    (GameService.updateGame as ReturnType<typeof vi.fn>).mockReturnValue(1);

    const result = await gameProcessor.processGameMessage(editedMsg);

    expect(result.ok).toBe(true);
    expect(result.reply).toContain("✏️ Игра от 2025-02-16 обновлена");
    expect(GameService.updateGame).toHaveBeenCalledWith(10, "2025-02-16", [
      { username: "User", amount: 500, type: "in" },
    ]);
  });

  it("создаёт новую игру для редактирования, если игры нет", async () => {
    const editedMsg: IMessage = { ...baseMessage, isEdited: true };
    (GameRepository.findByChatAndMessage as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockReturnValue("2025-02-16");
    (ParserService.parseTransactions as ReturnType<typeof vi.fn>).mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    (GameService.createGame as ReturnType<typeof vi.fn>).mockReturnValue(42);
    (GameService.addTransactions as ReturnType<typeof vi.fn>).mockReturnValue(1);

    const result = await gameProcessor.processGameMessage(editedMsg);

    expect(result.ok).toBe(true);
    expect(GameService.createGame).toHaveBeenCalled();
  });

  it("обрабатывает ошибку сервиса", async () => {
    (ParserService.extractGameDateFromText as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error("DB error");
    });

    const result = await gameProcessor.processGameMessage(baseMessage);

    expect(result.ok).toBe(false);
    expect(result.reply).toContain("❌ Произошла ошибка");
  });
});
