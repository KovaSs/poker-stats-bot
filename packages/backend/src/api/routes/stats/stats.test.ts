import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

const mockStatsService = vi.hoisted(() => ({
  getAvailableYears: vi.fn(),
  getFilteredScores: vi.fn(),
  getFilteredStats: vi.fn(),
}));

vi.mock("@/di/container", () => ({
  container: {
    resolve: vi.fn(() => mockStatsService),
  },
}));

import statsRouter from "./stats";

const app = express();
app.use("/stats", statsRouter);

describe("GET /stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает статистику без фильтра", async () => {
    const mockStats = [
      { username: "user1", total_out: 200, games_count: 1, total_in: 100 },
    ];
    mockStatsService.getFilteredStats.mockReturnValue(mockStats);

    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockStats);
    expect(mockStatsService.getFilteredStats).toHaveBeenCalledWith(
      123,
      undefined,
      undefined,
    );
  });

  it("передаёт параметр filter", async () => {
    await request(app).get("/stats?chatId=123&filter=2024");
    expect(mockStatsService.getFilteredStats).toHaveBeenCalledWith(
      123,
      "2024",
      undefined,
    );
  });

  it("передаёт параметр platform", async () => {
    await request(app).get("/stats?chatId=123&platform=vk");
    expect(mockStatsService.getFilteredStats).toHaveBeenCalledWith(
      123,
      undefined,
      "vk",
    );
  });

  it("обрабатывает ошибки сервиса", async () => {
    mockStatsService.getFilteredStats.mockImplementation(() => {
      throw new Error("DB error");
    });
    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
