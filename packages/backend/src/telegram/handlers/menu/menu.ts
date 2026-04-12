import { logger } from "@/config/logger";

import { sendStatsPeriodKeyboard, sendTopPeriodKeyboard } from "../stats";
import { deleteCommandMessage } from "../../middlewares";

import type { CallbackHandler } from "../../callbacks/types";
import type { CommandContext } from "@/types/telegram";

/**
 * Клавиатура главного меню
 */
const MAIN_MENU_KEYBOARD = {
  inline_keyboard: [
    [
      { text: "📊 Статистика", callback_data: "menu_stats" },
      { text: "🏆 Топ", callback_data: "menu_top" },
    ],
    [{ text: "📚 Помощь", callback_data: "menu_help" }],
  ],
};

/**
 * Обработчик команды /menu
 */
export const menuHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /menu вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  await ctx.reply("📋 Главное меню:", {
    reply_markup: MAIN_MENU_KEYBOARD,
  });
};

/**
 * Callback-обработчик для кнопок главного меню.
 * Сигнатура соответствует CallbackHandler: (ctx, match) => Promise<void>
 */
export const menuCallback: CallbackHandler = async (ctx, match) => {
  const data = (ctx.callbackQuery as any)?.data;
  console.log("🔥 menuCallback data:", data);

  if (!data) {
    console.log("❌ No data in callbackQuery");
    return;
  }

  await ctx.answerCbQuery();
  console.log("✅ answerCbQuery done");

  const chatId = ctx.chat!.id;
  console.log("📌 chatId:", chatId);

  try {
    // Сначала отправляем новое сообщение, потом удаляем меню
    switch (data) {
      case "menu_stats":
        console.log("📊 Calling sendStatsPeriodKeyboard");
        await sendStatsPeriodKeyboard(ctx, chatId);
        console.log("✅ sendStatsPeriodKeyboard completed");
        break;
      case "menu_top":
        console.log("🏆 Calling sendTopPeriodKeyboard");
        await sendTopPeriodKeyboard(ctx, chatId);
        console.log("✅ sendTopPeriodKeyboard completed");
        break;
      case "menu_help":
        console.log("📚 Sending help");
        const helpMessage = [
          "📚 **Список доступных команд:**",
          "/menu — Показать главное меню",
          "/stats — Показать меню выбора периода, затем детальную статистику",
          "/top — Топ‑10 участников по разнице",
          "/help — Показать это сообщение",
          "",
          "ℹ️ **Как добавлять данные:**",
          "Сообщения должны содержать строки вида:",
          "`+<сумма> | <ник>`",
          "Секции помечаются как `Вход:` и `Выход:`",
        ].join("\n");
        await ctx.reply(helpMessage, { parse_mode: "Markdown" });
        console.log("✅ Help sent");
        break;
      default:
        console.log("⚠️ Unknown menu callback:", data);
    }

    // Удаляем меню после отправки ответа
    try {
      await ctx.deleteMessage();
      console.log("🗑️ Menu message deleted");
    } catch (e) {
      console.log("⚠️ Could not delete menu message:", e);
    }
  } catch (error) {
    console.error("❌ Error in menuCallback:", error);
    await ctx.reply("❌ Произошла ошибка. Попробуйте позже.");
  }
};
