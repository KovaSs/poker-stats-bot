import { vi, describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import { StatsService } from "@/services";

import yearsRouter from "./years";

vi.mock("@/services", () => ({
  StatsService: {
    getAvailableYears: vi.fn(),
  },
}));

const app = express();
app.use("/years", yearsRouter);

describe("GET /years", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает список годов", async () => {
    StatsService.getAvailableYears.mockReturnValue(["2024", "2025"]);
    const res = await request(app).get("/years?chatId=123");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(["2024", "2025"]);
  });

  it("передаёт параметр platform", async () => {
    await request(app).get("/years?chatId=123&platform=vk");
    expect(StatsService.getAvailableYears).toHaveBeenCalledWith(123, "vk");
  });

  it("возвращает 400 если chatId отсутствует", async () => {
    const res = await request(app).get("/years");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "chatId is required" });
  });

  it("возвращает 400 при невалидном chatId", async () => {
    const res = await request(app).get("/years?chatId=abc");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid chatId" });
  });

  it("возвращает 500 при ошибке сервиса", async () => {
    StatsService.getAvailableYears.mockImplementation(() => {
      throw new Error("DB error");
    });
    const res = await request(app).get("/years?chatId=123");
    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Internal server error" });
  });
});
