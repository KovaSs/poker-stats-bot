import { Request, Response, NextFunction } from "express";

import { BOT_TOKEN } from "@/config/env";
import { logger } from "@/config/logger";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    logger.info("[AUTH] SKIP_AUTH is enabled, skipping validation");
    return next();
  }

  const authHeader = req.headers["authorization"];
  logger.info(`[AUTH] raw header: ${JSON.stringify(authHeader, null, 2)}`);

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
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    logger.error(`Init data validation failed: ${error.message}`);
    logger.error(`Init data raw:: ${JSON.stringify(initDataRaw, null, 2)}`);
    return res.status(401).json({ error: "Unauthorized: Invalid init data" });
  }
};
