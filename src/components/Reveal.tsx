import type { ReactNode } from 'react'

type RevealMode = 'blurUp' | 'maskUp' | 'slideSkew' | 'scale'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  mode?: RevealMode
}

/** Stable wrapper — scroll-driven opacity/blur was getting stuck invisible with smooth scroll. */
export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>
}
