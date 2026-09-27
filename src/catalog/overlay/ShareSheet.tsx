import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DESTS = [
  { icon: '✉', label: 'Mail', tint: '#8b5cf6' },
  { icon: '◈', label: 'Slack', tint: '#22d3ee' },
  { icon: '𝕏', label: 'Post', tint: '#f8fafc' },
  { icon: '⧉', label: 'Copy', tint: '#a3e635' },
  { icon: '⋯', label: 'More', tint: '#fbbf24' },
]

/**
 * Share Sheet — the sheet rises with a grabber, then five destination
 * icons bloom in on a 40ms stagger. Selecting one pops a brief check
 * state before the sheet dismisses itself.
 */
export function ShareSheet() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)

  const choose = (label: string) => {
    setPicked(label)
    window.setTimeout(() => {
      setPicked(null)
      setOpen(false)
    }, 900)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <button onClick={() => setOpen(true)} className="rounded-lg border border-line bg-raise px-5 py-2.5 text-xs font-medium text-white transition hover:border-white/25">
        ↗ Share
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="absolute inset-0 z-10 bg-void/50"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="absolute inset-x-4 bottom-3 z-20 rounded-2xl border border-white/12 bg-panel/95 p-4 shadow-[0_-10px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
            >
              <div className="mx-auto mb-3 h-1 w-9 rounded-full bg-white/15" />
              <p className="mb-3 text-center text-xs font-semibold text-white">Share this pattern</p>
              <div className="flex justify-between px-2">
                {DESTS.map((d, i) => (
                  <motion.button
                    key={d.label}
                    initial={{ opacity: 0, scale: 0.5, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.04, type: 'spring', stiffness: 380, damping: 22 }}
                    onClick={() => choose(d.label)}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-sm"
                      style={{ background: `${d.tint}1a`, color: d.tint, border: `1px solid ${d.tint}33` }}
                    >
                      {picked === d.label ? '✓' : d.icon}
                    </span>
                    <span className="text-[9px] text-fog">{picked === d.label ? 'sent!' : d.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
