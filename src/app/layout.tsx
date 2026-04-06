import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/components/LenisProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { GridBackground } from '@/components/GridBackground'
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
  title: 'Nullpunkt — Digitale Produkte',
  description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
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
        url: 'https://nullpunkt.cc/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Nullpunkt — Wo Ideen Masse gewinnen.',
      },
    ],
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
    >
      <body>
        {/* Setzt js-ready synchron beim HTML-Parsen — vor React Hydration */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js-ready')` }} />
        <GridBackground />
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
