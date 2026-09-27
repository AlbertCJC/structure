import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Destructive confirm inline — one click arms, the second executes. The row
 * keeps its footprint through the swap; "Cancel" always one tap away.
 */
export function DestructiveConfirmInline() {
  const [state, setState] = useState<'idle' | 'armed' | 'done'>('idle')
  return (
    <div className="w-56 p-6">
      <motion.div layout className="rounded-xl border border-white/12 bg-panel p-3.5">
        <AnimatePresence mode="wait" initial={false}>
          {state === 'done' ? (
            <motion.p key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-1.5 text-center text-[11px] text-fog">
              ✓ “spike-login-flow” deleted
            </motion.p>
          ) : state === 'armed' ? (
            <motion.div key="armed" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
              <p className="text-[11px] font-medium text-white">Delete this branch?</p>
              <div className="mt-2 flex gap-1.5">
                <button onClick={() => setState('done')} className="flex-1 rounded-md bg-rose-300 px-2 py-1.5 text-[11px] font-bold text-black">
                  Yes, delete
                </button>
                <button onClick={() => setState('idle')} className="rounded-md border border-white/15 px-2 py-1.5 text-[11px] text-mist">
                  Keep
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-white">spike-login-flow</span>
              <button onClick={() => setState('armed')} className="rounded-md px-2 py-1 text-[11px] text-fog transition hover:bg-rose-300/10 hover:text-rose-200">
                🗑
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/**
 * Collapsing note — height animates between 0 and auto (framer tweens
 * 'auto'); the chevron flips on the same state.
 */
export function CollapsibleNoteCard() {
  const [open, setOpen] = useState(true)
  return (
    <div className="w-56 p-6">
      <div className="overflow-hidden rounded-xl border border-white/12 bg-panel">
        <button onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between px-3.5 py-2.5 text-[12px] font-medium text-white">
          Release notes
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 350, damping: 26 }}>
            ⌄
          </motion.span>
        </button>
        <motion.div initial={false} animate={{ height: open ? 'auto' : 0 }} transition={{ type: 'spring', stiffness: 240, damping: 28 }}>
          <p className="px-3.5 pb-3 text-[11px] leading-relaxed text-fog">
            v3.2 ships the family-file catalog, content-visibility culling and 200+ new components. The grid should now idle
            under 5% CPU.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Warning tilt — the card arrives with a -6° tilt and settles flat, like
 * paper set on a desk. Acknowledge pins it into calm.
 */
export function WarningTiltCard() {
  const [ack, setAck] = useState(false)
  return (
    <div className="p-6">
      <motion.div
        key={String(ack)}
        initial={{ rotate: -6, y: -8, opacity: 0 }}
        animate={{ rotate: 0, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
        className="w-56 rounded-xl border border-amber-300/35 bg-amber-400/5 p-3.5"
      >
        <p className="text-[11px] font-semibold text-amber-200">⚠ Rate limit at 82%</p>
        <p className="mt-1 text-[10px] leading-snug text-amber-100/60">Requests will be throttled once the window fills.</p>
        {ack ? (
          <p className="mt-2 text-[10px] text-fog">acknowledged · 09:12</p>
        ) : (
          <button onClick={() => setAck(true)} className="mt-2 rounded-md border border-amber-200/30 px-2.5 py-1 text-[10px] font-medium text-amber-200 hover:bg-amber-300/10">
            Acknowledge
          </button>
        )}
      </motion.div>
    </div>
  )
}

/**
 * Success morph — the act of completing morphs the card itself: border goes
 * solid and the icon swaps with a spring. No toast needed.
 */
export function SuccessMorphCard() {
  const [done, setDone] = useState(false)
  return (
    <div className="p-6">
      <motion.div animate={{ borderColor: done ? '#ffffff' : 'rgba(255,255,255,0.12)', backgroundColor: done ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)' }} transition={{ duration: 0.3 }} className="flex w-56 items-center gap-3 rounded-xl border p-3.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={done ? 'ok' : 'todo'}
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 40 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className={`grid h-8 w-8 place-items-center rounded-full border text-sm ${done ? 'border-white bg-white text-black' : 'border-white/30 text-white'}`}
          >
            {done ? '✓' : '○'}
          </motion.span>
        </AnimatePresence>
        <div className="flex-1">
          <p className={`text-[12px] font-medium ${done ? 'text-white line-through opacity-60' : 'text-white'}`}>Ship the audit report</p>
          <p className="text-[10px] text-fog">{done ? 'completed just now' : 'due today'}</p>
        </div>
        {!done && (
          <button onClick={() => setDone(true)} className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-black">
            Done
          </button>
        )}
      </motion.div>
    </div>
  )
}
