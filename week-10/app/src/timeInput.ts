// Pure helpers for the time inputs of the room checker.

// "HH:MM" -> whole minutes since midnight.
// A blank or malformed value gives NaN, which canBook rejects (AC1).
export function parseTime(text: string): number {
  const [hours, minutes] = text.split(':')
  return Number(hours) * 60 + Number(minutes)
}

// A Date -> whole minutes since midnight in the local timezone.
export function minutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}
