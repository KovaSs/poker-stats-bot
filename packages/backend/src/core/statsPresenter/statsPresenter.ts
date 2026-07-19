import type { CommandResult } from "../types";

export function formatStatsTitle(filter?: string): string {
  let title = "📊 Статистика участников";
  if (filter === "all") title += " (всё время)";
  else if (filter) title += ` (${filter} год)`;
  else title += " (последний год)";
  return title;
}

export function formatStatsTable(
  stats: {
    username: string;
    total_in: number;
    total_out: number;
    games_count: number;
  }[],
  filter?: string,
): string {
  if (stats.length === 0) {
    return "📊 Пока нет данных за указанный период.";
  }

  let message = formatStatsTitle(filter) + ":\n```\n";
  message += "№    Участник           Игр    Вход    Выход   Разница\n";
  message += "-------------------------------------------------------\n";

  stats.slice(0, 30).forEach((item, index) => {
    const num = (index + 1).toString().padEnd(4);
    const username = item.username.padEnd(18);
    const gamesCount = item.games_count.toString().padStart(4);
    const totalIn = item.total_in.toString().padStart(6);
    const totalOut = item.total_out.toString().padStart(6);
    const diff = item.total_out - item.total_in;
    const diffStr = diff >= 0 ? `+${diff}` : `${diff}`;
    message += `${num} ${username} ${gamesCount} ${totalIn} ${totalOut} ${diffStr.padStart(7)}\n`;
  });
  message += "```";
  return message;
}

export function formatTopTitle(filter?: string): string {
  let title = "🏆 Топ участников";
  if (filter === "all") title += " (всё время)";
  else if (filter) title += ` (${filter} год)`;
  else title += " (последний год)";
  return title + ":\n";
}

export function formatTopList(
  scores: { username: string; score: number }[],
  filter?: string,
): string {
  if (scores.length === 0) {
    return "🏆 Пока нет данных за указанный период.";
  }

  let result = formatTopTitle(filter);
  result += scores
    .slice(0, 10)
    .map((u, i) => {
      const sign = u.score >= 0 ? "+" : "";
      return `${i + 1}. ${u.username} — ${sign}${u.score}`;
    })
    .join("\n");
  return result;
}

export function formatHelp(): string {
  return [
    "📚 Список доступных команд:",
    "/menu — Показать главное меню",
    "/stats — Показать меню выбора периода, затем детальную статистику",
    "/top — Топ-10 участников по разнице (выход минус вход)",
    "/help — Показать это сообщение",
    "ℹ️ Как добавлять данные:",
    "Сообщения должны содержать строки вида:",
    "+<сумма> | <ник>",
    "Секции помечаются как Вход: и Выход:",
    "Пример:",
    "Вход:",
    "+500 | Тема",
    "+700 | @Rabotyaga3000",
    "Выход:",
    "+1840 | @EgorVaganov1111",
  ].join("\n");
}

export function processCommand(
  text: string,
): CommandResult & { filter?: string } {
  const trimmed = text.trim().toLowerCase();

  if (trimmed === "!help" || trimmed === "/help" || trimmed === "помощь") {
    return { reply: formatHelp() };
  }

  let filter: string | undefined;

  if (trimmed === "!stats" || trimmed === "/stats" || trimmed === "статистика") {
    return { filter: undefined, reply: null };
  }

  const statsMatch = trimmed.match(/^(!stats|всё|all)\s*(all)?\s*(\d{4})?$/);
  if (statsMatch) {
    if (statsMatch[2] === "all") filter = "all";
    else if (statsMatch[3]) filter = statsMatch[3];
    return { reply: null, filter };
  }

  if (trimmed === "!top" || trimmed === "/top" || trimmed === "топ") {
    return { filter: undefined, reply: null };
  }

  const topMatch = trimmed.match(/^(!top|топ)\s*(all)?\s*(\d{4})?$/);
  if (topMatch) {
    if (topMatch[2] === "all") filter = "all";
    else if (topMatch[3]) filter = topMatch[3];
    return { reply: null, filter };
  }

  return { reply: null };
}
