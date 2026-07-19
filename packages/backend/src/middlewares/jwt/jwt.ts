import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "@/config/env";
import { logger } from "@/config/logger";

export interface JwtPayload {
  global_user_id: number;
  role: "admin" | "user";
  vk_id?: number;
}

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */

export function authJwt(req: Request, res: Response, next: NextFunction): void {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    logger.info("[JWT] SKIP_AUTH is enabled, skipping JWT validation");
    return next();
  }

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    return;
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    logger.error({ err }, "[JWT] Token validation failed");
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
}
