# Changelog — poker-stats-monorepo

## [0.4.12] — 2026-07-26

### Backend — [v0.6.8](packages/backend/CHANGELOG.md#068-2026-07-26)

- `authJwt`: при наличии валидного JWT используется его payload, даже при SKIP_AUTH

## [0.4.11] — 2026-07-26

### Backend — [v0.6.7](packages/backend/CHANGELOG.md#067-2026-07-26)

- `PUT /api/admin/users/:id`: поддержка email и avatar_url

### Frontend — [v0.2.8](packages/frontend/CHANGELOG.md#028-2026-07-26)

- Админ-панель: диалог редактирования пользователя (имя, роль, email, URL аватара)

## [0.4.10] — 2026-07-26

### Backend — [v0.6.6](packages/backend/CHANGELOG.md#066-2026-07-26)

- VK API: получение аватара и имени пользователя после авторизации
- Миграция 011: колонка `avatar_url` в `global_users`
- `/api/auth/me`: возвращает `avatar_url` и `name`

### Frontend — [v0.2.7](packages/frontend/CHANGELOG.md#027-2026-07-26)

- Отображение аватара и имени пользователя из VK в AppBar

## [0.4.9] — 2026-07-26

### Frontend — [v0.2.6](packages/frontend/CHANGELOG.md#026-2026-07-26)

- VK OAuth: возвращён PKCE-редирект (вместо поповера)

## [0.4.8] — 2026-07-26

### Backend — [v0.6.5](packages/backend/CHANGELOG.md#065-2026-07-26)

- VK OAuth: проверка `VK_CLIENT_ID`, обработка ошибок VK API, динамический домен для токен-ендпоинта

## [0.4.7] — 2026-07-25

### Frontend — [v0.2.5](packages/frontend/CHANGELOG.md#025-2026-07-25)

- VK OAuth: поповер-авторизация через `window.open()` с PKCE вместо редиректа страницы

## [0.4.6] — 2026-07-25

### Backend — [v0.6.4](packages/backend/CHANGELOG.md#064-2026-07-25)

- `authJwt`: при SKIP_AUTH=true устанавливается mock-пользователь, `/api/auth/me` не падает с 500

## [0.4.5] — 2026-07-25

### Backend — [v0.6.3](packages/backend/CHANGELOG.md#063-2026-07-25)

- VK OAuth token exchange: исправлен endpoint `/oauth2/auth` (был `/oauth2/token`)

## [0.4.4] — 2026-07-25

### Backend — [v0.6.2](packages/backend/CHANGELOG.md#062-2026-07-25)

- `POST /api/auth/vk`: добавлена поддержка `device_id` для code_v2 (VK OAuth PKCE)

### Frontend — [v0.2.4](packages/frontend/CHANGELOG.md#024-2026-07-25)

- VK OAuth PKCE: передача `device_id` из URL в backend для code_v2

## [0.4.3] — 2026-07-25

### Backend — [v0.6.1](packages/backend/CHANGELOG.md#061-2026-07-25)

- `POST /api/auth/vk`: добавлена поддержка `code_verifier` (PKCE)

### Frontend — [v0.2.3](packages/frontend/CHANGELOG.md#023-2026-07-25)

- VK ID авторизация: PKCE-редирект вместо FloatingOneTap
- Новый хук `useVkAuth` с PKCE challenge/verifier (вместо `useVkFloatingOneTap`)

## [0.4.2] — 2026-07-25

### Frontend — [v0.2.2](packages/frontend/CHANGELOG.md#022-2026-07-25)

- FloatingOneTap: удалён fallback-редирект в VK OAuth (требует PKCE, который не поддерживается простым редиректом). При ошибке виджета — сообщение пользователю, повторная попытка по клику

## [0.4.1] — 2026-07-25

### Frontend — [v0.2.1](packages/frontend/CHANGELOG.md#021-2026-07-25)

- Исправлен fallback-редирект FloatingOneTap: серверный обмен кода вместо client-side `exchangeCode`

## [0.4.0] — 2026-07-25

### Backend — [v0.6.0](packages/backend/CHANGELOG.md#060-2026-07-25)

- Удалена TMA-авторизация (middlewares/auth, middlewares/combinedAuth, `@tma.js/init-data-node`)
- VK message handler рефакторинг: выделены `buttonProcessor.ts` и `filterHandler.ts`
- Express API: `combinedAuth` заменён на `authJwt`
- 22 новых unit-теста (100% coverage для новых модулей)

### Frontend — [v0.2.0](packages/frontend/CHANGELOG.md#020-2026-07-25)

- VK ID авторизация: FloatingOneTap виджет вместо popup-авторизации
- Новый хук `useVkFloatingOneTap` (старый `useVkLogin` удалён)
- Отображение ошибок авторизации через Alert

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
