'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  useGSAP(() => {
    const sections = ['#work', '#about', '#services', '#contact']

    sections.forEach((id) => {
      const section = document.querySelector(id)
      if (!section) return

      const targets = section.querySelectorAll<HTMLElement>('[data-animate]')
      if (targets.length === 0) return

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        } as ScrollTrigger.Vars,
      })
    })

    // Wort-für-Wort-Reveal für Section-Headlines
    const headlines = document.querySelectorAll<HTMLElement>('[data-split-headline]')

    headlines.forEach((headline) => {
      const words = headline.textContent?.trim().split(/\s+/) ?? []
      headline.innerHTML = words
        .map((word) => `<span style="display:inline-block; overflow:hidden; margin-right:0.25em"><span class="split-word" style="display:inline-block; transform:translateY(100%)">${word}</span></span>`)
        .join('')

      const wordSpans = headline.querySelectorAll<HTMLElement>('.split-word')

      ScrollTrigger.create({
        trigger: headline,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(wordSpans, {
            y: '0%',
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
          })
        },
      })
    })
  }, [])

  return null
}
