import { vi, describe, it, expect, beforeEach } from "vitest";
import { Context } from "telegraf";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";

import * as game from "./game";

vi.mock("@/services", () => ({
  GameService: {
    createGame: vi.fn(),
    addTransactions: vi.fn(),
    updateGame: vi.fn(),
    deleteGame: vi.fn(),
  },
  ParserService: {
    parseTransactions: vi.fn(),
    extractGameDateFromText: vi.fn(),
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
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

function createMockContext(overrides: Partial<any> = {}): any {
  return {
    chat: { id: 12345 },
    from: { id: 67890, username: "testuser" },
    message: {
      message_id: 999,
      text: "",
      entities: [],
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
    telegram: {
      editMessageText: vi.fn(),
      deleteMessage: vi.fn(),
    },
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
          message_id: 111,
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2025-02-16",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "User", amount: 500, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(42);
      (GameService.addTransactions as any).mockReturnValue(1);

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

    it("обрабатывает обычный текст без упоминания (plain data)", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 222,
          text: "Вход:\n+300 | Player\nВыход:\n+200 | Player2",
          entities: [],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(null);
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "Player", amount: 300, type: "in" },
        { username: "Player2", amount: 200, type: "out" },
      ]);
      (GameService.createGame as any).mockReturnValue(99);
      (GameService.addTransactions as any).mockReturnValue(2);

      await game.textHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        222,
        expect.any(String),
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(
        99,
        expect.any(Array),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от"),
      );
    });

    it("удаляет игру, если транзакции не добавлены", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 333,
          text: "Вход:\n+500 | User",
          entities: [],
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "User", amount: 500, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(55);
      (GameService.addTransactions as any).mockReturnValue(0);

      await game.textHandler(ctx as Context);

      expect(GameService.deleteGame).toHaveBeenCalledWith(12345, 333);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "⚠️ Не удалось добавить транзакции. Игра удалена.",
      );
    });

    it("отвечает сообщением об отсутствии транзакций", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 444,
          text: "Просто текст",
          entities: [],
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([]);

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
          message_id: 555,
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      const testError = new Error("Test error");
      (ParserService.extractGameDateFromText as any).mockImplementation(() => {
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
          message_id: 555,
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2026-03-20",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "PhotoUser", amount: 1000, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(77);
      (GameService.addTransactions as any).mockReturnValue(1);

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
          message_id: 666,
          caption: "Просто текст",
          caption_entities: [],
        },
      });

      await game.photoHandler(ctx as Context);

      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 777,
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      const testError = new Error("Photo processing error");
      (ParserService.extractGameDateFromText as any).mockImplementation(() => {
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
        id: 10,
        chat_id: 12345,
        message_id: 777,
        game_date: "2026-01-01",
      };
      (GameRepository.findByChatAndMessage as any).mockReturnValue(gameRow);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 777,
          text: "game 15.02.2026\nВход:\n+300 | Editor",
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2026-02-15",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "Editor", amount: 300, type: "in" },
      ]);
      (GameService.updateGame as any).mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.updateGame).toHaveBeenCalledWith(10, "2026-02-15", [
        { username: "Editor", amount: 300, type: "in" },
      ]);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✏️ Игра от 2026-02-15 обновлена"),
      );
    });

    it("создаёт новую игру, если игра не найдена", async () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 888,
          text: "Вход:\n+400 | NewUser",
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "NewUser", amount: 400, type: "in" },
      ]);
      (ParserService.extractGameDateFromText as any).mockReturnValue(null);
      (GameService.createGame as any).mockReturnValue(11);
      (GameService.addTransactions as any).mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        888,
        expect.any(String),
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(
        11,
        expect.any(Array),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от"),
      );
    });

    it("игнорирует редактирование без транзакций", async () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 999,
          text: "Обычное редактирование",
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([]);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 1000,
          text: "game 15.02.2026\nВход:\n+300 | Editor",
        },
      });
      const testError = new Error("Edit processing error");
      (GameRepository.findByChatAndMessage as any).mockImplementation(() => {
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
