import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";

import { getDB } from "@/db/connection";

import { TransactionRepository } from "./transaction.repository";

vi.mock("@/db/connection", () => ({
  getDB: vi.fn(),
}));

const txRepo = new TransactionRepository();

describe("TransactionRepository", () => {
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
      );

      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER,
        username TEXT,
        amount INTEGER,
        type TEXT CHECK(type IN ('in', 'out')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(game_id) REFERENCES games(id)
      );

      CREATE TABLE global_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT DEFAULT 'user',
        name TEXT
      );

      CREATE TABLE user_identities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        global_user_id INTEGER,
        platform TEXT,
        chat_id INTEGER,
        username TEXT
      );
    `);
    getDB.mockReturnValue(testDB);
  });

  describe("add", () => {
    it("добавляет транзакцию и возвращает id", () => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo = gameStmt.run(123, 456, "2026-03-27");
      const gameId = Number(gameInfo.lastInsertRowid);

      const id = txRepo.add(gameId, "user1", 100, "in");
      expect(id).toBe(1);

      const row = testDB
        .prepare(`SELECT * FROM transactions WHERE id = ?`)
        .get(id);
      expect(row).toMatchObject({
        username: "user1",
        game_id: gameId,
        amount: 100,
        type: "in",
      });
    });
  });

  describe("deleteByGameId", () => {
    it("удаляет все транзакции игры", () => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id) VALUES (?, ?)`,
      );
      const gameInfo = gameStmt.run(123, 456);
      const gameId = Number(gameInfo.lastInsertRowid);

      txRepo.add(gameId, "user1", 100, "in");
      txRepo.add(gameId, "user2", 200, "out");

      const deleted = txRepo.deleteByGameId(gameId);
      expect(deleted).toBe(2);

      const remaining = testDB
        .prepare(`SELECT COUNT(*) as count FROM transactions`)
        .get() as { count: number };
      expect(remaining.count).toBe(0);
    });
  });

  describe("getGroupedByUsernameAndGame", () => {
    it("группирует транзакции по пользователям и играм", () => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id) VALUES (?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456);
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457);
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      txRepo.add(gameId1, "user1", 100, "in");
      txRepo.add(gameId1, "user1", 50, "out");
      txRepo.add(gameId1, "user2", 20, "in");

      txRepo.add(gameId2, "user1", 30, "in");

      const grouped = txRepo.getGroupedByUsernameAndGame();

      expect(grouped).toHaveLength(3);
      expect(grouped).toContainEqual({
        username: "user1",
        game_id: gameId1,
        total_in: 100,
        total_out: 50,
      });
      expect(grouped).toContainEqual({
        username: "user2",
        game_id: gameId1,
        total_in: 20,
        total_out: 0,
      });
      expect(grouped).toContainEqual({
        username: "user1",
        game_id: gameId2,
        total_in: 30,
        total_out: 0,
      });
    });
  });

  describe("getFilteredStats", () => {
    beforeEach(() => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456, "2024-01-15");
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457, "2025-06-20");
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      txRepo.add(gameId1, "user1", 100, "in");
      txRepo.add(gameId1, "user1", 50, "out");
      txRepo.add(gameId1, "user2", 30, "in");

      txRepo.add(gameId2, "user1", 20, "in");
      txRepo.add(gameId2, "user2", 10, "out");
    });

    it("возвращает статистику без фильтрации", () => {
      const stats = txRepo.getFilteredStats(123);
      expect(stats).toHaveLength(2);
      expect(stats[0].username).toBe("user2");
      expect(stats[0].total_in).toBe(30);
      expect(stats[0].total_out).toBe(10);
      expect(stats[0].games_count).toBe(2);
      expect(stats[1].username).toBe("user1");
      expect(stats[1].total_in).toBe(120);
      expect(stats[1].total_out).toBe(50);
      expect(stats[1].games_count).toBe(2);
    });

    it("фильтрует по году", () => {
      const stats2024 = txRepo.getFilteredStats(123, {
        year: "2024",
      });
      expect(stats2024).toHaveLength(2);
      expect(stats2024[0].username).toBe("user2");
      expect(stats2024[0].total_in).toBe(30);
      expect(stats2024[0].total_out).toBe(0);
      expect(stats2024[0].games_count).toBe(1);
      expect(stats2024[1].username).toBe("user1");
      expect(stats2024[1].total_in).toBe(100);
      expect(stats2024[1].total_out).toBe(50);
      expect(stats2024[1].games_count).toBe(1);

      const stats2025 = txRepo.getFilteredStats(123, {
        year: "2025",
      });
      expect(stats2025).toHaveLength(2);
      expect(stats2025[0].username).toBe("user2");
      expect(stats2025[0].total_in).toBe(0);
      expect(stats2025[0].total_out).toBe(10);
      expect(stats2025[0].games_count).toBe(1);
      expect(stats2025[1].username).toBe("user1");
      expect(stats2025[1].total_in).toBe(20);
      expect(stats2025[1].total_out).toBe(0);
      expect(stats2025[1].games_count).toBe(1);
    });

    it('фильтрует по дате "с"', () => {
      const sinceDate = "2025-01-01";
      const stats = txRepo.getFilteredStats(123, { sinceDate });
      expect(stats).toHaveLength(2);
      expect(stats[0].username).toBe("user2");
      expect(stats[0].total_in).toBe(0);
      expect(stats[0].total_out).toBe(10);
      expect(stats[0].games_count).toBe(1);
      expect(stats[1].username).toBe("user1");
      expect(stats[1].total_in).toBe(20);
      expect(stats[1].total_out).toBe(0);
      expect(stats[1].games_count).toBe(1);
    });
  });

  describe("getFilteredScores", () => {
    beforeEach(() => {
      const gameStmt = testDB.prepare(
        `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      );
      const gameInfo1 = gameStmt.run(123, 456, "2024-01-15");
      const gameId1 = Number(gameInfo1.lastInsertRowid);
      const gameInfo2 = gameStmt.run(123, 457, "2025-06-20");
      const gameId2 = Number(gameInfo2.lastInsertRowid);

      txRepo.add(gameId1, "user1", 100, "in");
      txRepo.add(gameId1, "user1", 50, "out");
      txRepo.add(gameId1, "user2", 30, "in");

      txRepo.add(gameId2, "user1", 20, "in");
      txRepo.add(gameId2, "user2", 10, "out");
    });

    it("возвращает топ по разнице (score = total_out - total_in)", () => {
      const scores = txRepo.getFilteredScores(123);
      expect(scores).toEqual([
        { username: "user2", score: -20 },
        { username: "user1", score: -70 },
      ]);
    });

    it("фильтрует по году", () => {
      const scores2024 = txRepo.getFilteredScores(123, {
        year: "2024",
      });
      expect(scores2024).toEqual([
        { username: "user2", score: -30 },
        { username: "user1", score: -50 },
      ]);

      const scores2025 = txRepo.getFilteredScores(123, {
        year: "2025",
      });
      expect(scores2025).toEqual([
        { username: "user2", score: 10 },
        { username: "user1", score: -20 },
      ]);
    });

    it('фильтрует по дате "с"', () => {
      const sinceDate = "2025-01-01";
      const scores = txRepo.getFilteredScores(123, {
        sinceDate,
      });
      expect(scores).toEqual([
        { username: "user2", score: 10 },
        { username: "user1", score: -20 },
      ]);
    });
  });
});
