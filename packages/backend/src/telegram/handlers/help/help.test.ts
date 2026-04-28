import { vi, describe, it, expect } from "vitest";
import { Context } from "telegraf";

import * as middlewares from "../../middlewares";

import { sendHelpMessage } from "./help";

vi.mock("../../middlewares", () => ({
  replyWithAutoDelete: vi.fn(),
}));

describe("sendHelpMessage", () => {
  it("отправляет справку с Markdown", async () => {
    const ctx = {
      telegram: { sendMessage: vi.fn() },
      chat: { id: 123 },
    };
    await sendHelpMessage(ctx as Context);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      expect.stringContaining("📚 **Список доступных команд:**"),
      { parse_mode: "Markdown" },
    );
  });
});
