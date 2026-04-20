import { motion, useReducedMotion } from 'framer-motion'
import type { TimelineEntry } from '../data/site'
import { useRevealOnScroll } from '../lib/useRevealOnScroll'
import { MotionDivider } from './MotionDivider'
import { Reveal } from './Reveal'

const spring = { type: 'spring' as const, stiffness: 58, damping: 9.5, mass: 0.72 }

type TimelineSectionProps = {
  eyebrow: string
  title: string
  description?: string
  entries: TimelineEntry[]
  stats?: ReadonlyArray<{ readonly value: string; readonly label: string }>
  tone?: 'default' | 'emphasis'
}

export function TimelineSection({
  eyebrow,
  title,
  description,
  entries,
  stats,
  tone = 'default',
}: TimelineSectionProps) {
  const reduce = useReducedMotion()
  const emphasis = tone === 'emphasis'
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>()

  const item = {
    hidden: {
      opacity: 1,
      x: 152,
      y: 64,
      rotateZ: -5,
      skewX: 3.5,
      scale: 0.82,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      skewX: 0,
      scale: 1,
      transition: spring,
    },
  }

  return (
    <div
      role="region"
      aria-label={title}
      className={[
        'relative py-12 md:py-14',
        emphasis ? 'bg-gradient-to-r from-ink-900/[0.06] via-transparent to-transparent' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {emphasis ? (
        <div
          className="pointer-events-none absolute bottom-10 left-0 top-10 w-1 rounded-full bg-gradient-to-b from-ink-900 via-ink-800 to-ink-700 opacity-90 md:bottom-12 md:top-12"
          aria-hidden
        />
      ) : null}
      <div className={emphasis ? 'flow-section pl-5 sm:pl-6 md:pl-8' : 'flow-section'}>
        {reduce ? (
          <>
            <MotionDivider className="mb-8 md:mb-10" />
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900">{eyebrow}</p>
              <h2
                className={[
                  'mt-2 font-display font-semibold tracking-tight text-ink-900',
                  emphasis ? 'text-2xl leading-tight md:text-3xl' : 'text-xl md:text-2xl',
                ].join(' ')}
              >
                {title}
              </h2>
              {description ? (
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-800 md:text-base">
                  {description}
                </p>
              ) : null}
            </Reveal>
            {stats ? (
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-line)] pt-7 md:mt-10 md:gap-x-10 md:pt-8">
                {stats.map((item) => (
                  <div key={item.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-600">
                      {item.label}
                    </p>
                    <p className="mt-1 font-display text-xl font-semibold tabular-nums text-ink-900 md:text-2xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <div className="mt-8 space-y-0 divide-y divide-[var(--color-line)] md:mt-10">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className={`py-8 first:pt-3 md:py-9 md:first:pt-2 ${entry.isPlaceholder ? 'opacity-75' : ''}`}
                >
                  {renderEntry(entry)}
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
              show: { transition: { staggerChildren: 0.12, delayChildren: 0.06 } },
            }}
          >
            <motion.div variants={item}>
              <MotionDivider className="mb-8 md:mb-10" />
              <Reveal>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-900">{eyebrow}</p>
                <h2
                  className={[
                    'mt-2 font-display font-semibold tracking-tight text-ink-900',
                    emphasis ? 'text-2xl leading-tight md:text-3xl' : 'text-xl md:text-2xl',
                  ].join(' ')}
                >
                  {title}
                </h2>
                {description ? (
                  <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-800 md:text-base">
                    {description}
                  </p>
                ) : null}
              </Reveal>
            </motion.div>

            {stats ? (
              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-line)] pt-7 md:mt-10 md:gap-x-10 md:pt-8"
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-600">{s.label}</p>
                    <p className="mt-1 font-display text-xl font-semibold tabular-nums text-ink-900 md:text-2xl">
                      {s.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            ) : null}

            <div className="mt-8 space-y-0 divide-y divide-[var(--color-line)] md:mt-10">
              {entries.map((entry) => (
                <motion.article
                  key={entry.id}
                  variants={item}
                  className={`py-8 transition-colors first:pt-3 hover:bg-ink-900/[0.02] md:py-9 md:first:pt-2 ${entry.isPlaceholder ? 'opacity-75' : ''}`}
                >
                  {renderEntry(entry)}
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function renderEntry(entry: TimelineEntry) {
  const tags = entry.tags && entry.tags.length > 0 ? entry.tags : null
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="text-xs font-semibold text-ink-600">{entry.org}</p>
          <h3 className="mt-1 font-display text-lg font-semibold text-ink-900 md:text-xl">{entry.title}</h3>
        </div>
        <p className="text-xs font-semibold tabular-nums text-ink-600 md:text-right">
          {entry.period}
          <br />
          {entry.location}
        </p>
      </div>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-800 md:text-base">{entry.summary}</p>
      {entry.bullets ? (
        <ul className="mt-3 space-y-1.5 text-[15px] text-ink-800 md:text-base">
          {entry.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-900" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {tags ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgb(12_12_12/0.1)] bg-ink-900/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-800"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {entry.isPlaceholder ? (
        <p className="mt-2 text-[10px] font-medium uppercase tracking-wider text-ink-500">Empty slot · site.ts</p>
      ) : null}
    </>
  )
}
