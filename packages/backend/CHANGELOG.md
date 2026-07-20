# Changelog — `backend` (poker-stats-monorepo)

<a name="051-2026-07-20"></a>
## [0.5.1] — 2026-07-20

### Fixed
- Статистика и топ теперь отображают имя из `global_users.name` вместо старого username из транзакции
- `getFilteredScores` SQL теперь JOINит с `user_identities`/`global_users` для резолва имени (раньше использовался только `t.username`)

<a name="050-2026-07-19"></a>
## [0.5.0] — 2026-07-19

### Added
- Global user system: `global_users` and `user_identities` tables with migration (007)
- `telegram_bot_message_id` column in `games` table for Telegram message sync (006)
- VK OAuth authentication: `POST /api/auth/vk` endpoint with JWT token generation
- JWT-based auth middleware (`authJwt`) protecting all API routes
- `GET /api/auth/me` endpoint returning current user profile and identities
- `GET /api/stats/me` endpoint returning personal stats across all chats
- Admin API endpoints: `GET/PUT /api/admin/users`, `PUT /api/admin/users/:id/merge`, `GET/PUT/DELETE /api/admin/games`
- `SyncService` for updating Telegram and VK messages when games are edited via admin panel
- `GlobalUserRepository` and `UserIdentityRepository` for global user management
- Migration 008: migrates existing transaction users into `global_users`/`user_identities`
- Migration 009: drops the old `users` table (data preserved in new tables)
- `VK_CLIENT_ID`, `VK_CLIENT_SECRET`, `JWT_SECRET` environment variables
- `jsonwebtoken` and `axios` dependencies for auth
- **Server-side sorting**: `GET /api/stats` and `GET /api/stats/me` accept `?sort=` and `?order=` params (games_count/total_in/total_out/balance, asc/desc)
- **VK ID SDK integration**: FloatingOneTap виджет для авторизации, fallback на redirect при ошибке SDK
- **Combined auth middleware**: поддерживает TMA и JWT
- **Migration 010**: колонка `name` в `global_users` (имя пользователя для статистики и топа)
- **`name` field**: `getFilteredStats` возвращает `COALESCE(gu.name, t.username) as name` через JOIN с `global_users`
- **`ensureUserIdentity`**: `GameService.addTransactions` автоматически создаёт `global_user` + `user_identity` для каждого нового username

### Changed
- `GET /api/stats` and `GET /api/years` now accept optional `chatId` (global queries)
- `StatsService` depends only on `TransactionRepository` + `UserIdentityRepository` (удалён `UserRepository`)
- `StatsService.recalcStats` — no-op (таблица `users` удалена, статистика считается в реальном времени)
- `StatsService` методы принимают `sort`/`order` параметры и передают в SQL
- `TransactionRepository` — безопасная сортировка через whitelist колонок (`SORT_COLUMNS`)
- Статистика группируется по `COUNT(DISTINCT g.game_date)` вместо `COUNT(DISTINCT t.game_id)` — игры одного дня не дублируются
- `GlobalUserRepository.search` — использует `EXISTS` вместо `LEFT JOIN`, включает пользователей без identity
- Telegram game handlers save `telegram_bot_message_id` when bot replies to game
- `GameRow` interface includes `telegram_bot_message_id` and `platform` fields
- `GameRepository.updateField()` for safe dynamic field updates
- VK `duplicateToCommunityChat` uses DI container instead of static method calls
- `POST /api/auth/vk` поддерживает два режима: `{ vk_id }` (клиентский exchange) и `{ code, redirect_uri }` (серверный)
- `PUT /api/admin/users/:id` — принимает `name` для обновления имени пользователя

### Removed
- Old `users` table (migrated to `global_users` + `user_identities`)
- Static method calls on `GameRepository` (replaced with DI container)



### Added
- Dependency Injection via `tsyringe`: repositories and services converted to `@injectable()` classes
- DI container in `di/container.ts` with all singletons registered
- Backend architecture documentation in `docs/README.md`
- `experimentalDecorators` in tsconfig, `reflect-metadata` setup in vitest

### Changed
- All `console.*` calls replaced with `pino` logger across the codebase
- `core/` restructured into subfolders: `gameProcessor/`, `statsPresenter/` with `index.ts` barrel exports
- `GameProcessor`, services, and repositories now use constructor injection instead of static imports
- `core/index.ts` re-exports `processGameMessage` via `container.resolve(GameProcessor)`
- Platform handlers and API routes resolve services lazily from container

### Removed
- Redundant `core/commandProcessor.ts` (re-exported `processCommand` already in `core/index.ts`)

<a name="030-2026-07-19"></a>
## [0.3.0] — 2026-07-19

### Added
- VK bot support via vk-io Long Poll API
- Multiplatform architecture: `core/`, `platforms/telegram/`, `platforms/vk/`
- `IMessage` interface and `processGameMessage` in core for platform-agnostic game processing
- VK commands: `!stats`, `!top`, `!help`, `статистика`, `топ`, `помощь`
- VK keyboard with menu buttons and inline filter keyboards for stats/top
- VK mention support (`@poker_club` and `[club...|@poker_club]` format)
- Wall post processing (`wall_post_new`) and wall reply processing
- Auto-deletion of bot responses after 30s (VK)
- Deletion of user command messages after processing (VK)
- Community chat duplication: games from private messages are posted to a configured chat
- Global statistics (across all chats) for VK commands
- Database migration system with sequential migrations
- `platform` column in `games` table for multi-platform support
- `community_message_id` column for tracking duplicated messages
- Unit tests: 151 tests, 73% code coverage
- Test files restructured alongside source files
- `CHANGELOG.md`

### Changed
- Refactored Telegram handlers to use `core/` layer
- Moved Telegram platform to `platforms/telegram/`
- `StatsService.getFilteredStats`/`getFilteredScores` accept optional `chatId` for global queries
- `TransactionRepository` methods accept optional `chatId`
- All `any` types replaced with proper interfaces or `unknown`
- File structure: each component in its own directory with `index.ts` + source + test

### Removed
- Wall post creation/editing from VK adapter (community chat duplication via messages instead)

### Fixed
- VK Long Poll group detection (`pollingGroupId` parsed from `club...` prefix)
- VK mention detection (handles both `@poker_club` and `[club...|@poker_club]`)
- ESLint-perfectionist sort ordering across all files
