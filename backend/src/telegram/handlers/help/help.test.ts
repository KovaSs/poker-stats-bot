import { vi, describe, it, expect } from "vitest";

import type { CommandContext } from "@/types/telegram";

import * as middlewares from "../../middlewares";

import * as help from "./help";

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

function createMockContext(): any {
  return {
    from: { id: 67890, username: "testuser" },
    chat: { id: 12345 },
    message: {
      message_id: 999,
      text: "/help",
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
  };
}

describe("helpHandler", () => {
  it("отправляет справку", async () => {
    const ctx = createMockContext();

    await help.helpHandler(ctx as CommandContext);

    expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      expect.stringContaining("Список доступных команд"),
      { parse_mode: "Markdown" },
    );
  });
});
