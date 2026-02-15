import { useEffect, useState } from "react";

interface UserScore {
  username: string;
  score: number;
}

function App() {
  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setScores);
  }, []);

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
