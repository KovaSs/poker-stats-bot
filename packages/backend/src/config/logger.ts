import pino from "pino";

export const logger = pino({
  transport:
    process.env.NODE_ENV !== "production"
      ? {
          options: { translateTime: "SYS:standard", colorize: true },
          target: "pino-pretty",
        }
      : undefined,
  level: process.env.LOG_LEVEL || "info",
});
