# SIS #01 — Software Engineering Fundamentals, With an AI in the Loop

<!--
  This is the only file you write your report in. README.md tells you what goes where.

  Rules the checker relies on:
  - Do not delete, rename or renumber the ## headings, the ### headings, or the **Label:** words.
  - Replace every "(write here)" and "(paste here)". None may be left when you submit.
  - Comments like this one are ignored by the word counter. Delete them or leave them.
-->

**Topic:** 1.1


---

## 1. Scenario

<!-- 100–150 words, labels included. One small scenario, used in every prompt and in your
     whole answer. Anything fictional is labelled in Assumptions. -->

**Question:** What does a customer need from professional software delivery beyond the program code itself?

**Users:** Three lab assistants and about 60 students of a university robotics lab who book shared equipment such as a 3D printer and oscilloscopes.

**Problem:** Bookings live in a Telegram chat, which causes double bookings. A student developer offers a working prototype and nothing else.

**Constraints:** (1) One developer and three weeks. (2) No budget, only free university hosting.

**Risk:** A bug fix overwrites existing bookings and nobody can restore them, so the lab loses trust and returns to the chat.

**Assumptions:** Fictional: the lab, its equipment, all numbers, the Telegram chat, the three-week limit, the free hosting and the developer's situation.

## 2. Analysis

<!-- 350–400 words. Your answer to the question, the trade-offs, and how it applies to your
     scenario. Explain at least two engineering decisions and why they fit the scenario. -->

A working program only proves that a booking can be made. The customer needs more: reasons to believe the system keeps running, can be fixed safely and can be recovered after mistakes. Here the customer is the robotics lab, which decides whether to keep it; students are just users. By “beyond the code” I mean hosting, account access, data protection, documentation and handover. That definition is my own reasoning, not a checked source.
Lesson #01 (slide 44) says a prototype ignores non-functional requirements like error handling and security, so it is thrown away or knowingly hardened. I take that to mean hardening is planned delivery work.
- Decision 1: copy the data before every update and back it up regularly. The main risk is a fix that overwrites bookings, and rolling back the code would not return them, because they live in the data. Four points need agreement: who makes backups (the developer, then a named assistant), how often (daily, an assumption), where they are kept (outside the free hosting), and how restores are tested (restore into a copy, compare bookings). The lab left Telegram over double bookings and would likely leave again if bookings vanished. The hosting is fictional, so whether data survives a restart is a thing to check, not a finding.
- Decision 2: run alongside Telegram at first. Telegram stays as fallback, only future bookings are entered, and the old chat remains an archive (an assumption). A failed switch then costs little, which suits one developer with three weeks.
- Decision 3: separate operating from changing. Assistants can check backups, test a restore and contact IT; fixes and releases belong to the developer, then a named successor. Lesson #02 (slide 20) names the difficulty of maintaining a system after the original team has dispersed, because little is written down. It prescribes no handover note, so a short one listing account and hosting owners is my inference.
The trade-off is time: hours on backups, restore tests and a guide are not spent on features. I rank work by its effect on lost bookings, how hard a mistake is to undo and dependence on others, without effort estimates. So conflict-free booking, a data copy before updates, tested restores and a short guide come first; polished screens and growth wait. Delivery cannot guarantee trust, only reduce risk and speed recovery.

## 3. Review

<!-- 250–300 words. What Prompt B's critique said and what you did with it; your two source
     checks and your two substantive revisions, each with a reason. Point at the rows of the
     tables in section 9 ("verification row 2", "change-log row 1"). -->

Prompt B returned thirteen concerns, and I weighed them as claims, not facts. I accepted seven: points 1, 2, 4, 7, 8, 10 and 12. Rolling back code does not restore lost data. My trust argument was backwards. 
I had mixed up the customer and the users, named no owner, skipped a parallel run, kept backups vague, demanded moving the whole chat history without support, and confused operating the system with changing it.
The other six (3, 5, 6, 9, 11, 13) I accepted only in part, and I pushed back on three. On point 3, delivery can’t guarantee trust, but a customer needn’t pay money, so the no-budget objection fails. On point 5, priorities need criteria, yet the reviewer’s hour figures were invented, so I used none. On point 13, my draft is nearer 400 words than 440, and Prompt B never saw my five ideas, so that remark had no basis.
I also checked sources. Verification row 1 tested the prototype claim against Lesson #01, slide 44. I kept it, though the slide covers only error handling and security;
that the lab can rely on the system is my inference. Row 2 tested the handover claim against Lesson #02, slide 20. I softened it, since the slide names the maintenance problem but prescribes no handover note.
Two revisions followed. Change-log row 1 now requires a data copy before every update instead of keeping the previous version, because the risk lives in the data. 
Row 2 now says delivery reduces risk and speeds recovery, not that the customer buys trust. Both appear in section 2. Hosting, login options and data-protection rules remain unverified, so I present them as open conditions.

