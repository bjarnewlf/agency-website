'use client'

import React, { useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from 'framer-motion'

const CELL = 40       // Zellgröße in px
const SPEED = 0.25    // Drift-Geschwindigkeit px/frame
const SPOTLIGHT = 220 // Radius des Spotlights in px

function GridSVG({
  offsetX,
  offsetY,
  patternId,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
  patternId: string
}) {
  return (
    <svg className="w-full h-full" aria-hidden="true">
      <defs>
        <motion.pattern
          id={patternId}
          width={CELL}
          height={CELL}
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d={`M ${CELL} 0 L 0 0 0 ${CELL}`}
            fill="none"
            stroke="rgba(99, 102, 241, 1)"
            strokeWidth="1"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

const CSS_FALLBACK: React.CSSProperties = {
  backgroundSize: '40px 40px',
  backgroundImage: `
    linear-gradient(to right, rgba(99, 102, 241, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.06) 1px, transparent 1px)
  `,
}

export function GridBackground() {
  const [isTouch, setIsTouch] = useState<boolean | null>(null)

  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)
  const offsetX = useMotionValue(0)
  const offsetY = useMotionValue(0)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    if (isTouch !== false) return
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch, mouseX, mouseY])

  useAnimationFrame(() => {
    if (isTouch === false) {
      offsetX.set((offsetX.get() + SPEED) % CELL)
      offsetY.set((offsetY.get() + SPEED) % CELL)
    }
  })

  const maskImage = useMotionTemplate`radial-gradient(${SPOTLIGHT}px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  if (isTouch !== false) {
    return <div className="fixed inset-0 z-0 pointer-events-none" style={CSS_FALLBACK} />
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Basis-Grid — sehr schwach, überall sichtbar */}
      <div className="absolute inset-0" style={{ opacity: 0.055 }}>
        <GridSVG offsetX={offsetX} offsetY={offsetY} patternId="grid-base" />
      </div>

      {/* Spotlight-Grid — heller, nur im Mausbereich sichtbar */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: 0.45,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <GridSVG offsetX={offsetX} offsetY={offsetY} patternId="grid-reveal" />
      </motion.div>
    </div>
  )
}
