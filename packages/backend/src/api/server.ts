import express from "express";
import cors from "cors";

import { authMiddleware } from "@/middlewares/auth";
import { logger } from "@/config/logger";
import { API_PORT } from "@/config/env";

import { statsRouter, yearsRouter } from "./routes";

export function startApiServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use("/api/years", authMiddleware, yearsRouter);
  app.use("/api/stats", authMiddleware, statsRouter);

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use((err: Error, _req: express.Request, res: express.Response) => {
    logger.error({ error: err }, "API ошибка");
    res.status(500).json({ error: "Internal server error" });
  });

  app.listen(API_PORT, () => {
    logger.info({ port: API_PORT }, "API сервер запущен");
  });
}
