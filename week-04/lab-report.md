# Week 04 — Lab report: Modeling the System with UML

> The single worksheet for this lab. Fill in every section. **Do not delete, rename or renumber
> the headings** — the checker and the grader find your work by them. Replace every `<...>`
> placeholder; a row that still contains `<...>` counts as empty.

---

## 1. Setup

| Field | Value                                                               |
| --- |---------------------------------------------------------------------|
| Name | Osmanov Amal                                                        |
| Group | Monday 16-19                                                        |
| AI assistant | Claude                                                              |
| Exact model | Sonnet 5                                                            |
| Renderer | PlantUML web server |
| Behaviour diagram | <sequence / activity / both>                                        |
| Stories used | my week-03 stories, revised      |

---

## 2. Prompts as sent

Paste every prompt **exactly as you sent it**, in the order you sent it, one code block each. The
AI's first replies are saved as files in `models/original/` — do not paste them here.

### 2.1 Task 1 — use-case prompt

```text
Using the supplied scenario and approved stories, generate PlantUML for a
use-case diagram. Include Student and Administrator outside a named system
boundary. Model their goals, show justified associations, and list
assumptions. Use include or extend only with a clear reason.
```

### 2.2 Task 2 — class prompt

```text
Create a UML domain class diagram in PlantUML for Smart Campus. Start with
Student, Room, and Booking. Add attributes, appropriate operations, and
association multiplicities. Add other classes only when requirements
justify them. Explain each relationship and list assumptions. Avoid
unjustified inheritance or composition.
```

### 2.3 Task 3 — behaviour prompt (3A sequence)

```text
Generate PlantUML for Book room. Use Student, BookingService, and
BookingRepository lifelines. Validate the supplied rules, then attempt the
reservation. Show a successful confirmation and an unavailable-room
alternative using alt. Label messages and replies. Explain new design
components and all assumptions.
```

### 2.4 Focused correction prompts (if you sent any)

```text
Review your use-case diagram against R1-R4 and the approved stories:

1. "Send Confirmation" (UC-06 from the scenario) is missing as its own use
   case. It is currently only mentioned in a note under Book Room. Model it
   as a separate use case, included from Book Room via <<include>>, with a
   "why" comment citing R4. My approved-stories.md already declares that R4
   (successful booking produces confirmation) also covers a successful
   cancellation — so Cancel Own Booking must include it too, with its own
   "why" comment. No actor should connect directly to Send Confirmation,
   since no actor initiates it.

2. The note under Book Room references R2 (no overlap), but no assumption
   states whether two bookings that touch exactly (one ending at 12:00, the
   other starting at 12:00) count as overlapping under R2. Add that
   assumption explicitly since this diagram depends on R2.

3. The note placement causes leader lines to cross other use cases when
   rendered. Reposition the notes (e.g. to the right of their use case)
   so no leader line crosses an unrelated use case.

Return the corrected PlantUML in full.
```

### 2.5 Critique prompt

```text
Compare my diagrams with the requirements. Identify missing rules, inconsistent names, and unjustified elements. Cite each issue and propose a specific correction.
```

---

## 3. Task 1 — use-case review

**Assumptions the AI listed:** <one line each, or "the AI listed none" — that is a finding too>
1. Review Room Usage has no approved story — included because the scenario states it.
2. Cancellation produces no confirmation (R4 covers only successful bookings).
3. "Own booking" is a precondition of Cancel, not a separate use case.
4. Blocking affects only new bookings; R3 says nothing about existing ones.
5. Administrators do not book or cancel — no generalisation between actors.
6. No login or registration use case — out of scope.
7. No secondary actors — confirmation shown by the system itself.

At least **two** findings. A finding names the element, the problem and the rule or story that
proves it is a problem.

| # | Element | Problem | Rule or story | Fix |
|---|---|---|---|---|
| 1 | Send Confirmation (missing) | UC-06 from the fixed scenario was not modeled as a use case at all — folded into a note under Book Room instead | R4 / scenario UC-06 | Added a separate "Send Confirmation" use case, included via `<<include>>` from Book Room, with no actor association (nobody initiates it) |
| 2 | Cancel Own Booking / confirmation assumption | AI's original assumption ("cancellation produces no confirmation") directly contradicted the already-approved `approved-stories.md` mapping of US-03 → R4 | R4 / US-03 (approved-stories.md) | Added `UC_Cancel ..> UC_Confirm : <<include>>`; revised assumption to match the approved mapping |
| 3 | Book Room / R2 note | Diagram depends on R2 (overlap check) but never declared whether touching bookings (end 12:00 / start 12:00) count as overlapping — one of the two open questions the scenario deliberately leaves unsettled | R2 | Added explicit assumption: bookings are half-open intervals `[start, end)`, so touching bookings do not overlap |
| 4 | Notes under Book Room / Block Room / Review Room Usage | `note bottom of ...` placement caused leader lines to cross unrelated use cases when actually rendered | — (layout/clarity, not a business rule) | Moved to `note right of ...`, repositioned Administrator so associations and notes run in opposite directions |
---

