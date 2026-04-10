import type { Metadata } from 'next'
import { Navigation } from '@/components/Navigation'
import { BigBangHero } from '@/components/BigBangHero'
import { BridgeSection } from '@/components/BridgeSection'
import { WorkSection } from '@/components/WorkSection'
import { ServicesSection } from '@/components/ServicesSection'
import { PackagesSection } from '@/components/PackagesSection'
import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { ScrollAnimations } from '@/components/ScrollAnimations'
import { CosmicScrollOrchestrator } from '@/components/CosmicScrollOrchestrator'

export const metadata: Metadata = {
  title: 'nullpunkt — KI-Agentur für digitale Produkte',
  description:
    'KI-Automatisierung, digitale Produkte und MVP-Entwicklung aus einer Hand. nullpunkt baut mit dir von der Idee bis zum Launch — schnell, sauber, skalierbar.',
  alternates: {
    canonical: 'https://nullpunkt.cc',
  },
  openGraph: {
    title: 'nullpunkt — KI-Agentur für digitale Produkte',
    description:
      'KI-Automatisierung, digitale Produkte und MVP-Entwicklung aus einer Hand. nullpunkt baut mit dir von der Idee bis zum Launch — schnell, sauber, skalierbar.',
    url: 'https://nullpunkt.cc',
    images: [
      {
        url: 'https://nullpunkt.cc/og-image.png',
        width: 1200,
        height: 630,
        alt: 'nullpunkt — Wo Ideen Masse gewinnen.',
      },
    ],
  },
  twitter: {
    title: 'nullpunkt — KI-Agentur für digitale Produkte',
    description:
      'KI-Automatisierung, digitale Produkte und MVP-Entwicklung aus einer Hand. nullpunkt baut mit dir von der Idee bis zum Launch — schnell, sauber, skalierbar.',
    images: ['https://nullpunkt.cc/og-image.png'],
  },
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <BigBangHero />
        <BridgeSection />
        <ServicesSection />
        <WorkSection />
        <PackagesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollAnimations />
      <CosmicScrollOrchestrator />
    </>
  )
}
