import { Context } from "telegraf";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";

export const textHandler = async (ctx: Context) => {
  try {
    const msg = ctx.message as any;
    const text = msg.text || msg.caption;
    if (!text) return;

    const botUsername = ctx.botInfo.username;
    const entities = msg.entities || [];
    let mentioned = false;
    for (const entity of entities) {
      if (entity.type === "mention") {
        const mention = text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        if (mention === `@${botUsername}`) {
          mentioned = true;
          break;
        }
      }
    }

    if (!mentioned || !text.includes("game")) return;

    await deleteCommandMessage(ctx);

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);

    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");
    const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);

    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) {
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
      );
      return;
    }

    const gameId = GameService.createGame(
      ctx.chat!.id,
      ctx.message!.message_id,
      gameDate,
    );
    const savedCount = GameService.addTransactions(gameId, transactions);

    if (savedCount > 0) {
      await replyWithAutoDelete(
        ctx,
        `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
      );
    } else {
      GameService.deleteGame(ctx.chat!.id, ctx.message!.message_id);
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не удалось добавить транзакции. Игра удалена.",
      );
    }
  } catch (error) {
    logger.error(`[ERROR] textHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке сообщения.",
    );
  }
};

export const photoHandler = async (ctx: Context) => {
  try {
    const caption = (ctx.message as any)?.caption;
    if (!caption) return;

    const text = caption;
    const botUsername = ctx.botInfo.username;
    const entities = (ctx.message as any).caption_entities || [];
    let mentioned = false;
    for (const entity of entities) {
      if (entity.type === "mention") {
        const mention = text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        if (mention === `@${botUsername}`) {
          mentioned = true;
          break;
        }
      }
    }

    if (!mentioned || !text.includes("game")) return;

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);
    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");
    const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) {
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
      );
      return;
    }

    const gameId = GameService.createGame(
      ctx.chat!.id,
      ctx.message!.message_id,
      gameDate,
    );
    const savedCount = GameService.addTransactions(gameId, transactions);
    await replyWithAutoDelete(
      ctx,
      `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
    );
  } catch (error) {
    logger.error(`[ERROR] photoHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке фотографии.",
    );
  }
};

export const editedMessageHandler = async (ctx: Context) => {
  try {
    const editedMessage = ctx.editedMessage as any;
    if (!editedMessage) return;

    const chatId = editedMessage.chat.id;
    const messageId = editedMessage.message_id;
    const text = editedMessage.text || editedMessage.caption || "";
    const entities =
      editedMessage.entities || editedMessage.caption_entities || [];

    // 1. Проверяем, существует ли уже игра для этого сообщения
    const game = GameRepository.findByChatAndMessage(chatId, messageId);
    if (game) {
      // Обновление существующей игры
      const newDate =
        ParserService.extractGameDateFromText(text) ||
        new Date().toISOString().slice(0, 10);
      const lines = text
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");
      const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
      const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
      const transactions = ParserService.parseTransactions(dataLines);
      const savedCount = GameService.updateGame(game.id, newDate, transactions);
      await replyWithAutoDelete(
        ctx,
        `✏️ Игра от ${newDate} обновлена. Добавлено записей: ${savedCount}`,
      );
      return;
    }

    // 2. Игра не найдена – проверяем, является ли сообщение явной командой с упоминанием бота
    const botUsername = ctx.botInfo.username;
    let mentioned = false;
    for (const entity of entities) {
      if (entity.type === "mention") {
        const mention = text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        if (mention === `@${botUsername}`) {
          mentioned = true;
          break;
        }
      }
    }

    const isGameCommand = mentioned && text.includes("game");

    if (!isGameCommand) {
      // Сообщение не является явной командой — игнорируем
      return;
    }

    // 3. Парсим транзакции и создаём новую игру
    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");
    const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) return;

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);
    const newGameId = GameService.createGame(chatId, messageId, gameDate);
    const savedCount = GameService.addTransactions(newGameId, transactions);
    await replyWithAutoDelete(
      ctx,
      `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
    );
  } catch (error) {
    logger.error(
      `[ERROR] editedMessageHandler: ${JSON.stringify(error, null, 2)}`,
    );
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке редактирования.",
    );
  }
};
