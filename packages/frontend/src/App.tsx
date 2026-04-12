import { useLaunchParams, initDataRaw } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

import type { InitData } from "@telegram-apps/sdk-react";

interface UserScore {
  username: string;
  score: number;
}

function App() {
  const launchParams = useLaunchParams();
  const [scores, setScores] = useState<UserScore[]>([]);

  const initData = launchParams.initData as InitData | undefined;
  const chatId = initData?.chat?.id;

  const rawInitData = initDataRaw(); // вызов функции, возвращающей строку

  useEffect(() => {
    if (!chatId) return;

    const headers: HeadersInit = {};
    if (rawInitData) {
      headers["Authorization"] = `tma ${rawInitData}`;
    }

    fetch(`/api/stats?chatId=${chatId}`, { headers })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setScores(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, [chatId, rawInitData]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📊 Статистика чата</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#3498db", color: "white" }}>
            <th>#</th>
            <th>Участник</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => (
            <tr key={item.username} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{index + 1}</td>
              <td>{item.username}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
