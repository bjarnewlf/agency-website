'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/lib/hooks/useGSAP'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '@/components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// ─── Farben ────────────────────────────────────────────────────────────────
const COLORS = {
  coreWhite:    '#FFFFFF',
  plasmaIndigo: '#6366F1',
  plasmaViolet: '#8B5CF6',
  novaMagenta:  '#EC4899',
  stellarCyan:  '#22D3EE',
  coronaAmber:  '#F59E0B',
}

// ─── Hilfsfunktionen ───────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function easeInQuad(t: number): number {
  return t * t
}

function easeSineInOut(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

// ─── Typen ─────────────────────────────────────────────────────────────────
type ParticleType = 'A' | 'B' | 'C' | 'D'

interface Particle {
  type: ParticleType
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  streakW: number
  streakH: number
  color: string
  opacity: number
  maxOpacity: number
  lifetime: number   // ms
  age: number        // ms
  angle: number      // Bewegungsrichtung in Radiant
}

interface Shockwave {
  delay: number
  maxRadius: number
  color: string
  maxOpacity: number
  strokeWidth: number
  blur: number
  duration: number   // ms
  age: number        // ms seit Start (negativ = noch nicht gestartet)
}

interface IdlePulse {
  age: number
  period: number
}

// ─── Canvas-Renderer ────────────────────────────────────────────────────────

class BigBangCanvas {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr: number
  private W = 0
  private H = 0
  private cx = 0
  private cy = 0

  private particles: Particle[] = []
  private shockwaves: Shockwave[] = []
  private idle: IdlePulse = { age: 0, period: 2000 }
  private exploded = false
  private explodeAge = 0         // ms seit Explosion

  // Flash state
  private flashAge = -1          // -1 = inaktiv
  private flashDuration = 80     // ms

  // Burst gradient state
  private burstAge = -1
  private burstDuration = 300    // ms
  private burstMaxRadius = 280

  private lastTime: number | null = null
  private rafId = 0
  private reducedMotion = false
  private lowEnd = false

  constructor(canvas: HTMLCanvasElement, reducedMotion: boolean, lowEnd: boolean) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.reducedMotion = reducedMotion
    this.lowEnd = lowEnd
    this.dpr = typeof window !== 'undefined' ? (window.devicePixelRatio || 1) : 1
    this.resize()
    this.rafId = requestAnimationFrame(this.loop)
  }

  resize() {
    const rect = this.canvas.parentElement!.getBoundingClientRect()
    this.W = rect.width
    this.H = rect.height
    this.cx = this.W / 2
    this.cy = this.H / 2
    this.canvas.width = this.W * this.dpr
    this.canvas.height = this.H * this.dpr
    this.canvas.style.width = `${this.W}px`
    this.canvas.style.height = `${this.H}px`
    this.ctx.scale(this.dpr, this.dpr)
  }

  explode() {
    if (this.exploded) return
    this.exploded = true
    this.explodeAge = 0
    this.flashAge = 0

    const mult = this.lowEnd ? 0.5 : 1.0
    const cx = this.cx
    const cy = this.cy

    // ── Typ D — Micro-Sparks (sofort, Phase 0ms) ──────────────────────────
    if (!this.lowEnd) {
      const countD = 30
      for (let i = 0; i < countD; i++) {
        const angle = rand(0, Math.PI * 2)
        const speed = 1500
        this.particles.push({
          type: 'D',
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1,
          streakW: 0, streakH: 0,
          color: pick([COLORS.coronaAmber, COLORS.coreWhite]),
          opacity: 1, maxOpacity: 1,
          lifetime: 200, age: 0,
          angle,
        })
      }
    }

    // ── Typ A — Core Burst (Phase 80ms) ──────────────────────────────────
    const countA = Math.round(60 * mult)
    for (let i = 0; i < countA; i++) {
      const angle = rand(0, Math.PI * 2)
      const speed = rand(800, 1200)
      this.particles.push({
        type: 'A',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: rand(2, 4),
        streakW: 0, streakH: 0,
        color: pick([COLORS.coreWhite, COLORS.novaMagenta]),
        opacity: 0, maxOpacity: 1.0,
        lifetime: 400,
        age: -80,  // startet bei 80ms
        angle,
      })
    }

    // ── Typ B — Plasma Streams (Phase 130ms) ─────────────────────────────
    const countB = Math.round(80 * mult)
    for (let i = 0; i < countB; i++) {
      const angle = rand(0, Math.PI * 2)
      const speed = rand(400, 700)
      const scale = rand(1, 2)
      this.particles.push({
        type: 'B',
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 0,
        streakW: scale * 1,
        streakH: scale * 8,
        color: pick([COLORS.plasmaViolet, COLORS.plasmaIndigo]),
        opacity: 0, maxOpacity: 0.9,
        lifetime: 800,
        age: -130,
        angle,
      })
    }

    // ── Typ C — Stellar Debris (Phase 300ms) ─────────────────────────────
    const countC = Math.round(40 * mult)
    for (let i = 0; i < countC; i++) {
      const baseAngle = rand(0, Math.PI * 2)
      const noiseAngle = baseAngle + rand(-20, 20) * (Math.PI / 180)
      const speed = rand(150, 300)
      this.particles.push({
        type: 'C',
        x: cx, y: cy,
        vx: Math.cos(noiseAngle) * speed,
        vy: Math.sin(noiseAngle) * speed,
        radius: rand(3, 7),
        streakW: 0, streakH: 0,
        color: pick([COLORS.plasmaIndigo, COLORS.stellarCyan]),
        opacity: 0, maxOpacity: 0.8,
        lifetime: 1400,
        age: -300,
        angle: noiseAngle,
      })
    }

    // ── Shockwaves ─────────────────────────────────────────────────────────
    this.shockwaves = [
      { delay: 80,  maxRadius: 180, color: '#FFFFFF', maxOpacity: 0.8, strokeWidth: 2,   blur: 0, duration: 400, age: -80 },
      { delay: 200, maxRadius: 280, color: '#8B5CF6', maxOpacity: 0.6, strokeWidth: 1.5, blur: 2, duration: 600, age: -200 },
      { delay: 380, maxRadius: 380, color: '#6366F1', maxOpacity: 0.4, strokeWidth: 1,   blur: 4, duration: 900, age: -380 },
    ]

    // Burst Gradient bei 300ms
    this.burstAge = -300
  }

  private loop = (now: number) => {
    const dt = this.lastTime === null ? 0 : Math.min(now - this.lastTime, 50)
    this.lastTime = now

    const ctx = this.ctx
    ctx.clearRect(0, 0, this.W, this.H)

    if (this.exploded) {
      this.explodeAge += dt
      this.drawExplosion(dt)
    } else {
      this.drawIdle(dt)
    }

    this.rafId = requestAnimationFrame(this.loop)
  }

  private drawIdle(dt: number) {
    if (this.reducedMotion) {
      // Nur statischer Punkt ohne Puls
      this.drawIdlePoint(1.0, 0.6)
      return
    }

    this.idle.age = (this.idle.age + dt) % this.idle.period
    const t = this.idle.age / this.idle.period
    const s = easeSineInOut(t < 0.5 ? t * 2 : (1 - t) * 2)
    const scale = 1.0 + s * 0.6   // 1.0 → 1.6 → 1.0
    const opacity = 0.4 + s * 0.4  // 0.4 → 0.8 → 0.4
    this.drawIdlePoint(scale, opacity)
  }

  private drawIdlePoint(scale: number, opacity: number) {
    const ctx = this.ctx
    const r = 4 * scale

    ctx.save()
    ctx.shadowColor = COLORS.plasmaIndigo
    ctx.shadowBlur = 12 * scale
    ctx.globalAlpha = opacity
    ctx.fillStyle = COLORS.coreWhite
    ctx.beginPath()
    ctx.arc(this.cx, this.cy, r, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  private drawExplosion(dt: number) {
    const ctx = this.ctx

    // ── Flash ────────────────────────────────────────────────────────────
    if (this.flashAge >= 0 && this.flashAge < this.flashDuration) {
      this.flashAge += dt
      const t = Math.min(this.flashAge / this.flashDuration, 1)
      const radius = easeOutCubic(t) * 60
      const opacity = (1 - t) * 0.9
      const grad = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, radius)
      grad.addColorStop(0, `rgba(255,255,255,${opacity})`)
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.save()
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, this.W, this.H)
      ctx.restore()
    } else if (this.flashAge >= this.flashDuration) {
      this.flashAge = -1
    }

    // ── Burst Gradient ───────────────────────────────────────────────────
    if (this.burstAge >= 0 && this.burstAge < this.burstDuration) {
      this.burstAge += dt
      const t = Math.min(this.burstAge / this.burstDuration, 1)
      const radius = easeOutCubic(t) * this.burstMaxRadius
      const opacity = easeOutCubic(t) * 0.6
      const grad = ctx.createRadialGradient(this.cx, this.cy, 0, this.cx, this.cy, radius)
      grad.addColorStop(0, `rgba(255,255,255,${opacity})`)
      grad.addColorStop(0.2, `rgba(99,102,241,${opacity * 0.5})`)
      grad.addColorStop(1, 'rgba(99,102,241,0)')
      ctx.save()
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, this.W, this.H)
      ctx.restore()
    } else if (this.burstAge >= this.burstDuration) {
      this.burstAge = -2  // deaktiviert
    } else if (this.burstAge < 0 && this.burstAge !== -2) {
      this.burstAge += dt
    }

    // ── Shockwaves ───────────────────────────────────────────────────────
    for (const sw of this.shockwaves) {
      sw.age += dt
      if (sw.age < 0) continue

      const t = Math.min(sw.age / sw.duration, 1)
      const radius = easeOutCubic(t) * sw.maxRadius
      const opacity = sw.maxOpacity * (1 - t)

      ctx.save()
      if (sw.blur > 0) {
        ctx.filter = `blur(${sw.blur}px)`
      }
      ctx.globalAlpha = opacity
      ctx.strokeStyle = sw.color
      ctx.lineWidth = sw.strokeWidth
      ctx.beginPath()
      ctx.arc(this.cx, this.cy, radius, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()
    }

    // ── Partikel ─────────────────────────────────────────────────────────
    const alive: Particle[] = []
    for (const p of this.particles) {
      p.age += dt

      // Noch nicht aktiv
      if (p.age < 0) {
        alive.push(p)
        continue
      }

      if (p.age > p.lifetime) continue  // tot, nicht weiter sammeln
      alive.push(p)

      const t = p.age / p.lifetime
      const dtSec = dt / 1000

      // Position update
      if (p.type === 'B') {
        // ease-out cubic deceleration
        const speedFactor = 1 - easeOutCubic(t)
        p.x += p.vx * speedFactor * dtSec
        p.y += p.vy * speedFactor * dtSec
      } else {
        p.x += p.vx * dtSec
        p.y += p.vy * dtSec
      }

      // Opacity
      switch (p.type) {
        case 'A': p.opacity = p.maxOpacity * (1 - t); break
        case 'B': p.opacity = p.maxOpacity * (1 - t); break
        case 'C': p.opacity = p.maxOpacity * (1 - easeInQuad(t)); break
        case 'D': p.opacity = p.maxOpacity * (1 - t); break
      }

      ctx.save()

      if (p.type === 'C') {
        // Glow via shadowBlur
        ctx.shadowColor = p.color
        ctx.shadowBlur = p.radius * 2
      }

      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color

      if (p.type === 'B') {
        // Elongierter Streak: rotiert entlang Bewegungsrichtung
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.beginPath()
        ctx.ellipse(0, 0, p.streakW, p.streakH, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }
    this.particles = alive
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
  }
}

// ─── Komponente ─────────────────────────────────────────────────────────────

export function BigBangHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<BigBangCanvas | null>(null)
  const isMobileRef = useRef(false)
  const animationStartedRef = useRef(false)
  const pulseRef = useRef<gsap.core.Tween | null>(null)

  // Canvas-Setup für Mobile
  useEffect(() => {
    if (!canvasRef.current) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowEnd = (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
      || ((navigator as { deviceMemory?: number }).deviceMemory != null && ((navigator as { deviceMemory?: number }).deviceMemory ?? 4) <= 2)

    const mobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!mobile) return

    const renderer = new BigBangCanvas(canvasRef.current, reducedMotion, lowEnd)
    rendererRef.current = renderer

    const ro = new ResizeObserver(() => {
      renderer.resize()
    })
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      renderer.destroy()
      ro.disconnect()
      rendererRef.current = null
    }
  }, [])

  function handleTap() {
    if (!isMobileRef.current || animationStartedRef.current) return
    animationStartedRef.current = true
    pulseRef.current?.kill()

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      // Nur direkter Headline-Fade, keine Explosion
      gsap.to('.bb-headline', { opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' })
      gsap.to('.bb-sub', { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, delay: 0.2 })
      return
    }

    // Canvas-Explosion starten
    rendererRef.current?.explode()

    // DOM-Timeline: Hintergrund + Headline Blur-to-Sharp nach 1600ms
    const tl = gsap.timeline()
    tl.to('.bb-bg', { backgroundColor: '#F8F7F5', duration: 2, ease: 'power2.out' }, 0.8)
    tl.fromTo(
      '.bb-headline',
      { filter: 'blur(8px)', opacity: 0, scale: 0.95 },
      { filter: 'blur(0px)', opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
      1.6
    )
    tl.fromTo('.bb-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.3 }, 2.4)
  }

  useGSAP(() => {
    isMobileRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches

    if (isMobileRef.current) {
      // Kein GSAP-Pulse mehr — Canvas übernimmt Idle Pulse
      return
    }

    // ── Desktop: ScrollTrigger (unverändert) ────────────────────────────
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
      backgroundColor: '#F8F7F5',
      duration: 10,
    }, 0)

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
      style={{ backgroundColor: '#000000' }}
      aria-label="Hero"
      onTouchStart={handleTap}
    >
      <div
        className="bb-bg absolute inset-0"
        style={{ backgroundColor: '#000000' }}
      />

      {/* Canvas: Mobile-Animationen (Idle Pulse + Explosion) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Desktop-only: Burst + Singularity DOM-Elemente */}
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
          zIndex: 1,
        }}
      />

      <div
        className="bb-singularity absolute flex items-center justify-center"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
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

      {/* Touch-Target: mindestens 44×44px, unsichtbar */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '44px',
          height: '44px',
          zIndex: 4,
        }}
        aria-hidden="true"
      />

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
          <span style={{ display: 'block', color: '#0A0A0F' }}>Wo Ideen</span>
          <span style={{ display: 'block', color: '#6366F1' }}>Masse</span>
          <span style={{ display: 'block', color: '#0A0A0F' }}>gewinnen.</span>
        </h1>

        <p
          className="bb-sub mb-10"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '1.125rem',
            color: 'var(--text-secondary)',
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
              style={{ color: 'var(--text-secondary)' }}
            >
              Projekt starten →
            </a>
          </MagneticButton>
        </div>
      </div>
    </div>
  )
}
