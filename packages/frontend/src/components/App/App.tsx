import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FilterBar } from "../FilterBar";

import styles from "./styles.module.scss";

const fetchStats = (
  chatId: number,
  filter: string | undefined,
  initDataRaw: string,
) => {
  const headers: HeadersInit = {};
  if (initDataRaw) headers["Authorization"] = `tma ${initDataRaw}`;
  let url = `/api/stats?chatId=${chatId}`;
  if (filter) url += `&filter=${filter}`;
  return fetch(url, { headers }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
};

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
}

export const App = () => {
  const lp = useLaunchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const initDataRaw = (lp as any).tgWebAppData as string;
  const startParam = lp.tgWebAppStartParam ?? "";
  const chatId = startParam.startsWith("chat_")
    ? Number(startParam.slice(5))
    : undefined;

  const [filter, setFilter] = useState<string | undefined>(undefined);

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchStats(chatId!, filter!, initDataRaw),
    queryKey: ["stats", chatId, filter],
    enabled: !!chatId && !!initDataRaw,
  });

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom>
        📊 Статистика
      </Typography>

      {chatId && initDataRaw && (
        <FilterBar
          chatId={chatId}
          currentFilter={filter}
          onFilterChange={setFilter}
          initDataRaw={initDataRaw}
        />
      )}

      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">Ошибка: {error.message}</Alert>}
      {stats && stats.length === 0 && <Typography>Нет данных</Typography>}

      {stats && stats.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "100%", borderRadius: 2 }}
        >
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Игрок</TableCell>
                <TableCell align="right">Игр</TableCell>
                <TableCell align="right">Вход</TableCell>
                <TableCell align="right">Выход</TableCell>
                <TableCell align="right">Баланс</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((u: UserStats, i: number) => {
                const balance = u.total_out - u.total_in;
                const sign = balance >= 0 ? "+" : "";
                return (
                  <TableRow key={u.username} hover>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell align="right">{u.games_count}</TableCell>
                    <TableCell align="right">{u.total_in}</TableCell>
                    <TableCell align="right">{u.total_out}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: balance >= 0 ? "#4caf50" : "#f44336" }}
                    >
                      {sign}
                      {balance}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <div className={styles.chatIdFooter}>
        chatId: {chatId ?? "не определён"}
      </div>
    </div>
  );
};

export default App;
