import { vi, describe, it, expect, beforeEach } from "vitest";

const mockStatsService = vi.hoisted(() => ({
  getAvailableYears: vi.fn(),
  getFilteredScores: vi.fn(),
  getFilteredStats: vi.fn(),
}));

vi.mock("@/di/container", () => ({
  container: {
    resolve: vi.fn(() => mockStatsService),
  },
}));

import * as middlewares from "../../middlewares";

import { sendStatsPeriodKeyboard, sendTopPeriodKeyboard } from "./stats";

vi.mock("../../middlewares", () => ({
  replyWithAutoDelete: vi.fn(),
}));

describe("stats functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sendStatsPeriodKeyboard отправляет клавиатуру выбора периода", async () => {
    const ctx = {};
    const chatId = 123;
    mockStatsService.getAvailableYears.mockReturnValue(["2024", "2025"]);
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
    const ctx = {};
    const chatId = 123;
    mockStatsService.getAvailableYears.mockReturnValue(["2024"]);
    await sendTopPeriodKeyboard(ctx, chatId);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      "🏆 Выберите период для топа:",
      expect.objectContaining({ reply_markup: expect.any(Object) }),
    );
  });
});
