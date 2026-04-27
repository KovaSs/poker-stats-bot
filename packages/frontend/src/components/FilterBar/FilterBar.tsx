import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

const fetchYears = (chatId: number, initDataRaw: string) => {
  const headers: HeadersInit = {};
  if (initDataRaw) headers["Authorization"] = `tma ${initDataRaw}`;
  return fetch(`/api/years?chatId=${chatId}`, { headers }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
};

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
  const { data: years = [] } = useQuery({
    queryKey: ["years", chatId],
    queryFn: () => fetchYears(chatId, initDataRaw),
    enabled: !!chatId && !!initDataRaw,
  });

  const isActive = (filter: string | undefined) => currentFilter === filter;

  return (
    <div className={styles.filterContainer}>
      <Button
        variant={isActive("all") ? "contained" : "outlined"}
        onClick={() => onFilterChange("all")}
      >
        Всё время
      </Button>
      <Button
        variant={currentFilter === undefined ? "contained" : "outlined"}
        onClick={() => onFilterChange(undefined)}
      >
        Последний год
      </Button>
      {years.map((year) => (
        <Button
          key={year}
          variant={currentFilter === year ? "contained" : "outlined"}
          onClick={() => onFilterChange(year)}
        >
          {year}
        </Button>
      ))}
    </div>
  );
};
