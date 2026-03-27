import { BOT_TOKEN, TELEGRAM_API_URL } from "./config/env";
import { setupBot } from "./telegram/bot";
import { initDB } from "./db/connection";
import { logger } from "./config/logger";

// import { startApiServer } from './api/server';

async function main() {
  initDB();
  const bot = setupBot(BOT_TOKEN, TELEGRAM_API_URL);
  bot.launch();
  logger.info("Bot started");

  // startApiServer();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch((err) => {
  logger.error({ error: err }, "Fatal error");
  process.exit(1);
});
