import { contactEmail } from '@/data/content'

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="bg-[var(--surface-2)] border-t border-[var(--border)] py-24 px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <p
          data-animate
          className="text-xs font-semibold tracking-[0.15em] uppercase text-[var(--accent)] mb-4"
        >
          Get in touch
        </p>
        <h2
          data-animate
          className="text-[clamp(1.75rem,4vw,2.75rem)] font-bold text-[var(--text-primary)] mb-6 max-w-[640px]"
        >
          Let&apos;s talk
        </h2>
        <p
          data-animate
          className="text-lg text-[var(--text-secondary)] max-w-[520px] leading-[1.7] mb-10"
        >
          Have a project in mind? We&apos;d love to hear about it. Drop us a line and we&apos;ll get back to you within 24 hours.
        </p>
        <a
          data-animate
          href={`mailto:${contactEmail}`}
          className="inline-flex items-center gap-2 text-base font-semibold text-[var(--surface-1)] bg-[var(--accent)] rounded-lg px-8 py-[0.875rem] transition-all duration-150 hover:opacity-90 hover:scale-[0.98]"
          style={{ boxShadow: 'var(--shadow-md)' }}
        >
          {contactEmail}
        </a>
      </div>
    </section>
  )
}
