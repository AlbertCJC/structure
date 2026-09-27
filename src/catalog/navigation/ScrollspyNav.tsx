import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SECTIONS = ['Intro', 'Features', 'Pricing', 'FAQ']

/**
 * Scrollspy Nav — a simulated reading session: every 2.2s the "viewport"
 * advances a section, the layoutId underline springs to the new link, and
 * a hairline progress bar fills proportionally. Clicking a link jumps the
 * simulated scroll directly.
 */
export function ScrollspyNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const iv = window.setInterval(() => setActive((a) => (a + 1) % SECTIONS.length), 2200)
    return () => window.clearInterval(iv)
  }, [])

  return (
    <div className="w-full max-w-[260px] p-4">
      <div className="relative rounded-xl border border-line bg-panel">
        {/* progress hairline */}
        <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden rounded-t-xl bg-white/5">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-violet-400 to-cyan-300"
            animate={{ scaleX: (active + 1) / SECTIONS.length }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <nav className="flex justify-between px-4 py-3">
          {SECTIONS.map((s, i) => (
            <button key={s} onClick={() => setActive(i)} className="relative py-1">
              <span className={`text-[11px] transition-colors ${active === i ? 'font-semibold text-white' : 'text-fog'}`}>{s}</span>
              {active === i && (
                <motion.span
                  layoutId="spy-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-cyan-300"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] text-fog">
        reading section {active + 1}/{SECTIONS.length} — click to jump
      </p>
    </div>
  )
}
