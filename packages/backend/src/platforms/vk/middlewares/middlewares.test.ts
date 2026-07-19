import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

vi.mock("@/config/env", () => ({
  VK_COMMUNITY_CHAT_ID: null,
  VK_ACCESS_TOKEN: "",
  BOT_TOKEN: "test",
  VK_GROUP_ID: "",
}));

import { logger } from "@/config/logger";

import { scheduleAutoDelete } from "./middlewares";

const mockLogger = logger as { info: ReturnType<typeof vi.fn>; warn: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn> };

describe("scheduleAutoDelete", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("выполняет deleteFn через указанную задержку", async () => {
    const deleteFn = vi.fn().mockResolvedValue(undefined);
    scheduleAutoDelete(deleteFn, "test", 5000);

    expect(deleteFn).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(5000);

    expect(deleteFn).toHaveBeenCalledTimes(1);
  });

  it("использует задержку по умолчанию 30000мс", async () => {
    const deleteFn = vi.fn().mockResolvedValue(undefined);
    scheduleAutoDelete(deleteFn, "test");

    await vi.advanceTimersByTimeAsync(30000);

    expect(deleteFn).toHaveBeenCalledTimes(1);
  });

  it("логирует успешное удаление", async () => {
    const deleteFn = vi.fn().mockResolvedValue(undefined);
    scheduleAutoDelete(deleteFn, "test message");
    await vi.runAllTimersAsync();

    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.stringContaining("Автоудаление: test message"),
    );
  });

  it("логирует warning при code 27", async () => {
    const deleteFn = vi.fn().mockRejectedValue({ code: 27 });
    scheduleAutoDelete(deleteFn, "test");
    await vi.runAllTimersAsync();

    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining("недоступно для group auth"),
    );
  });

  it("логирует error при других ошибках", async () => {
    const deleteFn = vi.fn().mockRejectedValue(new Error("network error"));
    scheduleAutoDelete(deleteFn, "test");
    await vi.runAllTimersAsync();

    expect(mockLogger.error).toHaveBeenCalledWith(
      expect.stringContaining("Ошибка автоудаления"),
    );
  });
});
