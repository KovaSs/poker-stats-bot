import { Context } from "telegraf";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";

import type { CommandContext } from "@/types/telegram";

/**
 * Обработчик команды /help (с автоудалением)
 */
export const helpHandler = async (ctx: CommandContext) => {
  logger.info("[HANDLER] /help вызван");
  await deleteCommandMessage(ctx);

  const helpMessage = getHelpMessageText();
  await replyWithAutoDelete(ctx, helpMessage, { parse_mode: "Markdown" });
};

/**
 * Отправляет сообщение со справкой (используется в главном меню)
 */
export async function sendHelpMessage(ctx: Context, chatId: number) {
  const helpMessage = getHelpMessageText();
  await ctx.telegram.sendMessage(chatId, helpMessage, {
    parse_mode: "Markdown",
  });
}

/**
 * Формирует текст справочного сообщения
 */
function getHelpMessageText(): string {
  return [
    "📚 **Список доступных команд:**",
    "/menu — Показать главное меню",
    "/stats — Показать меню выбора периода, затем детальную статистику",
    "/top — Топ‑10 участников по разнице (выход минус вход)",
    "/help — Показать это сообщение",
    "ℹ️ **Как добавлять данные:**",
    "Сообщения должны содержать строки вида:",
    "`+<сумма> | <ник>`",
    "Секции помечаются как `Вход:` и `Выход:`",
    "Пример:",
    "```",
    "Вход:",
    "+500 | Тема",
    "+700 | @Rabotyaga3000",
    "Выход:",
    "+1840 | @EgorVaganov1111",
    "```",
  ].join("\n");
}
