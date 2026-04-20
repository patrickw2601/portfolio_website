import { motion, useReducedMotion } from 'framer-motion'
import { MotionDivider } from './MotionDivider'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'

const TAGS = [
  { label: 'AI', hint: 'ML & agents' },
  { label: 'Web', hint: 'Products & UI' },
  { label: 'Security', hint: 'Resilient systems' },
  { label: 'Cloud', hint: 'Scale & infra' },
] as const

const spring = { type: 'spring' as const, stiffness: 68, damping: 10.5, mass: 0.62 }

export function FlowPrinciples() {
  const reduce = useReducedMotion()
  const { ref, visible } = useRevealOnScroll<HTMLUListElement>()

  return (
    <div className="flow-section py-12 md:py-16">
      <MotionDivider className="mb-8 md:mb-10" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900">
        Focus areas
      </p>

      {reduce ? (
        <ul className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
          {TAGS.map((tag) => (
            <li
              key={tag.label}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-[rgb(12_12_12/0.12)] bg-gradient-to-br from-white to-ink-900/[0.04] px-5 py-4 shadow-sm ring-1 ring-white/80 md:px-6 md:py-5"
            >
              <span className="font-display text-[clamp(1.65rem,3.8vw,2.35rem)] font-semibold tracking-tight text-ink-900">
                {tag.label}
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-ink-600">
                {tag.hint}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <motion.ul
          ref={ref}
          className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4 [transform-style:preserve-3d]"
          style={{ perspective: 1000 }}
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14, delayChildren: 0.08 } },
          }}
        >
          {TAGS.map((tag) => (
            <motion.li
              key={tag.label}
              variants={{
                hidden: {
                  opacity: 1,
                  x: 110,
                  y: 72,
                  rotateY: 26,
                  rotateZ: -6,
                  skewX: -5,
                  scale: 0.72,
                },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  skewX: 0,
                  scale: 1,
                  transition: spring,
                },
              }}
              whileHover={{ y: -8, rotateZ: -1, transition: { type: 'spring', stiffness: 320, damping: 16 } }}
              className="group relative cursor-default overflow-hidden rounded-2xl border border-[rgb(12_12_12/0.12)] bg-gradient-to-br from-white to-ink-900/[0.04] px-5 py-4 shadow-sm ring-1 ring-white/80 transition-shadow hover:shadow-md md:px-6 md:py-5"
            >
              <span className="font-display text-[clamp(1.65rem,3.8vw,2.35rem)] font-semibold tracking-tight text-ink-900">
                {tag.label}
              </span>
              <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-ink-600">
                {tag.hint}
              </span>
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-ink-900 transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden
              />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  )
}
