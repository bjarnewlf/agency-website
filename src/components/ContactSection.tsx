'use client'

import { contactEmail } from '@/data/content'
import { MagneticButton } from '@/components/MagneticButton'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding border-t border-[var(--border)] px-6 text-center"
      style={{ backgroundColor: '#F0EFFF' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <h2
          data-animate
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(3rem, 7vw, 4rem)',
            fontWeight: 800,
            color: '#0A0A0F',
            letterSpacing: '-0.03em',
            lineHeight: '0.92',
            marginBottom: '1.25rem',
          }}
        >
          Bereit?
        </h2>

        <p
          data-animate
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
          }}
        >
          Kein Pitch-Deck. Kein Formular. Einfach schreiben.
        </p>

        <div data-animate className="flex flex-col items-center gap-4">
          <MagneticButton>
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center font-semibold text-white rounded-lg px-8 py-4 transition-all duration-200 hover:opacity-90 hover:scale-[0.98]"
              style={{
                backgroundColor: '#6366F1',
                boxShadow: 'var(--shadow-md)',
                fontFamily: 'var(--font-syne)',
                fontSize: '1rem',
              }}
            >
              Projekt starten
            </a>
          </MagneticButton>

          <a
            href={`mailto:${contactEmail}`}
            className="transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
            }}
          >
            {contactEmail}
          </a>
        </div>
      </div>
    </section>
  )
}
