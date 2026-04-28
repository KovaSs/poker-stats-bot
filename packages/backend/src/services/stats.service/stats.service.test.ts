import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { TransactionRepository } from "@/db/repositories/transaction.repository";
import { GameRepository } from "@/db/repositories/game.repository";
import { getDB } from "@/db/connection";

import { StatsService } from "./stats.service";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

describe("StatsService", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        chat_id INTEGER,
        message_id INTEGER,
        game_date TEXT
      );
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        username TEXT,
        amount INTEGER,
        type TEXT
      );
      CREATE TABLE users (
        username TEXT PRIMARY KEY,
        total_in INTEGER DEFAULT 0,
        total_out INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        game_ids TEXT DEFAULT '[]'
      );
    `);
    getDB.mockReturnValue(testDB);
  });

  it("получает статистику за конкретный год", () => {
    const gameId = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");
    TransactionRepository.add(gameId, "user1", 200, "out");

    const stats = StatsService.getFilteredStats(1, "2024");
    expect(stats).toHaveLength(1);
    expect(stats[0].username).toBe("user1");
    expect(stats[0].total_in).toBe(100);
    expect(stats[0].total_out).toBe(200);
    expect(stats[0].games_count).toBe(1);
  });

  it("не возвращает данные за другие годы, если фильтр не задан (по умолчанию последний год)", () => {
    const gameId = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");

    const stats = StatsService.getFilteredStats(1); // последний год (текущий 2026)
    expect(stats).toHaveLength(0);
  });

  it("получает топ по разнице", () => {
    const gameId1 = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId1, "user1", 100, "in");
    TransactionRepository.add(gameId1, "user1", 300, "out"); // diff +200

    const gameId2 = GameRepository.create(1, 2, "2024-01-01");
    TransactionRepository.add(gameId2, "user2", 50, "in");
    TransactionRepository.add(gameId2, "user2", 100, "out"); // diff +50

    const scores = StatsService.getFilteredScores(1, "2024");
    expect(scores).toEqual([
      { username: "user1", score: 200 },
      { username: "user2", score: 50 },
    ]);
  });

  it("пересчитывает агрегированную статистику", () => {
    const gameId = GameRepository.create(1, 1, "2025-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");
    TransactionRepository.add(gameId, "user1", 200, "out");
    TransactionRepository.add(gameId, "user2", 50, "in");

    StatsService.recalcStats();

    const users = testDB.prepare("SELECT * FROM users ORDER BY username").all();
    expect(users).toHaveLength(2);
    expect(users[0]).toMatchObject({
      username: "user1",
      games_count: 1,
      total_out: 200,
      total_in: 100,
    });
    expect(users[1]).toMatchObject({
      username: "user2",
      games_count: 1,
      total_in: 50,
      total_out: 0,
    });
  });
});
