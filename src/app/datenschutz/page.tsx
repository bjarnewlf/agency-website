import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Datenschutz — Nullpunkt',
  description: 'Datenschutzerklärung von Nullpunkt.',
}

const bodyStyle = {
  fontFamily: 'var(--font-inter)',
  fontSize: '1rem',
  lineHeight: 1.8,
  color: 'var(--text-primary)',
} as const

const h2Style = {
  fontFamily: 'var(--font-syne)',
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: 'var(--text-secondary)',
  marginBottom: '16px',
}

const h3Style = {
  fontFamily: 'var(--font-syne)',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: '12px',
  marginTop: '32px',
}

const dividerStyle = {
  height: '1px',
  backgroundColor: 'var(--border)',
  marginBottom: '48px',
}

const sectionStyle = { marginBottom: '48px' }

export default function DatenschutzPage() {
  return (
    <>
      <Navigation />
      <main
        style={{
          backgroundColor: 'var(--bg)',
          paddingTop: '72px',
        }}
      >
        <div
          className="mx-auto px-6"
          style={{
            maxWidth: '720px',
            paddingTop: '80px',
            paddingBottom: '120px',
          }}
        >
          {/* Zurück-Link */}
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200 hover:text-[var(--text-primary)]"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'var(--text-secondary)',
              marginBottom: '48px',
              display: 'inline-flex',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 12L6 8l4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Zurück zur Startseite
          </a>

          {/* Heading */}
          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              marginBottom: '64px',
              lineHeight: 1.1,
            }}
          >
            Datenschutzerklärung
          </h1>

          {/* 1. Datenschutz auf einen Blick */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>1. Datenschutz auf einen Blick</h2>

            <h3 style={h3Style}>Allgemeine Hinweise</h3>
            <p style={bodyStyle}>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>

            <h3 style={h3Style}>Datenerfassung auf dieser Website</h3>

            <h3 style={{ ...h3Style, marginTop: '16px' }}>
              Wer ist verantwortlich für die Datenerfassung auf dieser Website?
            </h3>
            <p style={bodyStyle}>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:
            </p>
            <address
              style={{
                ...bodyStyle,
                fontStyle: 'normal',
                marginTop: '12px',
              }}
            >
              Claas Bjarne Wulf
              <br />
              Munketoft 32
              <br />
              24937 Flensburg
              <br />
              E-Mail:{' '}
              <a
                href="mailto:claasbjarne@gmail.com"
                className="transition-colors duration-200 hover:text-[var(--accent-light)]"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                claasbjarne@gmail.com
              </a>
            </address>

            <h3 style={h3Style}>Wie erfassen wir Ihre Daten?</h3>
            <p style={bodyStyle}>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen,
              beispielsweise durch eine E-Mail-Anfrage.
            </p>
            <p style={{ ...bodyStyle, marginTop: '16px' }}>
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
              erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem
              oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
              sobald Sie diese Website betreten.
            </p>

            <h3 style={h3Style}>Wofür nutzen wir Ihre Daten?</h3>
            <p style={bodyStyle}>
              Die Daten werden erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten.
            </p>

            <h3 style={h3Style}>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p style={bodyStyle}>
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu
              weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
          </section>

          <div style={dividerStyle} />

          {/* 2. Hosting */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>2. Hosting</h2>
            <p style={bodyStyle}>
              Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
              gehostet. Wenn Sie diese Website besuchen, werden durch den Hostinganbieter
              automatisch verschiedene Server-Logfiles erfasst. Diese umfassen Ihre IP-Adresse,
              Browsertyp und -version, Betriebssystem, Referrer URL, Hostname des zugreifenden
              Rechners sowie die Uhrzeit der Serveranfrage.
            </p>
            <p style={{ ...bodyStyle, marginTop: '16px' }}>
              Vercel verarbeitet Daten auch in den USA. Es besteht ein Angemessenheitsbeschluss der
              Europäischen Kommission (EU-US Data Privacy Framework).
            </p>
            <p style={{ ...bodyStyle, marginTop: '16px' }}>
              Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir
              haben ein berechtigtes Interesse an einer zuverlässigen Darstellung unserer Website.
            </p>
          </section>

          <div style={dividerStyle} />

          {/* 3. Allgemeine Hinweise */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>3. Allgemeine Hinweise und Pflichtinformationen</h2>

            <h3 style={h3Style}>Datenschutz</h3>
            <p style={bodyStyle}>
              Der Betreiber dieser Seiten nimmt den Schutz Ihrer persönlichen Daten sehr ernst. Wir
              behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>

            <h3 style={h3Style}>Hinweis zur verantwortlichen Stelle</h3>
            <p style={bodyStyle}>
              Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            </p>
            <address
              style={{
                ...bodyStyle,
                fontStyle: 'normal',
                marginTop: '12px',
              }}
            >
              Claas Bjarne Wulf
              <br />
              Munketoft 32
              <br />
              24937 Flensburg
              <br />
              E-Mail:{' '}
              <a
                href="mailto:claasbjarne@gmail.com"
                className="transition-colors duration-200 hover:text-[var(--accent-light)]"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                claasbjarne@gmail.com
              </a>
            </address>

            <h3 style={h3Style}>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p style={bodyStyle}>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
              möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die
              Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf
              unberührt.
            </p>

            <h3 style={h3Style}>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p style={bodyStyle}>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei
              einer Aufsichtsbehörde zu. Zuständig ist:
            </p>
            <address
              style={{
                ...bodyStyle,
                fontStyle: 'normal',
                marginTop: '12px',
              }}
            >
              Unabhängiges Landeszentrum für Datenschutz Schleswig-Holstein (ULD)
              <br />
              Holstenstraße 98
              <br />
              24103 Kiel
              <br />
              E-Mail:{' '}
              <a
                href="mailto:mail@datenschutzzentrum.de"
                className="transition-colors duration-200 hover:text-[var(--accent-light)]"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                mail@datenschutzzentrum.de
              </a>
              <br />
              Website:{' '}
              <a
                href="https://www.datenschutzzentrum.de"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200 hover:text-[var(--accent-light)]"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                www.datenschutzzentrum.de
              </a>
            </address>

            <h3 style={h3Style}>Recht auf Datenübertragbarkeit</h3>
            <p style={bodyStyle}>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in
              Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in
              einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
            </p>

            <h3 style={h3Style}>Auskunft, Löschung und Berichtigung</h3>
            <p style={bodyStyle}>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
              unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren
              Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf
              Berichtigung oder Löschung dieser Daten.
            </p>
          </section>

          <div style={dividerStyle} />

          {/* 4. Datenerfassung */}
          <section style={sectionStyle}>
            <h2 style={h2Style}>4. Datenerfassung auf dieser Website</h2>

            <h3 style={h3Style}>Server-Log-Files</h3>
            <p style={bodyStyle}>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
              Server-Log-Files, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul
              style={{
                ...bodyStyle,
                marginTop: '12px',
                paddingLeft: '24px',
                listStyleType: 'disc',
              }}
            >
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p style={{ ...bodyStyle, marginTop: '16px' }}>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
              Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 style={h3Style}>Anfrage per E-Mail</h3>
            <p style={bodyStyle}>
              Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller daraus
              hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung
              Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne
              Ihre Einwilligung weiter.
            </p>
            <p style={{ ...bodyStyle, marginTop: '16px' }}>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
              Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
              beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <div style={dividerStyle} />

          {/* 5. Schriftarten */}
          <section>
            <h2 style={h2Style}>5. Schriftarten</h2>
            <p style={bodyStyle}>
              Diese Website nutzt lokal eingebundene Schriftarten (Google Fonts via Next.js). Es
              findet keine Verbindung zu Servern von Google statt. Ihre IP-Adresse wird nicht an
              Google übertragen.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
