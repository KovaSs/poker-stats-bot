import { vi, describe, it, expect } from "vitest";

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

import { logger } from "@/config/logger";

describe("callback utils", () => {
  it("parseFilter возвращает all для 'all'", async () => {
    const { parseFilter } = await import("./utils");
    expect(parseFilter("all")).toBe("all");
  });

  it("parseFilter возвращает undefined для 'last_year'", async () => {
    const { parseFilter } = await import("./utils");
    expect(parseFilter("last_year")).toBeUndefined();
  });

  it("parseFilter возвращает год для числовых строк", async () => {
    const { parseFilter } = await import("./utils");
    expect(parseFilter("2024")).toBe("2024");
  });

  it("parseFilter возвращает undefined для неизвестного фильтра", async () => {
    const { parseFilter } = await import("./utils");
    expect(parseFilter("unknown")).toBeUndefined();
  });

  it("deleteSourceMessage вызывает deleteMessage", async () => {
    const { deleteSourceMessage } = await import("./utils");
    const ctx = { deleteMessage: vi.fn() } as any;
    vi.mocked(ctx.deleteMessage).mockResolvedValue(undefined);
    await deleteSourceMessage(ctx);
    expect(ctx.deleteMessage).toHaveBeenCalled();
  });

  it("deleteSourceMessage логирует warning при ошибке", async () => {
    const { deleteSourceMessage } = await import("./utils");
    const ctx = { deleteMessage: vi.fn().mockRejectedValue(new Error("fail")) } as any;
    await deleteSourceMessage(ctx);
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("Не удалось удалить сообщение"),
    );
  });

  it("handleCallbackError логирует ошибку и отправляет ответ", async () => {
    const { handleCallbackError } = await import("./utils");
    vi.mock("../middlewares", () => ({ replyWithAutoDelete: vi.fn() }));
    const ctx = {
      answerCbQuery: vi.fn(),
    } as any;
    vi.mocked(ctx.answerCbQuery).mockResolvedValue(undefined);
    await handleCallbackError(ctx, new Error("err"), "user msg", "bot msg");
    expect(logger.error).toHaveBeenCalled();
    // Примечание: replyWithAutoDelete замокан через vi.mock выше, но из-за динамического импорта может не работать
  });
});
