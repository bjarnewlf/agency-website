'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'

const PROXIMITY = 80  // Radius in px — nur innerhalb reagieren
const MAX_SHIFT = 18  // Max-Versatz in px

export function MagneticButton({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < PROXIMITY) {
        const factor = (1 - dist / PROXIMITY) * MAX_SHIFT
        gsap.to(el, {
          x: (dx / dist) * factor,
          y: (dy / dist) * factor,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div ref={wrapRef} style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
