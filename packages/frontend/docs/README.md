# Frontend Architecture

Веб-приложение для просмотра покерной статистики. React 19 + MUI 9 + TanStack Query + VK ID.

---

## Entrypoint

`src/index.tsx`

1. Создаёт `QueryClient` (staleTime: 5 мин)
2. Рендерит `<AppWithTheme>` в `StrictMode` → `QueryClientProvider` → `ErrorBoundary`

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

Авторизация: заголовок `Authorization: Bearer ${jwt}`.

В dev запросы проксируются Vite (`/api → localhost:3000`).

---

## Tech Stack

| Библиотека | Версия | Назначение |
|---|---|---|
| react / react-dom | ^19.2.0 | UI |
| @mui/material + icons | ^9 | Компоненты |
| @tanstack/react-query | ^5 | Серверное состояние |
| Vite | ^7.3.1 | Сборка |
| sass | — | SCSS modules |
