# Анализ структуры проекта

**Дата генерации:** 4/11/2026, 10:57:03 AM
**Обработано файлов:** 75
**Всего элементов (с учётом папок):** 103

## Структура проекта

```
├── backend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── routes/
│   │   │   │   ├── stats.test.ts
│   │   │   │   └── stats.ts
│   │   │   └── server.ts
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── logger.ts
│   │   ├── db/
│   │   │   ├── migrations/
│   │   │   │   └── index.ts
│   │   │   ├── repositories/
│   │   │   │   ├── game.repository/
│   │   │   │   │   ├── game.repository.test.ts
│   │   │   │   │   ├── game.repository.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── transaction.repository/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── transaction.repository.test.ts
│   │   │   │   │   └── transaction.repository.ts
│   │   │   │   ├── user.repository/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── user.repository.test.ts
│   │   │   │   │   └── user.repository.ts
│   │   │   │   └── index.ts
│   │   │   ├── connection.ts
│   │   │   └── migrator.ts
│   │   ├── services/
│   │   │   ├── game.service/
│   │   │   │   ├── game.service.test.ts
│   │   │   │   ├── game.service.ts
│   │   │   │   └── index.ts
│   │   │   ├── parser.service/
│   │   │   │   ├── index.ts
│   │   │   │   ├── parser.service.test.ts
│   │   │   │   └── parser.service.ts
│   │   │   ├── stats.service/
│   │   │   │   ├── index.ts
│   │   │   │   ├── stats.service.test.ts
│   │   │   │   └── stats.service.ts
│   │   │   └── index.ts
│   │   ├── telegram/
│   │   │   ├── callbacks/
│   │   │   │   ├── callbacks.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── stats.ts
│   │   │   │   ├── top.ts
│   │   │   │   ├── types.ts
│   │   │   │   └── utils.ts
│   │   │   ├── handlers/
│   │   │   │   ├── common/
│   │   │   │   │   ├── common.test.ts
│   │   │   │   │   ├── common.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── game/
│   │   │   │   │   ├── game.test.ts
│   │   │   │   │   ├── game.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── help/
│   │   │   │   │   ├── help.test.ts
│   │   │   │   │   ├── help.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── stats/
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── stats.test.ts
│   │   │   │   │   └── stats.ts
│   │   │   │   └── index.ts
│   │   │   ├── bot.ts
│   │   │   └── middlewares.ts
│   │   ├── types/
│   │   │   └── telegram.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
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
├── Dockerfile
├── README.md
├── docker-compose.yml
├── history.json
├── parser.js
└── result.json
```

## Оглавление

- [backend/package.json](#backend-package_json)
- [backend/src/api/routes/stats.test.ts](#backend-src-api-routes-stats_test_ts)
- [backend/src/api/routes/stats.ts](#backend-src-api-routes-stats_ts)
- [backend/src/api/server.ts](#backend-src-api-server_ts)
- [backend/src/config/env.ts](#backend-src-config-env_ts)
- [backend/src/config/logger.ts](#backend-src-config-logger_ts)
- [backend/src/db/connection.ts](#backend-src-db-connection_ts)
- [backend/src/db/migrations/index.ts](#backend-src-db-migrations-index_ts)
- [backend/src/db/migrator.ts](#backend-src-db-migrator_ts)
- [backend/src/db/repositories/game.repository/game.repository.test.ts](#backend-src-db-repositories-game_repository-game_repository_test_ts)
- [backend/src/db/repositories/game.repository/game.repository.ts](#backend-src-db-repositories-game_repository-game_repository_ts)
- [backend/src/db/repositories/game.repository/index.ts](#backend-src-db-repositories-game_repository-index_ts)
- [backend/src/db/repositories/index.ts](#backend-src-db-repositories-index_ts)
- [backend/src/db/repositories/transaction.repository/index.ts](#backend-src-db-repositories-transaction_repository-index_ts)
- [backend/src/db/repositories/transaction.repository/transaction.repository.test.ts](#backend-src-db-repositories-transaction_repository-transaction_repository_test_ts)
- [backend/src/db/repositories/transaction.repository/transaction.repository.ts](#backend-src-db-repositories-transaction_repository-transaction_repository_ts)
- [backend/src/db/repositories/user.repository/index.ts](#backend-src-db-repositories-user_repository-index_ts)
- [backend/src/db/repositories/user.repository/user.repository.test.ts](#backend-src-db-repositories-user_repository-user_repository_test_ts)
- [backend/src/db/repositories/user.repository/user.repository.ts](#backend-src-db-repositories-user_repository-user_repository_ts)
- [backend/src/index.ts](#backend-src-index_ts)
- [backend/src/services/game.service/game.service.test.ts](#backend-src-services-game_service-game_service_test_ts)
- [backend/src/services/game.service/game.service.ts](#backend-src-services-game_service-game_service_ts)
- [backend/src/services/game.service/index.ts](#backend-src-services-game_service-index_ts)
- [backend/src/services/index.ts](#backend-src-services-index_ts)
- [backend/src/services/parser.service/index.ts](#backend-src-services-parser_service-index_ts)
- [backend/src/services/parser.service/parser.service.test.ts](#backend-src-services-parser_service-parser_service_test_ts)
- [backend/src/services/parser.service/parser.service.ts](#backend-src-services-parser_service-parser_service_ts)
- [backend/src/services/stats.service/index.ts](#backend-src-services-stats_service-index_ts)
- [backend/src/services/stats.service/stats.service.test.ts](#backend-src-services-stats_service-stats_service_test_ts)
- [backend/src/services/stats.service/stats.service.ts](#backend-src-services-stats_service-stats_service_ts)
- [backend/src/telegram/bot.ts](#backend-src-telegram-bot_ts)
- [backend/src/telegram/callbacks/callbacks.ts](#backend-src-telegram-callbacks-callbacks_ts)
- [backend/src/telegram/callbacks/index.ts](#backend-src-telegram-callbacks-index_ts)
- [backend/src/telegram/callbacks/stats.ts](#backend-src-telegram-callbacks-stats_ts)
- [backend/src/telegram/callbacks/top.ts](#backend-src-telegram-callbacks-top_ts)
- [backend/src/telegram/callbacks/types.ts](#backend-src-telegram-callbacks-types_ts)
- [backend/src/telegram/callbacks/utils.ts](#backend-src-telegram-callbacks-utils_ts)
- [backend/src/telegram/handlers/common/common.test.ts](#backend-src-telegram-handlers-common-common_test_ts)
- [backend/src/telegram/handlers/common/common.ts](#backend-src-telegram-handlers-common-common_ts)
- [backend/src/telegram/handlers/common/index.ts](#backend-src-telegram-handlers-common-index_ts)
- [backend/src/telegram/handlers/game/game.test.ts](#backend-src-telegram-handlers-game-game_test_ts)
- [backend/src/telegram/handlers/game/game.ts](#backend-src-telegram-handlers-game-game_ts)
- [backend/src/telegram/handlers/game/index.ts](#backend-src-telegram-handlers-game-index_ts)
- [backend/src/telegram/handlers/help/help.test.ts](#backend-src-telegram-handlers-help-help_test_ts)
- [backend/src/telegram/handlers/help/help.ts](#backend-src-telegram-handlers-help-help_ts)
- [backend/src/telegram/handlers/help/index.ts](#backend-src-telegram-handlers-help-index_ts)
- [backend/src/telegram/handlers/index.ts](#backend-src-telegram-handlers-index_ts)
- [backend/src/telegram/handlers/stats/index.ts](#backend-src-telegram-handlers-stats-index_ts)
- [backend/src/telegram/handlers/stats/stats.test.ts](#backend-src-telegram-handlers-stats-stats_test_ts)
- [backend/src/telegram/handlers/stats/stats.ts](#backend-src-telegram-handlers-stats-stats_ts)
- [backend/src/telegram/middlewares.ts](#backend-src-telegram-middlewares_ts)
- [backend/src/types/telegram.ts](#backend-src-types-telegram_ts)
- [backend/tsconfig.json](#backend-tsconfig_json)
- [backend/vitest.config.ts](#backend-vitest_config_ts)
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
- [history.json](#history_json)
- [parser.js](#parser_js)
- [README.md](#README_md)
- [result.json](#result_json)

## Содержимое файлов

// backend/package.json

```json
{
  "name": "telegram-stats-bot-backend",
  "version": "0.1.0",
  "scripts": {
    "dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/index.ts",
    "start": "node dist/index.js",
    "build": "tsc",
    "test:unit": "vitest",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  },
  "dependencies": {
    "better-sqlite3": "^11.0.0",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "pino": "^10.3.1",
    "pino-pretty": "^13.1.3",
    "telegraf": "^4.12.2",
    "tsconfig-paths": "^4.2.0"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.13",
    "@types/express": "^4.17.17",
    "@types/node": "^18.15.11",
    "@types/sqlite3": "^3.1.8",
    "@types/supertest": "^7.2.0",
    "@vitest/coverage-v8": "^3.1.1",
    "supertest": "^7.2.2",
    "ts-node": "^10.9.1",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.4",
    "vitest": "^3.1.1"
  }
}

```

// backend/src/api/routes/stats.test.ts

```typescript
import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import { StatsService } from "@/services";

import statsRouter from "./stats";

vi.mock("../../services", () => ({
  StatsService: {
    getFilteredStats: vi.fn(),
  },
}));

const app = express();
app.use("/stats", statsRouter);

describe("GET /stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает статистику без фильтра", async () => {
    const mockStats = [
      { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
    ];
    (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockStats);
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(123, undefined);
  });

  it("передаёт параметр filter", async () => {
    await request(app).get("/stats?chatId=123&filter=2024");
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(123, "2024");
  });

  it("обрабатывает ошибки сервиса", async () => {
    (StatsService.getFilteredStats as any).mockImplementation(() => {
      throw new Error("DB error");
    });
    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});

```

// backend/src/api/routes/stats.ts

```typescript
import { Router } from "express";

import { StatsService } from "@/services";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const chatIdParam = req.query.chatId as string | undefined;

    if (!chatIdParam) {
      return res.status(400).json({ error: "chatId is required" });
    }
    const chatId = parseInt(chatIdParam, 10);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chatId" });
    }

    const stats = StatsService.getFilteredStats(chatId, filter);
    res.json(stats);
  } catch (error) {
    console.error("[API] /stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

```

// backend/src/api/server.ts

```typescript
import express from "express";

import { logger } from "@/config/logger";
import { API_PORT } from "@/config/env";

import statsRouter from "./routes/stats";

export function startApiServer() {
  const app = express();
  app.use(express.json());

  app.use("/api/stats", statsRouter);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      logger.error({ error: err }, "API ошибка");
      res.status(500).json({ error: "Internal server error" });
    },
  );

  app.listen(API_PORT, () => {
    logger.info({ port: API_PORT }, "API сервер запущен");
  });
}

```

// backend/src/config/env.ts

```typescript
import dotenv from "dotenv";
import path from "path";

import { logger } from "@/config/logger";

const envPath = path.resolve(process.cwd(), "../.env");
dotenv.config({ path: envPath });

export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL!;
export const API_PORT = parseInt(process.env.API_PORT || "3000", 10);

if (!BOT_TOKEN) {
  logger.error(
    "❌ BOT_TOKEN не задан. Создайте файл .env в корне проекта и добавьте BOT_TOKEN=ваш_токен",
  );
  process.exit(1);
}

```

// backend/src/config/logger.ts

```typescript
import pino from "pino";

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "SYS:standard" },
        }
      : undefined,
});

```

// backend/src/db/connection.ts

```typescript
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";
import { runMigrations } from "./migrator";

let db: Database.Database;

function getDatabasePath(): string {
  // Если путь явно передан через окружение – используем его
  if (process.env.DB_PATH) {
    return process.env.DB_PATH;
  }

  // В production (Docker) используем /app/data/stats.db
  if (process.env.NODE_ENV === "production") {
    return path.join("/app", "data", "stats.db");
  }

  // В разработке – папка data на уровень выше backend
  return path.join(process.cwd(), "..", "data", "stats.db");
}

export function initDB(): Database.Database {
  const dbPath = getDatabasePath();
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    logger.info(`[DB] Создана директория: ${dir}`);
  }
  db = new Database(dbPath);
  logger.info(`[DB] База данных инициализирована: ${dbPath}`);

  // Применяем миграции (они безопасны, так как проверяют существование таблиц)
  runMigrations(db);

  return db;
}

export function getDB(): Database.Database {
  if (!db) throw new Error("DB not initialized");
  return db;
}

```

// backend/src/db/migrations/index.ts

```typescript
import { Database } from "better-sqlite3";

export interface Migration {
  name: string;
  up: (db: Database) => void;
}

export const migrations: Migration[] = [
  {
    name: "001_initial_schema",
    up: (db: Database) => {
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
          FOREIGN KEY(game_id) REFERENCES games(id) ON DELETE CASCADE
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

      // Индексы
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_transactions_game_id ON transactions(game_id);
        CREATE INDEX IF NOT EXISTS idx_games_game_date ON games(game_date);
      `);
    },
  },
  {
    name: "002_migrate_user_stats",
    up: (db: Database) => {
      // Проверяем существование старой таблицы user_stats
      const tableExists = db
        .prepare(
          `SELECT name FROM sqlite_master WHERE type='table' AND name='user_stats'`,
        )
        .get();
      if (tableExists) {
        db.exec(`
          INSERT OR IGNORE INTO users (username, total_in, total_out)
          SELECT username, total_in, total_out FROM user_stats
        `);
        db.exec(`DROP TABLE user_stats`);
      }
    },
  },
];

```

// backend/src/db/migrator.ts

```typescript
import { Database } from "better-sqlite3";

import { logger } from "@/config/logger";

import { migrations } from "./migrations";

function ensureMigrationsTable(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function runMigrations(db: Database): void {
  ensureMigrationsTable(db);

  const applied = db
    .prepare("SELECT name FROM migrations")
    .all()
    .map((row: any) => row.name);

  for (const migration of migrations) {
    if (!applied.includes(migration.name)) {
      logger.info(`[DB] Applying migration: ${migration.name}`);
      try {
        migration.up(db);
        db.prepare("INSERT INTO migrations (name) VALUES (?)").run(
          migration.name,
        );
        logger.info(`[DB] Migration ${migration.name} applied successfully`);
      } catch (error) {
        logger.error({ error, migration: migration.name }, "Migration failed");
        throw error; // останавливаем запуск приложения
      }
    }
  }
}

```

// backend/src/db/repositories/game.repository/game.repository.test.ts

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "@/db/connection";

import { GameRepository } from "./game.repository";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

describe("GameRepository", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        message_id INTEGER,
        game_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  it("создаёт игру и возвращает ID", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    expect(id).toBe(1);
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game).not.toBeNull();
    expect(game?.chat_id).toBe(123);
    expect(game?.message_id).toBe(456);
    expect(game?.game_date).toBe("2026-03-27");
  });

  it("обновляет дату игры", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    GameRepository.updateDate(id, "2026-03-28");
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game?.game_date).toBe("2026-03-28");
  });

  it("удаляет игру", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    GameRepository.delete(id);
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game).toBeNull();
  });

  it("возвращает null, если игра не найдена", () => {
    const game = GameRepository.findByChatAndMessage(999, 999);
    expect(game).toBeNull();
  });
});

```

// backend/src/db/repositories/game.repository/game.repository.ts

```typescript
import { logger } from "@/config/logger";

import { getDB } from "@/db/connection";

export interface GameRow {
  id: number;
  chat_id: number;
  message_id: number | null;
  game_date: string | null;
  created_at: string;
}

export const GameRepository = {
  create(chatId: number, messageId: number | null, gameDate?: string): number {
    const stmt = getDB().prepare(
      `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
    );
    const info = stmt.run(chatId, messageId, gameDate || null);
    logger.info(
      `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}`,
    );
    return Number(info.lastInsertRowid);
  },

  findByChatAndMessage(chatId: number, messageId: number): GameRow | null {
    const stmt = getDB().prepare(
      `SELECT * FROM games WHERE chat_id = ? AND message_id = ?`,
    );
    const row = stmt.get(chatId, messageId) as GameRow | undefined;
    if (row) {
      logger.info(
        `[DB] Найдена игра ID ${row.id} для чата ${chatId}, сообщения ${messageId}`,
      );
      return row;
    } else {
      logger.info(
        `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена`,
      );
    }
    return null;
  },

  updateDate(id: number, gameDate: string): void {
    const stmt = getDB().prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
    stmt.run(gameDate, id);
    logger.info(`[DB] Дата игры ${id} обновлена на ${gameDate}`);
  },

  delete(id: number): void {
    const stmt = getDB().prepare(`DELETE FROM games WHERE id = ?`);
    const info = stmt.run(id);
    logger.info(`[DB] Удалена игра ID ${id}, изменено строк: ${info.changes}`);
  },

  deleteByChatAndMessage(chatId: number, messageId: number): boolean {
    const game = this.findByChatAndMessage(chatId, messageId);
    if (!game) return false;
    this.delete(game.id);
    return true;
  },
};

```

// backend/src/db/repositories/game.repository/index.ts

```typescript
export * from "./game.repository";

```

// backend/src/db/repositories/index.ts

```typescript
export * from "./transaction.repository";
export * from "./game.repository";
export * from "./user.repository";

```

// backend/src/db/repositories/transaction.repository/index.ts

```typescript
export * from "./transaction.repository";

```

// backend/src/db/repositories/transaction.repository/transaction.repository.test.ts

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "@/db/connection";

import { TransactionRepository } from "./transaction.repository";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

describe("TransactionRepository", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        message_id INTEGER,
        game_date TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        username TEXT,
        amount INTEGER,
        type TEXT CHECK(type IN ('in', 'out')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(game_id) REFERENCES games(id)
      );
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  describe("add", () => {
    it("добавляет транзакцию и возвращает id", () => {
      // Сначала создаём игру, чтобы внешний ключ не нарушался
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo = gameStmt.run(123, 456, "2026-03-27");
      const gameId = Number(gameInfo.lastInsertRowid);

      const id = TransactionRepository.add(gameId, "user1", 100, "in");
      expect(id).toBe(1);

      const row = testDB
        .prepare(`SELECT * FROM transactions WHERE id = ?`)
        .get(id);
      expect(row).toMatchObject({
        username: "user1",
        game_id: gameId,
        amount: 100,
        type: "in",
      });
    });
  });

  describe("deleteByGameId", () => {
    it("удаляет все транзакции игры", () => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id) VALUES (?, ?)`,
      );
      const gameInfo = gameStmt.run(123, 456);
      const gameId = Number(gameInfo.lastInsertRowid);

      // Добавляем две транзакции
      TransactionRepository.add(gameId, "user1", 100, "in");
      TransactionRepository.add(gameId, "user2", 200, "out");

      const deleted = TransactionRepository.deleteByGameId(gameId);
      expect(deleted).toBe(2);

      const remaining = testDB
        .prepare(`SELECT COUNT(*) as count FROM transactions`)
        .get() as { count: number };
      expect(remaining.count).toBe(0);
    });
  });

  describe("getGroupedByUsernameAndGame", () => {
    it("группирует транзакции по пользователям и играм", () => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id) VALUES (?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456);
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457);
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      // Игра 1: user1: in=100, out=50; user2: in=20
      TransactionRepository.add(gameId1, "user1", 100, "in");
      TransactionRepository.add(gameId1, "user1", 50, "out");
      TransactionRepository.add(gameId1, "user2", 20, "in");

      // Игра 2: user1: in=30
      TransactionRepository.add(gameId2, "user1", 30, "in");

      const grouped = TransactionRepository.getGroupedByUsernameAndGame();

      expect(grouped).toHaveLength(3);
      expect(grouped).toContainEqual({
        username: "user1",
        game_id: gameId1,
        total_in: 100,
        total_out: 50,
      });
      expect(grouped).toContainEqual({
        username: "user2",
        game_id: gameId1,
        total_in: 20,
        total_out: 0,
      });
      expect(grouped).toContainEqual({
        username: "user1",
        game_id: gameId2,
        total_in: 30,
        total_out: 0,
      });
    });
  });

  describe("getFilteredStats", () => {
    beforeEach(() => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456, "2024-01-15");
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457, "2025-06-20");
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      TransactionRepository.add(gameId1, "user1", 100, "in");
      TransactionRepository.add(gameId1, "user1", 50, "out");
      TransactionRepository.add(gameId1, "user2", 30, "in");

      TransactionRepository.add(gameId2, "user1", 20, "in");
      TransactionRepository.add(gameId2, "user2", 10, "out");
    });

    it("возвращает статистику без фильтрации", () => {
      const stats = TransactionRepository.getFilteredStats(123);
      expect(stats).toHaveLength(2);
      // Проверяем порядок по разнице (out - in) DESC
      // user1: total_in=120, total_out=50 -> разница -70 (убыток)
      // user2: total_in=30, total_out=10 -> разница -20 (убыток)
      // Ожидаем user2 выше (меньший убыток)
      expect(stats[0].username).toBe("user2");
      expect(stats[0].total_in).toBe(30);
      expect(stats[0].total_out).toBe(10);
      expect(stats[0].games_count).toBe(2);
      expect(stats[1].username).toBe("user1");
      expect(stats[1].total_in).toBe(120);
      expect(stats[1].total_out).toBe(50);
      expect(stats[1].games_count).toBe(2);
    });

    it("фильтрует по году", () => {
      const stats2024 = TransactionRepository.getFilteredStats(123, {
        year: "2024",
      });
      expect(stats2024).toHaveLength(2);
      // для 2024 года:
      // user2: in=30, out=0 → diff = -30
      // user1: in=100, out=50 → diff = -50
      // сортировка diff DESC: сначала user2 (-30), потом user1 (-50)
      expect(stats2024[0].username).toBe("user2");
      expect(stats2024[0].total_in).toBe(30);
      expect(stats2024[0].total_out).toBe(0);
      expect(stats2024[0].games_count).toBe(1);
      expect(stats2024[1].username).toBe("user1");
      expect(stats2024[1].total_in).toBe(100);
      expect(stats2024[1].total_out).toBe(50);
      expect(stats2024[1].games_count).toBe(1);

      const stats2025 = TransactionRepository.getFilteredStats(123, {
        year: "2025",
      });
      expect(stats2025).toHaveLength(2);
      // для 2025 года:
      // user2: in=0, out=10 → diff = +10
      // user1: in=20, out=0 → diff = -20
      // сортировка diff DESC: сначала user2 (+10), потом user1 (-20)
      expect(stats2025[0].username).toBe("user2");
      expect(stats2025[0].total_in).toBe(0);
      expect(stats2025[0].total_out).toBe(10);
      expect(stats2025[0].games_count).toBe(1);
      expect(stats2025[1].username).toBe("user1");
      expect(stats2025[1].total_in).toBe(20);
      expect(stats2025[1].total_out).toBe(0);
      expect(stats2025[1].games_count).toBe(1);
    });

    it('фильтрует по дате "с"', () => {
      const sinceDate = "2025-01-01";
      const stats = TransactionRepository.getFilteredStats(123, { sinceDate });
      expect(stats).toHaveLength(2);
      // должны попасть только игры с game_date >= sinceDate (только игра2, 2025-06-20)
      // user2: in=0, out=10 → diff = +10
      // user1: in=20, out=0 → diff = -20
      // сортировка diff DESC: сначала user2 (+10), потом user1 (-20)
      expect(stats[0].username).toBe("user2");
      expect(stats[0].total_in).toBe(0);
      expect(stats[0].total_out).toBe(10);
      expect(stats[0].games_count).toBe(1);
      expect(stats[1].username).toBe("user1");
      expect(stats[1].total_in).toBe(20);
      expect(stats[1].total_out).toBe(0);
      expect(stats[1].games_count).toBe(1);
    });
  });

  describe("getFilteredScores", () => {
    beforeEach(() => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456, "2024-01-15");
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457, "2025-06-20");
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      TransactionRepository.add(gameId1, "user1", 100, "in");
      TransactionRepository.add(gameId1, "user1", 50, "out");
      TransactionRepository.add(gameId1, "user2", 30, "in");

      TransactionRepository.add(gameId2, "user1", 20, "in");
      TransactionRepository.add(gameId2, "user2", 10, "out");
    });

    it("возвращает топ по разнице (score = total_out - total_in)", () => {
      const scores = TransactionRepository.getFilteredScores(123);
      // user1: (50+0) - (100+20) = -70
      // user2: (0+10) - (30+0) = -20
      expect(scores).toEqual([
        { username: "user2", score: -20 },
        { username: "user1", score: -70 },
      ]);
    });

    it("фильтрует по году", () => {
      const scores2024 = TransactionRepository.getFilteredScores(123, {
        year: "2024",
      });
      expect(scores2024).toEqual([
        { username: "user2", score: -30 }, // только out? нет out? wait: user2 in=30, out=0 => -30
        { username: "user1", score: -50 }, // in=100 out=50 => -50
      ]);

      const scores2025 = TransactionRepository.getFilteredScores(123, {
        year: "2025",
      });
      expect(scores2025).toEqual([
        { username: "user2", score: 10 }, // out=10, in=0 => +10
        { username: "user1", score: -20 }, // in=20 out=0 => -20
      ]);
    });

    it('фильтрует по дате "с"', () => {
      const sinceDate = "2025-01-01";
      const scores = TransactionRepository.getFilteredScores(123, {
        sinceDate,
      });
      expect(scores).toEqual([
        { username: "user2", score: 10 },
        { username: "user1", score: -20 },
      ]);
    });
  });
});

```

// backend/src/db/repositories/transaction.repository/transaction.repository.ts

```typescript
import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface TransactionRow {
  type: "in" | "out";
  created_at: string;
  username: string;
  game_id: number;
  amount: number;
  id: number;
}

export const TransactionRepository = {
  add(
    gameId: number,
    username: string,
    amount: number,
    type: "in" | "out",
  ): number {
    const stmt = getDB().prepare(
      `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
    );
    const info = stmt.run(gameId, username, amount, type);
    logger.info(
      `[DB] addTransaction: ${username} +${amount} (${type}), lastID: ${info.lastInsertRowid}`,
    );
    return Number(info.lastInsertRowid);
  },

  deleteByGameId(gameId: number): number {
    const stmt = getDB().prepare(`DELETE FROM transactions WHERE game_id = ?`);
    const info = stmt.run(gameId);
    logger.info(`[DB] Удалено транзакций для игры ${gameId}: ${info.changes}`);
    return info.changes;
  },

  getGroupedByUsernameAndGame(): {
    username: string;
    game_id: number;
    total_in: number;
    total_out: number;
  }[] {
    const stmt = getDB().prepare(`
      SELECT username, game_id,
            SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END) as total_in,
            SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END) as total_out
      FROM transactions
      GROUP BY username, game_id
    `);
    return stmt.all() as any[];
  },

  getFilteredStats(
    chatId: number,
    filter?: { year?: string; sinceDate?: string },
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
      WHERE g.chat_id = ?
    `;
    const params: any[] = [chatId];

    if (filter?.year) {
      sql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY (total_out - total_in) DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as any[];
    logger.info(`[DB] getFilteredStats: получено ${rows.length} записей`);
    return rows;
  },

  getFilteredScores(
    chatId: number,
    filter?: { year?: string; sinceDate?: string },
  ): { username: string; score: number }[] {
    let sql = `
      SELECT
        t.username,
        (COALESCE(SUM(CASE WHEN t.type = 'out' THEN t.amount ELSE 0 END), 0) -
          COALESCE(SUM(CASE WHEN t.type = 'in' THEN t.amount ELSE 0 END), 0)) as score
      FROM transactions t
      JOIN games g ON t.game_id = g.id
      WHERE g.chat_id = ?
    `;
    const params: any[] = [chatId];

    if (filter?.year) {
      sql += ` AND g.game_date LIKE ?`;
      params.push(`${filter.year}%`);
    } else if (filter?.sinceDate) {
      sql += ` AND g.game_date >= ?`;
      params.push(filter.sinceDate);
    }

    sql += ` GROUP BY t.username ORDER BY score DESC`;

    const stmt = getDB().prepare(sql);
    const rows = stmt.all(...params) as any[];
    logger.info(`[DB] getFilteredScores: получено ${rows.length} записей`);
    return rows;
  },
  getDistinctYears(chatId: number): string[] {
    const stmt = getDB().prepare(`
      SELECT DISTINCT strftime('%Y', game_date) as year
      FROM games
      WHERE chat_id = ? AND game_date IS NOT NULL
      ORDER BY year DESC
    `);
    const rows = stmt.all(chatId) as { year: string }[];
    return rows.map((row) => row.year);
  },
};

```

// backend/src/db/repositories/user.repository/index.ts

```typescript
export * from "./user.repository";

```

// backend/src/db/repositories/user.repository/user.repository.test.ts

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "@/db/connection";

import { UserRepository } from "./user.repository";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

describe("UserRepository", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE users (
        username TEXT PRIMARY KEY,
        telegram_id INTEGER,
        total_in INTEGER DEFAULT 0,
        total_out INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        game_ids TEXT DEFAULT '[]'
      )
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  describe("findByUsername", () => {
    it("возвращает пользователя по имени", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("user1", 123, 100, 50, 2, "[1,2]");

      const user = UserRepository.findByUsername("user1");
      expect(user).not.toBeNull();
      expect(user).toMatchObject({
        username: "user1",
        telegram_id: 123,
        total_in: 100,
        total_out: 50,
        games_count: 2,
        game_ids: "[1,2]",
      });
    });

    it("возвращает null, если пользователь не найден", () => {
      const user = UserRepository.findByUsername("unknown");
      expect(user).toBeNull();
    });
  });

  describe("findByTelegramId", () => {
    it("возвращает пользователя по telegram_id", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("user1", 123, 100, 50, 2, "[1,2]");

      const user = UserRepository.findByTelegramId(123);
      expect(user).not.toBeNull();
      expect(user?.username).toBe("user1");
    });

    it("возвращает null, если telegram_id не найден", () => {
      const user = UserRepository.findByTelegramId(999);
      expect(user).toBeNull();
    });
  });

  describe("upsert", () => {
    it("вставляет нового пользователя", () => {
      UserRepository.upsert({
        username: "newuser",
        telegram_id: 999,
        total_in: 10,
        total_out: 5,
        games_count: 1,
        game_ids: "[5]",
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("newuser") as any;
      expect(user).toMatchObject({
        username: "newuser",
        telegram_id: 999,
        total_in: 10,
        total_out: 5,
        games_count: 1,
        game_ids: "[5]",
      });
    });

    it("обновляет существующего пользователя", () => {
      // Сначала вставляем
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("existing", 111, 20, 10, 2, "[1,2]");

      // Обновляем
      UserRepository.upsert({
        username: "existing",
        telegram_id: 222, // telegram_id обновится
        total_in: 30,
        total_out: 15,
        games_count: 3,
        game_ids: "[1,2,3]", // явно передаём новый game_ids
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("existing") as any;
      expect(user).toMatchObject({
        username: "existing",
        telegram_id: 222,
        total_in: 30,
        total_out: 15,
        games_count: 3,
        game_ids: "[1,2,3]",
      });
    });

    it("при обновлении сохраняет старые game_ids, если новые не переданы", () => {
      // Вставляем пользователя со старыми game_ids
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("existing", 111, 20, 10, 2, "[1,2]");

      // Обновляем без game_ids
      UserRepository.upsert({
        username: "existing",
        total_in: 30,
        total_out: 15,
        games_count: 3,
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("existing") as any;
      expect(user.game_ids).toBe("[1,2]"); // остались старые
      expect(user.total_in).toBe(30);
      expect(user.total_out).toBe(15);
    });
  });

  describe("clear", () => {
    it("удаляет всех пользователей", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, total_in) VALUES (?, ?)
      `,
        )
        .run("user1", 100);
      testDB
        .prepare(
          `
        INSERT INTO users (username, total_in) VALUES (?, ?)
      `,
        )
        .run("user2", 200);

      UserRepository.clear();
      const count = testDB
        .prepare(`SELECT COUNT(*) as cnt FROM users`)
        .get() as { cnt: number };
      expect(count.cnt).toBe(0);
    });
  });

  describe("insertMany", () => {
    it("вставляет несколько пользователей одной транзакцией", () => {
      const users = [
        {
          username: "a",
          total_in: 1,
          total_out: 2,
          games_count: 1,
          game_ids: "[]",
        },
        {
          username: "b",
          total_in: 3,
          total_out: 4,
          games_count: 1,
          game_ids: "[]",
        },
      ];
      UserRepository.insertMany(users);

      const all = testDB
        .prepare(
          `SELECT username, total_in, total_out FROM users ORDER BY username`,
        )
        .all() as any[];
      expect(all).toHaveLength(2);
      expect(all[0].username).toBe("a");
      expect(all[0].total_in).toBe(1);
      expect(all[0].total_out).toBe(2);
      expect(all[1].username).toBe("b");
      expect(all[1].total_in).toBe(3);
      expect(all[1].total_out).toBe(4);
    });
  });
});

```

// backend/src/db/repositories/user.repository/user.repository.ts

```typescript
import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface UserRow {
  telegram_id: number | null;
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
  game_ids: string; // JSON array
}

export const UserRepository = {
  findByUsername(username: string): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE username = ?`);
    const row = stmt.get(username) as UserRow | undefined;
    return row || null;
  },

  findByTelegramId(telegramId: number): UserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM users WHERE telegram_id = ?`);
    const row = stmt.get(telegramId) as UserRow | undefined;
    return row || null;
  },

  upsert(user: Partial<UserRow> & { username: string }): void {
    // Сначала пробуем обновить, если есть, иначе вставляем
    const existing = this.findByUsername(user.username);
    const newGameIds = user.game_ids
      ? user.game_ids
      : existing
        ? existing.game_ids
        : "[]";

    const stmt = getDB().prepare(`
      INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(username) DO UPDATE SET
        telegram_id = COALESCE(excluded.telegram_id, users.telegram_id),
        total_in = excluded.total_in,
        total_out = excluded.total_out,
        games_count = excluded.games_count,
        game_ids = excluded.game_ids
    `);
    stmt.run(
      user.username,
      user.telegram_id || null,
      user.total_in || 0,
      user.total_out || 0,
      user.games_count || 0,
      newGameIds,
    );
    logger.info(`[DB] Upsert пользователя ${user.username}`);
  },

  clear(): void {
    getDB().prepare(`DELETE FROM users`).run();
  },

  insertMany(
    users: {
      username: string;
      total_in: number;
      total_out: number;
      games_count: number;
      game_ids: string;
    }[],
  ): void {
    const stmt = getDB().prepare(`
      INSERT INTO users (username, total_in, total_out, games_count, game_ids)
      VALUES (?, ?, ?, ?, ?)
    `);
    const insert = getDB().transaction((users) => {
      for (const u of users) {
        stmt.run(
          u.username,
          u.total_in,
          u.total_out,
          u.games_count,
          u.game_ids,
        );
      }
    });
    insert(users);
    logger.info(`[DB] Вставлено ${users.length} пользователей`);
  },
};

```

// backend/src/index.ts

```typescript
import { BOT_TOKEN, TELEGRAM_API_URL } from "@/config/env";
import { setupBot } from "@/telegram/bot";
import { initDB } from "@/db/connection";
import { logger } from "@/config/logger";

// import { startApiServer } from "./api/server";

async function main() {
  initDB();
  const bot = setupBot(BOT_TOKEN, TELEGRAM_API_URL);
  bot.launch();
  logger.info("Bot started");

  // startApiServer();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch((err) => {
  logger.error(
    { error: err, message: err.message, stack: err.stack },
    "Fatal error",
  );
  process.exit(1);
});

```

// backend/src/services/game.service/game.service.test.ts

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";

import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { GameRepository } from "@/db/repositories/game.repository";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

import { GameService } from "./game.service";

vi.mock("@/db/repositories/game.repository", () => ({
  GameRepository: {
    create: vi.fn(),
    findByChatAndMessage: vi.fn(),
    updateDate: vi.fn(),
    delete: vi.fn(),
    deleteByChatAndMessage: vi.fn(),
  },
}));

vi.mock("@/db/repositories/transaction.repository", () => ({
  TransactionRepository: {
    add: vi.fn(),
    deleteByGameId: vi.fn(),
  },
}));

vi.mock("../stats.service", () => ({
  StatsService: {
    recalcStats: vi.fn(),
  },
}));

describe("GameService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createGame", () => {
    it("создаёт игру и возвращает gameId", () => {
      const mockGameId = 42;
      (GameRepository.create as any).mockReturnValue(mockGameId);

      const result = GameService.createGame(123, 456, "2026-03-28");

      expect(GameRepository.create).toHaveBeenCalledWith(
        123,
        456,
        "2026-03-28",
      );
      expect(result).toBe(mockGameId);
      // recalcStats не должен вызываться при создании
      expect(StatsService.recalcStats).not.toHaveBeenCalled();
    });
  });

  describe("addTransactions", () => {
    it("добавляет транзакции и пересчитывает статистику", () => {
      const gameId = 1;
      const transactions: ParsedTransaction[] = [
        { username: "user1", amount: 100, type: "in" },
        { username: "user2", amount: 200, type: "out" },
      ];

      const savedCount = GameService.addTransactions(gameId, transactions);

      expect(TransactionRepository.add).toHaveBeenCalledTimes(2);
      expect(TransactionRepository.add).toHaveBeenNthCalledWith(
        1,
        gameId,
        "user1",
        100,
        "in",
      );
      expect(TransactionRepository.add).toHaveBeenNthCalledWith(
        2,
        gameId,
        "user2",
        200,
        "out",
      );
      expect(savedCount).toBe(2);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
    });

    it("корректно обрабатывает пустой массив транзакций", () => {
      const gameId = 1;
      const savedCount = GameService.addTransactions(gameId, []);

      expect(TransactionRepository.add).not.toHaveBeenCalled();
      expect(savedCount).toBe(0);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateGame", () => {
    it("обновляет дату, удаляет старые транзакции, добавляет новые и пересчитывает статистику", () => {
      const gameId = 1;
      const newDate = "2026-03-29";
      const newTransactions: ParsedTransaction[] = [
        { username: "user1", amount: 50, type: "in" },
      ];

      // Шпионим за addTransactions, чтобы проверить его вызов
      const addSpy = vi.spyOn(GameService, "addTransactions");

      const result = GameService.updateGame(gameId, newDate, newTransactions);

      expect(GameRepository.updateDate).toHaveBeenCalledWith(gameId, newDate);
      expect(TransactionRepository.deleteByGameId).toHaveBeenCalledWith(gameId);
      expect(addSpy).toHaveBeenCalledWith(gameId, newTransactions);
      expect(result).toBe(1); // addTransactions вернёт 1

      addSpy.mockRestore();
    });
  });

  describe("deleteGame", () => {
    it("удаляет игру и связанные транзакции, пересчитывает статистику, возвращает true", () => {
      const chatId = 123;
      const messageId = 456;
      const mockGame = {
        id: 5,
        chat_id: chatId,
        message_id: messageId,
        game_date: null,
        created_at: "",
      };
      (GameRepository.findByChatAndMessage as any).mockReturnValue(mockGame);
      (TransactionRepository.deleteByGameId as any).mockReturnValue(3); // количество удалённых транзакций

      const result = GameService.deleteGame(chatId, messageId);

      expect(GameRepository.findByChatAndMessage).toHaveBeenCalledWith(
        chatId,
        messageId,
      );
      expect(TransactionRepository.deleteByGameId).toHaveBeenCalledWith(5);
      expect(GameRepository.delete).toHaveBeenCalledWith(5);
      expect(StatsService.recalcStats).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it("возвращает false, если игра не найдена", () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);

      const result = GameService.deleteGame(123, 456);

      expect(GameRepository.findByChatAndMessage).toHaveBeenCalledWith(
        123,
        456,
      );
      expect(TransactionRepository.deleteByGameId).not.toHaveBeenCalled();
      expect(GameRepository.delete).not.toHaveBeenCalled();
      expect(StatsService.recalcStats).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});

```

// backend/src/services/game.service/game.service.ts

```typescript
import { GameRepository, TransactionRepository } from "@/db/repositories";

import { ParsedTransaction } from "../parser.service";
import { StatsService } from "../stats.service";

export const GameService = {
  createGame(
    chatId: number,
    messageId: number | null,
    gameDate?: string,
  ): number {
    const gameId = GameRepository.create(chatId, messageId, gameDate);
    // Статистика будет пересчитана после добавления транзакций
    return gameId;
  },

  addTransactions(gameId: number, transactions: ParsedTransaction[]): number {
    let savedCount = 0;
    for (const tx of transactions) {
      TransactionRepository.add(gameId, tx.username, tx.amount, tx.type);
      savedCount++;
    }
    // Пересчитываем агрегированную статистику после добавления транзакций
    StatsService.recalcStats();
    return savedCount;
  },

  updateGame(
    gameId: number,
    newDate: string,
    newTransactions: ParsedTransaction[],
  ): number {
    GameRepository.updateDate(gameId, newDate);
    // Удаляем старые транзакции
    TransactionRepository.deleteByGameId(gameId);
    // Добавляем новые (внутри вызывается recalcStats)
    const savedCount = this.addTransactions(gameId, newTransactions);
    return savedCount;
  },

  deleteGame(chatId: number, messageId: number): boolean {
    const game = GameRepository.findByChatAndMessage(chatId, messageId);
    if (!game) return false;

    // Удаляем транзакции игры
    TransactionRepository.deleteByGameId(game.id);
    // Удаляем саму игру
    GameRepository.delete(game.id);
    // Пересчитываем статистику
    StatsService.recalcStats();
    return true;
  },
};

```

// backend/src/services/game.service/index.ts

```typescript
export { GameService } from "./game.service";

```

// backend/src/services/index.ts

```typescript
export { ParserService } from "./parser.service";
export { StatsService } from "./stats.service";
export { GameService } from "./game.service";

```

// backend/src/services/parser.service/index.ts

```typescript
export { ParserService, type ParsedTransaction } from "./parser.service";

```

// backend/src/services/parser.service/parser.service.test.ts

```typescript
import { describe, it, expect, vi } from "vitest";

import { logger } from "@/config/logger";

import { ParserService } from "./parser.service";

vi.mock("@/config/logger", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

describe("parser.service", () => {
  describe("parseTransactions", () => {
    it("должен парсить вход и выход", () => {
      const lines = [
        "Вход:",
        "+500 | Тема",
        "+700 | @Rabotyaga3000 // комментарий",
        "Выход:",
        "+1840 | @EgorVaganov1111",
        "+290 | kovass",
      ];
      const result = ParserService.parseTransactions(lines);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ username: "Тема", amount: 500, type: "in" });
      expect(result[1]).toEqual({
        username: "@Rabotyaga3000",
        amount: 700,
        type: "in",
      });
      expect(result[2]).toEqual({
        username: "@EgorVaganov1111",
        amount: 1840,
        type: "out",
      });
      expect(result[3]).toEqual({
        username: "kovass",
        amount: 290,
        type: "out",
      });
    });

    it("игнорирует строки без типа", () => {
      const lines = ["+500 | User", "Вход:", "+300 | User2"];
      const result = ParserService.parseTransactions(lines);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ username: "User2", amount: 300, type: "in" });
    });

    it("игнорирует пустые строки и лишние пробелы", () => {
      const lines = ["Вход:", "  +500 | User  ", "", "  +200 | User2"];
      const result = ParserService.parseTransactions(lines);
      expect(result).toHaveLength(2);
    });

    it("корректно обрезает комментарии", () => {
      const lines = ["Вход:", "+500 | User // comment"];
      const result = ParserService.parseTransactions(lines);
      expect(result[0].username).toBe("User");
    });

    describe("санитизация username", () => {
      it("удаляет управляющие символы", () => {
        const lines = ["Вход:", "+500 | User\x00\x01Name"];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(1);
        expect(result[0].username).toBe("UserName");
      });

      it("обрезает длинный username до 50 символов", () => {
        const longName = "a".repeat(60);
        const lines = ["Вход:", `+500 | ${longName}`];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(1);
        expect(result[0].username.length).toBe(50);
        expect(result[0].username).toBe("a".repeat(50));
      });

      it("пропускает пустой username после очистки и логирует предупреждение", () => {
        const warnSpy = vi.spyOn(logger, "warn");
        const lines = ["Вход:", "+500 | \x00\x01"];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(0);
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            "Пропущена транзакция с некорректным username",
          ),
        );
      });
    });
  });

  describe("extractGameDateFromText", () => {
    it("извлекает дату из команды game", () => {
      const text = "game 27.03.2026 some text";
      const date = ParserService.extractGameDateFromText(text);
      expect(date).toBe("2026-03-27");
    });

    it("возвращает null, если дата отсутствует", () => {
      const text = "game no date";
      const date = ParserService.extractGameDateFromText(text);
      expect(date).toBeNull();
    });
  });
});

```

// backend/src/services/parser.service/parser.service.ts

```typescript
import { logger } from "@/config/logger";

export interface ParsedTransaction {
  username: string;
  amount: number;
  type: "in" | "out";
}

function sanitizeUsername(username: string): string | null {
  // Удаляем управляющие символы
  let cleaned = username.replace(/[\x00-\x1F\x7F]/g, "");
  cleaned = cleaned.trim();
  if (cleaned.length === 0) return null;
  // Ограничиваем длину
  if (cleaned.length > 50) cleaned = cleaned.substring(0, 50);
  return cleaned;
}

export const ParserService = {
  parseTransactions(lines: string[]): ParsedTransaction[] {
    let currentType: "in" | "out" | null = null;
    const transactions: ParsedTransaction[] = [];

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
          const sanitized = sanitizeUsername(username);
          if (sanitized) {
            transactions.push({
              username: sanitized,
              amount: points,
              type: currentType,
            });
          } else {
            logger.warn(
              `[Parser] Пропущена транзакция с некорректным username: "${username}"`,
            );
          }
        }
      }
    }

    return transactions;
  },

  extractGameDateFromText(text: string): string | null {
    const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      return `${year}-${month}-${day}`;
    }
    return null;
  },
};

```

// backend/src/services/stats.service/index.ts

```typescript
export { StatsService } from "./stats.service";

```

// backend/src/services/stats.service/stats.service.test.ts

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { GameRepository } from "@/db/repositories/game.repository";
import { getDB } from "@/db/connection";

import { StatsService } from "./stats.service";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

describe("StatsService", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        message_id INTEGER,
        game_date TEXT
      );
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        username TEXT,
        amount INTEGER,
        type TEXT
      );
      CREATE TABLE users (
        username TEXT PRIMARY KEY,
        total_in INTEGER DEFAULT 0,
        total_out INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        game_ids TEXT DEFAULT '[]'
      );
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  it("получает статистику за конкретный год", () => {
    const gameId = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");
    TransactionRepository.add(gameId, "user1", 200, "out");

    const stats = StatsService.getFilteredStats(1, "2024");
    expect(stats).toHaveLength(1);
    expect(stats[0].username).toBe("user1");
    expect(stats[0].total_in).toBe(100);
    expect(stats[0].total_out).toBe(200);
    expect(stats[0].games_count).toBe(1);
  });

  it("не возвращает данные за другие годы, если фильтр не задан (по умолчанию последний год)", () => {
    const gameId = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");

    const stats = StatsService.getFilteredStats(1); // последний год (текущий 2026)
    expect(stats).toHaveLength(0);
  });

  it("получает топ по разнице", () => {
    const gameId1 = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId1, "user1", 100, "in");
    TransactionRepository.add(gameId1, "user1", 300, "out"); // diff +200

    const gameId2 = GameRepository.create(1, 2, "2024-01-01");
    TransactionRepository.add(gameId2, "user2", 50, "in");
    TransactionRepository.add(gameId2, "user2", 100, "out"); // diff +50

    const scores = StatsService.getFilteredScores(1, "2024");
    expect(scores).toEqual([
      { username: "user1", score: 200 },
      { username: "user2", score: 50 },
    ]);
  });

  it("пересчитывает агрегированную статистику", () => {
    const gameId = GameRepository.create(1, 1, "2025-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");
    TransactionRepository.add(gameId, "user1", 200, "out");
    TransactionRepository.add(gameId, "user2", 50, "in");

    StatsService.recalcStats();

    const users = testDB.prepare("SELECT * FROM users ORDER BY username").all();
    expect(users).toHaveLength(2);
    expect(users[0]).toMatchObject({
      username: "user1",
      games_count: 1,
      total_out: 200,
      total_in: 100,
    });
    expect(users[1]).toMatchObject({
      username: "user2",
      games_count: 1,
      total_in: 50,
      total_out: 0,
    });
  });
});

```

// backend/src/services/stats.service/stats.service.ts

```typescript
import { TransactionRepository, UserRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

export type Filter = { year?: string; all?: boolean; sinceDate?: string };

function buildFilter(filter?: string | "all"): Filter {
  if (filter === "all") {
    return { all: true };
  }
  if (filter && /^\d{4}$/.test(filter)) {
    return { year: filter };
  }
  // по умолчанию последний год
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const sinceDate = oneYearAgo.toISOString().slice(0, 10);
  return { sinceDate };
}

export const StatsService = {
  getFilteredStats(chatId: number, filter?: string | "all") {
    const f = buildFilter(filter);
    if (f.all) {
      return TransactionRepository.getFilteredStats(chatId);
    }
    if (f.year) {
      return TransactionRepository.getFilteredStats(chatId, { year: f.year });
    }
    return TransactionRepository.getFilteredStats(chatId, {
      sinceDate: f.sinceDate,
    });
  },

  getFilteredScores(chatId: number, filter?: string | "all") {
    const f = buildFilter(filter);
    if (f.all) {
      return TransactionRepository.getFilteredScores(chatId);
    }
    if (f.year) {
      return TransactionRepository.getFilteredScores(chatId, { year: f.year });
    }
    return TransactionRepository.getFilteredScores(chatId, {
      sinceDate: f.sinceDate,
    });
  },

  recalcStats(): void {
    logger.info("[StatsService] Пересчёт статистики...");
    // Очищаем таблицу users
    UserRepository.clear();

    // Получаем агрегированные данные по пользователям и играм
    const rows = TransactionRepository.getGroupedByUsernameAndGame();

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

    // Подготовка данных для вставки
    const usersToInsert = Array.from(userMap.entries()).map(
      ([username, data]) => ({
        username,
        total_in: data.total_in,
        total_out: data.total_out,
        games_count: data.games.size,
        game_ids: JSON.stringify(Array.from(data.games)),
      }),
    );

    UserRepository.insertMany(usersToInsert);
    logger.info(
      `[StatsService] Пересчёт завершён, обработано пользователей: ${usersToInsert.length}`,
    );
  },

  getAvailableYears(chatId: number): string[] {
    return TransactionRepository.getDistinctYears(chatId);
  },
};

```

// backend/src/telegram/bot.ts

```typescript
import { Telegraf } from "telegraf";
import https from "https";

import { logger } from "@/config/logger";

import { registerCallbacks } from "./callbacks";
import { errorHandler } from "./middlewares";
import * as handlers from "./handlers";

export function setupBot(token: string, apiRoot?: string) {
  const options: any = {};
  if (apiRoot) {
    options.telegram = { apiRoot };
  }
  const bot = new Telegraf(token, options);

  // Middleware для логирования всех сообщений
  bot.use((ctx, next) => {
    if (ctx.message && "text" in ctx.message) {
      logger.info(`[RAW] ${ctx.message.text}`);
    }
    return next();
  });

  // Глобальный обработчик ошибок
  bot.catch(errorHandler);

  // Регистрируем обработчики команд
  bot.command("stats", handlers.statsHandler);
  bot.command("top", handlers.topHandler);
  bot.command("stats_update", handlers.statsUpdateHandler);
  bot.command("help", handlers.helpHandler);

  // Обработчики сообщений
  bot.on("text", handlers.textHandler);
  bot.on("photo", handlers.photoHandler);
  bot.on("edited_message", handlers.editedMessageHandler);

  // Регистрируем все callback-обработчики
  registerCallbacks(bot);

  return bot;
}

```

// backend/src/telegram/callbacks/callbacks.ts

```typescript
import { Telegraf } from "telegraf";

import { statsCallback } from "./stats";
import { topCallback } from "./top";

import type { CallbackHandler } from "./types";

const callbacks: Map<RegExp, CallbackHandler> = new Map([
  [/^stats_(.+)$/, statsCallback],
  [/^top_(.+)$/, topCallback],
]);

export function registerCallbacks(bot: Telegraf) {
  for (const [pattern, handler] of callbacks.entries()) {
    bot.action(pattern, async (ctx) => {
      const match = ctx.match as string[];
      await handler(ctx, match);
    });
  }
}

```

// backend/src/telegram/callbacks/index.ts

```typescript
export { registerCallbacks } from "./callbacks";

```

// backend/src/telegram/callbacks/stats.ts

```typescript
import { sendStats } from "../handlers";

import { parseFilter, deleteSourceMessage, handleCallbackError } from "./utils";

import type { CallbackHandler } from "./types";

export const statsCallback: CallbackHandler = async (ctx, match) => {
  const filter = match[1];
  const chatId = ctx.chat!.id;
  const actualFilter = parseFilter(filter);

  if (actualFilter === undefined) {
    await ctx.answerCbQuery("Неизвестный фильтр");
    return;
  }

  try {
    await ctx.answerCbQuery(); // убираем "часики"
    await sendStats(ctx, chatId, actualFilter);
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

```

// backend/src/telegram/callbacks/top.ts

```typescript
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

```

// backend/src/telegram/callbacks/types.ts

```typescript
import { Context } from "telegraf";

export type CallbackHandler = (ctx: Context, match: string[]) => Promise<void>;

```

// backend/src/telegram/callbacks/utils.ts

```typescript
import { Context } from "telegraf";

import { logger } from "@/config/logger";

import { replyWithAutoDelete } from "../middlewares";

export function parseFilter(filter: string): string | undefined {
  if (filter === "all") return "all";
  if (filter === "last_year") return undefined;
  if (/^\d{4}$/.test(filter)) return filter;
  return undefined; // или null, в зависимости от логики
}

export async function deleteSourceMessage(ctx: Context): Promise<void> {
  try {
    await ctx.deleteMessage();
  } catch (e) {
    logger.warn("Не удалось удалить сообщение с клавиатурой");
  }
}

export async function handleCallbackError(
  ctx: Context,
  error: unknown,
  userMessage: string,
  botMessage: string,
): Promise<void> {
  logger.error(`[ERROR] callback: ${error}`);
  await ctx.answerCbQuery(userMessage);
  await replyWithAutoDelete(ctx, botMessage);
}

```

// backend/src/telegram/handlers/common/common.test.ts

```typescript
import { describe, it, expect } from "vitest";

import { escapeMarkdown } from "./common";

describe("common utilities", () => {
  describe("escapeMarkdown", () => {
    it("экранирует специальные символы", () => {
      const input =
        "_test* [text] (test) ~test >test #test +test -=test |test {test} .test !test";
      const expected =
        "\\_test\\* \\[text\\] \\(test\\) \\~test \\>test \\#test \\+test \\-\\=test \\|test \\{test\\} \\.test \\!test";
      expect(escapeMarkdown(input)).toBe(expected);
    });

    it("не изменяет текст без спецсимволов", () => {
      const input = "normal text 123";
      expect(escapeMarkdown(input)).toBe(input);
    });
  });
});

```

// backend/src/telegram/handlers/common/common.ts

```typescript
export function escapeMarkdown(text: string): string {
  const specialChars = /[_*[\]()~`>#+\-=|{}.!]/g;
  return text.replace(specialChars, "\\$&");
}

```

// backend/src/telegram/handlers/common/index.ts

```typescript
export * from "./common";

```

// backend/src/telegram/handlers/game/game.test.ts

```typescript
import { vi, describe, it, expect, beforeEach } from "vitest";
import { Context } from "telegraf";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";

import * as game from "./game";

vi.mock("@/services", () => ({
  GameService: {
    createGame: vi.fn(),
    addTransactions: vi.fn(),
    updateGame: vi.fn(),
    deleteGame: vi.fn(),
  },
  ParserService: {
    parseTransactions: vi.fn(),
    extractGameDateFromText: vi.fn(),
  },
  StatsService: {
    recalcStats: vi.fn(),
  },
}));

vi.mock("@/db/repositories", () => ({
  GameRepository: {
    findByChatAndMessage: vi.fn(),
  },
}));

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

vi.mock("@/config/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

function createMockContext(overrides: Partial<any> = {}): any {
  return {
    chat: { id: 12345 },
    from: { id: 67890, username: "testuser" },
    message: {
      message_id: 999,
      text: "",
      entities: [],
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
    telegram: {
      editMessageText: vi.fn(),
      deleteMessage: vi.fn(),
    },
    ...overrides,
  };
}

describe("game handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("textHandler", () => {
    it("создаёт игру по тексту с упоминанием бота и командой game", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 111,
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2025-02-16",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "User", amount: 500, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(42);
      (GameService.addTransactions as any).mockReturnValue(1);

      await game.textHandler(ctx as Context);

      expect(ParserService.extractGameDateFromText).toHaveBeenCalled();
      expect(ParserService.parseTransactions).toHaveBeenCalled();
      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        111,
        "2025-02-16",
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(42, [
        { username: "User", amount: 500, type: "in" },
      ]);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от 2025-02-16 успешно создана"),
      );
    });

    it("обрабатывает обычный текст без упоминания (plain data)", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 222,
          text: "Вход:\n+300 | Player\nВыход:\n+200 | Player2",
          entities: [],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(null);
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "Player", amount: 300, type: "in" },
        { username: "Player2", amount: 200, type: "out" },
      ]);
      (GameService.createGame as any).mockReturnValue(99);
      (GameService.addTransactions as any).mockReturnValue(2);

      await game.textHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        222,
        expect.any(String),
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(
        99,
        expect.any(Array),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от"),
      );
    });

    it("удаляет игру, если транзакции не добавлены", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 333,
          text: "Вход:\n+500 | User",
          entities: [],
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "User", amount: 500, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(55);
      (GameService.addTransactions as any).mockReturnValue(0);

      await game.textHandler(ctx as Context);

      expect(GameService.deleteGame).toHaveBeenCalledWith(12345, 333);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "⚠️ Не удалось добавить транзакции. Игра удалена.",
      );
    });

    it("отвечает сообщением об отсутствии транзакций", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 444,
          text: "Просто текст",
          entities: [],
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([]);

      await game.textHandler(ctx as Context);

      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Не найдено ни одной корректной записи"),
      );
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 555,
          text: "@testbot game 16.02.2025\nВход:\n+500 | User",
          entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      const testError = new Error("Test error");
      (ParserService.extractGameDateFromText as any).mockImplementation(() => {
        throw testError;
      });

      await game.textHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] textHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке сообщения.",
      );
      expect(GameService.createGame).not.toHaveBeenCalled();
    });
  });

  describe("photoHandler", () => {
    it("обрабатывает фото с подписью, содержащей упоминание бота и game", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 555,
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2026-03-20",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "PhotoUser", amount: 1000, type: "in" },
      ]);
      (GameService.createGame as any).mockReturnValue(77);
      (GameService.addTransactions as any).mockReturnValue(1);

      await game.photoHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        555,
        "2026-03-20",
      );
      expect(GameService.addTransactions).toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от 2026-03-20 успешно создана"),
      );
    });

    it("игнорирует фото без упоминания бота", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 666,
          caption: "Просто текст",
          caption_entities: [],
        },
      });

      await game.photoHandler(ctx as Context);

      expect(ParserService.extractGameDateFromText).not.toHaveBeenCalled();
      expect(GameService.createGame).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: {
          message_id: 777,
          caption: "@testbot game 20.03.2026\nВход:\n+1000 | PhotoUser",
          caption_entities: [{ type: "mention", offset: 0, length: 8 }],
        },
      });
      const testError = new Error("Photo processing error");
      (ParserService.extractGameDateFromText as any).mockImplementation(() => {
        throw testError;
      });

      await game.photoHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] photoHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке фотографии.",
      );
      expect(GameService.createGame).not.toHaveBeenCalled();
    });
  });

  describe("editedMessageHandler", () => {
    it("обновляет существующую игру", async () => {
      const gameRow = {
        id: 10,
        chat_id: 12345,
        message_id: 777,
        game_date: "2026-01-01",
      };
      (GameRepository.findByChatAndMessage as any).mockReturnValue(gameRow);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 777,
          text: "game 15.02.2026\nВход:\n+300 | Editor",
        },
      });
      (ParserService.extractGameDateFromText as any).mockReturnValue(
        "2026-02-15",
      );
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "Editor", amount: 300, type: "in" },
      ]);
      (GameService.updateGame as any).mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.updateGame).toHaveBeenCalledWith(10, "2026-02-15", [
        { username: "Editor", amount: 300, type: "in" },
      ]);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✏️ Игра от 2026-02-15 обновлена"),
      );
    });

    it("создаёт новую игру, если игра не найдена", async () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 888,
          text: "Вход:\n+400 | NewUser",
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([
        { username: "NewUser", amount: 400, type: "in" },
      ]);
      (ParserService.extractGameDateFromText as any).mockReturnValue(null);
      (GameService.createGame as any).mockReturnValue(11);
      (GameService.addTransactions as any).mockReturnValue(1);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).toHaveBeenCalledWith(
        12345,
        888,
        expect.any(String),
      );
      expect(GameService.addTransactions).toHaveBeenCalledWith(
        11,
        expect.any(Array),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("✅ Игра от"),
      );
    });

    it("игнорирует редактирование без транзакций", async () => {
      (GameRepository.findByChatAndMessage as any).mockReturnValue(null);
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 999,
          text: "Обычное редактирование",
        },
      });
      (ParserService.parseTransactions as any).mockReturnValue([]);

      await game.editedMessageHandler(ctx as Context);

      expect(GameService.createGame).not.toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).not.toHaveBeenCalled();
    });

    it("обрабатывает ошибку и отправляет сообщение об ошибке", async () => {
      const ctx = createMockContext({
        editedMessage: {
          chat: { id: 12345 },
          message_id: 1000,
          text: "game 15.02.2026\nВход:\n+300 | Editor",
        },
      });
      const testError = new Error("Edit processing error");
      (GameRepository.findByChatAndMessage as any).mockImplementation(() => {
        throw testError;
      });

      await game.editedMessageHandler(ctx as Context);

      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining("[ERROR] editedMessageHandler"),
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Произошла ошибка при обработке редактирования.",
      );
      expect(GameService.updateGame).not.toHaveBeenCalled();
    });
  });
});

```

// backend/src/telegram/handlers/game/game.ts

```typescript
import { Context } from "telegraf";

import { GameService, ParserService } from "@/services";
import { GameRepository } from "@/db/repositories";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";

export const textHandler = async (ctx: Context) => {
  try {
    const msg = ctx.message as any;
    const text = msg.text || msg.caption;
    if (!text) return;

    const botUsername = ctx.botInfo.username;
    const entities = msg.entities || [];
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

    let isGameCommand = false;
    let gameDate: string | undefined;
    if (mentioned && text.includes("game")) {
      isGameCommand = true;
      gameDate =
        ParserService.extractGameDateFromText(text) ||
        new Date().toISOString().slice(0, 10);
    }

    const isPlainData = !mentioned && !text.startsWith("/");

    if (isGameCommand || isPlainData) {
      if (isGameCommand) await deleteCommandMessage(ctx);

      const lines = text
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");
      const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
      const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);

      const transactions = ParserService.parseTransactions(dataLines);
      if (transactions.length === 0) {
        await replyWithAutoDelete(
          ctx,
          "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
        );
        return;
      }

      const finalDate = gameDate || new Date().toISOString().slice(0, 10);
      const gameId = GameService.createGame(
        ctx.chat!.id,
        ctx.message!.message_id,
        finalDate,
      );
      const savedCount = GameService.addTransactions(gameId, transactions);

      if (savedCount > 0) {
        await replyWithAutoDelete(
          ctx,
          `✅ Игра от ${finalDate} успешно создана. Добавлено записей: ${savedCount}`,
        );
      } else {
        GameService.deleteGame(ctx.chat!.id, ctx.message!.message_id);
        await replyWithAutoDelete(
          ctx,
          "⚠️ Не удалось добавить транзакции. Игра удалена.",
        );
      }
    }
  } catch (error) {
    logger.error(`[ERROR] textHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке сообщения.",
    );
  }
};

export const photoHandler = async (ctx: Context) => {
  try {
    const caption = (ctx.message as any)?.caption;
    if (!caption) return;

    const text = caption;
    const botUsername = ctx.botInfo.username;
    const entities = (ctx.message as any).caption_entities || [];
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

    if (!mentioned || !text.includes("game")) return;

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);
    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");
    const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) {
      await replyWithAutoDelete(
        ctx,
        "⚠️ Не найдено ни одной корректной записи. Игра не создана.",
      );
      return;
    }

    const gameId = GameService.createGame(
      ctx.chat!.id,
      ctx.message!.message_id,
      gameDate,
    );
    const savedCount = GameService.addTransactions(gameId, transactions);
    await replyWithAutoDelete(
      ctx,
      `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
    );
  } catch (error) {
    logger.error(`[ERROR] photoHandler: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке фотографии.",
    );
  }
};

export const editedMessageHandler = async (ctx: Context) => {
  try {
    const editedMessage = ctx.editedMessage as any;
    if (!editedMessage) return;

    const chatId = editedMessage.chat.id;
    const messageId = editedMessage.message_id;
    const text = editedMessage.text || editedMessage.caption || "";

    let game = GameRepository.findByChatAndMessage(chatId, messageId);
    if (game) {
      const newDate =
        ParserService.extractGameDateFromText(text) ||
        new Date().toISOString().slice(0, 10);
      const lines = text
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l !== "");
      const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
      const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
      const transactions = ParserService.parseTransactions(dataLines);
      const savedCount = GameService.updateGame(game.id, newDate, transactions);
      await replyWithAutoDelete(
        ctx,
        `✏️ Игра от ${newDate} обновлена. Добавлено записей: ${savedCount}`,
      );
      return;
    }

    const lines = text
      .split("\n")
      .map((l: string) => l.trim())
      .filter((l: string) => l !== "");
    const cmdIndex = lines.findIndex((l: string) => l.includes("game"));
    const dataLines = cmdIndex === -1 ? lines : lines.slice(cmdIndex + 1);
    const transactions = ParserService.parseTransactions(dataLines);
    if (transactions.length === 0) return;

    const gameDate =
      ParserService.extractGameDateFromText(text) ||
      new Date().toISOString().slice(0, 10);
    const newGameId = GameService.createGame(chatId, messageId, gameDate);
    const savedCount = GameService.addTransactions(newGameId, transactions);
    await replyWithAutoDelete(
      ctx,
      `✅ Игра от ${gameDate} успешно создана. Добавлено записей: ${savedCount}`,
    );
  } catch (error) {
    logger.error(
      `[ERROR] editedMessageHandler: ${JSON.stringify(error, null, 2)}`,
    );
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла ошибка при обработке редактирования.",
    );
  }
};

```

// backend/src/telegram/handlers/game/index.ts

```typescript
export * from "./game";

```

// backend/src/telegram/handlers/help/help.test.ts

```typescript
import { vi, describe, it, expect } from "vitest";

import type { CommandContext } from "@/types/telegram";

import * as middlewares from "../../middlewares";

import * as help from "./help";

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

function createMockContext(): any {
  return {
    from: { id: 67890, username: "testuser" },
    chat: { id: 12345 },
    message: {
      message_id: 999,
      text: "/help",
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
  };
}

describe("helpHandler", () => {
  it("отправляет справку", async () => {
    const ctx = createMockContext();

    await help.helpHandler(ctx as CommandContext);

    expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
    expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
      ctx,
      expect.stringContaining("Список доступных команд"),
      { parse_mode: "Markdown" },
    );
  });
});

```

// backend/src/telegram/handlers/help/help.ts

```typescript
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

```

// backend/src/telegram/handlers/help/index.ts

```typescript
export * from "./help";

```

// backend/src/telegram/handlers/index.ts

```typescript
export * from "./common";
export * from "./stats";
export * from "./game";
export * from "./help";

```

// backend/src/telegram/handlers/stats/index.ts

```typescript
export * from "./stats";

```

// backend/src/telegram/handlers/stats/stats.test.ts

```typescript
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import * as middlewares from "../../middlewares";
import * as stats from "./stats";

import type { CommandContext } from "@/types/telegram";

vi.mock("@/services", () => ({
  StatsService: {
    getFilteredStats: vi.fn(),
    getFilteredScores: vi.fn(),
    recalcStats: vi.fn(),
  },
}));

vi.mock("../../middlewares", () => ({
  deleteCommandMessage: vi.fn(),
  replyWithAutoDelete: vi.fn(),
}));

vi.mock("@/config/logger", () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
  },
}));

function createMockContext(overrides: Partial<any> = {}): any {
  return {
    chat: { id: 12345 },
    from: { id: 67890, username: "testuser" },
    message: {
      message_id: 999,
      text: "",
      entities: [],
    },
    botInfo: { username: "testbot" },
    reply: vi.fn(),
    deleteMessage: vi.fn(),
    telegram: {
      editMessageText: vi.fn(),
      deleteMessage: vi.fn(),
    },
    ...overrides,
  };
}

describe("stats handlers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("sendStats", () => {
    it("отправляет статистику за последний год по умолчанию", async () => {
      const ctx = createMockContext();
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.sendStats(ctx, 12345, undefined);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(
        12345,
        undefined,
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("последний год"),
        { parse_mode: "Markdown" },
      );
    });

    it("отправляет статистику за всё время", async () => {
      const ctx = createMockContext();
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.sendStats(ctx, 12345, "all");

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
        { parse_mode: "Markdown" },
      );
    });

    it("сообщает об отсутствии данных", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredStats as any).mockReturnValue([]);

      await stats.sendStats(ctx, 12345, "2024");

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "📊 Пока нет данных за указанный период.",
      );
    });

    it("обрабатывает ошибку сервиса", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredStats as any).mockImplementation(() => {
        throw new Error("DB error");
      });

      await stats.sendStats(ctx, 12345, "all");

      expect(logger.error).toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Ошибка при загрузке статистики.",
      );
    });
  });

  describe("sendTop", () => {
    it("отправляет топ за последний год", async () => {
      const ctx = createMockContext();
      const mockScores = [
        { username: "user1", score: 100 },
        { username: "user2", score: -50 },
      ];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, undefined);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(
        12345,
        undefined,
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("последний год"),
      );
    });

    it("отправляет топ за всё время", async () => {
      const ctx = createMockContext();
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, "all");

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
      );
    });

    it("сообщает об отсутствии данных", async () => {
      const ctx = createMockContext();
      (StatsService.getFilteredScores as any).mockReturnValue([]);

      await stats.sendTop(ctx, 12345, "2024");

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "🏆 Пока нет данных за указанный период.",
      );
    });

    it("экранирует username в Markdown", async () => {
      const ctx = createMockContext();
      const mockScores = [
        { username: "_test*", score: 100 },
        { username: "normal", score: 50 },
      ];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.sendTop(ctx, 12345, undefined);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("\\_test\\*"),
      );
    });
  });

  describe("statsHandler", () => {
    it("без аргументов показывает клавиатуру", async () => {
      const ctx = createMockContext({
        message: { text: "/stats", message_id: 1 },
      });

      await stats.statsHandler(ctx as CommandContext);

      expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining("Выберите период"),
        expect.objectContaining({
          reply_markup: expect.objectContaining({
            inline_keyboard: expect.any(Array),
          }),
        }),
      );
      expect(StatsService.getFilteredStats).not.toHaveBeenCalled();
    });

    it("с аргументом 'all' вызывает получение статистики за всё время", async () => {
      const ctx = createMockContext({
        message: { text: "/stats all", message_id: 1 },
      });
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.statsHandler(ctx as CommandContext);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
        { parse_mode: "Markdown" },
      );
    });

    it("с аргументом-годом вызывает получение статистики за год", async () => {
      const ctx = createMockContext({
        message: { text: "/stats 2024", message_id: 1 },
      });
      const mockStats = [
        { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
      ];
      (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

      await stats.statsHandler(ctx as CommandContext);

      expect(StatsService.getFilteredStats).toHaveBeenCalledWith(12345, "2024");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("2024 год"),
        { parse_mode: "Markdown" },
      );
    });

    it("с неверным аргументом выводит сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: { text: "/stats invalid", message_id: 1 },
      });

      await stats.statsHandler(ctx as CommandContext);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Неверный формат"),
      );
    });
  });

  describe("topHandler", () => {
    it("без аргументов показывает клавиатуру", async () => {
      const ctx = createMockContext({
        message: { text: "/top", message_id: 1 },
      });

      await stats.topHandler(ctx as CommandContext);

      expect(middlewares.deleteCommandMessage).toHaveBeenCalledWith(ctx);
      expect(ctx.reply).toHaveBeenCalledWith(
        expect.stringContaining("Выберите период для топа"),
        expect.objectContaining({
          reply_markup: expect.objectContaining({
            inline_keyboard: expect.any(Array),
          }),
        }),
      );
      expect(StatsService.getFilteredScores).not.toHaveBeenCalled();
    });

    it("с аргументом 'all' вызывает получение топа за всё время", async () => {
      const ctx = createMockContext({
        message: { text: "/top all", message_id: 1 },
      });
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.topHandler(ctx as CommandContext);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(12345, "all");
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("всё время"),
      );
    });

    it("с аргументом-годом вызывает получение топа за год", async () => {
      const ctx = createMockContext({
        message: { text: "/top 2024", message_id: 1 },
      });
      const mockScores = [{ username: "user1", score: 100 }];
      (StatsService.getFilteredScores as any).mockReturnValue(mockScores);

      await stats.topHandler(ctx as CommandContext);

      expect(StatsService.getFilteredScores).toHaveBeenCalledWith(
        12345,
        "2024",
      );
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("2024 год"),
      );
    });

    it("с неверным аргументом выводит сообщение об ошибке", async () => {
      const ctx = createMockContext({
        message: { text: "/top wrong", message_id: 1 },
      });

      await stats.topHandler(ctx as CommandContext);

      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        expect.stringContaining("Неверный формат"),
      );
    });
  });

  describe("statsUpdateHandler", () => {
    it("выполняет пересчёт и удаляет сообщение прогресса", async () => {
      vi.useFakeTimers();

      const ctx = createMockContext({
        message: { text: "/stats_update", message_id: 1 },
        reply: vi.fn().mockResolvedValue({ message_id: 100 }),
        deleteMessage: vi.fn(),
      });

      const promise = stats.statsUpdateHandler(ctx as CommandContext);
      for (let i = 0; i < 10; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }
      await promise;

      expect(ctx.reply).toHaveBeenCalledWith("🔄 Пересчёт статистики: 0%");
      expect(ctx.telegram.editMessageText).toHaveBeenCalledTimes(10);
      expect(StatsService.recalcStats).toHaveBeenCalled();
      expect(ctx.deleteMessage).toHaveBeenCalledWith(100);
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "✅ Статистика успешно пересчитана!",
      );

      vi.useRealTimers();
    });

    it("обрабатывает ошибку", async () => {
      vi.useFakeTimers();

      const ctx = createMockContext({
        message: { text: "/stats_update", message_id: 1 },
        reply: vi.fn().mockResolvedValue({ message_id: 100 }),
        telegram: {
          editMessageText: vi
            .fn()
            .mockRejectedValue(new Error("Telegram error")),
          deleteMessage: vi.fn(),
        },
      });

      const promise = stats.statsUpdateHandler(ctx as CommandContext);
      for (let i = 0; i < 10; i++) {
        await vi.advanceTimersByTimeAsync(1000);
      }
      await promise;

      expect(logger.error).toHaveBeenCalled();
      expect(middlewares.replyWithAutoDelete).toHaveBeenCalledWith(
        ctx,
        "❌ Ошибка при пересчёте.",
      );

      vi.useRealTimers();
    });
  });
});

