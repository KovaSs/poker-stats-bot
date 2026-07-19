import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useAuth } from "../AuthProvider";

interface Transaction {
  id: number;
  username: string;
  amount: number;
  type: "in" | "out";
}

type TransactionInput = Omit<Transaction, "id">;

interface Game {
  transactions: Transaction[];
  message_id: number | null;
  game_date: string | null;
  created_at: string;
  platform: string;
  chat_id: number;
  id: number;
}

export function AdminGames() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [editGame, setEditGame] = useState<Game | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editTransactions, setEditTransactions] = useState<Transaction[]>([]);

  const headers = { Authorization: `Bearer ${token}` };

  const { data: games = [], isLoading } = useQuery<Game[]>({
    queryFn: () => fetch("/api/admin/games", { headers }).then((r) => r.json()),
    queryKey: ["admin", "games"],
  });

  const updateMutation = useMutation({
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "games"] });
      setEditGame(null);
      if (result.sync) {
        alert(
          `Синхронизация: Telegram ${result.sync.telegram ? "✓" : "✗"}, VK ${result.sync.vk ? "✓" : "✗"}`,
        );
      }
    },
    mutationFn: (data: { id: number; game_date?: string; transactions?: TransactionInput[] }) =>
      fetch(`/api/admin/games/${data.id}`, {
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(data),
        method: "PUT",
      }).then((r) => r.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/admin/games/${id}`, {
        method: "DELETE",
        headers,
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "games"] }),
  });

  const openEdit = (game: Game) => {
    setEditGame(game);
    setEditDate(game.game_date ?? "");
    setEditTransactions([...game.transactions]);
  };

  const addTransaction = () => {
    setEditTransactions((prev) => [
      ...prev,
      { id: Date.now(), username: "", type: "in", amount: 0 },
    ]);
  };

  const updateTx = (id: number, field: keyof Transaction, value: string | number) => {
    setEditTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, [field]: value } : tx)),
    );
  };

  const removeTx = (id: number) => {
    setEditTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Чат</TableCell>
              <TableCell>Платформа</TableCell>
              <TableCell>Транзакции</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.id}</TableCell>
                <TableCell>{game.game_date ?? "-"}</TableCell>
                <TableCell>{game.chat_id}</TableCell>
                <TableCell>{game.platform}</TableCell>
                <TableCell>{game.transactions.length}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => openEdit(game)}>
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      if (confirm("Удалить игру?")) deleteMutation.mutate(game.id);
                    }}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editGame} onClose={() => setEditGame(null)} maxWidth="md" fullWidth>
        <DialogTitle>Редактирование игры #{editGame?.id}</DialogTitle>
        <DialogContent>
          <TextField
            label="Дата игры"
            type="date"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            fullWidth
            sx={{ mb: 2, mt: 1 }}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Typography variant="subtitle2" sx={{ mb: 1 }}>Транзакции:</Typography>

          {editTransactions.map((tx) => (
            <div key={tx.id} style={{ alignItems: "center", display: "flex", marginBottom: 8, gap: 8 }}>
              <TextField
                label="Имя"
                value={tx.username}
                onChange={(e) => updateTx(tx.id, "username", e.target.value)}
                size="small"
                sx={{ width: 150 }}
              />
              <TextField
                label="Сумма"
                type="number"
                value={tx.amount}
                onChange={(e) => updateTx(tx.id, "amount", parseInt(e.target.value, 10) || 0)}
                size="small"
                sx={{ width: 100 }}
              />
              <Button
                size="small"
                variant={tx.type === "in" ? "contained" : "outlined"}
                onClick={() => updateTx(tx.id, "type", tx.type === "in" ? "out" : "in")}
              >
                {tx.type === "in" ? "Вход" : "Выход"}
              </Button>
              <Button size="small" color="error" onClick={() => removeTx(tx.id)}>
                Удалить
              </Button>
            </div>
          ))}

          <Button onClick={addTransaction} variant="outlined" size="small">
            + Добавить транзакцию
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditGame(null)}>Отмена</Button>
          <Button
            onClick={() =>
              updateMutation.mutate({
                transactions: editTransactions.map(({ username, amount, type }) => ({
                  username,
                  amount,
                  type,
                })),
                game_date: editDate || undefined,
                id: editGame!.id,
              })
            }
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      {updateMutation.isError && (
        <Alert severity="error">Ошибка обновления игры</Alert>
      )}
    </div>
  );
}
