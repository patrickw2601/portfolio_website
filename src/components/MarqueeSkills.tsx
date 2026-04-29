import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { marqueeSkills } from '../data/site'

type MarqueeSkillsProps = {
  className?: string
}

export function MarqueeSkills({ className = '' }: MarqueeSkillsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], ['-1.2deg', '0deg', '0.8deg'])
  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 2])

  const doubled = [...marqueeSkills, ...marqueeSkills]

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { skew, y: lift }}
      className={[
        'relative z-0 w-full overflow-hidden border-y border-[var(--color-line)] bg-white/80 py-3.5 shadow-sm backdrop-blur-[2px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage:
              'linear-gradient(105deg, transparent 0%, rgb(23 23 23 / 0.1) 45%, transparent 90%)',
            backgroundSize: '200% 100%',
          }}
        />
      ) : null}
      <div className="flex w-max gap-8 animate-marquee text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
        {doubled.map((skill, index) => (
          <span
            key={`${skill}-${index}`}
            className="whitespace-nowrap rounded-full border border-transparent px-2.5 py-1 transition-colors hover:border-[var(--color-line)] hover:bg-ink-900/[0.06]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
