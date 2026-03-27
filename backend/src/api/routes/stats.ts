import { Router } from "express";

import { StatsService } from "../../services";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const stats = StatsService.getFilteredStats(filter);
    res.json(stats);
  } catch (error) {
    console.error("[API] /stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
