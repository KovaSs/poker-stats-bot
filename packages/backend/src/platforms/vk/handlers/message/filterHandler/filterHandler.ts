import { formatStatsTable, formatTopList } from "@/core";
import { logger } from "@/config/logger";
import { container } from "@/di/container";
import { StatsService } from "@/services";

import { getVK } from "../../../bot";
import { buildStatsFilterKeyboard, buildTopFilterKeyboard } from "../../menu";

function getStatsService(): StatsService {
  return container.resolve(StatsService);
}

const lastFilterPromptIds = new Map<number, number>();

export function saveFilterPromptId(peerId: number, messageId: number): void {
  lastFilterPromptIds.set(peerId, messageId);
  logger.info(`[VK] Сохранён ID подсказки ${messageId} для peer ${peerId}`);
}

export async function deleteFilterPrompt(chatId: number): Promise<void> {
  const promptId = lastFilterPromptIds.get(chatId);
  if (!promptId) return;
  lastFilterPromptIds.delete(chatId);
  const vkClient = getVK();
  if (!vkClient) return;
  try {
    await vkClient.api.messages.delete({
      message_ids: promptId,
      delete_for_all: true,
      peer_id: chatId,
    });
  } catch {
    // ignore
  }
}

type SendFn = (
  text: string,
  extra?: Record<string, unknown>,
) => Promise<unknown>;

export async function handleFilterCommand(
  type: "stats" | "top",
  chatId: number,
  filter: string | undefined,
  send: SendFn,
): Promise<void> {
  if (filter !== undefined) {
    await deleteFilterPrompt(chatId);
    logger.info(`[VK] ${type === "stats" ? "Статистика" : "Топ"} с фильтром: ${filter}`);
    if (type === "stats") {
      const stats = getStatsService().getFilteredStats(undefined, filter);
      await send(formatStatsTable(stats, filter));
    } else {
      const scores = getStatsService().getFilteredScores(undefined, filter);
      await send(formatTopList(scores, filter));
    }
    return;
  }

  const years = getStatsService().getAvailableYears();
  const text = type === "stats" ? "📊 Выберите период для статистики:" : "🏆 Выберите период для топа:";
  const keyboard = type === "stats" ? buildStatsFilterKeyboard(years) : buildTopFilterKeyboard(years);
  await send(text, { keyboard });
}
