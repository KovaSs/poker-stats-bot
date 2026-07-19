import { vi, describe, it, expect, beforeEach } from "vitest";

import { GameProcessor } from "./gameProcessor";

import type { IMessage } from "../types";

vi.mock("@/config/logger", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

describe("GameProcessor", () => {
  const mockGameService = {
    addTransactions: vi.fn(),
    createGame: vi.fn(),
    updateGame: vi.fn(),
    deleteGame: vi.fn(),
  };

  const mockParserService = {
    extractGameDateFromText: vi.fn(),
    parseTransactions: vi.fn(),
  };

  const mockGameRepo = {
    findByChatAndMessage: vi.fn(),
  };

  const gp = new GameProcessor(
    mockGameService as never,
    mockParserService as never,
    mockGameRepo as never,
  );

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
    mockParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
    mockParserService.parseTransactions.mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    mockGameService.createGame.mockReturnValue(42);
    mockGameService.addTransactions.mockReturnValue(1);

    const result = await gp.processGameMessage(baseMessage);

    expect(result.ok).toBe(true);
    expect(result.reply).toContain("✅ Игра от 2025-02-16 успешно создана");
    expect(mockGameService.createGame).toHaveBeenCalledWith(
      12345, 111, "2025-02-16", "telegram",
    );
    expect(mockGameService.addTransactions).toHaveBeenCalledWith(42, [
      { username: "User", amount: 500, type: "in" },
    ], "telegram", 12345);
  });

  it("создаёт игру с платформой vk", async () => {
    const vkMessage: IMessage = {
      text: "game 16.02.2025\nВход:\n+300 | VKUser",
      platform: "vk",
      messageId: 222,
      chatId: 54321,
    };
    mockParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
    mockParserService.parseTransactions.mockReturnValue([
      { username: "VKUser", amount: 300, type: "in" },
    ]);
    mockGameService.createGame.mockReturnValue(99);
    mockGameService.addTransactions.mockReturnValue(1);

    const result = await gp.processGameMessage(vkMessage);

    expect(result.ok).toBe(true);
    expect(mockGameService.createGame).toHaveBeenCalledWith(
      54321, 222, "2025-02-16", "vk",
    );
  });

  it("возвращает ok:false, reply:null если нет 'game' в тексте", async () => {
    const msg: IMessage = { ...baseMessage, text: "просто текст" };
    const result = await gp.processGameMessage(msg);
    expect(result.ok).toBe(false);
    expect(result.reply).toBeNull();
  });

  it("возвращает ошибку если нет транзакций", async () => {
    mockParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
    mockParserService.parseTransactions.mockReturnValue([]);

    const result = await gp.processGameMessage(baseMessage);

    expect(result.ok).toBe(false);
    expect(result.reply).toContain("Не найдено ни одной корректной записи");
    expect(mockGameService.createGame).not.toHaveBeenCalled();
  });

  it("обновляет существующую игру для редактируемого сообщения", async () => {
    const editedMsg: IMessage = { ...baseMessage, isEdited: true };
    mockGameRepo.findByChatAndMessage.mockReturnValue({
      game_date: "2025-02-16", message_id: 111, chat_id: 12345, id: 10,
    });
    mockParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
    mockParserService.parseTransactions.mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    mockGameService.updateGame.mockReturnValue(1);

    const result = await gp.processGameMessage(editedMsg);

    expect(result.ok).toBe(true);
    expect(result.reply).toContain("✏️ Игра от 2025-02-16 обновлена");
    expect(mockGameService.updateGame).toHaveBeenCalledWith(10, "2025-02-16", [
      { username: "User", amount: 500, type: "in" },
    ]);
  });

  it("создаёт новую игру для редактирования, если игры нет", async () => {
    const editedMsg: IMessage = { ...baseMessage, isEdited: true };
    mockGameRepo.findByChatAndMessage.mockReturnValue(null);
    mockParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
    mockParserService.parseTransactions.mockReturnValue([
      { username: "User", amount: 500, type: "in" },
    ]);
    mockGameService.createGame.mockReturnValue(42);
    mockGameService.addTransactions.mockReturnValue(1);

    const result = await gp.processGameMessage(editedMsg);

    expect(result.ok).toBe(true);
    expect(mockGameService.createGame).toHaveBeenCalled();
  });

  it("обрабатывает ошибку сервиса", async () => {
    mockParserService.extractGameDateFromText.mockImplementation(() => {
      throw new Error("DB error");
    });

    const result = await gp.processGameMessage(baseMessage);

    expect(result.ok).toBe(false);
    expect(result.reply).toContain("❌ Произошла ошибка");
  });
});
