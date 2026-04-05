export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--surface-2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-4 py-8 px-8 sm:flex-row sm:justify-between sm:gap-0"
        style={{ maxWidth: '1200px' }}
      >
        {/* Copyright */}
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
        >
          &copy; 2026 Studio
        </p>

        {/* Legal Links */}
        <nav className="flex items-center gap-6" aria-label="Footer Navigation">
          <a
            href="#"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Impressum
          </a>
          <a
            href="#"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            Datenschutz
          </a>
        </nav>

        {/* Social Links */}
        <nav className="flex items-center gap-6" aria-label="Social Links">
          <a
            href="#"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-inter)' }}
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  )
}
