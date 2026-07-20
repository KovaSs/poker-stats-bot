# Changelog — poker-stats-monorepo

## [0.3.1] — 2026-07-20

### Backend — [v0.5.1](packages/backend/CHANGELOG.md#051-2026-07-20)

- Исправлено отображение имени в статистике и топе: теперь используется `global_users.name` вместо старого `t.username`
- `getFilteredScores` теперь резолвит имя через `user_identities`/`global_users` (раньше работал только `getFilteredStats`)

## [0.3.0] — 2026-07-19

### Backend — [v0.5.0](packages/backend/CHANGELOG.md#050-2026-07-19)

- Global user system with `global_users` and `user_identities` tables
- VK OAuth authentication with JWT tokens
- Admin API for user management and game editing
- SyncService for automatic message updates on game changes
- `telegram_bot_message_id` column for Telegram message tracking
- Server-side sorting: `?sort=` + `?order=` для `/api/stats` и `/api/stats/me`
- Имя пользователя (`name`) в `global_users`, статистика через `COALESCE(gu.name, t.username)`
- Автосоздание `user_identity` при добавлении транзакций (VK-пользователи в админке)
- Статистика группируется по `game_date` (игры одного дня не дублируются)

### Frontend — [v0.1.0](packages/frontend/CHANGELOG.md#010-2026-07-19)

- VK OAuth login with FloatingOneTap widget + popup + fallback redirect
- Auth context (token, user, role)
- Admin panel with user and game management
- Personal stats ("Моя статистика") tab
- MUI AppBar навигация вместо Tabs
- Сортировка таблиц (Игр/Вход/Выход/Баланс) через сервер + пагинация
- Удалена Telegram Mini App авторизация

## [0.2.0] — 2026-07-19

### Backend — [v0.4.0](packages/backend/CHANGELOG.md#040-2026-07-19)

- Dependency Injection with `tsyringe` (services/repos as classes, DI container)
- `console.*` replaced with `pino` logger across the codebase
- `core/` restructured into subfolders with barrel exports
- Backend architecture docs

### Frontend — [v0.0.2](packages/frontend/CHANGELOG.md#002-2026-07-19)

- Frontend architecture docs
- CHANGELOG.md

## [0.1.0] — 2026-07-19

### Backend — [v0.3.0](packages/backend/CHANGELOG.md#030-2026-07-19)

- VK bot support via vk-io Long Poll API
- Multiplatform architecture: `core/`, `platforms/telegram/`, `platforms/vk/`
- Database migration system
- 151 tests, 73% coverage

### Frontend — [v0.0.1](packages/frontend/CHANGELOG.md#001-2026-07-19)

- React 19 + MUI 9 + TanStack Query Telegram Mini App
- Stats table and Top 10 views with year filtering
- Telegram Mini App SDK integration
