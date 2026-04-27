import { Router } from "express";

import { StatsService } from "@/services";

const router = Router();

router.get("/", (req, res) => {
  try {
    const chatIdParam = req.query.chatId as string | undefined;
    if (!chatIdParam) {
      return res.status(400).json({ error: "chatId is required" });
    }
    const chatId = parseInt(chatIdParam, 10);
    if (isNaN(chatId)) {
      return res.status(400).json({ error: "Invalid chatId" });
    }

    const years = StatsService.getAvailableYears(chatId);
    res.json(years);
  } catch (error) {
    console.error("[API] /years error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
