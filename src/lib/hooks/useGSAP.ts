'use client'

import { useEffect, useRef, type DependencyList } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger)

export function useGSAP(
  callback: () => void,
  deps: DependencyList = []
) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback()
    }, containerRef.current || undefined)

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
