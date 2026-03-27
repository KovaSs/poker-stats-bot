import { Telegraf } from "telegraf";

import {
  deleteTransactionsByGameId,
  getGameIdByChatAndMessage,
  deleteGameAndTransactions,
  getFilteredScores,
  getFilteredStats,
  updateGameDate,
  addTransaction,
  recalcStats,
  createGame,
} from "./db";

export function setupBot(token: string, apiRoot?: string) {
  const options: any = {};

  if (apiRoot) {
    options.telegram = options.telegram || {};
    options.telegram.apiRoot = apiRoot;
  }
  const bot = new Telegraf(token, options);

  // Логирование всех сообщений (отладка)
  bot.use((ctx, next) => {
    if (ctx.message && "text" in ctx.message) {
      console.log(`[RAW] ${ctx.message.text}`);
    }
    return next();
  });

  // Функция отправки с автоудалением через 30 секунд
  async function replyWithAutoDelete(
    ctx: any,
    text: string,
    extra?: any,
    delayMs: number = 30000,
  ) {
    try {
      const sent = await ctx.reply(text, extra);
      setTimeout(async () => {
        try {
          await ctx.telegram.deleteMessage(ctx.chat.id, sent.message_id);
          console.log(`[AUTODELETE] Сообщение ${sent.message_id} удалено`);
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

  // Функция удаления сообщения пользователя (команды) – для текстовых сообщений
  async function deleteCommandMessage(ctx: any) {
    if (ctx.message) {
      try {
        await ctx.deleteMessage(ctx.message.message_id);
        console.log(
          `[DELETE] Сообщение команды ${ctx.message.message_id} удалено`,
        );
      } catch (e) {
        console.error("[DELETE] Не удалось удалить сообщение команды:", e);
      }
    }
  }

  // Парсинг строк и добавление транзакций для указанной игры
  function parseAndAddTransactions(gameId: number, lines: string[]): number {
    let currentType: "in" | "out" | null = null;
    let savedCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase() === "вход:") {
        currentType = "in";
        console.log("[PARSE] Установлен тип: вход");
        continue;
      } else if (trimmed.toLowerCase() === "выход:") {
        currentType = "out";
        console.log("[PARSE] Установлен тип: выход");
        continue;
      }

      if (!currentType) continue;

      const match = trimmed.match(/^\+(\d+)\s*\|\s*([^\/\n]+)/);
      if (match) {
        const points = parseInt(match[1], 10);
        let username = match[2].trim();
        const commentIndex = username.indexOf("//");
        if (commentIndex !== -1)
          username = username.substring(0, commentIndex).trim();

        if (username) {
          try {
            addTransaction(gameId, username, points, currentType);
            savedCount++;
            console.log(
              `[DB] Сохранено: ${username} +${points} (${currentType})`,
            );
          } catch (err) {
            console.error(`[DB ERROR] Не удалось сохранить ${username}:`, err);
          }
        }
      }
    }
    return savedCount;
  }

  // Проверка наличия упоминания бота и команды game в тексте или caption
  function parseMentionCommandFromMessage(
    msg: {
      text?: string;
      entities?: any[];
      caption?: string;
      caption_entities?: any[];
    },
    botUsername: string,
  ): { isGameCommand: boolean; gameDate?: string } {
    let text: string;
    let entities: any[];

    if (msg.text !== undefined) {
      text = msg.text;
      entities = msg.entities || [];
    } else if (msg.caption !== undefined) {
      text = msg.caption;
      entities = msg.caption_entities || [];
    } else {
      return { isGameCommand: false };
    }

    // Ищем упоминание бота
    let mentioned = false;
    for (const entity of entities) {
      if (entity.type === "mention") {
        const mention = text.substring(
          entity.offset,
          entity.offset + entity.length,
        );
        if (mention === `@${botUsername}`) {
          mentioned = true;
          break;
        }
      }
    }
    if (!mentioned) return { isGameCommand: false };

    // Проверяем наличие ключевого слова game
    if (!text.includes("game")) return { isGameCommand: false };

    // Извлекаем дату в формате DD.MM.YYYY
    const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
    let gameDate: string | undefined;
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      gameDate = `${year}-${month}-${day}`;
    }
    return { isGameCommand: true, gameDate };
  }

  // --- Команды через слеш ---

  bot.command("stats", async (ctx) => {
    console.log(
      `[HANDLER] /stats вызван пользователем ${ctx.from?.id} (${ctx.from?.username || "без username"})`,
    );
    await deleteCommandMessage(ctx);
    try {
      // Разбираем аргументы
      const args = ctx.message.text.split(" ").slice(1);
      let filter: string | undefined = undefined;
      if (args.length > 0) {
        const arg = args[0].toLowerCase();
        if (arg === "all") {
          filter = "all";
        } else if (/^\d{4}$/.test(arg)) {
          filter = arg; // например, "2024"
        } else {
          // некорректный аргумент – используем последний год, но можно сообщить пользователю
          await replyWithAutoDelete(
            ctx,
            "❌ Неверный формат. Используйте `/stats all`, `/stats 2024` или просто `/stats` для последнего года.",
          );
          return;
        }
      }

      const stats = getFilteredStats(filter);
      if (stats.length === 0) {
        await replyWithAutoDelete(
          ctx,
          "📊 Пока нет данных для отображения за указанный период.",
        );
        return;
      }

      let message = "📊 Статистика участников";
      if (filter === "all") {
        message += " (всё время)";
      } else if (filter) {
        message += ` (${filter} год)`;
      } else {
        message += " (последний год)";
      }
      message += ":\n```\n";
      message += "№    Участник           Игр    Вход    Выход   Разница\n";
      message += "-------------------------------------------------------\n";

      stats.slice(0, 30).forEach(
        (
          item: {
            games_count: number;
            total_out: number;
            username: string;
            total_in: number;
          },
          index: number,
        ) => {
          const num = (index + 1).toString().padEnd(4);
          const username = item.username.padEnd(18);
          const gamesCount = item.games_count.toString().padStart(4);
          const totalIn = item.total_in.toString().padStart(6);
          const totalOut = item.total_out.toString().padStart(6);
          const diff = item.total_out - item.total_in;
          const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
          message += `${num} ${username} ${gamesCount} ${totalIn} ${totalOut} ${diffStr.padStart(7)}\n`;
        },
      );
      message += "```";
      await replyWithAutoDelete(ctx, message, { parse_mode: "Markdown" });
    } catch (error) {
      console.error("[ERROR] /stats ошибка:", error);
      await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
    }
  });

  bot.command("top", async (ctx) => {
    console.log(
      `[HANDLER] /top вызван пользователем ${ctx.from?.id} (${ctx.from?.username || "без username"})`,
    );
    await deleteCommandMessage(ctx);
    try {
      // Разбираем аргументы
      const args = ctx.message.text.split(" ").slice(1);
      let filter: string | undefined = undefined;
      if (args.length > 0) {
        const arg = args[0].toLowerCase();
        if (arg === "all") {
          filter = "all";
        } else if (/^\d{4}$/.test(arg)) {
          filter = arg;
        } else {
          await replyWithAutoDelete(
            ctx,
            "❌ Неверный формат. Используйте `/top all`, `/top 2024` или просто `/top` для последнего года.",
          );
          return;
        }
      }

      const scores = getFilteredScores(filter);
      if (scores.length === 0) {
        await replyWithAutoDelete(
          ctx,
          "📊 Пока нет данных за указанный период.",
        );
        return;
      }

      let title = "🏆 Топ участников";
      if (filter === "all") {
        title += " (всё время)";
      } else if (filter) {
        title += ` (${filter} год)`;
      } else {
        title += " (последний год)";
      }
      title += ":\n";

      const top = scores
        .slice(0, 10)
        .map((u: { username: string; score: number }, i: number) => {
          const sign = u.score >= 0 ? "+" : "";
          return `${i + 1}. ${u.username} — ${sign}${u.score}`;
        })
        .join("\n");

      await replyWithAutoDelete(ctx, title + top);
    } catch (error) {
      console.error("[ERROR] /top ошибка:", error);
      await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке топа.");
    }
  });

  bot.command("stats_update", async (ctx) => {
    console.log("[HANDLER] /stats_update вызван");
    await deleteCommandMessage(ctx);
    try {
      const statusMsg = await ctx.reply("🔄 Пересчёт статистики: 0%");
      const totalSteps = 10;
      for (let step = 1; step <= totalSteps; step++) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const percent = Math.floor((step / totalSteps) * 100);
        try {
          await ctx.telegram.editMessageText(
            ctx.chat.id,
            statusMsg.message_id,
            undefined,
            `🔄 Пересчёт статистики: ${percent}%`,
          );
        } catch (e) {
          console.error("[ERROR] edit message:", e);
        }
      }
      console.log("[DEBUG] Вызов recalcStats...");
      recalcStats();
      console.log("[DEBUG] recalcStats завершён");
      try {
        await ctx.deleteMessage(statusMsg.message_id);
      } catch (e) {
        console.error("[ERROR] delete message:", e);
      }
      await replyWithAutoDelete(ctx, "✅ Статистика успешно пересчитана!");
    } catch (error) {
      console.error("[ERROR] /stats_update исключение:", error);
      await replyWithAutoDelete(ctx, "❌ Ошибка при пересчёте.");
    }
  });

  bot.command("help", async (ctx) => {
    console.log("[HANDLER] /help вызван");
    await deleteCommandMessage(ctx);
    const helpMessage = [
      "📚 **Список доступных команд:**",
      "/stats — Показать детальную статистику всех участников (входы, выходы, разница)",
      "/top — Топ-10 участников по разнице (выход минус вход)",
      "/help — Показать это сообщение",
      "ℹ️ **Как добавлять данные:**",
      "Сообщения должны содержать строки вида:",
      "\`+<сумма> | <ник>\`",
      "Секции помечаются как \`Вход:\` и \`Выход:\`",
      "Пример:",
      "\`\`\`",
      "Вход:",
      "+500 | Тема",
      "+700 | @Rabotyaga3000",
      "Выход:",
      "+1840 | @EgorVaganov1111",
      "\`\`\`",
    ].join("\n");
    await replyWithAutoDelete(ctx, helpMessage, { parse_mode: "Markdown" });
  });

  // --- Обработка фото (регистрация игры с изображением) ---
  bot.on("photo", async (ctx) => {
    if (!ctx.message.caption) return;

    const parsed = parseMentionCommandFromMessage(
      ctx.message,
      ctx.botInfo.username,
    );
    if (!parsed.isGameCommand) return;

    console.log("[HANDLER] game через фото с caption");
    // Не удаляем сообщение

    const lines = ctx.message.caption
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l !== "");
    const cmdIndex = lines.findIndex((l) => l.includes("game"));
    if (cmdIndex === -1) {
      await replyWithAutoDelete(ctx, "❌ Не удалось определить команду.");
      return;
    }

    const dataLines = lines.slice(cmdIndex + 1);
    const gameDate = parsed.gameDate || new Date().toISOString().slice(0, 10);

    const gameId = createGame(ctx.chat.id, ctx.message.message_id, gameDate);
    const savedCount = parseAndAddTransactions(gameId, dataLines);

    if (savedCount === 0) {
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не найдено ни одной корректной записи. Игра создана без транзакций.",
      );
    } else {
      await replyWithAutoDelete(
        ctx,
        `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
      );
    }
  });

  // --- Обработка текстовых сообщений (регистрация игры через упоминание или обычные данные) ---
  bot.on("text", async (ctx) => {
    // Проверяем, не является ли это командой через упоминание
    const parsed = parseMentionCommandFromMessage(
      ctx.message,
      ctx.botInfo.username,
    );
    if (parsed.isGameCommand) {
      console.log("[HANDLER] game через текстовое упоминание");
      await deleteCommandMessage(ctx); // удаляем сообщение (для текста)

      const lines = ctx.message.text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== "");
      const cmdIndex = lines.findIndex((l) => l.includes("game"));
      if (cmdIndex === -1) {
        await replyWithAutoDelete(ctx, "❌ Не удалось определить команду.");
        return;
      }

      const dataLines = lines.slice(cmdIndex + 1);
      const gameDate = parsed.gameDate || new Date().toISOString().slice(0, 10);

      const gameId = createGame(ctx.chat.id, ctx.message.message_id, gameDate);
      const savedCount = parseAndAddTransactions(gameId, dataLines);

      if (savedCount === 0) {
        await replyWithAutoDelete(
          ctx,
          "⚠️ Не найдено ни одной корректной записи. Игра создана без транзакций.",
        );
      } else {
        await replyWithAutoDelete(
          ctx,
          `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
        );
      }
      return;
    }

    // Если не команда через упоминание, обрабатываем как обычное сообщение
    if (ctx.message.text.startsWith("/")) return; // команды через слеш уже обработаны

    console.log("[TEXT] обработка обычного сообщения:", ctx.message.text);
    const lines = ctx.message.text.split("\n");
    const gameDate = new Date().toISOString().slice(0, 10);
    try {
      const gameId = createGame(ctx.chat.id, ctx.message.message_id, gameDate);
      const savedCount = parseAndAddTransactions(gameId, lines);
      if (savedCount > 0) {
        console.log(`[TEXT] всего сохранено записей: ${savedCount}`);
      } else {
        console.log("[TEXT] нет подходящих строк");
      }
    } catch (err) {
      console.error("[TEXT] ошибка обработки:", err);
    }
  });

  // --- Обработка редактированных сообщений ---
  bot.on("edited_message", async (ctx) => {
    const editedMessage = ctx.editedMessage;
    if (!editedMessage) return;

    const chatId = editedMessage.chat.id;
    const messageId = editedMessage.message_id;

    // Пытаемся найти существующую игру по chat_id и message_id
    let gameId = getGameIdByChatAndMessage(chatId, messageId);

    // Если игра существует, обновляем её
    if (gameId) {
      console.log(
        "[HANDLER] редактирование существующей игры, обновляем данные",
      );

      let text = "";
      if ("text" in editedMessage) {
        text = editedMessage.text;
      } else if ("caption" in editedMessage) {
        text = editedMessage.caption || "";
      } else {
        return;
      }

      let gameDate = new Date().toISOString().slice(0, 10);
      const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
      if (dateMatch) {
        const [, day, month, year] = dateMatch;
        gameDate = `${year}-${month}-${day}`;
      }

      updateGameDate(gameId, gameDate);
      deleteTransactionsByGameId(gameId);

      const lines = text
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l !== "");
      const cmdIndex = lines.findIndex((l) => l.includes("game"));
      const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
      const savedCount = parseAndAddTransactions(gameId, dataLines);

      await replyWithAutoDelete(
        ctx,
        `✏️ Игра от ${gameDate} обновлена. Добавлено записей: ${savedCount}`,
      );
      return;
    }

    // Если игры нет, пытаемся создать новую на основе содержимого сообщения (без проверки упоминания)
    console.log(
      "[HANDLER] редактирование сообщения, игра не найдена – пробуем создать новую",
    );

    // Определяем текст сообщения
    let text = "";
    if ("text" in editedMessage) {
      text = editedMessage.text;
    } else if ("caption" in editedMessage) {
      text = editedMessage.caption || "";
    } else {
      return;
    }

    // Пытаемся извлечь дату из команды game (если есть)
    let gameDate = new Date().toISOString().slice(0, 10);
    const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      gameDate = `${year}-${month}-${day}`;
    }

    // Удаляем строку с командой game, если она есть, иначе берём все строки
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l !== "");
    const cmdIndex = lines.findIndex((l) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);

    // Пытаемся создать игру и добавить транзакции
    try {
      const newGameId = createGame(chatId, messageId, gameDate);
      const savedCount = parseAndAddTransactions(newGameId, dataLines);

      if (savedCount === 0) {
        // Если не удалось добавить ни одной транзакции, удаляем созданную игру
        deleteGameAndTransactions(chatId, messageId);
        console.log("[HANDLER] не найдено корректных записей, игра удалена");
      } else {
        await replyWithAutoDelete(
          ctx,
          `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
        );
      }
    } catch (err) {
      console.error(
        "[HANDLER] ошибка при создании игры из редактируемого сообщения:",
        err,
      );
      await replyWithAutoDelete(
        ctx,
        "❌ Не удалось создать игру из отредактированного сообщения.",
      );
    }
  });
  return bot;
}
