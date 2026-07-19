import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("@/config/env", () => ({
  VK_COMMUNITY_CHAT_ID: null,
  TELEGRAM_API_URL: "",
  VK_ACCESS_TOKEN: "",
  BOT_TOKEN: "test",
  FRONTEND_URL: "",
  VK_GROUP_ID: "",
  API_PORT: 3000,
}));

vi.mock("@/db/repositories", () => ({
  GameRepository: class {
    updateCommunityMessageId = vi.fn();
    findById = vi.fn();
  },
  UserIdentityRepository: class {},
  TransactionRepository: class {},
  GlobalUserRepository: class {},
  UserRepository: class {},
}));

vi.mock("@/di/container", () => ({
  container: {
    resolve: vi.fn(() => new (class {
      updateCommunityMessageId = vi.fn();
      findById = vi.fn();
    })()),
  },
}));

vi.mock("@/config/logger", () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

import { logger } from "@/config/logger";

describe("duplicateToCommunityChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("логирует предупреждение если VK_COMMUNITY_CHAT_ID не задан", async () => {
    const { duplicateToCommunityChat } = await import("./duplicate");
    await duplicateToCommunityChat(1, "text");
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("VK_COMMUNITY_CHAT_ID не задан"),
    );
  });
});
