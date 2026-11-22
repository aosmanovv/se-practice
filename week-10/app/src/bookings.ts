import type { Booking } from './booking'

// Fictional bookings for the one room. No real people, no database.
export const existingBookings: Booking[] = [
  { start: 600, end: 660 }, // 10:00-11:00
  { start: 780, end: 840 }, // 13:00-14:00
  { start: 960, end: 1080 }, // 16:00-18:00
]
