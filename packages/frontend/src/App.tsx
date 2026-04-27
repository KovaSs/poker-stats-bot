import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState, useCallback } from "react";
import { FilterBar } from "./components/FilterBar";

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
    <div style={{ padding: "16px", color: "var(--tg-theme-text-color, #fff)" }}>
      <h2>📊 Статистика</h2>

      {chatId && initDataRaw && (
        <FilterBar
          chatId={chatId}
          currentFilter={filter}
          onFilterChange={setFilter}
          initDataRaw={initDataRaw}
        />
      )}

      {stats === null && !error && <div>Загрузка...</div>}
      {error && <div style={{ color: "red" }}>Ошибка: {error}</div>}
      {stats && stats.length === 0 && <div>Нет данных</div>}

      {stats && stats.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #444" }}>
              <th>№</th>
              <th>Игрок</th>
              <th>Игр</th>
              <th>Вход</th>
              <th>Выход</th>
              <th>Баланс</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((u, i) => {
              const balance = u.total_out - u.total_in;
              const sign = balance >= 0 ? "+" : "";
              return (
                <tr key={u.username} style={{ borderBottom: "1px solid #333" }}>
                  <td>{i + 1}</td>
                  <td>{u.username}</td>
                  <td>{u.games_count}</td>
                  <td>{u.total_in}</td>
                  <td>{u.total_out}</td>
                  <td style={{ color: balance >= 0 ? "#4caf50" : "#f44336" }}>
                    {sign}
                    {balance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 24, fontSize: 12, opacity: 0.6 }}>
        chatId: {chatId ?? "не определён"}
      </div>
    </div>
  );
};

export default App;
