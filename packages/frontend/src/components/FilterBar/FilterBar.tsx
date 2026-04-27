import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

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

  const isActive = (filter: string | undefined) => currentFilter === filter;

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
