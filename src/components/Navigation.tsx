'use client'

import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useActiveSection } from '@/lib/hooks/useActiveSection'
import { TransitionLink } from '@/components/TransitionLink'

const NAV_LINKS = [
  { label: 'Projekte', href: '#work', id: 'work' },
  { label: 'Leistungen', href: '#services', id: 'services' },
  { label: 'Pakete', href: '#packages', id: 'packages' },
  { label: 'Kontakt', href: '#contact', id: 'contact' },
] as const

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const { activeSection } = useActiveSection()
  const headerRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())

  // Scroll-Hide + Dark-Mode + Progress-Bar
  useEffect(() => {
    const header = headerRef.current
    const progressBar = progressBarRef.current
    if (!header) return

    const HEADER_H = header.offsetHeight
    let lastY = window.scrollY
    let hidden = false

    const checkDark = (y: number) => {
      setIsDark(y < window.innerHeight * 0.9)
    }

    // Initial check
    checkDark(window.scrollY)

    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastY

      checkDark(y)

      // Scroll-Progress-Bar aktualisieren
      if (progressBar) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? y / docHeight : 0
        gsap.set(progressBar, { scaleX: progress })
      }

      if (y < 80) {
        if (hidden) {
          gsap.to(header, { y: 0, duration: 0.35, ease: 'power2.out' })
          hidden = false
        }
      } else if (diff > 2 && !hidden) {
        gsap.to(header, { y: -HEADER_H, duration: 0.35, ease: 'power2.inOut' })
        hidden = true
      } else if (diff < -2 && hidden) {
        gsap.to(header, { y: 0, duration: 0.35, ease: 'power2.out' })
        hidden = false
      }

      lastY = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active-Indicator: slide zu aktivem Link
  useEffect(() => {
    const indicator = indicatorRef.current
    if (!indicator) return

    const activeLink = activeSection ? linkRefs.current.get(activeSection) : null
    if (!activeLink) {
      gsap.to(indicator, { opacity: 0, duration: 0.2 })
      return
    }

    const linkRect = activeLink.getBoundingClientRect()
    const indicatorParent = indicator.parentElement
    if (!indicatorParent) return

    const parentRect = indicatorParent.getBoundingClientRect()
    const x = linkRect.left - parentRect.left + linkRect.width / 2 - 4 // 4 = half of 8px indicator width

    gsap.to(indicator, {
      x,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [activeSection])

  // Initialzustand Mobile Menu — collapsed
  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return
    gsap.set(mobileMenuRef.current, { height: 0, opacity: 0 })
  }, [])

  // Mobile Menu Animation
  useEffect(() => {
    if (!mobileMenuRef.current) return
    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isDark ? 'rgba(0,0,0,0.15)' : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: isDark ? 'blur(12px)' : 'blur(20px)',
        WebkitBackdropFilter: isDark ? 'blur(12px)' : 'blur(20px)',
        willChange: 'backdrop-filter',
        borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid var(--border)',
        boxShadow: isDark ? 'none' : '0 1px 0 rgba(0,0,0,0.04)',
        transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        position: 'fixed',
      }}
    >
      <nav
        className="flex items-center justify-between px-6 md:px-12"
        style={{ height: '72px' }}
        aria-label="Hauptnavigation"
      >
        {/* Logo */}
        <TransitionLink
          href="/"
          className="flex items-center"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '1.25rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: isDark ? '#FFFFFF' : 'var(--text-primary)',
            transition: 'color 0.4s ease',
          }}
          aria-label="Nullpunkt — Startseite"
        >
          0.
        </TransitionLink>

        {/* Desktop Nav */}
        <div className="hidden md:block relative">
          {/* Active-Section-Indicator — sliding dot */}
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              bottom: '-6px',
              left: 0,
              width: '8px',
              height: '2px',
              borderRadius: '1px',
              background: 'var(--color-accent, var(--accent))',
              opacity: 0,
              transformOrigin: 'left center',
            }}
          />
          <ul
            className="flex items-center gap-8 list-none"
            role="list"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.href}>
                  <a
                    ref={(el) => {
                      if (el) linkRefs.current.set(link.id, el)
                      else linkRefs.current.delete(link.id)
                    }}
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      color: isDark
                        ? (isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)')
                        : (isActive ? 'var(--text-primary)' : 'var(--text-secondary)'),
                      letterSpacing: '0.01em',
                      fontWeight: isActive ? 600 : 500,
                      paddingBottom: '2px',
                      transition: 'color 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isDark ? '#FFFFFF' : 'var(--text-primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isDark
                        ? (isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)')
                        : (isActive ? 'var(--text-primary)' : 'var(--text-secondary)')
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Hamburger — Mobile */}
        <button
          className="flex md:hidden flex-col justify-center items-center gap-1.5"
          style={{
            width: '44px',
            height: '44px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Menu schließen' : 'Menu öffnen'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: isDark ? '#FFFFFF' : 'var(--text-primary)',
              transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: isDark ? '#FFFFFF' : 'var(--text-primary)',
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-200"
            style={{
              background: isDark ? '#FFFFFF' : 'var(--text-primary)',
              transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Scroll-Progress-Bar — nur sichtbar wenn nicht isDark (nach Hero) */}
      <div
        ref={progressBarRef}
        className="hidden md:block"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '1px',
          background: 'var(--color-accent, var(--accent))',
          opacity: isDark ? 0 : 0.6,
          transformOrigin: 'left center',
          scaleX: 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        } as React.CSSProperties}
      />

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          overflow: 'hidden',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <ul
          className="flex flex-col list-none px-6 py-4"
          role="list"
        >
          {NAV_LINKS.map((link, index) => {
            const isActive = activeSection === link.id
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-4 text-sm"
                  tabIndex={menuOpen ? 0 : -1}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 600 : 500,
                    borderBottom: '1px solid var(--border)',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(-4px)',
                    transition: `opacity 0.2s ease ${index * 50}ms, transform 0.2s ease ${index * 50}ms`,
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
