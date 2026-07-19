import { vi, describe, it, expect } from "vitest";
import { Telegraf } from "telegraf";

vi.mock("./stats", () => ({ statsCallback: vi.fn() }));
vi.mock("./top", () => ({ topCallback: vi.fn() }));

describe("registerCallbacks", () => {
  it("регистрирует обработчики для stats и top", async () => {
    const { registerCallbacks } = await import("./callbacks");
    const bot = new Telegraf("test");
    const actionSpy = vi.spyOn(bot, "action");
    registerCallbacks(bot);
    expect(actionSpy).toHaveBeenCalledTimes(2);
  });
});
