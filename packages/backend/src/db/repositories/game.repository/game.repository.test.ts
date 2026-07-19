import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "@/db/connection";

import { GameRepository } from "./game.repository";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

const gameRepo = new GameRepository();

describe("GameRepository", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        message_id INTEGER,
        game_date TEXT,
        platform TEXT DEFAULT 'telegram',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    getDB.mockReturnValue(testDB);
  });

  it("создаёт игру и возвращает ID", () => {
    const id = gameRepo.create(123, 456, "2026-03-27");
    expect(id).toBe(1);
    const game = gameRepo.findByChatAndMessage(123, 456);
    expect(game).not.toBeNull();
    expect(game?.chat_id).toBe(123);
    expect(game?.message_id).toBe(456);
    expect(game?.game_date).toBe("2026-03-27");
  });

  it("обновляет дату игры", () => {
    const id = gameRepo.create(123, 456, "2026-03-27");
    gameRepo.updateDate(id, "2026-03-28");
    const game = gameRepo.findByChatAndMessage(123, 456);
    expect(game?.game_date).toBe("2026-03-28");
  });

  it("удаляет игру", () => {
    const id = gameRepo.create(123, 456, "2026-03-27");
    gameRepo.delete(id);
    const game = gameRepo.findByChatAndMessage(123, 456);
    expect(game).toBeNull();
  });

  it("возвращает null, если игра не найдена", () => {
    const game = gameRepo.findByChatAndMessage(999, 999);
    expect(game).toBeNull();
  });
});