## 4. Conclusion

<!-- 100–150 words. Your recommendation for the scenario and its main limitation. -->

I’d treat the prototype as a starting point, nothing more. 
What the lab should ask for is a small package it can actually rely on. 
Before every update, make a copy of the data. Keep regular backups outside the hosting, 
and test that a restore really works. Run the new system alongside Telegram for a while, 
so nobody is stuck if it fails. Name a person responsible for the accounts and the hosting, 
and write a short guide for the assistants. Nice screens and growth can wait.
My evidence is thin, though. I checked only two lecture slides, and they show the problem better 
than they support these fixes. Hosting, login options, data-protection rules, backup frequency and 
whether the assistants will run the system are all unconfirmed. University IT and the lab should 
settle them before the plan is final.

## 5. Reflection

<!-- 150–200 words. NOT part of the main total. Written by you, not by the assistant:
     what helped, what you changed, what you learned. Specific beats flattering. -->

My own five ideas were all about the product: design, relevance, potential, functionality, security. Nothing about recovery, tests or handover. The first AI draft pointed that out, and it was the most useful moment of the whole task, because it showed me the question was about delivery, not about having a good product.
The critique itself helped less than I hoped. Some points were fair, mainly that rolling back code won’t bring back lost bookings. But the reviewer also made up hour estimates and claimed nobody buys anything without a budget. I rejected both. Now I read an AI critique as one more claim to check.
Checking two slides changed how I treat AI sentences. Slide 44 backed up the prototype claim. Slide 20 only named a maintenance problem and said nothing about a handover note, so I softened that line.

My biggest edit was a single sentence: 
“keep the previous version” became “make a data copy before 
every update.” What I still can’t say is how free hosting really behaves. 
I never checked it.

## 6. References

<!-- Full references, one per line, each starting with "- ". Only sources you actually opened.
     Every URL used in the verification table must also appear here. Example:
     - Sommerville, I. (2016). Software Engineering, 10th ed., Global Edition. Pearson. Ch. 1.
-->

- Kydyralin, M. (2026). AI-Driven Software Engineering, Lesson #01 — Lecture: Introduction to Software Engineering & Software Processes. Fall 2026.
- Kydyralin, M. (2026). AI-Driven Software Engineering, Lesson #02 — Lecture: Agile Software Development & Requirements Engineering. KBTU School of IT and Engineering, Fall 2026.

## 7. Appendix A — Initial outline

1. Besides code, the product's design matters: the booking screens must be easy to use for lab assistants and students.
2. The idea must be relevant: it should solve a problem users really have now, which is double bookings in the Telegram chat.
3. The idea needs potential: after the first version it should be able to grow, for example to more equipment or more labs.
4. The product needs well-chosen functionality: only the features users really need, such as booking and cancelling.
5. Cybersecurity matters: user accounts and booking data must be protected.

## 8. Appendix B — AI exchanges

<!-- Complete prompts and complete responses, as text — never screenshots. Paste each inside
     the fenced block that follows its label. If a response itself contains ``` lines, open
     and close that block with ~~~~ instead. You may add B4, B5 … after B3 if you ran more. -->

### B1 — Draft (Prompt A)

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-10-10
- **Purpose:** contextual draft

<!-- Model: the exact model with its version, as the tool shows it (e.g. "GPT-5 Thinking",
     "Claude Sonnet 4.5"). If the tool does not show it, write: not displayed
     Date: YYYY-MM-DD -->

**Prompt:**

```text
Act as a software engineering tutor. Help me analyze topic 1.1 (Professional software delivery): What does a customer need from professional software delivery beyond the program code itself? for a first-year-level university assignment.

