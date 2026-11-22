import { describe, expect, test } from 'vitest'
import { canBook } from './booking'
import { minutesOfDay, parseTime } from './timeInput'

describe('parseTime', () => {
  test('"10:30" is 630 minutes', () => {
    expect(parseTime('10:30')).toBe(630)
  })

  test('a blank field is NaN', () => {
    expect(parseTime('')).toBeNaN()
  })

  test('R1: a blank form is Unavailable end to end', () => {
    const result = canBook({
      start: parseTime(''),
      end: parseTime(''),
      now: 540,
      blocked: false,
      bookings: [],
    })
    expect(result).toBe('Unavailable')
  })
})

describe('minutesOfDay', () => {
  test('13:05 local time is 785 minutes', () => {
    expect(minutesOfDay(new Date(2026, 0, 1, 13, 5))).toBe(785)
  })
})
