import { injectable } from "tsyringe";

import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface GameRow {
  telegram_bot_message_id?: number | null;
  community_message_id?: number | null;
  vk_wall_owner_id?: number | null;
  vk_wall_post_id?: number | null;
  message_id: number | null;
  game_date: string | null;
  created_at: string;
  platform?: string;
  chat_id: number;
  id: number;
}

@injectable()
export class GameRepository {
  findByChatAndMessage(chatId: number, messageId: number): GameRow | null {
    const stmt = getDB().prepare(
      `SELECT * FROM games WHERE chat_id = ? AND message_id = ?`,
    );
    const row = stmt.get(chatId, messageId) as GameRow | undefined;
    if (row) {
      logger.info(
        `[DB] Найдена игра ID ${row.id} для чата ${chatId}, сообщения ${messageId}`,
      );
      return row;
    } else {
      logger.info(
        `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена`,
      );
    }
    return null;
  }

  create(
    chatId: number,
    messageId: number | null,
    gameDate?: string,
    platform: string = "telegram",
  ): number {
    const stmt = getDB().prepare(
      `INSERT INTO games (chat_id, message_id, game_date, platform) VALUES (?, ?, ?, ?)`,
    );
    const info = stmt.run(chatId, messageId, gameDate || null, platform);
    logger.info(
      `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}, платформа: ${platform}`,
    );
    return Number(info.lastInsertRowid);
  }

  updateWallPostId(
    id: number,
    wallPostId: number,
    wallOwnerId: number,
  ): void {
    const stmt = getDB().prepare(
      `UPDATE games SET vk_wall_post_id = ?, vk_wall_owner_id = ? WHERE id = ?`,
    );
    stmt.run(wallPostId, wallOwnerId, id);
    logger.info(
      `[DB] Игра ${id}: привязан wall post ${wallPostId} (owner ${wallOwnerId})`,
    );
  }

  updateTelegramBotMessageId(id: number, messageId: number): void {
    const stmt = getDB().prepare(
      `UPDATE games SET telegram_bot_message_id = ? WHERE id = ?`,
    );
    stmt.run(messageId, id);
    logger.info(`[DB] Игра ${id}: привязан telegram bot message ${messageId}`);
  }

  updateCommunityMessageId(id: number, communityMessageId: number): void {
    const stmt = getDB().prepare(
      `UPDATE games SET community_message_id = ? WHERE id = ?`,
    );
    stmt.run(communityMessageId, id);
    logger.info(
      `[DB] Игра ${id}: привязан community message ${communityMessageId}`,
    );
  }

  updateField(id: number, field: string, value: number | string | null): void {
    const allowedFields = [
      "telegram_bot_message_id",
      "community_message_id",
      "vk_wall_post_id",
      "vk_wall_owner_id",
    ];
    if (!allowedFields.includes(field)) {
      throw new Error(`Field '${field}' is not allowed for dynamic update`);
    }
    getDB().prepare(`UPDATE games SET ${field} = ? WHERE id = ?`).run(value, id);
  }

  updateDate(id: number, gameDate: string): void {
    const stmt = getDB().prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
    stmt.run(gameDate, id);
    logger.info(`[DB] Дата игры ${id} обновлена на ${gameDate}`);
  }

  delete(id: number): void {
    const stmt = getDB().prepare(`DELETE FROM games WHERE id = ?`);
    const info = stmt.run(id);
    logger.info(`[DB] Удалена игра ID ${id}, изменено строк: ${info.changes}`);
  }

  deleteByChatAndMessage(chatId: number, messageId: number): boolean {
    const game = this.findByChatAndMessage(chatId, messageId);
    if (!game) return false;
    this.delete(game.id);
    return true;
  }

  findById(id: number): GameRow | null {
    const stmt = getDB().prepare(`SELECT * FROM games WHERE id = ?`);
    const row = stmt.get(id) as GameRow | undefined;
    return row || null;
  }
}
