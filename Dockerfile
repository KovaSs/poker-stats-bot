# syntax=docker/dockerfile:1
FROM node:18-slim AS base
RUN npm install -g pnpm

# Установка всех зависимостей (включая dev) для сборки
FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY package.json ./
COPY packages/backend/package.json ./packages/backend/
RUN pnpm install --frozen-lockfile --filter backend

# Сборка TypeScript
FROM deps AS builder
COPY . .
RUN pnpm --filter backend build

# Создание самодостаточной продакшен‑папки (с флагом --legacy)
FROM deps AS pruned
RUN pnpm --filter backend --prod deploy --legacy /app/pruned

# Финальный образ
FROM node:18-slim AS runner
WORKDIR /app

# Установка системных зависимостей для better-sqlite3
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Копируем самодостаточную папку с продакшен‑зависимостями
COPY --from=pruned /app/pruned .

# Копируем скомпилированный код
COPY --from=builder /app/packages/backend/dist ./dist

VOLUME [ "/app/data" ]
EXPOSE 3000
CMD ["node", "dist/index.js"]