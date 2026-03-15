# CLAUDE.md

## Project Overview

**朝会ジェネレーター (Morning Meeting Generator)** — an Electron desktop app for facilitating structured morning stand-up meetings with timed agendas, icebreaker topics, and member shuffle for presentation order.

## Tech Stack

- **Runtime:** Electron 33 (desktop) + React 18 (UI)
- **Language:** TypeScript 5.6 (strict mode)
- **Build:** Vite 6 with vite-plugin-electron
- **Styling:** Plain CSS with CSS variables (single `src/index.css`)
- **State:** React hooks only (useState, useCallback, useEffect) — no external state library
- **Database:** None — fully client-side, no API calls

## Commands

```bash
npm run dev            # Start Vite dev server (browser mode)
npm run electron:dev   # Build + launch Electron app
npm run build          # Full build: tsc → vite build → electron-builder
npm run preview        # Preview production Vite build
```

There are no test, lint, or format commands configured.

## Project Structure

```
├── electron/
│   ├── main.ts          # Electron main process, window config (480×720)
│   └── preload.ts       # IPC bridge, exposes electronAPI.platform
├── src/
│   ├── main.tsx         # React entry point
│   ├── App.tsx          # Root component, tab navigation
│   ├── index.css        # All styles, dark theme, CSS variables
│   ├── vite-env.d.ts    # Type declarations for Electron API
│   ├── components/
│   │   ├── AgendaRunner.tsx   # Timed agenda with progress tracking
│   │   ├── IceBreaker.tsx     # Random topic generator
│   │   ├── MemberShuffle.tsx  # Fisher-Yates name shuffler
│   │   └── Timer.tsx          # Countdown timer with progress bar
│   └── data/
│       └── topics.ts    # Icebreaker topics and agenda templates
├── index.html           # Entry HTML
├── vite.config.ts       # Vite + Electron plugin config
└── tsconfig.json        # Strict TS, ES2020 target
```

## Architecture

Single-page app with three tabs:
1. **アジェンダ (Agenda)** — `AgendaRunner.tsx`: runs through predefined agenda items with per-item timers
2. **アイスブレイク (Icebreaker)** — `IceBreaker.tsx`: randomly selects conversation topics with shuffle animation
3. **シャッフル (Shuffle)** — `MemberShuffle.tsx`: randomizes member presentation order from comma/newline-separated input

`Timer.tsx` is a shared component used by AgendaRunner for countdown functionality (warning at 30s, expired state).

## Code Conventions

- **Language:** All UI text is Japanese
- **TypeScript:** Strict mode with `noUnusedLocals` and `noUnusedParameters` enforced
- **Components:** Functional components with hooks, no class components
- **Styling:** CSS classes in the single `index.css` file — no CSS modules or CSS-in-JS
- **Naming:** React components use PascalCase filenames; data files use camelCase
- **Imports:** Relative paths from `src/`

## Build & Distribution

Electron Builder configured for cross-platform:
- macOS: DMG
- Windows: NSIS installer
- Linux: AppImage

App ID: `com.asakai.app`

## Development Notes

- Electron window: 480×720px, min 400×600px, context isolation enabled, node integration disabled
- The preload script exposes only `electronAPI.platform` to the renderer
- No environment variables or `.env` files needed
- No CI/CD pipelines configured
