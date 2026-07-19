import { Context } from "telegraf";

import { formatStatsTable } from "@/core";
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

export async function sendStats(ctx: Context, chatId: number, filter?: string) {
  try {
    const stats = StatsService.getFilteredStats(chatId, filter);
    const message = formatStatsTable(stats, filter);
    await replyWithAutoDelete(ctx, message, { parse_mode: "Markdown" });
  } catch (error) {
    logger.error(`[ERROR] sendStats: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
  }
}

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
