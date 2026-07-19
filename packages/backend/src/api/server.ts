import express from "express";
import cors from "cors";

import { combinedAuth } from "@/middlewares/combinedAuth/combinedAuth";
import { logger } from "@/config/logger";
import { API_PORT } from "@/config/env";

import { statsRouter, yearsRouter, authRouter, adminRouter } from "./routes";

export function startApiServer() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/years", combinedAuth, yearsRouter);
  app.use("/api/stats", combinedAuth, statsRouter);
  app.use("/api/admin", adminRouter);

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
