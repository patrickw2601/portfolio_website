import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: reduce ? 180 : 95,
    damping: reduce ? 42 : 28,
    mass: 0.42,
  })

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden bg-ink-900/10"
      aria-hidden
    >
      {!reduce ? (
        <motion.div
          className="absolute inset-0 origin-left bg-ink-900/20 blur-[6px]"
          style={{ scaleX }}
        />
      ) : null}
      <motion.div
        className="relative h-full w-full origin-left bg-ink-900"
        style={{ scaleX }}
      />
    </div>
  )
}
