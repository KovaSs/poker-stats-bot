import { Tab, Tabs, Typography, CircularProgress, Alert } from "@mui/material";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { StatsTable } from "../StatsTable";
import { FilterBar } from "../FilterBar";
import { TopList } from "../TopList";

import styles from "./styles.module.scss";

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
}

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

export const App = () => {
  const lp = useLaunchParams();
  // В реальном проекте используйте useInitData().raw() из SDK, здесь оставлено как есть
  const initDataRaw = lp.tgWebAppData as string;
  const startParam = lp.tgWebAppStartParam ?? "";
  const chatId = startParam.startsWith("chat_")
    ? Number(startParam.slice(5))
    : undefined;

  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState(0); // 0 - Статистика, 1 - Топ

  const {
    data: stats = [] as UserStats[],
    isLoading,
    error,
  } = useQuery({
    queryFn: () => fetchStats(chatId!, filter!, initDataRaw),
    queryKey: ["stats", chatId, filter],
    enabled: !!chatId && !!initDataRaw,
  });

  return (
    <div className={styles.container}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
        📊 Покерная статистика
      </Typography>

      <Tabs
        onChange={(_, newValue) => setTab(newValue)}
        sx={{ mb: 2 }}
        value={tab}
        centered
      >
        <Tab label="Статистика" />
        <Tab label="Топ" />
      </Tabs>

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

      {!isLoading && !error && stats.length === 0 && (
        <Typography>Нет данных</Typography>
      )}

      {!isLoading && !error && stats.length > 0 && tab === 0 && (
        <StatsTable stats={stats} />
      )}

      {!isLoading && !error && stats.length > 0 && tab === 1 && (
        <TopList stats={stats} />
      )}

      <div className={styles.chatIdFooter}>
        chatId: {chatId ?? "не определён"}
      </div>
    </div>
  );
};
