import { Router } from "express";

import {
  GameRepository,
  GlobalUserRepository,
  TransactionRepository,
  UserIdentityRepository,
} from "@/db/repositories";
import { StatsService, SyncService } from "@/services";
import { authJwt } from "@/middlewares/jwt";
import { container } from "@/di/container";
import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

const router = Router();

router.use(authJwt);

router.get("/users", (req, res) => {
  try {
    const query = req.query.q as string | undefined;
    const repo = container.resolve(GlobalUserRepository);
    const identityRepo = container.resolve(UserIdentityRepository);

    const users = query ? repo.search(query) : repo.findAll();

    const result = users.map((u) => ({
      identities: identityRepo.findByGlobalUserId(u.id).map((i) => ({
        platform: i.platform,
        username: i.username,
        chat_id: i.chat_id,
        id: i.id,
      })),
      telegram_id: u.telegram_id,
      created_at: u.created_at,
      updated_at: u.updated_at,
      vk_id: u.vk_id,
      name: u.name,
      role: u.role,
      id: u.id,
    }));

    res.json(result);
  } catch (error) {
    logger.error({ error }, "[API] /admin/users error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/:id", (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { name, role } = req.body;

    const repo = container.resolve(GlobalUserRepository);
    const user = repo.findById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (role !== undefined) {
      if (!["admin", "user"].includes(role)) {
        res.status(400).json({ error: "Role must be 'admin' or 'user'" });
        return;
      }
      repo.updateRole(userId, role);
    }

    if (name !== undefined) {
      repo.updateName(userId, name);
    }

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, "[API] /admin/users/:id error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/users/:id/merge", (req, res) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    const { sourceId } = req.body;

    if (!sourceId) {
      res.status(400).json({ error: "sourceId is required" });
      return;
    }

    if (sourceId === targetId) {
      res.status(400).json({ error: "Cannot merge user with themselves" });
      return;
    }

    const repo = container.resolve(GlobalUserRepository);
    const identityRepo = container.resolve(UserIdentityRepository);

    const target = repo.findById(targetId);
    const source = repo.findById(sourceId);

    if (!target || !source) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    identityRepo.transferToUser(sourceId, targetId);
    repo.delete(sourceId);

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, "[API] /admin/users/:id/merge error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/games", (req, res) => {
  try {
    const chatIdParam = req.query.chatId as string | undefined;
    const platform = req.query.platform as string | undefined;
    const db = getDB();

    let sql = `SELECT * FROM games WHERE 1=1`;
    const params: (string | number)[] = [];

    if (chatIdParam) {
      const chatId = parseInt(chatIdParam, 10);
      if (!isNaN(chatId)) {
        sql += ` AND chat_id = ?`;
        params.push(chatId);
      }
    }

    if (platform) {
      sql += ` AND platform = ?`;
      params.push(platform);
    }

    sql += ` ORDER BY game_date DESC, id DESC`;

    const games = db.prepare(sql).all(...params) as Record<string, unknown>[];

    const result = games.map((g) => {
      const gameId = g.id as number;
      const transactions = db.prepare(`SELECT * FROM transactions WHERE game_id = ?`).all(gameId);
      return { ...g, transactions };
    });

    res.json(result);
  } catch (error) {
    logger.error({ error }, "[API] /admin/games error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/games/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const { transactions, game_date } = req.body;

    const gameRepo = container.resolve(GameRepository);
    const txRepo = container.resolve(TransactionRepository);
    const statsService = container.resolve(StatsService);

    const game = gameRepo.findById(gameId);
    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    if (game_date) {
      gameRepo.updateDate(gameId, game_date);
    }

    if (transactions && Array.isArray(transactions)) {
      txRepo.deleteByGameId(gameId);
      for (const tx of transactions) {
        txRepo.add(gameId, tx.username, tx.amount, tx.type);
      }
    }

    statsService.recalcStats();

    let syncResult = { telegram: false, vk: false };
    try {
      const syncService = container.resolve(SyncService);
      await syncService.syncGameUpdate(gameId);
      syncResult = { telegram: true, vk: true };
    } catch (syncError) {
      logger.error({ syncError }, "[SYNC] Failed to sync game update");
    }

    res.json({ sync: syncResult, success: true });
  } catch (error) {
    logger.error({ error }, "[API] /admin/games/:id error");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/games/:id", async (req, res) => {
  try {
    const gameId = parseInt(req.params.id, 10);
    const gameRepo = container.resolve(GameRepository);
    const txRepo = container.resolve(TransactionRepository);
    const statsService = container.resolve(StatsService);

    const game = gameRepo.findById(gameId);
    if (!game) {
      res.status(404).json({ error: "Game not found" });
      return;
    }

    txRepo.deleteByGameId(gameId);
    gameRepo.delete(gameId);
    statsService.recalcStats();

    res.json({ success: true });
  } catch (error) {
    logger.error({ error }, "[API] /admin/games/:id DELETE error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
