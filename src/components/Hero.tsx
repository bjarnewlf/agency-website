import type { ReactNode } from 'react'
import { HeroAnimations } from '@/components/HeroAnimations'


function RevealLine({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  return (
    <span
      className="block overflow-hidden"
      data-reveal-line
      data-reveal-delay={delay}
    >
      <span className="block" data-reveal-text>
        {children}
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >


      {/* Content — links ausgerichtet */}
      <div
        className="relative z-10 w-full mx-auto px-6"
        style={{
          maxWidth: '1200px',
          paddingLeft: 'clamp(1.5rem, 12%, 10rem)',
          paddingRight: 'clamp(1.5rem, 6%, 4rem)',
          paddingTop: '6rem',
          paddingBottom: '6rem',
        }}
      >
        {/* Eyebrow */}
        <p
          className="eyebrow mb-6"
          data-reveal-element
          data-reveal-delay="0"
        >
          KI-Agentur
        </p>

        {/* H1 — dreizeilig, links */}
        <h1
          className="mb-8"
        >
          <RevealLine delay={0}>
            <span style={{ color: '#0A0A0F' }}>Wo Ideen</span>
          </RevealLine>
          <RevealLine delay={80}>
            <span style={{ color: '#6366F1' }}>Masse</span>
          </RevealLine>
          <RevealLine delay={160}>
            <span style={{ color: '#0A0A0F' }}>gewinnen.</span>
          </RevealLine>
        </h1>

        {/* Subline */}
        <p
          className="mb-10"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
            maxWidth: '420px',
          }}
          data-reveal-element
          data-reveal-delay="2"
        >
          Design und Engineering ohne Kompromiss.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-6"
          data-reveal-element
          data-reveal-delay="3"
        >
          <a
            href="#work"
            className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-7 py-3.5 transition-all duration-200 hover:opacity-90 hover:scale-[0.98]"
            style={{
              backgroundColor: '#6366F1',
              boxShadow: 'var(--shadow-md)',
              fontFamily: 'var(--font-syne)',
            }}
          >
            Projekte ansehen
          </a>
          <a
            href="#contact"
            className="font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            Projekt starten &rarr;
          </a>
        </div>
      </div>

      {/* Scroll-Hint */}
      <div
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      >
        <span
          className="text-[0.7rem] tracking-[0.1em] uppercase"
          style={{ color: 'var(--text-secondary)' }}
        >
          Scroll
        </span>
        <span
          className="block w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollLine 1.5s ease infinite',
          }}
        />
      </div>

      <HeroAnimations />
    </section>
  )
}
