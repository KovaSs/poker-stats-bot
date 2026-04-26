# Этап 1: сборка
FROM node:18-slim AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/frontend/package.json ./packages/frontend/
RUN pnpm install --frozen-lockfile --filter frontend
COPY packages/frontend ./packages/frontend
COPY tsconfig.base.json ./tsconfig.base.json
RUN pnpm run --filter frontend build

# Этап 2: веб-сервер
FROM nginx:stable-alpine
COPY --from=builder /app/packages/frontend/dist /usr/share/nginx/html
COPY frontend.nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]