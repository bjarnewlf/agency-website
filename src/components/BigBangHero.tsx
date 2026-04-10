'use client'

import { useRef } from 'react'
import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '@/components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export function BigBangHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobileRef = useRef(false)
  const animationStartedRef = useRef(false)
  const pulseRef = useRef<gsap.core.Tween | null>(null)

  function handleTap() {
    if (!isMobileRef.current || animationStartedRef.current) return
    animationStartedRef.current = true
    pulseRef.current?.kill()

    const tl = gsap.timeline()
    tl.to('.bb-bg', { backgroundColor: '#0A0A0F', duration: 8 }, 0)
    tl.to('.bb-bg', { opacity: 0, duration: 2, onComplete: () => {
      document.body.dataset.act = '2'
    } }, 8)
    tl.to('.bb-singularity', { scale: 0, opacity: 0, duration: 1.5, ease: 'power2.in' }, 0)
    tl.fromTo('.bb-burst', { scale: 0, opacity: 0 }, { scale: 6, opacity: 1, duration: 3.5, ease: 'power2.out' }, 0)
    tl.to('.bb-burst', { opacity: 0, duration: 3 }, 3)
    tl.fromTo('.bb-headline', { scale: 0.03, opacity: 0 }, { scale: 1, opacity: 1, duration: 4.5, ease: 'power3.out' }, 1.5)
    tl.fromTo('.bb-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 2, stagger: 0.4 }, 5.5)
  }

  useGSAP(() => {
    isMobileRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    if (isMobileRef.current) {
      pulseRef.current = gsap.to('.bb-singularity', {
        scale: 1.5,
        opacity: 0.4,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      return
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 1.5,
        anticipatePin: 1,
      },
    })

    tl.to('.bb-bg', {
      backgroundColor: '#0A0A0F',
      duration: 8,
    }, 0)

    tl.to('.bb-bg', {
      opacity: 0,
      duration: 2,
    }, 8)

    tl.to('.bb-singularity', {
      scale: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in',
    }, 0)

    tl.fromTo('.bb-burst', {
      scale: 0,
      opacity: 0,
    }, {
      scale: 6,
      opacity: 1,
      duration: 3.5,
      ease: 'power2.out',
    }, 0)

    tl.to('.bb-burst', {
      opacity: 0,
      duration: 3,
    }, 3)

    tl.fromTo('.bb-headline', {
      scale: 0.03,
      opacity: 0,
    }, {
      scale: 1,
      opacity: 1,
      duration: 4.5,
      ease: 'power3.out',
    }, 1.5)

    tl.fromTo('.bb-sub', {
      opacity: 0,
      y: 24,
    }, {
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.4,
    }, 5.5)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
      aria-label="Hero"
      onTouchStart={handleTap}
    >
      <div
        className="bb-bg absolute inset-0"
        style={{ backgroundColor: '#000000' }}
      />


      <div
        className="bb-burst absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,1) 0%, rgba(99,102,241,0.5) 20%, rgba(248,247,245,0.6) 45%, transparent 70%)',
          transform: 'translate(-50%, -50%) scale(0)',
          opacity: 0,
          left: '50%',
          top: '50%',
        }}
      />

      <div
        className="bb-singularity absolute flex items-center justify-center"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '2rem',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.05em',
          }}
        >
          0.
        </span>
      </div>

      <div
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '1200px',
          paddingLeft: 'clamp(1.25rem, 6%, 10rem)',
          paddingRight: 'clamp(1.5rem, 6%, 4rem)',
        }}
      >
        <p
          className="bb-sub eyebrow mb-6"
          style={{ opacity: 0, color: 'var(--accent-light)' }}
        >
          KI-Agentur
        </p>

        <h1
          className="bb-headline mb-8"
          style={{
            transformOrigin: 'center center',
            opacity: 0,
          }}
        >
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)' }}>Wo Ideen</span>
          <span style={{ display: 'block', color: '#6366F1' }}>Masse</span>
          <span style={{ display: 'block', color: 'rgba(255,255,255,0.92)' }}>gewinnen.</span>
        </h1>

        <p
          className="bb-sub mb-10"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.6)',
            lineHeight: '1.7',
            maxWidth: '420px',
            opacity: 0,
          }}
        >
          KI-Produkte. Gebaut, nicht geplant.
        </p>

        <div
          className="bb-sub flex items-center gap-6"
          style={{ opacity: 0 }}
        >
          <MagneticButton>
            <a
              href="#work"
              className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-7 py-3.5 transition-all duration-200 hover:opacity-90 hover:scale-[0.98]"
              style={{
                backgroundColor: '#6366F1',
                boxShadow: 'var(--shadow-md)',
                fontFamily: 'var(--font-syne)',
              }}
            >
              Projekte ansehen
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="#contact"
              className="font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Projekt starten →
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
