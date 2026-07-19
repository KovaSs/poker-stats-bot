import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../handlers", () => ({
  sendTop: vi.fn(),
}));

vi.mock("./utils", () => ({
  deleteSourceMessage: vi.fn(),
  handleCallbackError: vi.fn(),
  parseFilter: vi.fn(),
}));

import { sendTop } from "../handlers";

import { parseFilter, handleCallbackError } from "./utils";

describe("topCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("вызывает sendTop с корректным фильтром", async () => {
    parseFilter.mockReturnValue("2024");
    const ctx = { answerCbQuery: vi.fn(), chat: { id: 123 } } as any;
    const { topCallback } = await import("./top");
    await topCallback(ctx, ["top_2024", "2024"]);
    expect(sendTop).toHaveBeenCalledWith(ctx, 123, "2024");
  });

  it("отвечает cbQuery если фильтр неизвестен", async () => {
    parseFilter.mockReturnValue(undefined);
    const ctx = { answerCbQuery: vi.fn(), chat: { id: 123 } } as any;
    const { topCallback } = await import("./top");
    await topCallback(ctx, ["top_x", "x"]);
    expect(ctx.answerCbQuery).toHaveBeenCalledWith("Неизвестный фильтр");
  });

  it("обрабатывает ошибку через handleCallbackError", async () => {
    parseFilter.mockReturnValue("all");
    sendTop.mockRejectedValue(new Error("error"));
    const ctx = { answerCbQuery: vi.fn(), chat: { id: 123 } } as any;
    const { topCallback } = await import("./top");
    await topCallback(ctx, ["top_all", "all"]);
    expect(handleCallbackError).toHaveBeenCalled();
  });
});
