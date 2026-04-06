'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-reveal-element]:not(h1)'
    )

    gsap.set(elements, { opacity: 0, y: 20 })

    elements.forEach((el) => {
      const index = Number(el.dataset.revealDelay ?? 0)
      const delaySec = 0.1 + index * 0.15

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: delaySec,
      })
    })

    // --- SVG Load-Animation: nach Text-Reveal (~0.8s) ---
    const wrapper = document.querySelector<HTMLElement>('#gravitational-field-wrapper')
    const svgEl = document.querySelector<SVGElement>('#gravitational-field')

    if (wrapper && svgEl) {
      // Ringe von aussen nach innen staggered einblenden
      // Ring-Reihenfolge im DOM: r=40 (0), r=72 (1), ... r=310 (6)
      // Stagger von aussen nach innen = umgekehrte Reihenfolge
      const rings = svgEl.querySelectorAll<SVGCircleElement>('#orbital-rings circle')
      const ringsArray = Array.from(rings).reverse() // aussen zuerst

      gsap.set(ringsArray, { opacity: 0 })

      // Wrapper: opacity + scale
      gsap.set(wrapper, { opacity: 0, scale: 0.88, transformOrigin: 'center center' })

      gsap.to(wrapper, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Ringe einzeln von aussen nach innen
      gsap.to(ringsArray, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.8,
        onComplete: () => {
          // Nach Load-Animation: Idle-Loops starten

          // Loop A — Kern-Puls (innerster Ring)
          const innerRing = rings[0]
          if (innerRing) {
            gsap.to(innerRing, {
              scale: 1.06,
              duration: 2.4,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              transformOrigin: 'center center',
            })
          }

          // Loop B — Gesamtfeld-Atmen
          const orbitalRings = svgEl.querySelector<SVGGElement>('#orbital-rings')
          if (orbitalRings) {
            gsap.to(orbitalRings, {
              scale: 0.985,
              duration: 4,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: 1.2,
              transformOrigin: 'center center',
            })
          }

          // Loop C — Lensing-Rotation (kontinuierlich, kein yoyo)
          const lensingEllipses = svgEl.querySelector<SVGGElement>('#lensing-ellipses')
          if (lensingEllipses) {
            gsap.to(lensingEllipses, {
              rotation: 20,
              duration: 8,
              ease: 'none',
              repeat: -1,
              transformOrigin: 'center center',
            })
          }
        },
      })

      // --- ScrollTrigger: SVG skaliert und faded beim Scrollen ---
      const heroSection = document.querySelector<HTMLElement>('[aria-label="Hero"]')
      if (heroSection) {
        ScrollTrigger.create({
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          animation: gsap.to(wrapper, {
            scale: 1.15,
            opacity: 0,
            ease: 'none',
            transformOrigin: 'center center',
          }),
        })
      }
    }
  }, [])

  return null
}
