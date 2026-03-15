# Test Coverage Analysis - 朝会ジェネレーター (Asakai App)

## Current State

**Test coverage: 0%** — No testing framework is installed and no test files exist.

- No test runner (Jest, Vitest, etc.)
- No testing libraries (@testing-library/react, etc.)
- No test scripts in `package.json`
- No coverage reporting configured

## Recommended Testing Setup

Since this is a Vite + React + TypeScript project, **Vitest** is the natural choice:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Add to `package.json` scripts:
```json
"test": "vitest",
"test:coverage": "vitest --coverage"
```

Add to `vite.config.ts`:
```ts
test: {
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
}
```

---

## Priority Areas for Test Coverage

### Priority 1 (High) — Complex Business Logic

#### 1. `Timer.tsx` — Countdown Timer
| What to test | Why |
|---|---|
| `formatTime()` — converts seconds to `m:ss` format | Pure logic, easy to unit test, edge cases at 0, 60, 3600 |
| Countdown decrement — seconds decrease by 1 each tick | Core functionality |
| `onComplete` callback fires when timer reaches 0 | Critical for AgendaRunner integration |
| `isActive` prop controls start/stop | Prevents runaway timers |
| Warning state activates at ≤30 seconds | UX correctness |
| Progress bar calculation `(total - remaining) / total * 100` | Edge case when `totalSeconds` is 0 |
| Interval cleanup on unmount | Memory leak prevention |
| Timer resets when `minutes` prop changes | Ensures correct behavior when switching agenda items |

#### 2. `AgendaRunner.tsx` — Meeting Flow State Machine
| What to test | Why |
|---|---|
| Initial state: all items uncompleted, `currentIndex` null | Correct initialization |
| `startMeeting()` resets items and sets index to 0 | Meeting restart behavior |
| `handleTimerComplete()` marks current item done, advances index | Core meeting flow |
| Last item completion sets `isRunning` to false | Meeting end detection |
| `skipItem()` delegates to `handleTimerComplete()` | Skip functionality |
| `resetMeeting()` clears all state | Reset behavior |
| `allDone` derived state shows completion message | End-of-meeting UX |
| `totalMinutes` calculation sums all durations | Display correctness |

#### 3. `MemberShuffle.tsx` — Input Parsing & Shuffle
| What to test | Why |
|---|---|
| Parsing comma-separated input: `"A, B, C"` → `["A", "B", "C"]` | Core input handling |
| Parsing Japanese comma `、` as delimiter | Internationalization correctness |
| Parsing newline-separated input | Alternative input format |
| Mixed delimiters work correctly | Real-world usage |
| Empty/whitespace-only entries are filtered out | Input sanitization |
| Empty input disables the button | UX guard |
| Shuffle produces a permutation (same elements, possibly different order) | Algorithm correctness |
| Shuffle animation runs 8 iterations then stops | Animation lifecycle |
| "メンバー変更" button clears members and shuffled state | Reset behavior |

### Priority 2 (Medium) — UI Components

#### 4. `IceBreaker.tsx` — Random Topic Generator
| What to test | Why |
|---|---|
| Initial state shows placeholder text | Default UX |
| `generateTopic()` sets a topic from the `icebreakers` array | Correct data source |
| Animation runs 10 iterations then stops | Animation lifecycle |
| Button is disabled during animation | Prevents double-clicks |

#### 5. `App.tsx` — Tab Navigation
| What to test | Why |
|---|---|
| Default tab is "agenda" | Correct initial view |
| Clicking each tab renders the corresponding component | Navigation works |
| Active tab gets `tab-active` class | Visual feedback |
| Date display shows correct format `YYYY/M/D（曜日）` | Localization |

### Priority 3 (Low) — Data & Configuration

#### 6. `data/topics.ts` — Static Data Validation
| What to test | Why |
|---|---|
| `icebreakers` array is non-empty | Prevents runtime errors |
| `agendaTemplates` all have required fields (label, duration, icon) | Data integrity |
| `agendaTemplates` durations are positive numbers | Prevents timer issues |
| `checkInQuestions` array is non-empty | Data availability |

---

## Extractable Pure Logic (Best ROI for Unit Tests)

Several pieces of logic can be extracted into pure functions for easy, fast unit testing without React rendering:

1. **`formatTime(seconds: number): string`** — from `Timer.tsx:34-38`
2. **`parseMemberInput(input: string): string[]`** — from `MemberShuffle.tsx:10-13`
3. **`fisherYatesShuffle<T>(arr: T[]): T[]`** — from `MemberShuffle.tsx:25-29`
4. **`calculateProgress(total: number, remaining: number): number`** — from `Timer.tsx:40`
5. **`formatDate(date: Date): string`** — from `App.tsx:11-14`

Extracting these into a `src/utils/` module would:
- Make them trivially testable (no DOM, no React)
- Improve reusability across components
- Provide the highest test coverage ROI with minimal effort

---

## Suggested Test File Structure

```
src/
├── utils/
│   ├── formatTime.ts
│   ├── parseMemberInput.ts
│   ├── shuffle.ts
│   └── formatDate.ts
├── test/
│   └── setup.ts                    # jsdom + @testing-library/jest-dom
├── components/
│   ├── __tests__/
│   │   ├── Timer.test.tsx
│   │   ├── AgendaRunner.test.tsx
│   │   ├── MemberShuffle.test.tsx
│   │   ├── IceBreaker.test.tsx
│   │   └── App.test.tsx
├── utils/__tests__/
│   ├── formatTime.test.ts
│   ├── parseMemberInput.test.ts
│   ├── shuffle.test.ts
│   └── formatDate.test.ts
└── data/__tests__/
    └── topics.test.ts
```

---

## Summary

| Priority | Area | Files | Effort | Impact |
|---|---|---|---|---|
| **P1** | Extract & test pure utils | Timer, MemberShuffle, App | Low | High |
| **P1** | Timer component tests | Timer.tsx | Medium | High |
| **P1** | AgendaRunner state machine | AgendaRunner.tsx | Medium | High |
| **P1** | MemberShuffle input/shuffle | MemberShuffle.tsx | Medium | High |
| **P2** | IceBreaker component | IceBreaker.tsx | Low | Medium |
| **P2** | App navigation tests | App.tsx | Low | Medium |
| **P3** | Data validation tests | topics.ts | Low | Low |

**Recommended first step:** Install Vitest + testing-library, extract pure utility functions, and write unit tests for them. This gives the highest coverage increase with the least effort.
