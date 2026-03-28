import { logger } from "@/config/logger";

export interface ParsedTransaction {
  username: string;
  amount: number;
  type: "in" | "out";
}

function sanitizeUsername(username: string): string | null {
  // Удаляем управляющие символы
  let cleaned = username.replace(/[\x00-\x1F\x7F]/g, "");
  cleaned = cleaned.trim();
  if (cleaned.length === 0) return null;
  // Ограничиваем длину
  if (cleaned.length > 50) cleaned = cleaned.substring(0, 50);
  return cleaned;
}

export const ParserService = {
  parseTransactions(lines: string[]): ParsedTransaction[] {
    let currentType: "in" | "out" | null = null;
    const transactions: ParsedTransaction[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase() === "вход:") {
        currentType = "in";
        continue;
      } else if (trimmed.toLowerCase() === "выход:") {
        currentType = "out";
        continue;
      }

      if (!currentType) continue;

      const match = trimmed.match(/^\+(\d+)\s*\|\s*([^\/\n]+)/);
      if (match) {
        const points = parseInt(match[1], 10);
        let username = match[2].trim();
        const commentIndex = username.indexOf("//");
        if (commentIndex !== -1)
          username = username.substring(0, commentIndex).trim();

        if (username) {
          const sanitized = sanitizeUsername(username);
          if (sanitized) {
            transactions.push({
              username: sanitized,
              amount: points,
              type: currentType,
            });
          } else {
            logger.warn(
              `[Parser] Пропущена транзакция с некорректным username: "${username}"`,
            );
          }
        }
      }
    }

    return transactions;
  },

  extractGameDateFromText(text: string): string | null {
    const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
    if (dateMatch) {
      const [, day, month, year] = dateMatch;
      return `${year}-${month}-${day}`;
    }
    return null;
  },
};
