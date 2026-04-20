import type { Transition, Variants } from 'framer-motion'

/** Snappy spring for UI bits */
export const springSnappy: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 30,
  mass: 0.52,
}

/** Softer spring for large blocks */
export const springSoft: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 28,
  mass: 0.65,
}

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export const tweenLux: Transition = {
  duration: 0.75,
  ease: easeOutExpo,
}

export function staggerContainer(stagger = 0.1, delayChildren = 0.08): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren, when: 'beforeChildren' },
    },
  }
}
