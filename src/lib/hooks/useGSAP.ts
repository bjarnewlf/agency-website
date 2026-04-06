'use client'

import { useEffect, type DependencyList } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger)

export function useGSAP(
  callback: () => void,
  deps: DependencyList = []
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      callback()
    })

    return () => {
      ctx.revert()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
