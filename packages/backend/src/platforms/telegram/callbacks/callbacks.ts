import { Telegraf } from "telegraf";

import { statsCallback } from "./stats";
import { topCallback } from "./top";

import type { CallbackHandler } from "./types";

const callbacks: Map<RegExp, CallbackHandler> = new Map([
  [/^stats_(.+)$/, statsCallback],
  [/^top_(.+)$/, topCallback],
]);

export function registerCallbacks(bot: Telegraf) {
  for (const [pattern, handler] of callbacks.entries()) {
    bot.action(pattern, async (ctx) => {
      const match = ctx.match as string[];
      await handler(ctx, match);
    });
  }
}
