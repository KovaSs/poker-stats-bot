import { describe, it, expect } from "vitest";

import { parseTransactions, extractGameDateFromText } from "./parser.service";

describe("parser.service", () => {
  describe("parseTransactions", () => {
    it("должен парсить вход и выход", () => {
      const lines = [
        "Вход:",
        "+500 | Тема",
        "+700 | @Rabotyaga3000 // комментарий",
        "Выход:",
        "+1840 | @EgorVaganov1111",
        "+290 | kovass",
      ];
      const result = parseTransactions(lines);
      expect(result).toHaveLength(4);
      expect(result[0]).toEqual({ username: "Тема", amount: 500, type: "in" });
      expect(result[1]).toEqual({
        username: "@Rabotyaga3000",
        amount: 700,
        type: "in",
      });
      expect(result[2]).toEqual({
        username: "@EgorVaganov1111",
        amount: 1840,
        type: "out",
      });
      expect(result[3]).toEqual({
        username: "kovass",
        amount: 290,
        type: "out",
      });
    });

    it("игнорирует строки без типа", () => {
      const lines = ["+500 | User", "Вход:", "+300 | User2"];
      const result = parseTransactions(lines);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ username: "User2", amount: 300, type: "in" });
    });

    it("игнорирует пустые строки и лишние пробелы", () => {
      const lines = ["Вход:", "  +500 | User  ", "", "  +200 | User2"];
      const result = parseTransactions(lines);
      expect(result).toHaveLength(2);
    });

    it("корректно обрезает комментарии", () => {
      const lines = ["Вход:", "+500 | User // comment"];
      const result = parseTransactions(lines);
      expect(result[0].username).toBe("User");
    });
  });

  describe("extractGameDateFromText", () => {
    it("извлекает дату из команды game", () => {
      const text = "game 27.03.2026 some text";
      const date = extractGameDateFromText(text);
      expect(date).toBe("2026-03-27");
    });

    it("возвращает null, если дата отсутствует", () => {
      const text = "game no date";
      const date = extractGameDateFromText(text);
      expect(date).toBeNull();
    });
  });
});
