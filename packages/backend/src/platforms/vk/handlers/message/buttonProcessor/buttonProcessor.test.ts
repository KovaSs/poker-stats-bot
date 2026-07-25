import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../../handlers/menu/menu", () => ({
  buttonCommands: {
    "📊 Всё время": "!stats all",
    "📊 Последний год": "!stats",
    "🏆 Всё время": "!top all",
    "🏆 Последний год": "!top",
    "📊 Статистика": "!stats",
    "📚 Помощь": "!help",
    "🏆 Топ": "!top",
  },
}));

import { isButtonOrYearFilter, normalizeText } from "./buttonProcessor";

describe("isButtonOrYearFilter", () => {
  it("returns true for button command", () => {
    expect(isButtonOrYearFilter("📊 Статистика")).toBe(true);
    expect(isButtonOrYearFilter("🏆 Топ")).toBe(true);
    expect(isButtonOrYearFilter("📚 Помощь")).toBe(true);
  });

  it("returns true for year filter with stats emoji", () => {
    expect(isButtonOrYearFilter("📊 2024")).toBe(true);
    expect(isButtonOrYearFilter("📊 2025")).toBe(true);
  });

  it("returns true for year filter with top emoji", () => {
    expect(isButtonOrYearFilter("🏆 2024")).toBe(true);
    expect(isButtonOrYearFilter("🏆 2025")).toBe(true);
  });

  it("returns false for regular text", () => {
    expect(isButtonOrYearFilter("game 18.07")).toBe(false);
    expect(isButtonOrYearFilter("просто текст")).toBe(false);
    expect(isButtonOrYearFilter("")).toBe(false);
  });

  it("trims whitespace before checking", () => {
    expect(isButtonOrYearFilter("  📊 Статистика  ")).toBe(true);
    expect(isButtonOrYearFilter("  📊 2024  ")).toBe(true);
  });
});

describe("normalizeText", () => {
  it("maps button command to its value", () => {
    const result = normalizeText("📊 Статистика");
    expect(result).toEqual({ text: "!stats", wasButton: true });
  });

  it("maps 'Всё время' buttons with all filter", () => {
    const result = normalizeText("📊 Всё время");
    expect(result).toEqual({ text: "!stats all", wasButton: true });
  });

  it("maps year filter with stats emoji", () => {
    const result = normalizeText("📊 2024");
    expect(result).toEqual({ text: "!stats 2024", wasButton: true });
  });

  it("maps year filter with top emoji", () => {
    const result = normalizeText("🏆 2024");
    expect(result).toEqual({ text: "!top 2024", wasButton: true });
  });

  it("returns same text when no button matches", () => {
    const result = normalizeText("game 18.07");
    expect(result).toEqual({ text: "game 18.07", wasButton: false });
  });

  it("returns empty text unchanged", () => {
    const result = normalizeText("");
    expect(result).toEqual({ text: "", wasButton: false });
  });

  it("trims whitespace before matching", () => {
    const result = normalizeText("  📊 Статистика  ");
    expect(result).toEqual({ text: "!stats", wasButton: true });
  });
});
