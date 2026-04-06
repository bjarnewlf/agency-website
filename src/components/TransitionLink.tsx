'use client'

import Link from 'next/link'
import type { MouseEvent, ReactNode, CSSProperties } from 'react'
import { useContext } from 'react'
import { TransitionContext } from './TransitionProvider'

interface TransitionLinkProps {
  href: string
  children: ReactNode
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

export function TransitionLink({
  href,
  children,
  className,
  style,
  'aria-label': ariaLabel,
}: TransitionLinkProps) {
  const ctx = useContext(TransitionContext)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Anker-Links (#) — kein Intercept
    if (href.startsWith('#')) return

    // Kein Context (sollte nicht passieren) — normales Verhalten
    if (!ctx) return

    e.preventDefault()
    ctx.triggerTransition(href)
  }

  return (
    <Link href={href} className={className} style={style} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  )
}
