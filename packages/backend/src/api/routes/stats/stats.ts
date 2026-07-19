import { Router } from "express";

import { container } from "@/di/container";
import { StatsService } from "@/services";
import { logger } from "@/config/logger";

function getStatsService(): StatsService {
  return container.resolve(StatsService);
}

const router = Router();

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const chatIdParam = req.query.chatId as string | undefined;
    const platform = req.query.platform as string | undefined;

    if (!chatIdParam) {
      return res.status(400).json({ error: "chatId is required" });
    }
    const chatId = parseInt(chatIdParam, 10);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chatId" });
    }

    const stats = getStatsService().getFilteredStats(chatId, filter, platform);
    res.json(stats);
  } catch (error) {
    logger.error({ error }, "[API] /stats error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
