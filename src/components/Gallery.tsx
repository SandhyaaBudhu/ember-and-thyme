import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand } from 'lucide-react'
import { gallery } from '../data/content'
import Photo from './Photo'
import { Modal } from './UI'

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null)
  const change = (direction: number) => setActive(current => current === null ? null : (current + direction + gallery.length) % gallery.length)
  useEffect(() => {
    if (active === null) return
    const key = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') change(1); if (e.key === 'ArrowLeft') change(-1) }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [active])
  return <><div className="gallery-grid">{gallery.map((item, i) => <button key={item.src} className="gallery-tile" onClick={() => setActive(i)} aria-label={`View photograph: ${item.caption}`}><Photo src={item.src} alt={item.alt} /><span><Expand size={19} /></span></button>)}</div>
    {active !== null && <Modal title="Restaurant photography gallery" className="lightbox" onClose={() => setActive(null)}><Photo src={gallery[active].src} alt={gallery[active].alt} priority /><div className="lightbox-footer"><button className="icon-button" onClick={() => change(-1)} aria-label="Previous photograph"><ArrowLeft size={21} /></button><div><p>{gallery[active].caption}</p><span>{active + 1} / {gallery.length}</span></div><button className="icon-button" onClick={() => change(1)} aria-label="Next photograph"><ArrowRight size={21} /></button></div></Modal>}
  </>
}
