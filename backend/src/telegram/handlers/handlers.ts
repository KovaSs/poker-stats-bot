import { Context } from "telegraf";

import { StatsService, GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../middlewares";

import type { CommandContext } from "@/types/telegram";

function escapeMarkdown(text: string): string {
  // Экранируем символы, имеющие специальное значение в Markdown
  const specialChars = /[_*[\]()~`>#+\-=|{}.!]/g;
  return text.replace(specialChars, "\\$&");
}

export const statsHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /stats вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  try {
    const args = ctx.message.text.split(" ").slice(1);
    let filter: string | undefined = undefined;
    if (args.length > 0) {
      const arg = args[0].toLowerCase();
      if (arg === "all" || /^\d{4}$/.test(arg)) {
        filter = arg;
      } else {
        await replyWithAutoDelete(
          ctx,
          "❌ Неверный формат. Используйте `/stats all`, `/stats 2024` или просто `/stats` для последнего года.",
        );
        return;
      }
    }

    const chatId = ctx.chat!.id;
    const stats = StatsService.getFilteredStats(chatId, filter);
    if (stats.length === 0) {
      await replyWithAutoDelete(ctx, "📊 Пока нет данных за указанный период.");
      return;
    }

    let message = "📊 Статистика участников";
    if (filter === "all") message += " (всё время)";
    else if (filter) message += ` (${filter} год)`;
    else message += " (последний год)";
    message += ":\n```\n";
    message += "№    Участник           Игр    Вход    Выход   Разница\n";
    message += "-------------------------------------------------------\n";

    stats.slice(0, 30).forEach((item, index) => {
      const num = (index + 1).toString().padEnd(4);
      const username = item.username.padEnd(18);
      const gamesCount = item.games_count.toString().padStart(4);
      const totalIn = item.total_in.toString().padStart(6);
      const totalOut = item.total_out.toString().padStart(6);
      const diff = item.total_out - item.total_in;
      const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
      message += `${num} ${username} ${gamesCount} ${totalIn} ${totalOut} ${diffStr.padStart(7)}\n`;
    });
    message += "```";
    await replyWithAutoDelete(ctx, message, { parse_mode: "Markdown" });
  } catch (error) {
    logger.error(`[ERROR] /stats: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
  }
};

export const topHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /top вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  try {
    const args = ctx.message.text.split(" ").slice(1);
    let filter: string | undefined = undefined;
    if (args.length > 0) {
      const arg = args[0].toLowerCase();
      if (arg === "all" || /^\d{4}$/.test(arg)) {
        filter = arg;
      } else {
        await replyWithAutoDelete(
          ctx,
          "❌ Неверный формат. Используйте `/top all`, `/top 2024` или просто `/top` для последнего года.",
        );
        return;
      }
    }

    const chatId = ctx.chat!.id;
    const scores = StatsService.getFilteredScores(chatId, filter);
    if (scores.length === 0) {
      await replyWithAutoDelete(ctx, "📊 Пока нет данных за указанный период.");
      return;
    }

    let title = "🏆 Топ участников";
    if (filter === "all") title += " (всё время)";
    else if (filter) title += ` (${filter} год)`;
    else title += " (последний год)";
    title += ":\n";

    const top = scores
      .slice(0, 10)
      .map((u, i) => {
        const sign = u.score >= 0 ? "+" : "";
        const escapedUsername = escapeMarkdown(u.username);
        return `${i + 1}. ${escapedUsername} — ${sign}${u.score}`;
      })
      .join("\n");

    await replyWithAutoDelete(ctx, title + top);
  } catch (error) {
    logger.error(`[ERROR] /top: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке топа.");
  }
};

export const statsUpdateHandler = async (ctx: CommandContext) => {
  logger.info("[HANDLER] /stats_update вызван");
  await deleteCommandMessage(ctx);

  try {
    const statusMsg = await ctx.reply("🔄 Пересчёт статистики: 0%");
    const totalSteps = 10;
    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const percent = Math.floor((step / totalSteps) * 100);
      await ctx.telegram.editMessageText(
        ctx.chat!.id,
        statusMsg.message_id,
        undefined,
        `🔄 Пересчёт статистики: ${percent}%`,
      );
    }
    StatsService.recalcStats();
    await ctx.deleteMessage(statusMsg.message_id);
    await replyWithAutoDelete(ctx, "✅ Статистика успешно пересчитана!");
  } catch (error) {
    logger.error(`[ERROR] /stats_update: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при пересчёте.");
  }
};

export const helpHandler = async (ctx: CommandContext) => {
  logger.info("[HANDLER] /help вызван");
  await deleteCommandMessage(ctx);

  const helpMessage = [
    "📚 **Список доступных команд:**",
    "/stats — Показать детальную статистику всех участников (входы, выходы, разница)",
    "/top — Топ-10 участников по разнице (выход минус вход)",
    "/help — Показать это сообщение",
    "ℹ️ **Как добавлять данные:**",
    "Сообщения должны содержать строки вида:",
    "`+<сумма> | <ник>`",
    "Секции помечаются как `Вход:` и `Выход:`",
    "Пример:",
    "```",
    "Вход:",
    "+500 | Тема",
    "+700 | @Rabotyaga3000",
    "Выход:",
    "+1840 | @EgorVaganov1111",
    "```",
  ].join("\n");
  await replyWithAutoDelete(ctx, helpMessage, { parse_mode: "Markdown" });
};

// Текстовые сообщения – используем Context (проверяем наличие полей внутри)
export const textHandler = async (ctx: Context) => {
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

  let isGameCommand = false;
  let gameDate: string | undefined;
  if (mentioned && text.includes("game")) {
    isGameCommand = true;
    gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);
  }

  const isPlainData = !mentioned && !text.startsWith("/");

  if (isGameCommand || isPlainData) {
    if (isGameCommand) await deleteCommandMessage(ctx);

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

    const finalDate = gameDate || new Date().toISOString().slice(0, 10);
    const gameId = GameService.createGame(
      ctx.chat!.id,
      ctx.message!.message_id,
      finalDate,
    );
    const savedCount = GameService.addTransactions(gameId, transactions);

    if (savedCount > 0) {
      await replyWithAutoDelete(
        ctx,
        `✅ Игра от ${finalDate} успешно создана. Добавлено записей: ${savedCount}`,
      );
    } else {
      GameService.deleteGame(ctx.chat!.id, ctx.message!.message_id);
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не удалось добавить транзакции. Игра удалена.",
      );
    }
  }
};

// Фото – используем Context
export const photoHandler = async (ctx: Context) => {
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
};

// Редактирование – используем Context
export const editedMessageHandler = async (ctx: Context) => {
  const editedMessage = ctx.editedMessage as any;
  if (!editedMessage) return;

  const chatId = editedMessage.chat.id;
  const messageId = editedMessage.message_id;
  const text = editedMessage.text || editedMessage.caption || "";

  let game = GameRepository.findByChatAndMessage(chatId, messageId);
  if (game) {
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
};
