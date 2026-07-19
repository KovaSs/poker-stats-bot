import { describe, it, expect } from "vitest";

import { buildMenuKeyboard, buildStatsFilterKeyboard, buildTopFilterKeyboard, buttonCommands } from "./menu";

describe("buildMenuKeyboard", () => {
  it("возвращает валидный JSON с кнопками меню", () => {
    const result = buildMenuKeyboard();
    const parsed = JSON.parse(result);
    expect(parsed.buttons).toHaveLength(2);
    expect(parsed.inline).toBe(false);
    expect(parsed.one_time).toBe(false);
    expect(parsed.buttons[0][0].action.label).toBe("📊 Статистика");
    expect(parsed.buttons[0][1].action.label).toBe("🏆 Топ");
    expect(parsed.buttons[1][0].action.label).toBe("📚 Помощь");
  });
});

describe("buildStatsFilterKeyboard", () => {
  it("возвращает inline-клавиатуру с годами", () => {
    const result = buildStatsFilterKeyboard(["2024", "2025", "2026"]);
    const parsed = JSON.parse(result);
    expect(parsed.inline).toBe(true);
    expect(parsed.buttons[0]).toHaveLength(2);
    expect(parsed.buttons[0][0].action.label).toBe("📊 Всё время");
    expect(parsed.buttons[0][1].action.label).toBe("📊 Последний год");
    expect(parsed.buttons[1]).toHaveLength(1);
    expect(parsed.buttons[1][0].action.label).toBe("📊 2024");
    expect(parsed.buttons[3][0].action.label).toBe("📊 2026");
  });

  it("возвращает пустые строки годов если их нет", () => {
    const result = buildStatsFilterKeyboard([]);
    const parsed = JSON.parse(result);
    expect(parsed.buttons).toHaveLength(1);
  });
});

describe("buildTopFilterKeyboard", () => {
  it("возвращает inline-клавиатуру с годами", () => {
    const result = buildTopFilterKeyboard(["2025"]);
    const parsed = JSON.parse(result);
    expect(parsed.inline).toBe(true);
    expect(parsed.buttons[0][0].action.label).toBe("🏆 Всё время");
    expect(parsed.buttons[0][1].action.label).toBe("🏆 Последний год");
    expect(parsed.buttons[1][0].action.label).toBe("🏆 2025");
  });
});

describe("buttonCommands", () => {
  it("содержит маппинг для всех кнопок", () => {
    expect(buttonCommands["📊 Статистика"]).toBe("!stats");
    expect(buttonCommands["🏆 Топ"]).toBe("!top");
    expect(buttonCommands["📚 Помощь"]).toBe("!help");
    expect(buttonCommands["📊 Всё время"]).toBe("!stats all");
    expect(buttonCommands["📊 Последний год"]).toBe("!stats");
    expect(buttonCommands["🏆 Всё время"]).toBe("!top all");
    expect(buttonCommands["🏆 Последний год"]).toBe("!top");
  });
});
