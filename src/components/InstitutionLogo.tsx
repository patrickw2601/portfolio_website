import { publicAsset } from '../lib/publicAsset'

type InstitutionLogoProps = {
  /** Path under `public/`, e.g. `logos/uw.svg` (no leading slash). */
  logoSrc: string
  alt: string
  /** `contain` for logos; `cover` for photos that should fill the frame. */
  fit?: 'contain' | 'cover'
}

export function InstitutionLogo({ logoSrc, alt, fit = 'contain' }: InstitutionLogoProps) {
  return (
    <img
      src={publicAsset(logoSrc)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={[
        'h-14 w-14 shrink-0 rounded-xl border border-[var(--color-line)] bg-[var(--color-canvas)] p-2 ring-1 ring-ink-900/[0.04] md:h-[4.5rem] md:w-[4.5rem] md:p-2.5',
        fit === 'cover' ? 'object-cover' : 'object-contain',
      ].join(' ')}
    />
  )
}
