import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { LenisProvider } from '@/components/LenisProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { GridBackground } from '@/components/GridBackground'
import { CosmicField3DLoader } from '@/components/CosmicField3DLoader'
import { TransitionProvider } from '@/components/TransitionProvider'
import { PageTransitionOverlay } from '@/components/PageTransitionOverlay'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nullpunkt.cc'),
  title: 'Nullpunkt — Digitale Produkte',
  description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Nullpunkt — Digitale Produkte',
    description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
    type: 'website',
    url: 'https://nullpunkt.cc',
    images: [
      {
        url: 'https://nullpunkt.cc/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nullpunkt — Wo Ideen Masse gewinnen.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nullpunkt — Digitale Produkte',
    description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
    images: ['https://nullpunkt.cc/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Nullpunkt',
              url: 'https://nullpunkt.cc',
              description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
            }),
          }}
        />
        {/* Setzt js-ready synchron beim HTML-Parsen — vor React Hydration */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js-ready')` }} />
        {process.env.NODE_ENV === 'production' && (
          <Script
            defer
            data-domain="nullpunkt.cc"
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <div className="cosmic-bg" />
        <GridBackground />
        <CosmicField3DLoader />
        <TransitionProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
          <PageTransitionOverlay />
        </TransitionProvider>
      </body>
    </html>
  )
}
