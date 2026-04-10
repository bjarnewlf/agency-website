'use client'

import { useEffect, type DependencyList, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger)

export function useGSAP(
  callback: () => void,
  deps: DependencyList = [],
  containerRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback()
    }, containerRef?.current || undefined)

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
