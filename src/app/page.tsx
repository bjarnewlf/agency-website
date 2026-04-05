import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />

        {/* Work Section */}
        <section
          id="work"
          aria-label="Work"
          style={{
            background: 'var(--surface-1)',
            borderTop: '1px solid var(--border)',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
              Portfolio
            </p>
            <h2 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Selected Work
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '520px', marginBottom: '4rem' }}>
              A selection of projects we&apos;re proud of — from brand identity to full-stack products.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {[
                { title: 'Brand Identity', tags: ['Branding', 'Strategy'] },
                { title: 'E-Commerce Platform', tags: ['Web', 'Development'] },
                { title: 'Mobile App', tags: ['UI/UX', 'React Native'] },
              ].map((project, i) => (
                <article
                  key={i}
                  style={{
                    background: 'var(--bg)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-md)',
                  }}
                >
                  <div style={{ height: '240px', background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      Project {i + 1}
                    </span>
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                      {project.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--font-inter), system-ui, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            color: 'var(--accent)',
                            background: 'rgba(99, 102, 241, 0.08)',
                            borderRadius: '4px',
                            padding: '0.25rem 0.625rem',
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
        </section>

        {/* Services Section */}
        <section
          id="services"
          aria-label="Services"
          style={{
            background: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
              Capabilities
            </p>
            <h2 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              What we do
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '520px', marginBottom: '4rem' }}>
              We combine strategy, design and engineering into a single focused team.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Brand Strategy', text: 'Positioning, naming, and visual identity that makes you stand out.' },
                { title: 'Web Design', text: 'Pixel-perfect interfaces built around your users and goals.' },
                { title: 'Development', text: 'Fast, accessible, and maintainable code — from prototype to production.' },
                { title: 'Product Design', text: 'End-to-end UX design for web and mobile products.' },
                { title: 'Motion & Interaction', text: 'Animations and micro-interactions that bring your product to life.' },
                { title: 'Consulting', text: 'Strategic guidance for teams building ambitious digital products.' },
              ].map((service, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--surface-1)',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div style={{ width: '40px', height: '40px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', marginBottom: '1.25rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {service.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          aria-label="About"
          style={{
            background: 'var(--surface-1)',
            borderTop: '1px solid var(--border)',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
              The team
            </p>
            <h2 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', maxWidth: '640px' }}>
              About us
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              We&apos;re a small, senior team of designers and developers. No juniors, no bloat — just the people who actually do the work.
            </p>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.7, marginBottom: '4rem' }}>
              We believe great digital products come from tight collaboration between design and engineering, and that speed without quality is just noise.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '2rem', maxWidth: '720px' }}>
              {[
                { value: '50+', label: 'Projects shipped' },
                { value: '5', label: 'Years in business' },
                { value: '30+', label: 'Happy clients' },
                { value: '3', label: 'Core team members' },
              ].map((stat, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '3rem', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '0.9375rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          aria-label="Contact"
          style={{
            background: 'var(--surface-2)',
            borderTop: '1px solid var(--border)',
            padding: '6rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1rem' }}>
              Get in touch
            </p>
            <h2 style={{ fontFamily: 'var(--font-syne), system-ui, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', maxWidth: '640px' }}>
              Let&apos;s talk
            </h2>
            <p style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif', fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Have a project in mind? We&apos;d love to hear about it. Drop us a line and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="mailto:hello@agency.dev"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-syne), system-ui, sans-serif',
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--surface-1)',
                background: 'var(--accent)',
                borderRadius: '8px',
                padding: '0.875rem 2rem',
                boxShadow: 'var(--shadow-md)',
                transition: 'opacity 0.15s ease',
              }}
            >
              hello@agency.dev
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
