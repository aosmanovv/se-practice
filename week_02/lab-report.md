# Lab report — Practice #02: The Prompt Is an Engineering Input

**Name:** 
**Group:**
**Date:**

> Fill in every section. **Do not delete or renumber the headings** — the grading pass reads them
> by number. If something did not happen, write "did not happen" and why; an empty section and a
> fabricated one are graded the same way.

---

## 1. The frozen experiment

| |          |
| --- |----------|
| AI assistant | Claude   |
| Exact model name | Sonnet 5 |
| Implementation language | Python   |
| Date of the runs |          |

**Non-Python students only** — paste your substituted Prompt B text here, so the substitution can
be checked:

```
(paste here, or write "n/a — used Python")
```

**Confirmations:**

- Each prompt was sent in a **fresh chat**: yes
- No follow-up questions were asked before Part 7: yes
- Every output was saved **before** any editing: yes

---

## 2. Prompt A — minimal

**Prompt sent** (should be exactly one sentence):

```
Write Python code to analyze student marks.
```

**Assumptions the AI made that I never gave it** — list them, one per line. A data format, a pass
threshold, a rounding rule, an input method, an invented feature all count.

1. no assumptions, it only asked 2 questions
2. 
3. 

**Questions it should have asked and did not:**

1. Do you have a specific data file with student marks, or should I write a general-purpose script with sample data?
2. What kind of analysis should the script perform?

**Is the function named `analyze_marks` with the required signature?** yes / no — if no, what is it
called: no, its haven't given any code

**First impression before testing** (one sentence — you will compare this with section 6 later):
I do not have any impression, because there is no code.
---

## 3. Prompt B — structured context

**Prompt sent** (paste it in full, including any substitutions):

```
You are a Python developer. Implement analyze_marks(marks, pass_mark=50). Return
average, highest, lowest, and pass_rate in a dictionary. Accept marks from 0 to 100;
raise ValueError for an empty list, non-numeric values, or out-of-range values. Use
no external libraries. Return code plus a short explanation.
```

**What B fixed compared to A:**

1. It is working code
2. It didn't ask any question

**What B still leaves open:**

1. Returns raw numbers with no formatting - no 2-decimal average, no 1-decimal pass rate with %

---

## 4. Prompt C — examples and tests

**What I appended to Prompt B:**

```
Example: analyze_marks([40, 60, 80], 50) → average 60, highest 80, lowest 40,
pass_rate 66.67. Include tests for: one mark, decimals, custom pass_mark, empty list,
text value, and marks below 0 or above 100. State any remaining assumptions before
the code.
```

**Tests the AI wrote for itself** — how many, and which situations do they cover?:
8 tests, covering every situation the prompt asked for.

| Situation | Covered by the AI's tests? |
| --- |-----------------------|
| one mark | Yes                   |
| decimals | Yes                      |
| custom pass_mark | Yes                      |
| empty list | Yes                      |
| text value | Yes                      |
| below 0 / above 100 | Yes                      |

**Do the AI's own tests pass against the AI's own code?** Yes

**Do they agree with the harness in section 6?** yes

**Assumptions C stated explicitly before the code:**

Booleans are rejected as marks even though bool is technically a subclass of int in Python (True/False aren't meaningful exam scores); the range check is inclusive of both 0 and 100; pass_mark comparison is inclusive (mark >= pass_mark counts as a pass); average and pass_rate are rounded to 2 decimal places, while highest/lowest are returned as-is (no rounding, since they're just the actual min/max values); and pass_mark itself isn't validated (I assumed the caller passes a sane threshold, since the spec only constrains marks).

---

## 5. Prompt D — my combined prompt

**The complete prompt I wrote** (one message, sent to a fresh chat):

