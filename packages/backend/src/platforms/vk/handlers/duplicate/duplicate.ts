import { VK_COMMUNITY_CHAT_ID } from "@/config/env";
import { GameRepository } from "@/db/repositories";
import { container } from "@/di/container";
import { logger } from "@/config/logger";

import { getVK } from "../../bot";

export async function duplicateToCommunityChat(
  gameId: number,
  text: string,
  attachments?: { toString: () => string }[],
): Promise<void> {
  const attachmentStr = attachments
    ?.map((att) => att.toString())
    .filter(Boolean)
    .join(",");
  const vkClient = getVK();
  if (!VK_COMMUNITY_CHAT_ID || !vkClient) {
    if (!VK_COMMUNITY_CHAT_ID) {
      logger.warn(
        "[VK] VK_COMMUNITY_CHAT_ID не задан — дублирование в чат не выполняется",
      );
    }
    return;
  }

  const gameRepo = container.resolve(GameRepository);
  const game = gameRepo.findById(gameId);
  if (!game) return;

  try {
    if (game.community_message_id) {
      await vkClient.api.messages.edit({
        message_id: game.community_message_id,
        peer_id: VK_COMMUNITY_CHAT_ID,
        message: text,
        ...(attachmentStr ? { attachment: attachmentStr } : {}),
      });
      logger.info(
        `[VK] Обновлён community message ${game.community_message_id} для игры ${gameId}`,
      );
    } else {
      const sent = await vkClient.api.messages.send({
        peer_id: VK_COMMUNITY_CHAT_ID,
        random_id: Date.now(),
        message: text,
        ...(attachmentStr ? { attachment: attachmentStr } : {}),
      });
      if (sent) {
        const msgId = typeof sent === "object"
          ? (sent as { message_id?: number }).message_id ?? Number(sent)
          : Number(sent);
        gameRepo.updateCommunityMessageId(gameId, msgId);
        logger.info(
          `[VK] Отправлен community message ${msgId} для игры ${gameId}`,
        );
      }
    }
  } catch (error) {
    logger.error(
      `[VK] Ошибка дублирования в чат: ${JSON.stringify(error, null, 2)}`,
    );
  }
}
