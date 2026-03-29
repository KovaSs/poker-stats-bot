import { logger } from "@/config/logger";

import { replyWithAutoDelete } from "./middlewares";
import { sendStats } from "./handlers";

// Обработчик callback-запроса
type CallbackHandler = (ctx: any, match: string[]) => Promise<void>;

const callbacks: Map<RegExp, CallbackHandler> = new Map();

// Обработчик для статистики (stats_all, stats_last_year, stats_2024, ...)
callbacks.set(/^stats_(.+)$/, async (ctx, match) => {
  const filter = match[1];
  const chatId = ctx.chat!.id;
  let actualFilter: string | undefined;

  if (filter === "all") actualFilter = "all";
  else if (filter === "last_year") actualFilter = undefined;
  else if (/^\d{4}$/.test(filter)) actualFilter = filter;
  else {
    await ctx.answerCbQuery("Неизвестный фильтр");
    return;
  }

  try {
    await ctx.answerCbQuery(); // убираем "часики"
    await sendStats(ctx, chatId, actualFilter);

    // Удаляем исходное сообщение с клавиатурой
    try {
      await ctx.deleteMessage();
    } catch (e) {
      logger.warn("Не удалось удалить сообщение с клавиатурой");
    }
  } catch (error) {
    logger.error(`[ERROR] stats callback: ${error}`);
    await ctx.answerCbQuery("❌ Ошибка при загрузке статистики");
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
  }
});

// Регистрация всех callback-обработчиков
export function registerCallbacks(bot: any) {
  for (const [pattern, handler] of callbacks.entries()) {
    bot.action(pattern, async (ctx: any) => {
      const match = ctx.match as string[];
      await handler(ctx, match);
    });
  }
}
