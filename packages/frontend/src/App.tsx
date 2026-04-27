import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

interface UserStats {
  username: string;
  total_in: number;
  total_out: number;
  games_count: number;
}

export const App = () => {
  const lp = useLaunchParams();

  // chatId — только из tgWebAppStartParam
  const startParam = lp.tgWebAppStartParam ?? "";
  const chatId = startParam.startsWith("chat_")
    ? Number(startParam.slice(5))
    : undefined;

  // сырая строка для заголовка Authorization
  const initDataRaw = lp.tgWebAppData;

  const [stats, setStats] = useState<UserStats[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("chatId:", chatId, "startParam:", startParam);
    if (!chatId) return;

    setStats(null);
    setError(null);

    const controller = new AbortController();
    const headers: HeadersInit = {};
    if (initDataRaw) {
      headers["Authorization"] = `tma ${initDataRaw}`;
    }

    fetch(`/api/stats?chatId=${chatId}&filter=all`, {
      headers,
      signal: controller.signal,
    })
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
  }, [chatId, initDataRaw]);

  return (
    <div style={{ padding: "16px", color: "var(--tg-theme-text-color, #fff)" }}>
      <h2>📊 Статистика (всё время)</h2>

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
