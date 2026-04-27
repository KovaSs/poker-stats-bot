import { logger } from "@/config/logger";

import { sendStatsPeriodKeyboard, sendTopPeriodKeyboard } from "../stats";
import { deleteCommandMessage } from "../../middlewares";
import { sendHelpMessage } from "../help";

import type { CallbackHandler } from "../../callbacks/types";
import type { CommandContext } from "@/types/telegram";
import type { Telegram } from "telegraf";

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
        { text: "📊 Статистика", callback_data: "menu_stats" },
        { text: "🏆 Топ", callback_data: "menu_top" },
      ],
      [{ text: "🃏 Web App", url: webAppUrl }],
      [{ text: "📚 Помощь", callback_data: "menu_help" }],
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
export const menuCallback: CallbackHandler = async (ctx, match) => {
  const data = (ctx.callbackQuery as any)?.data;

  if (!data) {
    console.log("❌ No data in callbackQuery");
    return;
  }

  await ctx.answerCbQuery();

  const chatId = ctx.chat!.id;
  console.log("📌 chatId:", chatId);

  try {
    // Сначала отправляем новое сообщение, потом удаляем меню
    switch (data) {
      case "menu_stats":
        console.log("📊 Calling sendStatsPeriodKeyboard");
        await sendStatsPeriodKeyboard(ctx, chatId);
        break;
      case "menu_top":
        console.log("🏆 Calling sendTopPeriodKeyboard");
        await sendTopPeriodKeyboard(ctx, chatId);
        break;
      case "menu_help":
        await sendHelpMessage(ctx, chatId);
        break;
      default:
        console.log("⚠️ Unknown menu callback:", data);
    }

    // Удаляем меню после отправки ответа
    try {
      await ctx.deleteMessage();
    } catch (e) {
      console.log("⚠️ Could not delete menu message:", e);
    }
  } catch (error) {
    console.error("❌ Error in menuCallback:", error);
    await ctx.reply("❌ Произошла ошибка. Попробуйте позже.");
  }
};
