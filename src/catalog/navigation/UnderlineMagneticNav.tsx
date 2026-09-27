import { useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = ['Work', 'Lab', 'Journal', 'Contact']

/**
 * Magnetic Underline Nav.
 *
 * Two micro-interactions share one layout:
 *  • Hover stretches letter-spacing (0.25em → 0.4em) — the classic
 *    "magnetic link" stretch, done in pure CSS.
 *  • The active underline is a single layoutId gradient bar that springs
 *    across the gap between links (380/30) — width changes included, so it
 *    literally stretches to fit each label.
 */
export function UnderlineMagneticNav() {
  const [active, setActive] = useState(0)

  return (
    <div className="p-8">
      <nav className="flex gap-8 font-mono text-xs uppercase tracking-[0.25em] text-mist">
        {LINKS.map((l, i) => (
          <button
            key={l}
            onClick={() => setActive(i)}
            className={`relative py-2 transition-all duration-300 hover:tracking-[0.4em] hover:text-white ${
              i === active ? 'text-white' : ''
            }`}
          >
            {l}
            {i === active && (
              <motion.span
                layoutId="underline-nav"
                className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-cyan-300"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
