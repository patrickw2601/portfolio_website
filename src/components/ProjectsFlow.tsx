import { motion, useReducedMotion } from 'framer-motion'
import { projects } from '../data/site'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'
import { MotionDivider } from './MotionDivider'

const spring = { type: 'spring' as const, stiffness: 58, damping: 9.2, mass: 0.7 }

export function ProjectsFlow() {
  const reduce = useReducedMotion()
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  const item = {
    hidden: { opacity: 1, x: 160, y: 72, rotateZ: -5.5, skewX: 4, scale: 0.8 },
    show: { opacity: 1, x: 0, y: 0, rotateZ: 0, skewX: 0, scale: 1, transition: spring },
  }

  return (
    <div className="py-14 md:py-16">
      {reduce ? (
        <>
          <div className="flow-section-wide px-5 md:px-6">
            <MotionDivider className="mb-10" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">Projects</p>
          </div>
          <div className="mx-auto mt-10 max-w-5xl px-5 md:px-6">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="border-t border-[var(--color-line)] py-11 transition-colors first:border-t-0 first:pt-0 hover:bg-ink-900/[0.02] md:py-12"
              >
                {renderProject(project, index)}
              </article>
            ))}
          </div>
        </>
      ) : (
        <motion.div
          ref={ref}
          className="will-change-transform"
          initial="hidden"
          animate={visible ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.13, delayChildren: 0.06 } },
          }}
        >
          <motion.div variants={item} className="flow-section-wide px-5 md:px-6">
            <MotionDivider className="mb-10" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-600">Projects</p>
          </motion.div>

          <div className="mx-auto mt-10 max-w-5xl px-5 md:px-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                variants={item}
                whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="border-t border-[var(--color-line)] py-11 transition-colors first:border-t-0 first:pt-0 hover:bg-ink-900/[0.02] md:py-12"
              >
                {renderProject(project, index)}
              </motion.article>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

function renderProject(project: (typeof projects)[number], index: number) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-semibold text-ink-900 md:text-2xl">{project.title}</h3>
        <span className="text-xs font-semibold tabular-nums text-ink-600">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-800 md:text-[15px]">{project.summary}</p>
      <p className="mt-5 text-xs font-medium text-ink-600">{project.stack.join(' · ')}</p>
    </>
  )
}
