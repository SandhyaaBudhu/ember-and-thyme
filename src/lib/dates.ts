export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function today() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Johannesburg', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date())
  const get = (type: string) => parts.find(part => part.type === type)!.value
  return new Date(`${get('year')}-${get('month')}-${get('day')}T12:00:00`)
}
export function fromKey(value: string) { return new Date(`${value}T12:00:00`) }
export function displayDate(value: string) { return fromKey(value).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
export function firstAvailable() {
  const date = today()
  while (date.getDay() === 1 || date.getDay() === 2) date.setDate(date.getDate() + 1)
  return dateKey(date)
}
export function availableTimes(value: string, party: number) {
  const date = fromKey(value)
  if (date.getDay() === 1 || date.getDay() === 2) return []
  const times = date.getDay() === 0 ? ['12:00', '12:30', '13:00', '13:30', '14:00'] : ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00']
  return times.map((time, index) => ({ time, available: (date.getDate() + index + (party > 6 ? 1 : 0)) % 4 !== 0 }))
}