```
You are a Python developer writing a small, well-tested utility function.

Implement:
    def analyze_marks(marks, pass_mark=50):

It must return a dictionary with exactly these keys: "average", "highest",
"lowest", "pass_rate".

Rules:
- marks is a list of numeric values (int or float), each expected to be in
  the inclusive range 0-100. A mark equal to pass_mark counts as passing
  (use >=, not >).
- Raise ValueError if: the list is empty, any value is not a real number
  (booleans do not count as numbers), or any value is outside 0-100.
- Round "average" and "pass_rate" to exactly 2 decimal places using
  standard rounding. Do not return unrounded floats.
- Use no external libraries — standard library only.
- Do not add a CLI, file reading, or any feature beyond this function.

Worked example:
analyze_marks([40, 60, 80], 50) → {"average": 60.0, "highest": 80,
"lowest": 40, "pass_rate": 66.67}

Before writing any code, state your assumptions explicitly as a short
list, separate from the code and its comments.
```

**What I deliberately added that A, B and C did not have:**

1. Explicit instruction to round average and pass_rate to 2 decimal places.
2. Explicit >= rule for pass_mark (a mark equal to it passes).
3. Explicit "state assumptions before the code" + a ban on extra scope (no CLI, no files).

**The ambiguity I found in the specification, and how I resolved it inside Prompt D:**
No prompt specified how to round average/pass_rate — B left it unrounded, 
C rounded only as a guess. I resolved it in Prompt D by explicitly requiring 
both values rounded to exactly 2 decimals.
---

## 6. Test results — the evidence

Six cases × four prompts. Verdicts are **PASS**, **FAIL** or **ERROR** only.

