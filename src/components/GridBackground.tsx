'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const CELL = 60
const SEGMENTS = 6
const STRENGTH = 55
const RADIUS = 220
const LINE_COLOR = 'rgba(99, 102, 241, 0.08)'
const LINE_WIDTH = 1

const CSS_FALLBACK_STYLE: React.CSSProperties = {
  backgroundSize: '60px 60px',
  backgroundImage: `
    linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
  `,
}

export function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch !== false) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const setSize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }
    setSize()

    const xTo = gsap.quickTo(mouse.current, 'x', { duration: 0.5, ease: 'power2.out' })
    const yTo = gsap.quickTo(mouse.current, 'y', { duration: 0.5, ease: 'power2.out' })

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }
    window.addEventListener('mousemove', onMouseMove)

    const resizeObserver = new ResizeObserver(() => {
      setSize()
    })
    resizeObserver.observe(document.documentElement)

    ctx.strokeStyle = LINE_COLOR
    ctx.lineWidth = LINE_WIDTH

    let rafId: number

    const render = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const mx = mouse.current.x
      const my = mouse.current.y

      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = LINE_COLOR
      ctx.lineWidth = LINE_WIDTH

      // Vertikale Linien
      for (let col = 0; col * CELL <= w + CELL; col++) {
        const baseX = col * CELL
        ctx.beginPath()
        for (let s = 0; s * (CELL / SEGMENTS) <= h + CELL / SEGMENTS; s++) {
          const baseY = s * (CELL / SEGMENTS)
          const dx = mx - baseX
          const dy = my - baseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          let ox = 0
          let oy = 0
          if (dist >= 1) {
            const mag = STRENGTH * RADIUS * RADIUS / (dist * dist + RADIUS * RADIUS)
            ox = (dx / dist) * mag
            oy = (dy / dist) * mag
          }
          if (s === 0) {
            ctx.moveTo(baseX + ox, baseY + oy)
          } else {
            ctx.lineTo(baseX + ox, baseY + oy)
          }
        }
        ctx.stroke()
      }

      // Horizontale Linien
      for (let row = 0; row * CELL <= h + CELL; row++) {
        const baseY = row * CELL
        ctx.beginPath()
        for (let s = 0; s * (CELL / SEGMENTS) <= w + CELL / SEGMENTS; s++) {
          const baseX = s * (CELL / SEGMENTS)
          const dx = mx - baseX
          const dy = my - baseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          let ox = 0
          let oy = 0
          if (dist >= 1) {
            const mag = STRENGTH * RADIUS * RADIUS / (dist * dist + RADIUS * RADIUS)
            ox = (dx / dist) * mag
            oy = (dy / dist) * mag
          }
          if (s === 0) {
            ctx.moveTo(baseX + ox, baseY + oy)
          } else {
            ctx.lineTo(baseX + ox, baseY + oy)
          }
        }
        ctx.stroke()
      }

      rafId = requestAnimationFrame(render)
    }

    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      resizeObserver.disconnect()
    }
  }, [isTouch])

  if (isTouch !== false) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={CSS_FALLBACK_STYLE}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        willChange: 'transform',
      }}
    />
  )
}
