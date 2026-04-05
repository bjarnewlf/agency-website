'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'

export function HeroAnimations() {
  useGSAP(() => {
    // --- Text-Reveal: [data-reveal-text] von translateY(100%) → 0 ---
    const lines = document.querySelectorAll<HTMLElement>('[data-reveal-line]')

    lines.forEach((line) => {
      const text = line.querySelector<HTMLElement>('[data-reveal-text]')
      if (!text) return

      const delayMs = Number(line.dataset.revealDelay ?? 0)
      const delaySec = delayMs / 1000

      gsap.set(text, { y: '100%' })
      gsap.to(text, {
        y: '0%',
        duration: 0.8,
        ease: 'power3.out',
        delay: delaySec,
      })
    })

    // --- Eyebrow + Subline + CTAs: [data-reveal-element] opacity + translateY ---
    // h1 hat ebenfalls data-reveal-element — wir ueberspringen es,
    // weil die Headline ueber RevealLines animiert wird.
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-reveal-element]:not(h1)'
    )

    gsap.set(elements, { opacity: 0, y: 20 })

    elements.forEach((el) => {
      const index = Number(el.dataset.revealDelay ?? 0)
      // Index 0 = Eyebrow (sofort), Index 2 = Subline (nach den drei RevealLines)
      // Basis-Delay: 0.1s, plus 0.08s pro Index-Schritt, Subline (2) nach 0.36s
      const delaySec = 0.1 + index * 0.15

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: delaySec,
      })
    })
  }, [])

  return null
}
