import { describe, it, expect } from "vitest";

import {
  formatStatsTable,
  formatTopList,
  formatHelp,
  processCommand,
} from "./statsPresenter";

describe("formatStatsTable", () => {
  const mockStats = [
    { username: "User1", total_out: 1500, games_count: 3, total_in: 500 },
    { username: "User2", total_in: 1000, total_out: 500, games_count: 2 },
  ];

  it("возвращает сообщение если нет данных", () => {
    const result = formatStatsTable([], "all");
    expect(result).toBe("📊 Пока нет данных за указанный период.");
  });

  it("форматирует таблицу с фильтром all", () => {
    const result = formatStatsTable(mockStats, "all");
    expect(result).toContain("📊 Статистика участников (всё время)");
    expect(result).toContain("User1");
    expect(result).toContain("User2");
    expect(result).toContain("+1000");
    expect(result).toContain("1500");
  });

  it("форматирует таблицу с фильтром года", () => {
    const result = formatStatsTable(mockStats, "2024");
    expect(result).toContain("📊 Статистика участников (2024 год)");
  });

  it("форматирует таблицу без фильтра", () => {
    const result = formatStatsTable(mockStats);
    expect(result).toContain("📊 Статистика участников (последний год)");
  });
});

describe("formatTopList", () => {
  const mockScores = [
    { username: "User1", score: 1000 },
    { username: "User2", score: -500 },
  ];

  it("возвращает сообщение если нет данных", () => {
    const result = formatTopList([], "all");
    expect(result).toBe("🏆 Пока нет данных за указанный период.");
  });

  it("форматирует топ", () => {
    const result = formatTopList(mockScores, "all");
    expect(result).toContain("🏆 Топ участников (всё время)");
    expect(result).toContain("1. User1 — +1000");
    expect(result).toContain("2. User2 — -500");
  });
});

describe("formatHelp", () => {
  it("содержит основные команды", () => {
    const result = formatHelp();
    expect(result).toContain("/stats");
    expect(result).toContain("/top");
    expect(result).toContain("/help");
    expect(result).toContain("+<сумма> | <ник>");
  });
});

describe("processCommand", () => {
  it("распознаёт !help", () => {
    const result = processCommand("!help");
    expect(result.reply).toContain("/stats");
  });

  it("распознаёт /help", () => {
    const result = processCommand("/help");
    expect(result.reply).toContain("/stats");
  });

  it("распознаёт 'помощь'", () => {
    const result = processCommand("помощь");
    expect(result.reply).toContain("/stats");
  });

  it("распознаёт !stats (возвращает null reply)", () => {
    const result = processCommand("!stats");
    expect(result.reply).toBeNull();
  });

  it("распознаёт !top (возвращает null reply)", () => {
    const result = processCommand("!top");
    expect(result.reply).toBeNull();
  });

  it("возвращает null для неизвестной команды", () => {
    const result = processCommand("просто текст");
    expect(result.reply).toBeNull();
  });
});
