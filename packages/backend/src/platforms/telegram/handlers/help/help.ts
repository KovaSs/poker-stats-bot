import { Context } from "telegraf";

import { formatHelp } from "@/core";

import { replyWithAutoDelete } from "../../middlewares";

export async function sendHelpMessage(ctx: Context) {
  const helpMessage = formatHelp();
  await replyWithAutoDelete(ctx, helpMessage);
}
