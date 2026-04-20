import { motion, useReducedMotion } from 'framer-motion'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'

export function MotionDivider({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>({ topFrac: 0.95, bottomFrac: 0.05 })

  if (reduce) {
    return (
      <div className={`h-px ${className}`}>
        <div className="flow-divider h-full" />
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative h-px ${className}`}>
      <motion.div
        className="h-full w-full origin-left"
        initial={{ scaleX: 0.02, opacity: 0.25, rotateZ: -1.2 }}
        animate={
          visible
            ? { scaleX: 1, opacity: 1, rotateZ: 0 }
            : { scaleX: 0.02, opacity: 0.25, rotateZ: -1.2 }
        }
        transition={{ type: 'spring', stiffness: 76, damping: 12, mass: 0.55 }}
      >
        <div className="flow-divider h-full min-w-full" />
      </motion.div>
    </div>
  )
}
