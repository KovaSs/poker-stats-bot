import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";

import styles from "./styles.module.scss";

const fetchYears = (token: string | null) => {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return fetch("/api/years", { headers }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
};

interface FilterBarProps {
  onFilterChange: (filter: string | undefined) => void;
  currentFilter: string | undefined;
  token: string | null;
}

export const FilterBar = ({ onFilterChange, currentFilter, token }: FilterBarProps) => {
  const { data: years = [] } = useQuery<string[]>({
    queryFn: () => fetchYears(token),
    queryKey: ["years"],
  });

  const buttons = [
    { filter: "all" as const, label: "Всё время" },
    { filter: undefined as string | undefined, label: "Последний год" },
    ...years.map((year) => ({ filter: year, label: year })),
  ];

  return (
    <div className={styles.filterContainer}>
      {buttons.map(({ filter, label }) => (
        <Button
          key={label}
          variant={currentFilter === filter ? "contained" : "outlined"}
          onClick={() => onFilterChange(filter)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
