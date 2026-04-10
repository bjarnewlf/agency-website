export function BridgeSection() {
  return (
    <div
      id="bridge"
      data-act="2"
      className="px-6"
    >
      <div
        className="mx-auto py-16"
        style={{
          maxWidth: '1200px',
          paddingLeft: 'clamp(1.5rem, 12%, 10rem)',
        }}
      >
        <p
          data-animate
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
            maxWidth: '640px',
          }}
        >
          Eine Agentur. Ein Entwickler.{' '}
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            KI als Werkzeug, nicht als Buzzword.
          </span>
        </p>
      </div>
    </div>
  )
}
