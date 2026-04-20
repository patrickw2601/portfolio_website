import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  subtle?: boolean
}

/** Bouncy, readable settle — lots of visible motion without endless oscillation */
const springDramatic = { type: 'spring' as const, stiffness: 44, damping: 7.8, mass: 0.92 }
const springSubtle = { type: 'spring' as const, stiffness: 120, damping: 14, mass: 0.55 }

/**
 * Lenis-safe entrance: large 3D-style slide + skew + blur into place.
 */
export function SectionReveal({ children, className = '', subtle = false }: SectionRevealProps) {
  const reduce = useReducedMotion()
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  const closed = subtle
    ? {
        x: 0,
        y: 72,
        rotateZ: -1.5,
        skewX: 3,
        scale: 0.97,
        opacity: 1,
        filter: 'blur(4px) brightness(0.96)',
      }
    : {
        x: 168,
        y: 'min(32vh, 280px)',
        rotateZ: -7,
        rotateY: -14,
        skewX: 6,
        scale: 0.76,
        opacity: 1,
        filter: 'blur(10px) brightness(0.88)',
      }

  const open = {
    x: 0,
    y: 0,
    rotateZ: 0,
    rotateY: 0,
    skewX: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    transition: subtle ? springSubtle : springDramatic,
  }

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        className="will-change-transform [transform-style:preserve-3d]"
        style={{ transformStyle: 'preserve-3d' }}
        initial={false}
        animate={visible ? open : closed}
      >
        {children}
      </motion.div>
    </div>
  )
}
