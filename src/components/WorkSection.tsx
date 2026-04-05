import { projects } from '@/data/content'

export function WorkSection() {
  return (
    <section
      id="work"
      aria-label="Work"
      className="bg-[var(--surface-1)] border-t border-[var(--border)] py-24 px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          data-animate
          className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-4"
        >
          Portfolio
        </p>
        <h2
          data-animate
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--text-primary)] mb-4"
        >
          Selected Work
        </h2>
        <p
          data-animate
          className="text-lg text-[var(--text-secondary)] max-w-[520px] mb-16"
        >
          A selection of projects we&apos;re proud of — from brand identity to full-stack products.
        </p>

        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
        >
          {projects.map((project, i) => (
            <article
              key={i}
              data-animate
              className="bg-[var(--bg)] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              <div className="h-60 bg-[var(--surface-2)] flex items-center justify-center">
                <span className="text-xs font-semibold tracking-[0.1em] uppercase text-[var(--text-secondary)]">
                  Project {i + 1}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  {project.title}
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-[var(--accent)] bg-[var(--accent-subtle)] rounded px-[0.625rem] py-1"
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
    </section>
  )
}
