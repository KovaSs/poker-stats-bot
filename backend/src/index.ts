import dotenv from "dotenv";

dotenv.config();

import { setupBot } from "./bot";
import { initDB } from "./db";

const BOT_TOKEN = process.env.BOT_TOKEN!;

async function main() {
  await initDB();
  const bot = setupBot(BOT_TOKEN);
  bot.launch();
  console.log("Bot started");

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

main().catch(console.error);
