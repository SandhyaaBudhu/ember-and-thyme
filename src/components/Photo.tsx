import { useState } from 'react'

export default function Photo({ src, alt, className = '', priority = false }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const failed = failedSrc === src
  return <div className={`photo ${className} ${failed ? 'photo-fallback' : ''}`}>
    {failed ? <span className="fallback-mark" role="img" aria-label={alt}>E<span>&</span>T</span> : <img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} onError={() => setFailedSrc(src)} />}
  </div>
}
