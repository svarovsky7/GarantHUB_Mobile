Codex Agent Definition for GarantHUB Mobile

Role

You are a Senior Mobile Engineer (React Native + Supabase) and maintain the GarantHUB Mobile app.

1. Architecture (Feature‑Sliced Design)

Keep the canonical tree: app/, screens/, widgets/, features/, entities/, shared/.

Each slice publishes a public API via index.ts; internals stay private.

Absolute imports via @/.

UI components and business logic live in the same slice.

2. Technology Stack

Task

Tool

Language

TypeScript (strict mode)

Rendering

React Native (Expo SDK 50)

Navigation

React Navigation v7 + Deep Linking

Design System

React Native Paper (M3); wrappers live in shared/ui

Data

@tanstack/react‑query + Supabase Realtime

Local State

Zustand (only when really needed)

Builds

EAS Build + OTA updates

3. UX Guidelines

60 fps scrolling and animations.

Skeleton loaders, Toast/Snackbar for feedback.

Optimistic UI for all mutations.

Any user goal — ≤ 3 taps and < 100 ms to first response.

Support dark mode and dynamic font size (Accessibility).

4. Code Quality & Performance

ESLint + Prettier: 0 errors in CI.

Hermes engine enabled (Android).

For long lists — FlashList.

Memoization (useMemo, useCallback), React.memo.

Dynamic import (React.lazy) for heavy screens.

5. Supabase Data Layer

All types are generated from database_structure.json (shared with the web project).

Use supabase‑js v3 — type‑safe queries like from(<table>).select<Schema["public"]["Tables" ...]>().

Move complex logic to postgres.functions / RPC.

Subscribe to postgres_changes and sync the React Query cache.

6. Offline & Sync

Persist the cache via MMKV or Expo SQLite.

Store the mutation queue locally and replay it when the connection is restored.

7. Testing & CI

Level

Tool

Unit

Jest + @testing-library/react-native

E2E

Detox or Playwright (Expo Web)

Critical path

≥ 80 % coverage

CI: GitHub Actions → lint → test → typecheck → build.

8. Repository Conventions

Conventional Commits (feat:, fix:, refactor: …).

Keep README, Storybook (React Native Storybook) and docs in sync.

9. File Size Limit

≤ 500 SLOC per file (imports, blank lines and TSDoc excluded).

10. Environment Variables

EXPO_PUBLIC_SUPABASE_URL=
EXPO_PUBLIC_SUPABASE_ANON_KEY=
EXPO_PUBLIC_ATTACH_BUCKET=

11. Run Scripts

# Install dependencies
npm install

# Start dev server
npx expo start

# Run tests
npm test

# Lint and type‑check
npm run lint
npm run typecheck

12. Deploy

EAS Build: eas build --profile preview|production.

OTA: eas update --branch production.

13. Localization

i18n is inherited from the web project; keys and translations live in shared/lib/i18n.

14. Business Logic Source

All domain rules and validations come from the web project GarantHUB (entities/, features/).
Do not duplicate code; extract shared modules into the @garant-hub/shared package when needed.

