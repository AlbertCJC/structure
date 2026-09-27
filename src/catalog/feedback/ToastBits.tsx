import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Undo toast — "delete" slides in a 4s undo window with a draining time
 * bar; Undo restores the row. The bar’s width IS the countdown.
 */
export function UndoToastBar() {
  const [mode, setMode] = useState<'idle' | 'deleted' | 'restored'>('idle')
  useEffect(() => {
    if (mode === 'restored') {
      const t = window.setTimeout(() => setMode('idle'), 1800)
      return () => window.clearTimeout(t)
    }
  }, [mode])
  return (
    <div className="relative grid h-36 content-center justify-items-center p-4">
      <AnimatePresence mode="wait">
        {mode !== 'deleted' ? (
          <motion.div key="row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex w-56 items-center justify-between rounded-lg border border-white/12 bg-panel px-3 py-2.5">
            <span className="text-sm text-white">monthly-report.pdf</span>
            <button onClick={() => setMode('deleted')} className="rounded-md px-2 py-1 text-[11px] text-fog transition hover:bg-white/10 hover:text-white">
              Delete
            </button>
          </motion.div>
        ) : (
          <motion.span key="gone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-fog">
            row deleted (demo)
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {mode === 'deleted' && (
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute bottom-3 w-56 overflow-hidden rounded-lg border border-white/15 bg-raised"
          >
            <div className="flex items-center justify-between px-3 py-2 text-[11px] text-white">
              <span>File deleted</span>
              <button onClick={() => setMode('restored')} className="font-semibold underline underline-offset-2">
                Undo
              </button>
            </div>
            <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: 4, ease: 'linear' }} onAnimationComplete={() => setMode('idle')} className="h-[3px] origin-left bg-white/50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Toast queue with cap — clicking spawns notifications; only two render at
 * a time and the overflow compresses into a "+N waiting" chip.
 */
export function QueueCountToasts() {
  const [items, setItems] = useState<number[]>([])
  const [next, setNext] = useState(1)
  const shown = items.slice(0, 2)
  return (
    <div className="relative grid h-40 content-start justify-items-end gap-2 p-5">
      <button onClick={() => { setItems((s) => [...s, next]); setNext((n) => n + 1) }} className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white hover:bg-white/5">
        Fire notification
      </button>
      <AnimatePresence initial={false}>
        {shown.slice().reverse().map((n) => (
          <motion.div
            key={n}
            layout
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="rounded-lg border border-white/15 bg-raised px-3 py-2 text-[11px] text-white shadow-lg"
          >
            Upload #{n} complete
            <button onClick={() => setItems((s) => s.filter((x) => x !== n))} className="ml-2 text-fog hover:text-white">✕</button>
          </motion.div>
        ))}
      </AnimatePresence>
      {items.length > 2 && (
        <motion.span key={items.length} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9px] text-mist">
          +{items.length - 2} waiting
        </motion.span>
      )}
    </div>
  )
}

/**
 * Persistent review stack — collapsed by default; hovering fans the two
 * notes out with a rotation spring like cards in hand.
 */
export function PersistentReviewToasts() {
  const [open, setOpen] = useState(false)
  const notes = ['🔎 Priya requested changes on “Landing hero”', '💬 4 new comments in “Q3 pricing”']
  return (
    <div className="grid h-40 place-items-end p-4">
      <div className="relative h-24 w-60" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {notes.map((n, i) => (
          <motion.div
            key={n}
            animate={{
              y: open ? -i * 26 : -i * 4,
              rotate: open ? (i === 0 ? -3 : 2) : 0,
              scale: open ? 1 : 1 - i * 0.04,
              zIndex: 2 - i,
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="absolute inset-x-0 bottom-0 flex h-14 items-center rounded-xl border border-white/15 bg-raised px-3.5 text-[11px] text-white shadow-xl"
          >
            {n}
          </motion.div>
        ))}
        <span className="absolute -top-4 left-1 font-mono text-[9px] uppercase tracking-widest text-fog">hover to fan · 2 pending</span>
      </div>
    </div>
  )
}

/**
 * Confetti success toast — the toast enters with its own particle burst:
 * six squares scatter outward and fade as the text settles.
 */
export function ConfettiSuccessToast() {
  const [burst, setBurst] = useState(0)
  return (
    <div className="grid h-36 content-center justify-items-start gap-3 p-6">
      <button onClick={() => setBurst((b) => b + 1)} className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white hover:bg-white/5">
        Mark paid
      </button>
      {burst > 0 && (
        <div key={burst} className="relative">
          <div className="rounded-lg border border-white/15 bg-raised px-3.5 py-2 text-[11px] text-white">✓ Invoice #2481 marked as paid</div>
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, opacity: 1 }}
              animate={{
                x: [-6, 12, -14, 8, -10, 16][i],
                y: [-14, -8, -6, -18, -10, -12][i],
                opacity: 0,
                rotate: [90, -120, 45, -70, 130, -40][i],
              }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="absolute left-2 top-0 h-1.5 w-1.5 rounded-[1px] bg-white"
            />
          ))}
        </div>
      )}
    </div>
  )
}
