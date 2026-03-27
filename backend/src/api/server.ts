import express from "express";

import statsRouter from "./routes/stats";

import { API_PORT } from "../config/env";

export function startApiServer() {
  const app = express();
  app.use(express.json());

  app.use("/api/stats", statsRouter);

  app.listen(API_PORT, () => {
    console.log(`[API] Сервер запущен на порту ${API_PORT}`);
  });
}
