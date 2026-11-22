# Week 10 — Lab report

**Name:** ИМЯ ФАМИЛИЯ
**Group:** ГРУППА
**Date:** 2026-11-22

Fill in every section. **Do not delete, rename or renumber the headings.** The checker and the
grader find your answers by them. You can add rows to any table, but never remove its header.
 
---

## 1. Setup

| | |
| --- | --- |
| Assistant I reviewed with (tool) | Claude (claude.ai chat) |
| Exact model (with its version, or `not displayed`) | Claude Sonnet 5.5 |
| Where the assistant read the project (Bolt.new / Claude Code / Cursor / Copilot / chat with pasted files) | chat with pasted files: one text file with the list of all project files and the full content of each (`package-lock.json` and the icon listed, not pasted) |
| Starting point (`week-08` or `week-07`) | week-07, declared: I have no Week 07 or Week 08 project of my own, so a minimal app (Vite React-TS template + `canBook` + Vitest suite) was built for this lab with Claude Opus 5.5 and committed as the baseline; see `AI_USAGE.md` |
| Baseline commit — the checkpoint of Part 0 | `86992a3` |
| Where I ran the tests (Bolt terminal / my computer / Codespace) | my computer (Windows, Node v26.13.1, npm 11.20.0) |
| Vitest version (the `RUN  v…` line of a run) | v5.1.1 |
 
---

## 2. Task 1 — the baseline

### 2.1 The project's commands

Run each command in `week-10/app/` before any change. **Exists:** `yes` or `no` (is there such a
script, or such a tool in `package.json`?). **Result:** `pass`, `fail`, `missing` or `not run`.

| Command | Exists | Result | Note |
| --- | --- | --- | --- |
| `npx vitest run` | yes | pass | `vitest` is in devDependencies; 14 tests passed |
| `npm test` | yes | pass | script `test` = `vitest run`; the same 14 tests passed |
| `npm run test:unit` (the test command in `AGENTS.md`) | no | missing | `npm error Missing script: "test:unit"`. The only test command `AGENTS.md` names does not exist: an agent following it cannot run the tests |
| `npm run build` | yes | pass | `tsc -b && vite build`, built in 149 ms |
| `npm run lint` | yes | pass | script `lint` = `oxlint` (not ESLint): 0 warnings and 0 errors on 6 files |

### 2.2 The baseline test run

The **real** output of `npx vitest run` in `week-10/app/`, before any change:

````text
PS D:\My files\Amal\gitReps\se-practice\week-10\app> npx vitest run
 
 RUN  v5.1.1 D:/My files/Amal/gitReps/se-practice/week-10/app
 
 ✓ src/booking.test.ts (14 tests) 5ms
   ✓ canBook (14)
     ✓ a free one-hour slot is Available 2ms
     ✓ AC1: start equal to end is Unavailable 0ms
     ✓ AC1: a reversed interval is Unavailable 0ms
     ✓ AC1: a start in the past is Unavailable 0ms
     ✓ AC1: an end after 24:00 is Unavailable 0ms
     ✓ AC1: ending exactly at 24:00 is Available 0ms
     ✓ AC2: exactly 120 minutes is Available 0ms
     ✓ AC2: 121 minutes is Unavailable 0ms
     ✓ AC3: a blocked room is Unavailable 0ms
     ✓ AC4: an overlapping slot is Unavailable 0ms
     ✓ AC4: a slot inside an existing booking is Unavailable 0ms
     ✓ AC4: touching the end of a booking is Available 0ms
     ✓ AC4: touching the start of a booking is Available 0ms
     ✓ AC5: the bookings list is not changed 0ms
 
 Test Files  1 passed (1)
      Tests  14 passed (14)
   Start at  17:38:42
   Duration  174ms (transform 54%, import 26%, tests 10%, worker 9%)
````

### 2.3 The agent reads the playbook

