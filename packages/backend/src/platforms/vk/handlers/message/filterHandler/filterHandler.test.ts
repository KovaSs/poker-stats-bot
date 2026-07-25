import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const mockGetFilteredStats = vi.fn();
const mockGetFilteredScores = vi.fn();
const mockGetAvailableYears = vi.fn();

vi.mock("@/di/container", () => ({
  container: {
    resolve: vi.fn(() => ({
      getFilteredStats: mockGetFilteredStats,
      getFilteredScores: mockGetFilteredScores,
      getAvailableYears: mockGetAvailableYears,
    })),
  },
}));

vi.mock("@/services", () => ({
  StatsService: class {},
}));

vi.mock("@/core", () => ({
  formatStatsTable: vi.fn((_stats, filter) => `stats_table_${filter}`),
  formatTopList: vi.fn((_scores, filter) => `top_list_${filter}`),
}));

vi.mock("@/config/logger", () => {
  const mock = { error: vi.fn(), info: vi.fn(), warn: vi.fn() };
  return { logger: mock };
});

import { logger } from "@/config/logger";

const mockLogger = logger as unknown as { info: ReturnType<typeof vi.fn>; error: ReturnType<typeof vi.fn>; warn: ReturnType<typeof vi.fn> };

const mockVkDelete = vi.fn();
vi.mock("../../../bot", () => ({
  getVK: vi.fn(),
}));

vi.mock("../../../handlers/menu/menu", () => ({
  buildStatsFilterKeyboard: vi.fn((years) => `stats_keyboard_${years.join(",")}`),
  buildTopFilterKeyboard: vi.fn((years) => `top_keyboard_${years.join(",")}`),
}));

import { getVK } from "../../../bot";

import { saveFilterPromptId, deleteFilterPrompt, handleFilterCommand } from "./filterHandler";

describe("filterHandler", () => {
  const mockSend = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
    (getVK as ReturnType<typeof vi.fn>).mockReturnValue(null);
  });

  describe("saveFilterPromptId", () => {
    it("stores prompt id and logs info", () => {
      saveFilterPromptId(123, 456);
      expect(mockLogger.info).toHaveBeenCalledWith(
        expect.stringContaining("Сохранён ID подсказки 456 для peer 123"),
      );
    });
  });

  describe("deleteFilterPrompt", () => {
    it("deletes prompt message and removes from map when vkClient exists", async () => {
      const mockDelete = vi.fn().mockResolvedValue({});
      (getVK as ReturnType<typeof vi.fn>).mockReturnValue({
        api: { messages: { delete: mockDelete } },
      });
      saveFilterPromptId(123, 456);
      await deleteFilterPrompt(123);
      expect(mockDelete).toHaveBeenCalledWith({
        delete_for_all: true,
        message_ids: 456,
        peer_id: 123,
      });
    });

    it("does nothing when no prompt exists", async () => {
      await deleteFilterPrompt(999);
      const mockDelete = vi.fn();
      (getVK as ReturnType<typeof vi.fn>).mockReturnValue({
        api: { messages: { delete: mockDelete } },
      });
      expect(mockDelete).not.toHaveBeenCalled();
    });

    it("does nothing when vkClient is null", async () => {
      saveFilterPromptId(123, 456);
      await deleteFilterPrompt(123);
      expect(getVK).toHaveBeenCalled();
    });

    it("handles delete error gracefully", async () => {
      const mockDelete = vi.fn().mockRejectedValue(new Error("API error"));
      (getVK as ReturnType<typeof vi.fn>).mockReturnValue({
        api: { messages: { delete: mockDelete } },
      });
      saveFilterPromptId(123, 456);
      await expect(deleteFilterPrompt(123)).resolves.toBeUndefined();
    });
  });

  describe("handleFilterCommand", () => {
    it("sends filtered stats when filter is provided", async () => {
      mockGetFilteredStats.mockReturnValue([{ username: "test" }]);
      await handleFilterCommand("stats", 1, "2024", mockSend);
      expect(mockGetFilteredStats).toHaveBeenCalledWith(undefined, "2024");
      expect(mockSend).toHaveBeenCalledWith("stats_table_2024");
    });

    it("sends filtered top when filter is provided", async () => {
      mockGetFilteredScores.mockReturnValue([{ username: "test", score: 100 }]);
      await handleFilterCommand("top", 1, "2024", mockSend);
      expect(mockGetFilteredScores).toHaveBeenCalledWith(undefined, "2024");
      expect(mockSend).toHaveBeenCalledWith("top_list_2024");
    });

    it("deletes previous filter prompt before sending filtered result", async () => {
      const mockDelete = vi.fn().mockResolvedValue({});
      (getVK as ReturnType<typeof vi.fn>).mockReturnValue({
        api: { messages: { delete: mockDelete } },
      });
      saveFilterPromptId(1, 999);
      mockGetFilteredStats.mockReturnValue([]);
      await handleFilterCommand("stats", 1, "all", mockSend);
      expect(mockDelete).toHaveBeenCalled();
    });

    it("shows stats filter keyboard when no filter", async () => {
      mockGetAvailableYears.mockReturnValue(["2024", "2025"]);
      await handleFilterCommand("stats", 1, undefined, mockSend);
      expect(mockSend).toHaveBeenCalledWith("📊 Выберите период для статистики:", {
        keyboard: "stats_keyboard_2024,2025",
      });
    });

    it("shows top filter keyboard when no filter", async () => {
      mockGetAvailableYears.mockReturnValue(["2024"]);
      await handleFilterCommand("top", 1, undefined, mockSend);
      expect(mockSend).toHaveBeenCalledWith("🏆 Выберите период для топа:", {
        keyboard: "top_keyboard_2024",
      });
    });
  });
});
