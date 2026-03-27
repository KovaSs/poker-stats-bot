import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "../connection";

import { GameRepository } from "./game.repository";

// Мокаем getDB, чтобы возвращать тестовую БД
vi.mock("../connection", () => ({
  getDB: vi.fn(),
}));

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
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  it("создаёт игру и возвращает ID", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    expect(id).toBe(1);
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game).not.toBeNull();
    expect(game?.chat_id).toBe(123);
    expect(game?.message_id).toBe(456);
    expect(game?.game_date).toBe("2026-03-27");
  });

  it("обновляет дату игры", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    GameRepository.updateDate(id, "2026-03-28");
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game?.game_date).toBe("2026-03-28");
  });

  it("удаляет игру", () => {
    const id = GameRepository.create(123, 456, "2026-03-27");
    GameRepository.delete(id);
    const game = GameRepository.findByChatAndMessage(123, 456);
    expect(game).toBeNull();
  });

  it("возвращает null, если игра не найдена", () => {
    const game = GameRepository.findByChatAndMessage(999, 999);
    expect(game).toBeNull();
  });
});
