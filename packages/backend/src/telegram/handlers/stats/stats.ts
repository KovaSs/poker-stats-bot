import { Context } from "telegraf";

import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";
import { escapeMarkdown } from "../common";

import type { CommandContext } from "@/types/telegram";

function buildYearKeyboard(prefix: string, years: string[]): any {
  const yearButtons = years.map((year) => ({
    text: year,
    callback_data: `${prefix}_${year}`,
  }));

  // Разбиваем на строки по 3 кнопки
  const rows: any[] = [];
  for (let i = 0; i < yearButtons.length; i += 3) {
    rows.push(yearButtons.slice(i, i + 3));
  }

  return {
    inline_keyboard: [
      [
        { text: "📅 Всё время", callback_data: `${prefix}_all` },
        { text: "📆 Последний год", callback_data: `${prefix}_last_year` },
      ],
      ...rows,
    ],
  };
}

// --------------------------------------------------------------------------
// Публичная функция для отправки статистики (используется и в команде, и в callback)
// --------------------------------------------------------------------------
export async function sendStats(ctx: Context, chatId: number, filter?: string) {
  try {
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
    logger.error(`[ERROR] sendStats: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
  }
}

// --------------------------------------------------------------------------
// Публичная функция для отправки топа (используется и в команде, и в callback)
// --------------------------------------------------------------------------
export async function sendTop(ctx: Context, chatId: number, filter?: string) {
  try {
    const scores = StatsService.getFilteredScores(chatId, filter);
    if (scores.length === 0) {
      await replyWithAutoDelete(ctx, "🏆 Пока нет данных за указанный период.");
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
    logger.error(`[ERROR] sendTop: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке топа.");
  }
}

export const statsHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /stats вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  const args = ctx.message.text.split(" ").slice(1);
  const chatId = ctx.chat!.id;

  if (args.length > 0) {
    const arg = args[0].toLowerCase();
    if (arg === "all" || /^\d{4}$/.test(arg)) {
      await sendStats(ctx, chatId, arg);
    } else {
      await replyWithAutoDelete(
        ctx,
        "❌ Неверный формат. Используйте `/stats all`, `/stats 2024` или просто `/stats` для выбора фильтра.",
      );
    }
    return;
  }

  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("stats", years);

  await ctx.reply("📊 Выберите период для статистики:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
};

export const topHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /top вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  const args = ctx.message.text.split(" ").slice(1);
  const chatId = ctx.chat!.id;

  if (args.length > 0) {
    const arg = args[0].toLowerCase();
    if (arg === "all" || /^\d{4}$/.test(arg)) {
      await sendTop(ctx, chatId, arg);
    } else {
      await replyWithAutoDelete(
        ctx,
        "❌ Неверный формат. Используйте `/top all`, `/top 2024` или просто `/top` для выбора фильтра.",
      );
    }
    return;
  }

  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("top", years);

  await ctx.reply("🏆 Выберите период для топа:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
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

export async function sendStatsPeriodKeyboard(ctx: Context, chatId: number) {
  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("stats", years);
  await ctx.reply("📊 Выберите период для статистики:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
}

export async function sendTopPeriodKeyboard(ctx: Context, chatId: number) {
  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("top", years);
  await ctx.reply("🏆 Выберите период для топа:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
}
