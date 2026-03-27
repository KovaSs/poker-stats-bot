import { logger } from "../config/logger";

import { Context } from "telegraf";

export async function deleteCommandMessage(ctx: Context) {
  if (ctx.message && "message_id" in ctx.message) {
    try {
      await ctx.deleteMessage(ctx.message.message_id);
      logger.info(
        `[DELETE] Сообщение команды ${ctx.message.message_id} удалено`,
      );
    } catch (e) {
      console.error("[DELETE] Не удалось удалить сообщение команды:", e);
    }
  }
}

export async function replyWithAutoDelete(
  ctx: Context,
  text: string,
  extra?: any,
  delayMs: number = 30000,
) {
  try {
    const sent = await ctx.reply(text, extra);
    setTimeout(async () => {
      try {
        await ctx.telegram.deleteMessage(ctx.chat!.id, sent.message_id);
        logger.info(`[AUTODELETE] Сообщение ${sent.message_id} удалено`);
      } catch (e) {
        console.error("[AUTODELETE] Ошибка удаления:", e);
      }
    }, delayMs);
    return sent;
  } catch (error) {
    console.error("[REPLY] Ошибка отправки:", error);
    throw error;
  }
}

export async function errorHandler(err: unknown, ctx: Context) {
  console.error("[BOT ERROR]", err);
  try {
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла внутренняя ошибка. Пожалуйста, попробуйте позже.",
    );
  } catch (e) {
    console.error("[BOT ERROR] Не удалось отправить сообщение об ошибке:", e);
  }
}
