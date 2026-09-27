import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Glass banner — a floating banner blurs the page beneath it: the backdrop
 * is informational (page visible, unreachable).
 */
export function GlassBackdropBanner() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative h-36 overflow-hidden rounded-xl m-4 border border-white/10 p-3">
      <div className="space-y-1.5 font-mono text-[10px] leading-relaxed text-fog">
        <p>const visible = beneath</p>
        <p className="opacity-60">{'// the glass() always'}</p>
      </div>
      <button onClick={() => setOpen(true)} className="mt-2 rounded-full border border-white/20 px-3 py-1 text-[11px] text-white">
        Announce
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            exit={{ y: -60 }}
            transition={{ type: 'spring', stiffness: 320, damping: 27 }}
            className="absolute inset-x-6 top-4 flex items-center justify-between rounded-xl border border-white/20 bg-white/[0.04] px-3.5 py-2.5 shadow-2xl backdrop-blur-md"
          >
            <span className="text-[11px] text-white">Scheduled save in 20 min — page stays readable</span>
            <button onClick={() => setOpen(false)} className="text-fog hover:text-white">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Spotlight hole — the overlay is a ring of solid black created by an
 * enormous box-shadow; the target hole stays fully lit.
 */
export function SpotlightHoleMask() {
  const [on, setOn] = useState(false)
  return (
    <div className="relative grid h-36 place-items-center p-4">
      <div className="flex gap-2">
        {['A', 'B', 'C'].map((c, i) => (
          <div key={c} className={`grid h-12 w-14 place-items-center rounded-xl border text-sm ${i === 1 ? 'relative z-20 border-white/50 bg-panel text-white' : 'border-white/12 text-fog'}`}>
            {i === 1 && on && <motion.span initial={{ boxShadow: '0 0 0 0 rgba(6,6,10,0)' }} animate={{ boxShadow: '0 0 0 240px rgba(6,6,10,0.88)' }} className="absolute inset-0 rounded-xl pointer-events-none" />}
            {c}
          </div>
        ))}
      </div>
      <button onClick={() => setOn((o) => !o)} className="absolute bottom-3 right-3 m-0 rounded-full border border-white/20 z-30 bg-raised px-3 py-1 text-[10px] text-white">
        {on ? 'lights on' : 'spotlight'}
      </button>
    </div>
  )
}

/**
 * Staged overlay — the dim enters first; contents arrive 120ms later.
 * Chaining entrances protects users from reading over a still-dark page.
 */
export function StagedChoreoOverlay() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-36 place-items-center p-4">
      <button onClick={() => setOpen(true)} className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5">
        Show report
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[1px]" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.12, type: 'spring', stiffness: 360, damping: 26 } }}
              exit={{ opacity: 0 }}
              className="absolute z-20 w-48 rounded-xl border border-white/20 bg-raised p-3 text-center shadow-2xl"
            >
              <p className="text-[11px] font-semibold text-white">audit report</p>
              <p className="mt-0.5 text-[10px] text-fog">0 suspects · 388/388 ✓</p>
              <button onClick={() => setOpen(false)} className="mt-2 rounded-md bg-white px-3 py-1 text-[10px] font-bold text-black">
                Nice
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Outside commit — the editing pill stays open while you type inside it;
 * clicking the faint backdrop COMMITS the value and confirms with a flash.
 */
export function OutsideCommitPill() {
  const [editing, setEditing] = useState(false)
  const [v, setV] = useState('release-3.2')
  const [flash, setFlash] = useState(false)
  const commit = () => {
    setEditing(false)
    setFlash(true)
    window.setTimeout(() => setFlash(false), 1200)
  }
  return (
    <div className="relative grid h-36 place-items-center p-4">
      {!editing ? (
        <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-full border border-white/15 bg-panel px-4 py-2 text-[12px] text-white">
          ⎇ {flash ? <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✓ saved — {v}</motion.span> : <span>{v}</span>}
          <span className="text-[10px] text-fog">✎</span>
        </button>
      ) : (
        <>
          <div className="absolute inset-0 z-10" onClick={commit} />
          <div className="relative z-20 flex items-center gap-1.5 rounded-full border border-white/40 bg-raised px-2 py-1 shadow-2xl">
            <span className="pl-2 text-fog">⎇</span>
            <input autoFocus value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && commit()} className="w-32 bg-transparent px-1 py-1 font-mono text-[12px] text-white focus:outline-none" />
          </div>
          <p className="absolute bottom-4 z-20 text-[9px] text-fog">click outside to commit</p>
        </>
      )}
    </div>
  )
}
