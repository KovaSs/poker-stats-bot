import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";

import type { CommandContext } from "@/types/telegram";

export const helpHandler = async (ctx: CommandContext) => {
  logger.info("[HANDLER] /help вызван");
  await deleteCommandMessage(ctx);

  const helpMessage = [
    "📚 **Список доступных команд:**",
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
  await replyWithAutoDelete(ctx, helpMessage, { parse_mode: "Markdown" });
};
