'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { OrbitalRings } from '@/components/three/OrbitalRings'
import { ParticleCloud } from '@/components/three/ParticleCloud'

export default function CosmicField3D() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: !isMobile }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr pixelated />
        <OrbitalRings />
        <ParticleCloud count={isMobile ? 300 : 800} />
      </Canvas>
    </div>
  )
}
