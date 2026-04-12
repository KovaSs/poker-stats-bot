import { vi, describe, it, expect, beforeEach } from "vitest";
import { StatsService } from "@/services";
import * as middlewares from "../../middlewares";
import {
  sendStats,
  sendTop,
  sendStatsPeriodKeyboard,
  sendTopPeriodKeyboard,
} from "./stats";

vi.mock("@/services", () => ({
  StatsService: {
    getAvailableYears: vi.fn(),
    getFilteredStats: vi.fn(),
    getFilteredScores: vi.fn(),
  },
}));

vi.mock("../../middlewares", () => ({
  replyWithAutoDelete: vi.fn(),
}));

describe("stats functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sendStatsPeriodKeyboard отправляет клавиатуру выбора периода", async () => {
    const ctx = {} as any;
    const chatId = 123;
    (StatsService.getAvailableYears as any).mockReturnValue(["2024", "2025"]);
    await sendStatsPeriodKeyboard(ctx, chatId);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      "📊 Выберите период для статистики:",
      expect.objectContaining({
        reply_markup: expect.objectContaining({
          inline_keyboard: expect.any(Array),
        }),
      }),
    );
  });

  it("sendTopPeriodKeyboard отправляет клавиатуру выбора периода", async () => {
    const ctx = {} as any;
    const chatId = 123;
    (StatsService.getAvailableYears as any).mockReturnValue(["2024"]);
    await sendTopPeriodKeyboard(ctx, chatId);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      "🏆 Выберите период для топа:",
      expect.objectContaining({ reply_markup: expect.any(Object) }),
    );
  });

  // При желании можно добавить тесты для sendStats и sendTop
});
