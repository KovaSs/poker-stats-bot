import { inject, injectable } from "tsyringe";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import type { IMessage, ProcessedGameResult } from "../types";

const GAME_TRIGGER = "game";

@injectable()
export class GameProcessor {
  constructor(
    @inject(GameService) private readonly gameService: GameService,
    @inject(ParserService) private readonly parserService: ParserService,
    @inject(GameRepository) private readonly gameRepository: GameRepository,
  ) {}

  async processGameMessage(
    message: IMessage,
  ): Promise<ProcessedGameResult> {
    try {
      const text = message.text;
      if (!text.includes(GAME_TRIGGER)) {
        return { reply: null, ok: false };
      }

      const gameDate =
        this.parserService.extractGameDateFromText(text) ||
        new Date().toISOString().slice(0, 10);

      const lines = text
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");

      const cmdIndex = lines.findIndex((l: string) => l.includes(GAME_TRIGGER));
      const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);

      const transactions = this.parserService.parseTransactions(dataLines);
      if (transactions.length === 0) {
        logger.info(`[GameProcessor] Нет корректных записей (chat=${message.chatId})`);
        return {
          reply: "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
          ok: false,
        };
      }

      const existingGame = this.gameRepository.findByChatAndMessage(
        message.chatId,
        message.messageId,
      );

      if (existingGame) {
        const savedCount = this.gameService.updateGame(
          existingGame.id,
          gameDate,
          transactions,
        );
        logger.info(
          `[GameProcessor] Игра ${existingGame.id} обновлена (${message.isEdited ? "edit" : "new"}), записей: ${savedCount}`,
        );
        return {
          reply: `✏️ Игра от ${gameDate} обновлена. Добавлено записей: ${savedCount}`,
          gameId: existingGame.id,
          ok: true,
        };
      }

      if (message.isEdited) {
        if (!text.includes(GAME_TRIGGER)) {
          return { reply: null, ok: false };
        }
      }

      const gameId = this.gameService.createGame(
        message.chatId,
        message.messageId,
        gameDate,
        message.platform,
      );
      const savedCount = this.gameService.addTransactions(gameId, transactions, message.platform, message.chatId);

      if (savedCount > 0) {
        logger.info(
          `[GameProcessor] Игра ${gameId} создана, записей: ${savedCount}`,
        );
        return {
          reply: `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
          ok: true,
          gameId,
        };
      }

      this.gameService.deleteGame(message.chatId, message.messageId);
      return {
        reply: "⚠️ Не удалось добавить транзакции. Игра удалена.",
        ok: false,
      };
    } catch (error) {
      logger.error(
        `[GameProcessor] Ошибка: ${JSON.stringify(error, null, 2)}`,
      );
      return {
        reply: "❌ Произошла ошибка при обработке сообщения.",
        ok: false,
      };
    }
  }
}
