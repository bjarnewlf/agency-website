import type { ReactNode } from 'react'
import { projects } from '@/data/content'

const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
]

const cardIllustrations: ReactNode[] = [
  // VetConnect — abstraktes Herz-Stethoskop
  <svg key="vet" aria-hidden="true" className="absolute right-6 bottom-6 opacity-[0.12]" width="120" height="120" viewBox="0 0 120 120" fill="none">
    <path d="M60 95 C60 95 15 65 15 38 C15 22 27 12 40 12 C50 12 57 18 60 24 C63 18 70 12 80 12 C93 12 105 22 105 38 C105 65 60 95 60 95Z" stroke="white" strokeWidth="4" fill="none"/>
    <circle cx="82" cy="70" r="12" stroke="white" strokeWidth="3" fill="none"/>
    <path d="M82 64 L82 76 M76 70 L88 70" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <path d="M70 70 Q76 70 82 70" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>,
  // Horizon Dashboard — Chart-Linien
  <svg key="dash" aria-hidden="true" className="absolute right-6 bottom-6 opacity-[0.12]" width="120" height="100" viewBox="0 0 120 100" fill="none">
    <polyline points="8,80 30,55 52,65 74,30 96,45 112,20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <polyline points="8,90 30,75 52,80 74,60 96,68 112,50" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
    <circle cx="74" cy="30" r="4" fill="white"/>
    <circle cx="112" cy="20" r="4" fill="white"/>
    <line x1="8" y1="95" x2="112" y2="95" stroke="white" strokeWidth="1.5" opacity="0.4"/>
  </svg>,
  // Meridian Brand — geometrische Kreise
  <svg key="brand" aria-hidden="true" className="absolute right-4 bottom-4 opacity-[0.12]" width="130" height="130" viewBox="0 0 130 130" fill="none">
    <circle cx="65" cy="65" r="55" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="65" cy="65" r="38" stroke="white" strokeWidth="2" fill="none"/>
    <circle cx="65" cy="65" r="20" stroke="white" strokeWidth="2" fill="none"/>
    <line x1="10" y1="65" x2="120" y2="65" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <line x1="65" y1="10" x2="65" y2="120" stroke="white" strokeWidth="1.5" opacity="0.5"/>
    <circle cx="65" cy="65" r="4" fill="white" opacity="0.8"/>
  </svg>,
]

export function WorkSection() {
  const featured = projects[0]
  const secondary = projects.slice(1)

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
              Projekte
            </p>
            <h2 data-animate>
              Ausgewählte<br />Projekte.
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
            Alle ansehen &rarr;
          </a>
        </div>

        {/* Asymmetrisches Layout — 65% / 35% */}
        <div
          className="gap-4 flex flex-col lg:grid"
          style={{ gridTemplateColumns: '65fr 35fr' }}
        >
          {/* Featured Card — groß */}
          <article
            data-animate
            className="rounded-2xl overflow-hidden relative"
            style={{
              boxShadow: 'var(--shadow-md)',
              height: '500px',
            }}
          >
            <div
              className="absolute inset-0"
              style={{ background: gradients[0] }}
            />
            {cardIllustrations[0]}
            {/* Kategorie-Pill */}
            <span
              className="absolute top-6 left-6 text-[0.65rem] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full z-10"
              style={{
                background: 'rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.9)',
                fontFamily: 'var(--font-jetbrains-mono)',
              }}
            >
              {featured.tags[0]}
            </span>
            {/* Info unten */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 z-10"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
              }}
            >
              <h3
                className="text-2xl font-bold mb-3"
                style={{
                  color: 'rgba(255,255,255,0.97)',
                  fontFamily: 'var(--font-syne)',
                  textShadow: '0 1px 8px rgba(0,0,0,0.2)',
                }}
              >
                {featured.title}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {featured.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.7rem] font-medium px-2.5 py-0.5 rounded"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: 'var(--font-jetbrains-mono)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Rechte Spalte — 2 gestapelte Cards */}
          <div className="flex flex-col gap-4" style={{ minHeight: '500px' }}>
            {secondary.map((project, i) => (
              <article
                key={project.title}
                data-animate
                className="rounded-2xl overflow-hidden relative flex-1"
                style={{
                  boxShadow: 'var(--shadow-md)',
                  minHeight: '235px',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: gradients[i + 1] }}
                />
                {cardIllustrations[i + 1]}
                {/* Kategorie-Pill */}
                <span
                  className="absolute top-5 left-5 text-[0.65rem] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full z-10"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.9)',
                    fontFamily: 'var(--font-jetbrains-mono)',
                  }}
                >
                  {project.tags[0]}
                </span>
                {/* Info unten */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5 z-10"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{
                      color: 'rgba(255,255,255,0.97)',
                      fontFamily: 'var(--font-syne)',
                      textShadow: '0 1px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] font-medium px-2 py-0.5 rounded"
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.85)',
                          fontFamily: 'var(--font-jetbrains-mono)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
