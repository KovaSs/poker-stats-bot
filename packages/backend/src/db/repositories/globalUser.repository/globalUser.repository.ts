import { injectable } from "tsyringe";

import { getDB } from "@/db/connection";

export interface GlobalUserRow {
  telegram_id: number | null;
  role: "admin" | "user";
  vk_id: number | null;
  email: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  id: number;
}

@injectable()
export class GlobalUserRepository {
  create(params?: { name?: string; vkId?: number; telegramId?: number; role?: "admin" | "user" }): number {
    const stmt = getDB().prepare(`
      INSERT INTO global_users (name, vk_id, telegram_id, role)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(
      params?.name ?? null,
      params?.vkId ?? null,
      params?.telegramId ?? null,
      params?.role ?? "user",
    );
    return Number(info.lastInsertRowid);
  }

  findByVkId(vkId: number): GlobalUserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM global_users WHERE vk_id = ?`);
    const row = stmt.get(vkId) as GlobalUserRow | undefined;
    return row || null;
  }

  findByTelegramId(telegramId: number): GlobalUserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM global_users WHERE telegram_id = ?`);
    const row = stmt.get(telegramId) as GlobalUserRow | undefined;
    return row || null;
  }

  findById(id: number): GlobalUserRow | null {
    const stmt = getDB().prepare(`SELECT * FROM global_users WHERE id = ?`);
    const row = stmt.get(id) as GlobalUserRow | undefined;
    return row || null;
  }

  findAll(): GlobalUserRow[] {
    const stmt = getDB().prepare(`SELECT * FROM global_users ORDER BY id`);
    return stmt.all() as GlobalUserRow[];
  }

  updateRole(id: number, role: "admin" | "user"): void {
    const stmt = getDB().prepare(`
      UPDATE global_users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(role, id);
  }

  updateVkId(id: number, vkId: number): void {
    const stmt = getDB().prepare(`
      UPDATE global_users SET vk_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(vkId, id);
  }

  updateTelegramId(id: number, telegramId: number): void {
    const stmt = getDB().prepare(`
      UPDATE global_users SET telegram_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);
    stmt.run(telegramId, id);
  }

  updateName(id: number, name: string): void {
    getDB().prepare(`
      UPDATE global_users SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).run(name, id);
  }

  delete(id: number): void {
    getDB().prepare(`DELETE FROM global_users WHERE id = ?`).run(id);
  }

  search(query: string): GlobalUserRow[] {
    const stmt = getDB().prepare(`
      SELECT * FROM global_users gu
      WHERE gu.id LIKE ?
         OR EXISTS (SELECT 1 FROM user_identities WHERE global_user_id = gu.id AND username LIKE ?)
      ORDER BY gu.id
    `);
    const param = `%${query}%`;
    return stmt.all(param, param) as GlobalUserRow[];
  }
}
