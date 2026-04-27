import { useLaunchParams, initDataRaw } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";

import type { InitData } from "@telegram-apps/sdk-react";

interface UserScore {
  username: string;
  score: number;
}

export const App = () => {
  const launchParams = useLaunchParams();
  const [scores, setScores] = useState<UserScore[]>([]);

  const initData = launchParams.initData as InitData | undefined;
  const startParam = initData?.start_param; // строка "chat_-100..."
  const chatId = startParam?.startsWith("chat_")
    ? Number(startParam.substring(5))
    : undefined;

  const rawInitData = initDataRaw();

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
    <div
      style={{
        flexDirection: "column",
        fontFamily: "sans-serif",
        whiteSpace: "pre",
        display: "flex",
        padding: "20px",
        width: "100vw",
      }}
    >
      <div>launchParams {JSON.stringify(launchParams, null, 2)}</div>
      <div>
        Scores {chatId} {JSON.stringify(scores, null, 2)}
      </div>
    </div>
  );
};

export default App;
