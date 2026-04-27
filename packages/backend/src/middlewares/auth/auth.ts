import { Request, Response, NextFunction } from "express";
import { BOT_TOKEN } from "@/config/env";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    process.env.NODE_ENV !== "production" ||
    process.env.SKIP_AUTH === "true"
  ) {
    console.log("[AUTH] SKIP_AUTH is enabled, skipping validation");
    return next();
  }

  const authHeader = req.headers["authorization"];
  console.log("[AUTH] raw header:", authHeader);

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
    console.error("Init data validation failed:", error.message);
    console.error("Init data raw:", initDataRaw);
    return res.status(401).json({ error: "Unauthorized: Invalid init data" });
  }
};
