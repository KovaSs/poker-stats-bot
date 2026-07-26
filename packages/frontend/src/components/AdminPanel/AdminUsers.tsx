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
  avatar_url: string | null;
  email: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  id: number;
}

interface EditForm {
  avatar_url: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

export function AdminUsers() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [mergeDialog, setMergeDialog] = useState<{ targetId: number; sourceId: string } | null>(null);
  const [editTarget, setEditTarget] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ avatar_url: "", email: "", name: "", role: "user" });

  const headers = { Authorization: `Bearer ${token}` };

  const { data: users = [], isLoading } = useQuery<AdminUser[]>({
    queryFn: () =>
      fetch(`/api/admin/users${search ? `?q=${search}` : ""}`, { headers }).then((r) => r.json()),
    queryKey: ["admin", "users", search],
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ data, id }: { data: Record<string, unknown>; id: number }) =>
      fetch(`/api/admin/users/${id}`, {
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify(data),
        method: "PUT",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });

  const mergeMutation = useMutation({
    mutationFn: ({ sourceId, targetId }: { sourceId: number; targetId: number }) =>
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

  const openEdit = (user: AdminUser) => {
    setEditForm({
      avatar_url: user.avatar_url || "",
      email: user.email || "",
      name: user.name || "",
      role: user.role,
    });
    setEditTarget(user);
  };

  const saveEdit = () => {
    if (!editTarget) return;
    const body: Record<string, unknown> = {};
    if (editForm.name !== (editTarget.name ?? "")) body.name = editForm.name || null;
    if (editForm.role !== editTarget.role) body.role = editForm.role;
    if (editForm.email !== (editTarget.email ?? "")) body.email = editForm.email || null;
    if (editForm.avatar_url !== (editTarget.avatar_url ?? "")) body.avatar_url = editForm.avatar_url || null;
    updateUserMutation.mutate(
      { data: body, id: editTarget.id },
      { onSuccess: () => setEditTarget(null) },
    );
  };

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
              <TableCell>Email</TableCell>
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
                <TableCell>{u.email || "-"}</TableCell>
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
                  <Button size="small" onClick={() => openEdit(u)} sx={{ mr: 1 }}>
                    Редактировать
                  </Button>
                  <Button size="small" onClick={() => setMergeDialog({ sourceId: "", targetId: u.id })}>
                    Объединить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Редактирование пользователя #{editTarget?.id}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Имя"
            value={editForm.name}
            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
            sx={{ mt: 1 }}
          />
          <Select
            fullWidth
            value={editForm.role}
            onChange={(e) => setEditForm((prev) => ({ ...prev, role: e.target.value as "admin" | "user" }))}
            sx={{ mt: 2 }}
          >
            <MenuItem value="user">user</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="Email"
            value={editForm.email}
            onChange={(e) => setEditForm((prev) => ({ ...prev, email: e.target.value }))}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="URL аватара"
            value={editForm.avatar_url}
            onChange={(e) => setEditForm((prev) => ({ ...prev, avatar_url: e.target.value }))}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="VK ID"
            value={editTarget?.vk_id ?? ""}
            slotProps={{ input: { readOnly: true } }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Telegram ID"
            value={editTarget?.telegram_id ?? ""}
            slotProps={{ input: { readOnly: true } }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditTarget(null)}>Отмена</Button>
          <Button onClick={saveEdit} disabled={updateUserMutation.isPending}>Сохранить</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={!!mergeDialog} onClose={() => setMergeDialog(null)}>
        <DialogTitle>Объединение пользователей</DialogTitle>
        <DialogContent>
          <Typography>
            Все идентичности из source будут перенесены в target (ID: {mergeDialog?.targetId}),
            после чего source будет удалён.
          </Typography>
          <TextField
            fullWidth
            label="ID source-пользователя"
            value={mergeDialog?.sourceId ?? ""}
            onChange={(e) =>
              setMergeDialog((prev) =>
                prev ? { ...prev, sourceId: e.target.value } : null,
              )
            }
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
        <Alert severity="error" sx={{ mt: 2 }}>Ошибка обновления пользователя</Alert>
      )}
    </div>
  );
}
