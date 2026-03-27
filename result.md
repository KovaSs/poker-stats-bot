# Анализ структуры проекта

**Дата генерации:** 3/27/2026, 4:39:45 PM
**Обработано файлов:** 24
**Всего элементов (с учётом папок):** 34

## Структура проекта

```
├── backend/
│   ├── src/
│   │   ├── bot.ts
│   │   ├── db.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── data/
│   └── stats.db
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── lib/
│   ├── mtg-2.1.0-linux-arm64/
│   └── mtg-2.2.3-linux-arm64/
├── Dockerfile
├── README.md
├── docker-compose.yml
└── parser.js
```

## Оглавление

- [backend/package.json](#backend-package_json)
- [backend/src/bot.ts](#backend-src-bot_ts)
- [backend/src/db.ts](#backend-src-db_ts)
- [backend/src/index.ts](#backend-src-index_ts)
- [backend/tsconfig.json](#backend-tsconfig_json)
- [data/stats.db](#data-stats_db)
- [docker-compose.yml](#docker-compose_yml)
- [Dockerfile](#Dockerfile)
- [frontend/eslint.config.js](#frontend-eslint_config_js)
- [frontend/index.html](#frontend-index_html)
- [frontend/package.json](#frontend-package_json)
- [frontend/public/vite.svg](#frontend-public-vite_svg)
- [frontend/README.md](#frontend-README_md)
- [frontend/src/App.css](#frontend-src-App_css)
- [frontend/src/App.tsx](#frontend-src-App_tsx)
- [frontend/src/assets/react.svg](#frontend-src-assets-react_svg)
- [frontend/src/index.css](#frontend-src-index_css)
- [frontend/src/main.tsx](#frontend-src-main_tsx)
- [frontend/tsconfig.app.json](#frontend-tsconfig_app_json)
- [frontend/tsconfig.json](#frontend-tsconfig_json)
- [frontend/tsconfig.node.json](#frontend-tsconfig_node_json)
- [frontend/vite.config.ts](#frontend-vite_config_ts)
- [parser.js](#parser_js)
- [README.md](#README_md)

## Содержимое файлов

// backend/package.json

```json
{
  "name": "telegram-stats-bot-backend",
  "version": "0.0.1",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  },
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "telegraf": "^4.12.2"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/sqlite3": "^3.1.8",
    "ts-node": "^10.9.1",
    "typescript": "^5.0.4"
  }
}

```

// backend/src/bot.ts

```typescript
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

```

// backend/src/db.ts

```typescript
import Database from "better-sqlite3";

let db: Database.Database;

interface UserRow {
  username: string;
  telegram_id: number | null;
  total_in: number;
  total_out: number;
  games_count: number;
  game_ids: string;
}

export function initDB() {
  db = new Database("./data/stats.db");
  console.log("[DB] База данных инициализирована");

  // Таблица games
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      message_id INTEGER,
      game_date TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица transactions
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER,
      username TEXT,
      amount INTEGER,
      type TEXT CHECK(type IN ('in', 'out')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(game_id) REFERENCES games(id)
    )
  `);

  // Таблица users
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      username TEXT PRIMARY KEY,
      telegram_id INTEGER,
      total_in INTEGER DEFAULT 0,
      total_out INTEGER DEFAULT 0,
      games_count INTEGER DEFAULT 0,
      game_ids TEXT DEFAULT '[]'
    )
  `);
  console.log("[DB] Таблица users создана");

  // Миграция: если существовала таблица user_stats, переносим данные
  const tableExists = db
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='user_stats'`,
    )
    .get();
  if (tableExists) {
    console.log(
      "[DB] Обнаружена старая таблица user_stats, выполняем миграцию...",
    );
    db.exec(`
      INSERT OR IGNORE INTO users (username, total_in, total_out)
      SELECT username, total_in, total_out FROM user_stats
    `);
    db.exec(`DROP TABLE user_stats`);
    console.log("[DB] Миграция завершена, таблица user_stats удалена");
  }

  console.log("[DB] Все таблицы готовы");
}

export function createGame(
  chatId: number,
  messageId: number | null,
  gameDate?: string,
): number {
  const stmt = db.prepare(
    `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
  );
  const info = stmt.run(chatId, messageId, gameDate || null);
  console.log(
    `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}`,
  );
  return Number(info.lastInsertRowid);
}

export function getGameIdByChatAndMessage(
  chatId: number,
  messageId: number,
): number | null {
  const stmt = db.prepare(
    `SELECT id FROM games WHERE chat_id = ? AND message_id = ?`,
  );
  const row = stmt.get(chatId, messageId) as { id: number } | undefined;
  if (row) {
    console.log(
      `[DB] Найдена игра ID ${row.id} для чата ${chatId}, сообщения ${messageId}`,
    );
    return row.id;
  }
  console.log(
    `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена`,
  );
  return null;
}

export function updateGameDate(gameId: number, gameDate: string): void {
  const stmt = db.prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
  stmt.run(gameDate, gameId);
  console.log(`[DB] Дата игры ${gameId} обновлена на ${gameDate}`);
}

export function deleteTransactionsByGameId(gameId: number): void {
  const stmt = db.prepare(`DELETE FROM transactions WHERE game_id = ?`);
  const info = stmt.run(gameId);
  console.log(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
}

export function deleteGameAndTransactions(
  chatId: number,
  messageId: number,
): boolean {
  const gameId = getGameIdByChatAndMessage(chatId, messageId);
  if (!gameId) {
    console.log(
      `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена, удалять нечего`,
    );
    return false;
  }

  deleteTransactionsByGameId(gameId);

  const stmt = db.prepare(`DELETE FROM games WHERE id = ?`);
  const info = stmt.run(gameId);
  console.log(
    `[DB] Удалена игра ID ${gameId}, изменено строк: ${info.changes}`,
  );
  return true;
}

export function addTransaction(
  gameId: number,
  username: string,
  amount: number,
  type: "in" | "out",
  telegramId?: number | null,
): void {
  const stmt = db.prepare(
    `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
  );
  const info = stmt.run(gameId, username, amount, type);
  console.log(
    `[DB] addTransaction успешно: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
  );

  // Обновляем или создаём запись в users
  let user: UserRow | undefined;
  if (telegramId) {
    user = db
      .prepare(`SELECT * FROM users WHERE telegram_id = ?`)
      .get(telegramId) as UserRow | undefined;
  }
  if (!user) {
    user = db
      .prepare(`SELECT * FROM users WHERE username = ?`)
      .get(username) as UserRow | undefined;
  }

  const currentGameIds = user ? JSON.parse(user.game_ids) : [];
  if (!currentGameIds.includes(gameId)) {
    currentGameIds.push(gameId);
  }

  const newTotalIn = (user ? user.total_in : 0) + (type === "in" ? amount : 0);
  const newTotalOut =
    (user ? user.total_out : 0) + (type === "out" ? amount : 0);
  const newGamesCount = user ? currentGameIds.length : 1;

  if (user) {
    const updateStmt = db.prepare(`
      UPDATE users
      SET total_in = ?, total_out = ?, games_count = ?, game_ids = ?
      WHERE username = ?
    `);
    updateStmt.run(
      newTotalIn,
      newTotalOut,
      newGamesCount,
      JSON.stringify(currentGameIds),
      user.username,
    );
    console.log(`[DB] Обновлён пользователь ${user.username}`);
  } else {
    const insertStmt = db.prepare(`
      INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertStmt.run(
      username,
      telegramId || null,
      newTotalIn,
      newTotalOut,
      newGamesCount,
      JSON.stringify(currentGameIds),
    );
    console.log(`[DB] Создан новый пользователь ${username}`);
  }
}

export function recalcStats(): void {
  console.log("[DB] recalcStats начат");

  // Сначала очистим users
  db.prepare(`DELETE FROM users`).run();

  // Собираем все транзакции и группируем по username
  const rows = db
    .prepare(
      `
    SELECT username, game_id,
           SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END) as total_in,
           SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END) as total_out
    FROM transactions
    GROUP BY username, game_id
  `,
    )
    .all() as any[];

  // Агрегируем по пользователям
  const userMap = new Map<
    string,
    { total_in: number; total_out: number; games: Set<number> }
  >();
  for (const row of rows) {
    const key = row.username;
    if (!userMap.has(key)) {
      userMap.set(key, { total_in: 0, total_out: 0, games: new Set() });
    }
    const user = userMap.get(key)!;
    user.total_in += row.total_in;
    user.total_out += row.total_out;
    user.games.add(row.game_id);
  }

  // Вставляем агрегированные данные в users
  const insertStmt = db.prepare(`
    INSERT INTO users (username, total_in, total_out, games_count, game_ids)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const [username, data] of userMap.entries()) {
    const gameIds = Array.from(data.games);
    insertStmt.run(
      username,
      data.total_in,
      data.total_out,
      gameIds.length,
      JSON.stringify(gameIds),
    );
  }

  console.log(
    `[DB] recalcStats завершён, обработано пользователей: ${userMap.size}`,
  );
}

export function getFilteredStats(
  filter?: string | "all",
): {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}[] {
  let sql = `
    SELECT
      t.username,
      COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0) as total_in,
      COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) as total_out,
      COUNT(DISTINCT t.game_id) as games_count
    FROM transactions t
    JOIN games g ON t.game_id = g.id
  `;
  const params: any[] = [];

  if (filter === "all") {
    // без фильтрации по дате
  } else if (filter && /^\d{4}$/.test(filter)) {
    sql += ` WHERE g.game_date LIKE ?`;
    params.push(`${filter}%`);
  } else if (!filter) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().slice(0, 10);
    sql += ` WHERE g.game_date >= ?`;
    params.push(dateStr);
  } else {
    console.log(
      `[DB] getFilteredStats: неверный фильтр "${filter}", используем без фильтрации`,
    );
  }

  sql += ` GROUP BY t.username ORDER BY (total_out - total_in) DESC`;

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as any[];
  console.log(
    `[DB] getFilteredStats: получено ${rows.length} записей, фильтр: ${filter || "last year"}`,
  );
  return rows;
}

export function getFilteredScores(
  filter?: string | "all",
): { username: string; score: number }[] {
  let sql = `
    SELECT
      t.username,
      (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
       COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
    FROM transactions t
    JOIN games g ON t.game_id = g.id
  `;
  const params: any[] = [];

  if (filter === "all") {
    // без фильтрации
  } else if (filter && /^\d{4}$/.test(filter)) {
    sql += ` WHERE g.game_date LIKE ?`;
    params.push(`${filter}%`);
  } else if (!filter) {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const dateStr = oneYearAgo.toISOString().slice(0, 10);
    sql += ` WHERE g.game_date >= ?`;
    params.push(dateStr);
  } else {
    console.log(
      `[DB] getFilteredScores: неверный фильтр "${filter}", используем без фильтрации`,
    );
  }

  sql += ` GROUP BY t.username ORDER BY score DESC`;

  const stmt = db.prepare(sql);
  const rows = stmt.all(...params) as any[];
  console.log(
    `[DB] getFilteredScores: получено ${rows.length} записей, фильтр: ${filter || "last year"}`,
  );
  return rows;
}

// Старые функции для совместимости
export function getAllStats(): {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}[] {
  return getFilteredStats();
}

export function getAllScores(): { username: string; score: number }[] {
  return getFilteredScores();
}

```

// backend/src/index.ts

```typescript
import dotenv from "dotenv";

dotenv.config();

import { setupBot } from "./bot";
import { initDB } from "./db";

const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL!;
const BOT_TOKEN = process.env.BOT_TOKEN!;

async function main() {
  await initDB();
  const bot = setupBot(BOT_TOKEN, TELEGRAM_API_URL);
  bot.launch();
  console.log("Bot started");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch(console.error);

```

// backend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

```

// data/stats.db (base64, size: 86016, mtime: 2026-03-27T07:45:49.811Z, md5: 36e52ca6379da4328461ef74d1e81658)

```
U1FMaXRlIGZvcm1hdCAzABAAAQEAQCAgAAARfwAAABUAAAAAAAAAAAAAAAUAAAAEAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABF/AC6GKg0NgQAFDFsADyUO0w2JDFsNVgwmDCYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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NDYrAgYABQIhM/8WltnIpgeuMjAyNi0wMS0yOTIwMjYtMDItMTYgMTY6NDU6MTUrAQYABQIhM/8WltnIpge/MjAyNi0wMi0xNDIwAAAAFIIHAAAAEYExAAAAEFwNAAAAAg/hAA/hD+0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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Ch0J8gnICZgJbQk8CRMI5gi5CIEIUAgjB/YHywebB3AHPAcOBuQGqwZ5BkgGFgXrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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MzIwMjYtMDMtMTMgMTU6MzI6NTANAAAAAQ/SAA/SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArgggGAAUCITP/FpbZyKYKuDIwMjYtMDMtMjcyMDI2LTAzLTI3IDA3OjQ1OjQ5
```

// docker-compose.yml

```yaml
services:
  bot:
    build: .
    container_name: telegram-stats-bot
    restart: unless-stopped
    environment:
      - TELEGRAM_API_URL=${TELEGRAM_API_URL}
      - BOT_TOKEN=${BOT_TOKEN}
    volumes:
      - ./data:/app/data

```

// Dockerfile (base64, size: 1031, mtime: 2026-03-27T08:49:49.407Z, md5: 1e1d4b89b1d321bb373ef02e6eb86797)

```
IyDQrdGC0LDQvyDRgdCx0L7RgNC60Lgg0LHRjdC60LXQvdC00LAgKNC60L7QvNC/0LjQu9GP0YbQuNGPIFR5cGVTY3JpcHQpCkZST00gbm9kZToxOCBBUyBiYWNrZW5kLWJ1aWxkZXIKV09SS0RJUiAvYXBwL2JhY2tlbmQKQ09QWSBiYWNrZW5kL3BhY2thZ2UqLmpzb24gLi8KQ09QWSBiYWNrZW5kLyAuLwpSVU4gbnBtIGNpClJVTiBucG0gcnVuIGJ1aWxkCgojINCk0LjQvdCw0LvRjNC90YvQuSDQvtCx0YDQsNC3CkZST00gbm9kZToxOC1zbGltCldPUktESVIgL2FwcAoKIyDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDQuNC90YHRgtGA0YPQvNC10L3RgtGLINGB0LHQvtGA0LrQuCDQtNC70Y8g0LrQvtC80L/QuNC70Y/RhtC40Lgg0L3QsNGC0LjQstC90YvRhSDQvNC+0LTRg9C70LXQuQpSVU4gYXB0LWdldCB1cGRhdGUgJiYgYXB0LWdldCBpbnN0YWxsIC15IHB5dGhvbjMgbWFrZSBnKysgJiYgcm0gLXJmIC92YXIvbGliL2FwdC9saXN0cy8qCgojINCa0L7Qv9C40YDRg9C10Lwg0YLQvtC70YzQutC+INC90LXQvtCx0YXQvtC00LjQvNGL0LUg0YTQsNC50LvRiyDQuNC3IGJ1aWxkZXIt0YHRgtCw0LTQuNC5CkNPUFkgLS1mcm9tPWJhY2tlbmQtYnVpbGRlciAvYXBwL2JhY2tlbmQvZGlzdCAuL2Rpc3QKQ09QWSAtLWZyb209YmFja2VuZC1idWlsZGVyIC9hcHAvYmFja2VuZC9wYWNrYWdlLmpzb24gLi8KCiMg0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LfQsNCy0LjRgdC40LzQvtGB0YLQuCDQuCDQv9GA0LjQvdGD0LTQuNGC0LXQu9GM0L3QviDQv9C10YDQtdGB0L7QsdC40YDQsNC10Lwgc3FsaXRlMyDQv9C+0LQg0LDRgNGF0LjRgtC10LrRgtGD0YDRgyDQutC+0L3RgtC10LnQvdC10YDQsApSVU4gbnBtIGluc3RhbGwgLS1wcm9kdWN0aW9uICYmIG5wbSByZWJ1aWxkIHNxbGl0ZTMgLS1idWlsZC1mcm9tLXNvdXJjZQoKIyDQn9Cw0L/QutCwINC00LvRjyDQsdCw0LfRiyDQtNCw0L3QvdGL0YUKVk9MVU1FIFsgIi9hcHAvZGF0YSIgXQoKRVhQT1NFIDMwMDAKQ01EIFsibm9kZSIsICJkaXN0L2luZGV4LmpzIl0=
```

// frontend/eslint.config.js

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

// frontend/index.html

```html
<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Статистика чата</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

// frontend/package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.7",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.48.0",
    "vite": "^7.3.1"
  }
}

```

// frontend/public/vite.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>
```

// frontend/README.md

```markdown
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

// frontend/src/App.css

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}

```

// frontend/src/App.tsx

```tsx
import { useEffect, useState } from "react";

interface UserScore {
  username: string;
  score: number;
}

function App() {
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setScores);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📊 Статистика чата</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#3498db", color: "white" }}>
            <th>#</th>
            <th>Участник</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => (
            <tr key={item.username} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

```

// frontend/src/assets/react.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

// frontend/src/index.css

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

```

// frontend/src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

// frontend/tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

// frontend/tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

// frontend/tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

// frontend/vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});

```

// parser.js

```javascript
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const newLocal = "discovery-career";
// ----------------------------------------------------------------------
// Фиксированные настройки (без параметров командной строки)
// ----------------------------------------------------------------------

// Игнорируемые директории (на любом уровне)
const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  ".vscode",
  ".idea",
  "dist",
  "build",
  "coverage",
  ".next",
  "out",
  "vendor",
  "tmp",
  "temp",
  "logs",
  ".gitlab",
  ".helm",
  ".husky",
  ".nx",
  // apps/
  newLocal,
  // 'discovery-gw',
  "discovery-lego",
  "discovery-permissions",
  "discovery-s3",
  "discovery-search",
  "discovery-segments",
  "discovery-widgets",
]);

// Игнорируемые файлы по имени (на любом уровне)
const IGNORE_FILES = new Set([
  "result.md",
  ".DS_Store",
  "thumbs.db",
  ".env",
  ".gitignore",
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "composer.lock",
  "game.db",
]);

// Максимальный размер бинарного файла для включения base64 (1 МБ)
const MAX_BINARY_SIZE = 1 * 1024 * 1024;

// ----------------------------------------------------------------------
// Определение типов файлов и языков (с группировкой для читаемости)
// ----------------------------------------------------------------------

const TEXT_EXTENSIONS = new Set([
  // -------------------------------
  // Web
  // -------------------------------
  ".html",
  ".htm",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".vue",
  ".svelte",

  // -------------------------------
  // Backend
  // -------------------------------
  ".py",
  ".rb",
  ".php",
  ".java",
  ".go",
  ".rs",
  ".swift",
  ".kt",
  ".scala",

  // -------------------------------
  // Config / data
  // -------------------------------
  ".json",
  ".yaml",
  ".yml",
  ".toml",
  ".ini",
  ".cfg",
  ".conf",
  ".xml",
  ".svg",
  ".properties",
  ".env.example",

  // -------------------------------
  // Documentation
  // -------------------------------
  ".md",
  ".rst",
  ".txt",
  ".tex",
  ".log",
  ".csv",
  ".tsv",
  ".psv",

  // -------------------------------
  // Shell / scripts
  // -------------------------------
  ".sh",
  ".bash",
  ".zsh",
  ".fish",
  ".ps1",
  ".bat",
  ".cmd",

  // -------------------------------
  // Database
  // -------------------------------
  ".sql",
  ".graphql",
  ".gql",

  // -------------------------------
  // Other code
  // -------------------------------
  ".cpp",
  ".c",
  ".h",
  ".hpp",
  ".cs",
  ".fs",
  ".fsx",
  ".lua",
  ".pl",
  ".pm",

  // -------------------------------
  // Templates
  // -------------------------------
  ".ejs",
  ".pug",
  ".jade",
  ".handlebars",
  ".hbs",
  ".mustache",
]);

const EXTENSION_TO_LANG = {
  // Web
  ".js": "javascript",
  ".jsx": "jsx",
  ".ts": "typescript",
  ".tsx": "tsx",
  ".vue": "vue",
  ".svelte": "svelte",
  ".html": "html",
  ".htm": "html",
  ".css": "css",
  ".scss": "scss",
  ".sass": "sass",
  ".less": "less",

  // Backend
  ".py": "python",
  ".rb": "ruby",
  ".php": "php",
  ".java": "java",
  ".go": "go",
  ".rs": "rust",
  ".swift": "swift",
  ".kt": "kotlin",
  ".scala": "scala",

  // Config / data
  ".json": "json",
  ".yaml": "yaml",
  ".yml": "yaml",
  ".toml": "toml",
  ".xml": "xml",
  ".svg": "svg",
  ".properties": "properties",
  ".ini": "ini",
  ".cfg": "ini",
  ".conf": "ini",

  // Documentation
  ".md": "markdown",
  ".rst": "rst",
  ".txt": "text",
  ".log": "text",
  ".csv": "csv",
  ".tsv": "tsv",

  // Shell / scripts
  ".sh": "bash",
  ".bash": "bash",
  ".zsh": "bash",
  ".ps1": "powershell",
  ".bat": "batch",
  ".cmd": "batch",

  // Database
  ".sql": "sql",
  ".graphql": "graphql",
  ".gql": "graphql",

  // Other code
  ".cpp": "cpp",
  ".c": "c",
  ".h": "c",
  ".hpp": "cpp",
  ".cs": "csharp",
  ".lua": "lua",
  ".pl": "perl",
  ".pm": "perl",

  // Templates
  ".ejs": "ejs",
};

function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return TEXT_EXTENSIONS.has(ext);
}

function getLanguage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return EXTENSION_TO_LANG[ext] || "";
}

// ----------------------------------------------------------------------
// Обход директорий – собираем ВСЕ неигнорируемые пути (и папки, и файлы)
// ----------------------------------------------------------------------

async function walk(dir, baseDir = dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (IGNORE_FILES.has(entry.name)) continue;

    if (entry.isDirectory()) {
      if (IGNORE_DIRS.has(entry.name)) continue;
      // добавляем папку в результаты (даже если она пуста)
      results.push({ path: fullPath, isDirectory: true });
      await walk(fullPath, baseDir, results);
    } else {
      results.push({ path: fullPath, isDirectory: false });
    }
  }
  return results;
}

// ----------------------------------------------------------------------
// Чтение файла с обработкой
// ----------------------------------------------------------------------

async function readFileContent(filePath) {
  const stats = await fs.stat(filePath);
  const isText = isTextFile(filePath);

  if (isText) {
    try {
      const content = await fs.readFile(filePath, "utf8");
      return { type: "text", content, stats };
    } catch (err) {
      console.warn(
        `Не удалось прочитать текстовый файл ${filePath}: ${err.message}`,
      );
      return null;
    }
  }

  // Бинарный файл
  if (stats.size > MAX_BINARY_SIZE) {
    // слишком большой – только метаданные
    const hash = crypto
      .createHash("md5")
      .update(await fs.readFile(filePath))
      .digest("hex");
    return { type: "binary-meta", stats, hash };
  } else {
    const buffer = await fs.readFile(filePath);
    const base64 = buffer.toString("base64");
    const hash = crypto.createHash("md5").update(buffer).digest("hex");
    return { type: "binary", content: base64, stats, hash };
  }
}

// ----------------------------------------------------------------------
// Генерация дерева каталогов (теперь на основе всех путей – и папок, и файлов)
// ----------------------------------------------------------------------

function generateTree(entries, baseDir) {
  const root = { name: path.basename(baseDir), children: {}, files: [] };

  for (const entry of entries) {
    const relative = path.relative(baseDir, entry.path);
    const parts = relative.split(path.sep);
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (!isLast) {
        // промежуточная директория – создаём, если ещё нет
        if (!current.children[part]) {
          current.children[part] = { name: part, children: {}, files: [] };
        }
        current = current.children[part];
      } else {
        // последний элемент – файл или директория
        if (entry.isDirectory) {
          // если это папка, создаём узел (даже если она пуста)
          if (!current.children[part]) {
            current.children[part] = { name: part, children: {}, files: [] };
          }
        } else {
          // это файл
          current.files.push(part);
        }
      }
    }
  }

  // рекурсивная отрисовка
  function render(node, prefix = "") {
    const lines = [];
    const dirs = Object.keys(node.children).sort();
    const files = node.files.sort();

    for (let i = 0; i < dirs.length; i++) {
      const dirName = dirs[i];
      const child = node.children[dirName];
      const isLastDir = i === dirs.length - 1 && files.length === 0;
      lines.push(prefix + (isLastDir ? "└── " : "├── ") + dirName + "/");
      lines.push(
        ...render(child, prefix + (isLastDir ? "    " : "│   "), isLastDir),
      );
    }

    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const isLastFile = i === files.length - 1;
      lines.push(prefix + (isLastFile ? "└── " : "├── ") + fileName);
    }
    return lines;
  }

  return render(root).join("\n");
}

// ----------------------------------------------------------------------
// Основная функция
// ----------------------------------------------------------------------

async function main() {
  const startDir = process.cwd();
  console.log(`Сканирование директории: ${startDir}`);

  const entries = await walk(startDir);
  // сортируем пути для стабильности (не обязательно, но красиво)
  entries.sort((a, b) => a.path.localeCompare(b.path));

  const filePaths = entries.filter((e) => !e.isDirectory).map((e) => e.path);
  console.log(
    `Найдено элементов: всего ${entries.length}, файлов: ${filePaths.length}`,
  );

  const tree = generateTree(entries, startDir);

  const fileBlocks = [];
  const tocItems = [];

  let totalFiles = filePaths.length;
  let parsedFiles = 0;
  let skippedBinaryLarge = 0;
  let failedFiles = 0;

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i];
    const relativePath = path.relative(startDir, filePath);

    let fileData;
    try {
      fileData = await readFileContent(filePath);
    } catch (err) {
      console.warn(`Ошибка обработки ${filePath}: ${err.message}`);
      failedFiles++;
      continue;
    }

    if (!fileData) {
      failedFiles++;
      continue;
    }

    if (fileData.type === "text" || fileData.type === "binary") {
      parsedFiles++;
    } else if (fileData.type === "binary-meta") {
      skippedBinaryLarge++;
    }

    // Якорь для оглавления
    const anchor = relativePath
      .replace(/[^a-zA-Z0-9\-_/]/g, "_")
      .replace(/\//g, "-");
    tocItems.push(`- [${relativePath}](#${anchor})`);

    let block = `// ${relativePath}`;

    if (fileData.type === "text") {
      const lang = getLanguage(filePath);
      block += `\n\n\`\`\`${lang}\n${fileData.content}\n\`\`\``;
    } else if (fileData.type === "binary") {
      block += ` (base64, size: ${fileData.stats.size}, mtime: ${fileData.stats.mtime.toISOString()}, md5: ${fileData.hash})\n\n\`\`\`\n${fileData.content}\n\`\`\``;
    } else {
      // binary-meta
      block += ` (meta only, size: ${fileData.stats.size}, mtime: ${fileData.stats.mtime.toISOString()}, md5: ${fileData.hash})\n\n\`\`\`\`\`\``;
    }

    fileBlocks.push(block + "\n\n");
  }

  const header = `# Анализ структуры проекта

**Дата генерации:** ${new Date().toLocaleString()}
**Обработано файлов:** ${totalFiles}
**Всего элементов (с учётом папок):** ${entries.length}

## Структура проекта

\`\`\`
${tree}
\`\`\`

## Оглавление

${tocItems.join("\n")}

## Содержимое файлов

`;

  const outputContent = header + fileBlocks.join("");
  const outputFilePath = path.join(startDir, "result.md");
  await fs.writeFile(outputFilePath, outputContent, "utf8");

  console.log(`\nСтатистика:
  Всего файлов: ${totalFiles}
  Успешно распарсено (текст + base64): ${parsedFiles}
  Бинарных >1 МБ (только метаданные): ${skippedBinaryLarge}
  Ошибок чтения: ${failedFiles}
Готово! Результат сохранён в ${outputFilePath}`);
}

main().catch((err) => {
  console.error("Ошибка:", err);
  process.exit(1);
});

```

// README.md

```markdown
# Poker Stats Bot

Telegram-бот для сбора и отображения статистики входов/выходов участников в групповом чате. Удобен для подсчёта фишек в покере, долгов или любых других единиц с разделением на операции «Вход» и «Выход».

## 🚀 Возможности

- Парсинг сообщений вида `+<сумма> | <ник>` внутри секций `Вход:` и `Выход:`.
- Сохранение каждой транзакции в базе данных SQLite (`better-sqlite3`).
- Подсчёт суммарных входов, выходов и разницы для каждого участника.
- Команды для просмотра статистики прямо в чате.
- Автоматическое удаление ответов бота через 30 секунд (опционально).
- Удаление сообщений пользователей с командами (для чистоты чата).
- Импорт игр из JSON-файла.
- Поддержка даты игры.

## 🛠 Технологии

- Node.js + TypeScript
- [Telegraf](https://telegraf.js.org/) — библиотека для Telegram Bot API
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — лёгкая встраиваемая СУБД
- Docker / Docker Compose — контейнеризация

## 📦 Быстрый старт

### Требования

- Docker и Docker Compose (на сервере или локально)
- Токен бота от [@BotFather](https://t.me/botfather)

### Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/poker-stats-bot.git
cd poker-stats-bot
```

2. Создайте файл `.env` в корне проекта:

```env
BOT_TOKEN=ваш_токен_бота
```

3. Запустите контейнер:

```bash
docker-compose up -d
```

4. Проверьте логи:

```bash
docker-compose logs -f
```

Должны увидеть `Bot started`.

### Настройка бота в группе

- Добавьте бота в группу.
- Дайте ему права администратора (хотя бы на удаление сообщений, если хотите, чтобы команды удалялись).
- В BotFather отключите Privacy Mode (`/setprivacy` → Disable), чтобы бот видел все сообщения.

## 🤖 Команды бота

| Команда                  | Описание                                                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `/stats`                 | Показать подробную таблицу статистики (входы, выходы, разница).                                                                        |
| `/top`                   | Топ-10 участников по разнице (выход минус вход).                                                                                       |
| `/stats_update`          | Принудительный пересчёт агрегированной статистики.                                                                                     |
| `/new_game [ГГГГ-ММ-ДД]` | Создать новую игру. Если дата не указана, используется текущая. Далее должны следовать секции `Вход:` и `Выход:` со строками `+<сумма> | <ник>`. |
| `/import`                | Импортировать игры из JSON-файла (файл прикрепляется с подписью `/import`).                                                            |
| `/help`                  | Показать справку по командам.                                                                                                          |

### Пример использования

```
/new_game 2025-02-16
Вход:
+500 | Тема
+700 | @Rabotyaga3000
Выход:
+1840 | @EgorVaganov1111
+290 | @kovass
```

### Формат JSON для импорта

```json
[
  {
    "date": "2025-02-15",
    "game": "+500 | Тема\n+500 | Диман\nВыход:\n+600 | @kovass"
  }
]
```

## 🗄 База данных

Файл `stats.db` хранится в папке `./data` на хосте. Структура:

- `games` — игры (сообщения).
- `transactions` — отдельные записи.
- `user_stats` — агрегированная статистика.

## 🔧 Разработка и модификация

1. Установите Node.js 18+.
2. Перейдите в папку `backend` и установите зависимости:

```bash
cd backend
npm install
```

3. Скомпилируйте TypeScript:

```bash
npm run build
```

4. Для разработки с автоперезапуском:

```bash
npm run dev
```

```

