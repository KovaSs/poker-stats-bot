import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Tooltip,
  CircularProgress,
  Alert,
} from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { useQuery } from "@tanstack/react-query";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";

import { StatsTable } from "../StatsTable";
import { AdminPanel } from "../AdminPanel";
import { useAuth } from "../AuthProvider";
import { useVkLogin } from "../LoginPage";
import { FilterBar } from "../FilterBar";
import { TopList } from "../TopList";

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
  name?: string;
}

const TABS = {
  MY_STATS: 2,
  MY_TOP: 3,
  ADMIN: 4,
  STATS: 0,
  TOP: 1,
};

export const App = () => {
  const { isAuthenticated, logout, login, token, user } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [sortDir, setSortDir] = useState<string | undefined>(undefined);
  const [tab, setTab] = useState(TABS.STATS);
  const { handleLogin } = useVkLogin();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code || isAuthenticated) return;

    fetch("/api/auth/vk", {
      body: JSON.stringify({ redirect_uri: window.location.origin, code }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Auth failed");
        const data = await res.json();
        await login(data.token);
        window.history.replaceState({}, "", window.location.pathname);
      })
      .catch(() => {});
  }, [isAuthenticated, login]);

  const navItems = [
    { label: "Статистика", tab: TABS.STATS },
    { tab: TABS.TOP, label: "Топ" },
  ];
  if (isAuthenticated) {
    navItems.push(
      { label: "Моя статистика", tab: TABS.MY_STATS },
      { label: "Мой топ", tab: TABS.MY_TOP },
    );
  }
  navItems.push({ label: "Администрирование", tab: TABS.ADMIN });

  const authHeaders: Record<string, string> = {};
  if (token) authHeaders["Authorization"] = `Bearer ${token}`;

  const isPersonalTab = tab === TABS.MY_STATS || tab === TABS.MY_TOP;
  const baseUrl = isPersonalTab ? "/api/stats/me" : "/api/stats";
  const params = new URLSearchParams();
  if (filter) params.set("filter", filter);
  if (sort) params.set("sort", sort);
  if (sortDir) params.set("order", sortDir);
  const qs = params.toString();
  const url = `${baseUrl}${qs ? `?${qs}` : ""}`;

  const {
    data: stats = [] as UserStats[],
    isLoading,
    error,
  } = useQuery({
    queryFn: () =>
      fetch(url, { headers: authHeaders }).then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      }),
    queryKey: ["stats", tab, filter, token],
  });

  const showStatsTable = tab === TABS.STATS || tab === TABS.MY_STATS;
  const showTopList = tab === TABS.TOP || tab === TABS.MY_TOP;
  const showFilterBar =
    tab === TABS.STATS ||
    tab === TABS.TOP ||
    tab === TABS.MY_STATS ||
    tab === TABS.MY_TOP;

  return (
    <Box sx={{ flexDirection: "column", minHeight: "100vh", display: "flex" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AnalyticsIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
                mr: 2,
              }}
            >
              Poker Stats
            </Typography>

            <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
              <IconButton
                onClick={(e) => setAnchorElNav(e.currentTarget)}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                sx={{ display: { xs: "block", md: "none" } }}
                onClose={() => setAnchorElNav(null)}
                open={Boolean(anchorElNav)}
                anchorEl={anchorElNav}
                keepMounted
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      setTab(item.tab);
                      setAnchorElNav(null);
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {item.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AnalyticsIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              variant="h5"
              noWrap
              sx={{
                display: { xs: "flex", md: "none" },
                textDecoration: "none",
                color: "inherit",
                fontWeight: 700,
                flexGrow: 1,
                mr: 2,
              }}
            >
              Poker Stats
            </Typography>

            <Box
              sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, gap: 1 }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  onClick={() => setTab(item.tab)}
                  sx={{
                    borderBottom: tab === item.tab ? 2 : 0,
                    display: "block",
                    borderRadius: 0,
                    color: "white",
                    my: 2,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {isAuthenticated && user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Профиль">
                  <IconButton
                    onClick={(e) => setAnchorElUser(e.currentTarget)}
                    sx={{ p: 0 }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "secondary.main",
                        fontSize: 14,
                        height: 32,
                        width: 32,
                      }}
                    >
                      {user.id}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "top" }}
                  onClose={() => setAnchorElUser(null)}
                  open={Boolean(anchorElUser)}
                  anchorEl={anchorElUser}
                  sx={{ mt: "45px" }}
                  keepMounted
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      ID: {user.id} ({user.role})
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      setAnchorElUser(null);
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>Выйти</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button color="inherit" onClick={handleLogin}>
                Войти
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ flex: 1, mb: 3, mt: 3 }}>
        {showFilterBar && (
          <FilterBar
            currentFilter={filter}
            onFilterChange={setFilter}
            token={token}
          />
        )}

        {tab === TABS.ADMIN && <AdminPanel />}

        {(showStatsTable || showTopList) && (
          <>
            {isLoading && (
              <Box sx={{ justifyContent: "center", display: "flex", mt: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Ошибка: {(error as Error).message}
              </Alert>
            )}
            {!isLoading && !error && stats.length === 0 && (
              <Typography sx={{ textAlign: "center", mt: 4 }}>
                Нет данных
              </Typography>
            )}
            {!isLoading && !error && stats.length > 0 && (
              <Box sx={{ flexDirection: "column", display: "flex", gap: 3 }}>
                {showStatsTable && (
                  <StatsTable
                    stats={stats}
                    onSortChange={(s, d) => {
                      setSort(s);
                      setSortDir(d);
                    }}
                  />
                )}
                {showTopList && <TopList stats={stats} />}
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
