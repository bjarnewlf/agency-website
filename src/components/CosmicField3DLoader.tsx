'use client'

import dynamic from 'next/dynamic'

const CosmicField3D = dynamic(() => import('@/components/CosmicField3D'), {
  ssr: false,
})

export function CosmicField3DLoader() {
  return <CosmicField3D />
}
