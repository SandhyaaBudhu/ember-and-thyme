import { createContext, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</p>
}
export function ButtonLink({ to, children, secondary = false, className = '' }: { to: string; children: ReactNode; secondary?: boolean; className?: string }) {
  return <Link to={to} className={`button ${secondary ? 'button-outline' : ''} ${className}`}>{children}<ArrowUpRight size={16} /></Link>
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="text-link" to={to}>{children}<ArrowUpRight size={17} /></Link>
}
export function Modal({ title, children, onClose, className = '' }: { title: string; children: ReactNode; onClose: () => void; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    const previous = document.activeElement as HTMLElement | null
    dialog?.showModal()
    const old = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = old; previous?.focus() }
  }, [])
  return <dialog ref={ref} aria-label={title} className={`modal ${className}`} onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
    <button className="icon-button modal-close" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
    {children}
  </dialog>
}
const ToastContext = createContext<(message: string) => void>(() => {})
export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('')
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])
  function toast(value: string) {
    if (timer.current) clearTimeout(timer.current)
    setMessage(value)
    timer.current = setTimeout(() => setMessage(''), 5000)
  }
  return <ToastContext.Provider value={toast}>{children}<div className="toast-region" role="status" aria-live="polite">{message && <div className="toast"><Check size={19} /><span>{message}</span><button onClick={() => setMessage('')} aria-label="Dismiss notification"><X size={16} /></button></div>}</div></ToastContext.Provider>
}
export const useToast = () => useContext(ToastContext)
