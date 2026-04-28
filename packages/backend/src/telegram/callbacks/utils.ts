import { Context } from "telegraf";

import { logger } from "@/config/logger";

import { replyWithAutoDelete } from "../middlewares";

export function parseFilter(filter: string): string | undefined {
  if (filter === "all") return "all";
  if (filter === "last_year") return undefined;
  if (/^\d{4}$/.test(filter)) return filter;
  return undefined; // или null, в зависимости от логики
}

export async function deleteSourceMessage(ctx: Context): Promise<void> {
  try {
    await ctx.deleteMessage();
  } catch {
    logger.warn("Не удалось удалить сообщение с клавиатурой");
  }
}

export async function handleCallbackError(
  ctx: Context,
  error: unknown,
  userMessage: string,
  botMessage: string,
): Promise<void> {
  logger.error(`[ERROR] callback: ${error}`);
  await ctx.answerCbQuery(userMessage);
  await replyWithAutoDelete(ctx, botMessage);
}
