'use client'

import { services } from '@/data/content'
import { SectionHeader } from '@/components/SectionHeader'

function highlightRow(row: HTMLElement) {
  row.style.background = 'var(--accent-subtle)'
  const num = row.querySelector<HTMLElement>('.svc-num')
  const title = row.querySelector<HTMLElement>('.svc-title')
  const arrow = row.querySelector<HTMLElement>('.svc-arrow')
  if (num) num.style.color = 'rgba(99,102,241,0.45)'
  if (title) title.style.color = 'var(--color-accent-light)'
  if (arrow) { arrow.style.color = 'var(--color-accent-light)'; arrow.style.transform = 'translateX(4px)' }
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
      data-act="2"
      aria-label="Services"
      className="section-padding border-t border-[var(--border)] px-6"
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeader eyebrow="Leistungen" headline="Was wir bauen." />
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
                className="services-row grid items-center py-8 gap-6"
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
                  className="svc-num text-display"
                  aria-hidden="true"
                  style={{
                    fontSize: '80px',
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
                    className="svc-title text-heading"
                    style={{
                      fontSize: '28px',
                      color: 'var(--text-primary)',
                      marginBottom: '0.375rem',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-body">
                    {service.text}
                  </p>
                </div>

                {/* Tags + Pfeil */}
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex gap-2 flex-wrap justify-end">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-mono"
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-accent-light)',
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
