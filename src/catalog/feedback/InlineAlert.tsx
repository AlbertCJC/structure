import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Expandable Inline Alert — height springs open (Framer measures content
 * at mount), the icon blooms in slightly after the frame, and dismiss
 * collapses the whole thing cleanly. A restore chip appears so the demo
 * can loop.
 */
export function InlineAlert() {
  const [open, setOpen] = useState(true)

  return (
    <div className="w-full max-w-[250px] p-4">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="alert"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="overflow-hidden"
          >
            <div className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/[0.07] p-3.5">
              <motion.span
                initial={{ scale: 0.4, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 380, damping: 18 }}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-300"
              >
                ⚠
              </motion.span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-amber-200">Payment method expiring</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-amber-100/60">Your card ends in 4242 and expires this month.</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-amber-200/50 transition hover:text-amber-100">✕</button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="restore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(true)}
            className="mx-auto block rounded-lg border border-line px-4 py-2 text-[11px] text-fog transition hover:text-white"
          >
            ↺ re-show alert
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
