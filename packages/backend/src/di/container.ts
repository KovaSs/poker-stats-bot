import { container } from "tsyringe";

import {
  GameRepository,
  GlobalUserRepository,
  TransactionRepository,
  UserIdentityRepository,
  UserRepository,
} from "@/db/repositories";
import { GameService, ParserService, StatsService } from "@/services";
import { GameProcessor } from "@/core/gameProcessor";

container.registerSingleton(GameRepository);
container.registerSingleton(TransactionRepository);
container.registerSingleton(UserRepository);
container.registerSingleton(GlobalUserRepository);
container.registerSingleton(UserIdentityRepository);
container.registerSingleton(StatsService);
container.registerSingleton(GameService);
container.registerSingleton(ParserService);
container.registerSingleton(GameProcessor);

export { container };
