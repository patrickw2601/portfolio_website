import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { site } from '../data/site'
import { springSnappy } from '../lib/motionPresets'

const links = [
  { href: '#principles', label: 'Focus' },
  { href: '#about', label: 'About' },
  { href: '#education', label: 'Education' },
  { href: '#work', label: 'Work' },
  { href: '#orgs', label: 'Orgs' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const { scrollY } = useScroll()
  const [elevated, setElevated] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setElevated(latest > 8)
  })

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      initial={false}
      animate={{
        backgroundColor: elevated ? 'rgb(245 245 244 / 0.88)' : 'rgb(245 245 244 / 0)',
        borderColor: elevated ? 'rgb(12 12 12 / 0.06)' : 'rgb(12 12 12 / 0)',
        boxShadow: elevated ? '0 10px 30px rgb(12 12 12 / 0.04)' : '0 0 0 rgb(12 12 12 / 0)',
      }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-5 py-4 md:px-6">
        <motion.a
          href="#top"
          title={site.name}
          className="font-display max-w-[min(100%,11rem)] truncate text-sm font-semibold tracking-tight text-ink-900 sm:max-w-none"
          whileHover={{ y: -1 }}
          transition={springSnappy}
        >
          {site.name}
        </motion.a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium"
              variants={{ rest: {}, hover: {} }}
              initial="rest"
              whileHover="hover"
            >
              <motion.span
                className="inline-block text-ink-500"
                variants={{
                  rest: { y: 0, color: 'rgb(115 115 115)' },
                  hover: { y: -1, color: 'rgb(12 12 12)' },
                }}
                transition={springSnappy}
              >
                {link.label}
              </motion.span>
              <motion.span
                className="absolute -bottom-1 left-0 h-px w-full origin-left bg-ink-900"
                variants={{ rest: { scaleX: 0, opacity: 0 }, hover: { scaleX: 1, opacity: 1 } }}
                transition={springSnappy}
              />
            </motion.a>
          ))}
        </nav>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] text-ink-900 md:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-3 w-4 flex-col justify-between">
            <motion.span
              className="block h-px bg-ink-900"
              animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
            <motion.span
              className="block h-px bg-ink-900"
              animate={{ opacity: open ? 0 : 1, x: open ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-px bg-ink-900"
              animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-[var(--color-line)] bg-canvas/95 px-5 py-4 md:hidden"
          >
            <motion.div
              className="flex flex-col gap-1"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-medium text-ink-900"
                  variants={{
                    hidden: { opacity: 0, x: -12, skewX: -2 },
                    show: { opacity: 1, x: 0, skewX: 0 },
                  }}
                  transition={springSnappy}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
