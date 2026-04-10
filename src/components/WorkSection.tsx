import { SectionHeader } from '@/components/SectionHeader'

export function WorkSection() {
  return (
    <section
      id="work"
      data-act="3"
      aria-label="Work"
      className="section-padding border-t border-[var(--border)]"
      style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', perspective: '1200px' }}>
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <SectionHeader eyebrow="REFERENZEN" headline="In Arbeit." />
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
                className="text-display"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                Kein Platz<br />für Alibi.
              </h3>
              <p
                className="text-body"
                style={{
                  marginTop: '1rem',
                  maxWidth: '360px',
                }}
              >
                Erste Projekte in Entwicklung. Case Studies folgen,
                wenn sie fertig sind — nicht vorher.
              </p>
            </div>

            {/* Rechte Spalte: Jahr */}
            <div className="flex flex-col items-end justify-center">
              <span
                className="text-heading"
                style={{
                  fontSize: '5rem',
                  color: 'var(--surface-2)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                2026
              </span>
              <span
                className="text-mono"
                style={{
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
              className="text-display"
              style={{
                fontSize: 'clamp(2rem, 8vw, 2.5rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
              }}
            >
              Kein Platz<br />für Alibi.
            </h3>
            <p
              className="text-body"
              style={{ marginTop: '1rem' }}
            >
              Erste Projekte in Entwicklung. Case Studies folgen,
              wenn sie fertig sind — nicht vorher.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
