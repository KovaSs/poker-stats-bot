import sqlite3 from "sqlite3";

let db: sqlite3.Database;

export async function initDB() {
  db = new sqlite3.Database("./data/stats.db");
  console.log("[DB] База данных инициализирована");

  // Таблица games
  db.run(
    `
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER,
      message_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) console.error("[DB] Ошибка создания таблицы games:", err);
      else console.log("[DB] Таблица games проверена/создана");
    },
  );

  // Добавляем колонку game_date, если её нет (миграция)
  db.run(`ALTER TABLE games ADD COLUMN game_date TEXT`, (err) => {
    if (err) {
      if (err.message.includes("duplicate column name")) {
        console.log("[DB] Колонка game_date уже существует");
      } else {
        console.error("[DB] Ошибка при добавлении game_date:", err);
      }
    } else {
      console.log("[DB] Колонка game_date успешно добавлена");
    }
  });

  // Таблица transactions
  db.run(
    `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      game_id INTEGER,
      username TEXT,
      amount INTEGER,
      type TEXT CHECK(type IN ('in', 'out')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(game_id) REFERENCES games(id)
    )
  `,
    (err) => {
      if (err) console.error("[DB] Ошибка создания таблицы transactions:", err);
      else console.log("[DB] Таблица transactions готова");
    },
  );

  // Таблица user_stats
  db.run(
    `
    CREATE TABLE IF NOT EXISTS user_stats (
      username TEXT PRIMARY KEY,
      total_in INTEGER DEFAULT 0,
      total_out INTEGER DEFAULT 0
    )
  `,
    (err) => {
      if (err) console.error("[DB] Ошибка создания таблицы user_stats:", err);
      else console.log("[DB] Таблица user_stats готова");
    },
  );
}

// createGame теперь принимает messageId как number | null
export function createGame(
  chatId: number,
  messageId: number | null,
  gameDate?: string,
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO games (chat_id, message_id, game_date) VALUES (?, ?, ?)`,
      [chatId, messageId, gameDate || null],
      function (err) {
        if (err) {
          console.error("[DB] createGame error:", err);
          reject(err);
        } else {
          console.log(
            `[DB] createGame успешно, lastID: ${this.lastID}, дата: ${gameDate || "не указана"}`,
          );
          resolve(this.lastID);
        }
      },
    );
  });
}

export function addTransaction(
  gameId: number,
  username: string,
  amount: number,
  type: "in" | "out",
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO transactions (game_id, username, amount, type) VALUES (?, ?, ?, ?)`,
      [gameId, username, amount, type],
      function (err) {
        if (err) {
          console.error("[DB] addTransaction error:", err);
          reject(err);
        } else {
          console.log(
            `[DB] addTransaction успешно: ${username} +${amount} (${type}), lastID: ${this.lastID}`,
          );
          resolve();
        }
      },
    );
  });
}

export function recalcStats(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("[DB] recalcStats начат");
    db.get(`SELECT COUNT(*) as count FROM transactions`, (err, row: any) => {
      if (err) {
        console.error("[DB] Ошибка подсчёта transactions:", err);
        reject(err);
        return;
      }
      console.log(`[DB] Всего записей в transactions: ${row.count}`);
      if (row.count === 0) {
        db.run(`DELETE FROM user_stats`, (err2) => {
          if (err2) {
            console.error("[DB] Ошибка очистки user_stats:", err2);
            reject(err2);
          } else {
            resolve();
          }
        });
        return;
      }
      db.all(
        `SELECT type, COUNT(*) as cnt FROM transactions GROUP BY type`,
        (err2, rows: any[]) => {
          if (err2) {
            console.error("[DB] Ошибка GROUP BY type:", err2);
          } else {
            rows.forEach((r) =>
              console.log(`[DB] Тип ${r.type}: ${r.cnt} записей`),
            );
          }
          db.serialize(() => {
            db.run(`DELETE FROM user_stats`, (err3) => {
              if (err3) {
                console.error(
                  "[DB] recalcStats очистка user_stats ошибка:",
                  err3,
                );
                return reject(err3);
              }
              db.run(
                `INSERT INTO user_stats (username, total_in, total_out)
               SELECT
                 username,
                 COALESCE(SUM(CASE WHEN type = 'in' THEN amount ELSE 0 END), 0) as total_in,
                 COALESCE(SUM(CASE WHEN type = 'out' THEN amount ELSE 0 END), 0) as total_out
               FROM transactions
               GROUP BY username`,
                function (err4) {
                  if (err4) {
                    console.error("[DB] recalcStats вставка ошибка:", err4);
                    reject(err4);
                  } else {
                    console.log(
                      `[DB] recalcStats завершён, добавлено записей в user_stats: ${this.changes}`,
                    );
                    resolve();
                  }
                },
              );
            });
          });
        },
      );
    });
  });
}

export function getAllStats(): Promise<
  { username: string; total_in: number; total_out: number }[]
> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT username, total_in, total_out FROM user_stats`,
      [],
      (err, rows) => {
        if (err) {
          console.error("[DB] getAllStats error:", err);
          reject(err);
        } else {
          const stats = rows as any[];
          stats.sort(
            (a, b) => b.total_out - b.total_in - (a.total_out - a.total_in),
          );
          console.log(`[DB] getAllStats: получено ${stats.length} записей`);
          resolve(stats);
        }
      },
    );
  });
}

export function getAllScores(): Promise<{ username: string; score: number }[]> {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT username, (total_out - total_in) as score FROM user_stats ORDER BY score DESC`,
      [],
      (err, rows) => {
        if (err) {
          console.error("[DB] getAllScores error:", err);
          reject(err);
        } else {
          console.log(`[DB] getAllScores: получено ${rows.length} записей`);
          resolve(rows as any);
        }
      },
    );
  });
}