My scenario is a fictional booking system for a university robotics lab. Users: three lab assistants and about 60 students who book shared equipment such as a 3D printer and oscilloscopes. Problem: bookings live in a Telegram chat, which causes double bookings, and a student developer offers a working prototype and nothing else. Constraints: (1) one developer and three weeks; (2) no budget, only free university hosting. Risk: a bug fix overwrites existing bookings and nobody can restore them, so the lab loses trust and returns to the chat. My initial ideas are (1) Besides code, the product's design matters: the booking screens must be easy to use for lab assistants and students. (2) The idea must be relevant: it should solve a problem users really have now, which is double bookings in the Telegram chat. (3) The idea needs potential: after the first version it should be able to grow, for example to more equipment or more labs. (4) The product needs well-chosen functionality: only the features users really need, such as booking and cancelling. (5) Cybersecurity matters: user accounts and booking data must be protected. Draft a 400–500 word explanation using these details.

Separate facts from assumptions. Explain trade-offs and identify claims I should verify. Do not invent quotations, references or page numbers.
```

**Response:**

```text
## Tutor notes first

Your five ideas are good, but they mostly describe what makes a *product* good (usability, relevance, growth potential, focused features). Topic 1.1 asks what the customer needs *beyond the code*. Your scenario answers that directly: the main risk is lost bookings, so the customer needs backups, safe releases, hosting, handover and documentation. None of your ideas covers recovery, and your draft will be stronger if it leads with that. I've kept your five ideas but regrouped them.

## Draft (about 440 words)

A working prototype shows that bookings can be made. Professional delivery shows that the lab can rely on the system. In this scenario, the three lab assistants and about 60 students need more than code.

**Protection and recovery of data.** The main risk is that a bug fix overwrites bookings that nobody can restore. The customer therefore needs regular backups, a restore procedure that has actually been tested, and a careful release process. For example, a fix can be tried on a copy of the data first, and the previous version kept so the change can be undone. Without this, a single mistake could destroy the trust that made the lab consider leaving Telegram in the first place.

**A system that stays available and supported.** The software must run somewhere dependable, and the assistants must know where it is hosted and whom to contact when something fails. Because only free university hosting is available, the developer should find out what that hosting offers and plan around its limits.

**A smooth move from the current process.** Existing reservations in the Telegram chat must be transferred, and users need brief guidance. Short documentation for assistants (how to cancel a booking or resolve a conflict) and a handover note for whoever maintains the system later are part of delivery. A single student developer is a single point of failure.

**A product that fits the need.** The booking screens should be easy for both assistants and students, and the system should solve the real problem now: double bookings. A small feature set (book, cancel, view availability) is also easier to test and support within three weeks. Designing for more equipment or labs later is valuable, but only if it does not take time from the essentials.

**Proportionate security.** Accounts and booking data need protection. Reusing university login, if permitted, avoids building a new password system.

**Trade-offs.** With one developer and three weeks, every hour spent on backups, testing and documentation is an hour not spent on features or growth. A sensible priority is a narrow, reliable core: conflict-free booking, backups with a tested restore, and a short user guide. Growth features can wait. Reusing university login saves effort but depends on what the university allows. A simple design is easier to maintain but may need rework when more labs join.

In short, the customer is buying trust, not just a program. Delivery must make sure that trust survives mistakes.

## Facts vs. assumptions

**Facts (given in your scenario):** the user numbers, Telegram double bookings, a prototype with nothing else, one developer, three weeks, no budget, free hosting, and the stated risk.

