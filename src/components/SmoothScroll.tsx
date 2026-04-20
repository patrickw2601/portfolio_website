import gsap from 'gsap'
import Lenis from 'lenis'
import { useLayoutEffect, type ReactNode } from 'react'
import { registerGsap } from '../gsap/register'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/prefersReducedMotion'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return

    registerGsap()

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    const onRefresh = () => lenis.resize()
    ScrollTrigger.addEventListener('refresh', onRefresh)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      gsap.ticker.remove(ticker)
      lenis.destroy()
      ScrollTrigger.refresh()
    }
  }, [])

  return children
}
