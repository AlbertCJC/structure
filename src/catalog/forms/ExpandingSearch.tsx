import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Expanding Search Pill — a 44px orb that springs to 224px on focus.
 * Width animates via the layout system; the input only becomes focusable
 * after expansion starts, and blur collapses the pill ONLY when empty —
 * typed text keeps it open.
 */
export function ExpandingSearch() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')

  return (
    <div className="p-10">
      <motion.div
        layout
        animate={{ width: open ? 224 : 44 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="flex h-11 items-center overflow-hidden rounded-full border border-white/15 bg-panel pl-1 shadow-lg"
      >
        <button
          onClick={() => {
            setOpen(true)
            // focus the input after the spring begins
            window.setTimeout(() => document.getElementById('exp-search-input')?.focus(), 60)
          }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-mist transition hover:text-white"
          aria-label="Open search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
        </button>
        <AnimatePresence>
          {open && (
            <motion.input
              id="exp-search-input"
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onBlur={() => !q && setOpen(false)}
              placeholder="Search the void…"
              className="w-full bg-transparent pr-4 text-xs text-white placeholder:text-fog focus:outline-none"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
