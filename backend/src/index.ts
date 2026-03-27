import { initDB } from "./db/connection";
import { setupBot } from "./telegram/bot";
import { startApiServer } from "./api/server";
import { BOT_TOKEN, TELEGRAM_API_URL } from "./config/env";

async function main() {
  initDB();
  const bot = setupBot(BOT_TOKEN, TELEGRAM_API_URL);
  bot.launch();
  console.log("Bot started");

  // startApiServer();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch(console.error);
