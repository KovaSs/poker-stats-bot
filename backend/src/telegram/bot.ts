import { Telegraf } from "telegraf";
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
      console.log(`[RAW] ${ctx.message.text}`);
    }
    return next();
  });

  // Регистрируем обработчики команд
  bot.command("stats", handlers.statsHandler);
  bot.command("top", handlers.topHandler);
  bot.command("stats_update", handlers.statsUpdateHandler);
  bot.command("help", handlers.helpHandler);

  // Обработчики сообщений
  bot.on("text", handlers.textHandler);
  bot.on("photo", handlers.photoHandler);
  bot.on("edited_message", handlers.editedMessageHandler);

  return bot;
}
