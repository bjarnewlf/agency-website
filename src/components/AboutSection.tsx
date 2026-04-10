import { SectionHeader } from '@/components/SectionHeader'

export function AboutSection() {
  return (
    <section
      id="about"
      data-act="4"
      aria-label="Über nullpunkt"
      className="section-padding border-t border-[var(--border)] px-6"
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="mb-16">
          <SectionHeader eyebrow="Über uns" headline="Wer dahinter steckt." />
        </div>

        <div
          className="grid gap-8 md:gap-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
        >
          {/* Block 1 — Wer */}
          <div data-animate>
            <p
              className="text-label"
              style={{
                color: 'var(--color-accent-light)',
                marginBottom: '1rem',
              }}
            >
              01 / Wer
            </p>
            <p
              className="text-heading text-[1.25rem] font-semibold"
              style={{
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              nullpunkt ist Claas.
            </p>
            <p className="text-body">
              Ein Entwickler der mit KI baut statt über KI redet.
              Kein Team von zwanzig, kein Overhead. Direkt, schnell, fertig.
            </p>
          </div>

          {/* Block 2 — Wie */}
          <div data-animate>
            <p
              className="text-label"
              style={{
                color: 'var(--color-accent-light)',
                marginBottom: '1rem',
              }}
            >
              02 / Wie
            </p>
            <p
              className="text-heading text-[1.25rem] font-semibold"
              style={{
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              KI als Multiplikator.
            </p>
            <p className="text-body">
              Claude, Cursor, n8n — die Agentur skaliert durch Werkzeuge,
              nicht durch Headcount. Mehr Output, weniger Abstimmungsrunden.
            </p>
          </div>

          {/* Block 3 — Warum nullpunkt */}
          <div data-animate>
            <p
              className="text-label"
              style={{
                color: 'var(--color-accent-light)',
                marginBottom: '1rem',
              }}
            >
              03 / Warum
            </p>
            <p
              className="text-heading text-[1.25rem] font-semibold"
              style={{
                color: 'var(--text-primary)',
                lineHeight: 1.5,
                marginBottom: '0.75rem',
              }}
            >
              Jedes Projekt startet bei null.
            </p>
            <p className="text-body">
              Keine Templates, kein Framework-Fetisch. Was zählt:
              funktioniert es? Löst es das Problem? Kann es wachsen?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
