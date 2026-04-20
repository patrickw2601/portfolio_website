import { motion, useReducedMotion } from 'framer-motion'
import { education } from '../data/site'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'
import { MotionDivider } from './MotionDivider'
import { Reveal } from './Reveal'

const spring = { type: 'spring' as const, stiffness: 62, damping: 9.8, mass: 0.68 }

export function EducationSection() {
  const reduce = useReducedMotion()
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  const item = {
    hidden: { opacity: 1, x: 132, y: 56, rotateZ: -4, skewX: 3, scale: 0.84 },
    show: { opacity: 1, x: 0, y: 0, rotateZ: 0, skewX: 0, scale: 1, transition: spring },
  }

  return (
    <div className="py-14 md:py-16">
      <div className="flow-section">
        <MotionDivider className="mb-10" />
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">Education</p>
        </Reveal>

        {reduce ? (
          <div className="mt-10 space-y-0 divide-y divide-[var(--color-line)]">
            {education.map((block) => (
              <article key={block.id} className="group py-10 transition-colors first:pt-2 hover:bg-ink-900/[0.02]">
                {renderEducationBlock(block)}
              </article>
            ))}
          </div>
        ) : (
          <motion.div
            ref={ref}
            className="mt-10 space-y-0 divide-y divide-[var(--color-line)] will-change-transform"
            initial="hidden"
            animate={visible ? 'show' : 'hidden'}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.13, delayChildren: 0.06 } },
            }}
          >
            {education.map((block) => (
              <motion.article
                key={block.id}
                variants={item}
                className="group py-10 transition-colors first:pt-2 hover:bg-ink-900/[0.02]"
              >
                {renderEducationBlock(block)}
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function renderEducationBlock(block: (typeof education)[number]) {
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <h3 className="font-display text-lg font-semibold text-ink-900 transition-transform duration-300 group-hover:translate-x-0.5 md:text-xl">
          {block.school}
        </h3>
        <p className="text-xs font-semibold tabular-nums text-ink-600">
          {block.period} · {block.location}
        </p>
      </div>
      {block.unit ? <p className="mt-2 text-sm text-ink-800">{block.unit}</p> : null}
      <p className="mt-3 text-sm leading-relaxed text-ink-800">{block.degree}</p>
      {block.gpa ? <p className="mt-2 text-sm font-semibold text-ink-900">{block.gpa}</p> : null}
      {block.honors ? (
        <ul className="mt-5 space-y-1.5 text-sm text-ink-800">
          {block.honors.map((honor) => (
            <li key={honor}>{honor}</li>
          ))}
        </ul>
      ) : null}
      {block.courses ? (
        <p className="mt-5 text-xs leading-relaxed text-ink-600 line-clamp-3 md:line-clamp-none">
          {block.courses.join(' · ')}
        </p>
      ) : null}
    </>
  )
}
