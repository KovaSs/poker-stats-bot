import { inject, injectable } from "tsyringe";
import { Telegraf } from "telegraf";

import { BOT_TOKEN, TELEGRAM_API_URL, VK_COMMUNITY_CHAT_ID } from "@/config/env";
import { GameRepository, TransactionRepository } from "@/db/repositories";
import { logger } from "@/config/logger";
import { getVK } from "@/platforms/vk";

import type { GameRow } from "@/db/repositories";

interface SyncTarget {
  platform: "telegram" | "vk";
  messageId: number | null;
  chatId: number;
  text: string;
}

@injectable()
export class SyncService {
  constructor(
    @inject(GameRepository) private readonly gameRepository: GameRepository,
    @inject(TransactionRepository) private readonly transactionRepository: TransactionRepository,
  ) {}

  async syncGameUpdate(gameId: number): Promise<void> {
    const game = this.gameRepository.findById(gameId);
    if (!game) {
      logger.warn(`[SyncService] Game ${gameId} not found, skipping sync`);
      return;
    }

    const gameDate = game.game_date || "unknown";
    const lines = [`📋 Игра от ${gameDate}`];

    const gameTxRows = this.transactionRepository.getGroupedByUsernameAndGame();
    const gameTxs = gameTxRows.filter((t) => t.game_id === gameId);

    for (const tx of gameTxs) {
      const sign = tx.total_in > 0 ? "Вход" : "Выход";
      const amount = tx.total_in > 0 ? tx.total_in : tx.total_out;
      lines.push(`    ${sign}: ${tx.username} ${amount}`);
    }

    const text = lines.join("\n");

    const targets: SyncTarget[] = [];

    if (game.telegram_bot_message_id != null || game.platform === "telegram") {
      targets.push({
        messageId: game.telegram_bot_message_id ?? null,
        chatId: game.chat_id,
        platform: "telegram",
        text,
      });
    }

    if (game.community_message_id != null && game.platform === "vk") {
      targets.push({
        chatId: VK_COMMUNITY_CHAT_ID ?? game.chat_id,
        messageId: game.community_message_id,
        platform: "vk",
        text,
      });
    }

    if (game.vk_wall_post_id) {
      try {
        await this.syncVkWallPost(game, text);
      } catch (error) {
        logger.error({ error }, `[SyncService] Failed to sync VK wall post for game ${gameId}`);
      }
    }

    for (const target of targets) {
      try {
        await this.syncSingleTarget(target, game);
      } catch (error) {
        logger.error({ error }, `[SyncService] Failed to sync game ${gameId} to ${target.platform}`);
      }
    }
  }

  private async syncSingleTarget(target: SyncTarget, game: GameRow): Promise<void> {
    switch (target.platform) {
      case "telegram":
        await this.syncTelegramMessage(target, game);
        break;
      case "vk":
        await this.syncVkMessage(target, game);
        break;
    }
  }

  private async syncTelegramMessage(target: SyncTarget, game: GameRow): Promise<void> {
    try {
      const options: { telegram?: { apiRoot: string } } = {};
      if (TELEGRAM_API_URL) {
        options.telegram = { apiRoot: TELEGRAM_API_URL };
      }

      const bot = new Telegraf(BOT_TOKEN, options);

      if (target.messageId) {
        try {
          await bot.telegram.editMessageText(
            target.chatId,
            target.messageId,
            undefined,
            target.text,
          );
          logger.info(`[SyncService] Telegram message ${target.messageId} updated for game`);
        } catch {
          logger.warn(`[SyncService] Could not edit Telegram message, sending new one`);

          const sent = await bot.telegram.sendMessage(target.chatId, target.text);
          this.gameRepository.updateField(game.id, "telegram_bot_message_id", sent.message_id);
          logger.info(`[SyncService] New Telegram message ${sent.message_id} sent for game ${game.id}`);
        }
      } else {
        const sent = await bot.telegram.sendMessage(target.chatId, target.text);
        this.gameRepository.updateField(game.id, "telegram_bot_message_id", sent.message_id);
        logger.info(`[SyncService] New Telegram message ${sent.message_id} sent for game ${game.id}`);
      }
    } catch (error) {
      logger.error({ error }, `[SyncService] Telegram sync error`);
    }
  }

  private async syncVkMessage(target: SyncTarget, game: GameRow): Promise<void> {
    const vkClient = getVK();
    if (!vkClient) {
      logger.warn(`[SyncService] VK client not available`);
      return;
    }

    try {
      if (target.messageId) {
        try {
          await vkClient.api.messages.edit({
            message_id: target.messageId,
            peer_id: target.chatId,
            message: target.text,
          });
          logger.info(`[SyncService] VK message ${target.messageId} updated`);
        } catch {
          logger.warn(`[SyncService] Could not edit VK message, sending new one`);

          const sent = await vkClient.api.messages.send({
            peer_id: target.chatId,
            random_id: Date.now(),
            message: target.text,
          });

          const msgId = typeof sent === "object"
            ? (sent as { message_id?: number }).message_id ?? Number(sent)
            : Number(sent);

          if (msgId) {
            this.gameRepository.updateField(game.id, "community_message_id", msgId);
          }
        }
      } else {
        const sent = await vkClient.api.messages.send({
          peer_id: target.chatId,
          random_id: Date.now(),
          message: target.text,
        });

        const msgId = typeof sent === "object"
          ? (sent as { message_id?: number }).message_id ?? Number(sent)
          : Number(sent);

        if (msgId) {
          this.gameRepository.updateField(game.id, "community_message_id", msgId);
        }
      }
    } catch (error) {
      logger.error({ error }, `[SyncService] VK sync error`);
    }
  }

  private async syncVkWallPost(game: GameRow, text: string): Promise<void> {
    const vkClient = getVK();
    if (!vkClient || !game.vk_wall_post_id || !game.vk_wall_owner_id) return;

    try {
      await vkClient.api.wall.edit({
        owner_id: game.vk_wall_owner_id,
        post_id: game.vk_wall_post_id,
        message: text,
      });
      logger.info(`[SyncService] VK wall post ${game.vk_wall_post_id} updated`);
    } catch (error) {
      logger.error({ error }, `[SyncService] Failed to edit VK wall post`);
    }
  }
}
