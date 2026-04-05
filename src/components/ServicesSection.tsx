import { services } from '@/data/content'

export function ServicesSection() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="bg-[var(--bg)] border-t border-[var(--border)] py-24 px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          data-animate
          className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-4"
        >
          Capabilities
        </p>
        <h2
          data-animate
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--text-primary)] mb-4"
        >
          What we do
        </h2>
        <p
          data-animate
          className="text-lg text-[var(--text-secondary)] max-w-[520px] mb-16"
        >
          We combine strategy, design and engineering into a single focused team.
        </p>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
        >
          {services.map((service, i) => (
            <div
              key={i}
              data-animate
              className="bg-[var(--surface-1)] rounded-xl p-8 transition-all duration-200 hover:-translate-y-1"
              style={{ boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="w-10 h-10 bg-[var(--accent-subtle)] rounded-lg mb-5" />
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                {service.title}
              </h3>
              <p className="text-[0.9375rem] text-[var(--text-secondary)] leading-relaxed">
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
