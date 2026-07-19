import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import type { IMessage, ProcessedGameResult } from "./types";

const GAME_TRIGGER = "game";

export async function processGameMessage(
  message: IMessage,
): Promise<ProcessedGameResult> {
  try {
    const text = message.text;
    if (!text.includes(GAME_TRIGGER)) {
      return { reply: null, ok: false };
    }

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);

    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");

    const cmdIndex = lines.findIndex((l: string) => l.includes(GAME_TRIGGER));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);

    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) {
      logger.info(`[GameProcessor] Нет корректных записей (chat=${message.chatId})`);
      return {
        reply: "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
        ok: false,
      };
    }

    // Для VK group chat message_edit может не приходить — проверяем
    // существование игры перед созданием новой
    const existingGame = GameRepository.findByChatAndMessage(
      message.chatId,
      message.messageId,
    );

    if (existingGame) {
      const savedCount = GameService.updateGame(
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

    const gameId = GameService.createGame(
      message.chatId,
      message.messageId,
      gameDate,
      message.platform,
    );
    const savedCount = GameService.addTransactions(gameId, transactions);

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

    GameService.deleteGame(message.chatId, message.messageId);
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
