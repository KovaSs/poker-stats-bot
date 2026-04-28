import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
}

interface StatsTableProps {
  stats: UserStats[];
}

export const StatsTable = ({ stats }: StatsTableProps) => {
  if (!stats.length) return <Typography>Нет данных</Typography>;

  const totalIn = stats.reduce((sum, u) => sum + u.total_in, 0);
  const totalOut = stats.reduce((sum, u) => sum + u.total_out, 0);
  const totalDiff = totalOut - totalIn;

  return (
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
          {/* Итоговая строка */}
          <TableRow sx={{ fontWeight: "bold", "& td": { borderTop: 2 } }}>
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
  );
};
