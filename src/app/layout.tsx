import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Studio — Digital Craftsmanship',
  description: 'We build exceptional digital experiences. Design-driven development for forward-thinking companies.',
  openGraph: {
    title: 'Studio — Digital Craftsmanship',
    description: 'We build exceptional digital experiences.',
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
      className={`${inter.variable} ${syne.variable}`}
    >
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
