import { stats } from '@/data/content'

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About"
      className="bg-[var(--surface-1)] border-t border-[var(--border)] py-24 px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          data-animate
          className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-4"
        >
          The team
        </p>
        <h2
          data-animate
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--text-primary)] mb-6 max-w-[640px]"
        >
          About us
        </h2>
        <p
          data-animate
          className="text-lg text-[var(--text-secondary)] max-w-[640px] leading-[1.7] mb-5"
        >
          We&apos;re a small, senior team of designers and developers. No juniors, no bloat — just the people who actually do the work.
        </p>
        <p
          data-animate
          className="text-lg text-[var(--text-secondary)] max-w-[640px] leading-[1.7] mb-16"
        >
          We believe great digital products come from tight collaboration between design and engineering, and that speed without quality is just noise.
        </p>

        <div
          data-animate
          className="grid gap-8 max-w-[720px]"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}
        >
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-5xl font-bold text-[var(--accent)] leading-none">
                {stat.value}
              </p>
              <p className="text-[0.9375rem] text-[var(--text-secondary)] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
