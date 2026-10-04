# Approved stories — Smart Campus study room booking

> **Replace this file's stories with your own Week 03 stories, as revised after review**
> (`week-03/requirements/user-stories.md`), keeping their IDs. If you did not complete Week 03, or
> your set was rejected in review, keep the reference set below and say so in `lab-report.md` §1.
> Either way, the IDs here are the ones your consistency table (§7) must use.

**Source of this set:** week-03 stories, revised

## Scenario (from the Lesson 04 practice deck, slide 7)

Students view room availability, book a room, and cancel their own bookings. Administrators block
or unblock rooms and review usage.

- **R1** Future start, with duration greater than 0 and at most 2 hours.
- **R2** Active bookings for the same room cannot overlap.
- **R3** A blocked room cannot accept a new booking.
- **R4** A successful booking produces a confirmation.

## Reference set

| ID | Story | Rules |
|------|-------|-------|
| US-01 | As a Student, I want to search for available study rooms by date, time and capacity, so that I can find a room that fits my group without contacting the library. | — |
| US-02 | As a Student, I want to book a free room for a specific time slot, so that I have a guaranteed place to study at that time. | R1, R2, R3, R4 |
| US-03 | As a Student, I want to cancel a booking I made, so that I can free up the room when I no longer need it. | R4 |
| US-04 | As an Administrator, I want to block a room that is out of service, so that students cannot book it while it cannot be used. | R3 |
| US-05 | As an Administrator, I want to unblock a room once it is usable again, so that students can resume booking it. | R3 |
| US-06 | As a Student, I want the system to refuse a booking longer than two hours, so that room time is shared fairly among everyone. | R1 |


**Out of scope** (do not model): payments, equipment in rooms, recurring bookings, waiting lists,
notifications other than the booking confirmation, user registration.
    