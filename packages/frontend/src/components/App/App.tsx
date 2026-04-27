import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState, useCallback } from "react";

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
import { FilterBar } from "../FilterBar";

import styles from "./styles.module.scss";

interface UserStats {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}

export const App = () => {
  const lp = useLaunchParams();
  const startParam = lp.tgWebAppStartParam ?? "";
  const chatId = startParam.startsWith("chat_")
    ? Number(startParam.slice(5))
    : undefined;
  const initDataRaw = lp.tgWebAppData;

  const [stats, setStats] = useState<UserStats[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | undefined>(undefined); // undefined = последний год

  const loadStats = useCallback(() => {
    if (!chatId) return;
    setStats(null);
    setError(null);

    const controller = new AbortController();
    const headers: HeadersInit = {};
    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }

    let url = `/api/stats?chatId=${chatId}`;
    if (filter) {
      url += `&filter=${filter}`;
    }

    fetch(url, { headers, signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Stats loaded:", data);
        setStats(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("❌ Failed to fetch stats:", err);
          setError(err.message);
        }
      });

    return () => controller.abort();
  }, [chatId, initDataRaw, filter]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

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

      {stats === null && !error && <CircularProgress />}
      {error && (
        <Alert severity="error" className={styles.errorText}>
          Ошибка: {error}
        </Alert>
      )}
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
              {stats.map((u, i) => {
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
