import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../handlers", () => ({
  sendStats: vi.fn(),
}));

vi.mock("./utils", () => ({
  deleteSourceMessage: vi.fn(),
  handleCallbackError: vi.fn(),
  parseFilter: vi.fn(),
}));

import { sendStats } from "../handlers";

import { parseFilter, deleteSourceMessage, handleCallbackError } from "./utils";

describe("statsCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("вызывает sendStats с корректным фильтром", async () => {
    parseFilter.mockReturnValue("all");
    const ctx = {
      answerCbQuery: vi.fn(),
      chat: { id: 123 },
    } as any;
    const { statsCallback } = await import("./stats");
    await statsCallback(ctx, ["stats_all", "all"]);
    expect(parseFilter).toHaveBeenCalledWith("all");
    expect(sendStats).toHaveBeenCalledWith(ctx, 123, "all");
  });

  it("отвечает cbQuery если фильтр неизвестен", async () => {
    parseFilter.mockReturnValue(undefined);
    const ctx = {
      answerCbQuery: vi.fn(),
      chat: { id: 123 },
    } as any;
    const { statsCallback } = await import("./stats");
    await statsCallback(ctx, ["stats_unknown", "unknown"]);
    expect(ctx.answerCbQuery).toHaveBeenCalledWith("Неизвестный фильтр");
  });

  it("обрабатывает ошибку через handleCallbackError", async () => {
    parseFilter.mockReturnValue("all");
    sendStats.mockRejectedValue(new Error("test error"));
    const ctx = {
      answerCbQuery: vi.fn(),
      chat: { id: 123 },
    } as any;
    const { statsCallback } = await import("./stats");
    await statsCallback(ctx, ["stats_all", "all"]);
    expect(handleCallbackError).toHaveBeenCalled();
  });
});
