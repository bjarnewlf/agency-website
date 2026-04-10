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
  title: 'Nullpunkt — Digitale Produkte. Design und Engineering.',
  description:
    'Wir bauen digitale Produkte — von der Idee bis zum Launch. Design und Engineering aus einer Hand.',
  alternates: {
    canonical: '/',
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
