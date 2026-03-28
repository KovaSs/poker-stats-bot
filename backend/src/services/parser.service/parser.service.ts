export interface ParsedTransaction {
  username: string;
  amount: number;
  type: "in" | "out";
}

export function parseTransactions(lines: string[]): ParsedTransaction[] {
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
        transactions.push({
          username,
          amount: points,
          type: currentType,
        });
      }
    }
  }

  return transactions;
}

export function extractGameDateFromText(text: string): string | null {
  const dateMatch = text.match(/game\s+(\d{2})\.(\d{2})\.(\d{4})/);
  if (dateMatch) {
    const [, day, month, year] = dateMatch;
    return `${year}-${month}-${day}`;
  }
  return null;
}
