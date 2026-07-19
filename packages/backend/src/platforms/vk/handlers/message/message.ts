import {
  processGameMessage,
  processCommand,
  formatStatsTable,
  formatTopList,
} from "@/core";
import { VK_GROUP_ID } from "@/config/env";
import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import {
  buildMenuKeyboard,
  buildStatsFilterKeyboard,
  buildTopFilterKeyboard,
  buttonCommands,
} from "../menu/menu";
import { duplicateToCommunityChat } from "../../handlers/duplicate/duplicate";
import { scheduleAutoDelete } from "../../middlewares";
import { vkContextToIMessage } from "../../adapters";
import { getVK } from "../../bot";

import type { VKContext } from "../../adapters";
import type { IMessage } from "@/core";

// Храним ID последнего сообщения-подсказки с фильтрами для каждого чата
const lastFilterPromptIds = new Map<number, number>();

export async function handleVKMessage(
  context: VKContext & {
    id?: number;
    peerId?: number;
    peerType?: string;
    send: (text: string, params?: Record<string, unknown>) => Promise<{ id?: number }>;
    attachments?: { toString: () => string }[];
  },
  isEdited: boolean,
): Promise<void> {
  logger.info(
    `[VK] message_${isEdited ? "edit" : "new"} получено: peerId=${context.peerId}, peerType=${context.peerType}, hasText=${Boolean(context.text)}, convMsgId=${context.conversationMessageId}, msgId=${context.id}`,
  );

  try {
    const ctx: VKContext = {
      conversationMessageId: context.conversationMessageId,
      senderId: context.senderId,
      peerType: context.peerType,
      peerId: context.peerId,
      text: context.text,
      isEdited,
    };

    const imessage = vkContextToIMessage(ctx);
    if (!imessage) {
      logger.warn(
        `[VK] imessage is null — text=${Boolean(ctx.text)}, peerId=${ctx.peerId}, convMsgId=${ctx.conversationMessageId}`,
      );
      return;
    }

    // Игнорируем сообщения от самой группы
    const vkGroupId = VK_GROUP_ID
      ? Number(VK_GROUP_ID.replace(/^club/i, "")) || null
      : null;
    if (vkGroupId && Number(ctx.senderId) === -vkGroupId) return;

    // Проверяем упоминание бота или команду кнопки
    const rawText = imessage.text;
    const trimmedText = rawText.trim();
    const isButtonCommand = Object.keys(buttonCommands).includes(trimmedText);
    const isYearFilter = /^[📊🏆]\s*\d{4}$/u.test(trimmedText);
    const mentionMatch = rawText.match(
      /^(?:@poker_club|\[[^\]]*\|@poker_club\])\s*(.*)$/is,
    );

    if (mentionMatch) {
      imessage.text = mentionMatch[1].trim();
      if (!imessage.text) return;
    } else if (!isButtonCommand && !isYearFilter) {
      logger.info(
        `[VK] Пропущено (нет упоминания): peerId=${ctx.peerId}, text="${rawText.slice(0, 50)}"`,
      );
      return;
    }

    const vkClient = getVK();
    const peerId = context.peerId;
    const keyboardStr = buildMenuKeyboard();

    const sendWithAutoDelete = async (
      reply: string,
      extra?: Record<string, unknown>,
    ) => {
      // Если extra содержит keyboard (например, фильтры), используем его,
      // иначе — основное меню. Не дублируем keyboard из extra.
      const { keyboard: extraKeyboard, ...otherExtra } = extra || {};
      const sent = await context.send(reply, {
        keyboard: extraKeyboard || keyboardStr,
        ...otherExtra,
      });

      // Запоминаем ID сообщения-подсказки с фильтрами для последующего удаления
      if (
        sent?.id &&
        peerId &&
        (reply.startsWith("📊 Выберите период") ||
          reply.startsWith("🏆 Выберите период"))
      ) {
        lastFilterPromptIds.set(peerId, sent.id);
        logger.info(
          `[VK] Сохранён ID подсказки ${sent.id} для peer ${peerId}`,
        );
      }

      const userMsgId =
        context.id && context.id > 0
          ? context.id
          : context.conversationMessageId;
      const isChat = !context.id || context.id === 0;
      if (userMsgId && userMsgId > 0 && vkClient && peerId) {
        try {
          const delParams: Record<string, unknown> = {
            delete_for_all: true,
            peer_id: peerId,
          };
          if (isChat) {
            delParams.cmids = userMsgId;
          } else {
            delParams.message_ids = userMsgId;
          }
          const delResult = await vkClient.api.messages.delete(delParams);
          logger.info(
            `[VK] Удалено ${userMsgId} в peer ${peerId}: ${JSON.stringify(delResult)}`,
          );
        } catch (delError: unknown) {
          logger.error(
            `[VK] Ошибка удаления ${userMsgId} в peer ${peerId}: ${JSON.stringify(delError)}`,
          );
        }
      }

      if (sent?.id && vkClient && peerId) {
        scheduleAutoDelete(
          () =>
            vkClient.api.messages.delete({
              message_ids: sent.id!,
              delete_for_all: true,
              peer_id: peerId,
            }),
          `message ${sent.id} in peer ${peerId}`,
        );
      }
    };

    const result = await processAndReply(imessage, sendWithAutoDelete);

    if (result.gameId && ctx.peerType === "user" && imessage.text.includes("game")) {
      await duplicateToCommunityChat(result.gameId, imessage.text, context.attachments);
    }
  } catch (error) {
    logger.error(`[VK] Ошибка обработки: ${JSON.stringify(error, null, 2)}`);
    try {
      await context.send("❌ Произошла ошибка при обработке сообщения.");
    } catch {
      // ignore
    }
  }
}

