import { sendTop } from "../handlers";

import { parseFilter, deleteSourceMessage, handleCallbackError } from "./utils";

import type { CallbackHandler } from "./types";

export const topCallback: CallbackHandler = async (ctx, match) => {
  const filter = match[1];
  const chatId = ctx.chat!.id;
  const actualFilter = parseFilter(filter);

  if (actualFilter === undefined) {
    await ctx.answerCbQuery("Неизвестный фильтр");
    return;
  }

  try {
    await ctx.answerCbQuery(); // убираем "часики"
    await sendTop(ctx, chatId, actualFilter);
    await deleteSourceMessage(ctx);
  } catch (error) {
    await handleCallbackError(
      ctx,
      error,
      "❌ Ошибка при загрузке статистики",
      "❌ Ошибка при загрузке статистики.",
    );
  }
};
