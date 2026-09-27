import { useState } from 'react'
import { motion } from 'framer-motion'

const TABS = ['Home', 'Design', 'Code', 'Docs']

/**
 * Expanding Floating Pills.
 *
 * The white pill indicator is a single layoutId ("floating-pill-indicator")
 * element rendered INSIDE the active tab. When `active` changes, Framer
 * Motion measures the old indicator's geometry and springs the surviving
 * element to the new one — one element, no coordinate math, and it keeps
 * its shadow/blur intact during flight. The whole bar floats on a slow
 * 5s y-bob; the glass (white/6 + backdrop-blur) does the rest.
 */
export function FloatingPillNav() {
  const [active, setActive] = useState(1)

  return (
    <div className="p-6">
      <motion.div
        initial={false}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex rounded-full border border-white/12 bg-white/[0.06] p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md"
      >
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`relative rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${
              i === active ? 'text-[#0a0a12]' : 'text-mist hover:text-white'
            }`}
          >
            {i === active && (
              <motion.span
                layoutId="floating-pill-indicator"
                className="absolute inset-0 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{t}</span>
          </button>
        ))}
      </motion.div>
    </div>
  )
}
