# Poker Stats Bot

Telegram + VK бот для сбора и отображения статистики входов/выходов участников. Удобен для подсчёта фишек в покере, долгов или любых других единиц с разделением на операции «Вход» и «Выход».

Дополнительно предоставляет HTTP API для получения статистики и React‑фронтенд для визуализации данных.

---

## Возможности

- **Две платформы**: Telegram (Telegraf) и VK (vk-io Long Poll)
- Парсинг сообщений вида `+сумма | ник` внутри секций `Вход:` / `Выход:`
- SQLite через `better-sqlite3`
- Подсчёт входов, выходов и разницы для каждого участника
- Команды статистики с фильтрами по периоду (год, всё время, последний год)
- Клавиатуры с кнопками для быстрых команд (VK)
- Автоудаление ответов бота через 30 секунд
- Удаление сообщений пользователей с командами
- Поддержка даты игры (`game DD.MM.YYYY`)
- Редактирование сообщений (обновление игры)
- HTTP API для интеграции
- React‑фронтенд для просмотра статистики

---

## Технологии

- **Backend:** Node.js + TypeScript, Telegraf, better-sqlite3, Express, pino, vk-io
- **Frontend:** React + TypeScript, Vite, MUI, TanStack Query
- **Монорепозиторий:** pnpm workspaces
- **Тестирование:** Vitest (151 тестов, 73% покрытие)
- **Контейнеризация:** Docker, Docker Compose

---

## Структура проекта

```
.
├── packages/
│   ├── backend/
│   │   ├── docs/                  # 📖 Архитектура бэкенда
│   │   ├── src/
│   │   │   ├── core/               # Платформонезависимая бизнес-логика
│   │   │   ├── platforms/
│   │   │   │   ├── telegram/       # Telegram-адаптер (Telegraf)
│   │   │   │   └── vk/             # VK-адаптер (vk-io)
│   │   │   ├── services/           # GameService, StatsService, ParserService
│   │   │   ├── db/                 # SQLite, миграции, репозитории
│   │   │   ├── api/                # Express API
│   │   │   ├── middlewares/        # Auth middleware
│   │   │   └── config/             # Env, логгер
│   │   └── package.json
│   └── frontend/
│       └── docs/                   # 📖 Архитектура фронтенда
├── data/                           # SQLite БД
├── docker-compose.yml
├── Dockerfile
├── .env.dev
├── AGENTS.md                       # Инструкции для OpenCode
└── README.md
```

---

## Быстрый старт

### Требования

- Node.js 18+
- pnpm 8+ (`corepack enable && corepack prepare pnpm@latest --activate`)

### Установка и запуск

```bash
pnpm install
cp .env.dev .env
# Отредактируйте .env, укажите BOT_TOKEN и опционально VK_ACCESS_TOKEN / VK_GROUP_ID

pnpm dev              # бэкенд + фронтенд
pnpm dev:backend      # только бэкенд (порт 3000)
pnpm dev:frontend     # только фронтенд (порт 5173)
```

### Сборка

```bash
pnpm build
pnpm start            # запуск скомпилированного бэкенда
```

### Тестирование

```bash
pnpm test                         # все тесты
pnpm --filter backend test        # тесты бэкенда
pnpm --filter backend test:coverage  # с покрытием
```

---

## Конфигурация окружения

| Переменная | Обязательно | Описание |
|---|---|---|
| `BOT_TOKEN` | Да | Токен Telegram-бота |
| `VK_ACCESS_TOKEN` | Нет | Токен VK-сообщества |
| `VK_GROUP_ID` | Нет | ID группы VK (club123 или 123) |
| `VK_COMMUNITY_CHAT_ID` | Нет | PeerId чата для дублирования игр из ЛС |
| `TELEGRAM_API_URL` | Нет | URL локального Telegram API |
| `API_PORT` | Нет | Порт HTTP API (по умолч. 3000) |
| `LOG_LEVEL` | Нет | Уровень логов (info, debug, error) |

---

## Команды бота

### Telegram

| Команда | Описание |
|---|---|
| `/stats` | Статистика с выбором периода |
| `/top` | Топ-10 участников |
| `/help` | Справка |
| `/menu` | Главное меню |

### VK

| Команда | Описание |
|---|---|
| `@poker_club /stats` | Статистика с выбором периода |
| `@poker_club /top` | Топ-10 участников |
| `@poker_club /help` | Справка |
| Кнопки меню | Быстрые команды через клавиатуру |

Для VK обязательно упоминание `@poker_club` в начале сообщения (или `[club...|@poker_club]`). Исключение — нажатие кнопок меню.

---

## Формат игровых сообщений

```
game 18.07.2026

Вход:
+500 | User1
+300 | User2
Выход:
+1200 | User3
```

- Секции `Вход:` и `Выход:`
- Строки вида `+сумма | ник`
- Комментарии после `//` игнорируются
- Дата через `game DD.MM.YYYY`
- Редактирование сообщения обновляет игру

---

## HTTP API

```
GET /api/stats?chatId=123&filter=all&platform=vk
GET /api/years?chatId=123&platform=vk
```

**Параметры:**
- `chatId` (обязательно) — ID чата
- `filter` — `all`, год (YYYY) или пусто (последний год)
- `platform` — `telegram`, `vk` или пусто (все)

---

## Архитектура

```
core/ (platform-agnostic)
  ├── gameProcessor.ts    — processGameMessage
  ├── statsPresenter.ts   — formatStatsTable, formatTopList, processCommand
  └── types.ts            — IMessage, Platform, ProcessedGameResult

platforms/
  ├── telegram/           — Telegraf → IMessage → core
  └── vk/                 — vk-io → IMessage → core

services/                 — GameService, StatsService, ParserService
db/repositories/          — GameRepository, TransactionRepository, UserRepository
```

- `core/` не импортирует из платформ
- Новая платформа = адаптер, преобразующий сообщение → `IMessage`

---

## Документация

- **[Архитектура бэкенда](packages/backend/docs/README.md)** — слои, DI, data flow, таблицы, env
- **[Архитектура фронтенда](packages/frontend/docs/README.md)** — компоненты, API, TMA integration

---

## Лицензия

MIT
