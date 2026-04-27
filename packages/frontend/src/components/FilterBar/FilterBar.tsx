import { useEffect, useState } from "react";

interface FilterBarProps {
  onFilterChange: (filter: string | undefined) => void;
  currentFilter: string | undefined;
  initDataRaw: string;
  chatId: number;
}

export const FilterBar = ({
  onFilterChange,
  currentFilter,
  initDataRaw,
  chatId,
}: FilterBarProps) => {
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const headers: HeadersInit = {};
    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }
    fetch(`/api/years?chatId=${chatId}`, { headers })
      .then((res) => res.json())
      .then(setYears)
      .catch(console.error);
  }, [chatId, initDataRaw]);

  const allButton = (
    <button
      key="all"
      onClick={() => onFilterChange("all")}
      style={{
        background: currentFilter === "all" ? "#5288c1" : "transparent",
        color:
          currentFilter === "all" ? "#fff" : "var(--tg-theme-text-color, #fff)",
        border: "1px solid #5288c1",
        borderRadius: 8,
        padding: "6px 12px",
        margin: 4,
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      Всё время
    </button>
  );

  const lastYearButton = (
    <button
      key="last_year"
      onClick={() => onFilterChange(undefined)} // undefined = последний год
      style={{
        background: currentFilter === undefined ? "#5288c1" : "transparent",
        color:
          currentFilter === undefined
            ? "#fff"
            : "var(--tg-theme-text-color, #fff)",
        border: "1px solid #5288c1",
        borderRadius: 8,
        padding: "6px 12px",
        margin: 4,
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      Последний год
    </button>
  );

  const yearButtons = years.map((year) => (
    <button
      key={year}
      onClick={() => onFilterChange(year)}
      style={{
        background: currentFilter === year ? "#5288c1" : "transparent",
        color:
          currentFilter === year ? "#fff" : "var(--tg-theme-text-color, #fff)",
        border: "1px solid #5288c1",
        borderRadius: 8,
        padding: "6px 12px",
        margin: 4,
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      {year}
    </button>
  ));

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 16 }}>
      {allButton}
      {lastYearButton}
      {yearButtons}
    </div>
  );
};
