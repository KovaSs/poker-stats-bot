export function buildMenuKeyboard(): string {
  return JSON.stringify({
    buttons: [
      [
        {
          action: { payload: '{"cmd":"stats"}', label: "📊 Статистика", type: "text" },
        },
        {
          action: { payload: '{"cmd":"top"}', label: "🏆 Топ", type: "text" },
        },
      ],
      [
        {
          action: { payload: '{"cmd":"help"}', label: "📚 Помощь", type: "text" },
        },
      ],
    ],
    one_time: false,
    inline: false,
  });
}

export function buildStatsFilterKeyboard(years: string[]): string {
  const yearRows = years.map((year) => [
    {
      action: { payload: JSON.stringify({ cmd: `stats_${year}` }), label: `📊 ${year}`, type: "text" },
    },
  ]);

  return JSON.stringify({
    buttons: [
      [
        {
          action: { payload: JSON.stringify({ cmd: "stats_all" }), label: "📊 Всё время", type: "text" },
        },
        {
          action: { payload: JSON.stringify({ cmd: "stats_last" }), label: "📊 Последний год", type: "text" },
        },
      ],
      ...yearRows,
    ],
    one_time: false,
    inline: true,
  });
}

export function buildTopFilterKeyboard(years: string[]): string {
  const yearRows = years.map((year) => [
    {
      action: { payload: JSON.stringify({ cmd: `top_${year}` }), label: `🏆 ${year}`, type: "text" },
    },
  ]);

  return JSON.stringify({
    buttons: [
      [
        {
          action: { payload: JSON.stringify({ cmd: "top_all" }), label: "🏆 Всё время", type: "text" },
        },
        {
          action: { payload: JSON.stringify({ cmd: "top_last" }), label: "🏆 Последний год", type: "text" },
        },
      ],
      ...yearRows,
    ],
    one_time: false,
    inline: true,
  });
}

export const buttonCommands: Record<string, string> = {
  "📊 Всё время": "!stats all",
  "📊 Последний год": "!stats",
  "🏆 Всё время": "!top all",
  "🏆 Последний год": "!top",
  "📊 Статистика": "!stats",
  "📚 Помощь": "!help",
  "🏆 Топ": "!top",
};
