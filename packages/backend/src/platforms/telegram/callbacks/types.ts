import { Context } from "telegraf";

export type CallbackHandler = (ctx: Context, match: string[]) => Promise<void>;
