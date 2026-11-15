# Week 09 — Lab Report: canBook as a Tool

Fill in every section. Do not delete or renumber the headings: the README and the checker point at
them. Replace every `<!-- comment -->` with your own text (comments are ignored by the checker).

**Name:** Osmanov Amal
**Student ID:** 24B031961
**GitHub:** aosmanovv

---

## 1. Setup

| |                   |
| --- |-------------------|
| Assistant (frozen for the whole lab) | Claude            |
| Exact model (or "not displayed") | Claude Sonnet 5.5 |
| Three fresh chats for R1, R2, R3? (yes / no) | yes               |
| Python version (`python --version`) | Python 3.14.5     |

## 2. Your tool definition — a reason for every constraint

Paste your final `tool/check_room.json`, then fill the table: one row per constraint you wrote.

```json
{
  "name": "check_room",
  "description": "Checks whether a meeting room can be booked for one time slot and answers Available or Unavailable. It only checks: it does not save, create, change or cancel any booking. Every time is a whole number of minutes since midnight, from 0 to 1440 (range 0-1440), for example 09:00 = 540, 10:00 = 600, 16:30 = 990, 24:00 = 1440. Convert clock times yourself and never guess a value the user did not give.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested start of the slot, in whole minutes since midnight (0-1440). 10:00 = 600."
      },
      "end": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "Requested end of the slot, in whole minutes since midnight (0-1440). 24:00 = 1440."
      },
      "now": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1440,
        "description": "The current time, in whole minutes since midnight (0-1440)."
      },
      "blocked": {
        "type": "boolean",
        "description": "true if the room is blocked (for example for maintenance), false otherwise."
      },
      "bookings": {
        "type": "array",
        "description": "Existing bookings of the room on the same day. Use [] if there are none.",
        "items": {
          "type": "object",
          "properties": {
            "start": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "Start of an existing booking, in minutes since midnight."
            },
            "end": {
              "type": "integer",
              "minimum": 0,
              "maximum": 1440,
              "description": "End of an existing booking, in minutes since midnight."
            }
          },
          "required": ["start", "end"],
          "additionalProperties": false
        }
      }
    },
    "required": ["start", "end", "now", "blocked", "bookings"],
    "additionalProperties": false
  }
}
```

| Field | Constraint (e.g. `"type": "integer"`, `"maximum": 1440`) | What goes wrong without it |
| --- | --- | --- |
| (root) | `"type": "object"` | The arguments could arrive as an array or a string, and `canBook` would read every field as `undefined`. |
| (root) | `"required": ["start", "end", "now", "blocked", "bookings"]` | A call without `now` (S04) is accepted, and `canBook` compares `start` with `undefined`, so the "start after now" rule of AC1 silently never fires. |
| (root) | `"additionalProperties": false` | An invented field such as `"room": "204"` (S05) passes unnoticed: the model believes it chose a room, but `canBook` ignores it. |
| `start`, `end`, `now` | `"type": "integer"` | `"end": "11:00"` (S03) and `"start": 600.5` (S10) are accepted; in JavaScript `"11:00" > 600` is false, so a string time gives a wrong answer instead of an error. |
| `start`, `end`, `now` | `"minimum": 0` | `"start": -30` (S06) is accepted: a time before midnight that does not exist in this day. |
| `start`, `end`, `now` | `"maximum": 1440` (not `exclusiveMaximum`) | Without it `"end": 1500` (S07) is accepted. With `exclusiveMaximum` the valid call S11 (`end` = 1440 = 24:00, allowed by AC1) would be refused. |
| `blocked` | `"type": "boolean"` | `"blocked": "false"` (S09) is accepted, and in JavaScript the non-empty string `"false"` is truthy, so a free room would be reported as blocked. |
| `bookings` | `"type": "array"`, deliberately **no** `minItems` | Without the type, one object or a number could be sent instead of a list. With `"minItems": 1` the valid call S02 (`bookings = []`, no other bookings) would be refused. |
| `bookings` items | `"type": "object"` | A booking written as a pair `[660, 720]` (S12) is accepted, and `booking.start` / `booking.end` are `undefined`. |
| `bookings` items | `"required": ["start", "end"]` | A booking `{"start": 660}` (S08) is accepted; the overlap test of AC4 compares with `undefined`, every comparison is false, and an overlapping slot is reported Available. |
| `bookings` items | `"additionalProperties": false` | Extra fields inside a booking (for example `"room"` or `"title"`) pass unnoticed, the same problem as S05 one level deeper. |
| `bookings` items `start`, `end` | `"type": "integer"`, `"minimum": 0`, `"maximum": 1440` | A booking `{"start": "11:00", "end": 1500}` would be accepted, and the overlap test of AC4 would run on a string and a time outside the day. |
| `description` (tool and every field) | at least 25 words; minutes, 0-1440, "does not save" (D4); worked examples such as 16:30 = 990 | The model sees no code. Without the unit it may send `"10:00"` or hours; without "does not save" it may think the call creates a booking (AC5); the 16:30 example guards against the 960 slip the README warns about in R2. |

