import { logger } from "@/config/logger";
import { getDB } from "@/db/connection";

export interface GameRow {
  message_id: number | null;
  game_date: string | null;
  created_at: string;
  chat_id: number;
  id: number;
}

export const GameRepository = {
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
  },

  create(chatId: number, messageId: number | null, gameDate?: string): number {
    const stmt = getDB().prepare(
      `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
    );
    const info = stmt.run(chatId, messageId, gameDate || null);
    logger.info(
      `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}`,
    );
    return Number(info.lastInsertRowid);
  },

  updateDate(id: number, gameDate: string): void {
    const stmt = getDB().prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
    stmt.run(gameDate, id);
    logger.info(`[DB] Дата игры ${id} обновлена на ${gameDate}`);
  },

  delete(id: number): void {
    const stmt = getDB().prepare(`DELETE FROM games WHERE id = ?`);
    const info = stmt.run(id);
    logger.info(`[DB] Удалена игра ID ${id}, изменено строк: ${info.changes}`);
  },

  deleteByChatAndMessage(chatId: number, messageId: number): boolean {
    const game = this.findByChatAndMessage(chatId, messageId);
    if (!game) return false;
    this.delete(game.id);
    return true;
  },
};
