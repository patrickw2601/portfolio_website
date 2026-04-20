import { site } from '../data/site'
import { MagneticButton } from './MagneticButton'
import { Reveal } from './Reveal'

export function ContactSection() {
  const mail = `mailto:${site.contactEmail}?subject=Hi`

  return (
    <div className="py-14 pb-24 md:py-16 md:pb-28">
      <div className="flow-section">
        <div className="mb-10 h-px">
          <div className="flow-divider h-full" />
        </div>

        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink-900 md:text-3xl">
            Contact
          </h2>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton href={mail} variant="primary">
            Email
          </MagneticButton>
          <MagneticButton href={site.resumeUrl} external variant="ghost">
            Résumé
          </MagneticButton>
        </div>

        <div className="mt-12 border-t border-[var(--color-line)] pt-8">
          <p className="text-sm text-ink-800">{site.locations}</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {site.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-ink-800 underline-offset-4 transition-colors hover:text-ink-900 hover:underline"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
