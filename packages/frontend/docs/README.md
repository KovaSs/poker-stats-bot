# Frontend Architecture

Telegram Mini App для просмотра покерной статистики. React 19 + MUI 9 + TanStack Query.

---

## Entrypoint

`src/index.tsx`

1. Импортирует `mocks/telegram` (эмуляция TMA в dev)
2. `initSDK()` + `initData.restore()` — инициализация Telegram Mini Apps
3. Монтирует viewport, fullscreen, theme
4. Создаёт `QueryClient` (staleTime: 5 мин)
5. Рендерит `<AppWithTheme>` в `StrictMode` → `QueryClientProvider` → `ErrorBoundary`

`AppWithTheme` — считывает CSS-переменные Telegram темы (`--tg-theme-*`) и строит MUI-тему.

---

## Component Tree

```
QueryClientProvider
└── ErrorBoundary
    └── App (App.tsx)
        ├── FilterBar
        │   └── кнопки: Всё время / Последний год / <годы>
        ├── StatsTable (Tab 0)
        │   └── MUI Table: №, Игрок, Игр, Вход, Выход, Баланс
        └── TopList (Tab 1)
            └── MUI List: топ-10 с аватарами
```

---

## Key Components

### `App.tsx`

Оркестратор:
- Извлекает `startParam` (формат `chat_-100...`) из launch params → `chatId`
- Извлекает `initDataRaw` для авторизации
- Управляет вкладками (Tabs): Статистика / Топ
- Делает `useQuery` → `GET /api/stats?chatId=...`
- Загрузка: `CircularProgress`. Ошибка: `Alert`

### `StatsTable.tsx`

MUI `Table`. Столбцы: №, Игрок, Игр, Вход, Выход, Баланс.
Цвет баланса: зелёный (>=0), красный (<0). Строка итогов.

### `TopList.tsx`

MUI `List`. Топ-10 по балансу (убывание).
Топ-3 с цветными аватарками (золото/серебро/бронза).
Показывает: имя, кол-во игр, вход/выход, баланс.

### `FilterBar.tsx`

Кнопки фильтрации. Годы загружаются через `useQuery` → `GET /api/years?chatId=...`.
Активный фильтр — `contained`, неактивные — `outlined`.

### `ErrorBoundary.tsx`

Классовый boundary. Ловит ошибки рендера, показывает MUI `Alert`.

---

## API Calls

| Endpoint | Вызывается из | Параметры |
|---|---|---|
| `GET /api/stats` | App.tsx (`fetchStats`) | `chatId`, `filter` |
| `GET /api/years` | FilterBar.tsx (`fetchYears`) | `chatId` |

Авторизация: заголовок `Authorization: tma ${initDataRaw}`.

В dev запросы проксируются Vite (`/api → localhost:3000`).

---

## Telegram Mini App Integration

| SDK | Использование |
|---|---|
| `@telegram-apps/sdk-react` | init, viewport, theme, back button |
| `initDataRaw` | Auth header для API |
| `startParam` | `chat_-100...` — ID чата для статистики |
| CSS-переменные темы | `--tg-theme-bg-color`, `--tg-theme-text-color`, etc. → MUI theme |

---

## Dev Mode

`mocks/telegram.ts` — при отсутствии `window.Telegram.WebApp` эмулирует TMA окружение:
- Тестовый пользователь `id: 12345`
- `start_param: "chat_-1002491492186"`
- Реальные параметры темы Telegram Desktop

---

## Tech Stack

| Библиотека | Версия | Назначение |
|---|---|---|
| react / react-dom | ^19.2.0 | UI |
| @mui/material + icons | ^9 | Компоненты |
| @tanstack/react-query | ^5 | Серверное состояние |
| @telegram-apps/sdk-react | ^2 | TMA SDK |
| Vite | ^7.3.1 | Сборка |
| sass | — | SCSS modules |
