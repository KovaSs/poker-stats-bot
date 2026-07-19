import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";

import { AdminUsers } from "./AdminUsers";
import { AdminGames } from "./AdminGames";

export function AdminPanel() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
        <Tab label="Пользователи" />
        <Tab label="Игры" />
      </Tabs>
      {tab === 0 && <AdminUsers />}
      {tab === 1 && <AdminGames />}
    </Box>
  );
}
