import { Router } from "express";

import { logger } from "@/config/logger";
import { StatsService } from "@/services";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const stats = StatsService.getFilteredStats(filter);
    res.json(stats);
  } catch (error) {
    logger.error(`[API] /stats error: ${JSON.stringify(error, null, 2)}`);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
