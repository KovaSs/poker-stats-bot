import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

import { logger } from "@/config/logger";

describe("telegram middlewares", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deleteCommandMessage удаляет сообщение", async () => {
    const { deleteCommandMessage } = await import("./middlewares");
    const ctx = {
      deleteMessage: vi.fn().mockResolvedValue(undefined),
      message: { message_id: 123 },
    } as any;
    await deleteCommandMessage(ctx);
    expect(ctx.deleteMessage).toHaveBeenCalledWith(123);
  });

  it("deleteCommandMessage логирует ошибку при неудаче", async () => {
    const { deleteCommandMessage } = await import("./middlewares");
    const ctx = {
      deleteMessage: vi.fn().mockRejectedValue(new Error("fail")),
      message: { message_id: 123 },
    } as any;
    await deleteCommandMessage(ctx);
    expect(logger.error).toHaveBeenCalled();
  });

  it("replyWithAutoDelete отправляет и планирует удаление", async () => {
    const { replyWithAutoDelete } = await import("./middlewares");
    const ctx = {
      telegram: { deleteMessage: vi.fn().mockResolvedValue(undefined) },
      reply: vi.fn().mockResolvedValue({ message_id: 789 }),
      chat: { id: 456 },
    } as any;
    const result = await replyWithAutoDelete(ctx, "test reply");
    expect(ctx.reply).toHaveBeenCalledWith("test reply", undefined);
    expect(result).toEqual({ message_id: 789 });
  });

  it("replyWithAutoDelete удаляет сообщение через delay", async () => {
    const { replyWithAutoDelete } = await import("./middlewares");
    const deleteMessage = vi.fn().mockResolvedValue(undefined);
    const ctx = {
      reply: vi.fn().mockResolvedValue({ message_id: 789 }),
      telegram: { deleteMessage },
      chat: { id: 456 },
    } as any;
    await replyWithAutoDelete(ctx, "test", undefined, 1000);
    expect(deleteMessage).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1000);
    expect(deleteMessage).toHaveBeenCalledWith(456, 789);
  });

  it("errorHandler логирует и отправляет сообщение", async () => {
    const { errorHandler } = await import("./middlewares");
    const ctx = {
      reply: vi.fn(),
    } as any;
    await errorHandler(new Error("bot error"), ctx);
    expect(logger.error).toHaveBeenCalled();
    expect(ctx.reply).toHaveBeenCalled();
  });
});
