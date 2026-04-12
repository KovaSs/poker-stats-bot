import { describe, it, expect } from "vitest";

import { escapeMarkdown } from "./common";

describe("common utilities", () => {
  describe("escapeMarkdown", () => {
    it("экранирует специальные символы", () => {
      const input =
        "_test* [text] (test) ~test >test #test +test -=test |test {test} .test !test";
      const expected =
        "\\_test\\* \\[text\\] \\(test\\) \\~test \\>test \\#test \\+test \\-\\=test \\|test \\{test\\} \\.test \\!test";
      expect(escapeMarkdown(input)).toBe(expected);
    });

    it("не изменяет текст без спецсимволов", () => {
      const input = "normal text 123";
      expect(escapeMarkdown(input)).toBe(input);
    });
  });
});
