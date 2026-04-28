import { vi, describe, it, expect, beforeEach } from "vitest";
import { Context } from "telegraf";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";

import * as game from "./game";

vi.mock("@/services", () => ({
  GameService: {
    addTransactions: vi.fn(),
    createGame: vi.fn(),
    updateGame: vi.fn(),
    deleteGame: vi.fn(),
  },
  ParserService: {
    extractGameDateFromText: vi.fn(),
    parseTransactions: vi.fn(),
  },
  StatsService: {
    recalcStats: vi.fn(),
  },
}));

vi.mock("@/db/repositories", () => ({
  GameRepository: {
    findByChatAndMessage: vi.fn(),
  },
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
      ParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
      ParserService.parseTransactions.mockReturnValue([
        { username: "User", amount: 500, type: "in" },
      ]);
      GameService.createGame.mockReturnValue(42);
      GameService.addTransactions.mockReturnValue(1);

      await game.textHandler(ctx as Context);

      expect(ParserService.extractGameDateFromText).toHaveBeenCalled();
      expect(ParserService.parseTransactions).toHaveBeenCalled();
      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        111,
        "2025-02-16",
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(42, [
        { username: "User", amount: 500, type: "in" },
      ]);
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

      // Проверяем, что никакие сервисы не вызывались и ответ не отправлялся
      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
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

      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("отвечает сообщением об отсутствии транзакций при упоминании и game", async () => {
      const ctx = createMockContext({
        message: {
          entities: [{ type: "mention", offset: 0, length: 8 }],
          text: "@testbot game 16.02.2025\nПросто текст",
          message_id: 444,
        },
      });
      ParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
      ParserService.parseTransactions.mockReturnValue([]);

      await game.textHandler(ctx as Context);

      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Не найдено ни одной корректной записи"),
      );
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
      ParserService.extractGameDateFromText.mockImplementation(() => {
        throw testError;
      });

      await game.textHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] textHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке сообщения.",
      );
      expect(GameService.createGame).not.toHaveBeenCalled();
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
      ParserService.extractGameDateFromText.mockReturnValue("2026-03-20");
      ParserService.parseTransactions.mockReturnValue([
        { username: "PhotoUser", amount: 1000, type: "in" },
      ]);
      GameService.createGame.mockReturnValue(77);
      GameService.addTransactions.mockReturnValue(1);

      await game.photoHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        555,
        "2026-03-20",
      );
      expect(GameService.addTransactions).toHaveBeenCalled();
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

      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
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

      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
          message_id: 777,
        },
      });
      const testError = new Error("Photo processing error");
      ParserService.extractGameDateFromText.mockImplementation(() => {
        throw testError;
      });

      await game.photoHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] photoHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке фотографии.",
      );
      expect(GameService.createGame).not.toHaveBeenCalled();
    });
  });

  describe("editedMessageHandler", () => {
    it("обновляет существующую игру", async () => {
      const gameRow = {
        game_date: "2026-01-01",
        message_id: 777,
        chat_id: 12345,
        id: 10,
      };
      GameRepository.findByChatAndMessage.mockReturnValue(gameRow);
      const ctx = createMockContext({
        editedMessage: {
          text: "game 15.02.2026\nВход:\n+300 | Editor",
          chat: { id: 12345 },
          message_id: 777,
        },
      });
      ParserService.extractGameDateFromText.mockReturnValue("2026-02-15");
      ParserService.parseTransactions.mockReturnValue([
        { username: "Editor", amount: 300, type: "in" },
      ]);
      GameService.updateGame.mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.updateGame).toHaveBeenCalledWith(10, "2026-02-15", [
        { username: "Editor", amount: 300, type: "in" },
      ]);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✏️ Игра от 2026-02-15 обновлена"),
      );
    });

    it("создаёт новую игру при упоминании бота и game", async () => {
      GameRepository.findByChatAndMessage.mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          text: "@testbot game 16.02.2025\nВход:\n+400 | NewUser",
          entities: [{ type: "mention", offset: 0, length: 8 }],
          chat: { id: 12345 },
          message_id: 888,
        },
      });
      ParserService.parseTransactions.mockReturnValue([
        { username: "NewUser", amount: 400, type: "in" },
      ]);
      ParserService.extractGameDateFromText.mockReturnValue("2025-02-16");
      GameService.createGame.mockReturnValue(11);
      GameService.addTransactions.mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        888,
        "2025-02-16",
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(
        11,
        expect.any(Array),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от 2025-02-16 успешно создана"),
      );
    });

    it("игнорирует редактирование без упоминания бота (не plain data)", async () => {
      GameRepository.findByChatAndMessage.mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          text: "Вход:\n+300 | NoMention",
          chat: { id: 12345 },
          message_id: 999,
          entities: [],
        },
      });

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
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
      const testError = new Error("Edit processing error");
      GameRepository.findByChatAndMessage.mockImplementation(() => {
        throw testError;
      });

      await game.editedMessageHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] editedMessageHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке редактирования.",
      );
      expect(GameService.updateGame).not.toHaveBeenCalled();
    });
  });
});
