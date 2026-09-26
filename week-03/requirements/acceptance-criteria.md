# Acceptance criteria — three selected stories

Assumptions first, then the criteria. Each block names the story it belongs to. 3 to 5 criteria per
story, every one in Given / When / Then form, and every set covers a validation or error case — not
three happy paths.

---

## Assumptions

- **Overlap:** a booking that ends exactly when another begins is **allowed** (not treated as an overlap) under R3, because a slot only overlaps another if it starts strictly before that other one ends.
- **Duration:** a booking of exactly two hours is **allowed** under R2, because "at most two hours" is an inclusive upper bound.
- All times are in the campus's local time zone. A booking has a start time, an end time, a room, and the student who made it.
- Cancelled bookings do not count when checking for overlaps.
- A student may cancel only their own bookings, and only before the booking's start time.
- Only Administrators can block or unblock a room; a block stays in place until an Administrator unblocks it.
- Blocking a room (R4) affects only future booking attempts. It does not cancel or otherwise change bookings that already exist on that room, and it triggers no notification — notifications beyond UC-06 are out of scope.

---

## US-02 — Book a free room

### AC-01
- **Given** Room A is not blocked and has no bookings on 29 Sep
- **When** a student requests Room A for 29 Sep, 14:00–15:30
- **Then** the booking is created for that student, and Room A shows as booked for 29 Sep, 14:00–15:30

### AC-02
- **Given** the current time is 28 Sep, 10:00
- **When** a student requests Room A for 28 Sep, 09:00–10:00
- **Then** the booking is rejected with the message "Bookings must start in the future", and no booking is created

### AC-03
- **Given** Room A is free on 29 Sep
- **When** a student requests Room A for 29 Sep, 14:00–16:30
- **Then** the booking is rejected with the message "Bookings cannot exceed 2 hours", and no booking is created

### AC-04
- **Given** Room A has a booking on 29 Sep, 14:00–15:00
- **When** a student requests Room A for 29 Sep, 14:30–15:30
- **Then** the booking is rejected with the message "This room is already booked for part of that time", and no booking is created

### AC-05
- **Given** Room B is blocked by an Administrator
- **When** a student requests Room B for 29 Sep, 14:00–15:00
- **Then** the booking is rejected with the message "This room is out of service and cannot be booked", and no booking is created

---

## US-03 — Cancel a booking

### AC-06
- **Given** Student S1 has a booking for Room A on 29 Sep, 14:00–15:00
- **When** S1 cancels that booking on 28 Sep, 10:00
- **Then** the booking status changes to Cancelled, and Room A becomes free for 29 Sep, 14:00–15:00

### AC-07
- **Given** Student S2 has a booking for Room A on 29 Sep, 14:00–15:00
- **When** Student S1 tries to cancel S2's booking
- **Then** the cancellation is rejected with the message "You can only cancel your own bookings", and S2's booking stays active

### AC-08
- **Given** S1 has a booking for Room A on 28 Sep, 09:30–11:00, and the current time is 28 Sep, 10:00
- **When** S1 tries to cancel that booking
- **Then** the cancellation is rejected with the message "Bookings can only be cancelled before they start", and the booking stays active

### AC-09
- **Given** S1's booking for 29 Sep, 14:00–15:00 has already been cancelled
- **When** S1 tries to cancel it again
- **Then** the system tells S1 "This booking is already cancelled", and nothing else changes

---

## US-04 — Block a room

### AC-10
- **Given** Room B is available and has no future bookings
- **When** an Administrator blocks Room B
- **Then** Room B's status changes to Blocked, and it shows as unavailable to students

### AC-11
- **Given** Room A has a future booking for 29 Sep, 14:00–15:00 (Student S1)
- **When** an Administrator blocks Room A
- **Then** Room A's status changes to Blocked, and S1's existing booking remains active and unaffected

### AC-12
- **Given** an Administrator has blocked Room A
- **When** a student requests Room A for 29 Sep, 16:00–17:00
- **Then** the booking is rejected with the message "This room is out of service and cannot be booked"

### AC-13
- **Given** a Student attempts to block Room A
- **When** they try to block Room A
- **Then** the action is rejected with the message "Only administrators can block rooms", and Room A's status does not change