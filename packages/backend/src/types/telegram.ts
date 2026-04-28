import { Context, NarrowedContext } from "telegraf";

import type { Update, Message } from "telegraf/types";

// Тип для текстовых команд (например, /stats, /top)
export type CommandContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.TextMessage>
>;

// Тип для любого текстового сообщения (не обязательно команда)
export type TextMessageContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.TextMessage>
>;

// Тип для сообщения с фото
export type PhotoMessageContext = NarrowedContext<
  Context<Update>,
  Update.MessageUpdate<Message.PhotoMessage>
>;