## 4. Task 2 — class diagram review

### 4.1 Relationships, read both ways

One row per association in your **revised** class diagram.

| Association | Read left → right | Read right → left | Multiplicities |
| --- | --- | --- | --- |
| Student — Booking | One student makes 0..* bookings | Each booking belongs to exactly 1 student | 1 / 0..* |
| Booking — Room | One room is reserved by 0..* bookings | Each booking reserves exactly 1 room | 0..* / 1 |
| Booking — Confirmation | One booking has 1..2 confirmations | Each confirmation belongs to exactly 1 booking | 1 / 1..2 |
| Administrator ..> Room `<<use>>` | Administrator blocks/unblocks a room | Room does not reference the administrator | dependency, no multiplicity |
| Administrator ..> Booking `<<use>>` | Administrator reads bookings to review usage | Booking does not reference the administrator | dependency, no multiplicity |

### 4.2 Constraints the multiplicities cannot show

- R2 (no overlap of active bookings for the same room): stated in a note on Booking — "no two ACTIVE bookings of the same room overlap; intervals are [start, end)" — cannot be written as a multiplicity.
- R1 (future start, 0 < duration ≤ 2h): also in the same note on Booking; enforced by Student.book() using Booking.startTime/endTime, not visible from structure alone.
- R3 (blocked room refused): note on Room — "a room with status BLOCKED accepts no new booking"; enforced via Room.status + isBlocked()/isFree(), not a multiplicity.
- R4 (confirmation on success): note on Confirmation; the 1..2 multiplicity hints at the outcome but not the trigger condition ("successful").

### 4.3 Assumptions

- A1: R2 uses half-open intervals [start, end) — back-to-back bookings do not overlap (consistent with the use-case diagram).
- A2: Cancelled bookings are retained, not deleted, and stop counting toward R2.
- A3: A booking has no "completed" status — derived from endTime, no rule needs a third state.
- A4: A booking has exactly one student and one room; group members are not modelled — capacity is only a search criterion (US-01).
- A5: Blocking affects only new bookings — R3 mentions only new bookings, existing ones are untouched.
- A6: Block reason and block period are not stored — no rule uses them.
- A7: Usage review is derived from existing bookings — no separate usage/report class (this is why Administrator ..> Booking was added during review).
- A8: Ids and names are placeholder attributes — the scenario gives no attribute list.
- A9: Rule checks (R1–R3) happen when Student.book() runs, using Room.isBlocked(), Room.isFree() and Booking.overlaps() — no controller/service classes, since this is a domain model.

### 4.4 Findings

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | File name | AI saved it as `domain-class.puml`; required name is `class.puml` per the deliverables table | §2 deliverables / §4 conventions | Renamed to `models/class.puml`, `@startuml` → `class` |
| 2 | Administrator | `reviewUsage()` declared with no supporting relationship — only depended on `Room`, not `Booking`, despite the AI's own assumption 7 saying usage review reads bookings | US-05 / scenario | Added `Administrator ..> Booking : <<use>>` |
---

## 5. Task 3 — behaviour diagram review

**Option chosen and why:** 3A (sequence) - it shows validation-before-creation and the order of responsibility across R1–R4 most directly, which is what Task 3's review checklist asks to verify.

**Design components added beyond the domain model:**
- `BookingService` - receives the request, applies R1–R3, creates the booking and its confirmation, and replies to the student.
- `BookingRepository` - looks up a room, finds active overlapping bookings, and saves a new booking; holds no business rules.

| # | Element | Problem | Rule or story | Fix |
| --- | --- | --- | --- | --- |
| 1 | File name | AI saved it as `book-room-sequence.puml`; required name is `sequence.puml` | §2 deliverables / §4 conventions | Renamed to `models/sequence.puml`, `@startuml` → `sequence` |
| 2 | `break` fragment | AI added an unrequested `break` fragment for an R1 violation — the prompt only asked for one `alt` with a success/unavailable-room split | R1 / US-06 | Accepted: without it, R1 has no failure outcome in the diagram (the single `alt` only covers R2/R3 unavailability); logged as a deliberate addition, not scope creep |

---

## 6. AI critique

Run the critique prompt once, on all your revised diagrams together. At least **three** rows. A
critique is another claim to evaluate, not a verdict: reject what is wrong and say why.

