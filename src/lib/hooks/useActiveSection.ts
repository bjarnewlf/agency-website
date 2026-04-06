'use client'

import { useState, useEffect } from 'react'

const SECTION_IDS = ['work', 'services', 'contact'] as const
type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection(): { activeSection: string | null } {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )

    if (elements.length === 0) return

    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const atBottom = pageHeight - scrollBottom < 8

      if (atBottom) {
        setActiveSection('contact')
        return
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId)
          }
        }
      },
      {
        threshold: 0,
        rootMargin: '-50% 0px -50% 0px',
      },
    )

    elements.forEach((el) => observer.observe(el))

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { activeSection }
}
