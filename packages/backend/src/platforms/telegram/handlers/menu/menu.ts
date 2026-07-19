import { logger } from "@/config/logger";

import { sendStatsPeriodKeyboard, sendTopPeriodKeyboard } from "../stats";
import { deleteCommandMessage } from "../../middlewares";
import { sendHelpMessage } from "../help";

import type { CallbackHandler } from "../../callbacks/types";
import type { CommandContext } from "@/types/telegram";

/**
 * Обработчик команды /menu
 */
export const menuHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /menu вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  const chatId = ctx.chat!.id;
  const webAppUrl = `https://t.me/MyPokerStatsBot/pokerstats?startapp=chat_${chatId}`;

  const keyboard = {
    inline_keyboard: [
      [
        { callback_data: "menu_stats", text: "📊 Статистика" },
        { callback_data: "menu_top", text: "🏆 Топ" },
      ],
      [{ text: "🃏 Web App", url: webAppUrl }],
      [{ callback_data: "menu_help", text: "📚 Помощь" }],
    ],
  };

  await ctx.reply("📋 Главное меню:", {
    reply_markup: keyboard,
  });
};

/**
 * Callback-обработчик для кнопок главного меню.
 * Сигнатура соответствует CallbackHandler: (ctx, match) => Promise<void>
 */
export const menuCallback: CallbackHandler = async (ctx) => {
  const data = (ctx.callbackQuery as { data?: string } | undefined)?.data;

  if (!data) {
    logger.warn("❌ No data in callbackQuery");
    return;
  }

  await ctx.answerCbQuery();

  const chatId = ctx.chat!.id;
  logger.info({ chatId }, "menuCallback");

  try {
    // Сначала отправляем новое сообщение, потом удаляем меню
    switch (data) {
      case "menu_stats":
        logger.info("menuCallback: stats");
        await sendStatsPeriodKeyboard(ctx, chatId);
        break;
      case "menu_top":
        logger.info("menuCallback: top");
        await sendTopPeriodKeyboard(ctx, chatId);
        break;
      case "menu_help":
        await sendHelpMessage(ctx);
        break;
      default:
        logger.warn({ data }, "Unknown menu callback");
    }

    // Удаляем меню после отправки ответа
    try {
      await ctx.deleteMessage();
    } catch (e) {
      logger.warn({ error: e }, "Could not delete menu message");
    }
  } catch (error) {
    logger.error({ error }, "Error in menuCallback");
    await ctx.reply("❌ Произошла ошибка. Попробуйте позже.");
  }
};
