import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { dateKey, displayDate, fromKey, today } from '../lib/dates'

export default function Calendar({ selected, onSelect }: { selected: string; onSelect: (date: string) => void }) {
  const current = today()
  const [month, setMonth] = useState(() => new Date(fromKey(selected).getFullYear(), fromKey(selected).getMonth(), 1))
  const limit = new Date(current.getFullYear(), current.getMonth() + 6, 0)
  const offset = (month.getDay() + 6) % 7
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const canBack = month.getFullYear() * 12 + month.getMonth() > current.getFullYear() * 12 + current.getMonth()
  const canForward = month.getFullYear() * 12 + month.getMonth() < limit.getFullYear() * 12 + limit.getMonth()
  return <div className="calendar"><div className="calendar-heading"><h3 aria-live="polite">{month.toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}</h3><div><button className="icon-button" aria-label="Previous month" disabled={!canBack} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={18} /></button><button className="icon-button" aria-label="Next month" disabled={!canForward} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={18} /></button></div></div><div className="calendar-grid">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <span className="weekday" key={i} aria-hidden="true">{day}</span>)}{Array.from({ length: offset }, (_, i) => <span key={`blank-${i}`} />)}{Array.from({ length: days }, (_, i) => {
    const date = new Date(month.getFullYear(), month.getMonth(), i + 1, 12)
    const key = dateKey(date)
    const disabled = key < dateKey(current) || date > limit || [1, 2].includes(date.getDay())
    return <button key={key} type="button" disabled={disabled} aria-label={displayDate(key)} aria-pressed={selected === key} className={`${selected === key ? 'selected' : ''} ${key === dateKey(current) ? 'today' : ''}`} onClick={() => onSelect(key)}>{i + 1}</button>
  })}</div><p className="calendar-note"><span />Open Wednesday – Sunday</p></div>
}
