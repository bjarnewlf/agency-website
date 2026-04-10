'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { cosmicState } from '@/lib/cosmicState'

interface RingConfig {
  radius: number
  tube: number
  tiltX: number
  tiltZ: number
  speed: number
  baseOpacity: number
}

const RING_CONFIGS: RingConfig[] = [
  { radius: 1.2, tube: 0.008, tiltX: 0.3, tiltZ: 0.1, speed: 0.15, baseOpacity: 0.5 },
  { radius: 1.8, tube: 0.006, tiltX: 0.8, tiltZ: -0.2, speed: -0.1, baseOpacity: 0.4 },
  { radius: 2.5, tube: 0.005, tiltX: 1.2, tiltZ: 0.4, speed: 0.08, baseOpacity: 0.3 },
  { radius: 3.2, tube: 0.004, tiltX: 0.5, tiltZ: -0.6, speed: -0.06, baseOpacity: 0.25 },
  { radius: 4.0, tube: 0.003, tiltX: 1.5, tiltZ: 0.3, speed: 0.04, baseOpacity: 0.18 },
  { radius: 4.8, tube: 0.003, tiltX: 0.2, tiltZ: -0.8, speed: -0.03, baseOpacity: 0.12 },
  { radius: 5.5, tube: 0.002, tiltX: 1.0, tiltZ: 0.5, speed: 0.02, baseOpacity: 0.08 },
]

export function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null)
  const materialRefs = useRef<THREE.MeshBasicMaterial[]>([])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const time = clock.elapsedTime
    const { fieldOpacity, fieldRotationY, fieldScale } = cosmicState

    // Gesamte Gruppe skalieren und rotieren
    groupRef.current.rotation.y = fieldRotationY + time * 0.02 // langsame idle-Rotation
    groupRef.current.scale.setScalar(fieldScale)

    // Individuelle Ringe: eigene Rotation + Opacity
    groupRef.current.children.forEach((child, i) => {
      const config = RING_CONFIGS[i]
      if (!config) return

      // Eigene Ring-Rotation
      child.rotation.z += config.speed * 0.01

      // Opacity basierend auf fieldOpacity
      const mat = materialRefs.current[i]
      if (mat) {
        mat.opacity = config.baseOpacity * fieldOpacity
      }
    })
  })

  return (
    <group ref={groupRef}>
      {RING_CONFIGS.map((config, i) => (
        <mesh
          key={i}
          rotation={[config.tiltX, 0, config.tiltZ]}
        >
          <torusGeometry args={[config.radius, config.tube, 16, 128]} />
          <meshBasicMaterial
            ref={(el) => { if (el) materialRefs.current[i] = el }}
            color="#7c3aed"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
