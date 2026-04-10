'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cosmicState } from '@/lib/cosmicState'

gsap.registerPlugin(ScrollTrigger)

export function CosmicScrollOrchestrator() {
  useGSAP(() => {
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const cosmicBg = document.querySelector<HTMLElement>('.cosmic-bg')

    if (!cosmicBg) return

    // ========================================
    // MOBILE: IntersectionObserver + CSS-Transitions
    // ========================================
    if (isMobile) {
      const sections = document.querySelectorAll<HTMLElement>('[data-act]')
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const act = (entry.target as HTMLElement).dataset.act || ''
              document.body.dataset.act = act
              cosmicState.act = parseInt(act) || 0
            }
          })
        },
        { threshold: 0.3 }
      )
      sections.forEach((s) => observer.observe(s))

      // Field statisch sichtbar auf Mobile
      cosmicState.fieldOpacity = 0.1
      cosmicState.act = 1

      return () => observer.disconnect()
    }

    // ========================================
    // DESKTOP: GSAP ScrollTrigger
    // ========================================

    const heroContainer = document.querySelector<HTMLElement>('[aria-label="Hero"]')

    // --- Akt I: Field erscheint ab 20% des Hero-Scrolls ---
    if (heroContainer) {
      gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: 'top top',
          end: '+=250%',
          scrub: 1.5,
          onEnter: () => { cosmicState.act = 1 },
        },
      })
        .to(cosmicState, { fieldOpacity: 0.15, duration: 5 }, 20)
    }

    // --- Grid einblenden nach Hero ---
    const gridBg = document.getElementById('grid-background')
    if (gridBg && heroContainer) {
      gsap.timeline({
        scrollTrigger: {
          trigger: heroContainer,
          start: 'top top',
          end: '+=250%',
          scrub: 1.5,
        },
      })
        .to(gridBg, { opacity: 1, duration: 5 }, 18)
    }

    // --- Akt II: Bridge/Services ---
    const bridge = document.getElementById('bridge')
    if (bridge) {
      const tlAkt2 = gsap.timeline({
        scrollTrigger: {
          trigger: bridge,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
          onEnter: () => { cosmicState.act = 2 },
        },
      })

      tlAkt2.to(cosmicBg, { backgroundColor: '#1A1A2E', duration: 1 }, 0)
      tlAkt2.to(cosmicState, { fieldOpacity: 0.35, duration: 1 }, 0)
      tlAkt2.to(cosmicState, { fieldRotationY: Math.PI / 4, duration: 1 }, 0)  // 45 Grad
      tlAkt2.to(cosmicState, { fieldScale: 140 / 120, duration: 1 }, 0)  // 140vw / 120vw
    }

    // --- Akt III: Work/Packages ---
    const work = document.getElementById('work')
    if (work) {
      const tlAkt3 = gsap.timeline({
        scrollTrigger: {
          trigger: work,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 2.5,
          onEnter: () => { cosmicState.act = 3 },
        },
      })

      tlAkt3.to(cosmicBg, { backgroundColor: '#F8F7F5', duration: 1 }, 0)
      tlAkt3.to(cosmicState, { fieldOpacity: 0.25, duration: 0.5 }, 0)
      tlAkt3.to(cosmicState, { fieldOpacity: 0.08, duration: 0.5 }, 0.5)
      tlAkt3.to(cosmicState, { fieldRotationY: 160 * Math.PI / 180, duration: 1 }, 0)
      tlAkt3.to(cosmicState, { fieldScale: 160 / 120, duration: 1 }, 0)
    }

    // --- Akt IV: About/Contact ---
    const about = document.getElementById('about')
    const contact = document.getElementById('contact')

    if (about) {
      gsap.timeline({
        scrollTrigger: {
          trigger: about,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
          onEnter: () => { cosmicState.act = 4 },
        },
      })
        .to(cosmicBg, { backgroundColor: '#F0EFFF', duration: 1 }, 0)
    }

    if (contact) {
      const tlContact = gsap.timeline({
        scrollTrigger: {
          trigger: contact,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.5,
        },
      })

      tlContact.to(cosmicState, { fieldOpacity: 0.18, duration: 0.5 }, 0)
      tlContact.to(cosmicState, { fieldScale: 90 / 120, duration: 1 }, 0)  // 90vw / 120vw
      tlContact.to(cosmicState, { fieldRotationY: Math.PI * 2, duration: 1 }, 0)  // 360 Grad

      // "0." Full Circle
      const contactZero = document.querySelector<HTMLElement>('.contact-zero')
      if (contactZero) {
        tlContact.to(contactZero, { opacity: 0.08, duration: 0.5 }, 0.3)
      }
    }
  }, [])

  return null
}
