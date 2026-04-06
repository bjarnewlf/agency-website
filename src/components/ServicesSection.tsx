'use client'

import { services } from '@/data/content'

function highlightRow(row: HTMLElement) {
  row.style.background = 'rgba(99,102,241,0.03)'
  const num = row.querySelector<HTMLElement>('.svc-num')
  const title = row.querySelector<HTMLElement>('.svc-title')
  const arrow = row.querySelector<HTMLElement>('.svc-arrow')
  if (num) num.style.color = 'rgba(99,102,241,0.45)'
  if (title) title.style.color = '#6366F1'
  if (arrow) { arrow.style.color = 'rgba(99,102,241,1)'; arrow.style.transform = 'translateX(4px)' }
}

function resetRow(row: HTMLElement) {
  row.style.background = 'transparent'
  const num = row.querySelector<HTMLElement>('.svc-num')
  const title = row.querySelector<HTMLElement>('.svc-title')
  const arrow = row.querySelector<HTMLElement>('.svc-arrow')
  if (num) num.style.color = 'rgba(99,102,241,0.15)'
  if (title) title.style.color = 'var(--text-primary)'
  if (arrow) { arrow.style.color = 'rgba(99,102,241,0.4)'; arrow.style.transform = 'translateX(0)' }
}

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="section-padding border-t border-[var(--border)] px-6"
      style={{ backgroundColor: 'var(--surface-1)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section Header */}
        <div className="mb-16">
          <p className="eyebrow mb-4" data-animate>
            Leistungen
          </p>
          <h2 data-split-headline>
            Was wir bauen.
          </h2>
        </div>

        {/* Service Rows */}
        <div>
          {services.map((service, i) => (
            <div key={service.title}>
              <div
                className="w-full"
                style={{ height: '1px', backgroundColor: 'var(--border)' }}
              />
              <div
                data-animate
                className="grid items-center py-8 gap-6"
                style={{
                  gridTemplateColumns: '80px 1fr auto',
                  borderRadius: '8px',
                  transition: 'background 0.25s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => highlightRow(e.currentTarget)}
                onMouseLeave={(e) => resetRow(e.currentTarget)}
                onTouchStart={(e) => highlightRow(e.currentTarget)}
                onTouchEnd={(e) => {
                  const row = e.currentTarget
                  setTimeout(() => resetRow(row), 300)
                }}
              >
                {/* Dekorative Ziffer */}
                <span
                  className="svc-num"
                  aria-hidden="true"
                  style={{
                    fontFamily: 'var(--font-syne)',
                    fontSize: '80px',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                    color: 'rgba(99, 102, 241, 0.15)',
                    userSelect: 'none',
                    transition: 'color 0.25s ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Service Name + Beschreibung */}
                <div>
                  <h3
                    className="svc-title"
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.375rem',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '1rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.6',
                    }}
                  >
                    {service.text}
                  </p>
                </div>

                {/* Tags + Pfeil */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex gap-2 flex-wrap justify-end">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-jetbrains-mono)',
                          fontSize: '12px',
                          color: '#6366F1',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="svc-arrow"
                    style={{
                      fontSize: '1.25rem',
                      color: 'rgba(99, 102, 241, 0.4)',
                      transition: 'color 0.25s ease, transform 0.25s ease',
                      display: 'inline-block',
                    }}
                    aria-hidden="true"
                  >
                    &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div
            className="w-full"
            style={{ height: '1px', backgroundColor: 'var(--border)' }}
          />
        </div>
      </div>
    </section>
  )
}
