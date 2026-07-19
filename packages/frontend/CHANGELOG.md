# Changelog — `frontend` (poker-stats-monorepo)

<a name="002-2026-07-19"></a>
## [0.0.2] — 2026-07-19

### Added
- Frontend architecture documentation in `docs/README.md`
- `CHANGELOG.md`

<a name="001-2026-07-19"></a>
## [0.0.1] — 2026-07-19

### Added
- React 19 + MUI 9 + TanStack Query frontend as Telegram Mini App
- Stats table view: №, Игрок, Игр, Вход, Выход, Баланс with green/red balance coloring
- Top 10 list view with gold/silver/bronze avatars for podium positions
- Filter bar with "Всё время", "Последний год", and dynamic year buttons
- Year list loaded from `GET /api/years` API endpoint
- Tab navigation: Статистика / Топ
- Authentication via `Authorization: tma <initDataRaw>` header for API requests
- Telegram Mini App SDK integration: init, viewport, fullscreen, theme synchronization
- MUI theme generated from Telegram CSS variables (`--tg-theme-*`)
- Error boundary with MUI Alert fallback
- Dev mode Telegram environment mock with test user and chat params
- Vite dev server with proxy to backend (`/api → localhost:3000`)
- Loading state with CircularProgress and error state with Alert
- Root-level `chatId` extracted from Telegram launch parameters (`chat_-100...`)
