# Changelog — `backend` (poker-stats-monorepo)

<a name="040-2026-07-19"></a>
## [0.4.0] — 2026-07-19

### Added
- Dependency Injection via `tsyringe`: repositories and services converted to `@injectable()` classes
- DI container in `di/container.ts` with all singletons registered
- Backend architecture documentation in `docs/README.md`
- `experimentalDecorators` in tsconfig, `reflect-metadata` setup in vitest

### Changed
- All `console.*` calls replaced with `pino` logger across the codebase
- `core/` restructured into subfolders: `gameProcessor/`, `statsPresenter/` with `index.ts` barrel exports
- `GameProcessor`, services, and repositories now use constructor injection instead of static imports
- `core/index.ts` re-exports `processGameMessage` via `container.resolve(GameProcessor)`
- Platform handlers and API routes resolve services lazily from container

### Removed
- Redundant `core/commandProcessor.ts` (re-exported `processCommand` already in `core/index.ts`)

<a name="030-2026-07-19"></a>
## [0.3.0] — 2026-07-19

### Added
- VK bot support via vk-io Long Poll API
- Multiplatform architecture: `core/`, `platforms/telegram/`, `platforms/vk/`
- `IMessage` interface and `processGameMessage` in core for platform-agnostic game processing
- VK commands: `!stats`, `!top`, `!help`, `статистика`, `топ`, `помощь`
- VK keyboard with menu buttons and inline filter keyboards for stats/top
- VK mention support (`@poker_club` and `[club...|@poker_club]` format)
- Wall post processing (`wall_post_new`) and wall reply processing
- Auto-deletion of bot responses after 30s (VK)
- Deletion of user command messages after processing (VK)
- Community chat duplication: games from private messages are posted to a configured chat
- Global statistics (across all chats) for VK commands
- Database migration system with sequential migrations
- `platform` column in `games` table for multi-platform support
- `community_message_id` column for tracking duplicated messages
- Unit tests: 151 tests, 73% code coverage
- Test files restructured alongside source files
- `CHANGELOG.md`

### Changed
- Refactored Telegram handlers to use `core/` layer
- Moved Telegram platform to `platforms/telegram/`
- `StatsService.getFilteredStats`/`getFilteredScores` accept optional `chatId` for global queries
- `TransactionRepository` methods accept optional `chatId`
- All `any` types replaced with proper interfaces or `unknown`
- File structure: each component in its own directory with `index.ts` + source + test

### Removed
- Wall post creation/editing from VK adapter (community chat duplication via messages instead)

### Fixed
- VK Long Poll group detection (`pollingGroupId` parsed from `club...` prefix)
- VK mention detection (handles both `@poker_club` and `[club...|@poker_club]`)
- ESLint-perfectionist sort ordering across all files
