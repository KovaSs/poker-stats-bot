import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { BOT_TOKEN, JWT_SECRET } from "@/config/env";
import { logger } from "@/config/logger";

import type { JwtPayload } from "../jwt";

export function combinedAuth(req: Request, res: Response, next: NextFunction): void {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    logger.info("[AUTH] SKIP_AUTH is enabled, skipping validation");
    return next();
  }

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized: Missing authorization header" });
    return;
  }

  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
      return next();
    } catch (err) {
      logger.error({ err }, "[AUTH] JWT validation failed");
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }
  }

  if (authHeader.startsWith("tma ")) {
    const initDataRaw = authHeader.substring(4);
    try {
      import("@tma.js/init-data-node").then(({ validate }) => {
        validate(initDataRaw, BOT_TOKEN);
        next();
      }).catch((err) => {
        logger.error(`[AUTH] TMA validation error: ${err}`);
        res.status(401).json({ error: "Unauthorized: Invalid init data" });
      });
    } catch {
      res.status(401).json({ error: "Unauthorized: Invalid init data" });
    }
    return;
  }

  res.status(401).json({ error: "Unauthorized: Unsupported auth method" });
}
