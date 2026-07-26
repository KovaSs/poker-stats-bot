import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";

import { GlobalUserRepository, UserIdentityRepository } from "@/db/repositories";
import { JWT_SECRET, VK_CLIENT_ID, VK_CLIENT_SECRET } from "@/config/env";

export interface AuthTokens {
  user: {
    id: number;
    role: string;
    vk_id: number | null;
  };
  token: string;
}

@injectable()
export class AuthService {
  constructor(
    @inject(GlobalUserRepository) private readonly globalUserRepository: GlobalUserRepository,
    @inject(UserIdentityRepository) private readonly userIdentityRepository: UserIdentityRepository,
  ) {}

  private generateState(): string {
    return Math.random().toString(36).slice(2, 18);
  }

  authenticateWithVkId(vkId: number): AuthTokens {
    let globalUser = this.globalUserRepository.findByVkId(vkId);

    if (!globalUser) {
      const newId = this.globalUserRepository.create({ vkId });
      globalUser = this.globalUserRepository.findById(newId);
    }

    if (!globalUser) {
      throw new Error("Failed to create/find global user");
    }

    const token = jwt.sign(
      {
        global_user_id: globalUser.id,
        role: globalUser.role,
        vk_id: vkId,
      },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    return {
      user: {
        role: globalUser.role,
        id: globalUser.id,
        vk_id: vkId,
      },
      token,
    };
  }

  async authenticateWithVk(code: string, redirectUri: string, codeVerifier?: string, deviceId?: string): Promise<AuthTokens> {
    if (!VK_CLIENT_ID) throw new Error("VK_CLIENT_ID is not configured");

    const axios = (await import("axios")).default;

    const queryParams = new URLSearchParams({
      client_id: VK_CLIENT_ID,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      state: this.generateState(),
    });
    if (codeVerifier) queryParams.set("code_verifier", codeVerifier);
    if (deviceId) queryParams.set("device_id", deviceId);

    const vkDomain = redirectUri?.includes("vk.ru") ? "id.vk.ru" : "id.vk.com";
    const tokenResponse = await axios.post(
      `https://${vkDomain}/oauth2/auth?${queryParams.toString()}`,
      new URLSearchParams({ code }).toString(),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
    );

    if (tokenResponse.data.error) {
      throw new Error(`VK API error: ${tokenResponse.data.error} — ${tokenResponse.data.error_description || ""}`);
    }

    const vkUserId = tokenResponse.data.user_id as number;

    if (!vkUserId) {
      throw new Error("VK did not return user_id");
    }

    let globalUser = this.globalUserRepository.findByVkId(vkUserId);

    if (!globalUser) {
      const newId = this.globalUserRepository.create({ vkId: vkUserId });
      globalUser = this.globalUserRepository.findById(newId);
    }

    if (!globalUser) {
      throw new Error("Failed to create/find global user");
    }

    const token = jwt.sign(
      {
        global_user_id: globalUser.id,
        role: globalUser.role,
        vk_id: vkUserId,
      },
      JWT_SECRET,
      { expiresIn: "30d" },
    );

    return {
      user: {
        role: globalUser.role,
        id: globalUser.id,
        vk_id: vkUserId,
      },
      token,
    };
  }

  async getMe(globalUserId: number): Promise<{
    id: number;
    role: string;
    vk_id: number | null;
    identities: { platform: string; chat_id: number; username: string }[];
  }> {
    const user = this.globalUserRepository.findById(globalUserId);
    if (!user) throw new Error("User not found");

    const identities = this.userIdentityRepository.findByGlobalUserId(globalUserId);

    return {
      identities: identities.map((i) => ({
        platform: i.platform,
        username: i.username,
        chat_id: i.chat_id,
      })),
      vk_id: user.vk_id,
      role: user.role,
      id: user.id,
    };
  }
}
