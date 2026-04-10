'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Section-spezifische Animation-Config
interface SectionConfig {
  ease: string
  duration: number
  stagger: number
  from?: gsap.TweenVars
}

const isMobileDevice = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

export function ScrollAnimations() {
  useGSAP(() => {
    const mobile = isMobileDevice()

    // Section-spezifische Configs
    const sectionConfigs: Record<string, SectionConfig> = {
      '#services': {
        ease: mobile ? 'power2.out' : 'elastic.out(1, 0.4)',
        duration: mobile ? 0.8 : 1.0,
        stagger: mobile ? 0.06 : 0.12,
        from: mobile ? undefined : { x: -40, y: 20, opacity: 0 },
      },
      '#work': {
        ease: 'power3.out',
        duration: 0.9,
        stagger: 0.1,
        from: { scale: 0.85, opacity: 0, y: 40 },
      },
      '#packages': {
        ease: 'power2.out',
        duration: 0.8,
        stagger: 0.15,
      },
      '#about': {
        ease: 'power2.out',
        duration: 0.8,
        stagger: 0.2,
        from: mobile ? undefined : { x: -20, opacity: 0 },
      },
      '#contact': {
        ease: 'power1.out',
        duration: 0.8,
        stagger: 0.1,
        from: { scale: 0.9, opacity: 0 },
      },
    }

    const defaultConfig: SectionConfig = {
      ease: 'expo.out',
      duration: 0.8,
      stagger: 0.1,
    }

    // Animiere alle Sections
    const sections = ['#work', '#about', '#services', '#contact']

    sections.forEach((id) => {
      const section = document.querySelector(id)
      if (!section) return

      const targets = section.querySelectorAll<HTMLElement>('[data-animate]')
      if (targets.length === 0) return

      const config = sectionConfigs[id] || defaultConfig

      // Sortiere nach Typ: eyebrow → h2/h3 → rest
      const sorted = Array.from(targets).sort((a, b) => {
        const rank = (el: HTMLElement) => {
          if (el.classList.contains('eyebrow')) return 0
          const tag = el.tagName.toLowerCase()
          if (tag === 'h2' || tag === 'h3') return 1
          return 2
        }
        return rank(a) - rank(b)
      })

      sorted.forEach((el, i) => {
        const delay = i * config.stagger

        // Custom "from" Werte oder Standard (opacity 0, y 40)
        const fromVars = config.from || { opacity: 0, y: 40 }
        const toVars: gsap.TweenVars = {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: config.duration,
          ease: config.ease,
          delay,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true,
          } as ScrollTrigger.Vars,
        }

        // Setze Initial-State und animiere
        gsap.set(el, fromVars)
        gsap.to(el, toVars)
      })
    })

    // Packages Indigo-Glow (einmalig)
    if (!mobile) {
      const packageCards = document.querySelectorAll<HTMLElement>('#packages [data-animate]')
      packageCards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 75%',
          once: true,
          onEnter: () => {
            gsap.fromTo(
              card,
              { boxShadow: '0 0 0 rgba(99,102,241,0)' },
              {
                boxShadow: '0 0 40px rgba(99,102,241,0.12)',
                duration: 0.6,
                ease: 'power2.inOut',
                onComplete: () => {
                  gsap.to(card, {
                    boxShadow: '0 0 0 rgba(99,102,241,0)',
                    duration: 0.8,
                    ease: 'power2.out',
                  })
                },
              }
            )
          },
        })
      })
    }

    // Wort-für-Wort-Reveal für Section-Headlines mit clip-path
    const headlines = document.querySelectorAll<HTMLElement>('[data-split-headline]')

    headlines.forEach((headline) => {
      const words = headline.textContent?.trim().split(/\s+/) ?? []
      headline.innerHTML = words
        .map(
          (word) =>
            `<span style="display:inline-block; overflow:hidden; margin-right:0.25em"><span class="split-word" style="display:inline-block; transform:translateY(100%); clip-path:inset(100% 0 0 0)">${word}</span></span>`
        )
        .join('')

      const wordSpans = headline.querySelectorAll<HTMLElement>('.split-word')

      ScrollTrigger.create({
        trigger: headline,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(wordSpans, {
            y: '0%',
            clipPath: 'inset(0% 0 0 0)',
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
          })
        },
      })
    })
  }, [])

  return null
}
