import { vi, describe, it, expect, beforeEach } from "vitest";

const mockStatsService = vi.hoisted(() => ({
  getFilteredScores: vi.fn(),
  getAvailableYears: vi.fn(),
  getFilteredStats: vi.fn(),
}));

const mockIsButtonOrYearFilter = vi.hoisted(() => vi.fn());
const mockNormalizeText = vi.hoisted(() => vi.fn((text) => ({ text, wasButton: false })));
const mockHandleFilterCommand = vi.hoisted(() => vi.fn());
const mockSaveFilterPromptId = vi.hoisted(() => vi.fn());

vi.mock("@/core", () => ({
  processGameMessage: vi.fn(),
  formatStatsTable: vi.fn(),
  processCommand: vi.fn(),
  formatTopList: vi.fn(),
}));

vi.mock("@/services", () => ({
  StatsService: mockStatsService,
}));

vi.mock("@/di/container", () => ({
  container: {
    resolve: vi.fn((token: unknown) => {
      if (token === mockStatsService) return mockStatsService;
      return mockStatsService;
    }),
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

vi.mock("./buttonProcessor", () => ({
  isButtonOrYearFilter: mockIsButtonOrYearFilter,
  normalizeText: mockNormalizeText,
}));

vi.mock("./filterHandler", () => ({
  saveFilterPromptId: mockSaveFilterPromptId,
  handleFilterCommand: mockHandleFilterCommand,
}));

import { processGameMessage, processCommand, formatStatsTable, formatTopList } from "@/core";
import { logger } from "@/config/logger";

import { vkContextToIMessage } from "../../adapters";

const mockLogger = logger as unknown as { info: ReturnType<typeof vi.fn>; warn: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

describe("handleVKMessage", () => {
  const mockSend = vi.fn().mockResolvedValue({ id: 123 });

  beforeEach(() => {
    vi.clearAllMocks();
    mockIsButtonOrYearFilter.mockReturnValue(false);
    mockNormalizeText.mockImplementation((text) => ({ text, wasButton: false }));
    mockHandleFilterCommand.mockResolvedValue(undefined);
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
    mockIsButtonOrYearFilter.mockReturnValue(true);
    mockNormalizeText.mockReturnValue({ text: "!stats", wasButton: true });
    vkContextToIMessage.mockReturnValue({ text: "📊 Статистика", chatId: 2000000001, platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: undefined, reply: null });
    mockStatsService.getAvailableYears.mockReturnValue(["2024"]);
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "📊 Статистика", peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(mockHandleFilterCommand).toHaveBeenCalledWith("stats", 2000000001, undefined, expect.any(Function));
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
    mockIsButtonOrYearFilter.mockReturnValue(true);
    mockNormalizeText.mockReturnValue({ text: "!stats 2026", wasButton: true });
    vkContextToIMessage.mockReturnValue({ chatId: 2000000001, text: "📊 2026", platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "2026", reply: null });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, peerType: "chat", text: "📊 2026", send: mockSend } as any,
      false,
    );
    expect(mockHandleFilterCommand).toHaveBeenCalledWith("stats", 2000000001, "2026", expect.any(Function));
  });

  it("обрабатывает выбор 'Всё время' из фильтра статистики", async () => {
    mockIsButtonOrYearFilter.mockReturnValue(true);
    mockNormalizeText.mockReturnValue({ text: "!stats all", wasButton: true });
    vkContextToIMessage.mockReturnValue({ text: "📊 Всё время", chatId: 2000000001, platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "all", reply: null });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, text: "📊 Всё время", peerId: 2000000001, peerType: "chat", send: mockSend } as any,
      false,
    );
    expect(mockHandleFilterCommand).toHaveBeenCalledWith("stats", 2000000001, "all", expect.any(Function));
  });

  it("обрабатывает выбор года из фильтра топа", async () => {
    mockIsButtonOrYearFilter.mockReturnValue(true);
    mockNormalizeText.mockReturnValue({ text: "!top 2025", wasButton: true });
    vkContextToIMessage.mockReturnValue({ chatId: 2000000001, text: "🏆 2025", platform: "vk", messageId: 1 });
    processCommand.mockReturnValue({ filter: "2025", reply: null });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, peerType: "chat", text: "🏆 2025", send: mockSend } as any,
      false,
    );
    expect(mockHandleFilterCommand).toHaveBeenCalledWith("top", 2000000001, "2025", expect.any(Function));
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
    mockIsButtonOrYearFilter.mockReturnValue(true);
    mockNormalizeText.mockReturnValue({ text: "!help", wasButton: true });
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
    mockNormalizeText.mockImplementation((text) => ({ text, wasButton: false }));
    processCommand.mockReturnValue({ filter: "2024", reply: null });
    const { handleVKMessage } = await import("./message");
    await handleVKMessage(
      { conversationMessageId: 1, peerId: 2000000001, peerType: "chat", send: mockSend, text: "@poker_club !top 2024" } as any,
      false,
    );
    expect(mockHandleFilterCommand).toHaveBeenCalledWith("top", 2000000001, "2024", expect.any(Function));
  });
});
