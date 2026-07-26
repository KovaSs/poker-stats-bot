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
  const authHeader = req.headers["authorization"];
  const token = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      req.user = decoded;
      return next();
    } catch {
      logger.warn("[JWT] Token validation failed, falling back to skip-auth");
    }
  }

  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    logger.info("[JWT] SKIP_AUTH is enabled, using mock user");
    req.user = { global_user_id: 1, role: "admin" };
    return next();
  }

  res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
}
