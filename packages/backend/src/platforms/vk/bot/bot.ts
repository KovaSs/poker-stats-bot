import { VK } from "vk-io";

import {
  VK_ACCESS_TOKEN,
  VK_COMMUNITY_CHAT_ID,
  VK_GROUP_ID,
} from "@/config/env";
import { logger } from "@/config/logger";

import { handleVKMessage } from "../handlers/message";
import { buildMenuKeyboard } from "../handlers/menu";
import { scheduleAutoDelete } from "../middlewares";
import { version } from "../../../../package.json";

let vkClient: VK | null = null;

export function getVK(): VK | null {
  return vkClient;
}

export async function initVKPlatform(): Promise<void> {
  if (!VK_ACCESS_TOKEN) {
    logger.warn("[VK] VK_ACCESS_TOKEN не задан, VK-адаптер не запущен");
    return;
  }

  try {
    const vkGroupId = VK_GROUP_ID
      ? Number(VK_GROUP_ID.replace(/^club/i, "")) || null
      : null;
    logger.info(`[VK] VK_GROUP_ID: "${VK_GROUP_ID}" → parsed: ${vkGroupId}`);
    const pollingGroupId = vkGroupId ?? undefined;
    vkClient = new VK({ token: VK_ACCESS_TOKEN, pollingGroupId });

    vkClient.updates.on("message_new", async (context) => {
      await handleVKMessage(context, false);
    });

    vkClient.updates.on("message_edit", async (context) => {
      await handleVKMessage(context, true);
    });

    await vkClient.updates.start();
    logger.info("[VK] VK Long Poll запущен");

    if (VK_COMMUNITY_CHAT_ID && vkClient) {
      const chatId: number = VK_COMMUNITY_CHAT_ID;
      try {
        const result = await vkClient.api.messages.send({
          message: `🃏 Бот v${version} запущен. Используйте кнопки для команд`,
          keyboard: buildMenuKeyboard(),
          random_id: Date.now(),
          peer_id: chatId,
        });
        const msgId =
          typeof result === "object"
            ? ((result as { message_id?: number }).message_id ?? Number(result))
            : Number(result);
        if (msgId) {
          scheduleAutoDelete(
            () =>
              vkClient!.api.messages.delete({
                delete_for_all: true,
                message_ids: msgId,
                peer_id: chatId,
              }),
            `welcome message ${msgId} in peer ${chatId}`,
          );
        }
      } catch {
        // чат может быть недоступен — игнорируем
      }
    }
  } catch (error) {
    logger.error(`[VK] Ошибка запуска: ${JSON.stringify(error, null, 2)}`);
  }
}
