import { Telegraf } from "telegraf";

import { logger } from "@/config/logger";

import { registerCallbacks } from "./callbacks";
import { menuCallback } from "./handlers/menu";
import { errorHandler } from "./middlewares";
import * as handlers from "./handlers";

export function setupBot(token: string, apiRoot?: string) {
  const options: { telegram?: { apiRoot: string } } = {};
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
