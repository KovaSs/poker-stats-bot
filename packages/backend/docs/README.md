# Backend Architecture

Poker Stats Bot — Telegram + VK бот для учёта покерных игр с Express API и SQLite.

---

## Entrypoint

`src/index.ts` — последовательно:
1. `initDB()` — создаёт SQLite базу, применяет миграции
2. `setupBot(BOT_TOKEN)` — инициализирует Telegraf бота
3. `startApiServer()` — Express сервер на порту `API_PORT`
4. `initVKPlatform()` — запускает VK Long Poll (если задан `VK_ACCESS_TOKEN`)

---

## Layers (top→bottom)

```
platforms/  ← адаптеры под Telegram / VK
  core/     ← платформо-независимая логика
services/  ← бизнес-логика
    db/     ← SQLite, репозитории, миграции
```

### `platforms/`

**Telegram** (`platforms/telegram/`):

| Файл | Назначение |
|---|---|
| `bot/bot.ts` | Создаёт Telegraf instance, регистрирует middleware, команды, хендлеры |
| `handlers/game/game.ts` | `textHandler`, `photoHandler`, `editedMessageHandler` — конвертируют Telegraf ctx → `IMessage`, вызывают `processGameMessage` |
| `handlers/menu/menu.ts` | `menuHandler` — `/menu` клавиатура, `menuCallback` — обработка кнопок |
| `handlers/stats/stats.ts` | `sendStats`, `sendTop` — форматируют и отправляют статистику/топ |
| `handlers/help/help.ts` | `sendHelpMessage` |
| `handlers/common/common.ts` | `escapeMarkdown` |
| `callbacks/stats.ts` | Обработка `stats_*` inline callback'ов |
| `callbacks/top.ts` | Обработка `top_*` inline callback'ов |
| `callbacks/utils.ts` | `parseFilter`, `deleteSourceMessage`, `handleCallbackError` |
| `middlewares/middlewares.ts` | `deleteCommandMessage`, `replyWithAutoDelete` (30s), `errorHandler` |

**VK** (`platforms/vk/`):

| Файл | Назначение |
|---|---|
| `bot/bot.ts` | `initVKPlatform()` — создаёт VK client, подписывается на `message_new` / `message_edit`, запускает Long Poll |
| `handlers/message/message.ts` | `handleVKMessage` — полный цикл обработки VK-сообщений (упоминания, кнопки, годовы фильтры, game) |
| `handlers/menu/menu.ts` | `buildMenuKeyboard`, `buildStatsFilterKeyboard`, `buildTopFilterKeyboard`, `buttonCommands` |
| `handlers/duplicate/duplicate.ts` | `duplicateToCommunityChat` — дублирует игры из ЛС в чат сообщества |
| `adapters/adapters.ts` | `vkContextToIMessage` — конвертирует VK context → `IMessage` |
| `middlewares/middlewares.ts` | `scheduleAutoDelete` — VK-версия автоудаления через 30s |

### `core/`

Платформо-независимая логика. Не импортирует платформенные модули.

| Модуль | Назначение |
|---|---|
| `gameProcessor/` | `GameProcessor` — класс с DI, парсит сообщение, создаёт/обновляет игру |
| `statsPresenter/` | `formatStatsTable`, `formatTopList`, `formatHelp`, `processCommand` — чистые функции форматирования |
| `types.ts` | `IMessage`, `ProcessedGameResult`, `CommandResult`, `Platform` |

`core/index.ts` экспортирует `processGameMessage` (обёртка над `container.resolve(GameProcessor).processGameMessage()`).

### `services/`

| Сервис | Зависимости | Назначение |
|---|---|---|
| `game.service` | `GameRepository`, `TransactionRepository`, `StatsService` | CRUD игры, управление транзакциями |
| `stats.service` | `TransactionRepository`, `UserRepository` | Фильтрованная статистика/топ, пересчёт агрегатов |
| `parser.service` | — | Парсинг транзакций из текста, извлечение даты |

Все сервисы — `@injectable()` классы, registered в DI-контейнере.

### `db/repositories/`

| Репозиторий | Таблица | Назначение |
|---|---|---|
| `game.repository` | `games` | CRUD игр, поиск по `chatId`+`messageId` |
| `transaction.repository` | `transactions` | Добавление/удаление транзакций, фильтрованные выборки |
| `user.repository` | `users` | Агрегированная статистика пользователей (upsert, insertMany) |

Все репозитории — `@injectable()` классы, registered в DI-контейнере. Используют `getDB()` (глобальный singleton `better-sqlite3`).

### `api/routes/`

| Роут | Endpoint | Назначение |
|---|---|---|
| `stats/stats.ts` | `GET /api/stats?chatId=&filter=&platform=` | Статистика для фронтенда |
| `years/years.ts` | `GET /api/years?chatId=&platform=` | Доступные года для фильтра |

### Auth Middleware

`middlewares/auth.ts` — проверяет `Authorization: tma <initData>` через `@tma.js/init-data-node`. Пропускается в dev/Docker (`SKIP_AUTH=true`).

---

## DI Container

`di/container.ts` — tsyringe container с регистрацией всех синглтонов. Импортируется первым через `core/index.ts`.

```
GameRepository → TransactionRepository → StatsService → GameService → GameProcessor
                                                             ParserService → GameProcessor
```

---

## Data Flow

```
Platform message → IMessage → processGameMessage()
                                 ├── ParserService.parseTransactions()
                                 ├── GameService.createGame() / updateGame()
                                 ├── GameRepository / TransactionRepository
                                 └── StatsService.recalcStats()
```

```
/stats command → processCommand() → sendStats()
                                      ├── StatsService.getFilteredStats()
                                      └── formatStatsTable()
```

---

## Database

SQLite (`data/stats.db`), создаётся автоматически.

**Таблицы:**
- `games` — игры (chat_id, message_id, game_date, platform, vk_wall_post_id, …)
- `transactions` — транзакции (game_id, username, amount, type)
- `users` — агрегированная статистика (username, total_in, total_out, games_count, game_ids)

Миграции: `db/migrations/` — последовательные SQL-файлы (001–005).

---

## Config / Env

| Переменная | Назначение |
|---|---|
| `BOT_TOKEN` | Telegram Bot Token |
| `TELEGRAM_API_URL` | Опциональный API URL (для dev) |
| `VK_ACCESS_TOKEN` | VK Access Token (Long Poll) |
| `VK_GROUP_ID` | VK Group ID |
| `VK_COMMUNITY_CHAT_ID` | Чат для дублирования игр |
| `DB_PATH` | Путь к SQLite (по умолчанию `data/stats.db`) |
| `API_PORT` | Порт Express (по умолчанию 3000) |
| `SKIP_AUTH` | Пропустить auth middleware |
| `LOG_LEVEL` | Уровень pino (по умолчанию `info`) |

Логирование: pino + pino-pretty в dev.