```

// backend/src/telegram/handlers/stats/stats.ts

```typescript
import { Context } from "telegraf";

import { StatsService } from "@/services";
import { logger } from "@/config/logger";

import { deleteCommandMessage, replyWithAutoDelete } from "../../middlewares";
import { escapeMarkdown } from "../common";

import type { CommandContext } from "@/types/telegram";

function buildYearKeyboard(prefix: string, years: string[]): any {
  const yearButtons = years.map((year) => ({
    text: year,
    callback_data: `${prefix}_${year}`,
  }));

  // Разбиваем на строки по 3 кнопки
  const rows: any[] = [];
  for (let i = 0; i < yearButtons.length; i += 3) {
    rows.push(yearButtons.slice(i, i + 3));
  }

  return {
    inline_keyboard: [
      [
        { text: "📅 Всё время", callback_data: `${prefix}_all` },
        { text: "📆 Последний год", callback_data: `${prefix}_last_year` },
      ],
      ...rows,
    ],
  };
}

// --------------------------------------------------------------------------
// Публичная функция для отправки статистики (используется и в команде, и в callback)
// --------------------------------------------------------------------------
export async function sendStats(ctx: Context, chatId: number, filter?: string) {
  try {
    const stats = StatsService.getFilteredStats(chatId, filter);
    if (stats.length === 0) {
      await replyWithAutoDelete(ctx, "📊 Пока нет данных за указанный период.");
      return;
    }

    let message = "📊 Статистика участников";
    if (filter === "all") message += " (всё время)";
    else if (filter) message += ` (${filter} год)`;
    else message += " (последний год)";
    message += ":\n```\n";
    message += "№    Участник           Игр    Вход    Выход   Разница\n";
    message += "-------------------------------------------------------\n";

    stats.slice(0, 30).forEach((item, index) => {
      const num = (index + 1).toString().padEnd(4);
      const username = item.username.padEnd(18);
      const gamesCount = item.games_count.toString().padStart(4);
      const totalIn = item.total_in.toString().padStart(6);
      const totalOut = item.total_out.toString().padStart(6);
      const diff = item.total_out - item.total_in;
      const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
      message += `${num} ${username} ${gamesCount} ${totalIn} ${totalOut} ${diffStr.padStart(7)}\n`;
    });
    message += "```";
    await replyWithAutoDelete(ctx, message, { parse_mode: "Markdown" });
  } catch (error) {
    logger.error(`[ERROR] sendStats: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке статистики.");
  }
}

// --------------------------------------------------------------------------
// Публичная функция для отправки топа (используется и в команде, и в callback)
// --------------------------------------------------------------------------
export async function sendTop(ctx: Context, chatId: number, filter?: string) {
  try {
    const scores = StatsService.getFilteredScores(chatId, filter);
    if (scores.length === 0) {
      await replyWithAutoDelete(ctx, "🏆 Пока нет данных за указанный период.");
      return;
    }

    let title = "🏆 Топ участников";
    if (filter === "all") title += " (всё время)";
    else if (filter) title += ` (${filter} год)`;
    else title += " (последний год)";
    title += ":\n";

    const top = scores
      .slice(0, 10)
      .map((u, i) => {
        const sign = u.score >= 0 ? "+" : "";
        const escapedUsername = escapeMarkdown(u.username);
        return `${i + 1}. ${escapedUsername} — ${sign}${u.score}`;
      })
      .join("\n");

    await replyWithAutoDelete(ctx, title + top);
  } catch (error) {
    logger.error(`[ERROR] sendTop: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при загрузке топа.");
  }
}

export const statsHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /stats вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  const args = ctx.message.text.split(" ").slice(1);
  const chatId = ctx.chat!.id;

  if (args.length > 0) {
    const arg = args[0].toLowerCase();
    if (arg === "all" || /^\d{4}$/.test(arg)) {
      await sendStats(ctx, chatId, arg);
    } else {
      await replyWithAutoDelete(
        ctx,
        "❌ Неверный формат. Используйте `/stats all`, `/stats 2024` или просто `/stats` для выбора фильтра.",
      );
    }
    return;
  }

  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("stats", years);

  await ctx.reply("📊 Выберите период для статистики:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
};

export const topHandler = async (ctx: CommandContext) => {
  logger.info(`[HANDLER] /top вызван пользователем ${ctx.from?.id}`);
  await deleteCommandMessage(ctx);

  const args = ctx.message.text.split(" ").slice(1);
  const chatId = ctx.chat!.id;

  if (args.length > 0) {
    const arg = args[0].toLowerCase();
    if (arg === "all" || /^\d{4}$/.test(arg)) {
      await sendTop(ctx, chatId, arg);
    } else {
      await replyWithAutoDelete(
        ctx,
        "❌ Неверный формат. Используйте `/top all`, `/top 2024` или просто `/top` для выбора фильтра.",
      );
    }
    return;
  }

  const years = StatsService.getAvailableYears(chatId);
  const keyboard = buildYearKeyboard("top", years);

  await ctx.reply("🏆 Выберите период для топа:", {
    reply_markup: keyboard,
    parse_mode: "Markdown",
  });
};

export const statsUpdateHandler = async (ctx: CommandContext) => {
  logger.info("[HANDLER] /stats_update вызван");
  await deleteCommandMessage(ctx);

  try {
    const statusMsg = await ctx.reply("🔄 Пересчёт статистики: 0%");
    const totalSteps = 10;
    for (let step = 1; step <= totalSteps; step++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const percent = Math.floor((step / totalSteps) * 100);
      await ctx.telegram.editMessageText(
        ctx.chat!.id,
        statusMsg.message_id,
        undefined,
        `🔄 Пересчёт статистики: ${percent}%`,
      );
    }
    StatsService.recalcStats();
    await ctx.deleteMessage(statusMsg.message_id);
    await replyWithAutoDelete(ctx, "✅ Статистика успешно пересчитана!");
  } catch (error) {
    logger.error(`[ERROR] /stats_update: ${JSON.stringify(error, null, 2)}`);
    await replyWithAutoDelete(ctx, "❌ Ошибка при пересчёте.");
  }
};

```

// backend/src/telegram/middlewares.ts

```typescript
import { logger } from "@/config/logger";

import { Context } from "telegraf";

export async function deleteCommandMessage(ctx: Context) {
  if (ctx.message && "message_id" in ctx.message) {
    try {
      await ctx.deleteMessage(ctx.message.message_id);
      logger.info(
        `[DELETE] Сообщение команды ${ctx.message.message_id} удалено`,
      );
    } catch (error) {
      logger.error(
        `[DELETE] Не удалось удалить сообщение команды: ${JSON.stringify(error, null, 2)}`,
      );
    }
  }
}

export async function replyWithAutoDelete(
  ctx: Context,
  text: string,
  extra?: any,
  delayMs: number = 30000,
) {
  try {
    const sent = await ctx.reply(text, extra);
    setTimeout(async () => {
      try {
        await ctx.telegram.deleteMessage(ctx.chat!.id, sent.message_id);
        logger.info(`[AUTODELETE] Сообщение ${sent.message_id} удалено`);
      } catch (error) {
        logger.error(
          `[AUTODELETE] Ошибка удаления: ${JSON.stringify(error, null, 2)}`,
        );
      }
    }, delayMs);
    return sent;
  } catch (error) {
    logger.error(`[REPLY] Ошибка отправки: ${JSON.stringify(error, null, 2)}`);
    throw error;
  }
}

export async function errorHandler(err: unknown, ctx: Context) {
  logger.error(`[BOT ERROR]: ${JSON.stringify(err, null, 2)}`);
  try {
    await replyWithAutoDelete(
      ctx,
      "❌ Произошла внутренняя ошибка. Пожалуйста, попробуйте позже.",
    );
  } catch (error) {
    logger.error(
      `[BOT ERROR] Не удалось отправить сообщение об ошибке: ${JSON.stringify(error, null, 2)}`,
    );
  }
}

```

// backend/src/types/telegram.ts

```typescript
import { Context, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";

// Тип для текстовых команд (например, /stats, /top)
export type CommandContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.TextMessage>
>;

// Тип для любого текстового сообщения (не обязательно команда)
export type TextMessageContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.TextMessage>
>;

// Тип для сообщения с фото
export type PhotoMessageContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.PhotoMessage>
>;

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
    "skipLibCheck": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```

// backend/vitest.config.ts

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    passWithNoTests: true,
    environment: "node",
    globals: true,
    coverage: {
      exclude: ["**/node_modules/**", "**/dist/**", "**/types/**"],
      reporter: ["text", "json", "html"],
      provider: "v8",
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

// data/stats.db (base64, size: 122880, mtime: 2026-04-01T06:30:33.624Z, md5: f0c009f0cfb1d29fd2c0f7be3e2572cc)

```
U1FMaXRlIGZvcm1hdCAzABAAAQEAQCAgAAATzAAAAB4AAAAAAAAAAAAAAAgAAAAEAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABPMAC6GKg0NgQAJCscADyUO0w2JDFsNVguSDCYLIQrHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYCQYXMxcBdWluZGV4aWR4X2dhbWVzX2dhbWVfZGF0ZWdhbWVzHENSRUFURSBJTkRFWCBpZHhfZ2FtZXNfZ2FtZV9kYXRlIE9OIGdhbWVzKGdhbWVfZGF0ZSlvCAcXPSUBgQlpbmRleGlkeF90cmFuc2FjdGlvbnNfZ2FtZV9pZHRyYW5zYWN0aW9ucxlDUkVBVEUgSU5ERVggaWR4X3RyYW5zYWN0aW9uc19nYW1lX2lkIE9OIHRyYW5zYWN0aW9ucyhnYW1lX2lkKYERBgcXISEBgW10YWJsZW1pZ3JhdGlvbnNtaWdyYXRpb25zF0NSRUFURSBUQUJMRSBtaWdyYXRpb25zICgKICAgICAgbmFtZSBURVhUIFBSSU1BUlkgS0VZLAogICAgICBhcHBsaWVkX2F0IERBVEVUSU1FIERFRkFVTFQgQ1VSUkVOVF9USU1FU1RBTVAKICAgICkzBwYXRyEBAGluZGV4c3FsaXRlX2F1dG9pbmRleF9taWdyYXRpb25zXzFtaWdyYXRpb25zGIF4BAcXFxcBg090YWJsZXVzZXJzdXNlcnMFQ1JFQVRFIFRBQkxFIHVzZXJzICgKICAgICAgdXNlcm5hbWUgVEVYVCBQUklNQVJZIEtFWSwKICAgICAgdGVsZWdyYW1faWQgSU5URUdFUiwKICAgICAgdG90YWxfaW4gSU5URUdFUiBERUZBVUxUIDAsCiAgICAgIHRvdGFsX291dCBJTlRFR0VSIERFRkFVTFQgMCwKICAgICAgZ2FtZXNfY291bnQgSU5URUdFUiBERUZBVUxUIDAsCiAgICAgIGdhbWVfaWRzIFRFWFQgREVGQVVMVCAnW10nCiAgICApKQUGFz0XAQBpbmRleHNxbGl0ZV9hdXRvaW5kZXhfdXNlcnNfMXVzZXJzBgAAAAgAAAAAgkcDBxclJQGEUXRhYmxldHJhbnNhY3Rpb25zdHJhbnNhY3Rpb25zBENSRUFURSBUQUJMRSB0cmFuc2FjdGlvbnMgKAogICAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsCiAgICAgIGdhbWVfaWQgSU5URUdFUiwK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NDYrAgYABQIhM/8WltnIpgeuMjAyNi0wMS0yOTIwMjYtMDItMTYgMTY6NDU6MTUrAQYABQIhM/8WltnIpge/MjAyNi0wMi0xNDIwAAAAFIIHAAAAEYExAAAAEFwNAAAAAg/hAA/hD+0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgMhAdCo0YPRgNC40LouDgMhAdCo0YPRgNC40LouDAMdAdCi0LXQvNCwLRADJQHQodC/0LjRgdC+0LosEAMlAdCh0LXRgNGR0LPQsCsQAyUB0KHQtdGA0LPQtdC5Kh0DPwHQodCw0L3RkdC6INCT0L7Qs9C+0LvQtdCyKQwDHQHQodCw0L3RjygSAykB0J3QuNC60L7Qu9Cw0LknEgMpAdCd0LjQutC40YLQvtGBJhADJQHQndC40LrQuNGC0LAlEgMpAdCd0LDQt9Cw0YDQuNC6JA4DIQHQndCw0LfQsNGAIwwDHQHQnNCw0LrRgSIMAx0B0JvQtdGF0LAhDAMdAdCY0LvRjNGPIAwDHQHQmNCy0LDQvR8SAykB0JTQvNC40YLRgNC40LkeDgMhAdCU0LjQvNC+0L0dDgMhAdCU0LjQvNCw0L0cDAMdAdCS0L7QstCwGwwDHQHQktC70LDQtBoZAzcB0JLQuNGC0LDQu9C40Lou0L3QvtCyGRIDKQHQktC40YLQsNC70LjQuhgSAykB0JLQuNGC0LDQu9C40LkXDAMdAdCS0LDRgdGPFhIDKQHQktCw0YHQuNC70LjQuRUOAyEB0JLQsNGB0LXQuhQOAyEB0JLQsNC90LXQuhMOAyEB0JDRgNGC0LXQvBIQAyUB0JDQvdC00YDQtdC5EQoDGQFTZXJnZXkQDQMfAUBsaXMxOTk3Nw8NAx8BQGxpczE5OTcxDgsDGwFAa292YXNzDQ4DIQFAZm9taWNoZWV2DA0DHwFAZXhwaWduaWsLFwMzAUBkbWl0cnlfZWZyZW1vdjY5OTYKEgMpAUBjaGVmX3phc3VraGluCQ4DIQFAU3plcnVrYWV2CBEDJwFAU2hvb3JhQWxpYmFzBxIDKQFAUmFib3R5YWdhMzAwMAYMAx0BQFByMGtzaWkFEAMlAUBMb3RoYXJfVWdhcgQUAy0BQEVnb3JWYWdhbm92MTExMQMOAyEBQEJlenltbm9fVgIPAyUJQEFudG9uU2lsYWV2DQ4BADMFTQAN2A2pDXwNUw0lDPQMzAydDG4MRQwcC+4LvAuNC14LNQsICuEKuQqQCmUKPAoVCe4JxQmdCXMJSgkaCO4IwAiPCGgIOwgMB+EHuQeRB2IHOQcQBuEGtAaMBloGKgYBBdEFpQV3BU0BtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBtwG3AbcBjAFZAS8BAgDVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKoEIBwABIQITMwXQndCw0LfQsNGACDRvdXQyMDI2LTAyLTE2IDE3OjEyOjE5KoEHBwABIQITMwXQlNC40LzQsNC9BRRvdXQyMDI2LTAyLTE2IDE3OjEyOjE5J4EGBwABGwITMwVAa292YXNzCKJvdXQyMDI2LTAyLTE2IDE3OjEyOjE5MIEFBwABLQITMwVARWdvclZhZ2Fub3YxMTExAjJvdXQyMDI2LTAyLTE2IDE3OjEyOjE5KIEEBwABHQITMwXQktCw0L3RjwLBb3V0MjAyNi0wMi0xNiAxNzoxMjoxOSmBAwcAASECETMF0J3QsNC30LDRgAH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEDagABHQIRMwXQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEDQAABKQIRMwXQlNC80LjRgtGA0LjQuQDIaW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEDEAABKQIRMwXQlNC80LjRgtGA0LjQuQDIaW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEC4AEhAhEzBdCU0LjQvNCw0L0BLGluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BArUBHQIRMwXQktC+0LLQsAH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgECjAEdAhEzBdCS0L7QstCwAfRpbjIwMjYtMDItMTYgMTc6MTI6MTkOAQJjAR0CETMF0JLQvtCy0LAB9GluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BAjoBHQIRMwXQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgECEQEhAhEzBdCU0LjQvNCw0L0B9GluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BAeYBHQIRMwXQktC70LDQtAH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEBvQEdAhEzBdCS0L7QstCwAfRpbjIwMjYtMDItMTYgMTc6MTI6MTkOAQGUASkCETMF0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BAWUBKQIRMwVAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEBNgEbAhEzBUBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BAQ4BHQIRMwXQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEA5QElAhEzBUBMb3RoYXJfVWdhcgH0aW4yMDI2LTAyLTE2IDE3OjEyOjE5DgEAuAEdAhEzBdCY0LLQsNC9AfRpbjIwMjYtMDItMTYgMTc6MTI6MTkOAQCPASkCETMFQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoxMjoxOQ4BAGABLQIRMwVARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6MTI6MTkOAQAvASkCETMF0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMi0xNiAxNzoxMjoxOShuBwABHQITMwLQodCw0L3RjwKjb3V0MjAyNi0wMi0xNiAxNjo1OTo1NCxtBwABJQITMwJATG90aGFyX1VnYXIDG291dDIwMjYtMDItMTYgMTY6NTk6NTQqbAcAASECEzMC0JTQuNC80LDQvQR+b3V0MjAyNi0wMi0xNiAxNjo1OTo1NC5rBwABKQITMwLQlNC80LjRgtGA0LjQuQF3b3V0MjAyNi0wMi0xNiAxNjo1OTo1NCdqBwABGwITMwJAa292YXNzA7ZvdXQyMDI2LTAyLTE2IDE2OjU5OjU0LmkHAAEpAhMzAkBSYWJvdHlhZ2EzMDAwAj9vdXQyMDI2LTAyLTE2IDE2OjU5OjU0MGgHAAEtAhMzAkBFZ29yVmFnYW5vdjExMTEBCW91dDIwMjYtMDItMTYgMTY6NTk6NTQmZwcAARkCEzMCU2VyZ2V5BJdvdXQyMDI2LTAyLTE2IDE2OjU5OjU0K2YHAAElAhEzAtCd0LjQutC40YLQsAEsaW4yMDI2LTAyLTE2IDE2OjU5OjU0LWUHAAEpAhEzAkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTY6NTk6NTQnZAcAAR0CETMC0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxNjo1OTo1NCdjBwABHQIRMwLQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE2OjU5OjU0LWIHAAEpAhEzAkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTY6NTk6NTQmYQcAARsCETMCQGtvdmFzcwH0aW4yMDI2LTAyLTE2IDE2OjU5OjU0JmAHAAEbAhEzAkBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNjo1OTo1NClfBwABIQIRMwLQlNC40LzQsNC9AfRpbjIwMjYtMDItMTYgMTY6NTk6NTQtXgcAASkCETMC0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMi0xNiAxNjo1OTo1NCtdBwABJQIRMwJATG90aGFyX1VnYXIB9GluMjAyNi0wMi0xNiAxNjo1OTo1NCVcBwABGQIRMwJTZXJnZXkB9GluMjAyNi0wMi0xNiAxNjo1OTo1NC9bBwABLQIRMwJARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTY6NTk6NTQsPwcAASUCEzMEQExvdGhhcl9VZ2FyAhJvdXQyMDI2LTAyLTE2IDE2OjUxOjU5Kj4HAAEhAhMzBNCU0LjQvNCw0L0Dtm91dDIwMjYtMDItMTYgMTY6NTE6NTkuPQcAASkCEzMEQFJhYm90eWFnYTMwMDAD/G91dDIwMjYtMDItMTYgMTY6NTE6NTknPAcAARsCEzMEQGtvdmFzcwTTb3V0MjAyNi0wMi0xNiAxNjo1MTo1OSg7BwABHQITMwTQotC10LzQsAPeb3V0MjAyNi0wMi0xNiAxNjo1MTo1OSY6BwABGQITMwRTZXJnZXkCvG91dDIwMjYtMDItMTYgMTY6NTE6NTknOQcAAR0CETME0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxNjo1MTo1OSU4BwABGQIRMwRTZXJnZXkB9GluMjAyNi0wMi0xNiAxNjo1MTo1OSU3BwABGQIRMwRTZXJnZXkB9GluMjAyNi0wMi0xNiAxNjo1MTo1OSc2BwABHQIRMwTQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE2OjUxOjU5KTUHAAEhAhEzBNCU0LjQvNCw0L0B9GluMjAyNi0wMi0xNiAxNjo1MTo1OSc0BwABHQIRMwTQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE2OjUxOjU5JjMHAAEbAhEzBEBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNjo1MTo1OSUyBwABGQIRMwRTZXJnZXkB9GluMjAyNi0wMi0xNiAxNjo1MTo1OSsxBwABJQIRMwRATG90aGFyX1VnYXIB9GluMjAyNi0wMi0xNiAxNjo1MTo1OScwBwABHQIRMwTQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE2OjUxOjU5LS8HAAEpAhEzBEBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTY6NTE6NTktLgcAAScCEzMDQFNob29yYUFsaWJhcwlqb3V0MjAyNi0wMi0xNiAxNjo0Njo0NjAtBwABLQITMwNARWdvclZhZ2Fub3YxMTExBLBvdXQyMDI2LTAyLTE2IDE2OjQ2OjQ2LCwHAAElAhMzA0BMb3RoYXJfVWdhcgIIb3V0MjAyNi0wMi0xNiAxNjo0Njo0NicrBwABGwITMwNAa292YXNzAlhvdXQyMDI2LTAyLTE2IDE2OjQ2OjQ2JyoHAAEdAhEzA9Ch0LDQvdGPAPppbjIwMjYtMDItMTYgMTY6NDY6NDYtKQcAASkCETMDQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNjo0Njo0Ni0oBwABKQIRMwNAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE2OjQ2OjQ2JicHAAEbAhEzA0Brb3Zhc3MB9GluMjAyNi0wMi0xNiAxNjo0Njo0Ni8mBwABLQIRMwNARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTY6NDY6NDYsJQcAAScCETMDQFNob29yYUFsaWJhcwH0aW4yMDI2LTAyLTE2IDE2OjQ2OjQ2JyQHAAEdAhEzA9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTY6NDY6NDYrIwcAASUCETMDQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTY6NDY6NDYtIgcAASkCETMDQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNjo0Njo0NichBwABHQIRMwPQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE2OjQ2OjQ2AAAB/wkdAhMz0KHQsNC90Y8OIW91dDIwMjYtMDItMTYgMTY6NDQ6MDMAAAHWCRsCEzNAa292YXNzASJvdXQyMDI2LTAyLTE2IDE2OjQ0OjAzAAABrgktAhMzQEVnb3JWYWdhbm92MTExMQcwb3V0MjAyNi0wMi0xNiAxNjo0NDowMwAAAX0JHQIRM9Ci0LXQvNCwArxpbjIwMjYtMDItMTYgMTY6NDQ6MDMAAAFVCR0CETPQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE2OjQ0OjAzAAABLQktAhEzQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE2OjQ0OjAzAAAA/QkpAhEzQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNjo0NDowMwAAAM8JGwIRM0Brb3Zhc3MB9GluMjAyNi0wMi0xNiAxNjo0NDowMwAAAKgJHQIRM9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTY6NDQ6MDMAAACACSkCETNAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE2OjQ0OjAzAAAAUgkhAhEz0JTQuNC80LDQvQH0aW4yMDI2LTAyLTE2IDE2OjQ0OjAzAAAAKAkdAhEz0KLQtdC80LAB9GluMjAyNi0wMi0xNiAxNjo0NDowMw0FUgBJAN0BD58Pbw9BDxIO6A6/DpUOZQ42DgUN1g2mDXwNTA0eDPQMyQygDG4MRAwaC/ALwAuVC2oLOwsQCt0KswlwCUAJDgjkCLYIhAhRCCcH9gfHB5wHbAc+Bw8G5ga9BpMGYwY0A+0DuwOLA2EDMQMHAtkCrwJ8AksCHAHxBSgE+ATIBJYEawRCBBYBwQGRAV8BNQEHAN0A3QDdAN0A3QDdAN0A3QDdAN0A3QDdAN0AtgAAJ4FeBwABHQIRMxLQotC10LzQsADIaW4yMDI2LTAyLTE2IDE3OjIzJ4F/BwABHQIRMxLQodCw0L3RjwK8aW4yMDI2LTAyLTE2IDE3OjI4OjQwK4F+BwABJQIRMxJATG90aGFyX1VnYXIB9GluMjAyNi0wMi0xNiAxNzoyODo0MCeBfQcAAR0CETMS0KLQtdC80LAB9GluMjAyNi0wMi0xNiAxNzoyODo0MC+BfAcAAS0CETMSQEVnb3JWYWdhbm92MTExMQEsaW4yMDI2LTAyLTE2IDE3OjI4OjQwLYF7BwABKQIRMxJAUmFib3R5YWdhMzAwMAEsaW4yMDI2LTAyLTE2IDE3OjI4OjQwLYF6BwABKQIRMxJAUmFib3R5YWdhMzAwMAEsaW4yMDI2LTAyLTE2IDE3OjI4OjQwKIFyBwABHQITMxHQodCw0L3RjwH+b3V0MjAyNi0wMi0xNiAxNzoyNjoxNSyBcQcAASUCEzMRQExvdGhhcl9VZ2FyAedvdXQyMDI2LTAyLTE2IDE3OjI2OjE1LoFwBwABKQITMxFAUmFib3R5YWdhMzAwMAQ6b3V0MjAyNi0wMi0xNiAxNzoyNjoxNTCBbwcAAS0CEzMRQEVnb3JWYWdhbm92MTExMQS/b3V0MjAyNi0wMi0xNiAxNzoyNjoxNSeBbgcAARsCEzMRQGtvdmFzcwN6b3V0MjAyNi0wMi0xNiAxNzoyNjoxNSuBbQcAASUCETMRQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6MjY6MTUngWwHAAEdAhEzEdCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTc6MjY6MTUtgWsHAAEpAhEzEUBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTc6MjY6MTUngWoHAAEdAhEzEdCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTc6MjY6MTUtgWkHAAEpAhEzEUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTc6MjY6MTUvgWgHAAEtAhEzEUBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxNzoyNjoxNSaBZwcAARsCETMRQGtvdmFzcwH0aW4yMDI2LTAyLTE2IDE3OjI2OjE1KIF5BwABHwIRMxJAbGlzMTk5NzEF3GluMjAyNi0wMi0xNiAxNzoyODo0MAAmgXgHAAEbAhEzEkBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNzoyODo0MCiBdwcAAR8CETMSQGV4cGlnbmlrAfRpbjIwMjYtMDItMTYgMTc6Mjg6MzkvgXYHAAEtAhEzEkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxNzoyODozOS2BdQcAASkCETMS0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMi0xNiAxNzoyODozOS2BdAcAASkCETMSQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoyODozOSeBcwcAAR0CETMS0KLQtdC80LAB9GluMjAyNi0wMi0xNiAxNzoyODozOQmZAOIAASECEzMF0J3QsNC30LDRgAg0b3V0MjAyNi0wMi0xNiAxNzoxMjoxOQmZALUAASECEzMF0JTQuNC80LDQvQUUb3V0MjAyNi0wMi0xNiAxNzoxMjoxOQmZAIgAARsCEzMFQGtvdmFzcwiib3V0MjAyNi0wMi0xNiAxNzoxMjoxOQmZAF4AAS0CEzMFQEVnb3JWYWdhbm92MTExMQIyb3V0MjAyNi0wMi0xNiAxNzoxMjoxOQmZACsAAR0CEzMF0JLQsNC90Y8CwW91dDIwMjYtMDItMTYgMTc6MTI6MTksgT8HAAElAhMzEEBMb3RoYXJfVWdhcgFbb3V0MjAyNi0wMi0xNiAxNzoyMToxOS2BPgcAAScCEzMQQFNob29yYUFsaWJhcwZMb3V0MjAyNi0wMi0xNiAxNzoyMToxOSeBPQcAARsCEzMQQGtvdmFzcwIcb3V0MjAyNi0wMi0xNiAxNzoyMToxOSaBPAcAARsCETMQQGtvdmFzcwH0aW4yMDI2LTAyLTE2IDE3OjIxOjE5JoE7BwABGwIRMxBAa292YXNzAfRpbjIwMjYtMDItMTYgMTc6MjE6MTksgToHAAEnAhEzEEBTaG9vcmFBbGliYXMB9GluMjAyNi0wMi0xNiAxNzoyMToxOSuBOQcAASUCETMQQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6MjE6MTktgTgHAAEpAhEzENCd0LjQutC+0LvQsNC5AfRpbjIwMjYtMDItMTYgMTc6MjE6MTkogTcHAAEdAhMzDtCh0LDQvdGPA/dvdXQyMDI2LTAyLTE2IDE3OjE5OjEwLIE2BwABJQITMw5ATG90aGFyX1VnYXIB0W91dDIwMjYtMDItMTYgMTc6MTk6MTAugTUHAAEpAhMzDkBSYWJvdHlhZ2EzMDAwAdFvdXQyMDI2LTAyLTE2IDE3OjE5OjEwJ4E0BwABGwITMw5Aa292YXNzAxtvdXQyMDI2LTAyLTE2IDE3OjE5OjEwMIEzBwABLQITMw5ARWdvclZhZ2Fub3YxMTExASxvdXQyMDI2LTAyLTE2IDE3OjE5OjEwL4EyBwABLQIRMw5ARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6MTk6MTArgTEHAAElAhEzDkBMb3RoYXJfVWdhcgH0aW4yMDI2LTAyLTE2IDE3OjE5OjEwJ4EwBwABHQIRMw7QodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjE5OjEwL4EvBwABLQIRMw5ARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6MTk6MTAtgS4HAAEpAhEzDkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTc6MTk6MTAmgS0HAAEbAhEzDkBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNzoxOToxMA/PARoAASkCEzMMQFJhYm90eWFnYTMwMDAGQG91dDIwMjYtMDItMTYgMTc6MTY6MzEAAADpAAElAhMzDEBMb3RoYXJfVWdhcgGQb3V0MjAyNi0wMi0xNiAxNzoxNjozMQAAALoAARsCEzMMQGtvdmFzcwOEb3V0MjAyNi0wMi0xNiAxNzoxNjozMQAAAJAAASECEzMM0JTQuNC80LDQvQK8b3V0MjAyNi0wMi0xNiAxNzoxNjozMQAAAGMAAScCEzMMQFNob29yYUFsaWJhcwTVb3V0MjAyNi0wMi0xNiAxNzoxNjozMQAAADMAAS0CEzMMQEVnb3JWYWdhbm92MTExMQTOb3V0MjAyNi0wMi0xNiAxNzoxNjozMSeBJgcAARsCEzMLQGtvdmFzcwxEb3V0MjAyNi0wMi0xNiAxNzoxNTo0MTCBJQcAAS0CEzMLQEVnb3JWYWdhbm92MTExMQWWb3V0MjAyNi0wMi0xNiAxNzoxNTo0MSiBJAcAAR0CEzML0KHQsNC90Y8AyG91dDIwMjYtMDItMTYgMTc6MTU6NDEsgSMHAAElAhMzC0BMb3RoYXJfVWdhcgDhb3V0MjAyNi0wMi0xNiAxNzoxNTo0MSiBIgcAAR0CEzML0KLQtdC80LADem91dDIwMjYtMDItMTYgMTc6MTU6NDEogSEHAAEfAhEzC0BleHBpZ25pawEsaW4yMDI2LTAyLTE2IDE3OjE1OjQxLYEgBwABKQIRMwtAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxJ4EfBwABHQIRMwvQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxJ4EeBwABHQIRMwvQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxJ4EdBwABHQIRMwvQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxL4EcBwABLQIRMwtARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6MTU6NDEmgRsHAAEbAhEzC0Brb3Zhc3MB9GluMjAyNi0wMi0xNiAxNzoxNTo0MSiBGgcAAR8CETMLQGV4cGlnbmlrAfRpbjIwMjYtMDItMTYgMTc6MTU6NDEngRkHAAEdAhEzC9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTc6MTU6NDErgRgHAAElAhEzC0BMb3RoYXJfVWdhcgH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxLYEXBwABKQIRMwtAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE3OjE1OjQxJ4EWBwABGwITMwpAa292YXNzBZZvdXQyMDI2LTAyLTE2IDE3OjE0OjM2LYEVBwABJwITMwpAU2hvb3JhQWxpYmFzAaFvdXQyMDI2LTAyLTE2IDE3OjE0OjM2LIEUBwABJQITMwpATG90aGFyX1VnYXIFlm91dDIwMjYtMDItMTYgMTc6MTQ6MzYugRMHAAEpAhMzCkBSYWJvdHlhZ2EzMDAwA2hvdXQyMDI2LTAyLTE2IDE3OjE0OjM2LIESBwABJwIRMwpAU2hvb3JhQWxpYmFzAfRpbjIwMjYtMDItMTYgMTc6MTQ6MzYtgREHAAEpAhEzCtCU0LzQuNGC0YDQuNC5AfRpbjIwMjYtMDItMTYgMTc6MTQ6MzYngRAHAAEdAhEzCtCi0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6MTQ6MzYmgQ8HAAEbAhEzCkBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxNzoxNDozNieBDgcAAR0CETMK0KLQtdC80LAB9GluMjAyNi0wMi0xNiAxNzoxNDozNiyBDQcAAScCETMKQFNob29yYUFsaWJhcwH0aW4yMDI2LTAyLTE2IDE3OjE0OjM2K4EMBwABJQIRMwpATG90aGFyX1VnYXIB9GluMjAyNi0wMi0xNiAxNzoxNDozNi2BCwcAASkCETMKQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoxNDozNi2BCgcAASkCETMK0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMi0xNiAxNzoxNDozNgAAADEAASkCEzMFQFJhYm90eWFnYTMwMDABzG91dDIwMjYtMDItMTYgMTc6MTI6MTkNAAAAVgDYAA/VD6cPdw9MDyAO9g7LDp4Ocg5BDhAN3Q2zDYgNWA0oDPkMywyjDHoMSgwiC/oLyguZC2oLOQsQCuYKvQqVCmcKNwoICd4JrAl6CUsJIgjyCMYIkwhjCDYIDAfdB6wHfAdKByAG+AbPBp8GdQZLBiIF9gXDBZgFZQU0BQoE4ASuBH4EVgQtA/8DzwOnA3kDTwMlAvYCzAKhAnACPQINAdsBsQGJAVkBLwEBANgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmglUHAAEbAhEzG0Brb3Zhc3MBLGluMjAyNi0wMi0xNiAxNzozODowNiuCVAcAASUCETMbQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6Mzg6MDYnglMHAAEdAhEzG9Ci0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6Mzg6MDYtglIHAAEpAhEzG0BSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTc6Mzg6MDYlglEHAAEZAhEzG1NlcmdleQH0aW4yMDI2LTAyLTE2IDE3OjM4OjA2J4JQBwABHQIRMxvQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE3OjM4OjA2L4JPBwABLQIRMxtARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6Mzg6MDYtgk4HAAEpAhEzG9Cd0LjQutC+0LvQsNC5AfRpbjIwMjYtMDItMTYgMTc6Mzg6MDYwgk0HAAEtAhMzGEBFZ29yVmFnYW5vdjExMTEHI291dDIwMjYtMDItMTYgMTc6MzM6NTYugkwHAAEpAhMzGEBSYWJvdHlhZ2EzMDAwBilvdXQyMDI2LTAyLTE2IDE3OjMzOjU2KIJLBwABHQITMxjQotC10LzQsAXcb3V0MjAyNi0wMi0xNiAxNzozMzo1NieCSgcAARsCEzMYQGtvdmFzcwFRb3V0MjAyNi0wMi0xNiAxNzozMzo1NiyCSQcAASUCEzMY0JDQvdC00YDQtdC5ALtvdXQyMDI2LTAyLTE2IDE3OjMzOjU2J4JIBwABHQIRMxjQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE3OjMzOjU2J4JHBwABHQIRMxjQotC10LzQsAH0aW4yMDI2LTAyLTE2IDE3OjMzOjU2K4JGBwABJQIRMxjQkNC90LTRgNC10LkB9GluMjAyNi0wMi0xNiAxNzozMzo1NiWCRQcAARkCETMYU2VyZ2V5AfRpbjIwMjYtMDItMTYgMTc6MzM6NTYtgkQHAAEpAhEzGEBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTc6MzM6NTYrgkMHAAElAhEzGNCQ0L3QtNGA0LXQuQH0aW4yMDI2LTAyLTE2IDE3OjMzOjU2JoJCBwABGwIRMxhAa292YXNzASxpbjIwMjYtMDItMTYgMTc6MzM6NTYlgkEHAAEZAhEzGFNlcmdleQH0aW4yMDI2LTAyLTE2IDE3OjMzOjU2LYJABwABKQIRMxhAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE3OjMzOjU2L4I/BwABLQIRMxhARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6MzM6NTYngj4HAAEdAhEzGNCi0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6MzM6NTUngj0HAAEbAhMzFkBrb3Zhc3MDQ291dDIwMjYtMDItMTYgMTc6MzE6MjAugjwHAAEpAhMzFkBSYWJvdHlhZ2EzMDAwBllvdXQyMDI2LTAyLTE2IDE3OjMxOjIwMII7BwABLQITMxZARWdvclZhZ2Fub3YxMTExA3VvdXQyMDI2LTAyLTE2IDE3OjMxOjIwKII6BwABHQITMxbQotC10LzQsAaIb3V0MjAyNi0wMi0xNiAxNzozMToyMDCCOQcAAS0CEzMWQEVnb3JWYWdhbm92MTExMQFeb3V0MjAyNi0wMi0xNiAxNzozMToyMCmCOAcAASECETMW0JTQuNC80LDQvQH0aW4yMDI2LTAyLTE2IDE3OjMxOjIwJoI3BwABGwIRMxZAa292YXNzASxpbjIwMjYtMDItMTYgMTc6MzE6MjAngjYHAAEdAhEzFtCi0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6MzE6MjAngjUHAAEdAhEzFtCi0LXQvNCwAu5pbjIwMjYtMDItMTYgMTc6MzE6MjAtgjQHAAEpAhEzFkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTc6MzE6MjAmgjMHAAEbAhEzFkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxNzozMToyMCWCMgcAARkCETMWU2VyZ2V5AfRpbjIwMjYtMDItMTYgMTc6MzE6MjAngjEHAAEdAhEzFtCi0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6MzE6MjAvgjAHAAEtAhEzFkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxNzozMToyMC2CLwcAASkCETMWQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzozMToyMC6CLgcAASkCEzMMQFJhYm90eWFnYTMwMDAGQG91dDIwMjYtMDItMTYgMTc6Mjk6MjYsgi0HAAElAhMzDEBMb3RoYXJfVWdhcgGQb3V0MjAyNi0wMi0xNiAxNzoyOToyNieCLAcAARsCEzMMQGtvdmFzcwOEb3V0MjAyNi0wMi0xNiAxNzoyOToyNiqCKwcAASECEzMM0JTQuNC80LDQvQK8b3V0MjAyNi0wMi0xNiAxNzoyOToyNi2CKgcAAScCEzMMQFNob29yYUFsaWJhcwTVb3V0MjAyNi0wMi0xNiAxNzoyOToyNjCCKQcAAS0CEzMMQEVnb3JWYWdhbm92MTExMQTOb3V0MjAyNi0wMi0xNiAxNzoyOToyNimCKAcAASECETMM0JTQuNC80LDQvQH0aW4yMDI2LTAyLTE2IDE3OjI5OjI2LYInBwABKQIRMwzQlNC80LjRgtGA0LjQuQH0aW4yMDI2LTAyLTE2IDE3OjI5OjI2JoImBwABGwIRMwxAa292YXNzAfRpbjIwMjYtMDItMTYgMTc6Mjk6MjYsgiUHAAEnAhEzDEBTaG9vcmFBbGliYXMB9GluMjAyNi0wMi0xNiAxNzoyOToyNi+CJAcAAS0CETMMQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE3OjI5OjI2L4IjBwABLQIRMwxARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTc6Mjk6MjYngiIHAAEdAhEzDNCi0LXQvNCwAfRpbjIwMjYtMDItMTYgMTc6Mjk6MjYsgiEHAAEnAhEzDEBTaG9vcmFBbGliYXMB9GluMjAyNi0wMi0xNiAxNzoyOToyNi2CIAcAASkCETMMQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoyOToyNiuCHwcAASUCETMMQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6Mjk6MjYlgh4HAAEZAhEzDFNlcmdleQH0aW4yMDI2LTAyLTE2IDE3OjI5OjI2JoIdBwABGwIRMwxAa292YXNzAfRpbjIwMjYtMDItMTYgMTc6Mjk6MjYnghwHAAEbAhMzFEBrb3Zhc3MEUW91dDIwMjYtMDItMTYgMTc6Mjk6MDEmghsHAAEZAhMzFFNlcmdleQTib3V0MjAyNi0wMi0xNiAxNzoyOTowMS6CGgcAASkCEzMU0J3QuNC60L7Qu9Cw0LkAnW91dDIwMjYtMDItMTYgMTc6Mjk6MDEsghkHAAElAhMzFEBMb3RoYXJfVWdhcgNZb3V0MjAyNi0wMi0xNiAxNzoyOTowMS6CGAcAASkCEzMUQFJhYm90eWFnYTMwMDACHG91dDIwMjYtMDItMTYgMTc6Mjk6MDEtghcHAAEnAhMzFEBTaG9vcmFBbGliYXMA8G91dDIwMjYtMDItMTYgMTc6Mjk6MDElghYHAAEZAhEzFFNlcmdleQH0aW4yMDI2LTAyLTE2IDE3OjI5OjAxJYIVBwABGQIRMxRTZXJnZXkB9GluMjAyNi0wMi0xNiAxNzoyOTowMS2CFAcAASkCETMUQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoyOTowMSaCEwcAARsCETMUQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE3OjI5OjAxJYISBwABGQIRMxRTZXJnZXkB9GluMjAyNi0wMi0xNiAxNzoyOTowMSuCEQcAASUCETMUQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6Mjk6MDEsghAHAAEnAhEzFEBTaG9vcmFBbGliYXMB9GluMjAyNi0wMi0xNiAxNzoyOTowMS2CDwcAASkCETMUQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxNzoyOTowMS2CDgcAASkCETMU0J3QuNC60L7Qu9Cw0LkB9GluMjAyNi0wMi0xNiAxNzoyOTowMSiCDQcAAR0CEzMS0KHQsNC90Y8Gfm91dDIwMjYtMDItMTYgMTc6Mjg6NDAnggwHAAEbAhMzEkBrb3Zhc3MDUm91dDIwMjYtMDItMTYgMTc6Mjg6NDAwggsHAAEtAhMzEkBFZ29yVmFnYW5vdjExMTEGQm91dDIwMjYtMDItMTYgMTc6Mjg6NDAuggoHAAEpAhMzEkBSYWJvdHlhZ2EzMDAwBORvdXQyMDI2LTAyLTE2IDE3OjI4OjQwLoIJBwABKQITMxLQlNC80LjRgtGA0LjQuQFgb3V0MjAyNi0wMi0xNiAxNzoyODo0MCmCCAcAAR8CEzMSQGxpczE5OTcxBNpvdXQyMDI2LTAyLTE2IDE3OjI4OjQwKoIHBwABIQITMxLQlNC40LzQsNC9BSVvdXQyMDI2LTAyLTE2IDE3OjI4OjQwKIIGBwABHQITMxLQotC10LzQsAoob3V0MjAyNi0wMi0xNiAxNzoyODo0MCeCBQcAAR0CETMS0KLQtdC80LAAyGluMjAyNi0wMi0xNiAxNzoyODo0MCmCBAcAASECETMS0JTQuNC80LDQvQEsaW4yMDI2LTAyLTE2IDE3OjI4OjQwKIIDBwABHwIRMxJAZXhwaWduaWsCimluMjAyNi0wMi0xNiAxNzoyODo0MC2CAgcAASkCETMSQFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxNzoyODo0MCuCAQcAASUCETMSQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTc6Mjg6NDAoggAHAAEfAhEzEkBsaXMxOTk3MQXcaW4yMDI2LTAyLTE2IDE3OjI4OjQwDQAAAFUAzQAPzg+kD3sPSA8eDu0Ovg6NDmMOMw4DDdUNrA17DVANHwzwDMcMmAxnDDYMDAvdC6wLgQtQCyYK9grMCp4KdApLCh0J9AnKCaAJbgk/CQwI4gizCIgIXggyCAYH1getB30HTwcdBvMGygaYBmgGOgYPBeYFtgWLBV4FMQUGBNMEogRxBEIEFwPtA70DkwNqAzgDCgLfAqgCfQJSAiAB9gHEAZEBYAE1AP0AzQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2DRAcAASkCETMnQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxODo1NTo1MzWDQwcAATcCEzMm0JLQuNGC0LDQu9C40Lou0L3QvtCyCHpvdXQyMDI2LTAyLTE2IDE4OjU0OjQzKINCBwABHQITMybQodCw0L3RjwEsb3V0MjAyNi0wMi0xNiAxODo1NDo0My6DQQcAASkCEzMmQFJhYm90eWFnYTMwMDACMG91dDIwMjYtMDItMTYgMTg6NTQ6NDMwg0AHAAEtAhMzJkBFZ29yVmFnYW5vdjExMTEC5G91dDIwMjYtMDItMTYgMTg6NTQ6NDMvgz8HAAEtAhEzJkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODo1NDo0MyeDPgcAAR0CETMm0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxODo1NDo0My+DPQcAAS0CETMmQEVnb3JWYWdhbm92MTExMQD6aW4yMDI2LTAyLTE2IDE4OjU0OjQzKIM8BwABHwIRMyZAZXhwaWduaWsBLGluMjAyNi0wMi0xNiAxODo1NDo0MyiDOwcAAR8CETMmQGV4cGlnbmlrASxpbjIwMjYtMDItMTYgMTg6NTQ6NDM0gzoHAAE3AhEzJtCS0LjRgtCw0LvQuNC6LtC90L7QsgH0aW4yMDI2LTAyLTE2IDE4OjU0OjQzKIM5BwABHwIRMyZAZXhwaWduaWsBLGluMjAyNi0wMi0xNiAxODo1NDo0MyuDOAcAASUCETMmQExvdGhhcl9VZ2FyASxpbjIwMjYtMDItMTYgMTg6NTQ6NDMvgzcHAAEtAhEzJkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODo1NDo0MyaDNgcAARsCETMmQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjU0OjQzJ4M1BwABHQIRMybQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE4OjU0OjQzLYM0BwABKQIRMyZAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE4OjU0OjQzJ4MzBwABGwITMyRAa292YXNzBOdvdXQyMDI2LTAyLTE2IDE4OjEwOjM0KIMyBwABHQITMyTQodCw0L3RjwQDb3V0MjAyNi0wMi0xNiAxODoxMDozNCyDMQcAASUCEzMkQExvdGhhcl9VZ2FyAnZvdXQyMDI2LTAyLTE2IDE4OjEwOjM0LoMwBwABKQITMyTQlNC80LjRgtGA0LjQuQMCb3V0MjAyNi0wMi0xNiAxODoxMDozNC6DLwcAASkCEzMkQFJhYm90eWFnYTMwMDADmm91dDIwMjYtMDItMTYgMTg6MTA6MzQwgy4HAAEtAhMzJEBFZ29yVmFnYW5vdjExMTECI291dDIwMjYtMDItMTYgMTg6MTA6MzQogy0HAAEdAhMzJEBQcjBrc2lpA3BvdXQyMDI2LTAyLTE2IDE4OjEwOjM0KoMsBwABIQITMyRAZm9taWNoZWV2B1VvdXQyMDI2LTAyLTE2IDE4OjEwOjM0KoMrBwABIQITMyTQktCw0YHQtdC6BOJvdXQyMDI2LTAyLTE2IDE4OjEwOjM0KIMqBwABHwIRMyRAbGlzMTk5NzED6GluMjAyNi0wMi0xNiAxODoxMDozNC2DKQcAASkCETMk0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMi0xNiAxODoxMDozNCaDKAcAARsCETMkQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjEwOjM0KIMnBwABHwIRMyRAbGlzMTk5NzED6GluMjAyNi0wMi0xNiAxODoxMDozNCuDJgcAASUCETMkQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTg6MTA6MzQtgyUHAAEpAhEzJEBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTg6MTA6MzQvgyQHAAEtAhEzJEBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODoxMDozNCaDIwcAARsCETMkQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjEwOjM0J4MiBwABHQIRMyTQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE4OjEwOjM0L4MhBwABLQIRMyRARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTg6MTA6MzQrgyAHAAElAhEzJNCh0LXRgNGR0LPQsAH0aW4yMDI2LTAyLTE2IDE4OjEwOjM0LYMfBwABKQIRMyRAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE4OjEwOjM0JoMeBwABGwIRMyRAa292YXNzASxpbjIwMjYtMDItMTYgMTg6MTA6MzQtgx0HAAEpAhEzJNCU0LzQuNGC0YDQuNC5AfRpbjIwMjYtMDItMTYgMTg6MTA6MzQpgxwHAAEhAhEzJNCS0LDRgdC10LoB9GluMjAyNi0wMi0xNiAxODoxMDozNCmDGwcAASECETMkQGZvbWljaGVldgH0aW4yMDI2LTAyLTE2IDE4OjEwOjM0J4MaBwABHQIRMyRAUHIwa3NpaQPoaW4yMDI2LTAyLTE2IDE4OjEwOjM0KIJ/BwABHQITMyDQodCw0L3RjwK8b3V0MjAyNi0wMi0xNiAxODowNToyMSyCfgcAASUCEzMgQExvdGhhcl9VZ2FyBL9vdXQyMDI2LTAyLTE2IDE4OjA1OjIxJ4J9BwABGwITMyBAa292YXNzAu5vdXQyMDI2LTAyLTE2IDE4OjA1OjIxMIJ8BwABLQITMyBARWdvclZhZ2Fub3YxMTExBC5vdXQyMDI2LTAyLTE2IDE4OjA1OjIxLIJ7BwABJQITMyDQodC10YDQs9C10LkDXG91dDIwMjYtMDItMTYgMTg6MDU6MjEvgnoHAAEtAhEzIEBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODowNToyMSeCeQcAAR0CETMg0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxODowNToyMSeCeAcAAR0CETMg0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxODowNToyMSaCdwcAARsCETMgQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjA1OjIxK4J2BwABJQIRMyDQodC10YDQs9C10LkB9GluMjAyNi0wMi0xNiAxODowNToyMSaCdQcAARsCETMgQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjA1OjIxJ4J0BwABHQIRMyDQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE4OjA1OjIxK4JzBwABJQIRMyBATG90aGFyX1VnYXIB9GluMjAyNi0wMi0xNiAxODowNToyMSeCcgcAAR0CETMg0KLQtdC80LAB9GluMjAyNi0wMi0xNiAxODowNToyMS2CcQcAASkCETMgQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxODowNToyMSeCcAcAARsCEzMfQGtvdmFzcwHvb3V0MjAyNi0wMi0xNiAxODowMzo1Ni6CbwcAASkCEzMfQFJhYm90eWFnYTMwMDAD7W91dDIwMjYtMDItMTYgMTg6MDM6NTYogm4HAAEdAhMzH9Ci0LXQvNCwBlBvdXQyMDI2LTAyLTE2IDE4OjAzOjU2LoJtBwABKQITMx/QlNC80LjRgtGA0LjQuQFKb3V0MjAyNi0wMi0xNiAxODowMzo1NiyCbAcAASUCEzMfQExvdGhhcl9VZ2FyASJvdXQyMDI2LTAyLTE2IDE4OjAzOjU2J4JrBwABGwITMx5Aa292YXNzAhlvdXQyMDI2LTAyLTE2IDE4OjAzOjE2LoJqBwABKQITMx5AUmFib3R5YWdhMzAwMAcZb3V0MjAyNi0wMi0xNiAxODowMzoxNi6CaQcAASkCEzMe0J3QuNC60L7Qu9Cw0LkAtm91dDIwMjYtMDItMTYgMTg6MDM6MTYsgmgHAAElAhMzHkBMb3RoYXJfVWdhcgNNb3V0MjAyNi0wMi0xNiAxODowMzoxNiaCZwcAARkCEzMeU2VyZ2V5AaFvdXQyMDI2LTAyLTE2IDE4OjAzOjE2LIJmBwABJQITMx1ATG90aGFyX1VnYXICdm91dDIwMjYtMDItMTYgMTg6MDE6MTkugmUHAAEpAhMzHdCU0LzQuNGC0YDQuNC5Aw5vdXQyMDI2LTAyLTE2IDE4OjAxOjE5KIJkBwABHQITMx3QodCw0L3RjwCxb3V0MjAyNi0wMi0xNiAxODowMToxOS6CYwcAASkCEzMdQFJhYm90eWFnYTMwMDAB1m91dDIwMjYtMDItMTYgMTg6MDE6MTkmgmIHAAEbAhEzHUBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxODowMToxOSuCYQcAASUCETMdQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTg6MDE6MTktgmAHAAEpAhEzHUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTg6MDE6MTktgl8HAAEpAhEzHdCU0LzQuNGC0YDQuNC5AfRpbjIwMjYtMDItMTYgMTg6MDE6MTkngl4HAAEdAhEzHdCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTg6MDE6MTkugl0HAAEpAhMzG9Cd0LjQutC+0LvQsNC5A/dvdXQyMDI2LTAyLTE2IDE3OjM4OjA2LIJcBwABJQITMxtATG90aGFyX1VnYXIDs291dDIwMjYtMDItMTYgMTc6Mzg6MDYuglsHAAEpAhMzG0BSYWJvdHlhZ2EzMDAwBp9vdXQyMDI2LTAyLTE2IDE3OjM4OjA2J4JaBwABGwITMxtAa292YXNzAXxvdXQyMDI2LTAyLTE2IDE3OjM4OjA2MIJZBwABLQITMxtARWdvclZhZ2Fub3YxMTExAIdvdXQyMDI2LTAyLTE2IDE3OjM4OjA2JoJYBwABGQITMxtTZXJnZXkC+m91dDIwMjYtMDItMTYgMTc6Mzg6MDYnglcHAAEdAhEzG9Ch0LDQvdGPAcJpbjIwMjYtMDItMTYgMTc6Mzg6MDYvglYHAAEtAhEzG0BFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxNzozODowNg0AAABUANYAD9YPrQ+CD1APFQ7pDr8OlA5qDkEOGA3sDboNjg1iDS8M8wzCDJgMaAw4DA8L5QuzC4ULXAsrCwEK0gqnCnQKRAoaCfEJwwmTCWUJNwkGCNwIsQh6CFEIJQf7B88HnwdzB0UHGQbnBrAGggZUBiIF9AXCBZIFZgU6BQ4E4QS0BIUEWwQjA/gDxwOUA2oDMwMDAtECqAJ4AkkCEgHoAb8BlgFmATYBBgDWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAthBgHAAEpAhEzK0BSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTg6NTk6MTIthBcHAAEpAhEzK0BSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTg6NTk6MTIthBYHAAEpAhEzK9Cd0LDQt9Cw0YDQuNC6AfRpbjIwMjYtMDItMTYgMTg6NTk6MTIthBUHAAEpAhEzK9Cd0LDQt9Cw0YDQuNC6ASxpbjIwMjYtMDItMTYgMTg6NTk6MTImhBQHAAEbAhEzK0Brb3Zhc3MBLGluMjAyNi0wMi0xNiAxODo1OToxMiaEEwcAARsCETMrQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjU5OjExJ4QSBwABHQIRMyvQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE4OjU5OjExNIQRBwABNwIRMyvQktC40YLQsNC70LjQui7QvdC+0LIBLGluMjAyNi0wMi0xNiAxODo1OToxMSyEEAcAAScCETMrQFNob29yYUFsaWJhcwH0aW4yMDI2LTAyLTE2IDE4OjU5OjExLYQPBwABKQIRMytAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE4OjU5OjExJoQOBwABGwIRMytAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTk6MTEvhA0HAAEtAhEzK0BFZ29yVmFnYW5vdjExMTEBLGluMjAyNi0wMi0xNiAxODo1OToxMS2EDAcAASkCETMr0J3QsNC30LDRgNC40LoB9GluMjAyNi0wMi0xNiAxODo1OToxMTSECwcAATcCETMr0JLQuNGC0LDQu9C40Lou0L3QvtCyAfRpbjIwMjYtMDItMTYgMTg6NTk6MTEnhAoHAAEdAhEzK9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTg6NTk6MTEwhAkHAAEtAhMzKkBFZ29yVmFnYW5vdjExMTEFFG91dDIwMjYtMDItMTYgMTg6NTg6MzIuhAgHAAEpAhMzKkBSYWJvdHlhZ2EzMDAwBx5vdXQyMDI2LTAyLTE2IDE4OjU4OjMyKIQHBwABHQITMypAUHIwa3NpaQDmb3V0MjAyNi0wMi0xNiAxODo1ODozMjWEBgcAATcCEzMq0JLQuNGC0LDQu9C40Lou0L3QvtCyBYxvdXQyMDI2LTAyLTE2IDE4OjU4OjMyJ4QFBwABGwITMypAa292YXNzA15vdXQyMDI2LTAyLTE2IDE4OjU4OjMyLIQEBwABJQITMyrQodC10YDQs9C10LkDhG91dDIwMjYtMDItMTYgMTg6NTg6MzIqhAMHAAEhAhMzKkBmb21pY2hlZXYCJm91dDIwMjYtMDItMTYgMTg6NTg6MzIqhAIHAAEhAhMzKtCS0LDRgdC10LoHDW91dDIwMjYtMDItMTYgMTg6NTg6MzIphAEHAAEhAhEzKkBCZXp5bW5vX1YBLGluMjAyNi0wMi0xNiAxODo1ODozMimEAAcAASECETMqQEJlenltbm9fVgH0aW4yMDI2LTAyLTE2IDE4OjU4OjMyKYN/BwABIQIRMyrQqNGD0YDQuNC6A+hpbjIwMjYtMDItMTYgMTg6NTg6MzItg34HAAEpAhEzKkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTg6NTg6MzIvg30HAAEtAhEzKkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODo1ODozMiuDfAcAASUCETMq0J3QuNC60LjRgtCwAJZpbjIwMjYtMDItMTYgMTg6NTg6MzIvg3sHAAEtAhEzKkBFZ29yVmFnYW5vdjExMTEBLGluMjAyNi0wMi0xNiAxODo1ODozMiuDegcAASUCETMq0J3QuNC60LjRgtCwASxpbjIwMjYtMDItMTYgMTg6NTg6MzIrg3kHAAElAhEzKtCd0LjQutC40YLQsAEsaW4yMDI2LTAyLTE2IDE4OjU4OjMyNIN4BwABNwIRMyrQktC40YLQsNC70LjQui7QvdC+0LIBLGluMjAyNi0wMi0xNiAxODo1ODozMi+DdwcAAS0CETMqQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE4OjU4OjMyKYN2BwABIQIRMypAZm9taWNoZWV2ASxpbjIwMjYtMDItMTYgMTg6NTg6MzIrg3UHAAElAhEzKtCh0LXRgNCz0LXQuQEsaW4yMDI2LTAyLTE2IDE4OjU4OjMyKYN0BwABIQIRMypAZm9taWNoZWV2ASxpbjIwMjYtMDItMTYgMTg6NTg6MzItg3MHAAEpAhEzKkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTg6NTg6MzIpg3IHAAEhAhEzKtCS0LDRgdC10LoB9GluMjAyNi0wMi0xNiAxODo1ODozMieDcQcAAR0CETMqQFByMGtzaWkD6GluMjAyNi0wMi0xNiAxODo1ODozMimDcAcAASECETMq0KjRg9GA0LjQugPoaW4yMDI2LTAyLTE2IDE4OjU4OjMyJoNvBwABGwIRMypAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTg6MzI0g24HAAE3AhEzKtCS0LjRgtCw0LvQuNC6LtC90L7QsgH0aW4yMDI2LTAyLTE2IDE4OjU4OjMyKINtBwABHQITMynQodCw0L3RjwLGb3V0MjAyNi0wMi0xNiAxODo1NzoyMSeDbAcAARsCEzMpQGtvdmFzcwQmb3V0MjAyNi0wMi0xNiAxODo1NzoyMS6DawcAASkCEzMpQFJhYm90eWFnYTMwMDACXW91dDIwMjYtMDItMTYgMTg6NTc6MjErg2oHAAElAhEzKUBMb3RoYXJfVWdhcgEsaW4yMDI2LTAyLTE2IDE4OjU3OjIxK4NpBwABJQIRMylATG90aGFyX1VnYXIBLGluMjAyNi0wMi0xNiAxODo1NzoyMS2DaAcAASkCETMpQFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxODo1NzoyMSuDZwcAASUCETMpQExvdGhhcl9VZ2FyASxpbjIwMjYtMDItMTYgMTg6NTc6MjEmg2YHAAEbAhEzKUBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxODo1NzoyMSeDZQcAAR0CETMp0KHQsNC90Y8BwmluMjAyNi0wMi0xNiAxODo1NzoyMS2DZAcAASkCETMpQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxODo1NzoyMTCDYwcAAS0CEzMoQEVnb3JWYWdhbm92MTExMQFqb3V0MjAyNi0wMi0xNiAxODo1NjozNSiDYgcAAR0CEzMo0KHQsNC90Y8DEW91dDIwMjYtMDItMTYgMTg6NTY6MzUsg2EHAAElAhMzKEBMb3RoYXJfVWdhcgMnb3V0MjAyNi0wMi0xNiAxODo1NjozNSeDYAcAARsCEzMoQGtvdmFzcwHJb3V0MjAyNi0wMi0xNiAxODo1NjozNS6DXwcAASkCEzMoQFJhYm90eWFnYTMwMDACMm91dDIwMjYtMDItMTYgMTg6NTY6MzUmg14HAAEbAhEzKEBrb3Zhc3MB9GluMjAyNi0wMi0xNiAxODo1NjozNSuDXQcAASUCETMoQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMTYgMTg6NTY6MzUvg1wHAAEtAhEzKEBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODo1NjozNSeDWwcAAR0CETMo0KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxODo1NjozNSaDWgcAARsCETMoQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE4OjU2OjM1LYNZBwABKQIRMyjQlNC80LjRgtGA0LjQuQH0aW4yMDI2LTAyLTE2IDE4OjU2OjM1LYNYBwABKQIRMyhAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE4OjU2OjM1J4NXBwABGwITMydAa292YXNzBUtvdXQyMDI2LTAyLTE2IDE4OjU1OjUzLoNWBwABKQITMydAUmFib3R5YWdhMzAwMAZCb3V0MjAyNi0wMi0xNiAxODo1NTo1MzmDVQcAAT8CEzMn0KHQsNC90ZHQuiDQk9C+0LPQvtC70LXQsgMOb3V0MjAyNi0wMi0xNiAxODo1NTo1MzCDVAcAAS0CEzMnQEVnb3JWYWdhbm92MTExMQIcb3V0MjAyNi0wMi0xNiAxODo1NTo1MymDUwcAAR8CEzMnQGV4cGlnbmlrAdZvdXQyMDI2LTAyLTE2IDE4OjU1OjUzKYNSBwABIQIRMyfQkNGA0YLQtdC8ASxpbjIwMjYtMDItMTYgMTg6NTU6NTMvg1EHAAEtAhEzJ0BFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxODo1NTo1MymDUAcAASECETMn0JTQuNC80LDQvQH0aW4yMDI2LTAyLTE2IDE4OjU1OjUzJoNPBwABGwIRMydAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTU6NTMmg04HAAEdAREzJ9Ch0LDQvdGPMmluMjAyNi0wMi0xNiAxODo1NTo1MyeDTQcAAR0CETMn0KHQsNC90Y8AlmluMjAyNi0wMi0xNiAxODo1NTo1MyiDTAcAAR8CETMnQGV4cGlnbmlrASxpbjIwMjYtMDItMTYgMTg6NTU6NTMng0sHAAEdAhEzJ9Ch0LDQvdGPAMhpbjIwMjYtMDItMTYgMTg6NTU6NTMpg0oHAAEhAhEzJ9CQ0YDRgtC10LwB9GluMjAyNi0wMi0xNiAxODo1NTo1MziDSQcAAT8CETMn0KHQsNC90ZHQuiDQk9C+0LPQvtC70LXQsgEsaW4yMDI2LTAyLTE2IDE4OjU1OjUzL4NIBwABLQIRMydARWdvclZhZ2Fub3YxMTExASxpbjIwMjYtMDItMTYgMTg6NTU6NTMog0cHAAEfAhEzJ0BleHBpZ25pawEsaW4yMDI2LTAyLTE2IDE4OjU1OjUzJoNGBwABGwIRMydAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTU6NTMng0UHAAEdAhEzJ9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTg6NTU6NTMNAAAAVQDLAA/WD54PdA9EDxEO5g64DowOXA4xDggN3A2wDYcNXQ0vDP8M1QyrDIEMVAwnC/YLzAugC24LNwsOCt4KrgqCClcKLAoDCdcJrQl9CVEJGgjqCLMIgwhaCDEH/gfSB6gHcAc/Bw4G5Qa5Bo8GXwYxBgMF2AWuBYAFSwUbBPAExwSeBHMESgQeA+wDwQOMA2EDNQMFAtoCqQJ6AkQCEQHgAbUBiAFXAS0A+wDLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2EbQcAASkCETMvQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxOTowNDowNi+EbAcAAS0CETMvQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE5OjA0OjA2J4RrBwABHQIRMy/QodCw0L3RjwJYaW4yMDI2LTAyLTE2IDE5OjA0OjA2LoRqBwABKQITMy7QktC40YLQsNC70LjQuQyjb3V0MjAyNi0wMi0xNiAxOTowMjoyNiqEaQcAASECEzMuQGZvbWljaGVldgWTb3V0MjAyNi0wMi0xNiAxOTowMjoyNiiEaAcAAR0CEzMuQFByMGtzaWkEUW91dDIwMjYtMDItMTYgMTk6MDI6MjYuhGcHAAEpAhMzLkBSYWJvdHlhZ2EzMDAwAdNvdXQyMDI2LTAyLTE2IDE5OjAyOjI2MIRmBwABLQITMy5ARWdvclZhZ2Fub3YxMTExBDhvdXQyMDI2LTAyLTE2IDE5OjAyOjI2M4RlBwABMwITMy5AZG1pdHJ5X2VmcmVtb3Y2OTk2BLBvdXQyMDI2LTAyLTE2IDE5OjAyOjI2LIRkBwABJQITMy7QndC40LrQuNGC0LAHeG91dDIwMjYtMDItMTYgMTk6MDI6MjYuhGMHAAEpAhMzLtCS0LjRgtCw0LvQuNC6AmxvdXQyMDI2LTAyLTE2IDE5OjAyOjI2KIRiBwABHwIRMy5AbGlzMTk5NzcD6GluMjAyNi0wMi0xNiAxOTowMjoyNi2EYQcAASkCETMu0JLQuNGC0LDQu9C40LkD6GluMjAyNi0wMi0xNiAxOTowMjoyNimEYAcAASECETMu0JLQsNGB0LXQugEsaW4yMDI2LTAyLTE2IDE5OjAyOjI2KIRfBwABHwIRMy5AbGlzMTk5NzcEsGluMjAyNi0wMi0xNiAxOTowMjoyNjKEXgcAATMCETMuQGRtaXRyeV9lZnJlbW92Njk5NgJYaW4yMDI2LTAyLTE2IDE5OjAyOjI2KIRdBwABHwIRMy5AbGlzMTk5NzcEsGluMjAyNi0wMi0xNiAxOTowMjoyNi+EXAcAAS0CETMuQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE5OjAyOjI2KYRbBwABIQIRMy5AZm9taWNoZWV2AfRpbjIwMjYtMDItMTYgMTk6MDI6MjYmhFoHAAEbAhEzLkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowMjoyNiiEWQcAAR8CETMuQGxpczE5OTc3BLBpbjIwMjYtMDItMTYgMTk6MDI6MjYmhFgHAAEbAhEzLkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowMjoyNiaEVwcAARsCETMuQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjAyOjI2KIRWBwABHwIRMy5AbGlzMTk5NzcD6GluMjAyNi0wMi0xNiAxOTowMjoyNi2EVQcAASkCETMuQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0xNiAxOTowMjoyNjKEVAcAATMCETMuQGRtaXRyeV9lZnJlbW92Njk5NgJYaW4yMDI2LTAyLTE2IDE5OjAyOjI2K4RTBwABJQIRMy7QndC40LrQuNGC0LABLGluMjAyNi0wMi0xNiAxOTowMjoyNieEUgcAAR0CETMuQFByMGtzaWkB9GluMjAyNi0wMi0xNiAxOTowMjoyNiiEUQcAAR8CETMuQGxpczE5OTc3AlhpbjIwMjYtMDItMTYgMTk6MDI6MjUrhFAHAAElAhEzLkBBbnRvblNpbGFldgJYaW4yMDI2LTAyLTE2IDE5OjAyOjI1K4RPBwABJQIRMy5AQW50b25TaWxhZXYCWGluMjAyNi0wMi0xNiAxOTowMjoyNS2ETgcAASkCETMu0JLQuNGC0LDQu9C40LoCWGluMjAyNi0wMi0xNiAxOTowMjoyNSeETQcAAR0CETMu0JjQu9GM0Y8BLGluMjAyNi0wMi0xNiAxOTowMjoyNSmETAcAASECETMuQGZvbWljaGVldgEsaW4yMDI2LTAyLTE2IDE5OjAyOjI1JoRLBwABGwIRMy5Aa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDI6MjUuhEoHAAEpAhMzLUBSYWJvdHlhZ2EzMDAwBjtvdXQyMDI2LTAyLTE2IDE5OjAwOjQ0LoRJBwABKQITMy3QlNC80LjRgtGA0LjQuQFtb3V0MjAyNi0wMi0xNiAxOTowMDo0NDWESAcAATcCEzMt0JLQuNGC0LDQu9C40Lou0L3QvtCyCmlvdXQyMDI2LTAyLTE2IDE5OjAwOjQ0J4RHBwABGwITMy1Aa292YXNzASxvdXQyMDI2LTAyLTE2IDE5OjAwOjQ0KYRGBwABHwITMy1AbGlzMTk5NzcGAW91dDIwMjYtMDItMTYgMTk6MDA6NDQwhEUHAAEtAhMzLUBFZ29yVmFnYW5vdjExMTEB0W91dDIwMjYtMDItMTYgMTk6MDA6NDQmhEQHAAEbAhEzLUBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowMDo0NCaEQwcAARsCETMtQGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjAwOjQ0LYRCBwABKQIRMy3QlNC80LjRgtGA0LjQuQEsaW4yMDI2LTAyLTE2IDE5OjAwOjQ0NIRBBwABNwIRMy3QktC40YLQsNC70LjQui7QvdC+0LIB9GluMjAyNi0wMi0xNiAxOTowMDo0NC2EQAcAASkCETMt0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxOTowMDo0NDSEPwcAATcCETMt0JLQuNGC0LDQu9C40Lou0L3QvtCyAfRpbjIwMjYtMDItMTYgMTk6MDA6NDQphD4HAAEhAhEzLUBCZXp5bW5vX1YB9GluMjAyNi0wMi0xNiAxOTowMDo0NC2EPQcAASkCETMt0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxOTowMDo0NCeEPAcAAR0CETMtQFByMGtzaWkB9GluMjAyNi0wMi0xNiAxOTowMDo0NCmEOwcAASECETMtQEJlenltbm9fVgH0aW4yMDI2LTAyLTE2IDE5OjAwOjQ0JoQ6BwABGwIRMy1Aa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDA6NDQohDkHAAEfAhEzLUBsaXMxOTk3NwJYaW4yMDI2LTAyLTE2IDE5OjAwOjQ0KIQ4BwABHwIRMy1AbGlzMTk5NzcCWGluMjAyNi0wMi0xNiAxOTowMDo0NCmENwcAASECETMtQEJlenltbm9fVgH0aW4yMDI2LTAyLTE2IDE5OjAwOjQ0LYQ2BwABKQIRMy1AUmFib3R5YWdhMzAwMAEsaW4yMDI2LTAyLTE2IDE5OjAwOjQ0LYQ1BwABKQIRMy3QlNC80LjRgtGA0LjQuQEsaW4yMDI2LTAyLTE2IDE5OjAwOjQ0JoQ0BwABGwIRMy1Aa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDA6NDQ0hDMHAAE3AhEzLdCS0LjRgtCw0LvQuNC6LtC90L7QsgH0aW4yMDI2LTAyLTE2IDE5OjAwOjQ0L4QyBwABLQIRMy1ARWdvclZhZ2Fub3YxMTExASxpbjIwMjYtMDItMTYgMTk6MDA6NDQphDEHAAEfAhMzLEBsaXMxOTk3MQ5Hb3V0MjAyNi0wMi0xNiAxODo1OTo1NSeEMAcAARsCEzMsQGtvdmFzcwP5b3V0MjAyNi0wMi0xNiAxODo1OTo1NS6ELwcAASkCEzMsQFJhYm90eWFnYTMwMDABkm91dDIwMjYtMDItMTYgMTg6NTk6NTUqhC4HAAEhAhMzLNCS0LDRgdC10LoCfW91dDIwMjYtMDItMTYgMTg6NTk6NTUqhC0HAAEhAhMzLEBmb21pY2hlZXYA8G91dDIwMjYtMDItMTYgMTg6NTk6NTUnhCwHAAEdAhEzLNCh0LDQvdGPAPppbjIwMjYtMDItMTYgMTg6NTk6NTUnhCsHAAEdAhEzLNCh0LDQvdGPAlhpbjIwMjYtMDItMTYgMTg6NTk6NTUnhCoHAAEdAhEzLNCb0LXRhdCwASxpbjIwMjYtMDItMTYgMTg6NTk6NTUthCkHAAEpAhEzLEBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTg6NTk6NTUrhCgHAAElAhEzLNCd0LjQutC40YLQsAEsaW4yMDI2LTAyLTE2IDE4OjU5OjU1J4QnBwABHQIRMyxAUHIwa3NpaQH0aW4yMDI2LTAyLTE2IDE4OjU5OjU1JoQmBwABGwIRMyxAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTk6NTUphCUHAAEhAhEzLNCS0LDRgdC10LoB9GluMjAyNi0wMi0xNiAxODo1OTo1NSmEJAcAASECETMs0JTQuNC80LDQvQEsaW4yMDI2LTAyLTE2IDE4OjU5OjU1JoQjBwABGwIRMyxAa292YXNzASxpbjIwMjYtMDItMTYgMTg6NTk6NTUohCIHAAEfAhEzLEBsaXMxOTk3MQPoaW4yMDI2LTAyLTE2IDE4OjU5OjU1LYQhBwABKQIRMyxAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE4OjU5OjU1KYQgBwABIQIRMyxAZm9taWNoZWV2ASxpbjIwMjYtMDItMTYgMTg6NTk6NTUrhB8HAAElAhEzLNCd0LjQutC40YLQsAEsaW4yMDI2LTAyLTE2IDE4OjU5OjU1KIQeBwABHQITMyvQodCw0L3RjwSFb3V0MjAyNi0wMi0xNiAxODo1OToxMjCEHQcAAS0CEzMrQEVnb3JWYWdhbm92MTExMQR0b3V0MjAyNi0wMi0xNiAxODo1OToxMi2EHAcAAScCEzMrQFNob29yYUFsaWJhcwHdb3V0MjAyNi0wMi0xNiAxODo1OToxMieEGwcAARsCEzMrQGtvdmFzcwQDb3V0MjAyNi0wMi0xNiAxODo1OToxMjWEGgcAATcCEzMr0JLQuNGC0LDQu9C40Lou0L3QvtCyB19vdXQyMDI2LTAyLTE2IDE4OjU5OjEyJ4QZBwABHQIRMyvQodCw0L3RjwK8aW4yMDI2LTAyLTE2IDE4OjU5OjEyDQAAAEgDNwAP1g+oD3wPTg8iDvYOzQ6dDm0OQQ4TDeENrw2EDVENJgz8DNEMowx3DE4MHgvsC7wLkgtoCzwLEgrmCrwKkApkCjQKCgnaCaoJgAlWCSUI9AjJCJwIawg4CA4H5Qe1B34HVAckBvIGyAaYBmgGMQYHBd4FtAWBBUkFIAT1BMQEmgRoBDwEEwPjA7kDjQNhAzcDDgLeAq4CggJYAiwCAAHRAaIBcwFEARUA4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADCFQgcAAS0CEzMyQEVnb3JWYWdhbm92MTExMQPHb3V0MjAyNi0wMi0xNiAxOTowNzoyMCyFQQcAASkBETMy0JLQsNGB0LjQu9C40LlkaW4yMDI2LTAyLTE2IDE5OjA3OjIwLIVABwABKQERMzLQktCw0YHQuNC70LjQuWRpbjIwMjYtMDItMTYgMTk6MDc6MjAshT8HAAEpAREzMtCS0LDRgdC40LvQuNC5ZGluMjAyNi0wMi0xNiAxOTowNzoyMCyFPgcAASkBETMy0JLQsNGB0LjQu9C40LlkaW4yMDI2LTAyLTE2IDE5OjA3OjIwLIU9BwABKQERMzLQktCw0YHQuNC70LjQuWRpbjIwMjYtMDItMTYgMTk6MDc6MjAphTwHAAEhAhEzMtCo0YPRgNC40LoBLGluMjAyNi0wMi0xNiAxOTowNzoyMCmFOwcAASECETMy0JTQuNC80LDQvQEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwJ4U6BwABHQIRMzLQktCw0YHRjwEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwKYU5BwABIQIRMzLQlNC40LzQsNC9ASxpbjIwMjYtMDItMTYgMTk6MDc6MjAthTgHAAEpAhEzMkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTk6MDc6MjAthTcHAAEpAhEzMkBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTk6MDc6MjAmhTYHAAEbAhEzMkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowNzoyMCeFNQcAAR0CETMyQFByMGtzaWkBLGluMjAyNi0wMi0xNiAxOTowNzoyMCmFNAcAASECETMy0JTQuNC80LDQvQEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwKYUzBwABIQIRMzLQqNGD0YDQuNC6ASxpbjIwMjYtMDItMTYgMTk6MDc6MjAnhTIHAAEdAhEzMtCS0LDRgdGPASxpbjIwMjYtMDItMTYgMTk6MDc6MjAthTEHAAEpAhEzMkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTk6MDc6MjAmhTAHAAEbAhEzMkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowNzoyMCmFLwcAASECETMyQGZvbWljaGVldgEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwL4UuBwABLQIRMzJARWdvclZhZ2Fub3YxMTExASxpbjIwMjYtMDItMTYgMTk6MDc6MjAnhS0HAAEdAhEzMkBQcjBrc2lpASxpbjIwMjYtMDItMTYgMTk6MDc6MjAuhSwHAAEpAhMzMUBSYWJvdHlhZ2EzMDAwBPtvdXQyMDI2LTAyLTE2IDE5OjA2OjI1KIUrBwABHQITMzHQotC10LzQsAN6b3V0MjAyNi0wMi0xNiAxOTowNjoyNSaFKgcAARsBEzMxQGtvdmFzc3NvdXQyMDI2LTAyLTE2IDE5OjA2OjI1NYUpBwABNwITMzHQktC40YLQsNC70LjQui7QvdC+0LICU291dDIwMjYtMDItMTYgMTk6MDY6MjUwhSgHAAEtAhMzMUBFZ29yVmFnYW5vdjExMTEKD291dDIwMjYtMDItMTYgMTk6MDY6MjUnhScHAAEdAhEzMdCh0LDQvdGPAoppbjIwMjYtMDItMTYgMTk6MDY6MjUmhSYHAAEbAhEzMUBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowNjoyNSeFJQcAAR0CETMx0KLQtdC80LABLGluMjAyNi0wMi0xNiAxOTowNjoyNTSFJAcAATcCETMx0JLQuNGC0LDQu9C40Lou0L3QvtCyAfRpbjIwMjYtMDItMTYgMTk6MDY6MjUthSMHAAEpAhEzMdCU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MDY6MjUthSIHAAEpAhEzMdCU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MDY6MjUnhSEHAAEdAhEzMdCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDY6MjUvhSAHAAEtAhEzMUBFZ29yVmFnYW5vdjExMTEBLGluMjAyNi0wMi0xNiAxOTowNjoyNS2FHwcAASkCETMx0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxOTowNjoyNSeFHgcAAR0CETMx0KLQtdC80LABLGluMjAyNi0wMi0xNiAxOTowNjoyNTSFHQcAATcCETMx0JLQuNGC0LDQu9C40Lou0L3QvtCyAZBpbjIwMjYtMDItMTYgMTk6MDY6MjUthRwHAAEpAhEzMUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMTYgMTk6MDY6MjUmhRsHAAEbAhEzMUBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowNjoyNSeFGgcAAR0CETMx0KHQsNC90Y8BLGluMjAyNi0wMi0xNiAxOTowNjoyNTCFGQcAAS0CEzMwQEVnb3JWYWdhbm92MTExMQZ3b3V0MjAyNi0wMi0xNiAxOTowNDo1NC6FGAcAASkCEzMwQFJhYm90eWFnYTMwMDAGrm91dDIwMjYtMDItMTYgMTk6MDQ6NTQqhRcHAAEhAhMzMEBmb21pY2hlZXYEFW91dDIwMjYtMDItMTYgMTk6MDQ6NTQohRYHAAEdAhMzMEBQcjBrc2lpBupvdXQyMDI2LTAyLTE2IDE5OjA0OjU0LoUVBwABKQITMzDQndC40LrQuNGC0L7RgQWvb3V0MjAyNi0wMi0xNiAxOTowNDo1NC6FFAcAASkCEzMw0JTQvNC40YLRgNC40LkEmW91dDIwMjYtMDItMTYgMTk6MDQ6NTQnhRMHAAEdAhEzMNCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDQ6NTQnhRIHAAEdAhEzMNCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDQ6NTQthREHAAEpAhEzMNCU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQthRAHAAEpAhEzMNCd0LjQutC+0LvQsNC5ASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQnhQ8HAAEdAhEzMNCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDQ6NTQthQ4HAAEpAhEzMNCd0LjQutC40YLQvtGBASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQphQ0HAAEhAhEzMNCo0YPRgNC40LoCWGluMjAyNi0wMi0xNiAxOTowNDo1NCmFDAcAASECETMw0KjRg9GA0LjQugJYaW4yMDI2LTAyLTE2IDE5OjA0OjU0J4ULBwABHQIRMzDQodCw0L3RjwEsaW4yMDI2LTAyLTE2IDE5OjA0OjU0KYUKBwABIQIRMzDQqNGD0YDQuNC6AlhpbjIwMjYtMDItMTYgMTk6MDQ6NTQnhQkHAAEdAhEzMEBQcjBrc2lpASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQphQgHAAEhAhEzMNCo0YPRgNC40LoCWGluMjAyNi0wMi0xNiAxOTowNDo1NCeFBwcAAR0CETMw0KHQsNC90Y8BLGluMjAyNi0wMi0xNiAxOTowNDo1NCeFBgcAAR0CETMwQFByMGtzaWkBLGluMjAyNi0wMi0xNiAxOTowNDo1NC2FBQcAASkCETMw0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxOTowNDo1NC+FBAcAAS0CETMwQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTE2IDE5OjA0OjU0LYUDBwABKQIRMzBAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE5OjA0OjU0JoUCBwABGwIRMzBAa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQphQEHAAEhAhEzMEBmb21pY2hlZXYBLGluMjAyNi0wMi0xNiAxOTowNDo1NCuFAAcAASUCETMw0J3QuNC60LjRgtCwASxpbjIwMjYtMDItMTYgMTk6MDQ6NTQohH8HAAEdAhMzL9Ch0LDQvdGPBidvdXQyMDI2LTAyLTE2IDE5OjA0OjA2J4R+BwABGwITMy9Aa292YXNzBlRvdXQyMDI2LTAyLTE2IDE5OjA0OjA2KIR9BwABHQITMy/QnNCw0LrRgQDmb3V0MjAyNi0wMi0xNiAxOTowNDowNjCEfAcAAS0CEzMvQEVnb3JWYWdhbm92MTExMQQIb3V0MjAyNi0wMi0xNiAxOTowNDowNiiEewcAAR0CEzMvQFByMGtzaWkSam91dDIwMjYtMDItMTYgMTk6MDQ6MDYvhHoHAAEtAhEzL0BFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0xNiAxOTowNDowNi+EeQcAAS0CETMvQEVnb3JWYWdhbm92MTExMQMgaW4yMDI2LTAyLTE2IDE5OjA0OjA2K4R4BwABJQIRMy/QodC/0LjRgdC+0LoBLGluMjAyNi0wMi0xNiAxOTowNDowNimEdwcAASECETMv0JLQsNGB0LXQugDIaW4yMDI2LTAyLTE2IDE5OjA0OjA2LYR2BwABKQIRMy9AUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE5OjA0OjA2LYR1BwABKQIRMy9AUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE5OjA0OjA2JoR0BwABGwIRMy9Aa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDQ6MDYphHMHAAEhAhEzL9Co0YPRgNC40LoCWGluMjAyNi0wMi0xNiAxOTowNDowNimEcgcAASECETMv0JLQsNGB0LXQugH0aW4yMDI2LTAyLTE2IDE5OjA0OjA2K4RxBwABJQIRMy/QodC/0LjRgdC+0LoB9GluMjAyNi0wMi0xNiAxOTowNDowNimEcAcAASECETMv0KjRg9GA0LjQugJYaW4yMDI2LTAyLTE2IDE5OjA0OjA2K4RvBwABJQIRMy/QndC40LrQuNGC0LABLGluMjAyNi0wMi0xNiAxOTowNDowNieEbgcAAR0CETMvQFByMGtzaWkD6GluMjAyNi0wMi0xNiAxOTowNDowNg0FywBFA3YABaIFcgVCBRYE7ATABJQEZQQ2BAcD2AOpA3YPzw+iD3UPSg8gDvYOxA6UDmsOQQ4RDecNtQ2CDVENJwz8DMwMoAxuDD4MFQvrC7sLkQtnCzsLBArbCrEKgQpXCiwKAQnUCaEJaQk4CQ4I4AiwCH4IVQglB/UHyweZB2kHPwcPBuEGsQaHBl0GLQX6BcsDSwMdAusCuwKRAmYCNgIKAdwBswGIAVsBKwD7AMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMIYXBwABLQITMzZARWdvclZhZ2Fub3YxMTExAkRvdXQyMDI2LTAyLTE2IDE5OjEyOjIwLYYWBwABKQIRMzZAY2hlZl96YXN1a2hpbgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwLYYVBwABKQIRMzZAY2hlZl96YXN1a2hpbgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwKIYUBwABHwIRMzZAbGlzMTk5NzEBLGluMjAyNi0wMi0xNiAxOToxMjoyMCiGKIYGBwABHwIRMzZAbGlzMTk5NzEBLGluMjAyNi0wMi0xNiAxOToxMjoyMCaGBQcAARsCETM2QGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwK4YEBwABJQIRMzZAQW50b25TaWxhZXYBLGluMjAyNi0wMi0xNiAxOToxMjoyMCmGAwcAASECETM20JTQuNC80L7QvQEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwLYYCBwABKQIRMzZAY2hlZl96YXN1a2hpbgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwKIYBBwABHwIRMzZAbGlzMTk5NzEBLGluMjAyNi0wMi0xNiAxOToxMjoyMCeGAAcAAR0CETM20KHQsNC90Y8BLGluMjAyNi0wMi0xNiAxOToxMjoyMC2FfwcAASkCETM2QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOToxMjoyMC+FfgcAAS0CETM2QEVnb3JWYWdhbm92MTExMQEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwK4V9BwABJQIRMzZATG90aGFyX1VnYXIBLGluMjAyNi0wMi0xNiAxOToxMjoyMCiFfAcAAR0CEzM10KHQsNC90Y8JLm91dDIwMjYtMDItMTYgMTk6MDk6MjgwhUIHAAEtAhMzMkBFZ29yVmFnYW5vdjExMTEDx291dDIwMjYtMDItMTYgMTk6MDc6MjAshUEHAAEpAREzMtCS0LDRgdC40LvQuNC5ZGluMjAyNi0wMi0xNiAxOTowNzoyMCyFQAcAASkBETMy0JLQsNGB0LjQu9C40LlkaW4yMDI2LTAyLTE2IDE5OjA3OjIwLIU/BwABKQERMzLQktCw0YHQuNC70LjQuWRpbjIwMjYtMDItMTYgMTk6MDc6MjAshT4HAAEpAREzMtCS0LDRgdC40LvQuNC5ZGluMjAyNi0wMi0xNiAxOTowNzoyMCyFPQcAASkBETMy0JLQsNGB0LjQu9C40LlkaW4yMDI2LTAyLTE2IDE5OjA3OjIwKYU8BwABIQIRMzLQqNGD0YDQuNC6ASxpbjIwMjYtMDItMTYgMTk6MDc6MjAphTsHAAEhAhEzMtCU0LjQvNCw0L0BLGluMjAyNi0wMi0xNiAxOTowNzoyMCeFOgcAAR0CETMy0JLQsNGB0Y8BLGluMjAyNi0wMi0xNiAxOTowNzoyMCmFOQcAASECETMy0JTQuNC80LDQvQEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwLYU4BwABKQIRMzJAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAyLTE2IDE5OjA3OjIwLYU3BwABKQIRMzJAUmFib3R5YWdhMzAwMAEsaW4yMDI2LTAyLTE2IDE5OjA3OjIwJoU2BwABGwIRMzJAa292YXNzASxpbjIwMjYtMDItMTYgMTk6MDc6MjAAAAAvAAElAhMzNUBMb3RoYXJfVWdhcgUgb3V0MjAyNi0wMi0xNiAxOTowOToyODCFegcAAS0CEzM1QEVnb3JWYWdhbm92MTExMQSab3V0MjAyNi0wMi0xNiAxOTowOToyOC2FeQcAASkCETM1QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOTowOToyOCeFeAcAAR0CETM10KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxOTowOToyOCeFdwcAAR0CETM10KHQsNC90Y8BXmluMjAyNi0wMi0xNiAxOTowOToyOC2FdgcAASkCETM10JTQvNC40YLRgNC40LkBLGluMjAyNi0wMi0xNiAxOTowOToyOCuFdQcAASUCETM1QExvdGhhcl9VZ2FyASxpbjIwMjYtMDItMTYgMTk6MDk6MjgthXQHAAEpAhEzNUBSYWJvdHlhZ2EzMDAwAMhpbjIwMjYtMDItMTYgMTk6MDk6MjgnhXMHAAEdAhEzNdCh0LDQvdGPAPppbjIwMjYtMDItMTYgMTk6MDk6MjgthXIHAAEpAhEzNdCU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MDk6MjgvhXEHAAEtAhEzNUBFZ29yVmFnYW5vdjExMTEBLGluMjAyNi0wMi0xNiAxOTowOToyOCeFcAcAAR0CETM10KHQsNC90Y8BLGluMjAyNi0wMi0xNiAxOTowOToyOC2FbwcAASkCETM10J3QuNC60L7Qu9Cw0LkBLGluMjAyNi0wMi0xNiAxOTowOToyOC2FbgcAASkCETM1QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOTowOToyOCaFbQcAARsCETM1QGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjA5OjI4L4VsBwABLQIRMzVARWdvclZhZ2Fub3YxMTExASxpbjIwMjYtMDItMTYgMTk6MDk6MjgthWsHAAEpAhEzNdCU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MDk6MjgrhWoHAAElAhEzNUBMb3RoYXJfVWdhcgEsaW4yMDI2LTAyLTE2IDE5OjA5OjI4J4VpBwABGwITMzRAa292YXNzA89vdXQyMDI2LTAyLTE2IDE5OjA4OjUwLoVoBwABKQITMzRAUmFib3R5YWdhMzAwMAMnb3V0MjAyNi0wMi0xNiAxOTowODo1MDWFZwcAATcCEzM00JLQuNGC0LDQu9C40Lou0L3QvtCyAbBvdXQyMDI2LTAyLTE2IDE5OjA4OjUwMIVmBwABLQITMzRARWdvclZhZ2Fub3YxMTExA9ZvdXQyMDI2LTAyLTE2IDE5OjA4OjUwKoVlBwABIQITMzRAZm9taWNoZWV2BI9vdXQyMDI2LTAyLTE2IDE5OjA4OjUwKIVkBwABHQITMzRAUHIwa3NpaQMEb3V0MjAyNi0wMi0xNiAxOTowODo1MCiFYwcAAR0CEzM00KHQsNC90Y8Bzm91dDIwMjYtMDItMTYgMTk6MDg6NTAnhWIHAAEdAhEzNNCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDg6NTAthWEHAAEpAhEzNEBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTk6MDg6NTAnhWAHAAEdAhEzNNCh0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDg6NTAmhV8HAAEbAhEzNEBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowODo1MDSFXgcAATcCETM00JLQuNGC0LDQu9C40Lou0L3QvtCyAZBpbjIwMjYtMDItMTYgMTk6MDg6NTAphV0HAAEhAhEzNEBmb21pY2hlZXYBLGluMjAyNi0wMi0xNiAxOTowODo1MCeFXAcAAR0CETM00KHQsNC90Y8B9GluMjAyNi0wMi0xNiAxOTowODo1MCeFWwcAAR0CETM0QFByMGtzaWkBLGluMjAyNi0wMi0xNiAxOTowODo1MC2FWgcAASkCETM0QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOTowODo1MCeFWQcAAR0CETM0QFByMGtzaWkBLGluMjAyNi0wMi0xNiAxOTowODo1MCaFWAcAARsCETM0QGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjA4OjUwLYVXBwABKQIRMzTQlNC80LjRgtGA0LjQuQEsaW4yMDI2LTAyLTE2IDE5OjA4OjUwL4VWBwABLQIRMzRARWdvclZhZ2Fub3YxMTExAlhpbjIwMjYtMDItMTYgMTk6MDg6NTAphVUHAAEhAhEzNEBmb21pY2hlZXYBLGluMjAyNi0wMi0xNiAxOTowODo1MC2FVAcAASkCETM0QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOTowODo1MCiFUwcAAR0CEzMz0KHQsNC90Y8GVm91dDIwMjYtMDItMTYgMTk6MDg6MTAnhVIHAAEbAhMzM0Brb3Zhc3MBLm91dDIwMjYtMDItMTYgMTk6MDg6MTAuhVEHAAEpAhMzM0BSYWJvdHlhZ2EzMDAwAZBvdXQyMDI2LTAyLTE2IDE5OjA4OjEwMIVQBwABLQITMzNARWdvclZhZ2Fub3YxMTExAdhvdXQyMDI2LTAyLTE2IDE5OjA4OjEwL4VPBwABLQIRMzNARWdvclZhZ2Fub3YxMTExAfRpbjIwMjYtMDItMTYgMTk6MDg6MTAnhU4HAAEdAhEzM9Ch0LDQvdGPAfRpbjIwMjYtMDItMTYgMTk6MDg6MTAthU0HAAEpAhEzM0BSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTk6MDg6MTAnhUwHAAEdAhEzM9Ch0LDQvdGPASxpbjIwMjYtMDItMTYgMTk6MDg6MTAmhUsHAAEbAhEzM0Brb3Zhc3MBLGluMjAyNi0wMi0xNiAxOTowODoxMC2FSgcAASkCETMzQFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOTowODoxMC+FSQcAAS0CETMzQEVnb3JWYWdhbm92MTExMQEsaW4yMDI2LTAyLTE2IDE5OjA4OjEwJ4VIBwABHQIRMzPQodCw0L3RjwEsaW4yMDI2LTAyLTE2IDE5OjA4OjEwJ4VHBwABGwITMzJAa292YXNzBUtvdXQyMDI2LTAyLTE2IDE5OjA3OjIwKIVGBwABHQITMzJAUHIwa3NpaQS1b3V0MjAyNi0wMi0xNiAxOTowNzoyMCqFRQcAASECEzMyQGZvbWljaGVldgImb3V0MjAyNi0wMi0xNiAxOTowNzoyMCqFRAcAASECEzMy0JTQuNC80LDQvQD1b3V0MjAyNi0wMi0xNiAxOTowNzoyMC6FQwcAASkCEzMyQFJhYm90eWFnYTMwMDAFFm91dDIwMjYtMDItMTYgMTk6MDc6MjANBAcAUAF9AAOsA4EFlAViBTIFCATdBK0D2wNTAyoC/w/OD6QPbw9GDxgO6A6+DokOYA4rDgIN1A2pDX4NTg0eDOsMugyPDGAMKgv7C9ELqAt6C0wLHgrzCsgKlwptCj4KDgngCa4JhAlUCSsJAQjXCK0IfghOCBcH5Qe8B4wHXQcqBvkGwQaWBm0EggRTBCoGRQYWBeUC1gKtAoQCUgIpAf8B1QGtAX0BmAFuAT4BDgDmALYtiC2IVQcAASkCETNkQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0yMyAxOTo0NDo0MSWIVAcAARkCETNkU2VyZ2V5AfRpbjIwMjYtMDItMjMgMTk6NDQ6NDEtiFMHAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjMgMTk6NDQ6NDEtiFIHAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjMgMTk6NDQ6NDEniFEHAAEdAhEzZNCh0LAtiEcHAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMjMgMTk6NDQ6MzkliEYHAAEZAhEzZFNlcmdleQH0aW4yMDI2LTAyLTIzIDE5OjQ0OjM5J4hFBwABHQIRM2TQotC10LzQsAH0aW4yMDI2LTAyLTIzIDE5OjQ0OjM5J4cKBwAJHQITM9Ch0LDQvdGPDiFvdXQyMDI2LTAyLTIzIDE3OjIzOjA1JocJBwAJGwITM0Brb3Zhc3MBIm91dDIwMjYtMDItMjMgMTc6MjM6MDQvhwgHAAktAhMzQEVnb3JWYWdhbm92MTExMQcwb3V0MjAyNi0wMi0yMyAxNzoyMzowNCaHBwcACR0CETPQotC10LzQsAH0aW4yMDI2LTAyLTIzIDE3OjIzOjA0JocGBwAJHQIRM9Ci0LXQvNCwArxpbjIwMjYtMDItMjMgMTc6MjM6MDQmhwUHAAkdAhEz0KLQtdC80LAB9GluMjAyNi0wMi0yMyAxNzoyMzowNCiGBgcAAR8CETM2QGxpczE5OTcxASxpbjIwMjYtMDItMTYgMTk6MTI6MjAmhgUHAAEbAhEzNkBrb3Zhc3MBLGluMjAyNi0wMi0xNiAxOToxMjoyMCuGBAcAASUCETM2QEFudG9uU2lsYWV2ASxpbjIwMjYtMDItMTYgMTk6MTI6MjAohXwHAAEdAhMzNdCh0LDQvdGPCS5vdXQyMDI2LTAyLTE2IDE5OjA5OjI4LIV7BwABJQITMzVATG90aGFyX1VnYXIFIG91dDIwMjYtMDItMTYgMTk6MDk6MjgphgMHAAEhAhEzNtCU0LjQvNC+0L0BLGluMjAyNi0wMi0xNiAxOToxMjoyMAXCACMAAR0CETNk0KHQsNC90Y8B9GluMjAyNi0wMi0yMyAxJocBBwAJHQIRM9Ch0LDQvdGPAfRpbjIwMjYtMDItMjMgMTc6MjM6MDMshwAHAAkpAhEzQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0yMyAxNzoyMzowMyiGfwcACSECETPQlNC40LzQsNC9AfRpbjIwMjYtMDItMjMgMTc6MjM6MDMthgIHAAEpAhEzNkBjaGVmX3phc3VraGluASxpbjIwMjYtMDItMTYgMTk6MTI6MjAohgEHAAEfAhEzNkBsaXMxOTk3MQEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwJ4YABwABHQIRMzbQodCw0L3RjwEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwLYV/BwABKQIRMzZAUmFib3R5YWdhMzAwMAEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwL4V+BwABLQIRMzZARWdvclZhZ2Fub3YxMTExASxpbjIwMjYtMDItMTYgMTk6MTI6MjArhX0HAAElAhEzNkBMb3RoYXJfVWdhcgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwAAAAIwAJGwIRM0Brb3Zhc3MB9GluMjAyNi0wMi0yMyAxNzouhwQHAAktAhEzQEVnb3JWYWdhbm92MTExMQH0aW4yMDI2LTAyLTIzIDE3OjIzOjAzLIcDBwAJKQIRM0BSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMjMgMTc6MjM6MDMlhwIHAAkbAhEzQGtvdmFzcwH0aW4yMDI2LTAyLTIzIDE3OjIzOjAzJoZ+BwAJHQIRM9Ci0LXQvNCwAfRpbjIwMjYtMDItMjMgMTc6MjM6MDIohk8HAAEdAhMzN9Ch0LDQvdGPAwdvdXQyMDI2LTAyLTE2IDE5OjE1OjQ3NYZOBwABNwITMzfQktC40YLQsNC70LjQui7QvdC+0LIClG91dDIwMjYtMDItMTYgMTk6MTU6NDcuhk0HAAEpAhMzN9CU0LzQuNGC0YDQuNC5AUpvdXQyMDI2LTAyLTE2IDE5OjE1OjQ3MIZMBwABLQITMzdARWdvclZhZ2Fub3YxMTExAghvdXQyMDI2LTAyLTE2IDE5OjE1OjQ3LIZLBwABJQITMzdATG90aGFyX1VnYXID9291dDIwMjYtMDItMTYgMTk6MTU6NDcthkoHAAEnAhMzN0BTaG9vcmFBbGliYXMDhG91dDIwMjYtMDItMTYgMTk6MTU6NDcmhkkHAAEbAhEzN0Brb3Zhc3MBLGluMjAyNi0wMi0xNiAxOToxNTo0Ny+GSAcAAS0CETM3QEVnb3JWYWdhbm92MTExMQEsaW4yMDI2LTAyLTE2IDE5OjE1OjQ3NIZHBwABNwIRMzfQktC40YLQsNC70LjQui7QvdC+0LIBLGluMjAyNi0wMi0xNiAxOToxNTo0Ny2GRgcAASkCETM3QFJhYm90eWFnYTMwMDABLGluMjAyNi0wMi0xNiAxOToxNTo0NyyGRQcAAScCETM3QFNob29yYUFsaWJhcwEsaW4yMDI2LTAyLTE2IDE5OjE1OjQ3J4ZEBwABHQIRMzfQodCw0L3RjwH0aW4yMDI2LTAyLTE2IDE5OjE1OjQ3J4ZDBwABHQIRMzfQodCw0L3RjwEsaW4yMDI2LTAyLTE2IDE5OjE1OjQ3J4ZCBwABHQIRMzfQodCw0L3RjwJYaW4yMDI2LTAyLTE2IDE5OjE1OjQ3JoZBBwABGwIRMzdAa292YXNzASxpbjIwMjYtMDItMTYgMTk6MTU6NDcthkAHAAEpAhEzN9CU0LzQuNGC0YDQuNC5ASxpbjIwMjYtMDItMTYgMTk6MTU6NDcnhj8HAAEdAhEzN9Ch0LDQvdGPASxpbjIwMjYtMDItMTYgMTk6MTU6NDcvhj4HAAEtAhEzN0BFZ29yVmFnYW5vdjExMTEBLGluMjAyNi0wMi0xNiAxOToxNTo0NyuGPQcAASUCETM3QExvdGhhcl9VZ2FyASxpbjIwMjYtMDItMTYgMTk6MTU6NDcthjwHAAEpAhEzN0BSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTk6MTU6NDcshjsHAAEnAhEzN0BTaG9vcmFBbGliYXMBLGluMjAyNi0wMi0xNiAxOToxNTo0NyeGOgcAARsCEzM4QGtvdmFzcwOEb3V0MjAyNi0wMi0xNiAxOToxNDoxMy6GOQcAASkCEzM4QFJhYm90eWFnYTMwMDAGZm91dDIwMjYtMDItMTYgMTk6MTQ6MTMohjgHAAEfARMzOEBleHBpZ25pa2lvdXQyMDI2LTAyLTE2IDE5OjE0OjEzKIY3BwABHwIRMzhAZXhwaWduaWsBLGluMjAyNi0wMi0xNiAxOToxNDoxMyuGNgcAASUCETM4QExvdGhhcl9VZ2FyASxpbjIwMjYtMDItMTYgMTk6MTQ6MTMrhjUHAAElAhEzOEBMb3RoYXJfVWdhcgEsaW4yMDI2LTAyLTE2IDE5OjE0OjEzK4Y0BwABJQIRMzhATG90aGFyX1VnYXIBLGluMjAyNi0wMi0xNiAxOToxNDoxMyaGMwcAARsCETM4QGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjE0OjEzJ4YdBwABGwITMzZAa292YXNzC4pvdXQyMDI2LTAyLTE2IDE5OjEyOjIwLIYcBwABJQITMzZAQW50b25TaWxhZXYDFm91dDIwMjYtMDItMTYgMTk6MTI6MjAzhhsHAAEzAhMzNkBkbWl0cnlfZWZyZW1vdjY5OTYDEW91dDIwMjYtMDItMTYgMTk6MTI6MjAshhoHAAElAhMzNkBMb3RoYXJfVWdhcgP0b3V0MjAyNi0wMi0xNiAxOToxMjoyMCiGGQcAAR0CEzM20KHQsNC90Y8BM291dDIwMjYtMDItMTYgMTk6MTI6MjAuhhgHAAEpAhMzNkBSYWJvdHlhZ2EzMDAwBiRvdXQyMDI2LTAyLTE2IDE5OjEyOjIwMIYXBwABLQITMzZARWdvclZhZ2Fub3YxMTExAkRvdXQyMDI2LTAyLTE2IDE5OjEyOjIwLYYWBwABKQIRMzZAY2hlZl96YXN1a2hpbgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwLYYVBwABKQIRMzZAY2hlZl96YXN1a2hpbgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwKIYUBwABHwIRMzZAbGlzMTk5NzEBLGluMjAyNi0wMi0xNiAxOToxMjoyMCiGEwcAAR8CETM2QGxpczE5OTcxASxpbjIwMjYtMDItMTYgMTk6MTI6MjArhhIHAAElAhEzNkBMb3RoYXJfVWdhcgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwJoYRBwABGwIRMzZAa292YXNzAMhpbjIwMjYtMDItMTYgMTk6MTI6MjAyhhAHAAEzAhEzNkBkbWl0cnlfZWZyZW1vdjY5OTYBLGluMjAyNi0wMi0xNiAxOToxMjoyMCaGDwcAARsCETM2QGtvdmFzcwEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwMoYOBwABMwIRMzZAZG1pdHJ5X2VmcmVtb3Y2OTk2ASxpbjIwMjYtMDItMTYgMTk6MTI6MjAnhg0HAAEdAhEzNtCh0LDQvdGPASxpbjIwMjYtMDItMTYgMTk6MTI6MjAthgwHAAEpAhEzNkBSYWJvdHlhZ2EzMDAwASxpbjIwMjYtMDItMTYgMTk6MTI6MjArhgsHAAElAhEzNkBBbnRvblNpbGFldgEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwJoYKBwABGwIRMzZAa292YXNzASxpbjIwMjYtMDItMTYgMTk6MTI6MjAyhgkHAAEzAhEzNkBkbWl0cnlfZWZyZW1vdjY5OTYBLGluMjAyNi0wMi0xNiAxOToxMjoyMCeGCAcAAR0CETM20KHQsNC90Y8CWGluMjAyNi0wMi0xNiAxOToxMjoyMC+GBwcAAS0CETM2QEVnb3JWYWdhbm92MTExMQEsaW4yMDI2LTAyLTE2IDE5OjEyOjIwDQAAAFcAuQAP0w+mD3kPTA8fDvIOxQ6YDmsOPg4RDeQNtw2KDV0NMA0DDNYMqQx8DE8MIgv1C8gLmwtuC0ELFArnCroKjQpgCjMKBgnZCawJfwlSCSUI+AjLCJ4IcQhECBcH6ge9B5EHZQc5Bw0G4AazBoYGWQYsBf8F0gWlBXgFSwUeBPEExASXBGoEPQQQA+MDtgOJA1wDLwMCAtUCqAJ7Ak4CIQH0AccBmgFtAUABEwDmALkAAAArXAYABQIhM/8WltnIpglRMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MjA6MTArWwYABQIhM/8WltnIpglQMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTk6MTUrWgYABQIhM/8WltnIpglPMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTM6NTUrWQYABQIhM/8WltnIpglOMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTM6NTIrWAYABQIhM/8WltnIpglNMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTI6NDgrVwYABQIhM/8WltnIpglMMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTI6MjErVgYABQIhM/8WltnIpglLMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTE6NTYrVQYABQIhM/8WltnIpglKMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTE6MzQrVAYABQIhM/8WltnIpglJMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTA6NDgrUwYABQIhM/8WltnIpglIMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MTA6MjArUgYABQIhM/8WltnIpglHMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDk6MzgrUQYABQIhM/8WltnIpglGMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDg6NDMrUAYABQIhM/8WltnIpglFMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDg6MjYrTwYABQIhM/8WltnIpglEMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDc6NDcrTgYABQIhM/8WltnIpglCMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDY6MDArTQYABQIhM/8WltnIpglBMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDU6NTcrTAYABQIhM/8WltnIpglAMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDU6MjkrSwYABQIhM/8WltnIpgk/MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDU6MTYrSgYABQIhM/8WltnIpgk+MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDQ6NDgrSQYABQIhM/8WltnIpgk9MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDQ6MzErSAYABQIhM/8WltnIpgk8MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDQ6MDMrRwYABQIhM/8WltnIpgk7MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDM6NDgrRgYABQIhM/8WltnIpgk6MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDM6NDQrRQYABQIhM/8WltnIpgk5MjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MDM6MjIrRAYABQIhM/8WltnIpgk4MjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NTc6NDQrQwYABQIhM/8WltnIpgk3MjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NTc6MTErQgYABQIhM/8WltnIpgk2MjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NTY6NDUrQQYABQIhM/8WltnIpgk1MjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NTY6MjErQAYABQIhM/8WltnIpgk0MjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NDg6MjUrPwYABQIhM/8WltnIpgkzMjAyNi0wMi0yMzIwMjYtMDItMjMgMTM6NDM6NTkrPgYABQIhM/8WltnIpgkyMjAyNi0wMi0yMzIwMjYtMDItMjMgMTE6NDU6NDcrPQYABQIhM/8WltnIpgkvMjAyNi0wMi0yMzIwMjYtMDItMjMgMDg6MzE6NTgrPAYABQIhM/8WltnIpgkuMjAyNi0wMi0yMzIwMjYtMDItMjMgMDg6MzE6NDErOwYABQIhM/8WltnIpgktMjAyNi0wMi0yMzIwMjYtMDItMjMgMDg6MzA6NDMrOgYABQIhM/8WltnIpgksMjAyNi0wMi0yMzIwMjYtMDItMjMgMDg6MzA6MDYrOQYABQIhM/8WltnIpgkrMjAyNi0wMi0yMzIwMjYtMDItMjMgMDg6Mjc6MjEqOAYABQEhM/8WltnIpgIyMDI0LTA5LTA3MjAyNi0wMi0xNiAxOToxNDoxMyo3BgAFASEz/xaW2cimJTIwMjQtMDktMTQyMDI2LTAyLTE2IDE5OjEzOjEwKjYGAAUBITP/FpbZyKZPMjAyNC0wOS0yMDIwMjYtMDItMTYgMTk6MTI6MjAqNQYABQEhM/8WltnIplcyMDI0LTA5LTI0MjAyNi0wMi0xNiAxOTowOToyOCs0BgAFAiEz/xaW2cimAIEyMDI0LTEwLTAyMjAyNi0wMi0xNiAxOTowODo1MCszBgAFAiEz/xaW2cimANYyMDI0LTEwLTA3MjAyNi0wMi0xNiAxOTowODoxMCsyBgAFAiEz/xaW2cimANgyMDI0LTEwLTExMjAyNi0wMi0xNiAxOTowNzoyMCsxBgAFAiEz/xaW2cimAPUyMDI0LTEwLTE4MjAyNi0wMi0xNiAxOTowNjoyNSswBgAFAiEz/xaW2cimAPsyMDI0LTEwLTI2MjAyNi0wMi0xNiAxOTowNDo1NCsvBgAFAiEz/xaW2cimAVYyMDI0LTExLTAxMjAyNi0wMi0xNiAxOTowNDowNisuBgAFAiEz/xaW2cimAZ4yMDI0LTExLTA5MjAyNi0wMi0xNiAxOTowMjoyNSstBgAFAiEz/xaW2cimAcUyMDI0LTExLTE1MjAyNi0wMi0xNiAxOTowMDo0NCssBgAFAiEz/xaW2cimAfQyMDI0LTExLTIyMjAyNi0wMi0xNiAxODo1OTo1NSsrBgAFAiEz/xaW2cimAkoyMDI0LTExLTI5MjAyNi0wMi0xNiAxODo1OToxMSsqBgAFAiEz/xaW2cimAmgyMDI0LTEyLTA3MjAyNi0wMi0xNiAxODo1ODozMispBgAFAiEz/xaW2cimAsIyMDI0LTEyLTIyMjAyNi0wMi0xNiAxODo1NzoyMSsoBgAFAiEz/xaW2cimAu0yMDI0LTEyLTMxMjAyNi0wMi0xNiAxODo1NjozNSsnBgAFAiEz/xaW2cimAvYyMDI1LTAxLTA0MjAyNi0wMi0xNiAxODo1NTo1MysmBgAFAiEz/xaW2cimA3IyMDI1LTA1LTAyMjAyNi0wMi0xNiAxODo1NDo0MyskBgAFAiEz/xaW2cimA+4yMDI1LTA1LTIzMjAyNi0wMi0xNiAxODowOToyNysgBgAFAiEz/xaW2cimBI0yMDI1LTA2LTE1MjAyNi0wMi0xNiAxODowNToyMSsfBgAFAiEz/xaW2cimBKoyMDI1LTA2LTIxMjAyNi0wMi0xNiAxODowMzo1NiseBgAFAiEz/xaW2cimBMEyMDI1LTA2LTIyMjAyNi0wMi0xNiAxODowMzoxNisdBgAFAiEz/xaW2cimBRMyMDI1LTA2LTI4MjAyNi0wMi0xNiAxODowMToxOSscBgAFAiEz/xaW2cimCLcyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzozODozOSsbBgAFAiEz/xaW2cimBUYyMDI1LTA3LTAyMjAyNi0wMi0xNiAxNzozODowNisaBgAFAiEz/xaW2cimCLUyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzozNzozMCsZBgAFAiEz/xaW2cimCLQyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzozNToyNSsYBgAFAiEz/xaW2cimBXIyMDI1LTA3LTA2MjAyNi0wMi0xNiAxNzozMzo1NSsXBgAFAiEz/xaW2cimCK0yMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzozMjowNSsWBgAFAiEz/xaW2cimBZ4yMDI1LTA3LTA5MjAyNi0wMi0xNiAxNzozMToyMCsVBgAFAiEz/xaW2cimCKsyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzozMDozOCsUBgAFAiEz/xaW2cimBakyMDI1LTA3LTEyMjAyNi0wMi0xNiAxNzoyOTowMSsSBgAFAiEz/xaW2cimBe4yMDI1LTA4LTA2MjAyNi0wMi0xNiAxNzoyMzoyNisRBgAFAiEz/xaW2cimBicyMDI1LTA5LTA1MjAyNi0wMi0xNiAxNzoyMjowNSsQBgAFAiEz/xaW2cimBigyMDI1LTA5LTEzMjAyNi0wMi0xNiAxNzoyMToxOSsPBgAFAiEz/xaW2cimCJ4yMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzoxOTozOSsOBgAFAiEz/xaW2cimBisyMDI1LTA5LTIwMjAyNi0wMi0xNiAxNzoxOToxMCsNBgAFAiEz/xaW2cimCJwyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzoxODo0MSsMBgAFAiEz/xaW2cimBkMyMDI1LTEwLTA0MjAyNi0wMi0xNiAxNzoxNjozMSsLBgAFAiEz/xaW2cimBqMyMDI1LTExLTAxMjAyNi0wMi0xNiAxNzoxNTo0MSsKBgAFAiEz/xaW2cimBrYyMDI1LTExLTA4MjAyNi0wMi0xNiAxNzoxNDozNisJBgAFAiEz/xaW2cimCJgyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzoxMjo1OCsIBgAFAiEz/xaW2cimCJMyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzoxMTowMysHBgAFAiEz/xaW2cimCJIyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzoxMDo0NSsGBgAFAiEz/xaW2cimCJEyMDI2LTAyLTE2MjAyNi0wMi0xNiAxNzowMjo0NSsFBgAFAiEz/xaW2cimBuEyMDI1LTExLTIyMjAyNi0wMi0xNiAxNjo1Mzo1MSsEBgAFAiEz/xaW2cimB0MyMDI1LTEyLTI4MjAyNi0wMi0xNiAxNjo1MTo1OSsDBgAFAiEz/xaW2cimB1QyMDI2LTAxLTA5MjAyNi0wMi0xNiAxNjo0Njo0NisCBgAFAiEz/xaW2cimB64yMDI2LTAxLTI5MjAyNi0wMi0xNiAxNjo0NToxNSsBBgAFAiEz/xaW2cimB78yMDI2LTAyLTE0MjAyNi0wMi0xNiAxNjo0NDowMw0AAABVAN0AD9MPpg95D0wPHw7yDsUOmA5rDj4OEQ3kDbcNig1dDTANAwzWDKkMfAxPDCIL9QvIC5sLbgtBCxQK5wq6Co0KYAozCgYJ2QmrCX0JTwkhCPMIxQiXCGkIOwgNB98HsQeDB1UHJwb5BssGnQZvBkEGEwXlBbcFiQVbBS0E/wTRBKMEdQRHBBkD6wO9A48DYQMzAwUC1wKpAnsCTQIfAfEBwwGVAWcBOQELAN0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK4ExBgAFAiEz/xaW2cimChIyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTozMTo1NCuBMAYABQIhM/8WltnIpgoRMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6NTg6NDArgS8GAAUCITP/FpbZyKYKEDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjU3OjI4K4EuBgAFAiEz/xaW2cimCg8yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDo1NzowOCuBLQYABQIhM/8WltnIpgoOMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6NTY6MTgrgSwGAAUCITP/FpbZyKYKDTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA5OjUwK4ErBgAFAiEz/xaW2cimCgwyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowOToxMCuBKgYABQIhM/8WltnIpgoLMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDk6MDQrgSkGAAUCITP/FpbZyKYKCjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA4OjQ0K4EoBgAFAiEz/xaW2cimCgkyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowNzo0NCuBJwYABQIhM/8WltnIpgoIMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDc6MzMrgSYGAAUCITP/FpbZyKYKBzIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA3OjE3K4ElBgAFAiEz/xaW2cimCgYyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowNzowOSuBJAYABQIhM/8WltnIpgoFMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDc6MDkrgSMGAAUCITP/FpbZyKYKBDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA2OjUzK4EiBgAFAiEz/xaW2cimCgMyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowNjo0NyuBIQYABQIhM/8WltnIpgoCMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDY6MjkrgSAGAAUCITP/FpbZyKYKATIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA2OjE0K4EfBgAFAiEz/xaW2cimCgAyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowNjowOCuBHgYABQIhM/8WltnIpgn/MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDY6MDIrgR0GAAUCITP/FpbZyKYJ/jIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjA1OjUxK4EcBgAFAiEz/xaW2cimCf0yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowNToyOCuBGwYABQIhM/8WltnIpgn8MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDM6NTMrgRoGAAUCITP/FpbZyKYJ+zIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjAzOjUwK4EZBgAFAiEz/xaW2cimCfoyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowMzo0NyuBGAYABQIhM/8WltnIpgn5MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDM6MzQrgRcGAAUCITP/FpbZyKYJ+DIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjAzOjE3K4EWBgAFAiEz/xaW2cimCfcyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowMjo0NyuBFQYABQIhM/8WltnIpgn1MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDE6MjArgRQGAAUCITP/FpbZyKYJ9DIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjAwOjU5K4ETBgAFAiEz/xaW2cimCfMyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNDowMDo1NyuBEgYABQIhM/8WltnIpgnyMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTQ6MDA6MjMrgREGAAUCITP/FpbZyKYJ8TIwMjYtMDMtMTMyMDI2LTAzLTEzIDE0OjAwOjA4K4EQBgAFAiEz/xaW2cimCfAyMDI2LTAzLTEzMjAyNi0wMy0xMyAxMzo1OTo0OSuBDwYABQIhM/8WltnIpgnvMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTM6NTk6MjQrgQ4GAAUCITP/FpbZyKYJ7jIwMjYtMDMtMTMyMDI2LTAzLTEzIDEzOjU2OjE0K4ENBgAFAiEz/xaW2cimCe0yMDI2LTAzLTEzMjAyNi0wMy0xMyAxMzo1NjowMyuBDAYABQIhM/8WltnIpgnsMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTM6NTU6NDYrgQsGAAUCITP/FpbZyKYJ6zIwMjYtMDMtMTMyMDI2LTAzLTEzIDEzOjUzOjQ4K4EKBgAFAiEz/xaW2cimCeoyMDI2LTAzLTEzMjAyNi0wMy0xMyAxMDozNTo0MyuBCQYABQIhM/8WltnIpgnpMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTA6MjQ6NDQrgQgGAAUCITP/FpbZyKYJ6DIwMjYtMDMtMTMyMDI2LTAzLTEzIDEwOjIzOjQzK4EHBgAFAiEz/xaW2cimCecyMDI2LTAzLTEzMjAyNi0wMy0xMyAxMDoyMTo0NiuBBgYABQIhM/8WltnIpgnmMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTA6MTk6NTUrgQUGAAUCITP/FpbZyKYJ5TIwMjYtMDMtMTMyMDI2LTAzLTEzIDEwOjE4OjIyK4EEBgAFAiEz/xaW2cimCeQyMDI2LTAzLTEzMjAyNi0wMy0xMyAxMDoxNzozNSuBAwYABQIhM/8WltnIpgniMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTA6MTY6NDkrgQIGAAUCITP/FpbZyKYJ4DIwMjYtMDMtMTMyMDI2LTAzLTEzIDEwOjE0OjU0K4EBBgAFAiEz/xaW2cimCbkyMDI2LTAzLTA3MjAyNi0wMy0wNyAxNzozMTozOCuBAAYABQIhM/8WltnIpgm2MjAyNi0wMy0wNzIwMjYtMDMtMDcgMTY6MTk6MzErfwYABQIhM/8WltnIpgm1MjAyNi0wMy0wNzIwMjYtMDMtMDcgMTQ6MDY6MDcrfgYABQIhM/8WltnIpgmzMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6NTA6MjUrfQYABQIhM/8WltnIpgmyMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6NDI6MzUrfAYABQIhM/8WltnIpgmxMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzk6MDYrewYABQIhM/8WltnIpgmwMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzk6MDEregYABQIhM/8WltnIpgmvMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzg6MDMreQYABQIhM/8WltnIpgmuMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzc6NTIreAYABQIhM/8WltnIpgmtMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzc6NDUrdwYABQIhM/8WltnIpgmsMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mzc6MzkrdgYABQIhM/8WltnIpgmrMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MzM6MTcrdQYABQIhM/8WltnIpgmqMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MzI6NTErdAYABQIhM/8WltnIpgmpMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MzE6NTMrcwYABQIhM/8WltnIpgmoMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MzE6MzkrcgYABQIhM/8WltnIpgmnMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6Mjg6MjkrcQYABQIhM/8WltnIpgmmMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MjA6MTArcAYABQIhM/8WltnIpgmlMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MTQ6NDYrbwYABQIhM/8WltnIpgmkMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MTM6MjkrbgYABQIhM/8WltnIpgmjMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MTE6MTIrbQYABQIhM/8WltnIpgmiMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MTA6NTIrbAYABQIhM/8WltnIpgmhMjAyNi0wMy0wNzIwMjYtMDMtMDcgMTI6MDY6NTIrawYABQIhM/8WltnIpgmQMjAyNi0wMi0yNDIwMjYtMDItMjQgMDg6MzI6NTMragYABQIhM/8WltnIpgmPMjAyNi0wMi0yNDIwMjYtMDItMjQgMDg6MzA6MzUraQYABQIhM/8WltnIpgmOMjAyNi0wMi0yNDIwMjYtMDItMjQgMDg6Mjc6MTAraAYABQIhM/8WltnIpgmLMjAyNi0wMi0yNDIwMjYtMDItMjQgMDg6MTg6NTcrZwYABQIhM/8WltnIpgmKMjAyNi0wMi0yNDIwMjYtMDItMjQgMDg6MTg6MzIrZgYABQIhM/8WltnIpgl+MjAyNi0wMi0yMzIwMjYtMDItMjMgMjA6NDE6MzQrZQYABQIhM/8WltnIpglbMjAyNi0wMi0yMzIwMjYtMDItMjMgMTY6MDU6MDArZAYABQIhM/8WltnIpglaMjAyNi0wMi0yMzIwMjYtMDItMjMgMTY6MDE6MTArYwYABQIhM/8WltnIpglZMjAyNi0wMi0yMzIwMjYtMDItMjMgMTU6MzA6MTMrYgYABQIhM/8WltnIpglYMjAyNi0wMi0yMzIwMjYtMDItMjMgMTU6MDk6NTUrYQYABQIhM/8WltnIpglXMjAyNi0wMi0yMzIwMjYtMDItMjMgMTU6MDk6NDkrYAYABQIhM/8WltnIpglWMjAyNi0wMi0yMzIwMjYtMDItMjMgMTU6MDk6MDErXwYABQIhM/8WltnIpglVMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MjY6MTMrXgYABQIhM/8WltnIpglTMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MjI6MTkrXQYABQIhM/8WltnIpglSMjAyNi0wMi0yMzIwMjYtMDItMjMgMTQ6MjA6MjYNAcEARgE6Awi7CJEIaAg+CBYH5ge4B4gHVgcsBvwGzAakBnQP2A+uD34PVA8pDv4O0Q6eDcINmg1qDT4NFAzrDMEMmQxpDDsMCwvZC68LfwtPCycK9wrPCqUKdQpFChsGSQYeBfMFxgWTBWIFLwUACfAJvwmSCWgJNwkGDnEOQg4YDewE0ASeBG4ERAGTBBgBagE6AQoA4AC2ALYAtgC2ALYAtgC2ALYAtgC2ALYAtgC2ALYAySeKPAcAAR0CETMF0JLQu9Cw0LQB9GluMjAyNi0wMy0wNyAyMDo0MToyNCeKOwcAAR0CETMF0JLQvtCy0LAB9GluMjAyNi0wMy0wNyAyMDo0MToyNC2KOgcAASkCETMF0JTQvNC40YLRgNC40LkBLGluMjAyNi0wMy0wNyAyMDo0MToyNC2KOQcAASkCETMFQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0wNyAyMDo0MToyNCaKOAcAARsCETMFQGtvdmFzcwH0aW4yMDI2LTAzLTA3IDIwOjQxOjIzK4o2BwABJQIRMwVATG90aGFyX1VnYXIB9GluMjAyNi0wMy0wNyAyMDo0MToyMwjnAlcAAikCEzMAgdCd0LjQutC+0LvQsNC5DVxvdXQyMDI2LTAzLTA3IDIwOjQwOjUwCOcCJQACHQITMwCB0JjQstCw0L0BE291dDIwMjYtMDMtMDcgMjA6NDA6NTAI5wH5AAIlAhMzAIFATG90aGFyX1VnYXIFRm91dDIwMjYtMDMtMDcgMjA6NDA6NDkI5wHJAAIpAhEzAIFAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAzLTA3IDIwOjQwOjQ5COcBmAACHQIRMwCB0KHQsNC90Y8B9GluMjAyNi0wMy0wNyAyMDo0MDo0OQjnAW0AAikCETMAgUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDMtMDcgMjA6NDA6NDkI5wE8AAIdAhEzAIHQodCw0L3RjwH0aW4yMDI2LTAzLTA3IDIwOjQwOjQ5COcBEQACHQIRMwCB0KLQtdC80LAB9GluMjAyNi0wMy0wNyAyMDo0MDo0OQjnAOYAAhsCETMAgUBrb3Zhc3MB9GluMjAyNi0wMy0wNyAyMDo0MDo0OQjnALwAAiUCETMAgUBMb3RoYXJfVWdhcgH0aW4yMDI2LTAzLTA3IDIwOjQwOjQ5COcAjQACHQIRMwCB0JjQstCw0L0B9GluMjAyNi0wMy0wNyAyMDo0MDo0OAjnAGIAAikCETMAgUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDMtMDcgMjA6NDA6NDgI5wAxAAIpAhEzAIHQndC40LrQvtC70LDQuQH0aW4yMDI2LTAzLTA3IDIwOjQwOjQ4J4o3BwABHQIRMwXQodCw0L3RjwH0aW4yMDI2LTAzLTA3IDIwOjQxOjIzNzonijUHAAEdAhEzBdCY0LLQsNC9AfRpbjIwMjYtMDMtMDcgMjA6NDE6MjMtijQHAAEpAhEzBUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDMtMDcgMjA6NDE6MjMvijMHAAEtAhEzBUBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMy0wNyAyMDo0MToyMy2KMgcAASkCETMF0JTQvNC40YLRgNC40LkB9GluMjAyNi0wMy0wNyAyMDo0MToyMyyJVwcAASUCEzNmQExvdGhhcl9VZ2FyAcJvdXQyMDI2LTAyLTI0IDA4OjM5OjEwMIlWBwABLQITM2ZARWdvclZhZ2Fub3YxMTExBLBvdXQyMDI2LTAyLTI0IDA4OjM5OjA5LolVBwABKQITM2ZAUmFib3R5YWdhMzAwMAGab3V0MjAyNi0wMi0yNCAwODozOTowOTCJVAcAAS0CEzNmQEVnb3JWYWdhbm92MTExMQEsb3V0MjAyNi0wMi0yNCAwODozOTowOSqJUwcAASECEzNm0JTQuNC80LDQvQDIb3V0MjAyNi0wMi0yNCAwODozOTowOSiJUgcAAR0CEzNm0KLQtdC80LAHCG91dDIwMjYtMDItMjQgMDg6Mzk6MDkoiVEHAAEdAhMzZtCi0LXQvNCwBExvdXQyMDI2LTAyLTI0IDA4OjM5OjA5KIlQBwABHQITM2bQodCw0L3RjwH0b3V0MjAyNi0wMi0yNCAwODozOTowOC2IVQcAASkCETNkQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0yMyAxOTo0NDo0MSWIVAcAARkCETNkU2VyZ2V5AfRpbjIwMjYtMDItMjMgMTk6NDQ6NDEtiFMHAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjMgMTk6NDQ6NDEtiFIHAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjMgMTk6NDQ6NDEniFEHAAEdAhEzZNCh0LDQvdGPAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDEviFAHAAEtAhEzZEBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0yMyAxOTo0NDo0MS2ITwcAASkCETNk0J3QuNC60L7Qu9Cw0LkB9GluMjAyNi0wMi0yMyAxOTo0NDo0MCuITgcAASUCETNkQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDAtiE0HAAEpAhEzZEBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDAliEwHAAEZAhEzZFNlcmdleQH0aW4yMDI2LTAyLTIzIDE5OjQ0OjQwJ4hLBwABHQIRM2TQotC10LzQsAH0aW4yMDI2LTAyLTIzIDE5OjQ0OjQwJohKBwABGwIRM2RAa292YXNzAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDAniEkHAAEdAhEzZNCh0LDQvdGPAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDApiEgHAAEhAhEzZNCU0LjQvNCw0L0B9GluMjAyNi0wMi0yMyAxOTo0NDozOQAAAB8AASkCETNkQFJhYm90eWFnYTMwMDAB9GluMjAuiV0HAAIpAhEzAIBAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAzLTA3IDE2OjI0OjQyLolcBwACKQIRMwCA0J3QuNC60L7Qu9Cw0LkB9GluMjAyNi0wMy0wNyAxNjoyNDo0MieJWwcAARsCEzNmQGtvdmFzcwV9b3V0MjAyNi0wMi0yNCAwODozOToxMCqJWgcAASECEzNm0JTQuNC80LDQvQbWb3V0MjAyNi0wMi0yNCAwODozOToxMC6JWQcAASkCEzNm0J3QuNC60L7Qu9Cw0LkDTW91dDIwMjYtMDItMjQgMDg6Mzk6MTAoiVgHAAEdAhMzZkBQcjBrc2lpAfFvdXQyMDI2LTAyLTI0IDA4OjM5OjEwJ4lPBwABGwITM2ZAa292YXNzAfRvdXQyMDI2LTAyLTI0IDA4OjM5OjA4LYlOBwABKQIRM2ZAUmFib3R5YWdhMzAwMALuaW4yMDI2LTAyLTI0IDA4OjM5OjA4LYlNBwABKQIRM2bQndC40LrQvtC70LDQuQH0aW4yMDI2LTAyLTI0IDA4OjM5OjA4J4lMBwABHQIRM2ZAUHIwa3NpaQH0aW4yMDI2LTAyLTI0IDA4OjM5OjA4JYlLBwABGQIRM2ZTZXJnZXkB9GluMjAyNi0wMi0yNCAwODozOTowOC2JSgcAASkCETNmQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0yNCAwODozOTowOCWJSQcAARkCETNmU2VyZ2V5AfRpbjIwMjYtMDItMjQgMDg6Mzk6MDctiUgHAAEpAhEzZkBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjQgMDg6Mzk6MDctiUcHAAEpAhEzZkBSYWJvdHlhZ2EzMDAwAlhpbjIwMjYtMDItMjQgMDg6Mzk6MDcniUYHAAEdAhEzZtCh0LDQvdGPAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDcviUUHAAEtAhEzZkBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMi0yNCAwODozOTowNy2JRAcAASkCETNm0J3QuNC60L7Qu9Cw0LkB9GluMjAyNi0wMi0yNCAwODozOTowNyuJQwcAASUCETNmQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDctiUIHAAEpAhEzZkBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDYliUEHAAEZAhEzZlNlcmdleQH0aW4yMDI2LTAyLTI0IDA4OjM5OjA2J4lABwABHQIRM2bQotC10LzQsAH0aW4yMDI2LTAyLTI0IDA4OjM5OjA2Jok/BwABGwIRM2ZAa292YXNzAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDYniT4HAAEdAhEzZtCh0LDQvdGPAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDYpiT0HAAEhAhEzZtCU0LjQvNCw0L0B9GluMjAyNi0wMi0yNCAwODozOTowNi2JPAcAASkCETNmQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMi0yNCAwODozOTowNiWJOwcAARkCETNmU2VyZ2V5AfRpbjIwMjYtMDItMjQgMDg6Mzk6MDYniToHAAEdAhEzZtCi0LXQvNCwAfRpbjIwMjYtMDItMjQgMDg6Mzk6MDUoiWEHAAIdAhEzAIDQotC10LzQsAH0aW4yMDI2LTAzLTA3IDE2OjI0OjQzBSeJYAcAAhsCETMAgEBrb3Zhc3MB9GluMjAyNi0wMy0wNyAxNjoyNDo0MyyJXwcAAiUCETMAgEBMb3RoYXJfVWdhcgH0aW4yMDI2LTAzLTA3IDE2OjI0OjQzKoleBwACIQIRMwCA0JLQsNC90LXQugH0aW4yMDI2LTAzLTA3IDE2OjI0OjQzMIhdBwABLQITM2RARWdvclZhZ2Fub3YxMTExASxvdXQyMDI2LTAyLTIzIDE5OjQ0OjQyKohcBwABIQITM2TQlNC40LzQsNC9AMhvdXQyMDI2LTAyLTIzIDE5OjQ0OjQyKIhbBwABHQITM2TQotC10LzQsAtUb3V0MjAyNi0wMi0yMyAxOTo0NDo0MiiIWgcAAR0CEzNk0KHQsNC90Y8B9G91dDIwMjYtMDItMjMgMTk6NDQ6NDIniFkHAAEbAhMzZEBrb3Zhc3MB9G91dDIwMjYtMDItMjMgMTk6NDQ6NDItiFgHAAEpAhEzZNCd0LjQutC+0LvQsNC5AfRpbjIwMjYtMDItMjMgMTk6NDQ6NDIniFcHAAEdAhEzZEBQcjBrc2lpAfRpbjIwMjYtMDItMjMgMTk6NDQ6NDEliFYHAAEZAhEzZFNlcmdleQH0aW4yMDI2LTAyLTIzIDE5OjQ0OjQxDQAAAFUA3AAEIwP5A88P1A+qD4APVg8sDwAO0A6gDnYOSg4fDewNwg2VDWgNNw0GDNUMqgx7DFEMJgv7C8oLnwtuCz4LEgrgCqgKdQpKCh0J8gnICZgJbQk8CRMI5gi5CIEIUAgjB/YHywebB3AHPAcOBuQGqwZ5BkgGFgXrBboFjwVmBTcFBgTZBK4EhARTA54DcwNKAxsC6gK9ApICaAI3Ag0B3AGzAYgBXwE2AQgA3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSmObQcAAh0CEzMBFkBQcjBrc2lpAfRvdXQyMDI2LTAzLTI3IDIxOjIwOjQ2K45sBwACIQITMwEWQFN6ZXJ1a2FldgH0b3V0MjAyNi0wMy0yNyAyMToyMDo0NSaOawcAAhkCETMBFlNlcmdleQH0aW4yMDI2LTAzLTI3IDIxOjIwOjQ1Jo5qBwACGQIRMwEWU2VyZ2V5AfRpbjIwMjYtMDMtMjcgMjE6MjA6NDUojmkHAAIdAhEzARbQodCw0L3RjwH0aW4yMDI2LTAzLTI3IDIxOjIwOjQ1Jo5oBwACGQIRMwEWU2VyZ2V5AfRpbjIwMjYtMDMtMjcgMjE6MjA6NDUujmcHAAIpAhEzARbQndC40LrQvtC70LDQuQH0aW4yMDI2LTAzLTI3IDIxOjIwOjQ1J45mBwACGwIRMwEWQGtvdmFzcwH0aW4yMDI2LTAzLTI3IDIxOjIwOjQ1Lo5lBwACKQIRMwEWQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0yNyAyMToyMDo0NCeOZAcAAhsCETMBFkBrb3Zhc3MB9GluMjAyNi0wMy0yNyAyMToyMDo0NCiOYwcAAh0CETMBFkBQcjBrc2lpAfRpbjIwMjYtMDMtMjcgMjE6MjA6NDQqjmIHAAIhAhEzARZAU3plcnVrYWV2AfRpbjIwMjYtMDMtMjcgMjE6MjA6NDQujmEHAAIpAhEzARZAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAzLTI3IDIxOjIwOjQ0LI5gBwACJQIRMwEWQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDMtMjcgMjE6MjA6NDQmjl8HAAIZAhEzARZTZXJnZXkB9GluMjAyNi0wMy0yNyAyMToyMDo0NCiOXgcAAh0CETMBFtCh0LDQvdGPAfRpbjIwMjYtMDMtMjcgMjE6MjA6NDMujl0HAAIpAhEzARbQndC40LrQvtC70LDQuQH0aW4yMDI2LTAzLTI3IDIxOjIwOjQzJ4o8BwABHQIRMwXQktC70LDQtAH0aW4yMDI2LTAzLTA3IDIwOjQxOjI0J4o7BwABHQIRMwXQktC+0LLQsAH0aW4yMDI2LTAzLTA3IDIwOjQxOjI0LYo6BwABKQIRMwXQlNC80LjRgtGA0LjQuQEsaW4yMDI2LTAzLTA3IDIwOjQxOjI0Lo1ABwACKQIRMwEVQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0yNyAxNjo1NToyOSeNPwcAAhsCETMBFUBrb3Zhc3MB9GluMjAyNi0wMy0yNyAxNjo1NToyOSiNPgcAAh0CETMBFUBQcjBrc2lpAfRpbjIwMjYtMDMtMjcgMTY6NTU6MjgqjT0HAAIhAhEzARVAU3plcnVrYWV2AfRpbjIwMjYtMDMtMjcgMTY6NTU6MjgujTwHAAIpAhEzARVAUmFib3R5YWdhMzAwMAH0aW4yMDI2LTAzLTI3IDE2OjU1OjI4LI07BwACJQIRMwEVQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDMtMjcgMTY6NTU6MjgmjToHAAIZAhEzARVTZXJnZXkB9GluMjAyNi0wMy0yNyAxNjo1NToyOCiNOQcAAh0CETMBFdCh0LDQvdGPAfRpbjIwMjYtMDMtMjcgMTY6NTU6MjgujTgHAAIpAhEzARXQndC40LrQvtC70LDQuQH0aW4yMDI2LTAzLTI3IDE2OjU1OjI3KI0vBwACGwITMwDuQGtvdmFzcwPPb3V0MjAyNi0wMy0xMyAyMzoxMDo1OC+NLgcAAikCEzMA7tCd0LjQutC+0LvQsNC5A39vdXQyMDI2LTAzLTEzIDIzOjEwOjU4Lo0tBwACJwITMwDuQFNob29yYUFsaWJhcwH0b3V0MjAyNi0wMy0xMyAyMzoxMDo1OC+NLAcAAikCEzMA7kBSYWJvdHlhZ2EzMDAwAz5vdXQyMDI2LTAzLTEzIDIzOjEwOjU4No0rBwACNwITMwDu0JLQuNGC0LDQu9C40Lou0L3QvtCyDdRvdXQyMDI2LTAzLTEzIDIzOjEwOjU4J40qBwACGQITMwDuU2VyZ2V5DHZvdXQyMDI2LTAzLTEzIDIzOjEwOjU4K40pBwACIQITMwDuQFN6ZXJ1a2FldgR+b3V0MjAyNi0wMy0xMyAyMzoxMDo1NzGNKAcAAi0CEzMA7kBFZ29yVmFnYW5vdjExMTEC0G91dDIwMjYtMDMtMTMgMjM6MTA6NTcojScHAAIdAhEzAO7QodCw0L3RjwPoaW4yMDI2LTAzLTEzIDIzOjEwOjU3LY0mBwACJwIRMwDuQFNob29yYUFsaWJhcwH0aW4yMDI2LTAzLTEzIDIzOjEwOjU3KI0lBwACHQIRMwDu0KHQsNC90Y8B9GluMjAyNi0wMy0xMyAyMzoxMDo1NyqNJAcAAiECETMA7tCU0LjQvNCw0L0D6GluMjAyNi0wMy0xMyAyMzoxMDo1NyqNIwcAAiECETMA7tCU0LjQvNCw0L0B9GluMjAyNi0wMy0xMyAyMzoxMDo1Ny6NIgcAAikCETMA7kBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDMtMTMgMjM6MTA6NTY1jSEHAAI3AhEzAO7QktC40YLQsNC70LjQui7QvdC+0LIB9GluMjAyNi0wMy0xMyAyMzoxMDo1NiqNIAcAAiECETMA7kBTemVydWthZXYB9GluMjAyNi0wMy0xMyAyMzoxMDo1NiqNHwcAAiECETMA7tCU0LjQvNCw0L0B9GluMjAyNi0wMy0xMyAyMzoxMDo1NiaNHgcAAhkCETMA7lNlcmdleQH0aW4yMDI2LTAzLTEzIDIzOjEwOjU2Lo0dBwACKQIRMwDuQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0xMyAyMzoxMDo1NiiNHAcAAh0CETMA7tCh0LDQvdGPAfRpbjIwMjYtMDMtMTMgMjM6MTA6NTYtjRsHAAInAhEzAO5AU2hvb3JhQWxpYmFzAfRpbjIwMjYtMDMtMTMgMjM6MTA6NTYnjRoHAAIbAhEzAO5Aa292YXNzAfRpbjIwMjYtMDMtMTMgMjM6MTA6NTUojRkHAAIdAhEzAO5AUHIwa3NpaQH0aW4yMDI2LTAzLTEzIDIzOjEwOjU1Ko0YBwACIQIRMwDuQFN6ZXJ1a2FldgH0aW4yMDI2LTAzLTEzIDIzOjEwOjU1KI0XBwACHQIRMwDu0KHQsNC90Y8B9GluMjAyNi0wMy0xMyAyMzoxMDo1NTCNFgcAAi0CETMA7kBFZ29yVmFnYW5vdjExMTEB9GluMjAyNi0wMy0xMyAyMzoxMDo1NTWNFQcAAjcCETMA7tCS0LjRgtCw0LvQuNC6LtC90L7QsgH0aW4yMDI2LTAzLTEzIDIzOjEwOjU1L4pZBwACKQITMwCB0J3QuNC60L7Qu9Cw0LkNXG91dDIwMjYtMDMtMDggMTU6NTk6MzYpilgHAAIdAhMzAIHQmNCy0LDQvQETb3V0MjAyNi0wMy0wOCAxNTo1OTozNi2KVwcAAiUCEzMAgUBMb3RoYXJfVWdhcgVGb3V0MjAyNi0wMy0wOCAxNTo1OTozNi6KVgcAAikCETMAgUBSYWJvdHlhZ2EzMDAwAfRpbjIwMjYtMDMtMDggMTU6NTk6MzUoilUHAAIdAhEzAIHQodCw0L3RjwH0aW4yMDI2LTAzLTA4IDE1OjU5OjM1LopUBwACKQIRMwCBQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0wOCAxNTo1OTozNSiKUwcAAh0CETMAgdCh0LDQvdGPAfRpbjIwMjYtMDMtMDggMTU6NTk6MzUoilIHAAIdAhEzAIHQotC10LzQsAH0aW4yMDI2LTAzLTA4IDE1OjU5OjM1J4pRBwACGwIRMwCBQGtvdmFzcwH0aW4yMDI2LTAzLTA4IDE1OjU5OjM1LIpQBwACJQIRMwCBQExvdGhhcl9VZ2FyAfRpbjIwMjYtMDMtMDggMTU6NTk6MzUoik8HAAIdAhEzAIHQmNCy0LDQvQH0aW4yMDI2LTAzLTA4IDE1OjU5OjM1LopOBwACKQIRMwCBQFJhYm90eWFnYTMwMDAB9GluMjAyNi0wMy0wOCAxNTo1OTozNC6KTQcAAikCETMAgdCd0LjQutC+0LvQsNC5AfRpbjIwMjYtMDMtMDggMTU6NTk6MzQuikwHAAEpAhMzBUBSYWJvdHlhZ2EzMDAwAcxvdXQyMDI2LTAzLTA3IDIwOjQxOjI2KopLBwABIQITMwXQndCw0LfQsNGACDRvdXQyMDI2LTAzLTA3IDIwOjQxOjI2KopKBwABIQITMwXQlNC40LzQsNC9BRRvdXQyMDI2LTAzLTA3IDIwOjQxOjI2J4pJBwABGwITMwVAa292YXNzCKJvdXQyMDI2LTAzLTA3IDIwOjQxOjI2MIpIBwABLQITMwVARWdvclZhZ2Fub3YxMTExAjJvdXQyMDI2LTAzLTA3IDIwOjQxOjI2KIpHBwABHQITMwXQmNCy0LDQvQLBb3V0MjAyNi0wMy0wNyAyMDo0MToyNimKRgcAASECETMF0J3QsNC30LDRgAH0aW4yMDI2LTAzLTA3IDIwOjQxOjI1J4pFBwABHQIRMwXQodCw0L3RjwH0aW4yMDI2LTAzLTA3IDIwOjQxOjI1LYpEBwABKQIRMwXQlNC80LjRgtGA0LjQuQDIaW4yMDI2LTAzLTA3IDIwOjQxOjI1LYpDBwABKQIRMwXQlNC80LjRgtGA0LjQuQDIaW4yMDI2LTAzLTA3IDIwOjQxOjI1KYpCBwABIQIRMwXQlNC40LzQsNC9ASxpbjIwMjYtMDMtMDcgMjA6NDE6MjUnikEHAAEdAhEzBdCS0L7QstCwAfRpbjIwMjYtMDMtMDcgMjA6NDE6MjUnikAHAAEdAhEzBdCS0L7QstCwAfRpbjIwMjYtMDMtMDcgMjA6NDE6MjUnij8HAAEdAhEzBdCS0L7QstCwAfRpbjIwMjYtMDMtMDcgMjA6NDE6MjQnij4HAAEdAhEzBdCh0LDQvdGPAfRpbjIwMjYtMDMtMDcgMjA6NDE6MjQpij0HAAEhAhEzBdCU0LjQvNCw0L0B9GluMjAyNi0wMy0wNyAyMDo0MToyNA0AAABVALoAD9IPpA92D0gPGg7sDr4OkA5iDjQOBg3YDaoNfA1ODSAM8gzEDJYMaAw6DAwL3guwC4ILVAsmCvgKygqcCm4KQAoSCeQJtgmICVoJLAj+CNAIogh0CEYIGAfqB7wHjgdgBzIHBAbWBqgGegZMBh4F8AXCBZQFZgU4BQoE3ASuBIAEUgQkA/YDyAOaA2wDPgMQAuICtAKGAlgCKgH8Ac4BoAFyAUQBFgDoALoAAAAAAAAAACuCBwYABQIhM/8WltnIpgq1MjAyNi0wMy0yNzIwMjYtMDMtMjcgMDc6NDQ6MjArggYGAAUCITP/FpbZyKYKtDIwMjYtMDMtMjcyMDI2LTAzLTI3IDA3OjQ0OjIwK4IFBgAFAiEz/xaW2cimCqIyMDI2LTAzLTE4MjAyNi0wMy0xOCAxMDo1NzowOSuCBAYABQIhM/8WltnIpgqhMjAyNi0wMy0xODIwMjYtMDMtMTggMTA6NTY6NTIrggMGAAUCITP/FpbZyKYKoDIwMjYtMDMtMTgyMDI2LTAzLTE4IDEwOjUzOjQ5K4ICBgAFAiEz/xaW2cimCp8yMDI2LTAzLTE4MjAyNi0wMy0xOCAxMDo1MzoyMCuCAQYABQIhM/8WltnIpgqeMjAyNi0wMy0xODIwMjYtMDMtMTggMTA6Mzc6MzMrggAGAAUCITP/FpbZyKYKnTIwMjYtMDMtMTgyMDI2LTAzLTE4IDEwOjM3OjMzK4F/BgAFAiEz/xaW2cimCpgyMDI2LTAzLTE4MjAyNi0wMy0xOCAxMDozNTo1OSuBfgYABQIhM/8WltnIpgqXMjAyNi0wMy0xODIwMjYtMDMtMTggMTA6MzU6NTkrgX0GAAUCITP/FpbZyKYKljIwMjYtMDMtMTgyMDI2LTAzLTE4IDEwOjM1OjU5K4F8BgAFAiEz/xaW2cimCpUyMDI2LTAzLTE4MjAyNi0wMy0xOCAxMDozNTo1OSuBewYABQIhM/8WltnIpgqOMjAyNi0wMy0xNzIwMjYtMDMtMTcgMDg6MDU6MDIrgXoGAAUCITP/FpbZyKYKjTIwMjYtMDMtMTcyMDI2LTAzLTE3IDA3OjU2OjU5K4F5BgAFAiEz/xaW2cimCowyMDI2LTAzLTE3MjAyNi0wMy0xNyAwNzo1MjoyOSuBeAYABQIhM/8WltnIpgqLMjAyNi0wMy0xNzIwMjYtMDMtMTcgMDc6NTI6MjkrgXcGAAUCITP/FpbZyKYKijIwMjYtMDMtMTcyMDI2LTAzLTE3IDA3OjUyOjI0K4F2BgAFAiEz/xaW2cimCokyMDI2LTAzLTE3MjAyNi0wMy0xNyAwNzo0NDozMiuBdQYABQIhM/8WltnIpgqHMjAyNi0wMy0xNzIwMjYtMDMtMTcgMDc6MDc6MzUrgXQGAAUCITP/FpbZyKYKhjIwMjYtMDMtMTcyMDI2LTAzLTE3IDA3OjA1OjQ0K4FzBgAFAiEz/xaW2cimCoEyMDI2LTAzLTE0MjAyNi0wMy0xNCAxMzoxMDowMSuBcgYABQIhM/8WltnIpgqAMjAyNi0wMy0xNDIwMjYtMDMtMTQgMTM6MDk6MTkrgXAGAAUCITP/FpbZyKYKYTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE5OjM4OjM5K4FvBgAFAiEz/xaW2cimCl8yMDI2LTAzLTEzMjAyNi0wMy0xMyAxOToyNjowMSuBbgYABQIhM/8WltnIpgpWMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTc6MzM6MDYrgW0GAAUCITP/FpbZyKYKVTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjI1OjEyK4FsBgAFAiEz/xaW2cimClQyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoyNTowNCuBawYABQIhM/8WltnIpgpTMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MjI6MjIrgWoGAAUCITP/FpbZyKYKUjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjIxOjQxK4FpBgAFAiEz/xaW2cimClAyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoyMDoxMyuBaAYABQIhM/8WltnIpgpPMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MjA6MDErgWcGAAUCITP/FpbZyKYKTjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE4OjM5K4FmBgAFAiEz/xaW2cimCk0yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxODozNSuBZQYABQIhM/8WltnIpgpMMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTg6MjUrgWQGAAUCITP/FpbZyKYKSzIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE4OjIxK4FjBgAFAiEz/xaW2cimCkoyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxODowOSuBYgYABQIhM/8WltnIpgpJMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTc6NTMrgWEGAAUCITP/FpbZyKYKSDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE3OjMzK4FgBgAFAiEz/xaW2cimCkYyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxNzowNiuBXwYABQIhM/8WltnIpgpFMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTY6NTMrgV4GAAUCITP/FpbZyKYKRDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE2OjM2K4FdBgAFAiEz/xaW2cimCkMyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxNjoxNSuBXAYABQIhM/8WltnIpgpCMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTY6MDkrgVsGAAUCITP/FpbZyKYKQTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE1OjQ3K4FaBgAFAiEz/xaW2cimCkAyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxNToyMSuBWQYABQIhM/8WltnIpgo/MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTU6MDcrgVgGAAUCITP/FpbZyKYKPjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjE0OjUxK4FXBgAFAiEz/xaW2cimCj0yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxNDo0MSuBVgYABQIhM/8WltnIpgo8MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTI6NTcrgVUGAAUCITP/FpbZyKYKOzIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjEyOjE1K4FUBgAFAiEz/xaW2cimCjoyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxMjowNiuBUwYABQIhM/8WltnIpgo5MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTE6NDkrgVIGAAUCITP/FpbZyKYKODIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjExOjI5K4FRBgAFAiEz/xaW2cimCjcyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjoxMDo0NSuBUAYABQIhM/8WltnIpgo2MjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MTA6MzgrgU8GAAUCITP/FpbZyKYKNTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjA5OjU1K4FOBgAFAiEz/xaW2cimCjQyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjowOTozMyuBTQYABQIhM/8WltnIpgozMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MDk6MjUrgUwGAAUCITP/FpbZyKYKMjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjA4OjUwK4FLBgAFAiEz/xaW2cimCjEyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjowODo0NCuBSgYABQIhM/8WltnIpgowMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MDg6MzkrgUkGAAUCITP/FpbZyKYKLzIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjA4OjMwK4FIBgAFAiEz/xaW2cimCi4yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjowODowMSuBRwYABQIhM/8WltnIpgotMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MDY6MDkrgUYGAAUCITP/FpbZyKYKLDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE2OjAzOjAzK4FFBgAFAiEz/xaW2cimCisyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNjowMjoyNyuBRAYABQIhM/8WltnIpgoqMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTY6MDE6NDcrgUMGAAUCITP/FpbZyKYKKTIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjQ5OjEzK4FCBgAFAiEz/xaW2cimCigyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTo0Nzo1NSuBQQYABQIhM/8WltnIpgomMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6NDc6MzkrgUAGAAUCITP/FpbZyKYKJDIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjQ3OjE0K4E/BgAFAiEz/xaW2cimCiMyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTo0Njo0NiuBPgYABQIhM/8WltnIpgoiMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6NDY6MjkrgT0GAAUCITP/FpbZyKYKITIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjQ1OjU5K4E8BgAFAiEz/xaW2cimCiAyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTo0NTo1MiuBOwYABQIhM/8WltnIpgofMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6NDU6MzQrgToGAAUCITP/FpbZyKYKHjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjQ1OjAyK4E5BgAFAiEz/xaW2cimCh0yMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTo0NDozOSuBOAYABQIhM/8WltnIpgocMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6NDQ6MDMrgTcGAAUCITP/FpbZyKYKGjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjQyOjU3K4E2BgAFAiEz/xaW2cimChkyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTo0MjoyMCuBNQYABQIhM/8WltnIpgoXMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6NDA6MDYrgTQGAAUCITP/FpbZyKYKFjIwMjYtMDMtMTMyMDI2LTAzLTEzIDE1OjM5OjU0K4EzBgAFAiEz/xaW2cimChUyMDI2LTAzLTEzMjAyNi0wMy0xMyAxNTozNDowOSuBMgYABQIhM/8WltnIpgoTMjAyNi0wMy0xMzIwMjYtMDMtMTMgMTU6MzI6NTANAAAAEA0hAA/SD6QPdg9IDxoO7A6+DpAOYg40DgYN2A2qDXwNTg0hAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwCAzkzMDAyX21pZ3JhdGVfdXNlcl9zdGF0czIwMjYtMDMtMjggMTQ6NDQ6MzMoAQMxMzAwMV9pbml0aWFsX3NjaGVtYTIwMjYtMDMtMjggMTQ6NDQ6MzMKAAAAAg/PAA/qD88AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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nAYDAQILAJsGAwECCwCaBgMBAgsAmQYDAQILAJgGAwECCwCXBgMBAgoAlgYDAQIKAJUGAwECCgCUBgMBAgoAkwYDAQIKAJIGAwECCgCRBgMBAgoAkAYDAQIKAI8GAwECCgCOBgMBAgoAjQYDAQIKAIwGAwECCgCLBgMBAgoAigYDAQIFBUwGAwECBQVLBgMBAgUFSgYDAQIFBUkGAwECBQVIBgMBAgUFRwYDAQIFBUYGAwECBQVFBgMBAgUFRAYDAQIFBUMGAwECBQVCBgMBAgUFQQYDAQIFBUAGAwECBQU/BgMBAgUFPgYDAQIFBT0GAwECBQU8BgMBAgUFOwYDAQIFBToGAwECBQU5BgMBAgUFOAYDAQIFBTcGAwECBQU2BgMBAgUFNQYDAQIFBTQGAwECBQUzBgMBAgUFMgUDAQEEPwUDAQEEPgUDAQEEPQUDAQEEPAUDAQEEOwUDAQEEOgUDAQEEOQUDAQEEOAUDAQEENwUDAQEENgUDAQEENQUDAQEENAUDAQEEMwUDAQEEMgUDAQEEMQUDAQEEMAUDAQEELwUDAQEDLgUDAQEDLQUDAQEDLAUDAQEDKwUDAQEDKgUDAQEDKQUDAQEDKAUDAQEDJwUDAQEDJgUDAQEDJQUDAQEDJAUDAQEDIwUDAQEDIgUDAQEDIQUDAQECbgUDAQECbQUDAQECbAUDAQECawUDAQECagUDAQECaQUDAQECaAUDAQECZwUDAQECZgUDAQECZQUDAQECZAUDAQECYwUDAQECYgUDAQECYQUDAQECYAUDAQECXwUDAQECXgUDAQECXQUDAQECXAUDAQECWwUDCQIDigUDCQIDiQUDCQIDiAUDCQIDhwUDCQIDhgUDCQIDhQUDCQIDhAUDCQIDgwUDCQIDggUDCQIDgQUDCQIDgAUAAAAaBgMBAi0CQgoAAAHMA6wAD/oP9A/uD+gP4g/cD9YP0A/KD8QPvg+4D7IPrA+mD6APmg+UD44PiA+CD3wPdg9wD2oPZA9eD1gPUg9MD0YPQA86DzQPLg8oDyIPHA8WDxAPCg8EDv4O+A7yDuwO5g7gDtoO1A7ODsgOwg68DrYOsA6qDqQOng6YDpIOjA6GDoAOeQ5yDmsOZA5dDlYOTw5IDkEOOg4zDiwOJQ4eDhcOEA4JDgIN+w30De0N5g3fDdgN0Q3KDcMNvA21Da4Npw2gDZkNkg2LDYQNfQ12DW8NaA1hDVoNUw1MDUUNPg03DTANKQ0iDRsNFA0NDQYM/wz4DPEM6gzjDNwM1QzODMcMwAy5DLIMqwykDJ0MlgyPDIgMgQx6DHMMbAxlDF4MVwxQDEkMQgw7DDQMLQwmDB8MGAwRDAoMAwv8C/UL7gvnC+AL2QvSC8sLxAu9C7YLrwuoC6ELmguTC4wLhQt+C3cLcAtpC2ILWwtUC00LRgs/CzgLMQsqCyMLHAsVCw4LBwsACvkK8grrCuQK3QrWCs8KyArBCroKswqsCqUKngqXCpAKiQqCCnsKdAptCmYKXwpYClEKSgpDCjwKNQouCicKIAoZChIKCwoECf0J9gnvCegJ4QnaCdMJzAnFCb4JtwmwCakJogmbCZQJjQmGCX8JeAlxCWoJYwlcCVUJTglHCUAJOQkyCSsJJAkdCRYJDwkICQEI+gjzCOwI5QjeCNcI0AjJCMIIuwi0CK0IpgifCJgIkQiKCIMIfAh1CG4IZwhgCFkIUghLCEQIPQg2CC8IKAghCBoIEwgMCAUH/gf3B/AH6QfiB9sH1AfNB8YHvwe4B7EHqgejB5wHlQeOB4cHgAd5B3IHawdkB10HVgdPB0gHQQc6BzMHLAclBx4HFwcQBwkHAgb7BvQG7QbmBt8G2AbRBsoGwwa8BrUGrganBqAGmQaSBosGhAZ9BnYGbwZoBmEGWgZTBkwGRQY+BjcGMAYpBiIGGwYUBg0GBgX/BfgF8QXqBeMF3AXVBc4FxwXABbkFsgWrBaQFnQWWBY8FiAWBBXoFcwVsBWUFXgVXBVAFSQVCBTsFNAUtBSYFHwUYBREFCgUDBPwE9QTuBOcE4ATZBNIEywTEBL0EtgSvBKgEoQSaBJMEjASFBH4EdwRwBGkEYgRbBFQETQRGBD8EOAQxBCoEIwQcBBUEDgQHBAAD+QPyA+sD5APdA9YDzwPIA8EDugOzA6wDpQAAAAYDAQItAkIGAwECLQJBBgMBAi0CQAYDAQItAj8GAwECLQI+BgMBAi0CPQYDAQItAjwGAwECLQI7BgMBAi0COgYDAQItAjkGAwECLQI4BgMBAi0CNwYDAQItAjYGAwECLQI1BgMBAi0CNAYDAQItAjMGAwECLQIyBgMBAiwCMQYDAQIsAjAGAwECLAIvBgMBAiwCLgYDAQIsAi0GAwECLAIsBgMBAiwC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BDEFAwEBBDAFAwEBBC8FAwEBAy4FAwEBAy0FAwEBAywFAwEBAysFAwEBAyoFAwEBAykFAwEBAygFAwEBAycFAwEBAyYFAwEBAyUFAwEBAyQFAwEBAyMFAwEBAyIFAwEBAyEFAwEBAm4FAwEBAm0FAwEBAmwFAwEBAmsFAwEBAmoFAwEBAmkFAwEBAmgFAwEBAmcFAwEBAmYFAwEBAmUFAwEBAmQFAwEBAmMFAwEBAmIFAwEBAmEFAwEBAmAFAwEBAl8FAwEBAl4FAwEBAl0FAwEBAlwFAwEBAlsFAwkCA4oFAwkCA4kFAwkCA4gFAwkCA4cFAwkCA4YFAwkCA4UFAwkCA4QFAwkCA4MFAwkCA4IFAwkCA4EFAwkCA4AFAwkCA38FAwkCA34KAAABmwRbAA/5D/IP6w/kD90P1g/PD8gPwQ+6D7MPrA+lD54Plw+QD4kPgg97D3QPbQ9mD18PWA9RD0oPQw88DzUPLg8nDyAPGQ8SDwsPBA79DvYO7w7oDuEO2g7TDswOxQ6+DrcOsA6pDqIOmw6UDo0Ohg5/DngOcQ5qDmMOXA5VDk4ORw5ADjkOMg4rDiQOHQ4WDg8OCA4BDfoN8w3sDeUN3g3XDdANyQ3CDbsNtA2tDaYNnw2YDZENig2DDXwNdQ1uDWcNYA1ZDVINSw1EDT0NNg0vDSgNIQ0aDRMNDA0FDP4M9wzwDOkM4gzbDNQMzQzGDL8MuAyxDKoMowycDJUMjgyHDIAMeQxyDGsMZAxdDFYMTwxIDEEMOgwzDCwMJQweDBcMEAwJDAIL+wv0C+0L5gvfC9gL0QvKC8MLvAu1C64LpwugC5kLkguLC4QLfQt2C28LaAthC1oLUwtMC0ULPgs3CzALKQsiCxsLFAsNCwYK/wr4CvEK6grjCtwK1QrOCscKwAq5CrIKqwqkCp0KlgqPCogKgQp6CnMKbAplCl4KVwpQCkkKQgo7CjQKLQomCh8KGAoRCgoKAwn8CfUJ7gnnCeAJ2QnSCcsJxAm9CbYJrwmoCaEJmgmTCYwJhQl+CXcJcAlpCWIJWwlUCU0JRgk/CTgJMQkqCSMJHAkVCQ4JBwkACPkI8gjrCOQI3QjWCM8IyAjBCLoIswisCKUIngiXCJAIiQiCCHsIdAhtCGYIXwhYCFEISghDCDwINQguCCcIIAgZCBIICwgEB/0H9gfvB+gH4Qfa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MDMtMTMAlg8DIQIyMDI2LTAzLTEzAJUPAyECMjAyNi0wMy0xMwCUDwMhAjIwMjYtMDMtMTMAkw8DIQIyMDI2LTAzLTEzAJIPAyECMjAyNi0wMy0xMwCRDwMhAjIwMjYtMDMtMTMAkA8DIQIyMDI2LTAzLTEzAI8PAyECMjAyNi0wMy0xMwCODwMhAjIwMjYtMDMtMTMAjQ8DIQIyMDI2LTAzLTEzAIwPAyECMjAyNi0wMy0xMwCLDwMhAjIwMjYtMDMtMTMAig8DIQIyMDI2LTAzLTEzAIkPAyECMjAyNi0wMy0xMwCIDwMhAjIwMjYtMDMtMTMAhw8DIQIyMDI2LTAzLTEzAIYPAyECMjAyNi0wMy0xMwCFDwMhAjIwMjYtMDMtMTMAhA8DIQIyMDI2LTAzLTEzAIMPAyECMjAyNi0wMy0xMwCCDwMhAjIwMjYtMDMtMDcAgQ8DIQIyMDI2LTAzLTA3AIAOAyEBMjAyNi0wMy0wN38OAyEBMjAyNi0wMy0wN34OAyEBMjAyNi0wMy0wN30OAyEBMjAyNi0wMy0wN3wOAyEBMjAyNi0wMy0wN3sOAyEBMjAyNi0wMy0wN3oOAyEBMjAyNi0wMy0wN3kOAyEBMjAyNi0wMy0wN3gOAyEBMjAyNi0wMy0wN3cOAyEBMjAyNi0wMy0wN3YOAyEBMjAyNi0wMy0wN3UOAyEBMjAyNi0wMy0wN3QOAyEBMjAyNi0wMy0wN3MOAyEBMjAyNi0wMy0wN3IOAyEBMjAyNi0wMy0wN3EOAyEBMjAyNi0wMy0wN3AOAyEBMjAyNi0wMy0wN28OAyEBMjAyNi0wMy0wN24OAyEBMjAyNi0wMy0wN20OAyEBMjAyNi0wMy0wN2wOAyEBMjAyNi0wMi0yNGsOAyEBMjAyNi0wMi0yNGoOAyEBMjAyNi0wMi0yNGkOAyEBMjAyNi0wMi0yNGgOAyEBMjAyNi0wMi0yNGcOAyEBMjAyNi0wMi0yM2YOAyEBMjAyNi0wMi0yM2UOAyEBMjAyNi0wMi0yM2QOAyEBMjAyNi0wMi0yM2MOAyEBMjAyNi0wMi0yM2IOAyEBMjAyNi0wMi0yM2EOAyEBMjAyNi0wMi0yM2AOAyEBMjAyNi0wMi0yM18OAyEBMjAyNi0wMi0yM14OAyEBMjAyNi0wMi0yM10OAyEBMjAyNi0wMi0yM1wOAyEBMjAyNi0wMi0yM1sOAyEBMjAyNi0wMi0yM1oOAyEBMjAyNi0wMi0yM1kOAyEBMjAyNi0wMi0yM1gOAyEBMjAyNi0wMi0yM1cOAyEBMjAyNi0wMi0yM1YOAyEBMjAyNi0wMi0yM1UOAyEBMjAyNi0wMi0yM1QOAyEBMjAyNi0wMi0yM1MOAyEBMjAyNi0wMi0yM1IOAyEBMjAyNi0wMi0yM1EOAyEBMjAyNi0wMi0yM1AOAyEBMjAyNi0wMi0yM08OAyEBMjAyNi0wMi0yM04OAyEBMjAyNi0wMi0yM00OAyEBMjAyNi0wMi0yM0wOAyEBMjAyNi0wMi0yM0sOAyEBMjAyNi0wMi0yM0oOAyEBMjAyNi0wMi0yM0kOAyEBMjAyNi0wMi0yM0gOAyEBMjAyNi0wMi0yM0cOAyEBMjAyNi0wMi0yM0YOAyEBMjAyNi0wMi0yM0UOAyEBMjAyNi0wMi0yM0QOAyEBMjAyNi0wMi0yM0MOAyEBMjAyNi0wMi0yM0IOAyEBMjAyNi0wMi0yM0EOAyEBMjAyNi0wMi0yM0AOAyEBMjAyNi0wMi0yMz8OAyEBMjAyNi0wMi0yMz4OAyEBMjAyNi0wMi0yMz0OAyEBMjAyNi0wMi0yMzwOAyEBMjAyNi0wMi0yMzsOAyEBMjAyNi0wMi0yMzoOAyEBMjAyNi0wMi0yMzkOAyEBMjAyNi0wMi0xNhwOAyEBMjAyNi0wMi0xNhoOAyEBMjAyNi0wMi0xNhkOAyEBMjAyNi0wMi0xNhcOAyEBMjAyNi0wMi0xNhUOAyEBMjAyNi0wMi0xNg8OAyEBMjAyNi0wMi0xNg0OAyEBMjAyNi0wMi0xNgkOAyEBMjAyNi0wMi0xNggOAyEBMjAyNi0wMi0xNgcOAyEBMjAyNi0wMi0xNgYNAyEJMjAyNi0wMi0xNA4DIQEyMDI2LTAxLTI5Ag4DIQEyMDI2LTAxLTA5Aw4DIQEyMDI1LTEyLTI4BA4DIQEyMDI1LTExLTIyBQ4DIQEyMDI1LTExLTA4Cg4DIQEyMDI1LTExLTAxCw4DIQEyMDI1LTEwLTA0DA4DIQEyMDI1LTA5LTIwDg4DIQEyMDI1LTA5LTEzEA4DIQEyMDI1LTA5LTA1EQ4DIQEyMDI1LTA4LTA2Eg4DIQEyMDI1LTA3LTEyFA4DIQEyMDI1LTA3LTA5Fg4D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D7APoA+QD4APcA9gD1APQA8wDyAPEA8ADvAO4A7QDsAOsA6gDpAOgA5wDmAOUA5ADjAOIA4QDgAN8A3gDdANwA2wDaANkA2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAyECMjAyNi0wMy0yOAEXDwMhAjIwMjYtMDMtMjcBFg8DIQIyMDI2LTAzLTI3ARUPAyECMjAyNi0wMy0yNwEUDwMhAjIwMjYtMDMtMjcBEw8DIQIyMDI2LTAzLTI3ARIPAyECMjAyNi0wMy0yNwERDwMhAjIwMjYtMDMtMjcBEA8DIQIyMDI2LTAzLTI3AQ8PAyECMjAyNi0wMy0yNwEODwMhAjIwMjYtMDMtMjcBDQ8DIQIyMDI2LTAzLTI3AQwPAyECMjAyNi0wMy0yNwELDwMhAjIwMjYtMDMtMjcBCg8DIQIyMDI2LTAzLTI3AQkPAyECMjAyNi0wMy0yNwEIDwMhAjIwMjYtMDMtMjcBBw8DIQIyMDI2LTAzLTI3AQYPAyECMjAyNi0wMy0xOAEFDwMhAjIwMjYtMDMtMTgBBA8DIQIyMDI2LTAzLTE4AQMPAyECMjAyNi0wMy0xOAECDwMhAjIwMjYtMDMtMTgBAQ8DIQIyMDI2LTAzLTE4AQAPAyECMjAyNi0wMy0xOAD/DwMhAjIwMjYtMDMtMTgA/g8DIQIyMDI2LTAzLTE4AP0PAyECMjAyNi0wMy0xOAD8DwMhAjIwMjYtMDMtMTcA+w8DIQIyMDI2LTAzLTE3APoPAyECMjAyNi0wMy0xNwD5DwMhAjIwMjYtMDMtMTcA+A8DIQIyMDI2LTAzLTE3APcPAyECMjAyNi0wMy0xNwD2DwMhAjIwMjYtMDMtMTcA9Q8DIQIyMDI2LTAzLTE3APQPAyECMjAyNi0wMy0xNADzDwMhAjIwMjYtMDMtMTQA8g8DIQIyMDI2LTAzLTEzAPAPAyECMjAyNi0wMy0xMwDv
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
      - NODE_ENV=production
    volumes:
      - ./data:/app/data

```

// Dockerfile (base64, size: 1334, mtime: 2026-03-31T18:45:27.005Z, md5: 6bf36afb87d34a6831ee7566a3dae1ab)

```
IyAtLS0tINCt0YLQsNC/INGB0LHQvtGA0LrQuCAo0LrQvtC80L/QuNC70Y/RhtC40Y8gVHlwZVNjcmlwdCkgLS0tLQpGUk9NIG5vZGU6MTggQVMgYmFja2VuZC1idWlsZGVyCldPUktESVIgL2FwcC9iYWNrZW5kCkNPUFkgYmFja2VuZC9wYWNrYWdlKi5qc29uIC4vClJVTiBucG0gY2kKQ09QWSBiYWNrZW5kLyAuLwpSVU4gbnBtIHJ1biBidWlsZAoKIyAtLS0tINCt0YLQsNC/INC00LvRjyBwcm9kdWN0aW9u4oCR0LfQsNCy0LjRgdC40LzQvtGB0YLQtdC5ICjQsdC10LcgZGV2KSAtLS0tCkZST00gbm9kZToxOCBBUyBiYWNrZW5kLWRlcHMKV09SS0RJUiAvYXBwL2JhY2tlbmQKQ09QWSBiYWNrZW5kL3BhY2thZ2UqLmpzb24gLi8KUlVOIG5wbSBjaSAtLW9taXQ9ZGV2CgojIC0tLS0g0KTQuNC90LDQu9GM0L3Ri9C5INC+0LHRgNCw0LcgLS0tLQpGUk9NIG5vZGU6MTgtc2xpbQpXT1JLRElSIC9hcHAKCiMg0KHQuNGB0YLQtdC80L3Ri9C1INC30LDQstC40YHQuNC80L7RgdGC0Lgg0LTQu9GPINGB0LHQvtGA0LrQuCDQvdCw0YLQuNCy0L3Ri9GFINC80L7QtNGD0LvQtdC5IChzcWxpdGUzKQpSVU4gYXB0LWdldCB1cGRhdGUgJiYgYXB0LWdldCBpbnN0YWxsIC15IHB5dGhvbjMgbWFrZSBnKysgJiYgcm0gLXJmIC92YXIvbGliL2FwdC9saXN0cy8qCgojINCa0L7Qv9C40YDRg9C10LwgcHJvZHVjdGlvbuKAkdC30LDQstC40YHQuNC80L7RgdGC0LgKQ09QWSAtLWZyb209YmFja2VuZC1kZXBzIC9hcHAvYmFja2VuZC9ub2RlX21vZHVsZXMgLi9ub2RlX21vZHVsZXMKIyDQmtC+0L/QuNGA0YPQtdC8INGB0LrQvtC80L/QuNC70LjRgNC+0LLQsNC90L3Ri9C1INGE0LDQudC70YsKQ09QWSAtLWZyb209YmFja2VuZC1idWlsZGVyIC9hcHAvYmFja2VuZC9kaXN0IC4vZGlzdAojINCa0L7Qv9C40YDRg9C10LwgcGFja2FnZS5qc29uICjQvdC10L7QsdGP0LfQsNGC0LXQu9GM0L3QvikKQ09QWSAtLWZyb209YmFja2VuZC1idWlsZGVyIC9hcHAvYmFja2VuZC9wYWNrYWdlLmpzb24gLi8KCiMg0KHQvtC30LTQsNGR0LwgdHNjb25maWcuanNvbiDQtNC70Y8g0YDQsNC30YDQtdGI0LXQvdC40Y8g0LDQu9C40LDRgdC+0LIgQC8qClJVTiBlY2hvICd7ICJjb21waWxlck9wdGlvbnMiOiB7ICJiYXNlVXJsIjogIi4iLCAicGF0aHMiOiB7ICJALyoiOiBbImRpc3QvKiJdIH0gfSB9JyA+IC9hcHAvdHNjb25maWcuanNvbgoKIyDQn9Cw0L/QutCwINC00LvRjyDQsdCw0LfRiyDQtNCw0L3QvdGL0YUKVk9MVU1FIFsgIi9hcHAvZGF0YSIgXQoKRVhQT1NFIDMwMDAKCkNNRCBbICJub2RlIiwgIi1yIiwgInRzY29uZmlnLXBhdGhzL3JlZ2lzdGVyIiwgImRpc3QvaW5kZXguanMiIF0=
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

// history.json

```json
[
  {
    "date": "2024-09-07",
    "game": "Вход:\n+300 | @kovass\n+300 | @Lothar_Ugar \n+300 | @Lothar_Ugar \n+300 | @Lothar_Ugar \n+300 | @expignik\nВыход:\n+105 | @expignik \n+1638 | @Rabotyaga3000 \n+900 | @kovass"
  },
  {
    "date": "2024-09-08",
    "game": "Вход:\n+300 | @kovass\n+300 | @Lothar_Ugar \n+300 | @Lothar_Ugar \n+300 | @Lothar_Ugar \n+300 | @expignik\nВыход:\n+105 | @expignik \n+1638 | @Rabotyaga3000 \n+900 | @kovass"
  },
  {
    "date": "2026-01-09",
    "game": "+500 | Тема \n+500 | @Rabotyaga3000 \n+500 | @Lothar_Ugar \n+500 | Саня \n+500 | @ShooraAlibas \n+500 | @EgorVaganov1111 \n+500 | @kovass\n+500 | @Rabotyaga3000\n+500 | @Rabotyaga3000 \n+250 | Саня\nВыход:\n+600 | @kovass\n+520 | @Lothar_Ugar \n+1200 | @EgorVaganov1111 \n+2410 | @ShooraAlibas"
  }
]

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

Дополнительно предоставляет HTTP API для получения статистики, что позволяет интегрировать веб‑интерфейс или другие инструменты.

---

## 🚀 Возможности

- Парсинг сообщений вида `+<сумма> | <ник>` внутри секций `Вход:` и `Выход:`.
- Сохранение каждой транзакции в базе данных SQLite (`better-sqlite3`).
- Подсчёт суммарных входов, выходов и разницы для каждого участника.
- Команды для просмотра статистики прямо в чате.
- Автоматическое удаление ответов бота через 30 секунд (опционально).
- Удаление сообщений пользователей с командами (для чистоты чата).
- Поддержка даты игры (можно указать через `game DD.MM.YYYY` в сообщении).
- HTTP API для получения статистики в формате JSON.
- Гибкая структура кода, разделённая на слои (репозитории, сервисы, обработчики).

---

## 🛠 Технологии

- Node.js + TypeScript
- [Telegraf](https://telegraf.js.org/) — библиотека для Telegram Bot API
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — лёгкая встраиваемая СУБД
- [Express](https://expressjs.com/) — HTTP‑сервер для API
- Docker / Docker Compose — контейнеризация
- React + Vite — веб‑интерфейс (опционально, в отдельной папке `frontend`)

---

## 📦 Быстрый старт

### Требования

- Docker и Docker Compose (на сервере или локально)
- Токен бота от [@BotFather](https://t.me/botfather)

### Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/poker-stats-bot.git
cd poker-stats-bot
```

2. Создайте файл `.env` в корне проекта:

```env
BOT_TOKEN=ваш_токен_бота
# TELEGRAM_API_URL=  # опционально, если используете локальный Telegram API
# API_PORT=3000      # порт для HTTP API, по умолчанию 3000
```

3. Запустите контейнер:

```bash
docker-compose up -d
```

4. Проверьте логи:

```bash
docker-compose logs -f
```

Должны увидеть `Bot started` и `[API] Сервер запущен на порту 3000`.

### Настройка бота в группе

- Добавьте бота в группу.
- Дайте ему права администратора (хотя бы на удаление сообщений, если хотите, чтобы команды удалялись).
- В BotFather отключите Privacy Mode (`/setprivacy` → Disable), чтобы бот видел все сообщения.

---

## 🤖 Команды бота

| Команда         | Описание                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/stats`        | Показать подробную таблицу статистики (входы, выходы, разница). Поддерживает фильтры: `/stats all` (всё время), `/stats 2024` (конкретный год), `/stats` (последний год). |
| `/top`          | Топ‑10 участников по разнице (выход минус вход). Поддерживает те же фильтры, что и `/stats`.                                                                              |
| `/stats_update` | Принудительный пересчёт агрегированной статистики (полезно после ручного изменения БД).                                                                                   |
| `/help`         | Показать справку по командам и формату сообщений.                                                                                                                         |

### Как добавлять данные

Сообщения должны содержать секции `Вход:` и `Выход:` со строками вида `+<сумма> | <ник>`. Комментарии после `//` игнорируются.

**Пример текстового сообщения:**

```
Вход:
+500 | Тема
+700 | @Rabotyaga3000
Выход:
+1840 | @EgorVaganov1111
+290 | @kovass
```

**Пример с указанием даты игры (упоминание бота):**

```
@your_bot game 16.02.2025
Вход:
+500 | Тема
+700 | @Rabotyaga3000
Выход:
+1840 | @EgorVaganov1111
```

**Фото с подписью** также поддерживается (подпись обрабатывается как текст).

**Редактирование сообщения** – если отредактировать сообщение, содержащее данные игры, бот обновит соответствующую запись (удалит старые транзакции и добавит новые).

---

## 🌐 HTTP API

Бот предоставляет REST API для получения статистики. API запускается на порту `3000` (можно изменить через `API_PORT` в `.env`).

### Endpoint

```
GET /api/stats?filter=<all|2024>
```

**Параметры:**

- `filter` (опционально):
  - `all` – статистика за всё время
  - `2024` – статистика за указанный год (YYYY)
  - без параметра – статистика за последний год

**Пример ответа:**

```json
[
  {
    "username": "Тема",
    "total_in": 500,
    "total_out": 3500,
    "games_count": 3
  },
  {
    "username": "@kovass",
    "total_in": 290,
    "total_out": 290,
    "games_count": 1
  }
]
```

Эти данные можно использовать для построения веб‑интерфейса (например, фронтенд в папке `frontend` уже настроен на запрос `/api/stats`).

---

## 📁 Структура проекта

После рефакторинга бэкенд разделён на слои:

```
.
├── backend/
│   ├── src/
│   │   ├── config/           # конфигурация (env)
│   │   ├── db/               # база данных и репозитории
│   │   │   ├── connection.ts
│   │   │   └── repositories/
│   │   │       ├── game.repository.ts
│   │   │       ├── transaction.repository.ts
│   │   │       └── user.repository.ts
│   │   ├── services/         # бизнес-логика
│   │   │   ├── game.service.ts
│   │   │   ├── stats.service.ts
│   │   │   └── parser.service.ts
│   │   ├── telegram/         # обработчики бота
│   │   │   ├── bot.ts
│   │   │   ├── handlers.ts
│   │   │   └── middlewares.ts
│   │   ├── api/              # HTTP‑сервер
│   │   │   ├── server.ts
│   │   │   └── routes/
│   │   │       └── stats.ts
│   │   ├── types/            # общие типы (опционально)
│   │   └── index.ts          # точка входа
│   ├── package.json
│   └── tsconfig.json
├── frontend/                 # React‑приложение (необязательно)
│   ├── src/
│   ├── index.html
│   └── vite.config.ts
├── data/                     # папка с БД (создаётся автоматически)
├── docker-compose.yml
├── Dockerfile
├── .env                      # переменные окружения
└── README.md
```

---

## 🔧 Разработка и модификация

### Локальная разработка бэкенда

1. Установите Node.js 18+.
2. Перейдите в папку `backend` и установите зависимости:

```bash
cd backend
npm install
```

3. Создайте файл `.env` в корне проекта (или в `backend/`) с переменной `BOT_TOKEN`.
4. Запустите в режиме разработки с автоперезапуском:

```bash
npm run dev
```

Сервер запустится, бот будет отвечать на сообщения, API будет доступен на `http://localhost:3000/api/stats`.

### Сборка и запуск в production

```bash
npm run build   # скомпилирует TypeScript в папку dist/
npm start       # запустит скомпилированную версию
```

### Локальная разработка фронтенда

1. Перейдите в папку `frontend`:

```bash
cd frontend
npm install
```

2. Запустите Vite dev‑сервер:

```bash
npm run dev
```

3. Фронтенд будет доступен на `http://localhost:5173` и будет проксировать запросы к `/api` на `http://localhost:3000` (если бэкенд запущен).

---

## 🐳 Контейнеризация

В корне проекта находятся `Dockerfile` и `docker-compose.yml`.

- **Dockerfile** – собирает образ для бэкенда (multistage: сначала сборка, потом запуск).
- **docker-compose.yml** – запускает контейнер бота с монтированием папки `data` для сохранения БД.

Для запуска:

```bash
docker-compose up -d
```

Остановка:

```bash
docker-compose down
```

---

## 🤝 Лицензия

MIT

```

// result.json

```json
{
  "name": "Poker club🃏",
  "type": "public_supergroup",
  "id": 2491492186,
  "messages": [
    {
      "id": -999883036,
      "type": "service",
      "date": "2024-09-07T20:34:43",
      "date_unixtime": "1725730483",
      "actor": "Denis Isaev",
      "actor_id": "user558309471",
      "action": "create_group",
      "title": "Poker club🃏",
      "members": [
        "Denis Isaev",
        "Николай Модин",
        "Николай Гоголев",
        "The Rabotyaga Rabotyaga",
        null,
        "Попов Миша",
        "Шура Алибас",
        "Виталик.нов",
        "Саня Сергеев"
      ],
      "text": "",
      "text_entities": []
    },
    {
      "id": -999883035,
      "type": "service",
      "date": "2024-09-07T20:34:43",
      "date_unixtime": "1725730483",
      "actor": "Denis Isaev",
      "actor_id": "user558309471",
      "action": "edit_group_photo",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 112631,
      "width": 640,
      "height": 640,
      "text": "",
      "text_entities": []
    },
    {
      "id": -999883033,
      "type": "service",
      "date": "2024-09-07T20:37:44",
      "date_unixtime": "1725730664",
      "actor": "Denis Isaev",
      "actor_id": "user558309471",
      "action": "migrate_to_supergroup",
      "text": "",
      "text_entities": []
    },
    {
      "id": 1,
      "type": "service",
      "date": "2024-09-07T20:37:44",
      "date_unixtime": "1725730664",
      "actor": "Poker club🃏",
      "actor_id": "channel2491492186",
      "action": "migrate_from_group",
      "title": "Poker club🃏",
      "text": "",
      "text_entities": []
    },
    {
      "id": 2,
      "type": "message",
      "date": "2024-09-07T20:44:49",
      "date_unixtime": "1725731089",
      "edited": "2024-10-27T11:51:02",
      "edited_unixtime": "1730019062",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 220420,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n4×300\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+105 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+1638 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+900 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n4×300\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+105 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+1638 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+900 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:05:12"
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "type": "message",
      "date": "2024-09-07T23:07:55",
      "date_unixtime": "1725739675",
      "edited": "2025-01-05T11:05:08",
      "edited_unixtime": "1736064308",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "forwarded_from": "Denis Isaev",
      "forwarded_from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 211778,
      "width": 1280,
      "height": 960,
      "text": [
        "Закупка:\n\n10×300\n+300 | Леха\n+300 | Денис\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+400 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+300 | Шурик\n+400 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+400 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+200 | Денис\n+300 | Шурик\n\nВ банке: 6500\n\nОбналичка:\n\n+960 | Леха (",
        {
          "type": "phone",
          "text": "89524464678"
        },
        ")\n+430 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+825 | Влад (",
        {
          "type": "phone",
          "text": "89103991833"
        },
        ")\n+1598 | Никита (",
        {
          "type": "phone",
          "text": "89190020294"
        },
        ")\n+1020 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+770 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | Денис"
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "Закупка:\n\n10×300\n+300 | Леха\n+300 | Денис\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+400 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+300 | Шурик\n+400 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+400 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+200 | Денис\n+300 | Шурик\n\nВ банке: 6500\n\nОбналичка:\n\n+960 | Леха ("
        },
        {
          "type": "phone",
          "text": "89524464678"
        },
        {
          "type": "plain",
          "text": ")\n+430 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+825 | Влад ("
        },
        {
          "type": "phone",
          "text": "89103991833"
        },
        {
          "type": "plain",
          "text": ")\n+1598 | Никита ("
        },
        {
          "type": "phone",
          "text": "89190020294"
        },
        {
          "type": "plain",
          "text": ")\n+1020 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+770 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | Денис"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:05:08"
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "type": "message",
      "date": "2024-09-07T23:26:42",
      "date_unixtime": "1725740802",
      "edited": "2024-09-08T16:58:22",
      "edited_unixtime": "1725803902",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "bold",
          "text": "Игра на кеш:"
        },
        "\n\n",
        {
          "type": "blockquote",
          "text": "1. Перед началом все закупаются в банке (от 300₽) по курсу 1 фишка = 50 копеек, потом в течении игры сумма докупа доступна от 100₽\n2. Игра не ограничена по времени или о количество времени игры можно договориться заранее\n3. Бленды во время игры постоянны (5/10)\n4. Докуп в рамках игры безграничен и не лимитирован\n5. По окончании времени оставшиеся у игроков фишки меняются в банке по курсу\n6. Игрок может в любой момент выйти из за стола и обналичить фишки (вернуться в рамках текущей игры он уже не сможет)",
          "collapsed": false
        },
        ""
      ],
      "text_entities": [
        {
          "type": "bold",
          "text": "Игра на кеш:"
        },
        {
          "type": "plain",
          "text": "\n\n"
        },
        {
          "type": "blockquote",
          "text": "1. Перед началом все закупаются в банке (от 300₽) по курсу 1 фишка = 50 копеек, потом в течении игры сумма докупа доступна от 100₽\n2. Игра не ограничена по времени или о количество времени игры можно договориться заранее\n3. Бленды во время игры постоянны (5/10)\n4. Докуп в рамках игры безграничен и не лимитирован\n5. По окончании времени оставшиеся у игроков фишки меняются в банке по курсу\n6. Игрок может в любой момент выйти из за стола и обналичить фишки (вернуться в рамках текущей игры он уже не сможет)",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 37,
      "type": "message",
      "date": "2024-09-14T20:32:08",
      "date_unixtime": "1726335128",
      "edited": "2025-01-05T11:05:04",
      "edited_unixtime": "1736064304",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 228488,
      "width": 1280,
      "height": 960,
      "text": [
        "Вход:\n+300 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня\n+300 |",
          "user_id": 1549105511
        },
        " ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+600 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+900 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " (",
        {
          "type": "phone",
          "text": "89043976864"
        },
        ")\n+1015 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+520 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+330 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " (",
        {
          "type": "phone",
          "text": "89307492383"
        },
        ")\n+660 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+775 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "Вход:\n+300 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня\n+300 |",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+600 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+900 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89043976864"
        },
        {
          "type": "plain",
          "text": ")\n+1015 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+520 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+330 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89307492383"
        },
        {
          "type": "plain",
          "text": ")\n+660 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+775 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:05:04"
            }
          ]
        }
      ]
    },
    {
      "id": 79,
      "type": "message",
      "date": "2024-09-20T22:11:23",
      "date_unixtime": "1726859483",
      "edited": "2024-10-27T11:54:10",
      "edited_unixtime": "1730019250",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 173806,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | Шурик \n+300 | Никитос (",
        {
          "type": "phone",
          "text": "89190020294"
        },
        ") \n+300 | Димон \n+300 | ",
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        "  \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | Шурик (",
        {
          "type": "phone",
          "text": "89867685611"
        },
        ")\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+600 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | Димон (",
        {
          "type": "phone",
          "text": "89867630416"
        },
        ")\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | Димон\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | Димон\n+200 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | Шурик\n+300 | Шурик\n+300 | Никитос\n+300 | Никитос\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+580 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+1572 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+307 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+1012 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+785 | Димон\n+790 | ",
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        "  (",
        {
          "type": "phone",
          "text": "89873942978"
        },
        ")\n+2954 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | Шурик \n+300 | Никитос ("
        },
        {
          "type": "phone",
          "text": "89190020294"
        },
        {
          "type": "plain",
          "text": ") \n+300 | Димон \n+300 | "
        },
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        {
          "type": "plain",
          "text": "  \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | Шурик ("
        },
        {
          "type": "phone",
          "text": "89867685611"
        },
        {
          "type": "plain",
          "text": ")\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+600 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | Димон ("
        },
        {
          "type": "phone",
          "text": "89867630416"
        },
        {
          "type": "plain",
          "text": ")\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | Димон\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | Димон\n+200 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | Шурик\n+300 | Шурик\n+300 | Никитос\n+300 | Никитос\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+580 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+1572 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+307 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+1012 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+785 | Димон\n+790 | "
        },
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        {
          "type": "plain",
          "text": "  ("
        },
        {
          "type": "phone",
          "text": "89873942978"
        },
        {
          "type": "plain",
          "text": ")\n+2954 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:59"
            }
          ]
        },
        {
          "type": "emoji",
          "count": 1,
          "emoji": "👍",
          "recent": [
            {
              "from": "Александр",
              "from_id": "user1549105511",
              "date": "2024-09-21T03:47:14"
            }
          ]
        }
      ]
    },
    {
      "id": 87,
      "type": "message",
      "date": "2024-09-24T20:38:51",
      "date_unixtime": "1727199531",
      "edited": "2025-01-05T11:04:55",
      "edited_unixtime": "1736064295",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 253533,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+250 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+200 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+350 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1178 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+1312 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+2350 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+250 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+200 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+350 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1178 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+1312 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+2350 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:55"
            }
          ]
        }
      ]
    },
    {
      "id": 129,
      "type": "message",
      "date": "2024-10-02T18:28:17",
      "date_unixtime": "1727882897",
      "edited": "2025-01-05T11:04:51",
      "edited_unixtime": "1736064291",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 158456,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+600 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n+400 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+462 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+772 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+1167 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+982 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+432 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+807 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+975 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+600 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n+400 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+462 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+772 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+1167 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+982 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+432 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+807 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+975 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:51"
            }
          ]
        }
      ]
    },
    {
      "id": 214,
      "type": "message",
      "date": "2024-10-07T20:12:15",
      "date_unixtime": "1728321135",
      "edited": "2025-01-05T11:04:46",
      "edited_unixtime": "1736064286",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 197645,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+472 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+400 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+302 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1622 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+472 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+400 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+302 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1622 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:46"
            }
          ]
        }
      ]
    },
    {
      "id": 215,
      "type": "message",
      "date": "2024-10-11T10:37:27",
      "date_unixtime": "1728632247",
      "edited": "2024-10-11T10:47:36",
      "edited_unixtime": "1728632856",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "forwarded_from": "Новости Нижегородской области | ОКА24 |",
      "forwarded_from_id": "channel1617950592",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 25771916,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 6338,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 66,
      "width": 1280,
      "height": 720,
      "text": [
        {
          "type": "bold",
          "text": "Два нижегородца организовали подпольное казино под видом кальянной"
        },
        " 🎰\n\nПолицейские нагрянули к любителям подымить на Большую Покровскую, но оказалось, что в доме совсем не накурено. Зато в одной из комнат нашли два покерных стола, фишки и 27 тысяч рублей. Крупье под подпиской, его подельника ограничили в действиях.\n\n",
        {
          "type": "italic",
          "text": "ставлю арбузный на молоке"
        },
        "\n\n",
        {
          "type": "text_link",
          "text": "Подписаться",
          "href": "https://t.me/+Bh8YUizd19s0Y2Ey"
        },
        " | ",
        {
          "type": "text_link",
          "text": "Предложить новость",
          "href": "https://t.me/oka24_bot"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "bold",
          "text": "Два нижегородца организовали подпольное казино под видом кальянной"
        },
        {
          "type": "plain",
          "text": " 🎰\n\nПолицейские нагрянули к любителям подымить на Большую Покровскую, но оказалось, что в доме совсем не накурено. Зато в одной из комнат нашли два покерных стола, фишки и 27 тысяч рублей. Крупье под подпиской, его подельника ограничили в действиях.\n\n"
        },
        {
          "type": "italic",
          "text": "ставлю арбузный на молоке"
        },
        {
          "type": "plain",
          "text": "\n\n"
        },
        {
          "type": "text_link",
          "text": "Подписаться",
          "href": "https://t.me/+Bh8YUizd19s0Y2Ey"
        },
        {
          "type": "plain",
          "text": " | "
        },
        {
          "type": "text_link",
          "text": "Предложить новость",
          "href": "https://t.me/oka24_bot"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 2,
          "emoji": "😁",
          "recent": [
            {
              "from": "The Rabotyaga Rabotyaga",
              "from_id": "user414790961",
              "date": "2024-10-11T10:51:19"
            },
            {
              "from": "Антон Силаев",
              "from_id": "user820313930",
              "date": "2024-10-11T10:47:36"
            }
          ]
        }
      ]
    },
    {
      "id": 216,
      "type": "message",
      "date": "2024-10-11T19:21:36",
      "date_unixtime": "1728663696",
      "edited": "2025-01-05T11:04:42",
      "edited_unixtime": "1736064282",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 254538,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | Вася (",
        {
          "type": "phone",
          "text": "89965652868"
        },
        ")\n+300 | Шурик\n+300 | Диман\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | Диман\n+300 | Вася\n+300 | Диман\n+300 | Шурик\n+100 | Василий\n+100 | Василий\n+100 | Василий\n+100 | Василий\n+100 | Василий\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+967 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+1302 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+245 | Диман\n+550 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n+1205 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+1355 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | Вася ("
        },
        {
          "type": "phone",
          "text": "89965652868"
        },
        {
          "type": "plain",
          "text": ")\n+300 | Шурик\n+300 | Диман\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | Диман\n+300 | Вася\n+300 | Диман\n+300 | Шурик\n+100 | Василий\n+100 | Василий\n+100 | Василий\n+100 | Василий\n+100 | Василий\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+967 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+1302 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+245 | Диман\n+550 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n+1205 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+1355 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:42"
            }
          ]
        }
      ]
    },
    {
      "id": 245,
      "type": "message",
      "date": "2024-10-18T20:28:23",
      "date_unixtime": "1729272503",
      "edited": "2025-01-05T11:04:37",
      "edited_unixtime": "1736064277",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 210331,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+400 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+300 | Артем\n+300| ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+300 | Артем\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+650 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+2575 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+595 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+115 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+890 | Артем\n+1275 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+400 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+300 | Артем\n+300| "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+300 | Артем\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+650 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+2575 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+595 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+115 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+890 | Артем\n+1275 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:37"
            }
          ]
        }
      ]
    },
    {
      "id": 246,
      "type": "message",
      "date": "2024-10-18T21:14:01",
      "date_unixtime": "1729275241",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 200151,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 247,
      "type": "message",
      "date": "2024-10-18T21:14:57",
      "date_unixtime": "1729275297",
      "edited": "2024-10-18T21:19:57",
      "edited_unixtime": "1729275597",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 201791,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": [],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "😁",
          "recent": [
            {
              "from": "Шура Алибас",
              "from_id": "user675084191",
              "date": "2024-10-18T21:19:57"
            }
          ]
        }
      ]
    },
    {
      "id": 248,
      "type": "message",
      "date": "2024-10-18T23:38:03",
      "date_unixtime": "1729283883",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 192742,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 250,
      "type": "message",
      "date": "2024-10-19T01:51:40",
      "date_unixtime": "1729291900",
      "edited": "2024-10-27T11:55:11",
      "edited_unixtime": "1730019311",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 195322,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": [],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "😱",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2024-10-27T11:55:11"
            }
          ]
        }
      ]
    },
    {
      "id": 251,
      "type": "message",
      "date": "2024-10-26T18:41:35",
      "date_unixtime": "1729957295",
      "edited": "2025-01-05T11:04:32",
      "edited_unixtime": "1736064272",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | Никита\n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+600 | Шурик\n+300 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+600 | Шурик\n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+600 | Шурик\n+600 | Шурик\n+300 | Никитос\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1177 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+1455 | Никитос\n+1770 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+1045 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+1710 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1655 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | Никита\n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+600 | Шурик\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+600 | Шурик\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+600 | Шурик\n+600 | Шурик\n+300 | Никитос\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1177 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+1455 | Никитос\n+1770 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+1045 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+1710 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1655 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:32"
            }
          ]
        }
      ]
    },
    {
      "id": 342,
      "type": "message",
      "date": "2024-11-01T21:00:41",
      "date_unixtime": "1730484041",
      "edited": "2025-01-05T11:04:21",
      "edited_unixtime": "1736064261",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 151661,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+600 | Саня \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1000 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+300 | Никита \n+600 | Шурик \n+500 | Список\n+500 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        " \n+600 | Шурик\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+200 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        "\n+300 | Список\n+800 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Вывод: На обиженных воду возят",
          "collapsed": false
        },
        "\n+4714 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+1032 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+230 | Макс\n+1620 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1575 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+600 | Саня \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1000 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+300 | Никита \n+600 | Шурик \n+500 | Список\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": " \n+600 | Шурик\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": "\n+300 | Список\n+800 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Вывод: На обиженных воду возят",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+4714 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+1032 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+230 | Макс\n+1620 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1575 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:21"
            }
          ]
        }
      ]
    },
    {
      "id": 414,
      "type": "message",
      "date": "2024-11-09T20:58:19",
      "date_unixtime": "1731175099",
      "edited": "2025-01-05T11:04:17",
      "edited_unixtime": "1736064257",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 156710,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+300 | Илья (",
        {
          "type": "phone",
          "text": "89063551384"
        },
        ")\n+600 | Виталик (",
        {
          "type": "phone",
          "text": "89527853806"
        },
        ")\n+600 | ",
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        "\n+600 | ",
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        " (",
        {
          "type": "phone",
          "text": "89873942978"
        },
        ")\n+600 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " (",
        {
          "type": "phone",
          "text": "89867685611"
        },
        ")\n+500 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Никита",
          "user_id": 1684803035
        },
        " \n+600 | ",
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+1000 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1200 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+1200 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n+600 | ",
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        " \n+1200 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        " \n+1000 | Виталий\n+1000 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+620 | Виталик\n+1912 | ",
        {
          "type": "mention_name",
          "text": "Никита",
          "user_id": 1684803035
        },
        "\n+1200 | ",
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        " (",
        {
          "type": "phone",
          "text": "89867630416"
        },
        ")\n+1080 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+467 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1105 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+1427 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+3235 | Виталий"
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+300 | Илья ("
        },
        {
          "type": "phone",
          "text": "89063551384"
        },
        {
          "type": "plain",
          "text": ")\n+600 | Виталик ("
        },
        {
          "type": "phone",
          "text": "89527853806"
        },
        {
          "type": "plain",
          "text": ")\n+600 | "
        },
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        {
          "type": "plain",
          "text": "\n+600 | "
        },
        {
          "type": "mention",
          "text": "@AntonSilaev"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89873942978"
        },
        {
          "type": "plain",
          "text": ")\n+600 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89867685611"
        },
        {
          "type": "plain",
          "text": ")\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Никита",
          "user_id": 1684803035
        },
        {
          "type": "plain",
          "text": " \n+600 | "
        },
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+1000 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1200 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+1200 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n+600 | "
        },
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        {
          "type": "plain",
          "text": " \n+1200 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": " \n+1000 | Виталий\n+1000 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+620 | Виталик\n+1912 | "
        },
        {
          "type": "mention_name",
          "text": "Никита",
          "user_id": 1684803035
        },
        {
          "type": "plain",
          "text": "\n+1200 | "
        },
        {
          "type": "mention",
          "text": "@dmitry_efremov6996"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89867630416"
        },
        {
          "type": "plain",
          "text": ")\n+1080 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+467 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1105 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+1427 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+3235 | Виталий"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:17"
            }
          ]
        }
      ]
    },
    {
      "id": 416,
      "type": "message",
      "date": "2024-11-09T22:26:27",
      "date_unixtime": "1731180387",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 182996,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 453,
      "type": "message",
      "date": "2024-11-15T20:01:13",
      "date_unixtime": "1731690073",
      "edited": "2025-01-05T11:04:13",
      "edited_unixtime": "1736064253",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 226191,
      "width": 1280,
      "height": 961,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | Виталик.нов \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | Дмитрий \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        " \n+600 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        "\n+600 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+465 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+1537 | ",
        {
          "type": "mention",
          "text": "@lis19977"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+2665 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+365 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+1595 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | Виталик.нов \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | Дмитрий \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        {
          "type": "plain",
          "text": " \n+600 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": "\n+600 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+465 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+1537 | "
        },
        {
          "type": "mention",
          "text": "@lis19977"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+2665 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+365 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+1595 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:13"
            }
          ]
        }
      ]
    },
    {
      "id": 454,
      "type": "message",
      "date": "2024-11-15T20:46:13",
      "date_unixtime": "1731692773",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 253513,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 455,
      "type": "message",
      "date": "2024-11-15T21:52:53",
      "date_unixtime": "1731696773",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 162244,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 500,
      "type": "message",
      "date": "2024-11-22T22:05:36",
      "date_unixtime": "1732302336",
      "edited": "2026-02-15T23:52:11",
      "edited_unixtime": "1771188731",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 168458,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+300 | Никита \n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1000 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+500 | Васек\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+300 | Никита\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | Леха\n+600 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+250 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+240 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n+637 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        "\n+402 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+1017 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+3655 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | Никита \n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1000 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+500 | Васек\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+300 | Никита\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | Леха\n+600 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+250 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+240 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n+637 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": "\n+402 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+1017 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+3655 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:08"
            }
          ]
        }
      ]
    },
    {
      "id": 586,
      "type": "message",
      "date": "2024-11-29T21:43:27",
      "date_unixtime": "1732905807",
      "edited": "2025-01-05T11:04:05",
      "edited_unixtime": "1736064245",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 189954,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | Саня \n+500 | Виталик.нов \n+500 | Назарик\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | Назарик\n+500 | Назарик\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+700 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1887 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+1027 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+477 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+1140 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+1157 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня \n+500 | Виталик.нов \n+500 | Назарик\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | Назарик\n+500 | Назарик\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1887 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+1027 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+477 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+1140 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+1157 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:05"
            }
          ]
        }
      ]
    },
    {
      "id": 616,
      "type": "message",
      "date": "2024-12-07T19:44:38",
      "date_unixtime": "1733589878",
      "edited": "2025-01-05T11:04:01",
      "edited_unixtime": "1736064241",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 172493,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | Виталик.нов \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1000 | Шурик \n+1000 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " \n+500 | Васек \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+300 | Сергей (",
        {
          "type": "phone",
          "text": "89202952986"
        },
        ")\n+300 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+300 | Виталик.нов\n+300 | Никита\n+300 | Никита\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+150 | Никита\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+1000 | ",
        {
          "type": "mention_name",
          "text": "Шурик",
          "user_id": 670998881
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1805 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        "\n+550 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n+900 | Сергей\n+862 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1420 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        "\n+230 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+1822 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+1300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Виталик.нов \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1000 | Шурик \n+1000 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " \n+500 | Васек \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+300 | Сергей ("
        },
        {
          "type": "phone",
          "text": "89202952986"
        },
        {
          "type": "plain",
          "text": ")\n+300 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+300 | Виталик.нов\n+300 | Никита\n+300 | Никита\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+150 | Никита\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+1000 | "
        },
        {
          "type": "mention_name",
          "text": "Шурик",
          "user_id": 670998881
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Bezymno_V"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1805 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": "\n+550 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n+900 | Сергей\n+862 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1420 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": "\n+230 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+1822 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+1300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:04:01"
            }
          ]
        }
      ]
    },
    {
      "id": 621,
      "type": "message",
      "date": "2024-12-17T20:28:03",
      "date_unixtime": "1734456483",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "forwarded_from": "Gozilla Downloader | Скачать видео из Ютуба Youtube",
      "forwarded_from_id": "user841589476",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_name": "Игрок_в_покер_разбирает_сцены_из_фильмов_Шулера_Везунчик_Игр.mp4",
      "file_size": 74890927,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 18373,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 1903,
      "width": 854,
      "height": 480,
      "text": [
        "📼 480p, 💾 71.5MB, ",
        {
          "type": "mention",
          "text": "@Gozilla_bot"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "📼 480p, 💾 71.5MB, "
        },
        {
          "type": "mention",
          "text": "@Gozilla_bot"
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 692,
      "type": "message",
      "date": "2024-12-20T23:33:40",
      "date_unixtime": "1734726820",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 207896,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 706,
      "type": "message",
      "date": "2024-12-22T08:16:28",
      "date_unixtime": "1734844588",
      "edited": "2024-12-31T01:37:13",
      "edited_unixtime": "1735598233",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 210587,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+450 | Саня \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход: ",
          "collapsed": false
        },
        "\n+605 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+1062 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+710 | Саня"
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+450 | Саня \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+605 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+1062 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+710 | Саня"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2024-12-31T01:37:13"
            }
          ]
        }
      ]
    },
    {
      "id": 749,
      "type": "message",
      "date": "2024-12-31T01:36:57",
      "date_unixtime": "1735598217",
      "edited": "2024-12-31T01:37:06",
      "edited_unixtime": "1735598226",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 203889,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | Дмитрий \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        " \n+500 | Саня \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+562 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+457 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+807 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+785 | Саня\n+362 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | Дмитрий \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+562 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+457 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+807 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+785 | Саня\n+362 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2024-12-31T01:37:06"
            }
          ]
        }
      ]
    },
    {
      "id": 758,
      "type": "message",
      "date": "2025-01-04T19:54:18",
      "date_unixtime": "1736009658",
      "edited": "2025-01-05T11:03:54",
      "edited_unixtime": "1736064234",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 163239,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | Саня \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | Санёк Гоголев\n+500 | Артем\n+200 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+150 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+50 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | Диман\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+300 | Артем\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+470 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+540 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+782 | Санёк Гоголев\n+1602 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1355 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | Санёк Гоголев\n+500 | Артем\n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+150 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+50 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | Диман\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+300 | Артем\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+470 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+540 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+782 | Санёк Гоголев\n+1602 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1355 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-01-05T11:03:54"
            }
          ]
        }
      ]
    },
    {
      "id": 845,
      "type": "message",
      "date": "2025-03-14T21:25:53",
      "date_unixtime": "1741976753",
      "edited": "2025-03-14T21:30:42",
      "edited_unixtime": "1741977042",
      "from": "Антон Силаев",
      "from_id": "user820313930",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_name": "(Куплет 1) (1).mp3",
      "file_size": 5127021,
      "media_type": "audio_file",
      "mime_type": "audio/mpeg",
      "duration_seconds": 213,
      "text": "",
      "text_entities": [],
      "reactions": [
        {
          "type": "emoji",
          "count": 3,
          "emoji": "😁",
          "recent": [
            {
              "from": "Васек Назаров",
              "from_id": "user6490820395",
              "date": "2025-03-15T00:36:54"
            },
            {
              "from": "Дмитрий Чухманов",
              "from_id": "user1442998025",
              "date": "2025-03-14T21:39:26"
            }
          ]
        },
        {
          "type": "emoji",
          "count": 1,
          "emoji": "🔥"
        },
        {
          "type": "emoji",
          "count": 1,
          "emoji": "😎",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-03-14T21:50:49"
            }
          ]
        }
      ]
    },
    {
      "id": 857,
      "type": "message",
      "date": "2025-03-15T15:12:11",
      "date_unixtime": "1742040731",
      "edited": "2025-03-15T15:15:40",
      "edited_unixtime": "1742040940",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 18621935,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 13029,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 44,
      "width": 1280,
      "height": 720,
      "text": "",
      "text_entities": [],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "🔥",
          "recent": [
            {
              "from": "The Rabotyaga Rabotyaga",
              "from_id": "user414790961",
              "date": "2025-03-15T15:15:40"
            }
          ]
        }
      ]
    },
    {
      "id": 858,
      "type": "message",
      "date": "2025-03-15T16:20:54",
      "date_unixtime": "1742044854",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 48029671,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 14625,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 115,
      "width": 1280,
      "height": 720,
      "text": "",
      "text_entities": []
    },
    {
      "id": 859,
      "type": "message",
      "date": "2025-03-15T16:32:28",
      "date_unixtime": "1742045548",
      "edited": "2025-03-15T16:33:45",
      "edited_unixtime": "1742045625",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": "Авария - 3 алына",
      "text_entities": [
        {
          "type": "plain",
          "text": "Авария - 3 алына"
        }
      ]
    },
    {
      "id": 860,
      "type": "message",
      "date": "2025-03-15T16:32:33",
      "date_unixtime": "1742045553",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 4771363,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 11326,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 11,
      "width": 1280,
      "height": 720,
      "text": "",
      "text_entities": []
    },
    {
      "id": 878,
      "type": "message",
      "date": "2025-04-12T22:43:28",
      "date_unixtime": "1744487008",
      "from": "The Rabotyaga Rabotyaga",
      "from_id": "user414790961",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 9832239,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 15742,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 26,
      "width": 720,
      "height": 1280,
      "text": "",
      "text_entities": []
    },
    {
      "id": 882,
      "type": "message",
      "date": "2025-05-02T19:34:50",
      "date_unixtime": "1746203690",
      "edited": "2025-05-24T08:45:33",
      "edited_unixtime": "1748065533",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 273734,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | Саня \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+250 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+740 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+560 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+2170 | ",
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+250 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+740 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+560 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+2170 | "
        },
        {
          "type": "mention_name",
          "text": "Виталик.нов",
          "user_id": 786265567
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-05-24T08:45:34"
            }
          ]
        }
      ]
    },
    {
      "id": 1006,
      "type": "message",
      "date": "2025-05-23T19:35:32",
      "date_unixtime": "1748018132",
      "edited": "2025-05-24T08:48:01",
      "edited_unixtime": "1748065681",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 172900,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+1000 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        " (",
        {
          "type": "phone",
          "text": "89103991833"
        },
        ")\n+500 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        " (",
        {
          "type": "phone",
          "text": "89524464678"
        },
        ")\n+500 | Васек (",
        {
          "type": "phone",
          "text": "89965652868"
        },
        ")\n+500 | Дмитрий \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | Серёга (",
        {
          "type": "phone",
          "text": "89159566494"
        },
        ")\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | Саня\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+1000 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+1000 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1250 | ",
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        "\n+1877 | ",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n+880 | ",
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        "\n+547 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+922 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+770 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+630 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+1027 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+1255 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1000 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89103991833"
        },
        {
          "type": "plain",
          "text": ")\n+500 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": " ("
        },
        {
          "type": "phone",
          "text": "89524464678"
        },
        {
          "type": "plain",
          "text": ")\n+500 | Васек ("
        },
        {
          "type": "phone",
          "text": "89965652868"
        },
        {
          "type": "plain",
          "text": ")\n+500 | Дмитрий \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | Серёга ("
        },
        {
          "type": "phone",
          "text": "89159566494"
        },
        {
          "type": "plain",
          "text": ")\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+1000 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+1000 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1250 | "
        },
        {
          "type": "mention_name",
          "text": "Васек",
          "user_id": 6490820395
        },
        {
          "type": "plain",
          "text": "\n+1877 | "
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n+880 | "
        },
        {
          "type": "mention",
          "text": "@Pr0ksii"
        },
        {
          "type": "plain",
          "text": "\n+547 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+922 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+770 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+630 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+1027 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+1255 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-05-24T08:48:01"
            }
          ]
        }
      ]
    },
    {
      "id": 1035,
      "type": "message",
      "date": "2025-05-30T22:55:52",
      "date_unixtime": "1748634952",
      "edited": "2025-05-31T12:54:06",
      "edited_unixtime": "1748685246",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 46469099,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 14341,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 111,
      "width": 720,
      "height": 1280,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | Саня \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | Саня \n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+500 | Саня\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        "\n+462 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+2372 | Тема\n+1282 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+392 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+1307 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+482 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+370 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня \n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+462 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+2372 | Тема\n+1282 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+392 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+1307 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+482 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+370 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-05-31T12:54:06"
            }
          ]
        }
      ]
    },
    {
      "id": 1036,
      "type": "service",
      "date": "2025-05-30T23:26:14",
      "date_unixtime": "1748636774",
      "actor": "The Rabotyaga Rabotyaga",
      "actor_id": "user414790961",
      "action": "invite_members",
      "members": ["Тема Коробков"],
      "text": "",
      "text_entities": []
    },
    {
      "id": 1165,
      "type": "message",
      "date": "2025-06-15T20:46:53",
      "date_unixtime": "1750009613",
      "edited": "2025-06-16T01:02:44",
      "edited_unixtime": "1750024964",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 172645,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | Тема \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | Саня \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | Сергей\n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+860 | Сергей\n+1070 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+750 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1215 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+700 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | Тема \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | Сергей\n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+860 | Сергей\n+1070 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+750 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1215 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-06-16T01:02:44"
            }
          ]
        }
      ]
    },
    {
      "id": 1166,
      "type": "message",
      "date": "2025-06-20T17:25:37",
      "date_unixtime": "1750429537",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "poll": {
        "question": "Покерок?",
        "closed": false,
        "total_voters": 7,
        "answers": [
          {
            "text": "Пятница",
            "voters": 5,
            "chosen": true
          },
          {
            "text": "Суббота",
            "voters": 4,
            "chosen": true
          },
          {
            "text": "Воскресенье",
            "voters": 3,
            "chosen": true
          }
        ]
      },
      "text": "",
      "text_entities": []
    },
    {
      "id": 1194,
      "type": "message",
      "date": "2025-06-21T00:35:36",
      "date_unixtime": "1750455336",
      "edited": "2025-06-21T00:37:47",
      "edited_unixtime": "1750455467",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+290 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+330 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+1616 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+1005 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+495 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+290 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+330 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+1616 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+1005 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+495 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-06-21T00:37:47"
            }
          ]
        }
      ]
    },
    {
      "id": 1195,
      "type": "service",
      "date": "2025-06-22T16:35:14",
      "date_unixtime": "1750599314",
      "actor": "The Rabotyaga Rabotyaga",
      "actor_id": "user414790961",
      "action": "invite_members",
      "members": ["Sergey"],
      "text": "",
      "text_entities": []
    },
    {
      "id": 1217,
      "type": "message",
      "date": "2025-06-22T19:39:27",
      "date_unixtime": "1750610367",
      "edited": "2025-06-22T23:31:59",
      "edited_unixtime": "1750624319",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+417 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+845 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+182 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        " \n+1817 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+537 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+417 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+845 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+182 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": " \n+1817 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+537 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-06-22T23:31:59"
            }
          ]
        }
      ]
    },
    {
      "id": 1222,
      "type": "message",
      "date": "2025-06-27T20:34:32",
      "date_unixtime": "1751045672",
      "edited": "2025-07-02T22:40:27",
      "edited_unixtime": "1751485227",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        "Объявляется сбор на новую колоду, по 100₽ \n",
        {
          "type": "phone",
          "text": "89776415787"
        },
        " Сбер\n\n",
        {
          "type": "blockquote",
          "text": "Выражается благодарность за участие:",
          "collapsed": false
        },
        "\n",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n",
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        "\n",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        ""
      ],
      "text_entities": [
        {
          "type": "plain",
          "text": "Объявляется сбор на новую колоду, по 100₽ \n"
        },
        {
          "type": "phone",
          "text": "89776415787"
        },
        {
          "type": "plain",
          "text": " Сбер\n\n"
        },
        {
          "type": "blockquote",
          "text": "Выражается благодарность за участие:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention",
          "text": "@fomicheev"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "👍",
          "recent": [
            {
              "from": "Алексей Фомичев",
              "from_id": "user1517493589",
              "date": "2025-06-27T21:32:08"
            }
          ]
        }
      ]
    },
    {
      "id": 1299,
      "type": "message",
      "date": "2025-06-28T20:06:26",
      "date_unixtime": "1751130386",
      "edited": "2025-06-29T00:58:18",
      "edited_unixtime": "1751147898",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 147906,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | Саня \n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+470 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+177 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+782 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+630 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Саня \n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+470 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+177 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+782 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+630 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-06-29T00:58:18"
            }
          ]
        }
      ]
    },
    {
      "id": 1350,
      "type": "message",
      "date": "2025-07-02T20:14:54",
      "date_unixtime": "1751476494",
      "edited": "2025-07-03T09:34:20",
      "edited_unixtime": "1751524460",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 195152,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | Николай \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | Саня \n+500 | Sergey \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | Тема \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+450 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+762 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+135 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+380 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1695 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+947 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+1015 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Николай \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+500 | Sergey \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | Тема \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+450 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+762 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+135 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+380 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1695 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+947 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+1015 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-07-03T09:34:20"
            }
          ]
        }
      ]
    },
    {
      "id": 1351,
      "type": "message",
      "date": "2025-07-02T22:30:35",
      "date_unixtime": "1751484635",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 183666,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1355,
      "type": "message",
      "date": "2025-07-03T00:09:27",
      "date_unixtime": "1751490567",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 21651413,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 15875,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 52,
      "width": 720,
      "height": 1280,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1356,
      "type": "message",
      "date": "2025-07-03T00:49:43",
      "date_unixtime": "1751492983",
      "edited": "2025-07-03T09:23:59",
      "edited_unixtime": "1751523839",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 175983,
      "width": 1280,
      "height": 960,
      "text": "Алын в алын, 2 фулхауса переходящие в каре, вот это переезд",
      "text_entities": [
        {
          "type": "plain",
          "text": "Алын в алын, 2 фулхауса переходящие в каре, вот это переезд"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 5,
          "emoji": "🔥",
          "recent": [
            {
              "from": "Миха",
              "from_id": "user629271423",
              "date": "2025-07-05T19:07:05"
            },
            {
              "from": "Шура Алибас",
              "from_id": "user675084191",
              "date": "2025-07-04T16:31:11"
            },
            {
              "from": "Никита Засухин",
              "from_id": "user1684803035",
              "date": "2025-07-03T14:15:45"
            }
          ]
        }
      ]
    },
    {
      "id": 1394,
      "type": "message",
      "date": "2025-07-06T19:26:55",
      "date_unixtime": "1751819215",
      "edited": "2025-07-07T08:03:33",
      "edited_unixtime": "1751864613",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 |  Андрей\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+500 | Андрей\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Вывод: ",
          "collapsed": false
        },
        "\n+187 | Андрей\n+337 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+1577 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1827 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 |  Андрей\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+500 | Андрей\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Вывод: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+187 | Андрей\n+337 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+1577 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1827 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-07-07T08:03:33"
            }
          ]
        }
      ]
    },
    {
      "id": 1395,
      "type": "message",
      "date": "2025-07-06T21:23:12",
      "date_unixtime": "1751826192",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 283701,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1399,
      "type": "message",
      "date": "2025-07-06T23:34:22",
      "date_unixtime": "1751834062",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 16688555,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 12763,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 40,
      "width": 1280,
      "height": 720,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1400,
      "type": "message",
      "date": "2025-07-06T23:34:22",
      "date_unixtime": "1751834062",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 11133951,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 7996,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 26,
      "width": 720,
      "height": 1280,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1401,
      "type": "message",
      "date": "2025-07-06T23:34:22",
      "date_unixtime": "1751834062",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "file": "(File not included. Change data exporting settings to download.)",
      "file_size": 3374535,
      "thumbnail": "(File not included. Change data exporting settings to download.)",
      "thumbnail_file_size": 18237,
      "media_type": "video_file",
      "mime_type": "video/mp4",
      "duration_seconds": 8,
      "width": 1280,
      "height": 720,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1438,
      "type": "message",
      "date": "2025-07-09T18:37:58",
      "date_unixtime": "1752075478",
      "edited": "2025-07-09T23:33:34",
      "edited_unixtime": "1752093214",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 169260,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+750 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+350 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+1672 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+885 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+1625 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+835 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+750 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+350 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+1672 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+885 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+1625 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+835 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 1439,
      "type": "message",
      "date": "2025-07-09T20:10:02",
      "date_unixtime": "1752081002",
      "edited": "2025-07-09T20:10:50",
      "edited_unixtime": "1752081050",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 167116,
      "width": 1280,
      "height": 960,
      "text": "Фулхаус и каре  с флопа + фулхаус на столе",
      "text_entities": [
        {
          "type": "plain",
          "text": "Фулхаус и каре  с флопа + фулхаус на столе"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 3,
          "emoji": "🔥",
          "recent": [
            {
              "from": "Дмитрий Чухманов",
              "from_id": "user1442998025",
              "date": "2025-07-10T07:52:29"
            },
            {
              "from": "Шура Алибас",
              "from_id": "user675084191",
              "date": "2025-07-09T20:29:59"
            },
            {
              "from": "Миха",
              "from_id": "user629271423",
              "date": "2025-07-09T20:10:50"
            }
          ]
        }
      ]
    },
    {
      "id": 1440,
      "type": "service",
      "date": "2025-07-09T20:26:49",
      "date_unixtime": "1752082009",
      "actor": "Denis Isaev",
      "actor_id": "user558309471",
      "action": "invite_members",
      "members": ["Диман Гудков"],
      "text": "",
      "text_entities": []
    },
    {
      "id": 1441,
      "type": "message",
      "date": "2025-07-09T22:34:07",
      "date_unixtime": "1752089647",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 176669,
      "width": 1280,
      "height": 960,
      "text": "3 флеша",
      "text_entities": [
        {
          "type": "plain",
          "text": "3 флеша"
        }
      ]
    },
    {
      "id": 1449,
      "type": "message",
      "date": "2025-07-12T21:24:08",
      "date_unixtime": "1752344648",
      "edited": "2025-07-13T01:17:54",
      "edited_unixtime": "1752358674",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 268878,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | Николай \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | Sergey \n+300 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        "\n+240 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+540 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+857 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+157 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        " \n+1250 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+1105 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Николай \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | Sergey \n+300 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+240 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+540 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+857 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+157 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": " \n+1250 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+1105 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-07-13T15:50:50"
            }
          ]
        },
        {
          "type": "emoji",
          "count": 1,
          "emoji": "🔥",
          "recent": [
            {
              "from": "Дмитрий Чухманов",
              "from_id": "user1442998025",
              "date": "2025-07-12T22:08:08"
            }
          ]
        }
      ]
    },
    {
      "id": 1450,
      "type": "message",
      "date": "2025-07-13T00:14:05",
      "date_unixtime": "1752354845",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 188035,
      "width": 960,
      "height": 1280,
      "text": "3 алына на королях",
      "text_entities": [
        {
          "type": "plain",
          "text": "3 алына на королях"
        }
      ]
    },
    {
      "id": 1518,
      "type": "message",
      "date": "2025-08-06T19:57:37",
      "date_unixtime": "1754499457",
      "edited": "2026-02-15T23:57:53",
      "edited_unixtime": "1771189073",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 185246,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "  \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1500 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+700 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "  \n+1500 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+650 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n+200 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        "\n+2600 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+1317 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n+1242 | ",
        {
          "type": "mention",
          "text": "@lis19971"
        },
        "\n+352 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+1252 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1602 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+850 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1662 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "  \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1500 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "  \n+1500 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+650 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Вывод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+2600 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+1317 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n+1242 | "
        },
        {
          "type": "mention",
          "text": "@lis19971"
        },
        {
          "type": "plain",
          "text": "\n+352 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+1252 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1602 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+850 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1662 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-08-06T23:48:54"
            }
          ]
        }
      ]
    },
    {
      "id": 1519,
      "type": "message",
      "date": "2025-08-06T20:56:13",
      "date_unixtime": "1754502973",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 171686,
      "width": 1280,
      "height": 960,
      "text": "2 алына  на Терне = на ривере закрывается фулхаус выше🙈🤷‍♂",
      "text_entities": [
        {
          "type": "plain",
          "text": "2 алына  на Терне = на ривере закрывается фулхаус выше🙈🤷‍♂"
        }
      ]
    },
    {
      "id": 1520,
      "type": "message",
      "date": "2025-08-06T23:35:25",
      "date_unixtime": "1754512525",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 159223,
      "width": 1280,
      "height": 960,
      "text": "Авария фулхаус в фулхаус",
      "text_entities": [
        {
          "type": "plain",
          "text": "Авария фулхаус в фулхаус"
        }
      ]
    },
    {
      "id": 1575,
      "type": "message",
      "date": "2025-09-05T20:09:11",
      "date_unixtime": "1757092151",
      "edited": "2025-09-06T00:09:34",
      "edited_unixtime": "1757106574",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 124305,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+890 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1215 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+1082 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+487 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+510 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+890 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1215 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+1082 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+487 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+510 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-09-06T00:09:34"
            }
          ]
        }
      ]
    },
    {
      "id": 1576,
      "type": "message",
      "date": "2025-09-13T20:30:35",
      "date_unixtime": "1757784635",
      "edited": "2025-09-13T23:33:34",
      "edited_unixtime": "1757795614",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 161513,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+540 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1612 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+347 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Николай",
          "user_id": 139448356
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+540 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1612 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+347 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-09-13T23:37:42"
            }
          ]
        }
      ]
    },
    {
      "id": 1579,
      "type": "message",
      "date": "2025-09-20T20:00:45",
      "date_unixtime": "1758387645",
      "edited": "2026-02-15T23:57:18",
      "edited_unixtime": "1771189038",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 256893,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+795 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+465 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+465 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+1015 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+795 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+465 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+465 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+1015 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-09-21T01:34:53"
            }
          ]
        }
      ]
    },
    {
      "id": 1603,
      "type": "message",
      "date": "2025-10-04T18:38:16",
      "date_unixtime": "1759592296",
      "edited": "2026-02-15T23:56:56",
      "edited_unixtime": "1771189016",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 235860,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1230 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+1237 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+700 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+900 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+400 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+1600 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Ввод:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1230 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+1237 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+900 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+400 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+1600 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-10-05T00:04:07"
            }
          ]
        }
      ]
    },
    {
      "id": 1699,
      "type": "message",
      "date": "2025-11-01T19:45:35",
      "date_unixtime": "1762015535",
      "edited": "2025-11-02T00:04:31",
      "edited_unixtime": "1762031071",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 160481,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | ",
        {
          "type": "mention",
          "text": "@expignik"
        },
        " \n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+890 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+225 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        "\n+200 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+1430 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+3140 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention",
          "text": "@expignik"
        },
        {
          "type": "plain",
          "text": " \n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+890 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+225 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": "\n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+1430 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+3140 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 1701,
      "type": "message",
      "date": "2025-11-01T23:53:21",
      "date_unixtime": "1762030401",
      "edited": "2025-11-02T11:14:26",
      "edited_unixtime": "1762071266",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 190008,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": [],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "🔥",
          "recent": [
            {
              "from": "Шурик",
              "from_id": "user670998881",
              "date": "2025-11-02T11:14:26"
            }
          ]
        }
      ]
    },
    {
      "id": 1718,
      "type": "message",
      "date": "2025-11-08T19:41:16",
      "date_unixtime": "1762620076",
      "edited": "2026-02-15T23:56:20",
      "edited_unixtime": "1771188980",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 141444,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | Дмитрий\n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+872 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+1430 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+417 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+1430 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | Дмитрий\n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+872 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+1430 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+417 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+1430 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 1719,
      "type": "message",
      "date": "2025-11-08T19:52:45",
      "date_unixtime": "1762620765",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 181684,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1720,
      "type": "message",
      "date": "2025-11-08T19:59:45",
      "date_unixtime": "1762621185",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 180651,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1761,
      "type": "message",
      "date": "2025-11-22T20:02:51",
      "date_unixtime": "1763830971",
      "edited": "2026-01-07T19:35:30",
      "edited_unixtime": "1767803730",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 156222,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        "\n+500 | Дмитрий \n+500 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | Иван\n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | Саня \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+300 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+500 | Вова\n+500 | Влад\n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | Вова\n+500 | Вова\n+500 | Вова\n+300 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+200 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+200 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " (долг)\n+500 | Назар\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+705 | Ваня\n+562 | ",
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        "\n+2210 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1300 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n+2100 | Назар\n+460 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Дмитрий \n+500 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | Иван\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+500 | Вова\n+500 | Влад\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | Вова\n+500 | Вова\n+500 | Вова\n+300 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+200 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " (долг)\n+500 | Назар\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+705 | Ваня\n+562 | "
        },
        {
          "type": "mention",
          "text": "@pojaba1111"
        },
        {
          "type": "plain",
          "text": "\n+2210 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1300 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n+2100 | Назар\n+460 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2026-01-07T19:36:21"
            }
          ]
        }
      ]
    },
    {
      "id": 1762,
      "type": "message",
      "date": "2025-11-23T01:10:28",
      "date_unixtime": "1763849428",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 192053,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1859,
      "type": "message",
      "date": "2025-12-28T18:46:40",
      "date_unixtime": "1766936800",
      "edited": "2026-02-15T23:55:21",
      "edited_unixtime": "1771188921",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 102171,
      "width": 1280,
      "height": 383,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+700 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+990 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n+1235 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+1020 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+950 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "\n+530 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+990 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n+1235 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+1020 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+950 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "\n+530 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2025-12-28T22:49:22"
            }
          ]
        }
      ]
    },
    {
      "id": 1864,
      "type": "service",
      "date": "2026-01-08T10:58:10",
      "date_unixtime": "1767859090",
      "actor": "The Rabotyaga Rabotyaga",
      "actor_id": "user414790961",
      "action": "invite_members",
      "members": ["Егор Ваганов"],
      "text": "",
      "text_entities": []
    },
    {
      "id": 1876,
      "type": "message",
      "date": "2026-01-09T00:45:11",
      "date_unixtime": "1767908711",
      "edited": "2026-01-09T12:40:07",
      "edited_unixtime": "1767951607",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 142485,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        "\n+500 | Тема \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | Саня \n+500 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+250 | Саня\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+600 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+520 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+1200 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        " \n+2410 | ",
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | Тема \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | Саня \n+500 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+250 | Саня\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+600 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+520 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+1200 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": " \n+2410 | "
        },
        {
          "type": "mention",
          "text": "@ShooraAlibas"
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2026-01-09T12:40:07"
            }
          ]
        }
      ]
    },
    {
      "id": 1966,
      "type": "message",
      "date": "2026-01-29T19:50:08",
      "date_unixtime": "1769705408",
      "edited": "2026-01-30T02:13:29",
      "edited_unixtime": "1769728409",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "text": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+300 | Никита (",
        {
          "type": "phone",
          "text": "89867591579"
        },
        " Тбанк)\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1175 | ",
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        "\n+265 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        "\n+575 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        "\n+950 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+375 | ",
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        " \n+1150 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        " \n+795 | ",
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        " \n+675 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход: ",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+300 | Никита ("
        },
        {
          "type": "phone",
          "text": "89867591579"
        },
        {
          "type": "plain",
          "text": " Тбанк)\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1175 | "
        },
        {
          "type": "mention_name",
          "text": "Sergey",
          "user_id": 674547440
        },
        {
          "type": "plain",
          "text": "\n+265 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": "\n+575 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": "\n+950 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+375 | "
        },
        {
          "type": "mention_name",
          "text": "Дмитрий",
          "user_id": 1442998025
        },
        {
          "type": "plain",
          "text": " \n+1150 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": " \n+795 | "
        },
        {
          "type": "mention",
          "text": "@Lothar_Ugar"
        },
        {
          "type": "plain",
          "text": " \n+675 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "✍",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2026-01-30T02:13:29"
            }
          ]
        }
      ]
    },
    {
      "id": 1968,
      "type": "message",
      "date": "2026-01-29T20:59:08",
      "date_unixtime": "1769709548",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 217189,
      "width": 1280,
      "height": 960,
      "text": "",
      "text_entities": []
    },
    {
      "id": 1983,
      "type": "message",
      "date": "2026-02-14T18:51:44",
      "date_unixtime": "1771084304",
      "edited": "2026-02-15T23:53:24",
      "edited_unixtime": "1771188804",
      "from": "Denis Isaev",
      "from_id": "user558309471",
      "photo": "(File not included. Change data exporting settings to download.)",
      "photo_file_size": 186671,
      "width": 1280,
      "height": 960,
      "text": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        "  \n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+500 | ",
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        " \n+500 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        "\n+500 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        " \n+700 | ",
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        "\n",
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        "\n+1840 | ",
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        " \n+290 | ",
        {
          "type": "mention",
          "text": "@kovass"
        },
        "\n+3617 | ",
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        ""
      ],
      "text_entities": [
        {
          "type": "blockquote",
          "text": "Вход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Диман",
          "user_id": 405059788
        },
        {
          "type": "plain",
          "text": "  \n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention",
          "text": "@Rabotyaga3000"
        },
        {
          "type": "plain",
          "text": " \n+500 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": "\n+500 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": " \n+700 | "
        },
        {
          "type": "mention_name",
          "text": "Тема",
          "user_id": 2017035182
        },
        {
          "type": "plain",
          "text": "\n"
        },
        {
          "type": "blockquote",
          "text": "Выход:",
          "collapsed": false
        },
        {
          "type": "plain",
          "text": "\n+1840 | "
        },
        {
          "type": "mention",
          "text": "@EgorVaganov1111"
        },
        {
          "type": "plain",
          "text": " \n+290 | "
        },
        {
          "type": "mention",
          "text": "@kovass"
        },
        {
          "type": "plain",
          "text": "\n+3617 | "
        },
        {
          "type": "mention_name",
          "text": "Саня",
          "user_id": 1549105511
        },
        {
          "type": "plain",
          "text": ""
        }
      ]
    },
    {
      "id": 2054,
      "type": "message",
      "date": "2026-02-15T23:06:58",
      "date_unixtime": "1771186018",
      "edited": "2026-02-15T23:07:56",
      "edited_unixtime": "1771186076",
      "from": "Шура Алибас",
      "from_id": "user675084191",
      "text": "Фигасе",
      "text_entities": [
        {
          "type": "plain",
          "text": "Фигасе"
        }
      ],
      "reactions": [
        {
          "type": "emoji",
          "count": 1,
          "emoji": "❤",
          "recent": [
            {
              "from": "Александр",
              "from_id": "user1549105511",
              "date": "2026-02-15T23:45:10"
            }
          ]
        },
        {
          "type": "emoji",
          "count": 1,
          "emoji": "😱",
          "recent": [
            {
              "from": "Denis Isaev",
              "from_id": "user558309471",
              "date": "2026-02-15T23:07:56"
            }
          ]
        }
      ]
    },
    {
      "id": 2114,
      "type": "message",
      "date": "2026-02-16T15:04:33",
      "date_unixtime": "1771243473",
      "from": "Егор Ваганов",
      "from_id": "user8339131781",
      "text": "имхо, все эти флудилки не нужны, никто тут не флудит",
      "text_entities": [
        {
          "type": "plain",
          "text": "имхо, все эти флудилки не нужны, никто тут не флудит"
        }
      ]
    },
    {
      "id": 2115,
      "type": "message",
      "date": "2026-02-16T15:04:39",
      "date_unixtime": "1771243479",
      "from": "Егор Ваганов",
      "from_id": "user8339131781",
      "text": "там по 3 сообщения в год будет",
      "text_entities": [
        {
          "type": "plain",
          "text": "там по 3 сообщения в год будет"
        }
      ]
    }
  ]
}

```

