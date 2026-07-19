import { Router } from "express";

import { GlobalUserRepository, UserIdentityRepository } from "@/db/repositories";
import { AuthService } from "@/services/auth.service";
import { authJwt } from "@/middlewares/jwt";
import { container } from "@/di/container";
import { logger } from "@/config/logger";

function getAuthService(): AuthService {
  return container.resolve(AuthService);
}

const router = Router();

router.post("/vk", async (req, res) => {
  try {
    const { redirect_uri, vk_id, code } = req.body;

    if (vk_id) {
      const result = getAuthService().authenticateWithVkId(vk_id);
      res.json(result);
      return;
    }

    if (!code || !redirect_uri) {
      res.status(400).json({ error: "code and redirect_uri are required" });
      return;
    }

    const result = await getAuthService().authenticateWithVk(code, redirect_uri);
    res.json(result);
  } catch (error) {
    logger.error({ error }, "[API] /auth/vk error");
    res.status(401).json({ error: "VK authentication failed" });
  }
});

router.get("/me", authJwt, (req, res) => {
  try {
    const globalUserId = req.user!.global_user_id;
    const user = container.resolve(GlobalUserRepository).findById(globalUserId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const identities = container.resolve(UserIdentityRepository).findByGlobalUserId(globalUserId);

    res.json({
      identities: identities.map((i) => ({
        platform: i.platform,
        username: i.username,
        chat_id: i.chat_id,
        id: i.id,
      })),
      telegram_id: user.telegram_id,
      vk_id: user.vk_id,
      name: user.name,
      role: user.role,
      id: user.id,
    });
  } catch (error) {
    logger.error({ error }, "[API] /auth/me error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
