export function WorkSection() {
  return (
    <section
      id="work"
      aria-label="Work"
      className="section-padding border-t border-[var(--border)] px-6"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="eyebrow mb-4" data-animate>
              REFERENZEN
            </p>
            <h2 data-animate>
              In Arbeit.
            </h2>
          </div>
          <a
            data-animate
            href="#contact"
            className="text-sm font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-inter)',
              marginBottom: '0.25rem',
            }}
          >
            Mehr erfahren &rarr;
          </a>
        </div>

        {/* Single Card — volle Breite */}
        <article
          data-animate
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--surface-1)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            height: '360px',
          }}
        >
          {/* Desktop: 3-spaltiges Grid */}
          <div
            className="h-full hidden lg:grid"
            style={{
              gridTemplateColumns: '280px 1fr 200px',
              padding: '48px 56px',
              alignItems: 'center',
            }}
          >
            {/* Linke Spalte: Deko-SVG */}
            <div className="flex items-center justify-center">
              <svg
                width="120"
                height="120"
                viewBox="-80 -80 160 160"
                aria-hidden="true"
                role="presentation"
                data-animate-deco
              >
                <circle
                  cx="0" cy="0" r="80"
                  stroke="#4F46E5" strokeWidth="2" fill="none" opacity="0.25"
                />
                <circle
                  cx="0" cy="0" r="50"
                  stroke="#4F46E5" strokeWidth="1.5" fill="none" opacity="0.4"
                />
              </svg>
            </div>

            {/* Mittlere Spalte: Content */}
            <div style={{ padding: '0 2rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Kein Platz<br />für Alibi.
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginTop: '1rem',
                  maxWidth: '360px',
                }}
              >
                Die ersten Projekte laufen. VetApp. Sonos TTS.<br />
                Wenn wir etwas zeigen, ist es echt.
              </p>
            </div>

            {/* Rechte Spalte: Jahr */}
            <div className="flex flex-col items-end justify-center">
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: '5rem',
                  fontWeight: 700,
                  color: 'var(--surface-2)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                2026
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent)',
                  marginTop: '0.5rem',
                  letterSpacing: '0.05em',
                }}
              >
                &rarr; Q3
              </span>
            </div>
          </div>

          {/* Mobile: Stack-Layout */}
          <div
            className="h-full flex flex-col justify-center lg:hidden"
            style={{ padding: '40px 32px' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 'clamp(2rem, 8vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              Kein Platz<br />für Alibi.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                marginTop: '1rem',
              }}
            >
              Die ersten Projekte laufen. VetApp. Sonos TTS.<br />
              Wenn wir etwas zeigen, ist es echt.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
