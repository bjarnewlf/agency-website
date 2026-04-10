'use client'

import { packages } from '@/data/content'
import { MagneticButton } from '@/components/MagneticButton'
import { SectionHeader } from '@/components/SectionHeader'

export function PackagesSection() {
  return (
    <section
      id="packages"
      data-act="3"
      aria-label="Pakete"
      className="section-padding border-t border-[var(--border)] px-6"
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        {/* Section Header */}
        <div className="mb-16">
          <SectionHeader eyebrow="Pakete" headline="Klar definiert. Fair bepreist." />
        </div>

        {/* Package Cards — 3 Spalten Desktop, 2 Tablet, 1 Mobile */}
        <div className="packages-grid grid gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg.title} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PackageCard({ pkg }: { pkg: import('@/data/content').Package }) {
  return (
    <div
      data-animate
      style={{
        position: 'relative',
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--card-radius)',
        padding: 'var(--card-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        transition: 'border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'rgba(99, 102, 241, 0.4)'
        el.style.transform = 'translateY(-3px)'
        el.style.boxShadow = '0 8px 24px rgba(99,102,241,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Duration Badge — top right */}
      <span
        className="text-mono"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          fontSize: '12px',
          color: 'var(--color-accent-light)',
          backgroundColor: 'var(--accent-subtle)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '999px',
          padding: '2px 10px',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        {pkg.duration}
      </span>

      {/* Title */}
      <h3
        className="text-heading"
        style={{
          fontSize: '24px',
          color: 'var(--text-primary)',
          paddingRight: '4.5rem',
          lineHeight: '1.2',
        }}
      >
        {pkg.title}
      </h3>

      {/* Description */}
      <p className="text-body">
        {pkg.description}
      </p>

      {/* Scope List */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          flexGrow: 1,
        }}
      >
        {pkg.scope.map((item) => (
          <li
            key={item}
            className="text-mono"
            style={{
              fontSize: '13px',
              color: 'var(--color-accent-light)',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span aria-hidden="true" style={{ opacity: 0.5 }}>→</span>
            {item}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div style={{ marginTop: '0.5rem' }}>
        <MagneticButton>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem 1.5rem',
              backgroundColor: 'var(--color-accent-light)',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600,
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.85'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
            }}
          >
            {pkg.cta}
          </a>
        </MagneticButton>
      </div>
    </div>
  )
}
