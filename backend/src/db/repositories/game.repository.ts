import { getDB } from "../connection";

export interface GameRow {
  id: number;
  chat_id: number;
  message_id: number | null;
  game_date: string | null;
  created_at: string;
}

export const GameRepository = {
  create(chatId: number, messageId: number | null, gameDate?: string): number {
    const stmt = getDB().prepare(
      `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
    );
    const info = stmt.run(chatId, messageId, gameDate || null);
    console.log(
      `[DB] createGame успешно, lastID: ${info.lastInsertRowid}, дата: ${gameDate || "не указана"}`,
    );
    return Number(info.lastInsertRowid);
  },

  findByChatAndMessage(chatId: number, messageId: number): GameRow | null {
    const stmt = getDB().prepare(
      `SELECT * FROM games WHERE chat_id = ? AND message_id = ?`,
    );
    const row = stmt.get(chatId, messageId) as GameRow | null;
    if (row) {
      console.log(
        `[DB] Найдена игра ID ${row.id} для чата ${chatId}, сообщения ${messageId}`,
      );
    } else {
      console.log(
        `[DB] Игра для чата ${chatId}, сообщения ${messageId} не найдена`,
      );
    }
    return row;
  },

  updateDate(id: number, gameDate: string): void {
    const stmt = getDB().prepare(`UPDATE games SET game_date = ? WHERE id = ?`);
    stmt.run(gameDate, id);
    console.log(`[DB] Дата игры ${id} обновлена на ${gameDate}`);
  },

  delete(id: number): void {
    const stmt = getDB().prepare(`DELETE FROM games WHERE id = ?`);
    const info = stmt.run(id);
    console.log(`[DB] Удалена игра ID ${id}, изменено строк: ${info.changes}`);
  },

  deleteByChatAndMessage(chatId: number, messageId: number): boolean {
    const game = this.findByChatAndMessage(chatId, messageId);
    if (!game) return false;
    this.delete(game.id);
    return true;
  },
};
