import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useId, useState } from 'react'
import { education } from '../data/site'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'
import { InstitutionLogo } from './InstitutionLogo'
import { MotionDivider } from './MotionDivider'
import { Reveal } from './Reveal'

const spring = { type: 'spring' as const, stiffness: 62, damping: 9.8, mass: 0.68 }

export function EducationSection() {
  const reduce = useReducedMotion() ?? false
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
                {renderEducationBlock(block, reduce)}
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
                {renderEducationBlock(block, reduce)}
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

function renderEducationBlock(block: (typeof education)[number], reduceMotion: boolean) {
  const logo = block.logoSrc ? (
    <InstitutionLogo
      logoSrc={block.logoSrc}
      alt={block.logoAlt ?? `${block.school} logo`}
      fit={block.logoFit}
    />
  ) : null
  return (
    <div className="flex gap-4 md:gap-5">
      {logo}
      <div className="min-w-0 flex-1">
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
          <CoursesTakenDisclosure courses={block.courses} reduceMotion={reduceMotion} blockId={block.id} />
        ) : null}
      </div>
    </div>
  )
}

const panelEase = [0.22, 1, 0.36, 1] as const

function CoursesTakenDisclosure({
  courses,
  reduceMotion,
  blockId,
}: {
  courses: string[]
  reduceMotion: boolean
  blockId: string
}) {
  const [open, setOpen] = useState(false)
  const reactId = useId()
  const panelId = `courses-panel-${blockId}-${reactId}`
  const triggerId = `courses-trigger-${blockId}-${reactId}`

  const panelTransition = reduceMotion
    ? { duration: 0.15 }
    : { duration: 0.42, ease: panelEase }

  return (
    <div
      className={[
        'mt-5 rounded-lg border border-[var(--color-line)] transition-colors duration-200',
        open ? 'bg-white/85' : 'bg-white/60',
      ].join(' ')}
    >
      <button
        type="button"
        id={triggerId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-800 outline-none transition-colors hover:bg-ink-900/[0.03] focus-visible:ring-2 focus-visible:ring-ink-900/15 focus-visible:ring-offset-2 md:text-sm"
      >
        <span>Courses taken</span>
        <motion.span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[var(--color-line)] bg-ink-900/[0.03] text-[10px] text-ink-600"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.26, ease: panelEase }}
          aria-hidden
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ maxHeight: 0, opacity: reduceMotion ? 1 : 0 }}
            animate={{ maxHeight: 1600, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: reduceMotion ? 1 : 0 }}
            transition={{
              maxHeight: panelTransition,
              opacity: { duration: reduceMotion ? 0.12 : 0.22, ease: panelEase },
            }}
            className="overflow-hidden border-t border-[var(--color-line)]"
          >
            <motion.ul
              className="list-none space-y-1.5 px-3 py-3 text-xs leading-relaxed text-ink-600 md:text-sm"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: reduceMotion ? 0 : 0.036,
                    delayChildren: reduceMotion ? 0 : 0.05,
                  },
                },
                closed: {
                  transition: { staggerChildren: 0, staggerDirection: -1 },
                },
              }}
            >
              {courses.map((course) => (
                <motion.li
                  key={course}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: reduceMotion ? 0 : -10 },
                  }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.28,
                    ease: panelEase,
                  }}
                  className="border-l-2 border-[var(--color-line)] pl-3"
                >
                  {course}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
