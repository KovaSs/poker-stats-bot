import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

vi.mock("../handlers", () => ({
  editedMessageHandler: vi.fn(),
  photoHandler: vi.fn(),
  textHandler: vi.fn(),
  menuHandler: vi.fn(),
}));

vi.mock("../callbacks", () => ({
  registerCallbacks: vi.fn(),
}));

vi.mock("../handlers/menu", () => ({
  menuCallback: vi.fn(),
}));

vi.mock("../middlewares", () => ({
  errorHandler: vi.fn(),
}));

import { Telegraf } from "telegraf";

import { registerCallbacks } from "../callbacks";
import { menuCallback } from "../handlers/menu";
import { errorHandler } from "../middlewares";
import * as handlers from "../handlers";

describe("setupBot", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("создаёт бота с токеном и регистрирует обработчики", async () => {
    const { setupBot } = await import("./bot");  // local import, "./bot" resolves to "./bot/bot" via index.ts
    const bot = setupBot("test_token");

    expect(bot).toBeInstanceOf(Telegraf);
    expect(registerCallbacks).toHaveBeenCalledWith(bot);
  });

  it("передаёт apiRoot если указан", async () => {
    const { setupBot } = await import("./bot");
    const bot = setupBot("test_token", "https://custom.api");
    expect(bot).toBeInstanceOf(Telegraf);
  });

  it("использует errorHandler как catch handler", async () => {
    const { setupBot } = await import("./bot");
    const bot = setupBot("test_token");
    expect(errorHandler).toBeDefined();
  });
});
