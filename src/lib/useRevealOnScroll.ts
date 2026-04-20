import { useCallback, useEffect, useRef, useState } from 'react'

type Options = {
  /**
   * Fraction of viewport height: treat as visible when the element’s bounds
   * intersect this band (tunable for earlier/later reveal).
   */
  topFrac?: number
  bottomFrac?: number
}

/**
 * Lenis-safe: visibility follows scroll position so animations can **replay**
 * when you scroll away and come back (up or down). Not “once and stuck”.
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(options?: Options) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  const topFrac = options?.topFrac ?? 0.9
  const bottomFrac = options?.bottomFrac ?? 0.1

  const check = useCallback(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const vh = window.innerHeight
    const topLine = vh * topFrac
    const bottomLine = vh * bottomFrac
    const next = r.top < topLine && r.bottom > bottomLine
    setVisible(next)
  }, [bottomFrac, topFrac])

  useEffect(() => {
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    const id = requestAnimationFrame(check)
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [check])

  return { ref, visible }
}