| # | Call | Required | A     | B    | C    | D    |
| --- | --- | --- |-------|------|------|------|
| 1 | `analyze_marks([40, 60, 80], 50)` | avg 60 · high 80 · low 40 · rate 66.67 | ERROR | PASS | PASS | PASS |
| 2 | `analyze_marks([100], 50)` | avg 100 · high 100 · low 100 · rate 100 | ERROR | PASS | PASS | PASS |
| 3 | `analyze_marks([49.5, 50], 50)` | avg 49.75 · high 50 · low 49.5 · rate 50 | ERROR | PASS | PASS | PASS |
| 4 | `analyze_marks([], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 5 | `analyze_marks([40, "60"], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| 6 | `analyze_marks([-1, 50, 101], 50)` | raises ValueError | ERROR | PASS | PASS | PASS |
| | **Totals** | | 0/6   | 6/6  | 6/6  | 6/6  |

**For every FAIL and ERROR above, one line: what was returned or raised instead.**

| Prompt | Case      | What actually happened         |
|--------|-----------|--------------------------------|
| A      | Each case | nothing, prompt a have no code |
### Pasted terminal output — all four runs

> This is the part that makes the table above count. Paste the **whole** output, unedited,
> including the header lines. A table with nothing behind it is not accepted.

**Prompt A**

```
ERROR: code\prompt_a.py defines no callable named 'analyze_marks'.
All six cases count as ERROR. Record that in lab-report.md.
```

**Prompt B**

```
========================================================================
analyze_marks harness — code/prompt_b.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.66666666666666
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks list cannot be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: non-numeric mark found: '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: mark out of range (0-100): -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_b.py)
========================================================================
```

**Prompt C**

```
========================================================================                                                                                                            
analyze_marks harness — code/prompt_c.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must be a non-empty list
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: non-numeric mark found: '60'
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: mark out of range (0-100): -1
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_c.py)
========================================================================
```

**Prompt D**

```
========================================================================
analyze_marks harness — code/prompt_d.py
tolerance for numeric comparison: 0.01
========================================================================
SIGNATURE: ok
------------------------------------------------------------------------
case 1  PASS   analyze_marks([40, 60, 80], 50)
          expect: average=60.0, highest=80, lowest=40, pass_rate=66.67
          got   : average=60.0, highest=80, lowest=40, pass_rate=66.67
------------------------------------------------------------------------
case 2  PASS   analyze_marks([100], 50)
          expect: average=100.0, highest=100, lowest=100, pass_rate=100.0
          got   : average=100.0, highest=100, lowest=100, pass_rate=100.0
------------------------------------------------------------------------
case 3  PASS   analyze_marks([49.5, 50], 50)
          expect: average=49.75, highest=50, lowest=49.5, pass_rate=50.0
          got   : average=49.75, highest=50, lowest=49.5, pass_rate=50.0
------------------------------------------------------------------------
case 4  PASS   analyze_marks([], 50)
          expect: ValueError
          got   : raised ValueError: marks must not be empty
------------------------------------------------------------------------
case 5  PASS   analyze_marks([40, '60'], 50)
          expect: ValueError
          got   : raised ValueError: mark '60' is not a real number
------------------------------------------------------------------------
case 6  PASS   analyze_marks([-1, 50, 101], 50)
          expect: ValueError
          got   : raised ValueError: mark -1 is outside the range 0-100
------------------------------------------------------------------------
RESULT  6 PASS · 0 FAIL · 0 ERROR   (code/prompt_d.py)
========================================================================
```

---

## 7. Scoring

0–2 per criterion, using the rubric in `README.md` Part 7.

| Criterion | A    | B    | C    | D     |
| --- |------|------|------|-------|
| Correctness (cases passed) | 0    | 2    | 2    | 2     |
| Requirement coverage | 0    | 2    | 2    | 2     |
| Verifiability (tests) | 0    | 0    | 2    | 2     |
| Assumptions stated | 0    | 1    | 1    | 2     |
| Noise (2 = none) | 0    | 2    | 2    | 2     |
| **Total / 10** | 0/10 | 7/10 | 9/10 | 10/10 |

**Prompt length, in words:** A 7 · B 44 · C 84 · D 163

**Words added per point gained** — B over A, C over B, D over C.
One line on what that ratio says:

The return on extra words drops sharply — the first jump in detail (B) bought a point roughly every 7 words, but by D over 100 words were spent to fix a single remaining edge case, showing most of the value came early and the rest is diminishing returns.

Words added per point gained:

| Transition | Words added | Points gained | Words per point |
| --- | --- | --- | --- |
| B over A | 37 | 5 | 7.4 |
| C over B | 40 | 2 | 20 |
| D over C | 107 | 1 | 107 | 
---

## 8. Conclusion — 150–200 words

Answer in this order: (1) which prompt scored best, and whether it is the one you would actually
use at work; (2) which single addition bought the most correctness, naming the exact case that
changed verdict; (3) what was pure noise; (4) the ambiguity and your resolution.

Name test cases and real returned values. "More detailed prompts work better" scores zero.

```

D scored highest (10/10), and it's close to what I'd actually use at work - 
but the full Fraction-based half-up rounding is more than I'd write for a first version; 
I'd start at C's level and add D's precision only if a real half-cent tie case appeared in production data.

The single addition that bought the most correctness was Prompt B's role, signature, and validation rules: 
A returned no function at all (ERROR on all 6 cases), while B jumped straight to 6/6 PASS, including case 6 
(analyze_marks([-1, 50, 101], 50)) correctly raising ValueError, which A couldn't even attempt.

Pure noise: D's `_round_half_up_2dp` via `Fraction`, plus its NaN/inf/complex-number handling.
None of the six official cases contain an exact rounding tie — case 1's 66.666... rounds to 66.67 
under ordinary rounding too — so this defensive machinery never changed a verdict.

The ambiguity was how to round `average`/`pass_rate`. B left it unrounded 
(case 1 passed only via 0.01 tolerance); D resolved it explicitly with round-half-up, 
which is more correct in principle but unverified by this test suite.

```

**Word count:**
176
---

## 9. Two questions for the debrief

Written before class, answered in class.

1. None of the six graded cases actually contain a rounding tie, 
so D's more "correct" round-half-up logic never changed a single verdict. 
Should test suites reward that kind of defensive correctness even when nothing in the suite exercises it?
2. B reached 7/10 with 44 words; D needed 191 words for the last 3 points. 
At what point does writing a longer prompt cost more time than just reading 
the AI's code and fixing it by hand?
