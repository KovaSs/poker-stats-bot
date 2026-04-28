import { describe, it, expect, vi } from "vitest";

import { logger } from "@/config/logger";

import { ParserService } from "./parser.service";

vi.mock("@/config/logger", () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  },
}));

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
      const result = ParserService.parseTransactions(lines);
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
      const result = ParserService.parseTransactions(lines);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({ username: "User2", amount: 300, type: "in" });
    });

    it("игнорирует пустые строки и лишние пробелы", () => {
      const lines = ["Вход:", "  +500 | User  ", "", "  +200 | User2"];
      const result = ParserService.parseTransactions(lines);
      expect(result).toHaveLength(2);
    });

    it("корректно обрезает комментарии", () => {
      const lines = ["Вход:", "+500 | User // comment"];
      const result = ParserService.parseTransactions(lines);
      expect(result[0].username).toBe("User");
    });

    describe("санитизация username", () => {
      it("удаляет управляющие символы", () => {
        const lines = ["Вход:", "+500 | User\x00\x01Name"];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(1);
        expect(result[0].username).toBe("UserName");
      });

      it("обрезает длинный username до 50 символов", () => {
        const longName = "a".repeat(60);
        const lines = ["Вход:", `+500 | ${longName}`];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(1);
        expect(result[0].username.length).toBe(50);
        expect(result[0].username).toBe("a".repeat(50));
      });

      it("пропускает пустой username после очистки и логирует предупреждение", () => {
        const warnSpy = vi.spyOn(logger, "warn");
        const lines = ["Вход:", "+500 | \x00\x01"];
        const result = ParserService.parseTransactions(lines);
        expect(result).toHaveLength(0);
        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            "Пропущена транзакция с некорректным username",
          ),
        );
      });
    });
  });

  describe("extractGameDateFromText", () => {
    it("извлекает дату из команды game", () => {
      const text = "game 27.03.2026 some text";
      const date = ParserService.extractGameDateFromText(text);
      expect(date).toBe("2026-03-27");
    });

    it("возвращает null, если дата отсутствует", () => {
      const text = "game no date";
      const date = ParserService.extractGameDateFromText(text);
      expect(date).toBeNull();
    });
  });
});
