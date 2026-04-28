import { Context } from "telegraf";

import { logger } from "@/config/logger";

export async function deleteCommandMessage(ctx: Context) {
  if (ctx.message && "message_id" in ctx.message) {
    try {
      await ctx.deleteMessage(ctx.message.message_id);
      logger.info(
        `[DELETE] Сообщение команды ${ctx.message.message_id} удалено`,
      );
    } catch (error) {
      logger.error(
        `[DELETE] Не удалось удалить сообщение команды: ${JSON.stringify(error, null, 2)}`,
      );
    }
  }
}

export async function replyWithAutoDelete(
  ctx: Context,
  text: string,
  extra?: Record<string, unknown>,
  delayMs: number = 30000,
) {
  try {
    const sent = await ctx.reply(text, extra);
    setTimeout(async () => {
      try {
        await ctx.telegram.deleteMessage(ctx.chat!.id, sent.message_id);
        logger.info(`[AUTODELETE] Сообщение ${sent.message_id} удалено`);
      } catch (error) {
        logger.error(
          `[AUTODELETE] Ошибка удаления: ${JSON.stringify(error, null, 2)}`,
        );
      }
    }, delayMs);
    return sent;
  } catch (error) {
    logger.error(`[REPLY] Ошибка отправки: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }
}

export async function errorHandler(err: unknown, ctx: Context) {
  logger.error(`[BOT ERROR]: ${JSON.stringify(err, null, 2)}`);
  try {
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла внутренняя ошибка. Пожалуйста, попробуйте позже.",
    );
  } catch (error) {
    logger.error(
      `[BOT ERROR] Не удалось отправить сообщение об ошибке: ${JSON.stringify(error, null, 2)}`,
    );
  }
}
