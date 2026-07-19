export type Platform = "telegram" | "vk";

export interface IMessage {
  replyToMessageId?: number;
  fromUsername?: string;
  fromUserId?: number;
  platform: Platform;
  isEdited?: boolean;
  messageId: number;
  chatType?: string;
  chatId: number;
  text: string;
}

export interface IReply {
  text: string;
}

export interface ProcessedGameResult {
  reply: string | null;
  gameId?: number;
  ok: boolean;
}

export interface CommandResult {
  reply: string | null;
}
