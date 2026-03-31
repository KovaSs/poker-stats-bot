# ---- Этап сборки (компиляция TypeScript) ----
FROM node:18 AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend/ ./
RUN npm run build

# ---- Этап для production‑зависимостей (без dev) ----
FROM node:18 AS backend-deps
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev

# ---- Финальный образ ----
FROM node:18-slim
WORKDIR /app

# Системные зависимости для сборки нативных модулей (sqlite3)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Копируем production‑зависимости
COPY --from=backend-deps /app/backend/node_modules ./node_modules
# Копируем скомпилированные файлы
COPY --from=backend-builder /app/backend/dist ./dist
# Копируем package.json (необязательно)
COPY --from=backend-builder /app/backend/package.json ./

# Создаём tsconfig.json для разрешения алиасов @/*
RUN echo '{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["dist/*"] } } }' > /app/tsconfig.json

# Папка для базы данных
VOLUME [ "/app/data" ]

EXPOSE 3000

CMD [ "node", "-r", "tsconfig-paths/register", "dist/index.js" ]