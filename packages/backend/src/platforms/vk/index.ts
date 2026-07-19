export { initVKPlatform, getVK } from "./bot";
export { handleVKMessage } from "./handlers/message";
export { duplicateToCommunityChat } from "./handlers/duplicate";
export { scheduleAutoDelete } from "./middlewares";
export { buildMenuKeyboard, buildStatsFilterKeyboard, buildTopFilterKeyboard, buttonCommands } from "./handlers/menu";
export { vkContextToIMessage } from "./adapters";
