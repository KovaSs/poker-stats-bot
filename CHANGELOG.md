# Changelog — poker-stats-monorepo

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
