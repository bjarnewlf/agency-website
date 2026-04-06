export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="Über nullpunkt"
      className="section-padding border-t border-[var(--border)] px-6"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="mb-16">
          <p className="eyebrow mb-4" data-animate>
            Über uns
          </p>
          <h2 data-split-headline>
            Wer dahinter steckt.
          </h2>
        </div>

        <div
          className="grid gap-8 md:gap-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {/* Block 1 — Wer */}
          <div data-animate>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '11px',
                color: '#6366F1',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              01 / Wer
            </p>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              nullpunkt ist Claas.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              Ein Entwickler der mit KI baut statt über KI redet.
              Kein Team von zwanzig, kein Overhead. Direkt, schnell, fertig.
            </p>
          </div>

          {/* Block 2 — Wie */}
          <div data-animate>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '11px',
                color: '#6366F1',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              02 / Wie
            </p>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              KI als Multiplikator.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              Claude, Cursor, n8n — die Agentur skaliert durch Werkzeuge,
              nicht durch Headcount. Mehr Output, weniger Abstimmungsrunden.
            </p>
          </div>

          {/* Block 3 — Warum nullpunkt */}
          <div data-animate>
            <p
              style={{
                fontFamily: 'var(--font-jetbrains-mono)',
                fontSize: '11px',
                color: '#6366F1',
                letterSpacing: '0.08em',
                marginBottom: '1rem',
                textTransform: 'uppercase',
              }}
            >
              03 / Warum
            </p>
            <p
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              Jedes Projekt startet bei null.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              Keine Templates, kein Framework-Fetisch. Was zählt:
              funktioniert es? Löst es das Problem? Kann es wachsen?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
