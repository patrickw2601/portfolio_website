import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { site } from '../data/site'
import { easeOutExpo, springSnappy } from '../lib/motionPresets'
import { MagneticButton } from './MagneticButton'
import { MarqueeSkills } from './MarqueeSkills'
import { MotionDivider } from './MotionDivider'

const spring = { type: 'spring', stiffness: 400, damping: 34 } as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.2])
  const y = useTransform(scrollYProgress, [0, 1], [0, 72])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -1.8])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.985])
  const parallaxBg = useTransform(scrollYProgress, [0, 1], [0, -40])
  const blurRead = useTransform(scrollYProgress, [0, 0.45], ['blur(0px)', 'blur(1.5px)'])

  const nameParts = site.name.split(' ')

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: reduce ? 200 : 90,
    damping: reduce ? 40 : 28,
    mass: 0.35,
  })
  const tilt = useTransform(smoothProgress, [0, 1], [0, -3])

  return (
    <motion.section
      ref={ref}
      id="top"
      className="relative flex flex-1 flex-col justify-end pb-10 pt-28 md:pb-16 md:pt-32"
      style={
        reduce
          ? { opacity, y, rotate, scale }
          : { opacity, y, rotate, scale, filter: blurRead }
      }
    >
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 mx-auto h-[min(52vh,420px)] max-w-3xl rounded-[2.5rem] bg-gradient-to-br from-ink-900/10 via-transparent to-ink-900/[0.04] blur-3xl"
          style={{ y: parallaxBg, rotate: tilt }}
          aria-hidden
        />
      ) : null}

      <div className="flow-section">
        <MotionDivider className="mb-10" />

        <motion.p
          initial={{ opacity: 0, y: 14, letterSpacing: '0.32em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
          transition={{ ...spring, delay: 0.02 }}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500"
        >
          {site.tagline}
        </motion.p>

        <h1 className="mt-4 font-display text-[clamp(2.1rem,5.2vw,3.5rem)] font-semibold leading-[1.06] tracking-tight text-ink-900">
          {nameParts.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block overflow-hidden pr-[0.25em] align-bottom"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: 0.72,
                ease: easeOutExpo,
                delay: 0.06 + i * 0.09,
              }}
            >
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 56, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ ...spring, delay: 0.1 + i * 0.08 }}
              >
                {word}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.div
          className="mt-5 max-w-full space-y-1.5 text-sm leading-snug text-ink-500 md:text-base md:leading-relaxed"
          initial={{ opacity: 0, x: -22, skewX: -3 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ ...spring, delay: 0.34 }}
        >
          <p className="max-w-full text-pretty break-words">{site.school}</p>
          <p className="max-w-full text-pretty break-words text-ink-600">{site.locations}</p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap gap-3 md:gap-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
          }}
        >
          {(
            [
              { href: '#projects', variant: 'primary' as const, label: 'Work', external: false },
              { href: site.resumeUrl, variant: 'ghost' as const, label: 'Résumé', external: true },
              { href: '#contact', variant: 'ghost' as const, label: 'Email', external: false },
            ] as const
          ).map((btn) => (
            <motion.span
              key={btn.label}
              variants={{
                hidden: { opacity: 0, y: 24, scale: 0.88, rotate: -2 },
                show: { opacity: 1, y: 0, scale: 1, rotate: 0 },
              }}
              transition={springSnappy}
            >
              <MagneticButton href={btn.href} variant={btn.variant} external={btn.external}>
                {btn.label}
              </MagneticButton>
            </motion.span>
          ))}
        </motion.div>
      </div>

      <MarqueeSkills className="mt-10 w-full shrink-0" />

      <div className="flow-section mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[var(--color-line)] pt-10 sm:grid-cols-3 lg:grid-cols-5 md:mt-14">
        {site.stats.map((item) => (
          <div key={item.label}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-600">
              {item.label}
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-ink-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
