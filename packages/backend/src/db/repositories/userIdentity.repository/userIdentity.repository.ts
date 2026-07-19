import { injectable } from "tsyringe";

import { getDB } from "@/db/connection";

export interface UserIdentityRow {
  platform_user_id: string | null;
  global_user_id: number;
  platform: string;
  username: string;
  chat_id: number;
  id: number;
}

@injectable()
export class UserIdentityRepository {
  create(
    globalUserId: number,
    platform: string,
    chatId: number,
    username: string,
    platformUserId?: string | number | null,
  ): number {
    const stmt = getDB().prepare(`
      INSERT OR IGNORE INTO user_identities (global_user_id, platform, chat_id, username, platform_user_id)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      globalUserId,
      platform,
      chatId,
      username,
      platformUserId != null ? String(platformUserId) : null,
    );
    return Number(info.lastInsertRowid);
  }

  findByPlatformAndChat(
    platform: string,
    chatId: number,
    username: string,
  ): UserIdentityRow | null {
    const stmt = getDB().prepare(`
      SELECT * FROM user_identities WHERE platform = ? AND chat_id = ? AND username = ?
    `);
    const row = stmt.get(platform, chatId, username) as UserIdentityRow | undefined;
    return row || null;
  }

  findByGlobalUserId(globalUserId: number): UserIdentityRow[] {
    const stmt = getDB().prepare(`SELECT * FROM user_identities WHERE global_user_id = ?`);
    return stmt.all(globalUserId) as UserIdentityRow[];
  }

  findByPlatformUserId(platform: string, platformUserId: string): UserIdentityRow[] {
    const stmt = getDB().prepare(`
      SELECT * FROM user_identities WHERE platform = ? AND platform_user_id = ?
    `);
    return stmt.all(platform, platformUserId) as UserIdentityRow[];
  }

  findAllByChatId(chatId: number): UserIdentityRow[] {
    const stmt = getDB().prepare(`SELECT * FROM user_identities WHERE chat_id = ?`);
    return stmt.all(chatId) as UserIdentityRow[];
  }

  findAllByGlobalUserId(globalUserId: number): UserIdentityRow[] {
    const stmt = getDB().prepare(`SELECT * FROM user_identities WHERE global_user_id = ?`);
    return stmt.all(globalUserId) as UserIdentityRow[];
  }

  getDistinctChatIds(globalUserId: number): number[] {
    const stmt = getDB().prepare(`
      SELECT DISTINCT chat_id FROM user_identities WHERE global_user_id = ?
    `);
    const rows = stmt.all(globalUserId) as { chat_id: number }[];
    return rows.map((r) => r.chat_id);
  }

  delete(id: number): void {
    getDB().prepare(`DELETE FROM user_identities WHERE id = ?`).run(id);
  }

  transferToUser(sourceGlobalUserId: number, targetGlobalUserId: number): number {
    const stmt = getDB().prepare(`
      UPDATE user_identities SET global_user_id = ?
      WHERE global_user_id = ?
    `);
    const info = stmt.run(targetGlobalUserId, sourceGlobalUserId);
    return info.changes;
  }
}
