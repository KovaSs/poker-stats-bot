import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";
import * as stats from "./stats";

import type { CommandContext } from "@/types/telegram";

vi.mock("@/services", () => ({
  StatsService: {
    getAvailableYears: vi.fn(),
    getFilteredScores: vi.fn(),
    getFilteredStats: vi.fn(),
    recalcStats: vi.fn(),
  },
}));

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

vi.mock("@/config/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

function createMockContext(overrides: Partial<any> = {}): any {
  return {
    chat: { id: 12345 },
    from: { id: 67890, username: "testuser" },
    message: {
      message_id: 999,
      text: "",
      entities: [],
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
    telegram: {
      editMessageText: vi.fn(),
      deleteMessage: vi.fn(),
    },
    ...overrides,
  };
}

describe("stats handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("sendStats", () => {
    it("отправляет статистику за последний год по умолчанию", async () => {
      const ctx = createMockContext();
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.sendStats(ctx, 12345, undefined);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(
        12345,
        undefined,
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("последний год"),
        { parse_mode: "Markdown" },
      );
    });

    it("отправляет статистику за всё время", async () => {
      const ctx = createMockContext();
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.sendStats(ctx, 12345, "all");

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
        { parse_mode: "Markdown" },
      );
    });

    it("сообщает об отсутствии данных", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredStats as any).mockReturnValue([]);

      await stats.sendStats(ctx, 12345, "2024");

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "📊 Пока нет данных за указанный период.",
      );
    });

    it("обрабатывает ошибку сервиса", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredStats as any).mockImplementation(() => {
        throw new Error("DB error");
      });

      await stats.sendStats(ctx, 12345, "all");

      expect(logger.error).toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Ошибка при загрузке статистики.",
      );
    });
  });

  describe("sendTop", () => {
    it("отправляет топ за последний год", async () => {
      const ctx = createMockContext();
      const mockScores = [
        { username: "user1", score: 100 },
        { username: "user2", score: -50 },
      ];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, undefined);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(
        12345,
        undefined,
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("последний год"),
      );
    });

    it("отправляет топ за всё время", async () => {
      const ctx = createMockContext();
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, "all");

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
      );
    });

    it("сообщает об отсутствии данных", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredScores as any).mockReturnValue([]);

      await stats.sendTop(ctx, 12345, "2024");

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "🏆 Пока нет данных за указанный период.",
      );
    });

    it("экранирует username в Markdown", async () => {
      const ctx = createMockContext();
      const mockScores = [
        { username: "_test*", score: 100 },
        { username: "normal", score: 50 },
      ];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, undefined);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("\\_test\\*"),
      );
    });
  });

  describe("statsHandler", () => {
    it("без аргументов показывает клавиатуру", async () => {
      const ctx = createMockContext({
        message: { text: "/stats", message_id: 1 },
      });

      // Мокаем getAvailableYears, чтобы вернуть список годов
      (StatsService.getAvailableYears as any).mockReturnValue(["2024", "2025"]);

      await stats.statsHandler(ctx as CommandContext);

      expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining("Выберите период"),
        expect.objectContaining({
          reply_markup: expect.objectContaining({
            inline_keyboard: expect.any(Array),
          }),
        }),
      );
      expect(StatsService.getFilteredStats).not.toHaveBeenCalled();
    });

    it("с аргументом 'all' вызывает получение статистики за всё время", async () => {
      const ctx = createMockContext({
        message: { text: "/stats all", message_id: 1 },
      });
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.statsHandler(ctx as CommandContext);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
        { parse_mode: "Markdown" },
      );
    });

    it("с аргументом-годом вызывает получение статистики за год", async () => {
      const ctx = createMockContext({
        message: { text: "/stats 2024", message_id: 1 },
      });
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.statsHandler(ctx as CommandContext);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "2024");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("2024 год"),
        { parse_mode: "Markdown" },
      );
    });

    it("с неверным аргументом выводит сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: { text: "/stats invalid", message_id: 1 },
      });

      await stats.statsHandler(ctx as CommandContext);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Неверный формат"),
      );
    });
  });

  describe("topHandler", () => {
    it("без аргументов показывает клавиатуру", async () => {
      const ctx = createMockContext({
        message: { text: "/top", message_id: 1 },
      });

      // Мокаем getAvailableYears
      (StatsService.getAvailableYears as any).mockReturnValue(["2024", "2025"]);

      await stats.topHandler(ctx as CommandContext);

      expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining("Выберите период для топа"),
        expect.objectContaining({
          reply_markup: expect.objectContaining({
            inline_keyboard: expect.any(Array),
          }),
        }),
      );
      expect(StatsService.getFilteredScores).not.toHaveBeenCalled();
    });

    it("с аргументом 'all' вызывает получение топа за всё время", async () => {
      const ctx = createMockContext({
        message: { text: "/top all", message_id: 1 },
      });
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.topHandler(ctx as CommandContext);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
      );
    });

    it("с аргументом-годом вызывает получение топа за год", async () => {
      const ctx = createMockContext({
        message: { text: "/top 2024", message_id: 1 },
      });
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.topHandler(ctx as CommandContext);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(
        12345,
        "2024",
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("2024 год"),
      );
    });

    it("с неверным аргументом выводит сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: { text: "/top wrong", message_id: 1 },
      });

      await stats.topHandler(ctx as CommandContext);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Неверный формат"),
      );
    });
  });

  describe("statsUpdateHandler", () => {
    it("выполняет пересчёт и удаляет сообщение прогресса", async () => {
      vi.useFakeTimers();

      const ctx = createMockContext({
        message: { text: "/stats_update", message_id: 1 },
        reply: vi.fn().mockResolvedValue({ message_id: 100 }),
        deleteMessage: vi.fn(),
      });

      const promise = stats.statsUpdateHandler(ctx as CommandContext);
      for (let i = 0; i < 10; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }
      await promise;

      expect(ctx.reply).toHaveBeenCalledWith("🔄 Пересчёт статистики: 0%");
      expect(ctx.telegram.editMessageText).toHaveBeenCalledTimes(10);
      expect(StatsService.recalcStats).toHaveBeenCalled();
      expect(ctx.deleteMessage).toHaveBeenCalledWith(100);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "✅ Статистика успешно пересчитана!",
      );

      vi.useRealTimers();
    });

    it("обрабатывает ошибку", async () => {
      vi.useFakeTimers();

      const ctx = createMockContext({
        message: { text: "/stats_update", message_id: 1 },
        reply: vi.fn().mockResolvedValue({ message_id: 100 }),
        telegram: {
          editMessageText: vi
            .fn()
            .mockRejectedValue(new Error("Telegram error")),
          deleteMessage: vi.fn(),
        },
      });

      const promise = stats.statsUpdateHandler(ctx as CommandContext);
      for (let i = 0; i < 10; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }
      await promise;

      expect(logger.error).toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Ошибка при пересчёте.",
      );

      vi.useRealTimers();
    });
  });
});
