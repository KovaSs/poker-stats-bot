# syntax=docker/dockerfile:1
# Этап 1: установка зависимостей
FROM node:18-slim AS deps
RUN npm install -g pnpm
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY package.json ./
COPY packages/backend/package.json ./packages/backend/
RUN pnpm install --frozen-lockfile --filter backend

# Этап 2: сборка TypeScript
FROM deps AS builder
COPY . .
RUN pnpm --filter backend build

# Этап 3: создание облегчённой продакшен-папки (pnpm deploy)
FROM deps AS pruned
RUN pnpm --filter backend --prod deploy --legacy /app/pruned

# Этап 4: финальный образ
FROM node:18-slim AS runner
WORKDIR /app

# Копируем самодостаточную папку с зависимостями (уже включает better-sqlite3)
COPY --from=pruned /app/pruned .

# Копируем скомпилированный JavaScript
COPY --from=builder /app/packages/backend/dist ./dist

VOLUME [ "/app/data" ]
EXPOSE 3000
CMD ["node", "dist/index.js"]