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
        game_date TEXT,
        platform TEXT DEFAULT 'telegram'
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
  });

  it("не возвращает данные за другие годы, если фильтр не задан (по умолчанию последний год)", () => {
    const gameId = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId, "user1", 100, "in");
    const stats = StatsService.getFilteredStats(1);
    expect(stats).toHaveLength(0);
  });

  it("получает топ по разнице", () => {
    const gameId1 = GameRepository.create(1, 1, "2024-01-01");
    TransactionRepository.add(gameId1, "user1", 100, "in");
    TransactionRepository.add(gameId1, "user1", 300, "out");
    const gameId2 = GameRepository.create(1, 2, "2024-01-01");
    TransactionRepository.add(gameId2, "user2", 50, "in");
    TransactionRepository.add(gameId2, "user2", 100, "out");
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
    StatsService.recalcStats();
    const users = testDB.prepare("SELECT * FROM users ORDER BY username").all();
    expect(users).toHaveLength(1);
  });

  it("получает статистику без chatId (глобально)", () => {
    GameRepository.create(1, 1, "2024-01-01", "vk");
    GameRepository.create(2, 2, "2024-06-15", "vk");
    const game3 = GameRepository.create(1, 3, "2024-01-01", "vk");
    TransactionRepository.add(game3, "global_user", 500, "in");

    const stats = StatsService.getFilteredStats(undefined, "all");
    expect(stats).toHaveLength(1);
  });

  it("получает топ без chatId (глобально)", () => {
    const g1 = GameRepository.create(1, 1, "2024-01-01", "vk");
    const g2 = GameRepository.create(2, 2, "2024-01-01", "vk");
    TransactionRepository.add(g1, "user_a", 100, "in");
    TransactionRepository.add(g2, "user_a", 100, "in");
    TransactionRepository.add(g2, "user_b", 200, "out");
    const scores = StatsService.getFilteredScores(undefined, "all");
    expect(scores.length).toBeGreaterThan(0);
  });

  it("получает доступные годы без chatId", () => {
    GameRepository.create(1, 1, "2023-05-01", "vk");
    const years = StatsService.getAvailableYears(undefined);
    expect(years).toContain("2023");
  });
});
