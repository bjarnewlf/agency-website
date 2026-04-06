'use client'

import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollAnimations() {
  useGSAP(() => {
    const sections = ['#work', '#services', '#contact']

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
  }, [])

  return null
}
