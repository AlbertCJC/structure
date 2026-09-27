import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Expanding Label Button.
 *
 * Icon-only at rest. On hover the label mounts inside a motion.span that
 * animates width: 0 → 'auto' — Framer measures the natural width at mount
 * and springs to it, so no magic pixel numbers. The button itself carries
 * `layout` so the whole shell resize participates in the same spring.
 */
export function ExpandHoverButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-10">
      <motion.button
        layout
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        transition={{ layout: { type: 'spring', stiffness: 300, damping: 26 } }}
        className="flex h-12 items-center overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 pl-3.5 pr-3.5 text-sm font-semibold text-[#06121f] shadow-lg shadow-cyan-500/25"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5 shrink-0">
          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.span
              key="label"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="whitespace-nowrap pl-2.5 pr-1"
            >
              Continue
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
