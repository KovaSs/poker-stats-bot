import dotenv from "dotenv";
import path from "path";
import fs from "fs";

import { logger } from "@/config/logger";

function getEnvPath(): string {
  // Если путь явно задан через ENV_PATH
  if (process.env.ENV_PATH) {
    return process.env.ENV_PATH;
  }

  const isProduction = process.env.NODE_ENV === "production";
  const envFileName = isProduction ? ".env" : ".env.dev";

  // В production (Docker) ищем файл в /app
  if (isProduction) {
    const prodPath = path.join("/app", envFileName);
    if (fs.existsSync(prodPath)) return prodPath;
    // Если файла нет, всё равно вернём путь — ошибка будет позже, если не задан BOT_TOKEN
    return prodPath;
  }

  // В разработке ищем файл в корне монорепозитория (два уровня вверх)
  const devPath = path.resolve(process.cwd(), "../../", envFileName);
  if (fs.existsSync(devPath)) {
    return devPath;
  }

  // Запасной вариант: текущая директория
  return path.resolve(process.cwd(), envFileName);
}

const envPath = getEnvPath();
logger.info(`[ENV] Загружаю ${path.basename(envPath)} из: ${envPath}`);
dotenv.config({ path: envPath });

export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL!;
export const API_PORT = parseInt(process.env.API_PORT || "3000", 10);

if (!BOT_TOKEN) {
  logger.error(
    `❌ BOT_TOKEN не задан. Проверьте файл ${path.basename(envPath)} в корне проекта или переменные окружения.`,
  );
  process.exit(1);
}
