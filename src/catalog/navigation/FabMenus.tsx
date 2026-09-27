import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ACTIONS = [
  { icon: '✉', label: 'Message' },
  { icon: '♡', label: 'Like' },
  { icon: '⤴', label: 'Share' },
]
const FANS = [-48, 0, 48]

/** Radial fan — actions bloom on an arc around the FAB, then spiral back in. */
export function RadialFanFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-40 place-items-end justify-center p-4">
      <div className="relative">
        <AnimatePresence>
          {open &&
            ACTIONS.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x: FANS[i], y: -58 }}
                exit={{ opacity: 0, scale: 0.4, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 460, damping: 24, delay: i * 0.04 }}
                aria-label={a.label}
                className="absolute -ml-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-panel text-sm text-white shadow-lg"
              >
                {a.icon}
              </motion.button>
            ))}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setOpen((o) => !o)}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          aria-label="Open actions"
          className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black"
        >
          +
        </motion.button>
      </div>
    </div>
  )
}

/** Column stagger — actions rise in a stack above the FAB with trailing labels. */
export function ColumnStaggerFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-44 content-end justify-center p-2">
      <div className="flex flex-col items-center">
        <AnimatePresence>
          {open &&
            ['Duplicate', 'Rename', 'Delete'].map((t, i) => (
              <motion.button
                key={t}
                initial={{ opacity: 0, y: 14, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.88 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 420, damping: 26 }}
                onClick={() => setOpen(false)}
                className="mb-2 rounded-full border border-white/15 bg-panel px-4 py-1.5 text-[11px] text-white shadow-lg"
              >
                {t}
              </motion.button>
            ))}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setOpen((o) => !o)}
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          aria-label="Toggle menu"
          className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black"
        >
          ✚
        </motion.button>
      </div>
    </div>
  )
}

/** Corner expand — the FAB itself becomes the menu card: same element, bigger truth. */
export function CornerExpandFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid h-40 content-end justify-end p-4">
      <motion.div
        layout
        animate={{ width: open ? 190 : 48, height: open ? 96 : 48, borderRadius: open ? 18 : 999 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className="relative overflow-hidden border border-white/20 bg-panel shadow-xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.12 } }} exit={{ opacity: 0 }} className="flex h-full items-center justify-around">
              {['✉', '♡', '⤴', '⋯'].map((i) => (
                <button key={i} className="grid h-9 w-9 place-items-center rounded-full text-sm text-white hover:bg-white/10">
                  {i}
                </button>
              ))}
              <button onClick={() => setOpen(false)} aria-label="Close" className="absolute right-2 top-1.5 text-xs text-fog hover:text-white">
                ✕
              </button>
            </motion.div>
          ) : (
            <motion.button key="fab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(true)} aria-label="Open actions" className="grid h-full w-full place-items-center text-xl text-white">
              +
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

/* ─── family set 2: fan / column / selection-bar fabs ────────────────── */

const FAN_BUTTONS = [
  { icon: '✉', x: -46, y: -8, r: 0 },
  { icon: '♡', x: -32, y: -34, r: 0 },
  { icon: '⤴', x: -6, y: -46, r: 0 },
  { icon: '⋯', x: 22, y: -38, r: 0 },
]

/** Fan FAB — blooms counter-clockwise from the button corner like a hand of cards. */
export function FanFabMenu() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-40 place-items-end justify-end p-5">
      <div className="relative">
        <AnimatePresence>
          {open &&
            FAN_BUTTONS.map((b, i) => (
              <motion.button
                key={b.icon}
                initial={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 30 }}
                animate={{ opacity: 1, scale: 1, x: b.x, y: b.y, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.35, x: 0, y: 0, rotate: 30 }}
                transition={{ type: 'spring', stiffness: 440, damping: 24, delay: i * 0.05 }}
                className="absolute grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-panel text-xs text-white shadow-lg"
                style={{ bottom: 0, right: 0 }}
              >
                {b.icon}
              </motion.button>
            ))}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setOpen((o) => !o)}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          aria-label="Fan menu"
          className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black shadow-xl"
        >
          +
        </motion.button>
      </div>
    </div>
  )
}

/** Column FAB — icon + label pills slide in right-to-left diagonal as they rise. */
export function ColumnFabMenu() {
  const [open, setOpen] = useState(false)
  const items = [
    { icon: '✎', t: 'Edit' },
    { icon: '⧉', t: 'Duplicate' },
    { icon: '🗑', t: 'Delete' },
  ]
  return (
    <div className="relative grid h-44 content-end justify-end p-4">
      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {open &&
            items.map((it, i) => (
              <motion.button
                key={it.t}
                initial={{ opacity: 0, x: 16, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 12, y: 6 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 420, damping: 26 }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-panel px-3 py-1.5 text-[11px] text-white shadow-lg"
              >
                <span>{it.icon}</span> {it.t}
              </motion.button>
            ))}
        </AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => setOpen((o) => !o)}
          animate={{ rotate: open ? 45 : 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          aria-label="Column menu"
          className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl text-black shadow-xl"
        >
          +
        </motion.button>
      </div>
    </div>
  )
}

/** Selection action bar — toggle rows; a bottom bar floats up with count + bulk actions. */
export function SelectActionBar() {
  const [picked, setPicked] = useState<number[]>([])
  const toggle = (i: number) => setPicked((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]))
  return (
    <div className="relative w-56 p-6">
      <div className="space-y-1.5 pb-12">
        {['annual-report.pdf', 'moodboard-v4.png', 'sprint-notes.md'].map((f, i) => (
          <button
            key={f}
            onClick={() => toggle(i)}
            className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left font-mono text-[10px] transition-colors ${
              picked.includes(i) ? 'border-white/50 bg-white/10 text-white' : 'border-line text-fog'
            }`}
          >
            <span className={`grid h-3.5 w-3.5 place-items-center rounded border text-[8px] ${picked.includes(i) ? 'border-white bg-white text-black' : 'border-white/30'}`}>
              {picked.includes(i) ? '✓' : ''}
            </span>
            {f}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {picked.length > 0 && (
          <motion.div
            initial={{ y: 44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 44, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="absolute inset-x-6 bottom-5 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-xl"
          >
            <span className="text-[11px] font-bold text-black">{picked.length} picked</span>
            <div className="flex gap-1">
              {['⤴', '⬇', '✕'].map((i, k) => (
                <button key={i} onClick={() => k === 2 && setPicked([])} className="grid h-7 w-7 place-items-center rounded-lg text-xs text-black/70 hover:bg-black/10">
                  {i}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Bake into bar — the FAB stretches horizontally into a docked action bar. */
export function BakeIntoBarFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="grid h-36 place-items-end p-4">
      <motion.div
        layout
        animate={{ width: open ? 210 : 52, height: 52 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white shadow-xl"
      >
        {open ? (
          ['✂ Copy', '⎘ Paste', '↺ Undo'].map((t) => (
            <motion.button
              key={t}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 26 }}
              onClick={() => setOpen(false)}
              className="whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-black hover:bg-black/5"
            >
              {t}
            </motion.button>
          ))
        ) : (
          <motion.button key="open" onClick={() => setOpen(true)} aria-label="Open action bar" className="text-xl font-light text-black">
            +
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
