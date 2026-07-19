import { describe, it, expect } from "vitest";

import { vkContextToIMessage } from "./adapters";

describe("vkContextToIMessage", () => {
  it("возвращает IMessage при корректных данных", () => {
    const result = vkContextToIMessage({
      conversationMessageId: 42,
      text: "game 18.07.2026",
      peerType: "user",
      senderId: 12345,
      peerId: 67890,
    });
    expect(result).toEqual({
      text: "game 18.07.2026",
      fromUsername: "12345",
      fromUserId: 12345,
      chatType: "user",
      isEdited: false,
      platform: "vk",
      chatId: 67890,
      messageId: 42,
    });
  });

  it("возвращает null при отсутствии text", () => {
    expect(
      vkContextToIMessage({
        conversationMessageId: 1,
        peerId: 2,
      } as any),
    ).toBeNull();
  });

  it("возвращает null при отсутствии peerId", () => {
    expect(
      vkContextToIMessage({
        conversationMessageId: 1,
        text: "hello",
      } as any),
    ).toBeNull();
  });

  it("возвращает null при отсутствии conversationMessageId", () => {
    expect(
      vkContextToIMessage({
        text: "hello",
        peerId: 2,
      } as any),
    ).toBeNull();
  });

  it("передаёт isEdited", () => {
    const result = vkContextToIMessage({
      conversationMessageId: 1,
      isEdited: true,
      text: "test",
      peerId: 2,
    });
    expect(result?.isEdited).toBe(true);
  });

  it("устанавливает isEdited в false по умолчанию", () => {
    const result = vkContextToIMessage({
      conversationMessageId: 1,
      text: "test",
      peerId: 2,
    });
    expect(result?.isEdited).toBe(false);
  });

  it("обрабатывает отсутствующий senderId", () => {
    const result = vkContextToIMessage({
      conversationMessageId: 1,
      text: "test",
      peerId: 2,
    });
    expect(result?.fromUserId).toBeUndefined();
    expect(result?.fromUsername).toBeUndefined();
  });
});
