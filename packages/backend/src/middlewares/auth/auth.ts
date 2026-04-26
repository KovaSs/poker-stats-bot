import { Request, Response, NextFunction } from "express";

import { BOT_TOKEN } from "@/config/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const initDataRaw = authHeader?.startsWith("tma ")
    ? authHeader.substring(4)
    : null;

  if (!initDataRaw) {
    return res.status(401).json({ error: "Unauthorized: Missing init data" });
  }

  try {
    // Динамически импортируем ESM-модуль
    const { validate } = await import("@tma.js/init-data-node");
    validate(initDataRaw, BOT_TOKEN);
    next();
  } catch (error) {
    console.error("Init data validation failed:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid init data" });
  }
};
