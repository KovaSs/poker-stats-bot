import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/core", () => ({
  processGameMessage: vi.fn(),
  formatStatsTable: vi.fn(),
  processCommand: vi.fn(),
  formatTopList: vi.fn(),
}));

vi.mock("@/services", () => ({
  StatsService: {
    getFilteredScores: vi.fn(),
    getAvailableYears: vi.fn(),
    getFilteredStats: vi.fn(),
  },
}));

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

vi.mock("@/config/env", () => ({
  VK_COMMUNITY_CHAT_ID: null,
  TELEGRAM_API_URL: "",
  VK_ACCESS_TOKEN: "",
  BOT_TOKEN: "test",
  FRONTEND_URL: "",
  VK_GROUP_ID: "",
  API_PORT: 3000,
}));

vi.mock("../../adapters", () => ({
  vkContextToIMessage: vi.fn(),
}));

vi.mock("../../middlewares", () => ({
  scheduleAutoDelete: vi.fn(),
}));

vi.mock("../../bot", () => ({
  getVK: vi.fn().mockReturnValue(null),
}));

// Мок для menu.ts должен быть перед импортами
vi.mock("../../handlers/menu/menu", () => ({
  buttonCommands: {
    "📊 Всё время": "!stats all",
    "📊 Последний год": "!stats",
    "🏆 Всё время": "!top all",
    "🏆 Последний год": "!top",
    "📊 Статистика": "!stats",
    "📚 Помощь": "!help",
    "🏆 Топ": "!top",
  },
  buildStatsFilterKeyboard: vi.fn().mockReturnValue('{"buttons":[]}'),
  buildTopFilterKeyboard: vi.fn().mockReturnValue('{"buttons":[]}'),
  buildMenuKeyboard: vi.fn().mockReturnValue("{}"),
}));

import { processGameMessage, processCommand, formatStatsTable, formatTopList } from "@/core";
import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import { vkContextToIMessage } from "../../adapters";

const mockLogger = logger as unknown as { info: ReturnType<typeof vi.fn>; warn: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

describe("handleVKMessage", () => {
  const mockSend = vi.fn().mockResolvedValue({ id: 123 });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("игнорирует сообщение без упоминания и не из кнопок", async () => {
    vkContextToIMessage.mockReturnValue({
      text: "просто текст", platform: "vk", messageId: 1, chatId: 1,
    });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "просто текст", peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining("Пропущено"));
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("обрабатывает нажатие кнопки статистики", async () => {
    vkContextToIMessage.mockReturnValue({ text: "📊 Статистика", chatId: 2000000001, platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: undefined, reply: null });
    StatsService.getAvailableYears.mockReturnValue(["2024"]);
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "📊 Статистика", peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(mockSend).toHaveBeenCalledWith(expect.stringContaining("Выберите период"), expect.any(Object));
  });

  it("обрабатывает упоминание бота с командой", async () => {
    vkContextToIMessage.mockReturnValue({ text: "@poker_club /help", platform: "vk", messageId: 1, chatId: 1 });
    processCommand.mockReturnValue({ reply: "📚 Справка" });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { text: "@poker_club /help", conversationMessageId: 1, peerType: "user", send: mockSend, peerId: 1 } as any,
      false,
    );
    expect(mockSend).toHaveBeenCalledWith("📚 Справка", expect.any(Object));
  });

  it("обрабатывает упоминание в формате [club|@poker_club]", async () => {
    vkContextToIMessage.mockReturnValue({ text: "[club240343559|@poker_club] game 18.07", platform: "vk", messageId: 1, chatId: 1 });
    processGameMessage.mockResolvedValue({ reply: "✅ Игра создана", gameId: 42, ok: true });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { text: "[club240343559|@poker_club] game 18.07", conversationMessageId: 1, peerType: "user", send: mockSend, peerId: 1 } as any,
      false,
    );
    expect(mockSend).toHaveBeenCalledWith("✅ Игра создана", expect.any(Object));
  });

  it("игнорирует сообщения с пустым imessage", async () => {
    vkContextToIMessage.mockReturnValue(null);
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerType: "user", send: mockSend, text: "test", peerId: 1 } as any,
      false,
    );
    expect(mockLogger.warn).toHaveBeenCalledWith(expect.stringContaining("imessage is null"));
  });

  it("обрабатывает выбор года из фильтра статистики", async () => {
    vkContextToIMessage.mockReturnValue({ chatId: 2000000001, text: "📊 2026", platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "2026", reply: null });
    StatsService.getFilteredStats.mockReturnValue([]);
    formatStatsTable.mockReturnValue("stats");
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, peerType: "chat", text: "📊 2026", send: mockSend } as any,
      false,
    );
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(undefined, "2026");
  });

  it("обрабатывает выбор 'Всё время' из фильтра статистики", async () => {
    vkContextToIMessage.mockReturnValue({ text: "📊 Всё время", chatId: 2000000001, platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "all", reply: null });
    StatsService.getFilteredStats.mockReturnValue([]);
    formatStatsTable.mockReturnValue("stats");
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "📊 Всё время", peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(undefined, "all");
  });

  it("обрабатывает выбор года из фильтра топа", async () => {
    vkContextToIMessage.mockReturnValue({ chatId: 2000000001, text: "🏆 2025", platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "2025", reply: null });
    StatsService.getFilteredScores.mockReturnValue([]);
    formatTopList.mockReturnValue("top");
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, peerType: "chat", text: "🏆 2025", send: mockSend } as any,
      false,
    );
    expect(StatsService.getFilteredScores).toHaveBeenCalledWith(undefined, "2025");
  });

  it("обрабатывает пустое упоминание", async () => {
    vkContextToIMessage.mockReturnValue({ text: "@poker_club", platform: "vk", messageId: 1, chatId: 1 });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "@poker_club", peerType: "user", send: mockSend, peerId: 1 } as any,
      false,
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  it("нормализует текст при нажатии кнопок", async () => {
    vkContextToIMessage.mockReturnValue({ chatId: 2000000001, text: "📚 Помощь", platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ reply: "📚 Справка" });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, text: "📚 Помощь", peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(processCommand).toHaveBeenCalledWith("!help");
  });

  it("обрабатывает команду !top из текста", async () => {
    vkContextToIMessage.mockReturnValue({ text: "@poker_club !top 2024", chatId: 2000000001, platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "2024", reply: null });
    StatsService.getFilteredScores.mockReturnValue([]);
    formatTopList.mockReturnValue("top");
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { text: "@poker_club !top 2024", conversationMessageId: 1, peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(StatsService.getFilteredScores).toHaveBeenCalledWith(undefined, "2024");
  });
});
