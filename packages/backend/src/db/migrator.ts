import { Database } from "better-sqlite3";

import { logger } from "@/config/logger";

import { migrations } from "./migrations";

function ensureMigrationsTable(db: Database): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export function runMigrations(db: Database): void {
  ensureMigrationsTable(db);

  const applied = (
    db.prepare("SELECT name FROM migrations").all() as { name: string }[]
  ).map((row) => row.name);

  for (const migration of migrations) {
    if (!applied.includes(migration.name)) {
      logger.info(`[DB] Applying migration: ${migration.name}`);
      try {
        migration.up(db);
        db.prepare("INSERT INTO migrations (name) VALUES (?)").run(
          migration.name,
        );
        logger.info(`[DB] Migration ${migration.name} applied successfully`);
      } catch (error) {
        logger.error({ migration: migration.name, error }, "Migration failed");
        throw error; // останавливаем запуск приложения
      }
    }
  }
}
