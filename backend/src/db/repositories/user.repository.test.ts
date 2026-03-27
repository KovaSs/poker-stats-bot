// backend/src/db/repositories/user.repository.test.ts

import { describe, it, expect, beforeEach, vi } from "vitest";
import Database from "better-sqlite3";
import { UserRepository } from "./user.repository";
import { getDB } from "../connection";

vi.mock("../connection", () => ({
  getDB: vi.fn(),
}));

describe("UserRepository", () => {
  let testDB: Database.Database;

  beforeEach(() => {
    testDB = new Database(":memory:");
    testDB.exec(`
      CREATE TABLE users (
        username TEXT PRIMARY KEY,
        telegram_id INTEGER,
        total_in INTEGER DEFAULT 0,
        total_out INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        game_ids TEXT DEFAULT '[]'
      )
    `);
    (getDB as any).mockReturnValue(testDB);
  });

  describe("findByUsername", () => {
    it("возвращает пользователя по имени", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("user1", 123, 100, 50, 2, "[1,2]");

      const user = UserRepository.findByUsername("user1");
      expect(user).not.toBeNull();
      expect(user).toMatchObject({
        username: "user1",
        telegram_id: 123,
        total_in: 100,
        total_out: 50,
        games_count: 2,
        game_ids: "[1,2]",
      });
    });

    it("возвращает null, если пользователь не найден", () => {
      const user = UserRepository.findByUsername("unknown");
      expect(user).toBeNull();
    });
  });

  describe("findByTelegramId", () => {
    it("возвращает пользователя по telegram_id", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("user1", 123, 100, 50, 2, "[1,2]");

      const user = UserRepository.findByTelegramId(123);
      expect(user).not.toBeNull();
      expect(user?.username).toBe("user1");
    });

    it("возвращает null, если telegram_id не найден", () => {
      const user = UserRepository.findByTelegramId(999);
      expect(user).toBeNull();
    });
  });

  describe("upsert", () => {
    it("вставляет нового пользователя", () => {
      UserRepository.upsert({
        username: "newuser",
        telegram_id: 999,
        total_in: 10,
        total_out: 5,
        games_count: 1,
        game_ids: "[5]",
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("newuser") as any;
      expect(user).toMatchObject({
        username: "newuser",
        telegram_id: 999,
        total_in: 10,
        total_out: 5,
        games_count: 1,
        game_ids: "[5]",
      });
    });

    it("обновляет существующего пользователя", () => {
      // Сначала вставляем
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("existing", 111, 20, 10, 2, "[1,2]");

      // Обновляем
      UserRepository.upsert({
        username: "existing",
        telegram_id: 222, // telegram_id обновится
        total_in: 30,
        total_out: 15,
        games_count: 3,
        game_ids: "[1,2,3]", // явно передаём новый game_ids
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("existing") as any;
      expect(user).toMatchObject({
        username: "existing",
        telegram_id: 222,
        total_in: 30,
        total_out: 15,
        games_count: 3,
        game_ids: "[1,2,3]",
      });
    });

    it("при обновлении сохраняет старые game_ids, если новые не переданы", () => {
      // Вставляем пользователя со старыми game_ids
      testDB
        .prepare(
          `
        INSERT INTO users (username, telegram_id, total_in, total_out, games_count, game_ids)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
        )
        .run("existing", 111, 20, 10, 2, "[1,2]");

      // Обновляем без game_ids
      UserRepository.upsert({
        username: "existing",
        total_in: 30,
        total_out: 15,
        games_count: 3,
      });

      const user = testDB
        .prepare(`SELECT * FROM users WHERE username = ?`)
        .get("existing") as any;
      expect(user.game_ids).toBe("[1,2]"); // остались старые
      expect(user.total_in).toBe(30);
      expect(user.total_out).toBe(15);
    });
  });

  describe("clear", () => {
    it("удаляет всех пользователей", () => {
      testDB
        .prepare(
          `
        INSERT INTO users (username, total_in) VALUES (?, ?)
      `,
        )
        .run("user1", 100);
      testDB
        .prepare(
          `
        INSERT INTO users (username, total_in) VALUES (?, ?)
      `,
        )
        .run("user2", 200);

      UserRepository.clear();
      const count = testDB
        .prepare(`SELECT COUNT(*) as cnt FROM users`)
        .get() as { cnt: number };
      expect(count.cnt).toBe(0);
    });
  });

  describe("insertMany", () => {
    it("вставляет несколько пользователей одной транзакцией", () => {
      const users = [
        {
          username: "a",
          total_in: 1,
          total_out: 2,
          games_count: 1,
          game_ids: "[]",
        },
        {
          username: "b",
          total_in: 3,
          total_out: 4,
          games_count: 1,
          game_ids: "[]",
        },
      ];
      UserRepository.insertMany(users);

      const all = testDB
        .prepare(
          `SELECT username, total_in, total_out FROM users ORDER BY username`,
        )
        .all() as any[];
      expect(all).toHaveLength(2);
      expect(all[0].username).toBe("a");
      expect(all[0].total_in).toBe(1);
      expect(all[0].total_out).toBe(2);
      expect(all[1].username).toBe("b");
      expect(all[1].total_in).toBe(3);
      expect(all[1].total_out).toBe(4);
    });
  });
});
