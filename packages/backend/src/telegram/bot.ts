import { Telegraf } from "telegraf";

import { logger } from "@/config/logger";

import { registerCallbacks } from "./callbacks";
import { menuCallback, setChatMenuButton } from "./handlers/menu";
import { errorHandler } from "./middlewares";
import * as handlers from "./handlers";

export function setupBot(token: string, apiRoot?: string) {
  const options: any = {};
  if (apiRoot) {
    options.telegram = { apiRoot };
  }
  const bot = new Telegraf(token, options);

  // Middleware для логирования всех сообщений
  bot.use((ctx, next) => {
    if (ctx.message && "text" in ctx.message) {
      logger.info(`[RAW] ${ctx.message.text}`);
    }
    return next();
  });

  // Глобальный обработчик ошибок
  bot.catch(errorHandler);

  bot.on("my_chat_member", async (ctx) => {
    const chat = ctx.chat;
    if (chat && (chat.type === "group" || chat.type === "supergroup")) {
      await setChatMenuButton(ctx.telegram, chat.id);
    }
  });

  bot.command("setup_group", async (ctx) => {
    const chat = ctx.chat;
    if (!chat || (chat.type !== "group" && chat.type !== "supergroup")) {
      return ctx.reply("Эту команду можно использовать только в группе.");
    }

    const userId = ctx.from?.id;
    if (!userId) return;

    try {
      const member = await ctx.telegram.getChatMember(chat.id, userId);
      if (member.status !== "creator" && member.status !== "administrator") {
        return ctx.reply("Только администратор может настроить кнопку.");
      }
    } catch (e) {
      return ctx.reply(
        "Не удалось проверить права. Убедитесь, что бот — администратор.",
      );
    }

    const msg = await ctx.telegram.sendMessage(
      chat.id,
      "📊 Нажмите кнопку, чтобы открыть статистику:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "📊 App",
                url: "https://t.me/MyPokerStatsBot/pokerstats",
              },
            ],
          ],
        },
      },
    );

    try {
      await ctx.telegram.pinChatMessage(chat.id, msg.message_id);
      await ctx.reply("✅ Кнопка закреплена вверху чата.");
    } catch (e) {
      await ctx.reply(
        "⚠️ Не удалось закрепить сообщение. Проверьте право can_pin_messages у бота.",
      );
    }
  });

  bot.command("setup_menu", async (ctx) => {
    const chat = ctx.chat;
    console.log("[DEBUG] chat.id =", ctx.chat?.id, typeof ctx.chat?.id);
    if (chat && (chat.type === "group" || chat.type === "supergroup")) {
      try {
        await setChatMenuButton(ctx.telegram, chat.id);
        await ctx.reply("✅ Кнопка меню установлена.");
      } catch (error: any) {
        if (error?.response?.description?.includes("invalid chat_id")) {
          await ctx.reply(
            "❌ Бот не является администратором этой группы. Пожалуйста, добавьте бота в администраторы и повторите /setup_menu.",
          );
        } else {
          await ctx.reply("❌ Произошла ошибка при установке кнопки.");
        }
        logger.error(`[MENU] Ошибка для чата ${chat.id}: ${error}`);
      }
    }
  });

  bot.command("menu", handlers.menuHandler);

  bot.action(/^menu_(.+)$/, async (ctx) => {
    const match = ctx.match as string[];
    await menuCallback(ctx, match);
  });

  // Обработчики сообщений
  bot.on("text", handlers.textHandler);
  bot.on("photo", handlers.photoHandler);
  bot.on("edited_message", handlers.editedMessageHandler);

  // Регистрируем все callback-обработчики
  registerCallbacks(bot);

  return bot;
}
