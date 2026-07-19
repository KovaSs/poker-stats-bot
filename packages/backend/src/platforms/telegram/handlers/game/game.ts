import { Context } from "telegraf";

import { GameRepository } from "@/db/repositories";
import { processGameMessage } from "@/core";
import { container } from "@/di/container";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";

import type { IMessage } from "@/core";

type TelegramMessage = {
  caption_entities?: { type: string; offset: number; length: number }[];
  entities?: { type: string; offset: number; length: number }[];
  chat?: { id: number };
  message_id: number;
  caption?: string;
  text?: string;
};

function isMentioned(
  text: string,
  entities: { type: string; offset: number; length: number }[],
  botUsername: string,
): boolean {
  for (const entity of entities) {
    if (entity.type === "mention") {
      const mention = text.substring(
        entity.offset,
        entity.offset + entity.length,
      );
      if (mention === `@${botUsername}`) {
        return true;
      }
    }
  }
  return false;
}

function ctxToIMessage(
  ctx: Context,
  text: string,
  isEdited = false,
): IMessage {
  return {
    messageId: ctx.message
      ? (ctx.message as TelegramMessage).message_id
      : (ctx.editedMessage as TelegramMessage)?.message_id,
    fromUsername: ctx.from?.username,
    fromUserId: ctx.from?.id,
    platform: "telegram",
    chatId: ctx.chat!.id,
    isEdited,
    text,
  };
}

export const textHandler = async (ctx: Context) => {
  try {
    const msg = ctx.message as TelegramMessage;
    const text = msg.text || msg.caption;
    if (!text) return;

    const botUsername = ctx.botInfo.username;
    const entities = msg.entities || [];
    if (!isMentioned(text, entities, botUsername)) return;
    if (!text.includes("game")) return;

    await deleteCommandMessage(ctx);

    const imessage = ctxToIMessage(ctx, text);
    const result = await processGameMessage(imessage);

    if (result.reply) {
      const sent = await replyWithAutoDelete(ctx, result.reply);
      if (result.gameId && sent) {
        const gameRepo = container.resolve(GameRepository);
        gameRepo.updateTelegramBotMessageId(result.gameId, sent.message_id);
      }
    }
  } catch (error) {
    logger.error(`[ERROR] textHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке сообщения.",
    );
  }
};

export const photoHandler = async (ctx: Context) => {
  try {
    const caption = (ctx.message as TelegramMessage)?.caption;
    if (!caption) return;

    const botUsername = ctx.botInfo.username;
    const entities = (ctx.message as TelegramMessage).caption_entities || [];

    if (!isMentioned(caption, entities, botUsername)) return;
    if (!caption.includes("game")) return;

    const imessage: IMessage = {
      messageId: (ctx.message as TelegramMessage).message_id,
      fromUsername: ctx.from?.username,
      fromUserId: ctx.from?.id,
      platform: "telegram",
      chatId: ctx.chat!.id,
      text: caption,
    };

    const result = await processGameMessage(imessage);

    if (result.reply) {
      const sent = await replyWithAutoDelete(ctx, result.reply);
      if (result.gameId && sent) {
        const gameRepo = container.resolve(GameRepository);
        gameRepo.updateTelegramBotMessageId(result.gameId, sent.message_id);
      }
    }
  } catch (error) {
    logger.error(`[ERROR] photoHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке фотографии.",
    );
  }
};

export const editedMessageHandler = async (ctx: Context) => {
  try {
    const editedMessage = ctx.editedMessage as TelegramMessage;
    if (!editedMessage) return;

    const chatId = editedMessage.chat?.id;
    if (!chatId) return;

    const messageId = editedMessage.message_id;
    const text = editedMessage.text || editedMessage.caption || "";
    const entities =
      editedMessage.entities || editedMessage.caption_entities || [];

    const botUsername = ctx.botInfo.username;
    const mentioned = isMentioned(text, entities, botUsername);

    const imessage: IMessage = {
      fromUsername: ctx.from?.username,
      fromUserId: ctx.from?.id,
      platform: "telegram",
      isEdited: true,
      messageId,
      chatId,
      text,
    };

    const result = await processGameMessage(imessage);

    if (!mentioned && result.reply === null) return;

    if (result.reply) {
      const sent = await replyWithAutoDelete(ctx, result.reply);
      if (result.gameId && sent) {
        const gameRepo = container.resolve(GameRepository);
        gameRepo.updateTelegramBotMessageId(result.gameId, sent.message_id);
      }
    }
  } catch (error) {
    logger.error(
      `[ERROR] editedMessageHandler: ${JSON.stringify(error, null, 2)}`,
    );
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке редактирования.",
    );
  }
};
