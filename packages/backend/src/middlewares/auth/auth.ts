import { Request, Response, NextFunction } from "express";
import { BOT_TOKEN } from "@/config/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // В dev-режиме (или при SKIP_AUTH=true) пропускаем без проверки
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const initDataRaw = authHeader?.startsWith("tma ")
    ? authHeader.substring(4)
    : null;

  if (!initDataRaw) {
    return res.status(401).json({ error: "Unauthorized: Missing init data" });
  }

  try {
    const { validate } = await import("@tma.js/init-data-node");
    validate(initDataRaw, BOT_TOKEN);
    next();
  } catch (error) {
    console.error("Init data validation failed:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid init data" });
  }
};
