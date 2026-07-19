import { vi, describe, it, expect, beforeEach } from "vitest";
import { Context } from "telegraf";

import { processGameMessage } from "@/core";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";

import * as game from "./game";

vi.mock("@/core", () => ({
  processGameMessage: vi.fn(),
}));

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

vi.mock("@/config/logger", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

function createMockContext(overrides = {}) {
  return {
    telegram: {
      editMessageText: vi.fn(),
      deleteMessage: vi.fn(),
    },
    message: {
      message_id: 999,
      entities: [],
      text: "",
    },
    from: { username: "testuser", id: 67890 },
    botInfo: { username: "testbot" },
    deleteMessage: vi.fn(),
    chat: { id: 12345 },
    reply: vi.fn(),
    ...overrides,
  };
}

describe("game handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("textHandler", () => {
    it("создаёт игру по тексту с упоминанием бота и командой game", async () => {
      const ctx = createMockContext({
        message: {
          entities: [{ type: "mention", offset: 0, length: 8 }],
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          message_id: 111,
        },
      });
      (processGameMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
        reply: "✅ Игра от 2025-02-16 успешно создана. Добавлено записей: 1",
        ok: true,
      });

      await game.textHandler(ctx as Context);

      expect(processGameMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining("game"),
          platform: "telegram",
          messageId: 111,
          chatId: 12345,
        }),
      );
      expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от 2025-02-16 успешно создана"),
      );
    });

    it("игнорирует обычный текст без упоминания бота", async () => {
      const ctx = createMockContext({
        message: {
          text: "Вход:\n+300 | Player",
          message_id: 222,
          entities: [],
        },
      });

      await game.textHandler(ctx as Context);

      expect(processGameMessage).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("игнорирует сообщение с упоминанием, но без слова game", async () => {
      const ctx = createMockContext({
        message: {
          entities: [{ type: "mention", offset: 0, length: 8 }],
          text: "@testbot привет",
          message_id: 333,
        },
      });

      await game.textHandler(ctx as Context);

      expect(processGameMessage).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          entities: [{ type: "mention", offset: 0, length: 8 }],
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          message_id: 555,
        },
      });
      const testError = new Error("Test error");
      (processGameMessage as ReturnType<typeof vi.fn>).mockRejectedValue(
        testError,
      );

      await game.textHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] textHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке сообщения.",
      );
    });
  });

  describe("photoHandler", () => {
    it("обрабатывает фото с подписью, содержащей упоминание бота и game", async () => {
      const ctx = createMockContext({
        message: {
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
          message_id: 555,
        },
      });
      (processGameMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
        reply: "✅ Игра от 2026-03-20 успешно создана. Добавлено записей: 1",
        ok: true,
      });

      await game.photoHandler(ctx as Context);

      expect(processGameMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining("game"),
          platform: "telegram",
          chatId: 12345,
        }),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от 2026-03-20 успешно создана"),
      );
    });

    it("игнорирует фото без упоминания бота", async () => {
      const ctx = createMockContext({
        message: {
          caption: "Просто текст",
          caption_entities: [],
          message_id: 666,
        },
      });

      await game.photoHandler(ctx as Context);

      expect(processGameMessage).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("игнорирует фото с упоминанием, но без game", async () => {
      const ctx = createMockContext({
        message: {
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
          caption: "@testbot красивое фото",
          message_id: 667,
        },
      });

      await game.photoHandler(ctx as Context);

      expect(processGameMessage).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
          message_id: 777,
        },
      });
      (processGameMessage as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error("Photo processing error"),
      );

      await game.photoHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] photoHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке фотографии.",
      );
    });
  });

  describe("editedMessageHandler", () => {
    it("передаёт сообщение в processGameMessage с isEdited=true", async () => {
      (processGameMessage as ReturnType<typeof vi.fn>).mockResolvedValue({
        reply: "✏️ Игра от 2026-02-15 обновлена. Добавлено записей: 1",
        ok: true,
      });
      const ctx = createMockContext({
        editedMessage: {
          text: "game 15.02.2026\nВход:\n+300 | Editor",
          chat: { id: 12345 },
          message_id: 777,
          entities: [],
        },
      });

      await game.editedMessageHandler(ctx as Context);

      expect(processGameMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          text: expect.stringContaining("game"),
          platform: "telegram",
          messageId: 777,
          isEdited: true,
          chatId: 12345,
        }),
      );
    });

    it("игнорирует редактирование без chat", async () => {
      const ctx = createMockContext({
        editedMessage: {
          text: "game 15.02.2026\nВход:\n+300 | Editor",
          message_id: 777,
        },
      });

      await game.editedMessageHandler(ctx as Context);

      expect(processGameMessage).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        editedMessage: {
          text: "@testbot game 15.02.2026\nВход:\n+300 | Editor",
          entities: [{ type: "mention", offset: 0, length: 8 }],
          chat: { id: 12345 },
          message_id: 1000,
        },
      });
      (processGameMessage as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error("Edit processing error"),
      );

      await game.editedMessageHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] editedMessageHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке редактирования.",
      );
    });
  });
});
