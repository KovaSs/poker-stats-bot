import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/config/env", () => ({
  VK_ACCESS_TOKEN: "test_token",
  VK_COMMUNITY_CHAT_ID: null,
  VK_GROUP_ID: "club123",
  TELEGRAM_API_URL: "",
  BOT_TOKEN: "test",
  FRONTEND_URL: "",
  API_PORT: 3000,
}));

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

vi.mock("./middlewares", () => ({
  scheduleAutoDelete: vi.fn(),
}));

vi.mock("./menu", () => ({
  buildMenuKeyboard: vi.fn().mockReturnValue("{}"),
}));

vi.mock("./handlers/message", () => ({
  handleVKMessage: vi.fn(),
}));

describe("initVKPlatform", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("логирует предупреждение если токен не задан", async () => {
    vi.mock("@/config/env", () => ({
      VK_ACCESS_TOKEN: "",
      BOT_TOKEN: "test",
      VK_GROUP_ID: "",
      API_PORT: 3000,
    }));
    const { logger } = await import("@/config/logger");
    const { initVKPlatform } = await import("./bot");
    await initVKPlatform();
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("VK_ACCESS_TOKEN не задан"),
    );
  });

  it("возвращает null из getVK до инициализации", async () => {
    const { getVK } = await import("./bot");
    expect(getVK()).toBeNull();
  });
});
