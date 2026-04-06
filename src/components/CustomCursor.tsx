'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  // null = noch nicht geprueft (SSR), true = Touch, false = Maus
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  // Erster Effekt: Touch-Pruefung → steuert ob das Element gerendert wird
  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Zweiter Effekt: GSAP-Setup — laeuft nur wenn isTouch===false und ref verfuegbar
  useEffect(() => {
    if (isTouch !== false) return
    const el = cursorRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.15, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.15, ease: 'power3.out' })

    // Initial: Cursor ausserhalb des Viewports — kein Flash bei Load
    gsap.set(el, { x: -100, y: -100 })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onEnter = () => {
      gsap.to(el, { scale: 3, duration: 0.25, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)

    // Alle interaktiven Elemente delegiert
    const targets = document.querySelectorAll<HTMLElement>('a, button')
    targets.forEach((t) => {
      t.addEventListener('mouseenter', onEnter)
      t.addEventListener('mouseleave', onLeave)
    })

    // MutationObserver fuer dynamisch hinzugefuegte Elemente
    const observer = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>('a:not([data-cursor-bound]), button:not([data-cursor-bound])').forEach((t) => {
        t.dataset.cursorBound = '1'
        t.addEventListener('mouseenter', onEnter)
        t.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    // Initial bereits gebundene markieren
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

  // Waehrend SSR und Touch: nichts rendern
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
        width: 14,
        height: 14,
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
