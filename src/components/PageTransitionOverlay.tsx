'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { TransitionProvider } from './TransitionProvider'

export function PageTransitionOverlay() {
  const voidPanelRef = useRef<HTMLDivElement>(null)
  const accentPanelRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const voidPanel = voidPanelRef.current
    const accentPanel = accentPanelRef.current
    const label = labelRef.current
    if (!voidPanel || !accentPanel || !label) return

    // Initial: beide Panels unten (unsichtbar)
    gsap.set(voidPanel, { y: '100%' })
    gsap.set(accentPanel, { y: '100%' })
    gsap.set(label, { opacity: 0 })

    // Panels bei TransitionProvider registrieren
    const registerFn = (
      TransitionProvider as unknown as {
        _registerPanels?: (
          v: HTMLDivElement,
          a: HTMLDivElement,
          l: HTMLDivElement,
        ) => void
      }
    )._registerPanels

    if (registerFn) {
      registerFn(voidPanel, accentPanel, label)
    }
  }, [])

  const panelBase: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '105vh',
    pointerEvents: 'none',
  }

  return (
    <>
      {/* Void-Panel (schwarz) — liegt unter dem Accent-Panel, ragt 48px raus */}
      <div
        ref={voidPanelRef}
        aria-hidden="true"
        style={{
          ...panelBase,
          backgroundColor: '#0A0A0F',
          zIndex: 10000,
          transform: 'translateY(100%)',
        }}
      />

      {/* Accent-Panel (lila) — liegt oben */}
      <div
        ref={accentPanelRef}
        aria-hidden="true"
        style={{
          ...panelBase,
          backgroundColor: '#6366F1',
          zIndex: 10001,
          transform: 'translateY(100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* "0." Label */}
        <div
          ref={labelRef}
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-jetbrains-mono)',
            fontSize: '4rem',
            fontWeight: 700,
            color: '#FFFFFF',
            opacity: 0,
            userSelect: 'none',
            letterSpacing: '0.05em',
          }}
        >
          0.
        </div>
      </div>
    </>
  )
}
