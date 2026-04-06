'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const SIZE = 40        // Echte DOM-Größe — immer native Auflösung
const SCALE_DEFAULT = 0.35  // = ~14px sichtbar
const SCALE_HOVER   = 1.0   // = 40px sichtbar — kein Upscaling, nie pixelig

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch !== false) return
    const el = cursorRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power3.out' })

    gsap.set(el, { x: -100, y: -100, scale: SCALE_DEFAULT })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onEnter = () => {
      gsap.to(el, { scale: SCALE_HOVER, duration: 0.25, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(el, { scale: SCALE_DEFAULT, duration: 0.25, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)

    const targets = document.querySelectorAll<HTMLElement>('a, button')
    targets.forEach((t) => {
      t.addEventListener('mouseenter', onEnter)
      t.addEventListener('mouseleave', onLeave)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>('a:not([data-cursor-bound]), button:not([data-cursor-bound])').forEach((t) => {
        t.dataset.cursorBound = '1'
        t.addEventListener('mouseenter', onEnter)
        t.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })
    targets.forEach((t) => { t.dataset.cursorBound = '1' })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.querySelectorAll<HTMLElement>('[data-cursor-bound]').forEach((t) => {
        t.removeEventListener('mouseenter', onEnter)
        t.removeEventListener('mouseleave', onLeave)
        delete t.dataset.cursorBound
      })
      observer.disconnect()
    }
  }, [isTouch])

  if (isTouch !== false) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      data-cursor=""
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        backgroundColor: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        mixBlendMode: 'multiply',
      }}
    />
  )
}
