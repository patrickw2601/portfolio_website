import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { site } from '../data/site'

type MarqueeSkillsProps = {
  /** Break out of a narrow container to full viewport width */
  bleed?: boolean
  className?: string
}

export function MarqueeSkills({ bleed = false, className = '' }: MarqueeSkillsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], ['-1.2deg', '0deg', '0.8deg'])
  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 2])

  const doubled = [...site.techStack, ...site.techStack]

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { skew, y: lift }}
      className={[
        'relative overflow-hidden border-y border-[var(--color-line)] bg-white/80 py-3.5 shadow-sm backdrop-blur-[2px]',
        bleed ? 'left-1/2 w-screen max-w-[100vw] -translate-x-1/2' : 'w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {!reduce ? (
        <>
          <motion.div
            className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-canvas to-transparent"
            animate={{ opacity: [0.45, 0.95, 0.45], x: [0, 6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-canvas to-transparent"
            animate={{ opacity: [0.45, 0.95, 0.45], x: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />
          <motion.div
            className="absolute inset-0 opacity-30 mix-blend-overlay"
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
        </>
      ) : null}
      <div className="flex w-max gap-8 pr-8 animate-marquee text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">
        {doubled.map((skill, index) => (
          <span key={`${skill}-${index}`} className="whitespace-nowrap">
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
