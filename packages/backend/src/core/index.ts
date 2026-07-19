import { container } from "@/di/container";

import { GameProcessor } from "./gameProcessor";

import type { IMessage, ProcessedGameResult } from "./types";

export type { IMessage, ProcessedGameResult } from "./types";
export {
  formatStatsTable,
  formatTopList,
  formatHelp,
  processCommand,
} from "./statsPresenter";
export { GameProcessor } from "./gameProcessor";

export async function processGameMessage(
  message: IMessage,
): Promise<ProcessedGameResult> {
  return container.resolve(GameProcessor).processGameMessage(message);
}
