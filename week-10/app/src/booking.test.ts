import { describe, expect, test } from 'vitest'
import { canBook, type BookingRequest } from './booking'

const bookings = [
  { start: 600, end: 660 },
  { start: 780, end: 840 },
]

function request(overrides: Partial<BookingRequest> = {}): BookingRequest {
  return {
    start: 700,
    end: 760,
    now: 540,
    blocked: false,
    bookings,
    ...overrides,
  }
}

describe('canBook', () => {
  test('a free one-hour slot is Available', () => {
    expect(canBook(request())).toBe('Available')
  })

  test('AC1: start equal to end is Unavailable', () => {
    expect(canBook(request({ start: 700, end: 700 }))).toBe('Unavailable')
  })

  test('AC1: a reversed interval is Unavailable', () => {
    expect(canBook(request({ start: 760, end: 700 }))).toBe('Unavailable')
  })

  test('AC1: a start in the past is Unavailable', () => {
    expect(canBook(request({ now: 720 }))).toBe('Unavailable')
  })

  test('AC1: an end after 24:00 is Unavailable', () => {
    expect(canBook(request({ start: 1400, end: 1500 }))).toBe('Unavailable')
  })

  test('AC1: ending exactly at 24:00 is Available', () => {
    expect(canBook(request({ start: 1380, end: 1440 }))).toBe('Available')
  })

  test('AC2: exactly 120 minutes is Available', () => {
    expect(canBook(request({ start: 860, end: 980, bookings: [] }))).toBe('Available')
  })

  test('AC2: 121 minutes is Unavailable', () => {
    expect(canBook(request({ start: 860, end: 981, bookings: [] }))).toBe('Unavailable')
  })

  test('AC3: a blocked room is Unavailable', () => {
    expect(canBook(request({ blocked: true }))).toBe('Unavailable')
  })

  test('AC4: an overlapping slot is Unavailable', () => {
    expect(canBook(request({ start: 630, end: 690 }))).toBe('Unavailable')
  })

  test('AC4: a slot inside an existing booking is Unavailable', () => {
    expect(canBook(request({ start: 610, end: 650 }))).toBe('Unavailable')
  })

  test('AC4: touching the end of a booking is Available', () => {
    expect(canBook(request({ start: 660, end: 720 }))).toBe('Available')
  })

  test('AC4: touching the start of a booking is Available', () => {
    expect(canBook(request({ start: 720, end: 780 }))).toBe('Available')
  })

  test('AC5: the bookings list is not changed', () => {
    const before = JSON.stringify(bookings)
    canBook(request())
    canBook(request({ start: 630, end: 690 }))
    expect(JSON.stringify(bookings)).toBe(before)
  })
})
