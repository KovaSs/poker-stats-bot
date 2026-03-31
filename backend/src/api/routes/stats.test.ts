import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import { StatsService } from "@/services";

import statsRouter from "./stats";

vi.mock("../../services", () => ({
  StatsService: {
    getFilteredStats: vi.fn(),
  },
}));

const app = express();
app.use("/stats", statsRouter);

describe("GET /stats", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает статистику без фильтра", async () => {
    const mockStats = [
      { username: "user1", total_in: 100, total_out: 200, games_count: 1 },
    ];
    (StatsService.getFilteredStats as any).mockReturnValue(mockStats);

    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockStats);
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(123, undefined);
  });

  it("передаёт параметр filter", async () => {
    await request(app).get("/stats?chatId=123&filter=2024");
    expect(StatsService.getFilteredStats).toHaveBeenCalledWith(123, "2024");
  });

  it("обрабатывает ошибки сервиса", async () => {
    (StatsService.getFilteredStats as any).mockImplementation(() => {
      throw new Error("DB error");
    });
    const res = await request(app).get("/stats?chatId=123");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
