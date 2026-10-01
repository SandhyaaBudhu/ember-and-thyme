import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Leaf, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import Calendar from '../components/Calendar'
import FormField from '../components/FormField'
import { Eyebrow, useToast } from '../components/UI'
import { images } from '../data/content'
import { availableTimes, displayDate, firstAvailable } from '../lib/dates'

type Guest = { name: string; email: string; phone: string; dietary: string; notes: string }
type Errors = Partial<Record<keyof Guest, string>>
export default function Reservations() {
  const [step, setStep] = useState(1)
  const [party, setParty] = useState(2)
  const [date, setDate] = useState(firstAvailable)
  const [time, setTime] = useState('')
  const [guest, setGuest] = useState<Guest>({ name: '', email: '', phone: '', dietary: '', notes: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [confirmed, setConfirmed] = useState(false)
  const [reference, setReference] = useState('')
  const [calendarAdded, setCalendarAdded] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const toast = useToast()
  const slots = availableTimes(date, party)
  function goTo(next: number) { setStep(next); requestAnimationFrame(() => heading.current?.focus()) }
  function update(field: keyof Guest, value: string) { setGuest(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: undefined })) }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const issues: Errors = {}
    if (guest.name.trim().length < 2) issues.name = 'Please enter your name (at least 2 characters).'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) issues.email = 'Please enter a valid email address.'
    if (guest.phone.replace(/\D/g, '').length < 7) issues.phone = 'Please enter a valid phone number.'
    setErrors(issues)
    if (Object.keys(issues).length) { document.getElementById(`guest-${Object.keys(issues)[0]}`)?.focus(); return }
    const ref = `ET-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    setReference(ref)
    try { localStorage.setItem('et-last-booking', JSON.stringify({ party, date, time, reference: ref })) } catch { /* Confirmation remains available in memory. */ }
    setConfirmed(true)
    requestAnimationFrame(() => heading.current?.focus())
  }
  return <section className="container reservation-page"><div className="reservation-top"><Eyebrow>A LITTLE SOMETHING TO LOOK FORWARD TO</Eyebrow><h1>A seat at <em>our table.</em></h1><p>Come hungry. Leave happy. We’ll take care of the rest.</p></div><div className="reservation-layout"><aside className="reservation-visual"><Photo src={images.room} alt="An inviting dining room ready for an unhurried evening" priority /><div className="reservation-image-shade" /><div className="reservation-visual-copy"><Leaf size={30} strokeWidth={1} /><h2>Good food.<br />Great company.<br /><em>Your evening.</em></h2><p>Seasonal dining in the heart of Cape Town.</p></div><div className="reservation-address"><MapPin size={17} /><span>18 Wandel Street, Gardens</span></div></aside><div className="booking-panel">
    {confirmed ? <div className="confirmation"><span className="success-icon"><Check size={29} /></span><Eyebrow>YOUR DEMO RESERVATION IS COMPLETE</Eyebrow><h2 ref={heading} tabIndex={-1}>A lovely evening<br /><em>to look forward to.</em></h2><p>Thank you, {guest.name.trim().split(' ')[0]}. Here’s your table, just as you planned it.</p><div className="confirmation-details"><p><CalendarDays size={18} />{displayDate(date)}</p><p><Clock3 size={18} />{time} · Cape Town time</p><p><Users size={18} />{party} {party === 1 ? 'guest' : 'guests'}</p><p><MapPin size={18} />Ember & Thyme, Gardens</p>{guest.dietary && <p><Leaf size={18} />{guest.dietary}</p>}<span>DEMO REFERENCE &nbsp; {reference}</span></div><button className="button w-full" onClick={() => { setCalendarAdded(true); toast('Calendar preview added. This demo does not create or download a calendar event.') }}>{calendarAdded ? <Check size={18} /> : <CalendarDays size={18} />}{calendarAdded ? 'Added to your demo calendar' : 'Add to calendar'}</button><p className="booking-demo">This is a demo. No table has been reserved and no email has been sent.</p><button className="text-link" onClick={() => { setConfirmed(false); setTime(''); setCalendarAdded(false); setGuest({ name: '', email: '', phone: '', dietary: '', notes: '' }); goTo(1) }}>Plan another visit<ArrowRight size={16} /></button></div> : <>
    <ol className="booking-stepper" aria-label="Reservation progress">{['Your party', 'Date & time', 'Your details'].map((label, index) => <li key={label} className={step === index + 1 ? 'current' : step > index + 1 ? 'complete' : ''} aria-current={step === index + 1 ? 'step' : undefined}><span>{step > index + 1 ? <Check size={13} /> : `0${index + 1}`}</span>{label}</li>)}</ol>
    <div className="booking-heading"><span className="small-label">STEP 0{step} OF 03</span><h2 ref={heading} tabIndex={-1}>{step === 1 ? 'Who’s joining us?' : step === 2 ? 'Find your moment.' : 'A little about you.'}</h2><p>{step === 1 ? 'Good evenings start with good company.' : step === 2 ? 'Choose a date, then a time that feels right.' : 'The final details for a thoughtful welcome.'}</p></div>
    {step === 1 && <div className="party-step"><label className="field-label">Number of guests</label><div className="party-grid">{Array.from({ length: 8 }, (_, i) => <button key={i} className={party === i + 1 ? 'selected' : ''} onClick={() => { setParty(i + 1); setTime('') }} aria-pressed={party === i + 1} aria-label={`${i + 1} ${i === 0 ? 'guest' : 'guests'}`}>{i + 1}</button>)}</div><p className="party-explainer"><Users size={17} />{party} {party === 1 ? 'guest' : 'guests'} at our table</p><div className="large-party-note"><Leaf size={23} strokeWidth={1.2} /><div><h3>A little more company?</h3><p>For groups of 9 or more, <Link to="/events">explore our private dining experiences.</Link></p></div></div><button className="button w-full" onClick={() => goTo(2)}>Choose date & time<ArrowRight size={17} /></button></div>}
    {step === 2 && <div className="date-step"><Calendar selected={date} onSelect={value => { setDate(value); setTime('') }} /><div className="times-heading"><label className="field-label">Available times</label><span>{party} guests · {date && new Date(`${date}T12:00`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</span></div><div className="time-grid">{slots.map(slot => <button key={slot.time} disabled={!slot.available} aria-label={`${slot.time}${slot.available ? '' : ', fully booked'}`} aria-pressed={time === slot.time} className={time === slot.time ? 'selected' : ''} onClick={() => setTime(slot.time)}>{slot.time}</button>)}</div><p className="times-note">Cape Town time · Faded times are fully booked.</p><div className="booking-navigation"><button className="text-link" onClick={() => goTo(1)}><ArrowLeft size={16} />Back</button><button className="button" disabled={!time} onClick={() => goTo(3)}>Your details<ArrowRight size={16} /></button></div></div>}
    {step === 3 && <form noValidate onSubmit={submit}><div className="booking-summary"><Users size={15} /><span>{party} guests</span><span>·</span><span>{new Date(`${date}T12:00`).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })} at {time}</span><button type="button" onClick={() => goTo(2)}>Edit</button></div><div className="guest-fields"><FormField label="Full name" id="guest-name" error={errors.name}><input id="guest-name" autoComplete="name" value={guest.name} onChange={e => update('name', e.target.value)} placeholder="Your name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'guest-name-error' : undefined} /></FormField><FormField label="Email address" id="guest-email" error={errors.email}><input type="email" id="guest-email" autoComplete="email" value={guest.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" required maxLength={150} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'guest-email-error' : undefined} /></FormField><FormField label="Phone number" id="guest-phone" error={errors.phone}><input type="tel" id="guest-phone" autoComplete="tel" value={guest.phone} onChange={e => update('phone', e.target.value)} placeholder="+27" required maxLength={30} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'guest-phone-error' : undefined} /></FormField><FormField label="Dietary preference" id="guest-dietary" optional><select id="guest-dietary" value={guest.dietary} onChange={e => update('dietary', e.target.value)}><option value="">No preference</option><option>Vegetarian</option><option>Vegan</option><option>Gluten-free</option><option>Other — noted below</option></select></FormField></div><FormField label="Anything we should know?" id="guest-notes" optional><textarea id="guest-notes" value={guest.notes} onChange={e => update('notes', e.target.value)} placeholder="An occasion, an allergy, a little request…" rows={3} maxLength={500} /></FormField><div className="booking-navigation"><button type="button" className="text-link" onClick={() => goTo(2)}><ArrowLeft size={16} />Back</button><button className="button" type="submit">Confirm reservation<ArrowRight size={16} /></button></div></form>}
    <p className="booking-demo">A front-end demonstration. No real reservation is made.</p></>}
  </div></div><div className="reservation-notes"><span><Clock3 size={17} />Take your time. Your table is yours for two hours.</span><span><Leaf size={17} />Dietary needs? Let us know when you book.</span></div></section>
}
