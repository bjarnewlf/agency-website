import type { ReactNode } from 'react'

// Wrapper fuer spaetere GSAP Text-Reveal Animation
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
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      aria-label="Hero"
    >
      {/* Subtiles Grid-Pattern — Accent-Farbe mit sehr niedriger Opacity */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Dezenter Accent-Glow in der Mitte */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Eyebrow Label */}
        <p
          className="text-xs tracking-[0.15em] uppercase font-medium mb-6"
          style={{
            color: 'var(--accent)',
            fontFamily: 'var(--font-inter)',
          }}
          data-reveal-element
          data-reveal-delay="0"
        >
          Digital Craftsmanship
        </p>

        {/* Haupt-Headline — Syne, gross, gradient */}
        <h1
          className="font-bold leading-none mb-8"
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            letterSpacing: '-0.04em',
            lineHeight: '0.92',
          }}
          data-reveal-element
          data-reveal-delay="1"
        >
          <RevealLine delay={0}>
            <span
              style={{
                background:
                  'linear-gradient(135deg, #0A0A0F 0%, #6B6B7E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              We craft
            </span>
          </RevealLine>
          <RevealLine delay={80}>
            <span
              style={{
                background:
                  'linear-gradient(135deg, #6366F1 0%, #818CF8 50%, #A5B4FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              digital
            </span>
          </RevealLine>
          <RevealLine delay={160}>
            <span
              style={{
                background:
                  'linear-gradient(135deg, #0A0A0F 0%, #6B6B7E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              experiences.
            </span>
          </RevealLine>
        </h1>

        {/* Subline — Inter, ruhig */}
        <p
          className="max-w-md leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.7',
          }}
          data-reveal-element
          data-reveal-delay="2"
        >
          Design-driven development for forward-thinking companies.
          We build fast, accessible and beautiful products.
        </p>
      </div>

      {/* Scroll-Hint unten */}
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
            background:
              'linear-gradient(to bottom, var(--accent), transparent)',
            animation: 'scrollLine 1.5s ease infinite',
          }}
        />
      </div>

      {/* Scroll-Line Keyframe */}
      <style>{`
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}
