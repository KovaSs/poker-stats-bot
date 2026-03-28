import { Router } from "express";

import { StatsService } from "@/services";

const router = Router();

router.get("/", (req, res) => {
  try {
    const filter = req.query.filter as string | undefined;
    const chatIdParam = req.query.chatId as string | undefined;

    if (!chatIdParam) {
      return res.status(400).json({ error: "chatId is required" });
    }
    const chatId = parseInt(chatIdParam, 10);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chatId" });
    }

    const stats = StatsService.getFilteredStats(chatId, filter);
    res.json(stats);
  } catch (error) {
    console.error("[API] /stats error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
