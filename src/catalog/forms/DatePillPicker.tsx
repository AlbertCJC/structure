import { useState } from 'react'
import { motion } from 'framer-motion'

const DAYS = [
  { d: '18', w: 'TH' },
  { d: '19', w: 'FR' },
  { d: '20', w: 'SA' },
  { d: '21', w: 'SU' },
  { d: '22', w: 'MO' },
  { d: '23', w: 'TU' },
  { d: '24', w: 'WE' },
]

/**
 * Date Pill Picker — selection is a layoutId pill that springs between
 * day columns; today (index 4) keeps a subtle pulse ring when unselected.
 * The summary line crossfades to the chosen date.
 */
export function DatePillPicker() {
  const [sel, setSel] = useState(4)

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-4 p-4">
      <div className="flex justify-between rounded-2xl border border-line bg-panel p-2">
        {DAYS.map((day, i) => (
          <button key={day.d} onClick={() => setSel(i)} className="relative flex flex-col items-center gap-1 px-1.5 py-2">
            {sel === i && (
              <motion.span
                layoutId="date-pill"
                className="absolute inset-0 rounded-xl bg-gradient-to-b from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            {i === 4 && sel !== 4 && (
              <motion.span
                className="absolute inset-0 rounded-xl ring-1 ring-violet-400/40"
                style={{ opacity: 0.4 }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <span className={`relative z-10 font-mono text-[9px] uppercase ${sel === i ? 'text-white/80' : 'text-fog'}`}>{day.w}</span>
            <span className={`relative z-10 text-sm font-bold ${sel === i ? 'text-white' : 'text-mist'}`}>{day.d}</span>
          </button>
        ))}
      </div>
      <motion.p key={sel} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
        sep {DAYS[sel].d} · selected
      </motion.p>
    </div>
  )
}
