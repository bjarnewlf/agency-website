'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// ─── Types ────────────────────────────────────────────────────────────────────

interface TransitionContextValue {
  isTransitioning: boolean
  triggerTransition: (href: string) => Promise<void>
  registerLenis: (lenis: Lenis | null) => void
  transitionCount: number
}

// ─── Context ──────────────────────────────────────────────────────────────────

export const TransitionContext = createContext<TransitionContextValue | null>(null)

export function useTransition() {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useTransition must be used inside TransitionProvider')
  return ctx
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms))

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionCount, setTransitionCount] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)

  // Refs für Panel-Elemente — werden von PageTransitionOverlay gesetzt
  const voidPanelRef = useRef<HTMLDivElement | null>(null)
  const accentPanelRef = useRef<HTMLDivElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)

  const registerLenis = useCallback((lenis: Lenis | null) => {
    lenisRef.current = lenis
  }, [])

  // Panel-Refs werden über ein globales Objekt geteilt (kein zweites Context-Level nötig)
  const registerPanels = useCallback(
    (
      voidPanel: HTMLDivElement,
      accentPanel: HTMLDivElement,
      label: HTMLDivElement,
    ) => {
      voidPanelRef.current = voidPanel
      accentPanelRef.current = accentPanel
      labelRef.current = label
    },
    [],
  )

  // Panels per globalem Callback zugänglich machen
  ;(TransitionProvider as unknown as { _registerPanels: typeof registerPanels })._registerPanels =
    registerPanels

  // ── Enter-Animation ────────────────────────────────────────────────────────

  const enterAnimation = useCallback(async () => {
    const voidPanel = voidPanelRef.current
    const accentPanel = accentPanelRef.current
    const label = labelRef.current
    const nav = document.querySelector<HTMLElement>('header')
    const cursor = document.querySelector<HTMLElement>('[data-cursor]')

    const tl = gsap.timeline()

    tl.to(
      voidPanel,
      { y: '-100%', duration: 0.28, ease: 'power3.inOut' },
      0,
    )
    tl.to(
      accentPanel,
      { y: '-100%', duration: 0.26, ease: 'power3.inOut' },
      0.02,
    )

    if (nav) {
      tl.fromTo(
        nav,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' },
        0.1,
      )
    }

    if (cursor) {
      tl.to(
        cursor,
        { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.75)' },
        0.05,
      )
    }

    await tl.then()

    // Lenis + ScrollTrigger nach Panels weg
    await delay(400)
  }, [])

  // ── Exit-Animation ─────────────────────────────────────────────────────────

  const exitAnimation = useCallback(async () => {
    const voidPanel = voidPanelRef.current
    const accentPanel = accentPanelRef.current
    const label = labelRef.current
    const nav = document.querySelector<HTMLElement>('header')
    const cursor = document.querySelector<HTMLElement>('[data-cursor]')
    const mainContent = document.querySelector<HTMLElement>('main')

    // Panels zurück nach unten setzen
    gsap.set(voidPanel, { y: '100%' })
    gsap.set(accentPanel, { y: '100%' })
    gsap.set(label, { opacity: 0 })

    const tl = gsap.timeline()

    // Cursor kollabiert
    if (cursor) {
      tl.to(cursor, { scale: 0.28, duration: 0.08, ease: 'power2.in' }, 0)
    }

    // Nav faded
    if (nav) {
      tl.to(nav, { opacity: 0, duration: 0.08, ease: 'none' }, 0)
    }

    // Void-Panel (schwarz) fährt hoch
    tl.to(
      voidPanel,
      { y: '0%', duration: 0.24, ease: 'power4.inOut' },
      0.04,
    )

    // Accent-Panel (lila) fährt hoch
    tl.to(
      accentPanel,
      { y: '0%', duration: 0.24, ease: 'power4.inOut' },
      0.08,
    )

    // Seite skaliert/faded
    if (mainContent) {
      tl.to(
        mainContent,
        { scale: 0.97, opacity: 0, duration: 0.24, ease: 'power2.in' },
        0.08,
      )
    }

    // "0." einblenden
    tl.to(label, { opacity: 0.35, duration: 0.12, ease: 'none' }, 0.08)

    // "0." ausblenden
    tl.to(label, { opacity: 0, duration: 0.04, ease: 'none' }, 0.28)

    await tl.then()

    // Main-Content-Scale zurücksetzen für neue Seite
    if (mainContent) {
      gsap.set(mainContent, { scale: 1, opacity: 1 })
    }
  }, [])

  // ── triggerTransition ──────────────────────────────────────────────────────

  const triggerTransition = useCallback(
    async (href: string) => {
      if (isTransitioning) return

      // prefers-reduced-motion: direkter Wechsel
      if (prefersReducedMotion()) {
        router.push(href, { scroll: true })
        return
      }

      setIsTransitioning(true)
      document.body.style.pointerEvents = 'none'

      // Lenis stoppen
      lenisRef.current?.stop()

      // Exit-Animation
      await exitAnimation()

      // ScrollTrigger killen
      ScrollTrigger.getAll().forEach((st) => st.kill())

      // Navigation
      router.push(href, { scroll: false })

      // Neue Seite rendern lassen
      await delay(150)

      // Enter-Animation
      await enterAnimation()

      // Lenis + ScrollTrigger
      lenisRef.current?.scrollTo(0, { immediate: true })
      lenisRef.current?.start()
      ScrollTrigger.refresh()

      document.body.style.pointerEvents = 'auto'
      setIsTransitioning(false)
      setTransitionCount((c) => c + 1)
    },
    [isTransitioning, router, exitAnimation, enterAnimation],
  )

  // ── popstate (Browser Back) ────────────────────────────────────────────────

  useEffect(() => {
    const onPopState = async () => {
      if (prefersReducedMotion()) return

      // Nur Enter-Animation bei Back — Panels müssen oben stehen (waren ggf. schon weg)
      const voidPanel = voidPanelRef.current
      const accentPanel = accentPanelRef.current

      // Panels oben positionieren (sichtbar) und dann runterfahren
      if (voidPanel && accentPanel) {
        gsap.set(voidPanel, { y: '0%' })
        gsap.set(accentPanel, { y: '0%' })
      }

      ScrollTrigger.getAll().forEach((st) => st.kill())

      await delay(50)
      await enterAnimation()

      lenisRef.current?.scrollTo(0, { immediate: true })
      lenisRef.current?.start()
      ScrollTrigger.refresh()

      setTransitionCount((c) => c + 1)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [enterAnimation])

  return (
    <TransitionContext.Provider
      value={{ isTransitioning, triggerTransition, registerLenis, transitionCount }}
    >
      {children}
    </TransitionContext.Provider>
  )
}
