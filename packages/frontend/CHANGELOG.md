# Changelog — `frontend` (poker-stats-monorepo)

<a name="010-2026-07-19"></a>
## [0.1.0] — 2026-07-19

### Added
- VK OAuth login: VK ID FloatingOneTap widget + popup-авторизация + fallback redirect
- AuthProvider context for global auth state (token, user, role)
- Admin panel with two sub-tabs: "Пользователи" and "Игры"
- Admin Users table: role management (select dropdown), user search, user merge dialog
- Admin Games table: inline editing of game date and transactions, delete with confirmation
- "Моя статистика" и "Мой топ" tabs showing personal stats for authenticated users
- JWT Bearer token support for API requests
- Server-side sorting: колонки Игр/Вход/Выход/Баланс с sort/order параметрами в URL
- Пагинация таблицы (5/10/25/50 строк)
- MUI AppBar с адаптивным меню и аватаром пользователя
- **Колонка «Имя»** в таблице пользователей (inline-редактирование в админке)
- **Отображение `name`** в StatsTable и TopList вместо `username` (при наличии)

### Changed
- AppBar replaces Tabs для навигации по разделам
- StatsTable: сортировка через сервер + пагинация
- Удалена Telegram Mini App авторизация (заменена на VK ID)
- Тёмная тема MUI вместо Telegram CSS-переменных
- useVkLogin hook для popup-авторизации через VK ID SDK
- Компоненты разделены на отдельные табы: Статистика, Топ, Моя статистика, Мой топ
- Раздел «Администрирование» виден всем пользователям (действия только для админов)
- `UserStats` интерфейс включает поле `name`

### Removed
- Telegram SDK (`@telegram-apps/sdk-react`) — больше не используется
- TMA initData авторизация на фронте
- Telegram мок окружения



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
