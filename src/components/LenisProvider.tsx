'use client'

import { useLenis } from '@/lib/hooks/useLenis'

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useLenis()

  return <>{children}</>

}
