# User stories — Smart Campus study room booking

7 stories. Roles are Student or Administrator only.

---

### US-01
**Story:** As a Student, I want to search for available study rooms by date, time and capacity, so that I can find a room that fits my group without contacting the library.
**Priority:** High
**Assumption:** Availability shown to the student reflects all existing bookings and blocked periods at the moment of the search.

### US-02
**Story:** As a Student, I want to book a free room for a specific time slot, so that I have a guaranteed place to study at that time.
**Priority:** High
**Assumption:** A booking is only accepted if the requested slot does not overlap any existing booking for that room and the room is not blocked; a slot that ends exactly when another begins is not treated as an overlap.

### US-03
**Story:** As a Student, I want to cancel a booking I made, so that I can free up the room when I no longer need it.
**Priority:** Medium
**Assumption:** A student can cancel only their own bookings, and only before the booking's start time.

### US-04
**Story:** As an Administrator, I want to block a room that is out of service, so that students cannot book it while it cannot be used.
**Priority:** High
**Assumption:** A room can be blocked at any time regardless of whether it currently has bookings on it.

### US-05
**Story:** As an Administrator, I want to unblock a room once it is usable again, so that students can resume booking it.
**Priority:** Medium
**Assumption:** Once unblocked, a room becomes bookable immediately under the normal booking rules.

### US-06
**Story:** As a Student, I want the system to refuse a booking longer than two hours, so that room time is shared fairly among everyone.
**Priority:** Medium
**Assumption:** A booking of exactly two hours is allowed; anything longer is rejected.

### US-07
**Story:** As an Administrator, I want to view and cancel a student's booking, so that I can resolve a problem with a reservation when it is needed.
**Priority:** Low
**Assumption:** Cancelling a booking on a student's behalf does not require the student's prior approval, but is limited to cases where library staff intervention is needed.

### US-08
**Story:** As an Administrator, I want to review how rooms have been used over a period, so that I can make informed decisions about room capacity and scheduling.
**Priority:** Low
**Assumption:** "Usage" means only the booking and cancellation activity already recorded by the system — counts, durations, and a per-room breakdown.