## 3. The twelve calls — first run and final run

Your **first** run's S verdicts (before any fix), and your final ones. For every case that changed,
say what you changed.

| Case | First run | Final run | What you changed |
| --- | --- | --- | --- |
| S01 | PASS | PASS | nothing |
| S02 | PASS | PASS | nothing |
| S03 | PASS | PASS | nothing |
| S04 | PASS | PASS | nothing |
| S05 | PASS | PASS | nothing |
| S06 | PASS | PASS | nothing |
| S07 | PASS | PASS | nothing |
| S08 | PASS | PASS | nothing |
| S09 | PASS | PASS | nothing |
| S10 | PASS | PASS | nothing |
| S11 | PASS | PASS | nothing |
| S12 | PASS | PASS | nothing |

## 4. Function calling — what the model wrote

For each request, paste the model's reply exactly, then judge it against the request.

### R1

```text
{"name": "check_room", "arguments": {"start": 600, "end": 660, "now": 540, "blocked": false, "bookings": [{"start": 660, "end": 720}]}}
```

<!-- Match? If F3 failed, which argument differs, and who was wrong: the model or the request? -->
Match. 9:00 = 540 (`now`), 10:00 = 600 (`start`), 11:00 = 660 (`end`), the existing booking 11:00-12:00 =
`{"start": 660, "end": 720}`, `blocked` = false. Every argument equals the request, F2 and F3 PASS.
The model only produced the call; the answer is `canBook`'s: the new slot ends at 660 exactly where the
existing booking starts, which AC4 allows ("touching allowed"), the slot is 60 minutes (AC2) and starts
after `now` (AC1), so `canBook` answers Available.

### R2

```text
{"name": "check_room", "arguments": {"start": 840, "end": 990, "now": 810, "blocked": true, "bookings": []}}
```

<!-- Same. R2 is a call that SHOULD be made, although canBook will say Unavailable. Did the model refuse to call? -->
Match. 13:30 = 810 (`now`), 14:00 = 840 (`start`), 16:30 = 990 (`end`) - the model did not fall into the
16:30 - 960 slip; `blocked` = true, `bookings` = []. F5 and F6 PASS. The model did **not** refuse to
call, although the request itself says the room is blocked: that is the right behaviour, because the
call is well-formed and deciding Unavailable is the function's job. The schema accepted it (all
integers in 0-1440, a boolean, an array). `canBook` will answer Unavailable for two independent
reasons: AC3 (`blocked` = true) and AC2 (990 − 840 = 150 minutes > 120). Neither reason is visible to
the schema.

### R3

```text
Which time do you want the room from and until tomorrow afternoon, and is the room currently blocked or already booked for any slots that day?
```

