import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useMemo } from "react";

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
  name?: string;
}

interface StatsTableProps {
  onSortChange?: (sort: string, order: string) => void;
  stats: UserStats[];
}

export type SortKey = "games_count" | "total_in" | "total_out" | "balance";

export const StatsTable = ({ onSortChange, stats }: StatsTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>("balance");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (key: SortKey) => {
    const dir = sortKey === key && sortDir === "desc" ? "asc" : "desc";
    setSortKey(key);
    setSortDir(dir);
    setPage(0);
    onSortChange?.(key, dir);
  };

  const withBalance = useMemo(
    () => stats.map((u) => ({ ...u, balance: u.total_out - u.total_in })),
    [stats],
  );

  const sortedStats = useMemo(() => {
    const copy = [...withBalance];
    copy.sort((a, b) => {
      const aVal = sortKey === "balance" ? a.balance : a[sortKey];
      const bVal = sortKey === "balance" ? b.balance : b[sortKey];
      return sortDir === "desc" ? bVal - aVal : aVal - bVal;
    });
    return copy;
  }, [withBalance, sortKey, sortDir]);

  const pagedStats = sortedStats.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const totalIn = stats.reduce((sum, u) => sum + u.total_in, 0);
  const totalOut = stats.reduce((sum, u) => sum + u.total_out, 0);
  const totalDiff = totalOut - totalIn;

  if (!stats.length) return <Typography>Нет данных</Typography>;

  const columns: { key: SortKey; label: string }[] = [
    { key: "games_count", label: "Игр" },
    { key: "total_in", label: "Вход" },
    { key: "total_out", label: "Выход" },
    { label: "Баланс", key: "balance" },
  ];

  return (
    <Paper sx={{ borderRadius: 2, width: "100%" }}>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Игрок</TableCell>
              {columns.map((col) => (
                <TableCell key={col.key} align="right">
                  <TableSortLabel
                    active={sortKey === col.key}
                    direction={sortKey === col.key ? sortDir : "desc"}
                    onClick={() => handleSort(col.key)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedStats.map((u, i) => {
              const sign = u.balance >= 0 ? "+" : "";
              return (
                <TableRow key={u.username} hover>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{u.name || u.username}</TableCell>
                  <TableCell align="right">{u.games_count}</TableCell>
                  <TableCell align="right">{u.total_in}</TableCell>
                  <TableCell align="right">{u.total_out}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: u.balance >= 0 ? "#4caf50" : "#f44336" }}
                  >
                    {sign}
                    {u.balance}
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow sx={{ "& td": { borderTop: 2 }, fontWeight: "bold" }}>
              <TableCell colSpan={2}>Итого</TableCell>
              <TableCell align="right" />
              <TableCell align="right">{totalIn}</TableCell>
              <TableCell align="right">{totalOut}</TableCell>
              <TableCell
                align="right"
                sx={{ color: totalDiff >= 0 ? "#4caf50" : "#f44336" }}
              >
                {totalDiff >= 0 ? "+" : ""}
                {totalDiff}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={sortedStats.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};
