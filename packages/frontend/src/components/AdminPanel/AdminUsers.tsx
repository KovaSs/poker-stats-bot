import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useAuth } from "../AuthProvider";

interface UserIdentity {
  platform: string;
  username: string;
  chat_id: number;
  id: number;
}

interface AdminUser {
  telegram_id: number | null;
  identities: UserIdentity[];
  role: "admin" | "user";
  vk_id: number | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  id: number;
}

export function AdminUsers() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [mergeDialog, setMergeDialog] = useState<{ targetId: number; sourceId: string } | null>(null);

  const headers = { Authorization: `Bearer ${token}` };

  const { data: users = [], isLoading } = useQuery<AdminUser[]>({
    queryFn: () =>
      fetch(`/api/admin/users${search ? `?q=${search}` : ""}`, { headers }).then((r) => r.json()),
    queryKey: ["admin", "users", search],
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ data, id }: { id: number; data: Record<string, unknown> }) =>
      fetch(`/api/admin/users/${id}`, {
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(data),
        method: "PUT",
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });

  const mergeMutation = useMutation({
    mutationFn: ({ targetId, sourceId }: { targetId: number; sourceId: number }) =>
      fetch(`/api/admin/users/${targetId}/merge`, {
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ sourceId }),
        method: "PUT",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      setMergeDialog(null);
    },
  });

  if (isLoading) return <Typography>Загрузка...</Typography>;

  return (
    <div>
      <TextField
        label="Поиск по имени или ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ width: 300, mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>VK ID</TableCell>
              <TableCell>Telegram ID</TableCell>
              <TableCell>Идентичности</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>
                  <TextField
                    defaultValue={u.name ?? ""}
                    size="small"
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      if (val !== (u.name ?? "")) {
                        updateUserMutation.mutate({ data: { name: val || null }, id: u.id });
                      }
                    }}
                    sx={{ width: 150 }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={u.role}
                    size="small"
                    onChange={(e) =>
                      updateUserMutation.mutate({ data: { role: e.target.value }, id: u.id })
                    }
                  >
                    <MenuItem value="user">user</MenuItem>
                    <MenuItem value="admin">admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{u.vk_id ?? "-"}</TableCell>
                <TableCell>{u.telegram_id ?? "-"}</TableCell>
                <TableCell>
                  {u.identities.map((i) => (
                    <div key={i.id}>
                      {i.username} ({i.platform}, чат {i.chat_id})
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    onClick={() => setMergeDialog({ targetId: u.id, sourceId: "" })}
                  >
                    Объединить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!mergeDialog} onClose={() => setMergeDialog(null)}>
        <DialogTitle>Объединение пользователей</DialogTitle>
        <DialogContent>
          <Typography>
            Все идентичности из source будут перенесены в target (ID: {mergeDialog?.targetId}),
            после чего source будет удалён.
          </Typography>
          <TextField
            label="ID source-пользователя"
            value={mergeDialog?.sourceId ?? ""}
            onChange={(e) =>
              setMergeDialog((prev) =>
                prev ? { ...prev, sourceId: e.target.value } : null,
              )
            }
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMergeDialog(null)}>Отмена</Button>
          <Button
            onClick={() =>
              mergeMutation.mutate({
                sourceId: parseInt(mergeDialog!.sourceId, 10),
                targetId: mergeDialog!.targetId,
              })
            }
            disabled={!mergeDialog?.sourceId}
          >
            Объединить
          </Button>
        </DialogActions>
      </Dialog>

      {updateUserMutation.isError && (
        <Alert severity="error">Ошибка обновления пользователя</Alert>
      )}
    </div>
  );
}
