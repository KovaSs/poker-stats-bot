import { Telegraf } from "telegraf";
import {
  createGame,
  addTransaction,
  getAllStats,
  getAllScores,
  recalcStats,
} from "./db";

export function setupBot(token: string) {
  const bot = new Telegraf(token);

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

  // Функция удаления сообщения пользователя (команды)
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

  // Команда /stats – детальная таблица
  bot.command("stats", async (ctx) => {
    console.log("[HANDLER] /stats вызван");
    await deleteCommandMessage(ctx);

    try {
      const stats = await getAllStats();
      if (stats.length === 0) {
        await replyWithAutoDelete(ctx, "📊 Пока нет данных для отображения.");
        return;
      }

      let message = "📊 **Статистика участников:**\n```\n";
      message += "№    Участник           Вход    Выход   Разница\n";
      message += "------------------------------------------------\n";
      stats.slice(0, 20).forEach((item, index) => {
        const num = (index + 1).toString().padEnd(4);
        const username = item.username.padEnd(18);
        const totalIn = item.total_in.toString().padStart(6);
        const totalOut = item.total_out.toString().padStart(6);
        const diff = item.total_out - item.total_in;
        const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
        message += `${num} ${username} ${totalIn} ${totalOut} ${diffStr.padStart(7)}\n`;
      });
      message += "```";

      await replyWithAutoDelete(ctx, message, { parse_mode: "Markdown" });
    } catch (error) {
      console.error("[ERROR] /stats ошибка:", error);
      await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
    }
  });

  // Команда /top – краткий топ (разница)
  bot.command("top", async (ctx) => {
    console.log("[HANDLER] /top вызван");
    await deleteCommandMessage(ctx);

    try {
      const scores = await getAllScores();
      if (scores.length === 0) {
        return replyWithAutoDelete(ctx, "Пока нет данных.");
      }
      const top = scores
        .slice(0, 10)
        .map((u, i) => {
          const sign = u.score >= 0 ? "+" : "";
          return `${i + 1}. ${u.username} — ${sign}${u.score}`;
        })
        .join("\n");
      await replyWithAutoDelete(
        ctx,
        `🏆 Топ участников (разница вход/выход):\n${top}`,
      );
    } catch (error) {
      console.error("[ERROR] /top ошибка:", error);
      await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке топа.");
    }
  });

  // Команда /stats_update – пересчёт агрегированной статистики с прогрессом
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
      await recalcStats();
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

  // Команда /help – справка
  bot.command("help", async (ctx) => {
    console.log("[HANDLER] /help вызван");
    await deleteCommandMessage(ctx);

    const helpMessage = `
      📚 **Список доступных команд:**

      /stats — Показать детальную статистику всех участников (входы, выходы, разница)
      /top — Топ-10 участников по разнице (выход минус вход)
      /stats_update — Пересчитать агрегированную статистику на основе всех сохранённых транзакций
      /new_game [ГГГГ-ММ-ДД] — Создать игру с указанием даты и списком участников (далее строки "Вход:" и "Выход:" с +сумма | ник)
      /import — Импортировать игры из JSON-файла (прикрепите файл и в подписи напишите /import)
      /help — Показать это сообщение

      ℹ️ **Как добавлять данные:**
      Сообщения должны содержать строки вида:
      \`+<сумма> | <ник>\`
      Секции помечаются как \`Вход:\` и \`Выход:\`

      Пример:
      \`\`\`
      Вход:
      +500 | Тема
      +700 | @Rabotyaga3000
      Выход:
      +1840 | @EgorVaganov1111
      \`\`\``;

    await replyWithAutoDelete(ctx, helpMessage, { parse_mode: "Markdown" });
  });

  // --- ИМПОРТ ИЗ JSON ---
  // Функция обработки файла
  async function handleImportFile(ctx: any, document: any) {
    console.log("[IMPORT] Начинаем обработку файла:", document.file_name);

    if (!document.file_name.endsWith(".json")) {
      await replyWithAutoDelete(
        ctx,
        "❌ Пожалуйста, отправьте файл в формате JSON (расширение .json).",
      );
      return;
    }

    const fileLink = await ctx.telegram.getFileLink(document.file_id);

    let fileContent: string;
    try {
      const response = await fetch(fileLink.href);
      fileContent = await response.text();
    } catch (error) {
      console.error("[IMPORT] Ошибка скачивания файла:", error);
      await replyWithAutoDelete(ctx, "❌ Не удалось скачать файл.");
      return;
    }

    let gamesData: any[];
    try {
      gamesData = JSON.parse(fileContent);
      if (!Array.isArray(gamesData)) {
        throw new Error("JSON должен быть массивом");
      }
    } catch (error) {
      console.error("[IMPORT] Ошибка парсинга JSON:", error);
      await replyWithAutoDelete(
        ctx,
        "❌ Неверный формат JSON. Ожидается массив объектов.",
      );
      return;
    }

    let totalGames = 0;
    let totalTransactions = 0;
    const errors: string[] = [];

    for (const item of gamesData) {
      if (!item.date || !item.game) {
        errors.push(
          `Пропущен объект без поля date или game: ${JSON.stringify(item)}`,
        );
        continue;
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(item.date)) {
        errors.push(`Неверный формат даты: ${item.date}, ожидается YYYY-MM-DD`);
        continue;
      }

      let gameId: number;
      try {
        gameId = await createGame(ctx.chat.id, null, item.date);
      } catch (err) {
        console.error("[IMPORT] Ошибка создания игры:", err);
        errors.push(`Не удалось создать игру для даты ${item.date}`);
        continue;
      }

      const gameText = item.game;
      const lines = gameText
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");
      let currentType: "in" | "out" | null = null;
      let savedCount = 0;

      for (const line of lines) {
        if (line.toLowerCase() === "вход:") {
          currentType = "in";
          continue;
        } else if (line.toLowerCase() === "выход:") {
          currentType = "out";
          continue;
        }

        if (!currentType) continue;

        const match = line.match(/^\+(\d+)\s*\|\s*([^\/\n]+)/);
        if (match) {
          const points = parseInt(match[1], 10);
          let username = match[2].trim();
          const commentIndex = username.indexOf("//");
          if (commentIndex !== -1)
            username = username.substring(0, commentIndex).trim();

          if (username) {
            try {
              await addTransaction(gameId, username, points, currentType);
              savedCount++;
            } catch (err) {
              console.error(
                `[IMPORT] Ошибка сохранения транзакции для ${username}:`,
                err,
              );
              errors.push(
                `Ошибка сохранения транзакции для ${username} в игре от ${item.date}`,
              );
            }
          }
        }
      }

      if (savedCount > 0) {
        totalGames++;
        totalTransactions += savedCount;
      } else {
        errors.push(`Игра от ${item.date} не содержит корректных записей`);
      }
    }

    let report = `📊 Импорт завершён.\n`;
    report += `✅ Добавлено игр: ${totalGames}\n`;
    report += `📝 Добавлено транзакций: ${totalTransactions}\n`;
    if (errors.length > 0) {
      report += `\n⚠️ Ошибки (${errors.length}):\n`;
      errors.slice(0, 5).forEach((err) => (report += `• ${err}\n`));
      if (errors.length > 5) report += `... и ещё ${errors.length - 5} ошибок.`;
    }
    await replyWithAutoDelete(ctx, report);
  }

  // Обработчик документов (файлов) – проверяем caption на наличие команды /import
  bot.on("document", async (ctx) => {
    console.log("[HANDLER] получен документ");
    const caption = ctx.message.caption || "";
    if (caption.startsWith("/import")) {
      console.log("[IMPORT] Команда /import в caption");
      await deleteCommandMessage(ctx);
      await handleImportFile(ctx, ctx.message.document);
    } else {
      await replyWithAutoDelete(
        ctx,
        "❌ Чтобы импортировать игры, отправьте JSON-файл с подписью /import",
      );
    }
  });

  // Обработчик текстовой команды /import (когда файл не прикреплён)
  bot.command("import", async (ctx) => {
    console.log("[HANDLER] /import вызван без файла");
    await deleteCommandMessage(ctx);
    await replyWithAutoDelete(
      ctx,
      "📎 Пожалуйста, отправьте JSON-файл с данными игр. Можно прикрепить файл и в подписи написать /import.",
    );
  });

  // Обработчик обычных текстовых сообщений (НЕ команд)
  bot.on("text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) {
      console.log("[TEXT] команда, пропускаем");
      return;
    }

    console.log("[TEXT] обработка сообщения:", JSON.stringify(ctx));

    console.log("[TEXT] обработка сообщения:", ctx.message.text);
    const text = ctx.message.text;
    const lines = text.split("\n");

    let gameId: number;
    try {
      gameId = await createGame(ctx.chat.id, ctx.message.message_id);
    } catch (err) {
      console.error("[GAME] Ошибка создания игры:", err);
      return;
    }

    let currentType: "in" | "out" | null = null;
    let savedCount = 0;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase() === "вход:") {
        currentType = "in";
        continue;
      } else if (trimmed.toLowerCase() === "выход:") {
        currentType = "out";
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
            await addTransaction(gameId, username, points, currentType);
            savedCount++;
          } catch (err) {
            console.error(`[DB ERROR] Не удалось сохранить ${username}:`, err);
          }
        }
      }
    }

    if (savedCount === 0) {
      console.log("[TEXT] нет подходящих строк");
    } else {
      console.log(`[TEXT] всего сохранено записей: ${savedCount}`);
    }
  });

  return bot;
}
