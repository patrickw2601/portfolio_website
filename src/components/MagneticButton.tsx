import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  className?: string
  external?: boolean
  variant?: Variant
}

const spring = { stiffness: 280, damping: 22, mass: 0.35 }

const variants: Record<
  Variant,
  string
> = {
  primary:
    'rounded-full bg-ink-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-ink-700',
  ghost:
    'rounded-full border border-[var(--color-line)] bg-white/60 px-5 py-2.5 text-sm font-medium text-ink-900 backdrop-blur-sm transition-colors hover:border-ink-900/15 hover:bg-white',
}

export function MagneticButton({
  children,
  href,
  className = '',
  external,
  variant = 'primary',
}: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, spring)
  const ySpring = useSpring(y, spring)

  const handleMove = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const relX = event.clientX - (rect.left + rect.width / 2)
    const relY = event.clientY - (rect.top + rect.height / 2)
    x.set(relX * 0.12)
    y.set(relY * 0.12)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const styles = `${variants[variant]} ${className}`

  const motionProps = {
    style: { x: xSpring, y: ySpring },
    onMouseMove: handleMove,
    onMouseLeave: reset,
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 420, damping: 22 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={styles}
        {...motionProps}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button type="button" className={styles} {...motionProps}>
      {children}
    </motion.button>
  )
}
