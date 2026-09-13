# Week 01 — Manual vs AI: Comparison

**Name:**
**Group:**
**Date:**

---

## 1. Facts

| | Manual (Part 1) | Rocket (Part 2) |
| --- |-----------------|-----------------|
| Language / stack used | Python          | Js              |
| Time to first version that ran | 30              | 10              |
| Time to all 4 test cases passing | ~35             | 15~             |
| Number of attempts / prompts needed | 6               | 3               |
| Lines of code you actually wrote | 53              | 0               |
| Did it handle invalid marks (case B)? | Yes             | Yes             |
| Did it handle an empty list (case D)? | Yes             | Yes             |
| Did it use the ≥ 50 pass threshold? | Yes             | Yes             |
| Output format matches the spec? | Yes             |                 |
| Can you explain every line of it? | Yes             | No              |

## 2. Test results

| Case | Input | Manual output                                                            | Rocket output                | Spec says | Match? |
| --- | --- |--------------------------------------------------------------------------|------------------------------| --- |--------|
| A | `85, 23, 45, 90, 92` | `Valid marks: 5 Average: 67.00 Highest: 92 Lowest: 23 Pass rate: 60.0%`  | `67.00 92 23 60.0% 5 27.92`  | avg 67.00 · high 92 · low 23 · pass 60.0% | `Both`   |
| B | `88, 47, -5, 101, abc, 73, 50, , 100` | `Valid marks: 5 Average: 71.60 Highest: 100 Lowest: 47 Pass rate: 80.0%` | `71.60 100 47 80.0% 5 20.73` | avg 71.60 · high 100 · low 47 · pass 80.0% | `Both`      |
| C | `10, 20, 30` | `Valid marks: 3 Average: 20.00 Highest: 30 Lowest: 10 Pass rate: 0.0%`   | `20.00 30 10 0.0% 3 8.16`      | avg 20.00 · high 30 · low 10 · pass 0.0% |  `Both`      |
| D | `abc, , xyz` | `No valid marks — cannot compute statistics.`                            | `No marks yet`                 | clear message, no crash |      `Both`  |
    
## 3. What the AI added that I never asked for

- Picked Next.js + TypeScript as the stack on its own — I never said anything about technology, just described the behavior.
- Made the pass threshold (50) into a slider you can drag between 0-100, with quick presets (40/50/60). I only wanted a fixed rule.
- Added a whole "Grade Band Distribution" chart (A/B/C/D/F bars) that I didn't ask for at all.
- Added a standard deviation stat, also not requested.
- Calls the entries "students" / "Total Students" even though I picked "quick utility for experimenting with mark data" as the use case, not something student-related.

## 4. What the AI got wrong or silently skipped

- Honestly, on the 4 required test cases it didn't get anything wrong — all four (A, B, C, D) matched the spec exactly, including filtering out -5, 101, abc in case B and handling the empty case D without crashing. I expected it to break on B or D like the README warns, but it didn't.

## 5. ~~The defect I asked Rocket to fix~~



---

## 6. Reflection (200–300 words)

Answer all four, in your own words:

1. Which parts of the work did the AI genuinely speed up?
2. Where did the AI cost you time, or give you something that looked right but was not?
3. Which of these two artefacts would you be willing to put your name on, and why?
4. What must a human engineer still be responsible for after this experiment?

<!-- Write your reflection below this line -->

Building the same tool twice showed me wsat AI can speed up and what it cannot. Rocket built a full working web app from just one sentence, in a few minutes. It chose the technology, made the design, added a chart, and even used a good validation rule (0-100) without me asking for it. Writing the same program by hand in Python took me longer, because I had to think about the logic myself, how to catch bad input, how to round the numbers correctly.

I did not find anything that looked correct but was actually wrong. All four test cases gave the same numbers as expected, even the difficult ones, case B with invalid values, and case D with no valid marks at all. I expected the AI version to fail on these cases, like the instructions warned, but it did not. I think this is because the task itself is small and simple, not because AI is always this reliable. I would not expect the same result with a bigger project.

Between the two versions, I would still put my name on the manual one first. I can explain every line of my own code, and I know exactly what it does with any input. With the Rocket app, I only trust it because I tested it against the spec, not because I understand the code inside it.
