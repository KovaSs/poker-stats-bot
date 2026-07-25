import { buttonCommands } from "../../menu";

const yearFilterPattern = /^([📊🏆])\s*(\d{4})$/u;

export function isButtonOrYearFilter(text: string): boolean {
  const trimmed = text.trim();
  return (
    Object.prototype.hasOwnProperty.call(buttonCommands, trimmed) ||
    yearFilterPattern.test(trimmed)
  );
}

export interface NormalizedText {
  text: string;
  wasButton: boolean;
}

export function normalizeText(text: string): NormalizedText {
  const trimmed = text.trim();
  const command = buttonCommands[trimmed];
  if (command) {
    return { text: command, wasButton: true };
  }
  const yearMatch = trimmed.match(yearFilterPattern);
  if (yearMatch) {
    const prefix = yearMatch[1] === "📊" ? "!stats" : "!top";
    return { text: `${prefix} ${yearMatch[2]}`, wasButton: true };
  }
  return { text, wasButton: false };
}
