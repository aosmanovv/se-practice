# Traceability — use cases → stories → criteria

One row per use case. All six rows stay, even the ones with nothing behind them: an empty cell is a
finding you report, not a failure you hide. Use real IDs, comma-separated; write `none` where there
is nothing.

| Use case | Stories | Acceptance criteria | Notes                                                                                                                                                                                                        |
| --- | --- | --- |--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| UC-01 View availability | US-01 | TBD |                                                                                                                                                                                                              |
| UC-02 Book room | US-02 | TBD |                                                                                                                                                                                                              |
| UC-03 Cancel booking | US-03 | TBD |                                                                                                                                                                                                              |
| UC-04 Block or unblock room | US-04, US-05 | TBD |                                                                                                                                                                                                              |
| UC-05 Review usage | US-08 | — | Added after diagram review: the actor table ("watch how they are used") and the justified Admin→Review usage association showed this is a genuine goal, not a gap. No AC written — US-08 wasn't among the three stories selected for acceptance criteria. |
| UC-06 Send confirmation | — | — | Gap: system-triggered side effect of booking/cancelling, not an actor-initiated goal — matches UC-06's own note, "the system confirms." |
**Stories that belong to no use case:** none.

**What the gaps tell you:** Only one real gap now — UC-06. It's the sole use case among the six that isn't something a Student or Administrator initiates as a personal goal.
**Stories that belong to no use case:** none - all 7 final stories trace to a use case (US-01→UC-01, US-02/US-06→UC-02, US-03/US-07→UC-03, US-04/US-05→UC-04).

**What the gaps tell you:** The gap sits on the use-case side, not the story side: UC-05 and UC-06 have no story because neither is an actor-initiated goal, usage review is reporting, and confirmation is a system side-effect of booking/cancelling, not something anyone "wants" to do.