| # | Issue the AI raised | Element it cited | Verdict | Why |
| --- | --- | --- | --- | --- |
| 1 | R2 and R3 not separately traceable in sequence | `sequence.puml` alt / else branch | accept | Overlap query runs even when room is already blocked; separate `break` for R3 is more precise and matches the R1 pattern already used |
| 2 | R2 boundary case missing from sequence | `findActiveOverlapping` message | accept | use-case.puml and class.puml both state the half-open-interval rule; sequence silently omits it |
| 3 | "Own booking" constraint only in a source comment | `class.puml` comment; `UC_Cancel` | accept | PlantUML comments don't render; a reader of the diagram image never sees this constraint |
| 4 | `book()` vs `bookRoom()` name/signature mismatch | `Student.book()`, sequence `bookRoom()` | accept | Same operation, two names and two signatures across diagrams — breaks consistency table traceability |
| 5 | `confirmation(...)` fields don't match `Confirmation` class | sequence reply message | accept | Message carries `room, start, end`; class has `confirmationId, kind, issuedAt` — align to the class |
| 6 | Rename "Send Confirmation" to avoid implying a delivery channel | `UC_Confirm` | **reject** | "Send confirmation" is the scenario's own fixed name for UC-06 (Week 03 scenario table); renaming breaks traceability to one of the six fixed functions |
| 7 | `RoomStatus.AVAILABLE` is overloaded with "available" elsewhere | `RoomStatus` enum | accept (optional) | Valid terminology overlap, but `isBlocked()`/`isFree()` already disambiguate it behaviourally — not required, just polish |
| 8 | `startTime`/`endTime` vs `start`/`end` | `Booking` attributes vs. every parameter | accept | Real naming drift between the attribute names and every operation parameter that refers to them |
| 9 | BookingService/BookingRepository and domain methods never connect across diagrams | class.puml vs. sequence.puml | partial accept | The gap is real, but the proposed fix (add them to class.puml) contradicts the assignment's own instruction that these are design components, not domain classes (§5, not class.puml). Accepted instead: add sequence notes mapping each step to the existing domain operation |
| 10 | Cancellation confirmation is "unjustified", contradicts R4's literal text | `ConfirmationKind.CANCELLATION`, multiplicity `1..2` | **reject** | Already a declared assumption (§4.3 of approved-stories.md), independently supported by the Week 03 scenario's own UC-06 text ("confirms a booking or a cancellation") — not just the story-table cell the critique saw. Kept, but note wording tightened to read as an explicit interpretation of R4 |
| 11 | Wrong story cited for usage review ("US-05, scenario") | `class.puml` comment on `Administrator ..> Booking` | accept | My own error from the Task 2 correction round — US-05 is unblock, not usage review. Changed to "scenario (no story)" |
| 12 | Invent US-07 to cover Review Room Usage | `UC_Usage`, `Administrator.reviewUsage()` | **reject** | README explicitly forbids this: "a use case with nothing behind it is a finding, not a failure — write it down rather than inventing a story to paper over it" |
| 13 | Delete `Student.name`, `Administrator.name`, `Administrator.adminId` | class attributes | mostly reject | Names are already covered by declared assumption A8 (minimal identifying attributes); `adminId` must stay — it is Administrator's only identifier, and every other class has one |

## 7. Consistency table

One row for each of **R1–R4**, then one row for **every use case in your revised use-case
diagram**, spelled exactly as in the diagram, with the story ID it traces to.

| Requirement / story | Use case | Classes | Behaviour element |
| --- | --- | --- | --- |
| R1 | <use case> | <classes and attributes> | <message, guard or decision> |
| R2 | <use case> | <classes, note> | <message, guard or decision> |
| R3 | <use case> | <classes and attributes> | <message, guard or decision> |
| R4 | <use case> | <classes> | <message or action> |
| <US-01> | <Book room> | <Student, Booking, Room> | <message or action> |

---

## 8. Change log

At least **three** rows, and at least one for each required diagram (use case, class, your
behaviour diagram). "Before" is what the AI produced; "After" is what you submitted.

| # | Diagram | Before (AI's original) | After (your revision) | Reason |
| --- | --- | --- | --- | --- |
| 1 | <use case> | <before> | <after> | <rule, story or notation reason> |
| 2 | <class> | <before> | <after> | <reason> |
| 3 | <sequence / activity> | <before> | <after> | <reason> |

---

## 9. Checker output

Paste the complete output of `python tests/check_models.py`, then explain **every FAIL you are
keeping**. The same IDs go in `submission.yml` under `checker.kept_fails`. A FAIL you report and explain costs you nothing. One you hide costs the whole criterion.

```text
<paste the full output>
```

**FAILs I am keeping, and why:** <one line per check ID, or "none">

---

## 10. Conclusion (120–180 words)

<Which diagram did the AI get most wrong, and what exactly was wrong? Which error would have
reached the code if nobody had reviewed it? What did the critique find that you missed — and what
did it claim that was false? Be specific: "the AI got the multiplicities wrong" is worth nothing;
"the AI put 1..* on the Booking end, which says every room must already have a booking" is worth
everything.>
