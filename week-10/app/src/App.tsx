import { useState } from 'react'
import { canBook, type Result } from './booking'
import { existingBookings } from './bookings'
import { minutesOfDay, parseTime } from './timeInput'
import './App.css'

function formatTime(minutes: number) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  return `${h}:${m}`
}

function App() {
  const [startText, setStartText] = useState('')
  const [endText, setEndText] = useState('')
  const [blocked, setBlocked] = useState(false)
  const [result, setResult] = useState<Result | null>(null)

  function handleCheck(event: React.FormEvent) {
    event.preventDefault()
    const start = parseTime(startText)
    const end = parseTime(endText)
    const now = minutesOfDay(new Date())
    setResult(canBook({ start, end, now, blocked, bookings: existingBookings }))
  }

  return (
    <main className="page">
      <h1>Room Availability Checker</h1>
      <p className="subtitle">Smart Campus · Room 101 (fictional)</p>

      <form className="card" onSubmit={handleCheck}>
        <label>
          Start
          <input type="time" value={startText} onChange={(e) => setStartText(e.target.value)} />
        </label>
        <label>
          End
          <input type="time" value={endText} onChange={(e) => setEndText(e.target.value)} />
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={blocked} onChange={(e) => setBlocked(e.target.checked)} />
          Room is blocked (maintenance)
        </label>
        <button type="submit">Check availability</button>
      </form>

      {result && (
        <p className={result === 'Available' ? 'result ok' : 'result no'} role="status">
          {result}
        </p>
      )}

      <section className="card">
        <h2>Existing bookings today</h2>
        <ul>
          {existingBookings.map((b) => (
            <li key={b.start}>
              {formatTime(b.start)} – {formatTime(b.end)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default App