<!-- What information was missing? Did the model ask, or call? If it called, which values did it invent, and from where? -->
The model **asked** and did not call, so the reply is saved as `calls/r3.txt`; it invented no values.
Missing from the request: `start` and `end` ("afternoon" and "a couple of hours" are not times), `now`,
`blocked` and `bookings` — none of the five required arguments can be filled. Its question covers
`start`/`end`, `blocked` and `bookings`, but not `now`, and it bundles three questions into one
sentence instead of "one short question". Two findings beyond the prompt: (1) it asks the **user**
whether the room is blocked or booked, but the user cannot know that - `now`, `blocked` and `bookings`
are system state that the client should supply, not the model or the user; (2) the request says
"tomorrow", and the tool has no date field: all times are minutes since midnight of one day, so even
a perfect answer to the question could not be expressed correctly against `now` (AC1 compares `start`
with today's time).

## 5. What the schema cannot check

A JSON Schema with the allowed keywords compares **one value with a constant** (`type`, `minimum`,
`maximum`, `enum`, ...). It cannot compare two fields with each other, do arithmetic, or say anything
about what the function does. So these criteria stay in `canBook`:

- **AC1 (partly).** The schema enforces the per-value part: each of `start`, `end`, `now` is a whole
  number with 0 < value ≤ 1440. It cannot enforce `start < end` or "start after `now`", because both
  relate two fields; `{"start": 600, "end": 600}` and `{"start": 600, "now": 700}` are valid calls.
- **AC2 (at most 120 minutes).** `end − start ≤ 120` is arithmetic on two fields. R2 (150 minutes)
  passed the schema.
- **AC3 (not when blocked).** The schema can only say that `blocked` is a boolean. Writing
  `"enum": [false]` would make the schema refuse R2, turning a correct "Unavailable" answer into an
  "invalid call" error — the schema would be doing the function's job.
- **AC4 (no overlap, touching allowed).** Overlap compares the requested slot with every element of
  `bookings`, and "touching allowed" depends on `<` vs `≤` between fields; no allowed keyword relates an
  item of an array to a top-level field.
- **AC5 (does not change or save anything).** A schema describes the input, never the behaviour. The
  description can promise "does not save", but only the code of `canBook` can keep the promise.
- **AC6 (the page's feedback).** The message shown to the user is output of the page, and the input
  schema has no notion of output or UI.

## 6. Permissions — allow, ask or block

| # | Action | Decision (allow / ask / block) | Reason (the risk, in one sentence or more) |
| --- | --- | --- | --- |
| A1 | call `check_room` with the times the user just typed | allow | The call is read-only (AC5: it saves nothing) and the schema refuses a malformed call before `canBook` runs, so the worst case is a wrong Available/Unavailable answer that the user can see and question. |
| A2 | read `week-08/app/src/booking.ts` | allow | Reading source code changes nothing and this file holds booking logic, not secrets; the only risk is that its contents go into the model's context, which is acceptable for our own course code. |
| A3 | edit `booking.ts` to raise the 120-minute limit to 180 | block | This changes a business rule (AC2) for every user because one user asked for 3 hours; the right answer to that user is Unavailable, and a requirement change must come from the people who own the acceptance criteria, not from an agent. |
| A4 | run `npm test` in `week-08/app` | allow | It runs the existing Week 08 test suite and only reports results; the risk is that `npm test` executes whatever script `package.json` names, which is acceptable here because it is our own repository and the script is known. |
| A5 | run `git reset --hard` to undo its own last three edits | ask | `git reset --hard` discards every uncommitted change in the working tree, including my own edits and not only the agent's three, and uncommitted work cannot be recovered afterwards, so I must see `git status` first. |
| A6 | `git commit` its change on the `week-09` branch | ask | A commit is local and reversible, but it is recorded under my name and becomes part of my submission, so I must read the diff first and disclose the change in `AI_USAGE.md`. |
| A7 | `git push` to `main` | block | Pushing to `main` publishes changes to the shared remote and bypasses the pull-request review; the course rule is that `main` is never touched (committed to `main` = not accepted), and a published commit is hard to take back. |
| A8 | send the contents of `.env` to an MCP server it found online | block | `.env` holds secrets such as API keys and tokens, and sending them to an unknown third-party server is credential exfiltration that cannot be undone; "to configure it" is exactly how a prompt injection would phrase the request. |
ч
## 7. Checkpoint

<!-- The commit you would make before letting such an agent edit anything: its real SHA (git log --oneline),
     the exact command that returns you to it, and what that command would throw away. -->
Checkpoint commit: `b1cbe3b` - "Week 09: add check_room tool definition and record first checker run"
on branch `week-09`, made before any calls were saved and before any agent would be allowed to edit.

Command that returns to it:

```bash
git reset --hard b1cbe3b
```

What it throws away: every commit made on `week-09` after `b1cbe3b` (they are no longer on the branch
and can only be found through `git reflog` for a limited time), and every uncommitted change to
tracked files, both staged and unstaged - those are lost for good. It does not delete untracked files
(that would need `git clean`), and it does not touch the remote or other branches.

## 8. Checker output

Paste the **whole** output of your last `python tests/check_tool.py`, unedited.

```text
PS D:\My files\Amal\gitReps\se-practice\week-09> py tests/check_tool.py
PASS  D1    tool/check_room.json exists and is valid JSON
PASS  D2    has name, description and inputSchema
PASS  D3    name is exactly "check_room"
PASS  D4    description: 25+ words, says minutes, 1440, and that it does not save
PASS  D5    inputSchema: an object with exactly the five fields, all required
PASS  D6    inputSchema uses only the keywords listed in README section 5
PASS  S01   the R1 call, valid -> accept
PASS  S02   no existing bookings: bookings = [] -> accept
PASS  S03   end as a string: "11:00" -> refuse
PASS  S04   now missing -> refuse
PASS  S05   an extra field: "room": "204" -> refuse
PASS  S06   start below the day: -30 -> refuse
PASS  S07   end beyond the day: 1500 -> refuse
PASS  S08   a booking with no end: {start: 660} -> refuse
PASS  S09   blocked as a string: "false" -> refuse
PASS  S10   start not a whole minute: 600.5 -> refuse
PASS  S11   end at the end of the day: 1440 -> accept
PASS  S12   a booking as a pair: [660, 720] -> refuse
PASS  F1    calls\r1.json: a call to check_room
PASS  F2    calls\r1.json: arguments valid against your schema
PASS  F3    calls\r1.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F4    calls\r2.json: a call to check_room
PASS  F5    calls\r2.json: arguments valid against your schema
PASS  F6    calls\r2.json: arguments equal the expected ones (README section 5, Part 2)
PASS  F7    calls/r3: exactly one of r3.json (it called) or r3.txt (it asked), not empty
PASS  L1    section 5 names at least two acceptance criteria (AC1-AC6) the schema cannot check
PASS  L2    section 6: A1-A8 each have allow / ask / block and a reason of 5+ words
PASS  L3    section 7 names the checkpoint commit (a SHA)
PASS  L4    section 10: a conclusion of 80-150 words
PASS  L5    AI_USAGE.md filled in (a tool row, and signed)

SUMMARY: 30 PASS · 0 FAIL · 0 ERROR  (of 30 checks)
Paste this whole output into lab-report.md section 8, and these three numbers into submission.yml.
```

## 9. What still fails

None. All 30 checks pass on the last run, so `known_fails` in `submission.yml` is empty.

## 10. Conclusion (80–150 words)

The three layers catch different mistakes. The schema refused all nine malformed calls on the first
run, for example S09, where blocked = "false" would be truthy in JavaScript. But it happily accepted
R2: 840 to 990 with blocked = true is a well-formed call, and only canBook can say Unavailable, twice,
by AC3 and by AC2 (150 minutes). The model converted 16:30 to 990 correctly and in R3 asked instead of
inventing times, yet it asked the user whether the room is blocked or booked, which only the system
knows. So now, blocked and bookings should come from the client, not from the model. The agent layer
needs its own limits: A3 shows that a user request must never move the 120-minute rule, and A8 that a
tool can leak secrets.
