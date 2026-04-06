import { useEffect, useRef, useContext } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TransitionContext } from '@/components/TransitionProvider'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const ctx = useContext(TransitionContext)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    })

    lenisRef.current = lenis

    // Im TransitionContext registrieren (falls vorhanden)
    ctx?.registerLenis(lenis)

    let rafId: number

    function raf(time: number) {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
      ctx?.registerLenis(null)
    }
    // ctx ist stabil (useCallback), daher kein Dependency-Problem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return lenisRef
}