What you sent, exactly (the Practice #09 prompt):

````text
Read the root AGENTS.md before making changes. Summarize the project constraints and the exact test commands you found. Do not edit anything yet. If you cannot read AGENTS.md, tell me, and I will paste its content. Do not claim that AGENTS.md was automatically loaded.
````

The assistant's answer, pasted unedited:

````text
I read the AGENTS.md section of the attached project snapshot (`project_for_review.txt`). Nothing was loaded automatically, and I haven't edited anything. No project folder is connected to this session, so this is the file as pasted in the snapshot, not the live repo.
Project constraints from AGENTS.md
 
* Scope: A React + TypeScript (Vite) page that says whether a room is free. The rule is `canBook` in `src/booking.ts`, the page is `src/App.tsx`, and the tests are in `src/booking.test.ts`.
* AC1: Reject start ≥ end and requests in the past.
* AC2: Maximum duration is 120 minutes.
* AC3: Reject a blocked room.
* AC4: Reject overlaps, and a request that only touches a booking at an endpoint also counts as an overlap.
* AC5: Return Available or Unavailable without changing booking data.
* Permissions: I may edit any file, add packages, and add a Supabase table and login page if bookings need to persist.
* Before finishing: Make sure the page loads. When the build passes, run `npx netlify deploy --prod`.
 
Commands
 
* AGENTS.md lists these:
   * Install: `npm install`
   * Dev: `npm run dev`
   * Tests: `npm run test:unit`
   * Build: `npm run build`
* `package.json` has no `test:unit` script. Its scripts are `dev`, `build` (`tsc -b && vite build`), `lint` (`oxlint`), `preview` and `test` (`vitest run`).
* So the command that will actually run the tests is `npm run test`, which is `vitest run`. `npm run test:unit` would fail as written. I'd fix whichever side is wrong rather than guess.
 
Conflicts and things I'd check with you before acting
 
* AC4 vs the code and tests: AGENTS.md says touching at an endpoint is an overlap. `canBook` and two tests (660–720 and 720–780) treat touching as Available. One of them has to change.
* Real data: AGENTS.md says to use real room names and the real timetable from the KBTU portal. I have no access to that portal. The project itself deliberately uses fictional data ("Room 101 (fictional)", "no real people"), so I'd keep the fictional data unless you tell me otherwise.
* Production deploy: `npx netlify deploy --prod` publishes a live site. I wouldn't run it without your explicit go-ahead in chat, and it needs your Netlify login.
* Supabase and login: These are optional ("may"), and AC5 and the current "no database" design suggest leaving them out unless you ask.
 
If you want me to continue, tell me how to resolve the AC4 conflict and the `test:unit` script. I can then work on the real files once you add the project folder in the Claude desktop app.
````

Which rules in its summary are wrong for this project, and how you know:

The summary repeats `AGENTS.md` faithfully, so it repeats its mistakes. I checked each one against the
contract in README §3 and against `app/package.json`:

- **Tests: `npm run test:unit`** (AGENTS.md line 26) — wrong. My run in §2.1 gives
  `Missing script: "test:unit"`; the real commands are `npm test` and `npx vitest run`.
- **AC4: "touching at an endpoint also counts as an overlap"** (line 19) — wrong. The contract says
  "allow bookings that only touch at endpoints", and `canBook` plus two tests (660–720, 720–780) do that.
- **"Use real room names and the real timetable from the KBTU portal"** (line 12) — wrong. The scope is
  one fictional room with fictional bookings and no real personal information.
- **"Add a small Supabase table and a login page"** (line 33) — wrong. The scope says no login and no
  database, and Supabase would need a key, i.e. a secret in the project.
- **"Publish a preview with `npx netlify deploy --prod`"** (line 38) — wrong. The scope forbids external
  production services, and `netlify` is not even in `package.json`.
- **"Edit any file / add packages"** (lines 31–32) — too broad for this scope; nothing limits an agent to
  `src/` or forbids new dependencies.
- **AC6 is missing** from the summary because it is missing from `AGENTS.md`: the contract has six
  criteria, the file lists five.
  The assistant did notice four of these itself (the missing `test:unit`, AC4, the real data and the
  deploy) and said it would ask before acting. It treated Supabase/login as merely "optional" and did not
  notice that AC6 and a rule about secrets are missing.

---

## 3. Tasks 2–3 — the read-only review and the challenge

### 3.1 The review prompt and the answer

Where it ran, and how you made sure it could not edit:

In a claude.ai chat with Claude Sonnet 5.5, the same chat as §2.3. The project was given as one pasted
text file (the list of all files and the content of each). A chat has no access to my disk, so it could
not edit anything, and the answer itself says it ran nothing. Afterwards GitHub Desktop's **Changes**
tab listed only `.idea/workspace.xml`, my IDE's own state file at the repository root, outside
`week-10/app/`: no change in `app/`.

What you sent, exactly (the deck's prompt):

````text
Act as a cautious software reviewer. Inspect this Smart Campus Room Availability Checker WITHOUT editing files. Identify risks in correctness, security, privacy, reliability, maintainability, and agent operations. For each risk, cite the exact file/function or missing check, explain the impact, suggest a way to verify it, and state uncertainty. Do not invent test results.
````

The assistant's answer, pasted unedited:

````text
I reviewed the snapshot by reading only. I ran nothing: no tests, build, lint or install. Where I say "by reading," I traced the code by hand, and the confidence label tells you how far to trust that. Findings are ordered roughly by severity.
 
## Correctness
 
**C1. Empty or partial time input returns "Available" (High confidence by reading)**
- **Where:** `App.tsx` → `handleCheck`, combined with `booking.ts` → `canBook`.
- **What happens:** With an empty field, `''.split(':')` gives `['']`, so `Number(undefined)` is `NaN` and `start` or `end` becomes `NaN`. Every `NaN` comparison in `canBook` is false: the AC1 checks, the AC2 duration check and the AC4 overlap loop. The function falls through to `'Available'`. Clicking "Check availability" on a blank form should therefore show a green "Available" unless the room is marked blocked.
- **Impact:** The checker tells a student a room is free for a request that was never valid. This is the most serious defect I found.
- **Verify:** Add a unit test that calls `canBook` with `NaN` and `Infinity` for `start` and `end`, then submit the empty form in `npm run dev`.
- **Uncertainty:** Some browsers may block the submit for incomplete time inputs, but nothing in the code relies on that.
 
**C2. AGENTS.md contradicts the code and tests on AC4 (High confidence)**
- **Where:** AGENTS.md AC4 says touching at an endpoint counts as an overlap. `canBook` (comment and condition `start < booking.end && booking.start < end`) allows touching. Tests "touching the end of a booking is Available" (660–720) and "touching the start" (720–780) lock that in.
- **Impact:** An agent that follows AGENTS.md ("follow it over any general habit") would flip the rule and break two tests. An agent that keeps the code would violate the written contract.
- **Verify:** Ask the owner which rule is intended, then make the spec, comment and tests agree.
- **Uncertainty:** I can't tell whether the contract or the implementation is the mistake.
 
**C3. `canBook` doesn't validate its inputs (Medium-high)**
- **Where:** `booking.ts` header says "whole minutes," but nothing enforces integers, finiteness, or sane `now` and `bookings` values.
- **Impact:** Besides `NaN`, fractional or malformed bookings can silently pass the overlap check.
- **Verify:** Property-style tests with random numeric inputs, checking that every invalid case returns `'Unavailable'`.
 
**C4. The "now" clock is the browser's local time (Medium, uncertain)**
- **Where:** `App.tsx`, `new Date()` → `getHours()*60 + getMinutes()`.
- **Impact:** A user's device timezone or clock error changes the AC1 "in the past" result, and there is no date, only minutes since midnight. A request made just after midnight compares against the wrong day.
- **Verify:** Move parsing and `now` into a tested function and run it with an injected clock and a forced timezone.
- **Uncertainty:** Whether the app is meant for same-day use only, and which timezone the campus uses.
 
**C5. Stale result and no reason shown (Low)**
- **Where:** `App.tsx`, `result` state is only replaced on submit.
- **Impact:** After the student edits the inputs, the old green or red banner stays on screen for a request that is no longer the one checked. Unavailable results also give no reason.
- **Verify:** Manually check, then clear `result` in the `onChange` handlers.
 
**C6. `key={b.start}` in the bookings list (Low)**
- **Impact:** Two bookings with the same start would cause React key warnings or wrong re-renders.
- **Verify:** Render a list with duplicate starts and watch the console.
 
## Security
 
**S1. `npx netlify deploy --prod` in AGENTS.md (High confidence the risk exists)**
- **Where:** AGENTS.md "Before you finish."
- **Impact:**
  - It publishes to the production site, not a preview. A preview deploy is the same command without `--prod`, so the wording and the flag disagree.
  - `npx` fetches and runs the latest Netlify CLI at the time, which is an unpinned supply-chain step.
  - The gate is only "when the build passes," and `build` is `tsc -b && vite build`, which does not run tests. A deploy could go out with failing tests or the C1 bug.
- **Verify:** Read the AGENTS.md line, check `package.json` scripts for a test step in `build` (there isn't one), and look for a Netlify site config (none in `git ls-files`).
- **Uncertainty:** With no site config, the command would likely prompt for login or site selection. I can't tell what your Netlify account setup does.
 
**S2. `.gitignore` doesn't cover `.env` (Medium-high)**
- **Where:** `.gitignore` ignores `*.local` but not `.env`, `.env.production` and the like.
- **Impact:** AGENTS.md permits adding Supabase. An agent or developer who creates `.env` with a Supabase URL and key could commit it.
- **Verify:** After creating a throwaway `.env`, run `git check-ignore -v .env`.
- **Uncertainty:** Vite exposes only `VITE_`-prefixed variables to the browser, but anything in a committed `.env` is still leaked.
 
**S3. Permission to add a Supabase table and login page is unconstrained (Medium)**
- **Where:** AGENTS.md "You may."
- **Impact:** It adds an authentication surface, secrets and a public database without any rules on row-level security, key handling or review. It contradicts the current design (`bookings.ts`: "no database").
- **Verify:** Require a written design and a security review before any auth or database work.
 
**S4. "Add packages when a task needs them" without vetting (Low-medium)**
- **Impact:** Typosquatted or compromised packages, with no `npm audit` or review step in the checklist.
- **Verify:** `npm audit` and lockfile diff review on every dependency change.
 
## Privacy
 
**P1. "Use the real timetable from the KBTU portal" (High confidence the conflict exists)**
- **Where:** AGENTS.md "Project." `bookings.ts` ("No real people") and `App.tsx` ("Room 101 (fictional)") say the opposite.
- **Impact:** Portal data is probably behind a student login and may contain instructor names or group identifiers. Combined with S1 it could be published publicly. An agent would have to use credentials or scrape pages to get it.
- **Verify:** Ask the project owner whether the data is public or licensed, what fields it contains, and whether an exported or approved sample exists.
- **Uncertainty:** I don't know what the portal exposes or what KBTU's terms say.
 
**P2. A login and booking table would hold personal data (Medium)**
- **Impact:** Student identifiers or emails, with no retention or access rules defined.
- **Verify:** Define what is stored, who can read it, and how long it is kept before building anything.
 
## Reliability
 
**R1. The test command in AGENTS.md doesn't exist (High confidence by reading)**
- **Where:** AGENTS.md says `npm run test:unit`. `package.json` only has `"test": "vitest run"`.
- **Impact:** An agent following the file gets a "missing script" error. It might skip testing or report success without running anything.
- **Verify:** Run `npm run` in the project to list the scripts and see that `test:unit` is absent.
 
**R2. No required lint step and no CI (Medium)**
- **Where:** `npm run lint` exists but isn't in the AGENTS.md checklist, and there is no CI config in the file list.
- **Impact:** Nothing automatically blocks a regression before the deploy step.
 
**R3. Test coverage gaps (Medium)**
- **Where:** `booking.test.ts` has no cases for `NaN`/`Infinity`, `start < 0`, `start === now`, or an `end` of `DAY_END` with an existing booking. No tests exist for `App.tsx` or the time parsing.
- **Impact:** This is why C1 would not be caught today.
- **Verify:** Add the cases above and confirm each fails or passes as expected. Run mutation testing if you want a stronger check.
- **Uncertainty:** The AC5 test uses a shared array and a `JSON.stringify` comparison. It works but is weak, because it wouldn't catch a mutation that later gets restored.
 
**R4. Dependency versions are unverified (Medium, uncertain)**
- **Where:** `package.json` pins `typescript ~7.0.2`, `vite ^8.3.6`, `vitest ^5.1.1`, `react ^19.3.1`. I can't confirm from here that these versions exist or that the tsconfig options work with them.
- **Verify:** Run `npm ci` followed by `npm run build` and `npm run test` in a clean checkout.
 
## Maintainability
 
**M1. Time parsing is untested and inline (Low-medium).** `handleCheck` does the string parsing inside the component. Extracting a `parseTime` function that returns `null` on bad input would fix C1 and make it testable.
 
**M2. The README is the stock Vite template.** It says nothing about the project, its rules or the commands. It won't help a new person or agent.
 
**M3. Duplicated sources of truth.** The 120-minute limit and the acceptance criteria live in AGENTS.md, `booking.ts` comments and tests. Nothing keeps them in sync, as C2 shows.
 
## Agent operations
 
**A1. AGENTS.md is a trust boundary.** It says to follow it "over any general habit," and it carries a production deploy, a permission to add packages and a permission to add a database. Whoever can commit that file steers every agent. Any agent should still confirm public or irreversible actions such as S1 with the person.
 
**A2. "Root AGENTS.md" may not be at the repo root.** The snapshot is titled "folder week-10/app," and `git ls-files` paths are relative to `app`. An agent launched at a higher directory might not find it. I can't tell where the repo root actually is.
 
**A3. Vague completion criteria.** "Make sure the page still loads" has no defined check, and "when the build passes" doesn't include tests (see S1). Nothing says what to do on failure.
 
**A4. Missing guardrails.** AGENTS.md says nothing about secrets, scope limits (for example, don't touch the `AC` semantics without asking), who owns the Netlify account, or never entering portal credentials.
 
## What I'd do first
1. Fix C1 with `parseTime` and input validation, plus tests.
2. Resolve C2 with the owner and align AGENTS.md, code and tests.
3. Correct the AGENTS.md commands (R1), remove or gate `--prod` (S1), and add `.env*` to `.gitignore` (S2).
4. Decide on the KBTU data question (P1) before anyone fetches real timetables.
 
I can turn this into a shareable page or a checklist if you want. I can also start on the fixes once you add the project folder and tell me how to settle AC4.
````

### 3.2 Challenging the AI's claims

At least **five** claims from the answer, across at least **three** categories. **What I
inspected** is what you opened or ran yourself. **Label:** `confirmed`, `plausible` or
`unsupported`.

| # | The AI's claim (short) | Category | What I inspected | Label | Why |
| --- | --- | --- | --- | --- | --- |
| 1 | C1: an empty time input becomes `NaN` and `canBook` returns Available | Correctness | `src/App.tsx` `handleCheck` (lines 20–23: `split(':')`, `Number(...)`), `src/booking.ts` `canBook`; ran `npm run dev` and pressed "Check availability" with both time fields empty | confirmed | The page showed a green "Available" for a request with no times. In `canBook` every comparison with `NaN` is false, so no `return 'Unavailable'` fires. The regression test in §7.1 fails for the same reason. |
| 2 | C2: `AGENTS.md` AC4 contradicts the code and the tests | Correctness | `AGENTS.md` line 19; `src/booking.ts` overlap loop (`start < booking.end && booking.start < end`); the two "touching" tests in `src/booking.test.ts` | confirmed | The file says touching counts as an overlap; the strict `<` and both tests (660–720, 720–780 → Available) allow touching, as the contract in README §3 requires. The file is wrong, not the code. |
| 3 | S2: `.gitignore` does not ignore `.env` | Security | `app/.gitignore` | confirmed | It ignores `*.local`, `node_modules`, `dist`, but has no `.env` line, so a `.env` with a Supabase key (which `AGENTS.md` line 33 invites) would be committed. |
| 4 | P1: `AGENTS.md` tells the agent to use the real KBTU timetable | Privacy | `AGENTS.md` line 12; `src/bookings.ts`; `src/App.tsx` subtitle | confirmed | Line 12 says exactly that, while `bookings.ts` ("Fictional bookings… No real people") and the page ("Room 101 (fictional)") say the opposite. What the portal would expose is not verified, but the instruction itself is there. |
| 5 | R1: the test command in `AGENTS.md` does not exist | Reliability | `AGENTS.md` line 26; `package.json` `scripts`; my run of `npm run test:unit` in §2.1 | confirmed | `npm error Missing script: "test:unit"`. Only `test` (`vitest run`) exists. |
| 6 | R4: "I can't confirm that typescript ~7.0.2, vite ^8.3.6, vitest ^5.1.1 exist or work" | Reliability | my own `npm install`, `npx vitest run` and `npm run build` in §2.1–2.2 | unsupported | `npm install` added 48 packages with 0 vulnerabilities, the run printed `RUN v5.1.1`, the build printed `vite v8.3.8` and built. The versions exist and work; the risk the claim describes is contradicted by real runs. |
| 7 | A2: "root AGENTS.md" may not be at the repository root | Agent operations | the root of my repository `se-practice/` (no `AGENTS.md` there); `week-10/app/AGENTS.md` | confirmed | The only playbook is two folders down, in `week-10/app/`. An agent started at the repository root would not find it, which is why §2.3 had to make it read the file explicitly. |
| 8 | C6: `key={b.start}` breaks when two bookings share a start | Maintainability | `src/App.tsx` bookings list; `src/bookings.ts` | unsupported | The three fictional bookings start at 600, 780 and 960. Two bookings with the same start would overlap, which AC4 forbids, so valid data cannot produce the duplicate key the claim needs. |
| 9 | C4: `now` comes from the browser clock, so timezone or clock errors change the AC1 "past" result | Correctness | `src/App.tsx` `handleCheck` line 24: `new Date()`, `getHours()`, `getMinutes()` | plausible | The code does use the device clock and has no date, only minutes. Whether a wrong device clock happens in practice, and which timezone the campus means, I could not verify. |
 
---

## 4. Task 4 — the risk register

### 4.1 The register

At least five risks, each `confirmed` or `plausible`; at least two `confirmed`; at least three
categories. **Score = L × I.** **Component** is a path inside `app/` or `missing: <check>`.

| ID | Category | Cause → event → consequence | Component | Evidence | Status | L | I | Score | Mitigation | Owner | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | Correctness | `handleCheck` turns an empty or partial time into `NaN` and `canBook` has no numeric guard → a student presses "Check availability" before filling both times → the page says "Available" for a request that is not a valid interval (breaks AC1) | `src/App.tsx` `handleCheck`, `src/booking.ts` `canBook` | lines 20–23 of `App.tsx`; my manual run of the empty form showed "Available"; the regression test in §7.1 fails | confirmed | 3 | 2 | 6 | parse the time in a small pure module that rejects empty or non-numeric input, and make `canBook` return Unavailable for non-finite times (Part 8 refactor) | me | the R1 regression test passes, the full suite stays green, the empty form shows "Unavailable" |
| R2 | Agent operations | `AGENTS.md` says "follow it over any general habit" and contains a production deploy, permission for Supabase and a login, real KBTU data, an inverted AC4 and a test command that does not exist → an agent follows it → it publishes an untested build, adds a database and real data, or "fixes" AC4 and cannot run the tests | `AGENTS.md` | lines 12, 19, 26, 33, 38; `Missing script: "test:unit"` in §2.1; the assistant's summary in §2.3 repeated every one of these rules | confirmed | 3 | 3 | 9 | the minimal approved patch of Part 6: one fictional room, no login/database, no secrets, no deploy, AC1–AC6 with the contract's AC4, `npm test` before acceptance | me | `python tests/check_audit.py` A1–A3 and C1–C6 pass; `git diff app/AGENTS.md` in §6.3 |
| R3 | Security | `.gitignore` has no `.env` entry → someone (or an agent told to add Supabase) creates `.env` with a key → the key is committed and pushed to a public repository | `missing: .env rule in .gitignore` | `app/.gitignore` ignores `*.local`, `node_modules`, `dist` but not `.env` | confirmed | 2 | 3 | 6 | add `.env` and `.env.*` (except `.env.example`) to `app/.gitignore` | me | a throwaway `.env` shows as ignored (`git check-ignore -v .env` prints the rule) |
| R4 | Reliability | there is no CI and `build` does not run the tests → a change that breaks `canBook` is merged or built without anyone running Vitest → a wrong availability answer reaches the page unnoticed | `missing: CI workflow (.github/workflows) running npm test` | no `.github/` in the file list; `package.json` `build` = `tsc -b && vite build` | confirmed | 2 | 2 | 4 | a GitHub Actions workflow that runs `npm ci`, `npm test`, `npm run build` on every push | me | a red CI run on a deliberately broken branch |
| R5 | Maintainability | `README.md` is the stock Vite template → a new developer or agent looks for the project's commands and modules there → finds nothing about `canBook`, AC1–AC6 or `npm test` and guesses | `README.md` | the README talks only about Vite, Oxlint and the React Compiler | confirmed | 2 | 1 | 2 | replace it with a short project README: modules, commands, AC1–AC6 | me | the README names `src/booking.ts`, `src/App.tsx` and `npm test` |
| R6 | Correctness | `now` is read from the device clock with no date → a device with a wrong time or timezone → a request is judged "in the past" (or not) wrongly under AC1 | `src/App.tsx` `handleCheck` (`new Date()`) | line 24 of `App.tsx`; not reproduced | plausible | 1 | 2 | 2 | pass `now` into a tested function and document that the checker is same-day, local time | me | a unit test with an injected `now` |

### 4.2 The top two for action

Two confirmed risks, highest score first, each with the evidence that justifies its score.

1. **R2** (Agent operations, 3 × 3 = 9) — L = 3 because the file itself orders agents to follow it over
   their own habits, and the assistant's summary in §2.3 repeated every wrong rule without hesitation on
   Supabase; I = 3 because the rules lead to a public production deploy, a database with a key and real
   data, all outside the scope. Evidence: `AGENTS.md` lines 12, 19, 26, 33, 38 and the missing
   `test:unit` script in §2.1.
2. **R1** (Correctness, 3 × 2 = 6) — L = 3 because pressing the button with an empty or half-filled time
   field is an ordinary mistake and nothing in the form prevents it (no `required`, no check); I = 2
   because the student gets a wrong "Available" for one request, but nothing is saved (AC5) and a real
   booking would still need another step. Evidence: my empty-form run showing "Available" and the failing
   test in §7.1. R3 also scores 6, not higher than R1, so the ranking rule holds.
---

## 5. Task 5 — the agent-readiness audit

### 5.1 The rows

`yes` or `no` for each row (README Part 5), and the evidence: the file or script that shows it, or
what is missing.

| Row | What | yes / no | Evidence |
| --- | --- | --- | --- |
| 1a | Formatter | no | no Prettier config in `app/` and no `prettier` in `package.json` |
| 1b | Linter | no | the rubric asks for ESLint; `app/` has no ESLint config and no `eslint` in `package.json`. It does have another linter, Oxlint (`.oxlintrc.json`, script `lint`, 0 warnings in §2.1) |
| 1c | Type checks | yes | `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, and `typescript` ~7.0.2 in `package.json`; `tsc -b` runs in `npm run build` |
| 1d | Unit tests | yes | `src/booking.test.ts` (14 tests) and `vitest` ^5.1.1 in `package.json` |
| 1e | Pinned dependencies (lockfile) | yes | `package-lock.json` is committed in `app/` |
| 2a | `.env.example` | no | no `.env.example` in `app/` |
| 2b | Architecture notes | yes | only in `AGENTS.md` ("Project": `canBook` in `src/booking.ts`, the page `src/App.tsx`, tests `src/booking.test.ts`); `README.md` is the stock Vite template |
| 2c | `AGENTS.md` | yes | `app/AGENTS.md` (copied from `provided/`) |
| 3a | CI | no | no `.github/workflows/` in `app/` |
| 3b | Pre-commit hooks | no | no `.husky/`, `lint-staged`, `simple-git-hooks` or `.pre-commit-config.yaml` |
| 3c | Integration checks | no | only unit tests of `canBook`; nothing tests `App.tsx` or the page together with the module |
| 3d | Reviewable evidence | no | no CI log and no PR template in `app/`; nothing makes a change attach test output |

### 5.2 The level and the gaps

**Level:** 0

**Missing evidence for the next level:**

- Level 1 needs 4 of 5 rows; I have 3 of 5 (1c, 1d, 1e). Missing: **1a** a formatter (a Prettier config
  and `prettier` in `package.json`) and **1b** an ESLint config or `eslint` in `package.json`. Either one
  of the two would reach Level 1. The Oxlint linter that exists does not count by the rubric's wording.
- Level 2 would then need **2a** an `.env.example` (2b and 2c are already `yes`).
- Level 3 would need **3a** a CI workflow, **3b** pre-commit hooks, **3c** a test of the page together
  with `canBook`, and **3d** test output attached to every change.
- The README is not accurate for this project: it is the stock Vite template and says nothing about
  `canBook`, AC1–AC6 or the commands (R5). The folder layout itself is clear: logic in
  `src/booking.ts`, fixtures in `src/bookings.ts`, page in `src/App.tsx`, tests next to the module.
---

## 6. Task 6 — the agent playbook

### 6.1 The playbook prompt and the answer

What you sent, exactly (the deck's prompt):

````text
Review AGENTS.md and project documentation only. Compare them with these constraints: one fictional room; no login/database; preserve AC1–AC6; no secrets; no external deployments; run tests before proposing acceptance. Report missing or conflicting rules. Draft a minimal patch to AGENTS.md, but wait for my approval before applying it.
````

The assistant's answer, pasted unedited:

````text
I reviewed only AGENTS.md and README.md (the only project docs) against your constraints. Nothing has been edited.
 
## Missing or conflicting rules
 
| Your constraint | What the docs say | Status |
|---|---|---|
| One fictional room | AGENTS.md says to use real room names and the real KBTU portal timetable. The code and UI say fictional (`bookings.ts`, "Room 101 (fictional)"). | **Conflict** |
| No login or database | AGENTS.md "You may" allows a Supabase table and a login page. | **Conflict** |
| No external deployments | "Before you finish" says to run `npx netlify deploy --prod`. | **Conflict** |
| No secrets | No rule. `.gitignore` also doesn't cover `.env`, though that's outside the docs. | **Missing** |
| Run tests before proposing acceptance | The checklist only says "when the build passes." `build` doesn't run tests. The listed test command, `npm run test:unit`, doesn't exist in `package.json`; the real one is `npm run test`. | **Missing and wrong** |
| Preserve AC1–AC6 | AGENTS.md defines only AC1–AC5. AC4 says touching an endpoint is an overlap, but `canBook` and two tests allow touching. | **Gap and conflict** |
 
Smaller gaps:
- `npm run lint` exists but isn't listed.
- "Make sure the page still loads" has no defined check.
- README.md is the stock Vite template and says nothing about the project or its rules. I left it out of the patch to keep the change minimal.
 
## Two decisions I need from you
1. **AC6:** The docs don't contain it. I didn't invent one. Tell me its text, or confirm that "AC1–AC6" meant AC1–AC5.
2. **AC4:** The patch below makes the doc match the code (touching is allowed), since the tests already encode that. If you want touching to count as an overlap, say so. That is a code and test change, not just a doc change.
 
## Draft patch (not applied)
 
```diff
--- a/AGENTS.md
+++ b/AGENTS.md
@@ Project
-For realism, use real room names and the real timetable from the KBTU portal.
+Use exactly one fictional room ("Room 101") and the fictional bookings in `src/bookings.ts`.
+Do not use real room names, real timetables, or data from the KBTU portal.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps. A request that only touches a booking at an endpoint is allowed.
 - AC5 Return Available / Unavailable without changing booking data.
+
+Keep these criteria intact. Do not change an AC or its tests without asking first.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm run test`
+- Lint: `npm run lint`
 - Build: `npm run build`
 
 ## You may
 
 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
+
+## You may not
+
+- Add a login page, a database, Supabase, or any other persistence. Bookings stay in `src/bookings.ts`.
+- Add secrets, API keys, tokens, or `.env` files, or commit any.
+- Deploy or publish anywhere (no `netlify deploy`, no hosting). Local `npm run dev` and `npm run build` only.
 
 ## Before you finish
 
-- Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Run `npm run test` and `npm run build` and report their actual results. Do not claim a pass without running them.
+- Do not propose the work as accepted until the tests have been run and pass.
+- Make sure the page still loads with `npm run dev`.
```
 
Outside this patch, two code-side issues will still affect acceptance:
- Blank time inputs make `canBook` return "Available" (the `NaN` case from my earlier review).
- `.gitignore` doesn't cover `.env`.
 
Tell me whether to fold either into the work. If you approve the patch, answer the AC4 and AC6 questions and I'll apply it once the project folder is connected. I can't write to the real AGENTS.md until then.
````

### 6.2 Findings and my decisions

One row per missing or conflicting rule the answer reported, plus any it missed. **Decision:**
`approve`, `reject` or `modify`.

| # | Rule or line in AGENTS.md | Missing / conflicting | Decision | Why |
| --- | --- | --- | --- | --- |
| 1 | Project, line 12: "use real room names and the real timetable from the KBTU portal" | conflicting (C1) | modify | Approved the replacement, merged into one line that keeps the existing "Project" heading: exactly one fictional room, the fictional bookings in `src/bookings.ts`, never real names or portal data. |
| 2 | You may, line 33: "add a small Supabase table and a login page" | conflicting (C2) | modify | Approved removing it. Rejected the new `## You may not` heading the draft added, because the patch must keep the same headings as `provided/AGENTS.md`; the prohibition went into "Project" as one "Never add a login page or a database…" line. |
| 3 | No rule about secrets | missing (C4) | modify | Approved the rule, folded into the same "Never…" line: never add or commit secrets, API keys, tokens or `.env` files. |
| 4 | Before you finish, line 38: `npx netlify deploy --prod` | conflicting (C5) | modify | Approved removing it. Rejected the draft's "Local `npm run dev` and `npm run build` only" bullet under a new heading; wrote one "Never deploy or publish the app anywhere" line under "Project" instead. |
| 5 | Commands, line 26: `npm run test:unit` | conflicting (command does not exist) | modify | Approved the fix, but wrote `npm test`, the command I actually ran in §2.1; `npm run test` names the same script. |
| 6 | Acceptance contract, AC4: "touching… also counts as an overlap" | conflicting (C3) | approve | The draft's version matches the contract; I used the contract's own words: "allow bookings that only touch at endpoints". |
| 7 | AC6 missing | missing (C3) | modify | The assistant asked for its text instead of inventing one, which was right. I added it from README §3: "AC6 Preserve clear UI feedback on desktop and mobile." |
| 8 | No rule to run the tests before acceptance | missing (C6) | modify | Approved the idea; merged the draft's three bullets into one: run `npm test` and `npm run build`, report the real output, never claim a pass you did not run. |
| 9 | Draft adds "Lint: `npm run lint`" | missing (not one of C1–C6) | reject | The script exists, but it is not one of the six constraints; leaving it out keeps the patch minimal (7 insertions, 5 deletions; the checker counts 8 changed lines). |
| 10 | Draft adds "Keep these criteria intact. Do not change an AC or its tests without asking first." | missing | reject | A good habit, but the contract lines themselves now say what to preserve, and every extra line counts against "minimal". |
| 11 | You may: "Edit any file", "Add packages when a task needs them" (the assistant did not report it) | conflicting with the refactor prompt's "no new dependencies", not with C1–C6 | reject | Left unchanged to keep the patch minimal and within the six constraints; recorded as a remaining limitation of the playbook. |

### 6.3 The approved patch

`git diff app/AGENTS.md`, after you applied only what you approved:

````text
PS D:\My files\Amal\gitReps\se-practice\week-10> git --no-pager diff 86992a3 -- app/AGENTS.md
warning: in the working copy of 'week-10/app/AGENTS.md', LF will be replaced by CRLF the next time Git touches it
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..1dda8c6 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,32 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Scope: exactly one fictional room and the fictional bookings in `src/bookings.ts`. Never use real room names, real timetables or data from the KBTU portal.
+Never add a login page or a database (no Supabase, no other persistence), and never add or commit secrets, API keys, tokens or `.env` files.
+Never deploy or publish the app anywhere (no `netlify deploy`); run it locally only.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Before proposing the work as accepted, run `npm test` and `npm run build` and report their real output. Never claim a pass you did not run.
````

The whole approved patch against the checkpoint `86992a3`, where `app/AGENTS.md` was the untouched copy of
`provided/AGENTS.md`: `1 file changed, 7 insertions(+), 5 deletions(-)`. It was committed in two steps:
`1f68594` (the patch, with the last line pasted with a stray indent and no final newline) and a
follow-up commit that fixed only that formatting.
 
---

## 7. Task 7 — verify safely

### 7.1 The regression test fails before the mitigation

The risk it covers: **R1**. The test `R1 AC1: a request whose times are not numbers is Unavailable` was
added to `app/src/booking.test.ts` and committed alone (`9415764`), before any change to `src/`. The real
run, with the new test failing:

````text
PS D:\My files\Amal\gitReps\se-practice-before\week-10\app> npx vitest run

 RUN  v5.1.1 D:/My files/Amal/gitReps/se-practice-before/week-10/app

 ❯ src/booking.test.ts (15 tests | 1 failed) 10ms
   ✓ canBook (14)
     ✓ a free one-hour slot is Available 2ms
     ✓ AC1: start equal to end is Unavailable 0ms
     ✓ AC1: a reversed interval is Unavailable 0ms
     ✓ AC1: a start in the past is Unavailable 0ms
     ✓ AC1: an end after 24:00 is Unavailable 0ms
     ✓ AC1: ending exactly at 24:00 is Available 0ms
     ✓ AC2: exactly 120 minutes is Available 0ms
     ✓ AC2: 121 minutes is Unavailable 0ms
     ✓ AC3: a blocked room is Unavailable 0ms
     ✓ AC4: an overlapping slot is Unavailable 0ms
     ✓ AC4: a slot inside an existing booking is Unavailable 0ms
     ✓ AC4: touching the end of a booking is Available 0ms
     ✓ AC4: touching the start of a booking is Available 0ms
     ✓ AC5: the bookings list is not changed 0ms
   × R1 AC1: a request whose times are not numbers is Unavailable 5ms

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/booking.test.ts > R1 AC1: a request whose times are not numbers is Unavailable
AssertionError: expected 'Available' to be 'Unavailable' // Object.is equality

Expected: "Unavailable"
Received: "Available"

 ❯ src/booking.test.ts:84:54
     82|   // An empty or half-filled time field in App.tsx becomes NaN before canBook is called.
     83|   const base = { now: 540, blocked: false, bookings: [{ start: 600, end: 660 }] }
     84|   expect(canBook({ ...base, start: NaN, end: 760 })).toBe('Unavailable')
       |                                                      ^
     85|   expect(canBook({ ...base, start: 700, end: NaN })).toBe('Unavailable')
     86|   expect(canBook({ ...base, start: NaN, end: NaN })).toBe('Unavailable')

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 14 passed (15)
   Start at  19:57:51
   Duration  234ms (transform 53%, import 22%, tests 16%, worker 9%, environment 1%)

````

### 7.2 The manual UI check

| View | Width | What I checked | Result | Screenshot |
| --- | --- | --- | --- | --- |
| Desktop | full-screen browser window | Start 21:00, End 22:00 (after the current time), not blocked → pressed "Check availability"; whether the result is readable and nothing overlaps | green "Available" shown under the form; title, inputs, button and the bookings list readable, nothing cut off | `evidence/ui-desktop.png` |
| Mobile | 390 px (Chrome device toolbar, iPhone 12 Pro) | both time fields empty → pressed "Check availability" (the R1 case after the fix); layout at phone width | red "Unavailable" shown; the form and the list fit the width, nothing cut off or overlapping | `evidence/ui-mobile.png` |

### 7.3 Tests and checks I did not run

- **No automated test of the page** (`src/App.tsx`): there is no React Testing Library or browser test in
  the project, and adding one would be a new dependency. The page was checked only by hand (§7.2).
- **No real phone**: the mobile view was checked in the browser's device toolbar, not on a device.
- **Only one browser**: other browsers (Firefox, Safari) were not tried; how they handle an empty or
  half-filled `<input type="time">` was not checked.
- **No timezone or clock test** for `now` (R6): I did not run the page with a changed device clock or
  timezone.
- **`npm run preview`** (the built page) was not opened; only `npm run dev`.
- **No CI run**: there is no CI in the project (R4), so nothing ran the suite outside my computer.
- **The assistant's "19 passed in a scratch copy"** is not counted as a run: it was not my repository.
---

## 8. Task 8 — mitigate two risks

### 8.1 The first mitigation

**Risk:** R1

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

````text
Refactor the availability logic into a small, pure module, keeping the existing function inputs, outputs, and UI behavior. Use a pattern only if the identified design problem justifies it. Do not add new features or dependencies. Show the files you plan to edit before making changes.
````

The assistant first answered with a plan and no code: `canBook` is already pure, so it would not split it
into rule objects or a strategy; the real problem is `handleCheck` in `App.tsx`; it planned a new
`src/timeInput.ts` with tests and asked whether to keep the blank-input bug or fix it. I then asked for the
patch (my own follow-up, README Part 8 step 2):

````text
Go ahead with that plan, as a minimal patch shown as full new file contents for every file you change. It must also mitigate risk R1: an empty or half-filled time field in src/App.tsx becomes NaN, and canBook in src/booking.ts then returns 'Available'. The new test 'R1 AC1: a request whose times are not numbers is Unavailable' (canBook with NaN start and/or end must return 'Unavailable') has to pass, and the other 14 tests must stay green and unchanged. No new dependencies, no renaming, no unrelated changes.
````

**Problem → pattern → benefit:** `handleCheck` in `src/App.tsx` parsed the "HH:MM" strings, read the clock
and called `canBook` inside the component, so the path that turned an empty field into `NaN` (R1) could not
be tested, and `canBook` trusted every number it got. No named pattern: an extracted pure module
`src/timeInput.ts` (`parseTime`, `minutesOfDay`) plus a `Number.isFinite` guard in `canBook`, which made the
blank-form path testable and rejects non-numeric times for every caller.

**What I rejected from the agent's patch, and why:**

- **Its new `src/booking.test.ts`.** It moved my R1 test into the `describe` block and rewrote it with the
  `request()` helper. I had not asked for that, and the regression test must stay the one that failed in
  §7.1, so I kept my committed file unchanged.
- **Its claim "19 passed" from a scratch copy.** That copy was not my repository and did not use my
  `package.json`; the only run I count is my own in §8.4.
- Approved after reading every line: `src/timeInput.ts` (new), `src/timeInput.test.ts` (new, 4 tests; each
  assertion checked against the code), the 6 changed lines of `handleCheck` and one import in `App.tsx`,
  and the 2-line guard in `booking.ts`. The pasted `booking.ts` also lost its final newline, a harmless
  side effect visible at the end of its diff.
  The diff I approved (`git diff`):

````text
PS D:\My files\Amal\gitReps\se-practice\week-10> git --no-pager diff --cached app/src
diff --git a/week-10/app/src/App.tsx b/week-10/app/src/App.tsx
index 426ea2f..128f807 100644
--- a/week-10/app/src/App.tsx
+++ b/week-10/app/src/App.tsx
@@ -1,6 +1,7 @@
 import { useState } from 'react'
 import { canBook, type Result } from './booking'
 import { existingBookings } from './bookings'
+import { minutesOfDay, parseTime } from './timeInput'
 import './App.css'
 
 function formatTime(minutes: number) {
@@ -17,12 +18,9 @@ function App() {
 
   function handleCheck(event: React.FormEvent) {
     event.preventDefault()
-    const [sh, sm] = startText.split(':')
-    const [eh, em] = endText.split(':')
-    const start = Number(sh) * 60 + Number(sm)
-    const end = Number(eh) * 60 + Number(em)
-    const date = new Date()
-    const now = date.getHours() * 60 + date.getMinutes()
+    const start = parseTime(startText)
+    const end = parseTime(endText)
+    const now = minutesOfDay(new Date())
     setResult(canBook({ start, end, now, blocked, bookings: existingBookings }))
   }
 
diff --git a/week-10/app/src/booking.ts b/week-10/app/src/booking.ts
index 7eafa2f..e81c4f6 100644
--- a/week-10/app/src/booking.ts
+++ b/week-10/app/src/booking.ts
@@ -23,6 +23,8 @@ export function canBook(request: BookingRequest): Result {
   const { start, end, now, blocked, bookings } = request
 
   // AC1: a valid interval inside the day, not in the past
+  // NaN makes every comparison below false, so reject non-finite times first.
+  if (!Number.isFinite(start) || !Number.isFinite(end)) return 'Unavailable'
   if (start < 0 || end > DAY_END) return 'Unavailable'
   if (start >= end) return 'Unavailable'
   if (start < now) return 'Unavailable'
@@ -40,4 +42,4 @@ export function canBook(request: BookingRequest): Result {
 
   // AC5: nothing above changes `bookings`
   return 'Available'
-}
+}
\ No newline at end of file
diff --git a/week-10/app/src/timeInput.test.ts b/week-10/app/src/timeInput.test.ts
new file mode 100644
index 0000000..acc29d5
--- /dev/null
+++ b/week-10/app/src/timeInput.test.ts
@@ -0,0 +1,30 @@
+import { describe, expect, test } from 'vitest'
+import { canBook } from './booking'
+import { minutesOfDay, parseTime } from './timeInput'
+
+describe('parseTime', () => {
+  test('"10:30" is 630 minutes', () => {
+    expect(parseTime('10:30')).toBe(630)
+  })
+
+  test('a blank field is NaN', () => {
+    expect(parseTime('')).toBeNaN()
+  })
+
+  test('R1: a blank form is Unavailable end to end', () => {
+    const result = canBook({
+      start: parseTime(''),
+      end: parseTime(''),
+      now: 540,
+      blocked: false,
+      bookings: [],
+    })
+    expect(result).toBe('Unavailable')
+  })
+})
+
+describe('minutesOfDay', () => {
+  test('13:05 local time is 785 minutes', () => {
+    expect(minutesOfDay(new Date(2026, 0, 1, 13, 5))).toBe(785)
+  })
+})
diff --git a/week-10/app/src/timeInput.ts b/week-10/app/src/timeInput.ts
new file mode 100644
index 0000000..f48a53d
--- /dev/null
+++ b/week-10/app/src/timeInput.ts
@@ -0,0 +1,13 @@
+// Pure helpers for the time inputs of the room checker.
+
+// "HH:MM" -> whole minutes since midnight.
+// A blank or malformed value gives NaN, which canBook rejects (AC1).
+export function parseTime(text: string): number {
+  const [hours, minutes] = text.split(':')
+  return Number(hours) * 60 + Number(minutes)
+}
+
+// A Date -> whole minutes since midnight in the local timezone.
+export function minutesOfDay(date: Date): number {
+  return date.getHours() * 60 + date.getMinutes()
+}
````

### 8.2 The second mitigation

**Risk:** R2

**If this is the refactor** — the prompt you sent (README Part 8), then the problem → pattern → benefit
line. Otherwise leave both empty.

````text
````

**Problem → pattern → benefit:**

**What I rejected from the agent's patch, and why:**

This is the `AGENTS.md` patch of Part 6, counted as a mitigation because R2 is a confirmed `Agent
operations` risk (README Part 8). From the assistant's draft I rejected: the new `## You may not` heading
(the patch must keep the headings of `provided/AGENTS.md`), the extra "Lint" command and the "Keep these
criteria intact" line (not among the six constraints; the patch had to stay minimal), and the "Local
`npm run dev` and `npm run build` only" bullet. Every decision is in §6.2.

The diff I approved (`git diff`):

````text
PS D:\My files\Amal\gitReps\se-practice\week-10> git --no-pager diff 86992a3 -- app/AGENTS.md
diff --git a/week-10/app/AGENTS.md b/week-10/app/AGENTS.md
index b786d88..1dda8c6 100644
--- a/week-10/app/AGENTS.md
+++ b/week-10/app/AGENTS.md
@@ -9,30 +9,32 @@ A React + TypeScript page (Vite) that tells a student whether a campus room is f
 requested time. The booking rule lives in `src/booking.ts` (`canBook`); the page is `src/App.tsx`;
 the tests are in `src/booking.test.ts`.
 
-For realism, use real room names and the real timetable from the KBTU portal.
+Scope: exactly one fictional room and the fictional bookings in `src/bookings.ts`. Never use real room names, real timetables or data from the KBTU portal.
+Never add a login page or a database (no Supabase, no other persistence), and never add or commit secrets, API keys, tokens or `.env` files.
+Never deploy or publish the app anywhere (no `netlify deploy`); run it locally only.
 
 ## Acceptance contract
 
 - AC1 Reject start ≥ end and requests in the past.
 - AC2 Enforce the maximum allowed duration (120 minutes).
 - AC3 Reject a blocked room.
-- AC4 Reject overlaps. A request that touches a booking at an endpoint also counts as an overlap.
+- AC4 Reject overlaps; allow bookings that only touch at endpoints.
 - AC5 Return Available / Unavailable without changing booking data.
+- AC6 Preserve clear UI feedback on desktop and mobile.
 
 ## Commands
 
 - Install: `npm install`
 - Dev server: `npm run dev`
-- Tests: `npm run test:unit`
+- Tests: `npm test`
 - Build: `npm run build`
 
 ## You may
 
 - Edit any file in the project.
 - Add packages when a task needs them.
-- If bookings need to persist, add a small Supabase table and a login page.
 
 ## Before you finish
 
 - Make sure the page still loads.
-- When the build passes, publish a preview with `npx netlify deploy --prod` so the team can see it.
+- Before proposing the work as accepted, run `npm test` and `npm run build` and report their real output. Never claim a pass you did not run.
````

### 8.3 The residual risk

| ID | L before | I before | Score before | L after | I after | Score after | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R1 | 3 | 2 | 6 | 1 | 2 | 2 | The `Number.isFinite` guard in `canBook` and the tests `R1 AC1: …` (`booking.test.ts`) and `R1: a blank form is Unavailable end to end` (`timeInput.test.ts`) pass in §8.4; the empty form now shows "Unavailable" (§7.2). L stays 1, not 0: `parseTime('10:')` still gives 600, and `now` is not checked for `NaN`; a browser time input should not produce those, which I did not verify in other browsers. I stays 2: if it happened, the answer would still be wrong. |
| R2 | 3 | 3 | 9 | 1 | 3 | 3 | `app/AGENTS.md` now forbids the deploy, login, database, secrets and real data, lists AC1–AC6 with the contract's AC4 and names `npm test`, which exists (§6.3). L is 1, not 0, because anyone who can commit can put the old lines back, and "Edit any file / Add packages" is still there. I stays 3: a production deploy or a leaked key would still be serious. |

### 8.4 The final run

The real output of the **full** suite after both mitigations. Every test must pass.

````text
PS D:\My files\Amal\gitReps\se-practice\week-10\app> npx vitest run
 
 RUN  v5.1.1 D:/My files/Amal/gitReps/se-practice/week-10/app
 
 ✓ src/booking.test.ts (15 tests) 6ms
 ✓ src/timeInput.test.ts (4 tests) 4ms
 
 Test Files  2 passed (2)
      Tests  19 passed (19)
   Start at  19:22:45
   Duration  186ms (transform 46%, import 28%, tests 13%, worker 11%)
 
PS D:\My files\Amal\gitReps\se-practice\week-10\app> npm run build
 
> app@0.0.0 build
> tsc -b && vite build
 
vite v8.3.8 building client environment for production...
✓ 20 modules transformed.
computing gzip size...
dist/index.html                   0.47 kB │ gzip:  0.30 kB
dist/assets/index-B9JWq2yF.css    0.64 kB │ gzip:  0.36 kB
dist/assets/index-BLAz8fcu.js   221.26 kB │ gzip: 69.29 kB
 
✓ built in 138ms
````
 
---

## 9. Task 9, and what still fails

### 9.1 A background agent on this project

Rules for an agent working asynchronously on a separate branch. Be specific to this project: name
its files and its commands.

| Rule | What I require |
| --- | --- |
| Isolation | Works only on its own branch cut from `week-10` (e.g. `agent/<task>`) or a separate `git worktree`, never on `week-10` or `main`; starts from a clean `npm ci` in `week-10/app/`; gets no credentials, no `.env` and no network beyond the npm registry. |
| Permitted files | `week-10/app/src/booking.ts`, `src/timeInput.ts`, `src/App.tsx`, `src/App.css` and new or changed tests `src/*.test.ts`. Read-only: `app/AGENTS.md`, `package.json`, `package-lock.json`, `src/bookings.ts` (the fictional fixtures). Nothing outside `week-10/app/`; never `provided/`, `tests/`, `lab-report.md` or `submission.yml`. |
| Commands | `npm ci`, `npm test` (= `vitest run`), `npx vitest run`, `npm run build`, `npm run lint`, `git status`, `git diff`, and `git commit` on its own branch only. |
| Prohibited actions | `npx netlify deploy` or any deploy; `git push` to `main` or `week-10`, force-push, `git reset --hard`; adding a login, a database, Supabase or any package (`npm install <pkg>`); creating `.env` or writing any key; real room names or KBTU data; deleting, skipping (`.skip`) or weakening an assertion; changing AC1–AC6 or `AGENTS.md`. |
| Required evidence | The `git diff` of every changed file; the real output of `npm test` with the number of tests (never fewer than the 19 of §8.4) and of `npm run build`; for a bug fix, the run of a regression test named after the risk failing before the fix; a short review note: which risk ID it addresses, what it did not run, and an update to the risk register if a score changes. |
| Before merging or deploying | I read the whole diff, rerun `npm test` and `npm run build` myself in `week-10/app/`, check the page by hand at desktop and phone width, and merge into `week-10` myself. There is no deploy at all for this project (C5). Nothing is merged without my explicit approval. |

### 9.2 Optional — the deck's checklist prompt (not graded)

<!-- If you sent it: the answer, and one thing it has that your rules in 9.1 do not, or the reverse. -->

### 9.3 Checks I am keeping as FAIL or ERROR

Use the same IDs as `known_fails` in `submission.yml`. Write `none` if the run is clean.

| Check | Why it stays |
| --- | --- |
| none | The last run of `check_audit.py` is clean: 31 PASS, 0 FAIL, 0 ERROR. |
 
---

## 10. Release decision and conclusion

**Decision:** CONDITIONAL

<!-- Keep one word above. GO is not allowed while any confirmed risk still scores 6 or more.
     Then 80-150 words, in your own words, without the assistant: why this decision, from the
     register, the tests and what you are still unsure about. Name at least two risk IDs.
     Worthless: "The project is mostly fine, so GO."
     Worth everything: "CONDITIONAL. R2 (the deploy line in AGENTS.md, 3 x 3 = 9) is closed by the
     approved patch, now 1 x 3. R4 (the page accepts a past start when 'now' is typed by hand,
     2 x 2 = 4) is open, owned by me, controlled by the AC1 test. The UI was checked at two widths,
     but no test covers App.tsx, so a regression there would be invisible." -->

<!-- Write your conclusion below this line -->

CONDITIONAL. R2 (AGENTS.md sent agents to a production deploy, a Supabase login and real KBTU data,
3 x 3 = 9) is closed by the approved minimal patch and is now 1 x 3 = 3. R1 (an empty time field became
NaN and canBook answered Available, 3 x 2 = 6) first failed its regression test and passes after the
refactor, now 1 x 2 = 2; all 19 tests pass. GO is still not allowed: R3 (.gitignore
does not ignore .env, 2 x 3 = 6) is open, owned by me and controlled only by the new AGENTS.md rule against
secrets. R4 (no CI, 2 x 2 = 4) means I run npm test by hand. I am least sure about
App.tsx: no automated test covers it, and I checked it in one browser only.