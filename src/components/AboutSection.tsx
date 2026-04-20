import { motion, useReducedMotion } from 'framer-motion'
import { site } from '../data/site'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'
import { MotionDivider } from './MotionDivider'
import { Reveal } from './Reveal'

const spring = { type: 'spring' as const, stiffness: 64, damping: 10, mass: 0.65 }

export function AboutSection() {
  const certsShort = site.certifications.slice(0, 4).join(' · ')
  const reduce = useReducedMotion()
  const { ref: interestsRef, visible: interestsVis } = useRevealOnScroll<HTMLUListElement>()
  const { ref: blocksRef, visible: blocksVis } = useRevealOnScroll<HTMLDivElement>()

  const slide = {
    hidden: { opacity: 1, x: -120, y: 48, rotateZ: 4, skewX: -4, scale: 0.88 },
    show: { opacity: 1, x: 0, y: 0, rotateZ: 0, skewX: 0, scale: 1, transition: spring },
  }

  const card = {
    hidden: { opacity: 1, x: 108, y: 56, rotateZ: -5, skewX: 5, scale: 0.86 },
    show: { opacity: 1, x: 0, y: 0, rotateZ: 0, skewX: 0, scale: 1, transition: spring },
  }

  return (
    <div className="py-14 md:py-16">
      <div className="flow-section">
        <MotionDivider className="mb-10" />
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">About</p>
          <p className="mt-5 text-[15px] leading-relaxed text-ink-800 md:text-base">{site.about}</p>
        </Reveal>

        {reduce ? (
          <ul className="mt-12 space-y-0 divide-y divide-[var(--color-line)]">
            {site.interests.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 py-7 transition-colors hover:bg-ink-900/[0.02] md:grid-cols-[minmax(0,160px)_1fr] md:items-start md:gap-8"
              >
                <span className="font-display text-sm font-semibold text-ink-900">{item.title}</span>
                <p className="text-sm leading-relaxed text-ink-800">{item.blurb}</p>
              </li>
            ))}
          </ul>
        ) : (
          <motion.ul
            ref={interestsRef}
            className="mt-12 space-y-0 divide-y divide-[var(--color-line)] will-change-transform"
            initial="hidden"
            animate={interestsVis ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
            }}
          >
            {site.interests.map((item) => (
              <motion.li
                key={item.title}
                variants={slide}
                className="grid gap-2 py-7 transition-colors hover:bg-ink-900/[0.02] md:grid-cols-[minmax(0,160px)_1fr] md:items-start md:gap-8"
              >
                <span className="font-display text-sm font-semibold text-ink-900">{item.title}</span>
                <p className="text-sm leading-relaxed text-ink-800">{item.blurb}</p>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      <div className="flow-section mt-14 md:mt-16">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">Certs</p>
          <p className="mt-3 text-sm leading-snug text-ink-800">{certsShort} …</p>
        </Reveal>

        {reduce ? (
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {[
              { t: 'Languages', b: site.languages.join(' · ') },
              { t: 'Skills', b: site.softSkills.slice(0, 8).join(' · ') },
              { t: 'Off hours', b: site.hobbies.join(' · ') },
            ].map((block) => (
              <div
                key={block.t}
                className="rounded-xl border border-[var(--color-line)] bg-white/70 p-4 shadow-sm transition-shadow hover:shadow-md md:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">{block.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-800">{block.b}</p>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            ref={blocksRef}
            className="mt-10 grid gap-8 will-change-transform md:grid-cols-3 md:gap-6"
            initial="hidden"
            animate={blocksVis ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
            }}
          >
            {[
              { t: 'Languages', b: site.languages.join(' · ') },
              { t: 'Skills', b: site.softSkills.slice(0, 8).join(' · ') },
              { t: 'Off hours', b: site.hobbies.join(' · ') },
            ].map((block) => (
              <motion.div
                key={block.t}
                variants={card}
                whileHover={{ y: -4, transition: { type: 'spring', stiffness: 360, damping: 20 } }}
                className="rounded-xl border border-[var(--color-line)] bg-white/70 p-4 shadow-sm transition-shadow hover:shadow-md md:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-600">{block.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-800">{block.b}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
