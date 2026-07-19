import { Router } from "express";

import { authJwt } from "@/middlewares/jwt";
import { container } from "@/di/container";
import { StatsService } from "@/services";
import { logger } from "@/config/logger";

function getStatsService(): StatsService {
  return container.resolve(StatsService);
}

const router = Router();

function getSortParams(req: { query: Record<string, unknown> }): { sort?: string; order?: string } {
  const sort = req.query.sort as string | undefined;
  const order = req.query.order as string | undefined;
  return { order, sort };
}

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const chatIdParam = req.query.chatId as string | undefined;
    const platform = req.query.platform as string | undefined;
    const { order, sort } = getSortParams(req);

    if (chatIdParam) {
      const chatId = parseInt(chatIdParam, 10);
      if (isNaN(chatId)) {
        res.status(400).json({ error: "Invalid chatId" });
        return;
      }
      const stats = getStatsService().getFilteredStats(chatId, filter, platform, sort, order);
      res.json(stats);
      return;
    }

    const stats = getStatsService().getFilteredStats(undefined, filter, platform, sort, order);
    res.json(stats);
  } catch (error) {
    logger.error({ error }, "[API] /stats error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/me", authJwt, (req, res) => {
  try {
    const globalUserId = req.user!.global_user_id;
    const filter = req.query.filter as string | undefined;
    const platform = req.query.platform as string | undefined;
    const { order, sort } = getSortParams(req);

    const stats = getStatsService().getFilteredStatsForUser(globalUserId, filter, platform, sort, order);
    res.json(stats);
  } catch (error) {
    logger.error({ error }, "[API] /stats/me error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
