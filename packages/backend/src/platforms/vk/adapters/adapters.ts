import type { IMessage } from "@/core";

export interface VKContext {
  attachments?: { toString: () => string }[];
  conversationMessageId?: number;
  isEdited?: boolean;
  senderId?: number;
  peerType?: string;
  peerId?: number;
  text?: string;
}

export function vkContextToIMessage(ctx: VKContext): IMessage | null {
  if (!ctx.text || !ctx.peerId || !ctx.conversationMessageId) {
    return null;
  }

  return {
    fromUsername: ctx.senderId?.toString(),
    messageId: ctx.conversationMessageId,
    isEdited: ctx.isEdited ?? false,
    fromUserId: ctx.senderId,
    chatType: ctx.peerType,
    chatId: ctx.peerId,
    text: ctx.text,
    platform: "vk",
  };
}
