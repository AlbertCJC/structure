import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Handle sheet — the sheet rest stop lives in the HANDLE: tap toggles the
 * rail's height between peek and expanded with the content intact.
 */
export function HandleHeightSheet() {
  const [big, setBig] = useState(false)
  return (
    <div className="relative h-40 overflow-hidden rounded-xl border border-white/10 m-4">
      <div className="p-3 font-mono text-[9px] uppercase tracking-widest text-fog">underlying content</div>
      <motion.div
        animate={{ height: big ? 128 : 52 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/20 bg-raised"
      >
        <button onClick={() => setBig((b) => !b)} aria-expanded={big} className="mx-auto mt-2 block h-1.5 w-9 rounded-full bg-white/30" aria-label="Toggle sheet" />
        {big && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="px-4 pt-2">
            <p className="text-[11px] font-semibold text-white">3 components selected</p>
            <p className="text-[10px] text-fog">Tap the handle to collapse</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

/**
 * Side peek — facts slide in from the right WITHOUT a backdrop; the page
 * stays readable behind an honest sliver of interface.
 */
export function SidePeekPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative h-36 overflow-hidden rounded-xl m-4 border border-white/10">
      <button onClick={() => setOpen(true)} className="m-3 rounded-full border border-white/20 px-3.5 py-1.5 text-[11px] text-white hover:bg-white/5">
        Session facts
      </button>
      <motion.aside
        animate={{ x: open ? 0 : 210 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute bottom-0 right-0 top-0 w-52 border-l border-white/15 bg-raised p-3"
      >
        <button onClick={() => setOpen(false)} aria-label="Close" className="text-[11px] text-fog hover:text-white">
          ← close
        </button>
        <dl className="mt-2 space-y-1.5 text-[10px]">
          {[
            ['audited', '388 cards'],
            ['suspects', '0'],
            ['build', 'passing'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-fog">{k}</dt>
              <dd className="font-mono text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </motion.aside>
    </div>
  )
}

const FILTERS = ['spring', 'css', 'layout', 'cosmos', 'mono', 'sports']

/**
 * Stagger chips panel — the panel springs open, THEN its chips cascade in
 * (variant staggerChildren): container first, contents second.
 */
export function StaggerChipsPanel() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5">
        Refine results
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="mt-2 w-56 rounded-xl border border-white/15 bg-raised p-3 shadow-2xl"
          >
            <motion.div
              className="flex flex-wrap gap-1.5"
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {FILTERS.map((f) => (
                <motion.span key={f} variants={{ closed: { scale: 0, opacity: 0 }, open: { scale: 1, opacity: 1 } }} className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-mist">
                  {f}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * ESC dialog — bubbles teach: the dialog explicitly invites ESC, closes on
 * it, and focuses the confirm button on open.
 */
export function EscHintDialog() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-36 place-items-center p-4"
      onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
    >
      <button onClick={() => setOpen(true)} className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5">
        Invite teammate
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="absolute z-10 w-56 rounded-2xl border border-white/20 bg-raised p-4 text-center shadow-2xl"
            role="alertdialog"
          >
            <p className="text-[12px] font-semibold text-white">Send the invite?</p>
            <p className="mt-0.5 text-[10px] text-fog">dev@structura.dev</p>
            <div className="mt-3 flex justify-center gap-2">
              <button autoFocus onClick={() => setOpen(false)} className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-black">
                Send ↵
              </button>
              <button onClick={() => setOpen(false)} className="rounded-lg border border-white/20 px-3 py-1.5 text-[11px] text-mist">
                Cancel
              </button>
            </div>
            <kbd className="mt-3 inline-block rounded border border-white/15 px-1.5 py-0.5 font-mono text-[9px] text-fog">esc to close</kbd>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