**Assumptions I made:**
- The prototype has no backups, documentation or release process ("nothing else" suggests this, but it isn't stated).
- Existing bookings need to be migrated.
- University login is an option.
- The data is small and the assistants will maintain the system after handover.

## Claims to verify

- What backup and uptime guarantees the free university hosting actually provides (ask IT).
- Whether the university allows single sign-on for a student-built tool.
- Whether storing student names and bookings triggers any university data-protection rules.
- Your course's own definition of "professional delivery". Use its terminology and cite your lecture or textbook yourself, since I haven't cited any source.

## Questions to think about

1. Which single deliverable would best protect against the overwriting risk?
2. If you had to cut one item to fit three weeks, what goes, and what is the cost?
```

### B2 — Critique (Prompt B)

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-10-10
- **Purpose:** critical review of the draft

**Prompt:**

```text
Review the draft below against my chosen question and scenario. Identify inaccuracies, missing reasoning, vague claims and unsupported assumptions.
For each concern, explain why it matters and how I could check it. Include a counterexample or alternative interpretation. Do not rewrite the answer yet.
Question: What does a customer need from professional software delivery beyond the program code itself?. Scenario: A fictional booking system for a university robotics lab. Users: three lab assistants and about 60 students who book shared equipment such as a 3D printer and oscilloscopes. Problem: bookings live in a Telegram chat, which causes double bookings, and a student developer offers a working prototype and nothing else. Constraints: (1) one developer and three weeks; (2) no budget, only free university hosting. Risk: a bug fix overwrites existing bookings and nobody can restore them, so the lab loses trust and returns to the chat. Draft: ## Tutor notes first

Your five ideas are good, but they mostly describe what makes a *product* good (usability, relevance, growth potential, focused features). Topic 1.1 asks what the customer needs *beyond the code*. Your scenario answers that directly: the main risk is lost bookings, so the customer needs backups, safe releases, hosting, handover and documentation. None of your ideas covers recovery, and your draft will be stronger if it leads with that. I've kept your five ideas but regrouped them.

## Draft (about 440 words)

A working prototype shows that bookings can be made. Professional delivery shows that the lab can rely on the system. In this scenario, the three lab assistants and about 60 students need more than code.

**Protection and recovery of data.** The main risk is that a bug fix overwrites bookings that nobody can restore. The customer therefore needs regular backups, a restore procedure that has actually been tested, and a careful release process. For example, a fix can be tried on a copy of the data first, and the previous version kept so the change can be undone. Without this, a single mistake could destroy the trust that made the lab consider leaving Telegram in the first place.

**A system that stays available and supported.** The software must run somewhere dependable, and the assistants must know where it is hosted and whom to contact when something fails. Because only free university hosting is available, the developer should find out what that hosting offers and plan around its limits.

**A smooth move from the current process.** Existing reservations in the Telegram chat must be transferred, and users need brief guidance. Short documentation for assistants (how to cancel a booking or resolve a conflict) and a handover note for whoever maintains the system later are part of delivery. A single student developer is a single point of failure.

**A product that fits the need.** The booking screens should be easy for both assistants and students, and the system should solve the real problem now: double bookings. A small feature set (book, cancel, view availability) is also easier to test and support within three weeks. Designing for more equipment or labs later is valuable, but only if it does not take time from the essentials.

**Proportionate security.** Accounts and booking data need protection. Reusing university login, if permitted, avoids building a new password system.

**Trade-offs.** With one developer and three weeks, every hour spent on backups, testing and documentation is an hour not spent on features or growth. A sensible priority is a narrow, reliable core: conflict-free booking, backups with a tested restore, and a short user guide. Growth features can wait. Reusing university login saves effort but depends on what the university allows. A simple design is easier to maintain but may need rework when more labs join.

In short, the customer is buying trust, not just a program. Delivery must make sure that trust survives mistakes.

## Facts vs. assumptions

**Facts (given in your scenario):** the user numbers, Telegram double bookings, a prototype with nothing else, one developer, three weeks, no budget, free hosting, and the stated risk.

**Assumptions I made:**
- The prototype has no backups, documentation or release process ("nothing else" suggests this, but it isn't stated).
- Existing bookings need to be migrated.
- University login is an option.
- The data is small and the assistants will maintain the system after handover.

## Claims to verify

- What backup and uptime guarantees the free university hosting actually provides (ask IT).
- Whether the university allows single sign-on for a student-built tool.
- Whether storing student names and bookings triggers any university data-protection rules.
- Your course's own definition of "professional delivery". Use its terminology and cite your lecture or textbook yourself, since I haven't cited any source.

## Questions to think about

1. Which single deliverable would best protect against the overwriting risk?
2. If you had to cut one item to fit three weeks, what goes, and what is the cost?
```

**Response:**

```text
The two biggest problems are that the draft treats "keep the old version" as if it protects data, and that it never says why these items count as "beyond the code". Most of the rest follows from those two.

## Inaccuracies and logic errors

**1. Rolling back the program is treated as recovering the data**
- **Why it matters:** The scenario's risk is that a bug fix overwrites bookings. Keeping the previous version "so the change can be undone" restores the code, not the lost data. This is the draft's central example, so the error weakens the whole section.
- **How to check:** Trace the scenario's failure step by step: fix deployed, data changed, then ask what restores the bookings.
- **Counterexample:** A fix that runs a database migration and corrupts rows. Rolling back the code leaves the corrupted rows in place. Only a snapshot taken before the release, or a reversible migration, helps.

**2. The trust argument is reversed**
- **Why it matters:** The draft says a mistake could destroy "the trust that made the lab consider leaving Telegram." The lab wanted to leave because of double bookings, not because it trusted something. The scenario's risk is that the lab loses trust in the new system and goes back to the chat. A wrong causal chain in the conclusion undermines the argument.
- **How to check:** Re-read the Problem and Risk lines and mark who trusts what.
- **Alternative reading:** The lab may tolerate one visible bug but not silent data loss. If so, the point is about how failures are handled, not whether trust exists.

**3. The closing claims are overstated**
- **Why it matters:** "The customer is buying trust" and "delivery must make sure trust survives mistakes" go beyond what delivery can do. The scenario has no budget, so nobody is buying anything, and delivery can only limit damage and speed up recovery.
- **How to check:** Ask whether any item in the draft guarantees trust, or only reduces risk.
- **Counterexample:** A flawless delivery still loses trust if one assistant misreads the guide and cancels the wrong booking.

## Missing reasoning

**4. "Beyond the code" is never defined, and the customer is never identified**
- **Why it matters:** The draft lists needs without a principle linking them (for example, software must be operated, changed and recovered over time). It also blurs the customer with the users. The lab, probably represented by the assistants or a lab head, is the customer. The 60 students are users.
- **How to check:** Ask whether a reader could predict a sixth item from your principle. If not, the list is just a list.
- **Alternative interpretation:** If the course defines "professional delivery" through a specific framework such as lifecycle stages, the list should follow that structure.

**5. The priority order has no stated criteria**
- **Why it matters:** "A sensible priority is a narrow, reliable core" is asserted, not argued. There are no effort estimates, so the claim that every hour on backups is an hour lost from features is unquantified.
- **How to check:** Rough-estimate each item in hours (a scheduled export plus one restore drill may take half a day) and see whether the trade-off is as sharp as claimed.
- **Counterexample:** If backups cost four hours out of roughly 100 available, "backups versus features" is a false dilemma and the real cut lies elsewhere.

**6. The "product fits the need" paragraph drifts off the question**
- **Why it matters:** Your tutor note says usability, relevance and growth describe the product, not what's beyond the code, yet a full section keeps them. It reads as padding and dilutes the focus on recovery.
- **How to check:** Test each sentence against the question: is this something the customer needs besides the program?
- **Alternative reading:** Agreeing scope and acceptance criteria with the customer does count as delivery. The paragraph could be justified, but only if it's framed that way, not as screen design.

**7. Several delivery needs are missing entirely**
- **Why it matters:** The draft omits ownership and access (who holds the repository, hosting login and admin accounts), a parallel-run period with Telegram as fallback, testing of the double-booking rule itself, and what support exists after week three. The parallel run speaks directly to the "returns to the chat" risk.
- **How to check:** Walk the timeline from week 3 to six months later and list what could stop the lab using the system.
- **Counterexample:** The developer graduates and the only hosting credentials are in their personal account. Documentation exists, but nobody can access the system.

## Vague claims

**8. "Regular backups", "careful release process", "plan around its limits"**
- **Why it matters:** None of these can be acted on or marked as achieved. Frequency, storage location, restore time and ownership are all unspecified.
- **How to check:** For each phrase, ask who does what, how often and where, and how you'd know it worked.
- **Counterexample:** Daily backups stored on the same free server are lost with the server. Daily frequency also means up to a day of bookings lost, which may or may not be acceptable.

**9. Hosting limits are not specific**
- **Why it matters:** Free hosting often has an ephemeral filesystem, sleeping instances or storage caps. If the data lives in a file that a redeploy wipes, the hosting itself recreates the scenario's risk.
- **How to check:** Read the hosting's documentation or ask IT: persistence, backups, uptime, redeploy behaviour.
- **Alternative:** If IT already backs up the hosting, your own backup duty shrinks, though you'd still want your own export.

## Unsupported assumptions

**10. Existing Telegram reservations "must be transferred"**
- **Why it matters:** The draft lists this as an assumption but then states it as a requirement. Migrating free-text chat history is costly in a three-week window.
- **How to check:** Ask the assistants how far ahead bookings are made and whether past bookings matter.
- **Alternative:** Only future bookings need entering, perhaps by the assistants at a cutover date, and the old chat stays as an archive.

**11. University login "avoids building a new password system" and "saves effort"**
- **Why it matters:** This is stated twice with no support, and it sits oddly under "proportionate" security. Integrating with a university identity provider may need IT approval and lead time.
- **How to check:** Ask IT whether single sign-on is available to student projects and how long onboarding takes.
- **Counterexample:** Approval takes two weeks, so a simple email-based login for 63 known users is the cheaper and safer route.

**12. Who maintains the system is inconsistent**
- **Why it matters:** The body mentions a handover note for "whoever maintains the system later," but the assumptions list says the assistants will. Assistants can operate the system (cancel a booking, restore a backup). Maintaining code is a different skill, and conflating the two weakens the handover point.
- **How to check:** Separate "operate" from "change the code" and name an owner for each.
- **Alternative:** The lab may need no code maintainer at all if the system is deliberately small and frozen after delivery.

**13. Tutor-note claims can't be verified from what's here**
- **Why it matters:** The note refers to "your five ideas," "Topic 1.1" and "about 440 words." The five ideas aren't in this document, and by my rough count the draft body is nearer 400 words.
- **How to check:** Run a word counter on the final text and compare against your course's actual wording of Topic 1.1.
- **Alternative:** If the word target comes from your task brief, a mismatch could cost marks.

I haven't rewritten anything. Tell me when you want that step.
```

### B3 — Revision (Prompt C)

- **Tool:** Claude (claude.ai)
- **Model:** Claude Sonnet 5.5
- **Date:** 2026-10-10
- **Purpose:** revision using my decisions and verified evidence

**Prompt:**

```text
Revise the draft using my review decisions and source notes below. Keep the answer relevant to my scenario and preserve uncertainty where evidence is limited.

My decisions: Accepted: (1) rolling back the code does not restore lost data, so a copy of the data must be taken before each update; (2) the trust argument was reversed, because the lab wanted to leave Telegram because of double bookings, and the risk is that it returns to the chat after losing bookings; (4) define what "beyond the code" means and separate the customer (the lab) from the users (the students), and because I have not checked a source for this principle I will present it as my own reasoning; (7) add access and ownership of accounts and hosting, and a parallel run with Telegram as a fallback; (8) make backups concrete: who does them, how often, where they are stored and how the restore is tested; (10) only future bookings are transferred and the old chat stays as an archive, as an assumption; (12) separate operating the system from changing the code and name an owner for each. Qualified: (3) delivery can reduce risk and speed up recovery but cannot guarantee trust, and I reject the argument that nobody is buying anything because there is no budget; (5) priorities need stated criteria, but the hour figures in the critique are invented, so any effort figures are fictional assumptions; (6) keep the product paragraph but reframe it as agreeing scope and acceptance criteria with the lab; (9) the hosting is fictional, so state it as a condition: first find out whether data survives a restart; (11) it is not proven that university login saves effort, and it is not proven that email login is safer, so leave login as an option to check with IT; (13) I agree the draft body is about 400 words, not 440, but I reject the remark about "five ideas" because the review prompt did not include them.

Verified evidence: (A) KBTU School of IT and Engineering (2026), AI-Driven Software Engineering, Lesson #01 — Lecture, slide 44 "Prototyping and incremental delivery": a prototype ignores non-functional requirements (no error handling, no security, weak quality) and must be thrown away or knowingly hardened. Decision: keep. (B) Kydyralin, M. (2026), AI-Driven Software Engineering, Lesson #02 — Lecture, slide 20 "Practical problems with agile methods", card 4 "Life after the team": maintaining a system once the original team has dispersed is hard because little is written down. The slide names the problem but does not prescribe a handover note. Decision: qualify.

Draft: ## Tutor notes first

Your five ideas are good, but they mostly describe what makes a *product* good (usability, relevance, growth potential, focused features). Topic 1.1 asks what the customer needs *beyond the code*. Your scenario answers that directly: the main risk is lost bookings, so the customer needs backups, safe releases, hosting, handover and documentation. None of your ideas covers recovery, and your draft will be stronger if it leads with that. I've kept your five ideas but regrouped them.

## Draft (about 440 words)

A working prototype shows that bookings can be made. Professional delivery shows that the lab can rely on the system. In this scenario, the three lab assistants and about 60 students need more than code.

**Protection and recovery of data.** The main risk is that a bug fix overwrites bookings that nobody can restore. The customer therefore needs regular backups, a restore procedure that has actually been tested, and a careful release process. For example, a fix can be tried on a copy of the data first, and the previous version kept so the change can be undone. Without this, a single mistake could destroy the trust that made the lab consider leaving Telegram in the first place.

**A system that stays available and supported.** The software must run somewhere dependable, and the assistants must know where it is hosted and whom to contact when something fails. Because only free university hosting is available, the developer should find out what that hosting offers and plan around its limits.

**A smooth move from the current process.** Existing reservations in the Telegram chat must be transferred, and users need brief guidance. Short documentation for assistants (how to cancel a booking or resolve a conflict) and a handover note for whoever maintains the system later are part of delivery. A single student developer is a single point of failure.

**A product that fits the need.** The booking screens should be easy for both assistants and students, and the system should solve the real problem now: double bookings. A small feature set (book, cancel, view availability) is also easier to test and support within three weeks. Designing for more equipment or labs later is valuable, but only if it does not take time from the essentials.

**Proportionate security.** Accounts and booking data need protection. Reusing university login, if permitted, avoids building a new password system.

**Trade-offs.** With one developer and three weeks, every hour spent on backups, testing and documentation is an hour not spent on features or growth. A sensible priority is a narrow, reliable core: conflict-free booking, backups with a tested restore, and a short user guide. Growth features can wait. Reusing university login saves effort but depends on what the university allows. A simple design is easier to maintain but may need rework when more labs join.

In short, the customer is buying trust, not just a program. Delivery must make sure that trust survives mistakes.

## Facts vs. assumptions

**Facts (given in your scenario):** the user numbers, Telegram double bookings, a prototype with nothing else, one developer, three weeks, no budget, free hosting, and the stated risk.

**Assumptions I made:**
- The prototype has no backups, documentation or release process ("nothing else" suggests this, but it isn't stated).
- Existing bookings need to be migrated.
- University login is an option.
- The data is small and the assistants will maintain the system after handover.

## Claims to verify

- What backup and uptime guarantees the free university hosting actually provides (ask IT).
- Whether the university allows single sign-on for a student-built tool.
- Whether storing student names and bookings triggers any university data-protection rules.
- Your course's own definition of "professional delivery". Use its terminology and cite your lecture or textbook yourself, since I haven't cited any source.

## Questions to think about

1. Which single deliverable would best protect against the overwriting risk?
2. If you had to cut one item to fit three weeks, what goes, and what is the cost?

Show what you changed and why. Use only the sources I supplied. Flag remaining gaps instead of inventing details.
```

**Response:**

```text
## Tutor notes first

Your scenario answers what the customer needs *beyond the code*: the main risk is lost bookings, so the draft should lead with recovery, safe updates, ownership and handover. Product qualities such as usability and growth come after that. I've removed my earlier remark about "five ideas", since I can't see them in what you gave me.

## Revised draft (about 430 words)

**What "beyond the code" means.** Here it means everything the lab needs for the system to keep working and to recover from mistakes: hosting, account access, backups, safe updates, documentation and handover. This is my own reasoning, not a checked source. The customer is the lab, which decides whether to keep using the system. The users are the students who book through it.

**From prototype to something relied on.** The course lecture says a prototype ignores non-functional requirements (no error handling, no security, weak quality) and must be thrown away or knowingly hardened (KBTU School of IT and Engineering, 2026, Lesson #01, slide 44). Here the lab would be relying on it, so the hardening has to be deliberate.

**Protecting data.** Rolling back the code does not bring back bookings that an update overwrote. So a copy of the data is taken before every update. Regular backups need four decisions, to be agreed with the lab:
- **Who:** the developer until handover, then a named assistant.
- **How often:** for example daily (an assumption).
- **Where:** somewhere outside the hosting itself.
- **How the restore is tested:** restore into a copy and check that bookings match.

On the free hosting, first find out whether data survives a restart. If it doesn't, backups become more urgent.

**Why this matters for trust.** The lab wanted to leave Telegram because of double bookings. The risk is that it goes back to the chat after losing bookings in the new system. Good delivery can reduce that risk and speed up recovery, but it cannot guarantee trust.

**Access and transition.** The lab should know who owns the accounts and the hosting, so the developer is not the only person holding access. Run the system in parallel with Telegram at first, with Telegram as the fallback. Only future bookings are transferred, and the old chat stays as an archive (an assumption).

**Operating vs. changing.** These are separate jobs with separate owners:
- **Operating** (checking backups, testing restores, contacting IT): the lab assistants, as an assumption.
- **Changing the code** (fixes, releases): the developer, then a named successor.

A lecture names the difficulty of maintaining a system once the original team has dispersed, because little is written down (Kydyralin, 2026, Lesson #02, slide 20). It does not prescribe a handover note. Recommending one is my own inference.

**Scope with the lab.** Agree scope and acceptance criteria with the lab: no double bookings, cancel, view availability, and a restore test that passes.

**Login.** University login or email login is an option to check with IT. I have no evidence that either saves effort or is safer.

**Trade-offs.** Rank work by its effect on lost bookings, how hard a mistake is to undo, relative effort, and dependence on others. I give no hour estimates. A sensible core is conflict-free booking, a data copy before updates, backups with a tested restore, and a short user guide. Growth features can wait, and a simple design may need rework when more labs join.

## What I changed and why
- **(1)** Added that rollback doesn't restore data, with a copy taken before each update.
- **(2)** Reversed the trust argument: the risk is the lab returning to Telegram.
- **(3)** Said delivery reduces risk but can't guarantee trust. I dropped the closing "buying trust" line, and the no-budget argument isn't used.
- **(4)** Defined "beyond the code", split customer from users, and labelled it as my own reasoning.
- **(5)** Added ranking criteria and removed all effort figures.
- **(6)** Kept the product paragraph, reframed as scope and acceptance criteria.
- **(7)** Added account and hosting ownership and a parallel run with a Telegram fallback.
- **(8)** Made backups concrete: who, how often, where, and how restore is tested.
- **(9)** Made hosting a condition: first check whether data survives a restart.
- **(10)** Only future bookings move, and the old chat is an archive (flagged as an assumption).
- **(11)** Login is now an option to check with IT, with no claims about effort or safety.
- **(12)** Split operating from changing code, with an owner for each.
- **(13)** Treated the original as about 400 words and rejected the "five ideas" remark.
- **Sources:** kept A as it is. B is qualified: the slide names the problem but not the remedy.

## Facts vs. assumptions
**Facts (from your scenario):** about 60 students and three assistants, Telegram double bookings, a prototype, one developer, three weeks, no budget, free hosting, and the stated risk of lost bookings.

**Assumptions:**
- The prototype has no backups, documentation or release process.
- Only future bookings need transferring.
- Daily backups are enough.
- The assistants will operate the system.
- A successor developer can be named.

## Gaps still open
- What backup and restart behaviour the free hosting really has (ask IT).
- Whether university or email login is allowed, and whether it helps.
- Whether storing student names and bookings triggers data-protection rules.
- Your course's own definition of "professional delivery". I used only the two lecture slides you verified.

## Questions to think about
1. Which single deliverable best protects against overwritten bookings?
2. If one item had to go to fit three weeks, which would it be, and what would that cost the lab?
```

## 9. Appendix C — Evidence tables

### Verification table

<!-- At least two complete rows. Source and locator: title + page / slide / section / chapter,
     or title + URL + access date (YYYY-MM-DD). Decision: keep, qualify or reject — one word. -->

| AI claim | Source and locator | Evidence found | Decision |
| --- | --- | --- | --- |
| A working prototype shows that bookings can be made. Professional delivery shows that the lab can rely on the system. | Lesson #01 — Lecture, slide 44, "Prototyping and incremental delivery" | A prototype ignores non-functional requirements: no error handling, no security, weak quality. It must be thrown away or knowingly hardened. | keep |
| Short documentation for assistants (how to cancel a booking or resolve a conflict) and a handover note for whoever maintains the system later are part of delivery. | Lesson #02 — Lecture, slide 20, "Practical problems with agile methods", card 4 "Life after the team" | Once the original team has dispersed, the system is hard to maintain because little is written down. The slide names this problem but does not prescribe a handover note. | qualify |

### Change log

<!-- At least two substantive revisions. Your final version must differ from the AI wording,
     and the reason must say which evidence or scenario constraint made you change it. -->

| AI wording / suggestion | Your final version | Reason for change |
| --- | --- | --- |
| "a fix can be tried on a copy of the data first, and the previous version kept so the change can be undone" | Copy the data before every update; keep regular backups outside the hosting, with a restore that is actually tested | The scenario's risk is overwritten bookings, which live in the data. Rolling back the code does not restore them (critique point 1). |
| "the customer is buying trust, not just a program. Delivery must make sure that trust survives mistakes." | Delivery cannot guarantee trust; it reduces risk and speeds recovery | No checked source supports the stronger claim, and one misread guide could still lose trust (critique point 3, qualified). |
| "Existing reservations in the Telegram chat must be transferred" | Only future bookings are entered; the old chat stays as an archive (an assumption) | With one developer and three weeks, migrating free-text chat history is unrealistic (critique point 10). |
| "a handover note for whoever maintains the system later are part of delivery" | A short handover note is my own inference, not prescribed by the lecture | Lesson #02, slide 20 names the maintenance problem but does not prescribe the remedy (verification row 2). |