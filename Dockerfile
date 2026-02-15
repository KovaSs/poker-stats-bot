# Этап сборки бэкенда (компиляция TypeScript)
FROM node:18 AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend/ ./
RUN npm ci
RUN npm run build

# Финальный образ
FROM node:18-slim
WORKDIR /app

# Устанавливаем инструменты сборки для компиляции нативных модулей
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Копируем только необходимые файлы из builder-стадий
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package.json ./

# Устанавливаем зависимости и принудительно пересобираем sqlite3 под архитектуру контейнера
RUN npm install --production && npm rebuild sqlite3 --build-from-source

# Папка для базы данных
VOLUME [ "/app/data" ]

EXPOSE 3000
CMD ["node", "dist/index.js"]