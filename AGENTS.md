# AGENTS.md — Poker Stats Bot

## Quick start

```bash
pnpm install          # uses node-linker=hoisted (via .npmrc) for better-sqlite3
cp .env.dev .env      # or set BOT_TOKEN manually
pnpm dev              # runs backend + frontend in parallel
pnpm dev:backend      # ts-node-dev with hot-reload on port 3000
pnpm dev:frontend     # Vite on port 5173, proxies /api → localhost:3000
pnpm build            # pnpm -r build
pnpm start            # runs dist/index.js from backend package
```

## Verification commands (run in order)

```bash
pnpm lint             # ESLint from root, .ts/.tsx only
pnpm test             # pnpm -r test:unit — vitest across all packages
```

- **Single test file**: `pnpm --filter backend test -- src/services/game.service/game.service.test.ts`
- **Single package tests**: `pnpm --filter backend test`
- **Coverage**: `pnpm --filter backend test:coverage`
- **Backend lint**: `pnpm --filter backend lint:fix`

## Monorepo structure

- `packages/backend/` — Telegram bot (Telegraf) + VK bot (vk-io) + Express API server
- `packages/frontend/` — React + Vite + MUI + TanStack Query + Telegram Mini Apps
- SQLite DB (`data/stats.db`) created automatically at root level in dev, `/app/data/` in Docker

## Backend architecture

Entrypoint: `packages/backend/src/index.ts` — inits DB, launches Telegraf bot, starts Express API, inits VK Long Poll.

Layers (top→bottom):

- `core/` — platform-agnostic: `gameProcessor/` (GameProcessor класс), `statsPresenter/` (formatStatsTable/TopList/Help/processCommand), `types.ts` (IMessage, IReply, Platform)
- `platforms/telegram/` — thin Telegram adapters, convert Telegraf ctx → IMessage, call core functions
- `platforms/vk/` — VK adapter via vk-io Long Poll, vkContextToIMessage, calls core functions
- `services/` — GameService, StatsService, ParserService
- `db/repositories/` — GameRepository, TransactionRepository, UserRepository
- `db/migrations/` — sequential SQL migrations (001–005)

### Key implementation rules

- To add a new platform, create a platform adapter that converts platform message → `IMessage`, calls `processGameMessage` from core, and handles reply.
- `core/` must NOT import from platform layers (telegram, vk). It imports only from `services/`, `db/repositories/`, `config/logger`.
- `games` table has `platform TEXT DEFAULT 'telegram'` column. Old rows without it act as `telegram` via DEFAULT.
- **Filenames must use camelCase** (shakeCase), never kebab-case. Example: `gameProcessor.ts`, `statsPresenter.ts`.

### Path alias

- `@/` → `./src/*`, resolved at dev-time by `tsconfig-paths/register` and at build by `tsc-alias`

### Env loading

- Auto-loads `.env.dev` in dev, `.env` in prod (from `../../` relative to backend package CWD)
- VK: `VK_ACCESS_TOKEN`, `VK_GROUP_ID`; опционально `VK_COMMUNITY_CHAT_ID` для дублирования игр из ЛС в чат

### Express API

- `GET /api/stats?chatId=&filter=&platform=` (platform optional)
- `GET /api/years?chatId=&platform=` (platform optional)

## Testing

- Vitest with `globals: true`
- `supertest` for API route tests (mock services with `vi.mock`)
- Tests excluded from tsconfig compilation (`**/*.test.ts` excluded)
- DB-dependent tests: services layer is mocked in API tests; service/repo tests use actual in-memory SQLite
- New platform logic belongs in `core/`, test in `core/*.test.ts`
- **151 tests**, **73% coverage** overall

## Versioning & Changelog

### Semver rules

- **Patch** (`0.0.x`) — bugfixes, refactoring without new functionality, test changes, docs
- **Minor** (`0.x.0`) — new features, new API endpoints, new platform support, new components
- **Major** (`x.0.0`) — breaking changes in public API, database schema migrations requiring manual intervention, removal of features

### Package versions

- `packages/backend/` and `packages/frontend/` version independently
- Each package has its own `CHANGELOG.md` with per-version entries
- Root `CHANGELOG.md` aggregates changes across packages per release

### Changelog rules

1. **Package changelogs** (`packages/*/CHANGELOG.md`):
   - Every version change must have a corresponding entry
   - Use semantic grouping: `### Added`, `### Changed`, `### Removed`, `### Fixed`
   - Add `<a name="VERSION"></a>` anchor before each version heading (format: `X-Y-Z` for `X.Y.Z`, e.g. `0-3-1`)
   - Reference the monorepo in the title: `# Changelog — \`package-name\` (poker-stats-monorepo)`

2. **Root changelog** (`CHANGELOG.md`):
   - Top-level `## [version] — YYYY-MM-DD` headings
   - Per-package sections: `### Backend — [vX.Y.Z](link#anchor)` and `### Frontend — [vX.Y.Z](link#anchor)`
   - Include only the most notable changes per package (3–5 bullet points max)
   - Full details live in the respective package changelog

3. **When to bump**:
   - Bump version in `package.json` + `CHANGELOG.md` in the same commit as the changes
   - Run `pnpm test` and `pnpm lint` before committing

## ESLint quirks

- `perfectionist/sort-imports`, `sort-objects`, `sort-interfaces` all set to `type: "line-length", order: "desc"`
- `no-console: warn` globally, **off** in `packages/backend/`
- **Never use `any` type** — define proper interfaces or use `unknown`
- Frontend adds `react-hooks` plugin (`rules-of-hooks: error`, `exhaustive-deps: warn`)
- Each package extends `../../eslint.config.js` with its own parser options

## Docker

- `docker-compose.yml` runs both services: `bot` (port 3000) and `frontend` (port 8080 via nginx)
- Production env vars (BOT_TOKEN) passed via `environment:` block, not `.env` file
- `SKIP_AUTH=true` set in docker-compose — auth middleware is bypassed
- Backend multi-stage Dockerfile uses `pnpm deploy --legacy` for pruned production node_modules
- Frontend Dockerfile builds static files, serves via nginx with API proxy to `http://bot:3000`

## Auth

- Express API uses `@tma.js/init-data-node` to validate Telegram Mini App init data
- Skipped in dev and Docker (`SKIP_AUTH=true` or non-production NODE_ENV)

## Platform adapters

### Telegram bot

- Commands: `/stats`, `/top`, `/help`, `/stats_update`, `/menu`
- Parses messages with `Вход:` / `Выход:` sections, lines format: `+<amount> | <username>`
- Requires `@bot_username` mention + `game` keyword for game processing
- Supports: photo captions, edited messages, `game DD.MM.YYYY` date syntax
- Bot auto-deletes responses and command messages after 30s

### VK bot

- Uses vk-io Long Poll API (`VK_ACCESS_TOKEN` required)
- Commands: `!stats`, `!top`, `!help`, `статистика`, `топ`, `помощь` (с упоминанием `@poker_club`)
- Исключение: кнопки меню работают без упоминания
- Game processing triggered by `game` keyword + `@poker_club`
- VK-формат упоминания `[club240343559|@poker_club]` также поддерживается
- Поддерживает: редактирование, `game DD.MM.YYYY`
- Персистентная клавиатура с кнопками меню
- Inline-клавиатура с фильтрами для статистики/топа
- Автоудаление ответов через 30с, удаление команд пользователя
- Для `VK_COMMUNITY_CHAT_ID`: дублирование игр из ЛС в чат сообщества
- Глобальная статистика (по всем чатам) для команд `/stats`, `/top`
