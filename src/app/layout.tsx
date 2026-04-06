import type { Metadata } from 'next'
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
import { LenisProvider } from '@/components/LenisProvider'
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
  openGraph: {
    title: 'Nullpunkt — Digitale Produkte',
    description: 'Digitale Produkte. Design und Engineering aus einer Hand.',
    type: 'website',
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
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
