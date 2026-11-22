# AI Usage Disclosure — Week 10

Required by the course academic policy (Generative AI use level **D — AI-integrated**).
You are responsible for the accuracy, testing and integrity of everything you submit,
including anything an AI tool produced.

| Tool | Exact model / plan | Used for | Which files it touched |
| --- | --- | --- | --- |
| Claude (claude.ai chat) | Claude Sonnet 5.5 | read-only risk review (Task 2), and the AGENTS.md summary of Task 1 | none — "WITHOUT editing files" |
| Claude (claude.ai chat) | Claude Sonnet 5.5 | AGENTS.md review and patch draft (Task 6) | `app/AGENTS.md`, only after my approval: 1 approved, 7 modified, 3 rejected (§6.2) |
| Claude (claude.ai chat) | Claude Sonnet 5.5 | minimal patches for two risks (Task 8): the refactor plan and the R1 patch | `app/src/timeInput.ts`, `app/src/timeInput.test.ts`, `app/src/App.tsx`, `app/src/booking.ts`; its `booking.test.ts` rejected |
| Claude (claude.ai chat) | Claude Opus 5.5 | built the baseline app (I had no Week 07/08 project), explained the README, packed the project into one file for the reviewer, wrote the R1 regression test, proposed the labels, the register, the audit rows, the decisions on the AGENTS.md patch and its final wording, and drafted lab-report.md §2–§10 | the whole baseline `week-10/app/`, `app/src/booking.test.ts` (the R1 test), `app/AGENTS.md` (final wording), `lab-report.md` |

**The review in Task 2 ran in a mode where the assistant could not edit, and `git status` showed no
change afterwards:** yes
A claude.ai chat with the project pasted as one file; GitHub Desktop showed no change in `week-10/app/`
(only my IDE's `.idea/workspace.xml` at the repository root).


**I labelled every claim in lab-report.md §3.2 after opening the cited file myself:** yes
The labels were proposed by Claude Opus 5.5; I opened every cited file and ran the empty form myself before keeping them.

**Every change to `app/` was reviewed by me as a diff before I accepted it:** yes
Except the baseline app itself: Claude Opus 5.5 wrote it and I committed it as the starting point (`86992a3`).


**I used another assistant as well (to explain a risk, to draft text in lab-report.md, …):** yes
Claude Opus 5.5, in a separate chat: the baseline app, explanations of the README, and drafts of lab-report.md §2–§9.1 and of §10 (the conclusion).

**Every terminal output in lab-report.md was pasted from a real run, unedited:** yes

**I can explain every score in my register, and why my release decision follows from it, without
the assistant:** yes

**Anything I accepted from the AI without fully understanding it:**
Nothing

Signed: Amal Osmanov
Date: 2026-11-22
 