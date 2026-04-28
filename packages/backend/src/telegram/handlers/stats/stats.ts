import { Context } from "telegraf";

import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import { replyWithAutoDelete } from "../../middlewares";
import { escapeMarkdown } from "../common";

import type { InlineKeyboardButton } from "telegraf/types";

function buildYearKeyboard(
  prefix: string,
  years: string[],
): {
  inline_keyboard: InlineKeyboardButton[][];
} {
  const yearButtons = years.map((year) => ({
    callback_data: `${prefix}_${year}`,
    text: year,
  }));

  // Разбиваем на строки по 3 кнопки
  const rows: InlineKeyboardButton[][] = [];
  for (let i = 0; i < yearButtons.length; i += 3) {
    rows.push(yearButtons.slice(i, i + 3));
  }

  return {
    inline_keyboard: [
      [
        { callback_data: `${prefix}_all`, text: "📅 Всё время" },
        { callback_data: `${prefix}_last_year`, text: "📆 Последний год" },
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

export async function sendStatsPeriodKeyboard(ctx: Context, chatId: number) {
  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("stats", years);
  await replyWithAutoDelete(ctx, "📊 Выберите период для статистики:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
}

export async function sendTopPeriodKeyboard(ctx: Context, chatId: number) {
  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("top", years);
  await replyWithAutoDelete(ctx, "🏆 Выберите период для топа:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
}
