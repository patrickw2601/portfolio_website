import type { ReactNode } from 'react'
import { SectionReveal } from './SectionReveal'

type ScrollStageProps = {
  children: ReactNode
  className?: string
  surface?: boolean
  subtleMotion?: boolean
  reveal?: boolean
  /** Landmark id for nav anchors (#about, #work, …) */
  panelId?: string
}

const surfaceCardClass =
  'overflow-hidden rounded-2xl border border-[rgb(12_12_12/0.1)] bg-white/95 shadow-md shadow-black/8 ring-1 ring-white/90 transition-shadow duration-500 ease-out hover:shadow-lg hover:shadow-black/10 md:rounded-3xl'

export function ScrollStage({
  children,
  className = '',
  surface = true,
  subtleMotion = false,
  reveal = true,
  panelId,
}: ScrollStageProps) {
  const card = <div className={surfaceCardClass}>{children}</div>

  const surfacedBody = reveal ? <SectionReveal subtle={subtleMotion}>{card}</SectionReveal> : card

  const flatBody = reveal ? <SectionReveal subtle={subtleMotion}>{children}</SectionReveal> : children

  const Root = panelId ? 'section' : 'div'

  return (
    <Root
      id={panelId}
      className={['relative w-full py-2 md:py-3', className].filter(Boolean).join(' ')}
    >
      {!surface ? (
        <div className="relative z-0 w-full overflow-x-hidden">{flatBody}</div>
      ) : (
        <div className="relative w-full">{surfacedBody}</div>
      )}
    </Root>
  )
}
