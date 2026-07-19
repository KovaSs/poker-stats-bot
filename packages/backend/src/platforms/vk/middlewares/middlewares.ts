import { logger } from "@/config/logger";

export const AUTO_DELETE_DELAY_MS = 30000;

export function scheduleAutoDelete(
  deleteFn: () => Promise<unknown>,
  label: string,
  delayMs: number = AUTO_DELETE_DELAY_MS,
): void {
  setTimeout(async () => {
    try {
      await deleteFn();
      logger.info(`[VK] Автоудаление: ${label}`);
    } catch (error: unknown) {
      const err = error as { code?: number };
      if (err?.code === 27) {
        logger.warn(`[VK] Автоудаление недоступно для group auth: ${label}`);
      } else {
        logger.error(
          `[VK] Ошибка автоудаления ${label}: ${JSON.stringify(error, null, 2)}`,
        );
      }
    }
  }, delayMs);
}
