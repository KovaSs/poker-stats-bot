import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

vi.mock("../../handlers/stats", () => ({
  sendStatsPeriodKeyboard: vi.fn(),
  sendTopPeriodKeyboard: vi.fn(),
}));

vi.mock("../../handlers/help", () => ({
  sendHelpMessage: vi.fn(),
}));

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
}));

import { sendStatsPeriodKeyboard, sendTopPeriodKeyboard } from "../../handlers/stats";
import { deleteCommandMessage } from "../../middlewares";
import { sendHelpMessage } from "../../handlers/help";

describe("menuHandler / menuCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("menuHandler вызывает deleteCommandMessage и отправляет клавиатуру", async () => {
    const { menuHandler } = await import("./menu");
    const ctx = {
      deleteMessage: vi.fn(),
      chat: { id: 123 },
      from: { id: 1 },
      reply: vi.fn(),
    } as any;
    await menuHandler(ctx);
    expect(deleteCommandMessage).toHaveBeenCalledWith(ctx);
    expect(ctx.reply).toHaveBeenCalledWith("📋 Главное меню:", expect.any(Object));
  });

  it("menuCallback обрабатывает menu_stats", async () => {
    const { menuCallback } = await import("./menu");
    const ctx = {
      callbackQuery: { data: "menu_stats" },
      answerCbQuery: vi.fn(),
      deleteMessage: vi.fn(),
      chat: { id: 123 },
      reply: vi.fn(),
    } as any;
    await menuCallback(ctx, ["menu_stats"]);
    expect(sendStatsPeriodKeyboard).toHaveBeenCalledWith(ctx, 123);
  });

  it("menuCallback обрабатывает menu_top", async () => {
    const { menuCallback } = await import("./menu");
    const ctx = {
      callbackQuery: { data: "menu_top" },
      answerCbQuery: vi.fn(),
      deleteMessage: vi.fn(),
      chat: { id: 123 },
      reply: vi.fn(),
    } as any;
    await menuCallback(ctx, ["menu_top"]);
    expect(sendTopPeriodKeyboard).toHaveBeenCalledWith(ctx, 123);
  });

  it("menuCallback обрабатывает menu_help", async () => {
    const { menuCallback } = await import("./menu");
    const ctx = {
      callbackQuery: { data: "menu_help" },
      answerCbQuery: vi.fn(),
      deleteMessage: vi.fn(),
      chat: { id: 123 },
      reply: vi.fn(),
    } as any;
    await menuCallback(ctx, ["menu_help"]);
    expect(sendHelpMessage).toHaveBeenCalledWith(ctx);
  });
});
