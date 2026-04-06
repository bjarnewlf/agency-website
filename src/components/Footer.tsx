'use client'

import { TransitionLink } from '@/components/TransitionLink'

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ maxWidth: '1200px' }}
      >
        {/* Wordmark */}
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: '1rem',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          0. Nullpunkt
        </span>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2" aria-label="Footer Navigation">
          <a
            href="#work"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Projekte
          </a>
          <a
            href="#services"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Leistungen
          </a>
          <a
            href="#contact"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Kontakt
          </a>
          <TransitionLink
            href="/impressum"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Impressum
          </TransitionLink>
          <TransitionLink
            href="/datenschutz"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Datenschutz
          </TransitionLink>
        </nav>

        {/* Domain */}
        <span
          className="hidden sm:block"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
          }}
        >
          nullpunkt.cc
        </span>
      </div>
    </footer>
  )
}
