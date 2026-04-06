import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Impressum — Nullpunkt',
  description: 'Impressum und rechtliche Angaben zu Nullpunkt.',
}

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <main
        style={{
          backgroundColor: 'var(--bg)',
          paddingTop: '72px', // Navigation-Hoehe ausgleichen
        }}
      >
        <div
          className="mx-auto px-6"
          style={{
            maxWidth: '720px',
            paddingTop: '80px',
            paddingBottom: '120px',
          }}
        >
          {/* Zurück-Link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-secondary)',
              marginBottom: '48px',
              display: 'inline-flex',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Zurück zur Startseite
          </a>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '64px',
              lineHeight: 1.1,
            }}
          >
            Impressum
          </h1>

          {/* Section: TMG */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
              }}
            >
              Angaben gemäß § 5 TMG
            </h2>
            <address
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                fontStyle: 'normal',
              }}
            >
              Claas Bjarne Wulf
              <br />
              Munketoft 32
              <br />
              24937 Flensburg
            </address>
          </section>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--border)',
              marginBottom: '48px',
            }}
          />

          {/* Section: Kontakt */}
          <section style={{ marginBottom: '48px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
              }}
            >
              Kontakt
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
              }}
            >
              E-Mail:{' '}
              <a
                href="mailto:claasbjarne@gmail.com"
                className="transition-colors duration-200 hover:text-[var(--accent-light)]"
                style={{
                  color: 'var(--accent)',
                  textDecoration: 'none',
                }}
              >
                claasbjarne@gmail.com
              </a>
            </p>
          </section>

          {/* Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'var(--border)',
              marginBottom: '48px',
            }}
          />

          {/* Section: Verantwortlich */}
          <section>
            <h2
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginBottom: '16px',
              }}
            >
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <address
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                lineHeight: 1.8,
                color: 'var(--text-primary)',
                fontStyle: 'normal',
              }}
            >
              Claas Bjarne Wulf
              <br />
              Munketoft 32
              <br />
              24937 Flensburg
            </address>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