async function processAndReply(
  imessage: IMessage,
  send: (text: string, extra?: Record<string, unknown>) => Promise<unknown>,
): Promise<{ gameId?: number }> {
  const normalizedText = buttonCommands[imessage.text.trim()] || imessage.text;
  if (normalizedText !== imessage.text) {
    logger.info(`[VK] Кнопка: "${imessage.text}" → "${normalizedText}"`);
  }

  // Определяем текст для обработки
  let text = normalizedText;

  // Обработка годовых фильтров: "📊 2024" → "!stats 2024", "🏆 2024" → "!top 2024"
  const yearFilterMatch = text.match(/^([📊🏆])\s*(\d{4})$/u);
  if (yearFilterMatch) {
    const prefix = yearFilterMatch[1] === "📊" ? "!stats" : "!top";
    text = `${prefix} ${yearFilterMatch[2]}`;
    logger.info(`[VK] Годовой фильтр: "${normalizedText}" → "${text}"`);
  }

  const imessageNormalized = { ...imessage, text };

  if (imessageNormalized.text.includes("game")) {
    const result = await processGameMessage(imessageNormalized);
    if (result.reply) await send(result.reply);
    return { gameId: result.gameId };
  }

  const commandResult = processCommand(imessageNormalized.text);
  if (commandResult.reply) {
    await send(commandResult.reply);
    return {};
  }

  const years = StatsService.getAvailableYears();

  // Показываем inline-клавиатуру с фильтрами при запросе статистики/топа
  if (
    imessageNormalized.text.startsWith("!stats") ||
    imessageNormalized.text.startsWith("/stats") ||
    imessageNormalized.text === "статистика" ||
    imessageNormalized.text === "всё" ||
    imessageNormalized.text.startsWith("всё ")
  ) {
    if (commandResult.filter !== undefined) {
      // Удаляем предыдущее сообщение-подсказку с фильтрами
      const promptId = lastFilterPromptIds.get(imessageNormalized.chatId);
      if (promptId) {
        lastFilterPromptIds.delete(imessageNormalized.chatId);
        getVK()
          ?.api.messages.delete({
            peer_id: imessageNormalized.chatId,
            message_ids: promptId,
            delete_for_all: true,
          })
          .catch(() => {});
      }
      logger.info(`[VK] Статистика с фильтром: ${commandResult.filter}`);
      const stats = StatsService.getFilteredStats(undefined, commandResult.filter);
      await send(formatStatsTable(stats, commandResult.filter));
    } else {
      await send("📊 Выберите период для статистики:", {
        keyboard: buildStatsFilterKeyboard(years),
      });
    }
    return {};
  }

  if (
    imessageNormalized.text.startsWith("!top") ||
    imessageNormalized.text.startsWith("/top") ||
    imessageNormalized.text === "топ" ||
    imessageNormalized.text.startsWith("топ ") ||
    imessageNormalized.text === "!топ"
  ) {
    if (commandResult.filter !== undefined) {
      const promptId = lastFilterPromptIds.get(imessageNormalized.chatId);
      if (promptId) {
        lastFilterPromptIds.delete(imessageNormalized.chatId);
        getVK()
          ?.api.messages.delete({
            peer_id: imessageNormalized.chatId,
            message_ids: promptId,
            delete_for_all: true,
          })
          .catch(() => {});
      }
      logger.info(`[VK] Топ с фильтром: ${commandResult.filter}`);
      const scores = StatsService.getFilteredScores(undefined, commandResult.filter);
      await send(formatTopList(scores, commandResult.filter));
    } else {
      await send("🏆 Выберите период для топа:", {
        keyboard: buildTopFilterKeyboard(years),
      });
    }
  }
  return {};
}
