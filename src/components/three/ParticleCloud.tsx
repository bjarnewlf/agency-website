'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { cosmicState } from '@/lib/cosmicState'

interface Props {
  count?: number
}

export function ParticleCloud({ count = 800 }: Props) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  // Sphaerisch verteilte Positionen (Kugelkoordinaten)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Sphaerische Verteilung mit zufaelligem Radius
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 4 // Radius 1.5 bis 5.5

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current || !materialRef.current) return
    const time = clock.elapsedTime
    const { fieldOpacity, fieldScale, fieldRotationY } = cosmicState

    // Langsame Idle-Rotation
    pointsRef.current.rotation.y = fieldRotationY * 0.7 + time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.01) * 0.1

    // Scale basierend auf fieldScale
    pointsRef.current.scale.setScalar(fieldScale)

    // Opacity
    materialRef.current.opacity = fieldOpacity * 0.6 // Partikel etwas subtiler als Ringe
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.04}
        color="#a78bfa"
        transparent
        opacity={0}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
