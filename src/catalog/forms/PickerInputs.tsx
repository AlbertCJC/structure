import { useState } from 'react'
import { motion } from 'framer-motion'

const FACES = ['😞', '😕', '😐', '🙂', '😄']

/**
 * Emoji rating — the chosen face pops forward on a spring while the rest
 * dim; a text echo keeps the value legible.
 */
export function EmojiRatingSelect() {
  const [sel, setSel] = useState(-1)
  return (
    <div className="p-6">
      <div className="flex gap-1.5" role="radiogroup" aria-label="Rating">
        {FACES.map((f, i) => (
          <motion.button
            key={f}
            whileTap={{ scale: 0.85 }}
            onClick={() => setSel(i)}
            animate={{ scale: sel === i ? 1.3 : 1, opacity: sel === -1 || sel === i ? 1 : 0.45 }}
            transition={{ type: 'spring', stiffness: 450, damping: 22 }}
            className="text-xl"
            aria-pressed={sel === i}
          >
            {f}
          </motion.button>
        ))}
      </div>
      <p className="mt-2 h-4 font-mono text-[10px] uppercase tracking-widest text-fog">{sel >= 0 ? ['rough', 'meh', 'okay', 'good', 'great'][sel] : 'rate it'}</p>
    </div>
  )
}

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

/**
 * Day segments — multi-select weekday chips; each selection pops on arrival
 * (its own spring) rather than just recoloring.
 */
export function SegmentDaysPicker() {
  const [on, setOn] = useState<number[]>([0, 2, 4])
  const toggle = (i: number) => setOn((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]))
  return (
    <div className="flex gap-1 p-6">
      {DAYS.map((d, i) => (
        <motion.button
          key={d}
          whileTap={{ scale: 0.85 }}
          onClick={() => toggle(i)}
          animate={{
            backgroundColor: on.includes(i) ? '#ffffff' : 'rgba(255,255,255,0.05)',
            color: on.includes(i) ? '#0a0a12' : '#8d8d99',
            scale: on.includes(i) ? [1, 1.12, 1] : 1,
          }}
          transition={{ scale: { duration: 0.3 }, type: 'spring', stiffness: 400, damping: 22 }}
          className="h-8 w-8 rounded-lg text-[11px] font-semibold"
          aria-pressed={on.includes(i)}
        >
          {d}
        </motion.button>
      ))}
    </div>
  )
}

const SLOTS = ['09:00', '09:30', '10:00', '11:30', '13:00', '15:30']

/**
 * Time slot select — single-select column; a check springs onto the chosen
 * row while the row's border warms.
 */
export function TimeSlotSelect() {
  const [sel, setSel] = useState(2)
  return (
    <div className="grid w-44 grid-cols-2 gap-1.5 p-6">
      {SLOTS.map((s, i) => (
        <button
          key={s}
          onClick={() => setSel(i)}
          className={`relative h-9 rounded-lg border font-mono text-xs transition-colors ${
            sel === i ? 'border-white/70 bg-white/10 text-white' : 'border-white/12 text-fog hover:text-mist'
          }`}
        >
          {s}
          {sel === i && (
            <motion.span key={sel} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 18 }} className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-white text-[9px] text-black">
              ✓
            </motion.span>
          )}
        </button>
      ))}
    </div>
  )
}

/**
 * Quantity stepper — min/max clamped; the digit rolls vertically through
 * AnimatePresence on every step.
 */
export function QuantityStepper() {
  const [n, setN] = useState(1)
  return (
    <div className="p-6">
      <div className="flex h-11 w-36 items-center rounded-xl border border-white/15">
        <button onClick={() => setN((x) => Math.max(0, x - 1))} aria-label="Decrease" className="h-full w-10 text-lg text-mist transition hover:text-white disabled:opacity-30" disabled={n === 0}>
          −
        </button>
        <span className="relative flex-1 overflow-hidden text-center">
          <motion.span key={n} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="block font-mono text-sm text-white">
            {n}
          </motion.span>
        </span>
        <button onClick={() => setN((x) => Math.min(9, x + 1))} aria-label="Increase" className="h-full w-10 text-lg text-mist transition hover:text-white disabled:opacity-30" disabled={n === 9}>
          +
        </button>
      </div>
    </div>
  )
}
