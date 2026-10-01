import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu as MenuIcon, Moon, Sun, X, Sprout } from 'lucide-react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { usePersistentState } from '../hooks/usePersistentState'

const navigation = [{ to: '/menu', label: 'The menu' }, { to: '/story', label: 'Our story' }, { to: '/events', label: 'Private dining' }]
export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link to="/" aria-label="Ember and Thyme home" className={`brand ${footer ? 'brand-footer' : ''}`}><Sprout size={29} strokeWidth={1.15} /><span>EMBER <i>&</i> THYME<small>SEASONAL DINING · CAPE TOWN</small></span></Link>
}
export default function Layout() {
  const [theme, setTheme] = usePersistentState<'light' | 'dark'>('et-theme', 'light', (v): v is 'light' | 'dark' => v === 'light' || v === 'dark')
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => { document.documentElement.dataset.theme = theme; document.documentElement.style.colorScheme = theme }, [theme])
  useEffect(() => {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    const titles: Record<string, string> = { '/': 'A sense of season', '/menu': 'The seasonal menu', '/story': 'Our story', '/events': 'Private dining', '/reservations': 'A seat at our table' }
    document.title = `Ember & Thyme · ${titles[pathname] || 'Welcome'}`
  }, [pathname])
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(item => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}</nav>
      <div className="header-actions"><button className="icon-button theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={19} />}</button><Link to="/reservations" className="button header-reserve">Reserve a table<ArrowUpRight size={16} /></Link><button aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" className="icon-button mobile-toggle" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <MenuIcon size={23} />}</button></div>
    </div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><NavLink to="/">Home</NavLink>{navigation.map(item => <NavLink to={item.to} key={item.to}>{item.label}</NavLink>)}<NavLink to="/reservations">Reserve a table<ArrowUpRight size={20} /></NavLink><p>Good food. Good company. Your kind of evening.</p></nav>}</header>
    <main id="main" tabIndex={-1}><Outlet /></main>
    <footer className="site-footer"><div className="container footer-main"><div><Brand footer /><p>A little fire. A lot of care.<br />A table worth coming back to.</p></div><div><h3>Find your way</h3><Link to="/menu">The menu</Link><Link to="/story">Our story</Link><Link to="/events">Private dining</Link><Link to="/reservations">Reservations</Link></div><div><h3>Find us</h3><p>18 Wandel Street, Gardens<br />Cape Town, South Africa</p><p>hello@emberandthyme.example<br />+27 (0)21 555 0182</p></div><div><h3>Stay a little longer</h3><p>Wednesday – Saturday<br />17:30 – 22:00</p><p>Sunday<br />12:00 – 16:00</p><small>Closed Monday & Tuesday</small></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ember & Thyme</span><span>Made with the season in mind.</span><span className="demo-label">A fictional restaurant · Portfolio demo</span></div></footer>
    {pathname !== '/reservations' && <Link to="/reservations" className="mobile-sticky">A seat at our table<ArrowUpRight size={18} /></Link>}
  </>
}
