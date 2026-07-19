import { vi, describe, it, expect, beforeEach } from "vitest";

import type { Request, Response, NextFunction } from "express";

vi.mock("@/config/logger", () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock("@/config/env", () => ({
  BOT_TOKEN: "test_token",
  TELEGRAM_API_URL: "",
  FRONTEND_URL: "",
  API_PORT: 3000,
}));

describe("authMiddleware", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("пропускает запрос если SKIP_AUTH=true", async () => {
    process.env.SKIP_AUTH = "true";
    process.env.NODE_ENV = "production";
    const { authMiddleware } = await import("./auth");
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("пропускает запрос если NODE_ENV не production", async () => {
    process.env.SKIP_AUTH = "false";
    process.env.NODE_ENV = "development";
    const { authMiddleware } = await import("./auth");
    const req = { headers: {} } as Request;
    const res = {} as Response;
    const next = vi.fn() as NextFunction;
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("возвращает 401 если init data отсутствует", async () => {
    process.env.SKIP_AUTH = "false";
    process.env.NODE_ENV = "production";
    const { authMiddleware } = await import("./auth");
    const req = { headers: {} } as Request;
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const res = { status, json } as unknown as Response;
    await authMiddleware(req, res, {} as NextFunction);
    expect(status).toHaveBeenCalledWith(401);
    expect(json).toHaveBeenCalledWith({ error: "Unauthorized: Missing init data" });
  });

  it("возвращает 401 при невалидном init data", async () => {
    process.env.SKIP_AUTH = "false";
    process.env.NODE_ENV = "production";
    const { authMiddleware } = await import("./auth");
    const req = { headers: { authorization: "tma invalid_data" } } as Request;
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const res = { status, json } as unknown as Response;
    await authMiddleware(req, res, {} as NextFunction);
    expect(status).toHaveBeenCalledWith(401);
  });

  it("возвращает 401 при отсутствии tma префикса", async () => {
    process.env.SKIP_AUTH = "false";
    process.env.NODE_ENV = "production";
    const { authMiddleware } = await import("./auth");
    const req = { headers: { authorization: "Bearer token" } } as Request;
    const status = vi.fn().mockReturnThis();
    const json = vi.fn();
    const res = { status, json } as unknown as Response;
    await authMiddleware(req, res, {} as NextFunction);
    expect(status).toHaveBeenCalledWith(401);
  });
});
