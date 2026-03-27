import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), "../.env");
dotenv.config({ path: envPath });

export const BOT_TOKEN = process.env.BOT_TOKEN!;
export const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL!;
export const API_PORT = parseInt(process.env.API_PORT || "3000", 10);

if (!BOT_TOKEN) {
  console.error(
    "❌ BOT_TOKEN не задан. Создайте файл .env в корне проекта и добавьте BOT_TOKEN=ваш_токен",
  );
  process.exit(1);
}
