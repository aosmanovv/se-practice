// Room availability rules for the Smart Campus room checker.
// All times are whole minutes since midnight (10:00 = 600, 24:00 = 1440).

export type Booking = {
  start: number
  end: number
}

export type BookingRequest = {
  start: number
  end: number
  now: number
  blocked: boolean
  bookings: Booking[]
}

export type Result = 'Available' | 'Unavailable'

export const MAX_DURATION = 120
export const DAY_END = 1440

export function canBook(request: BookingRequest): Result {
  const { start, end, now, blocked, bookings } = request

  // AC1: a valid interval inside the day, not in the past
  // NaN makes every comparison below false, so reject non-finite times first.
  if (!Number.isFinite(start) || !Number.isFinite(end)) return 'Unavailable'
  if (start < 0 || end > DAY_END) return 'Unavailable'
  if (start >= end) return 'Unavailable'
  if (start < now) return 'Unavailable'

  // AC2: at most 120 minutes
  if (end - start > MAX_DURATION) return 'Unavailable'

  // AC3: a blocked room cannot be booked
  if (blocked) return 'Unavailable'

  // AC4: no overlap; touching at the endpoints is allowed
  for (const booking of bookings) {
    if (start < booking.end && booking.start < end) return 'Unavailable'
  }

  // AC5: nothing above changes `bookings`
  return 'Available'
}