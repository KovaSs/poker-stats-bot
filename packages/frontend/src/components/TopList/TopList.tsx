import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo } from "react";

import styles from "./styles.module.scss";

interface UserStats {
  games_count: number;
  total_out: number;
  username: string;
  total_in: number;
}

interface TopListProps {
  stats: UserStats[];
}

export const TopList = ({ stats }: TopListProps) => {
  const top = useMemo(() => {
    return [...stats]
      .map((u) => ({
        ...u,
        balance: u.total_out - u.total_in,
      }))
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 10);
  }, [stats]);

  if (!top.length) return <Typography>Нет данных</Typography>;

  return (
    <List className={styles.list}>
      {top.map((item, index) => {
        const sign = item.balance >= 0 ? "+" : "";
        return (
          <ListItem key={item.username} divider>
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor:
                    index < 3
                      ? index === 0
                        ? "#FFD700"
                        : index === 1
                          ? "#C0C0C0"
                          : "#CD7F32"
                      : "grey.400",
                  color: "white",
                }}
              >
                {index + 1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.username}
              secondary={`Игр: ${item.games_count} | Вход: ${item.total_in} | Выход: ${item.total_out}`}
            />
            <Typography
              variant="body1"
              sx={{
                color: item.balance >= 0 ? "#4caf50" : "#f44336",
                fontWeight: "bold",
              }}
            >
              {sign}
              {item.balance}
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};
