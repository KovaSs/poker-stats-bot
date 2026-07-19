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

import yearsRouter from "./years";

const app = express();
app.use("/years", yearsRouter);

describe("GET /years", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает список годов", async () => {
    mockStatsService.getAvailableYears.mockReturnValue(["2024", "2025"]);
    const res = await request(app).get("/years?chatId=123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["2024", "2025"]);
  });

  it("передаёт параметр platform", async () => {
    await request(app).get("/years?chatId=123&platform=vk");
    expect(mockStatsService.getAvailableYears).toHaveBeenCalledWith(123, "vk");
  });

  it("возвращает годы без chatId (глобально)", async () => {
    mockStatsService.getAvailableYears.mockReturnValue(["2024", "2025"]);
    const res = await request(app).get("/years");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["2024", "2025"]);
    expect(mockStatsService.getAvailableYears).toHaveBeenCalledWith(undefined, undefined);
  });

  it("возвращает 400 при невалидном chatId", async () => {
    const res = await request(app).get("/years?chatId=abc");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid chatId" });
  });

  it("возвращает 500 при ошибке сервиса", async () => {
    mockStatsService.getAvailableYears.mockImplementation(() => {
      throw new Error("DB error");
    });
    const res = await request(app).get("/years?chatId=123");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
