import { useState } from 'react'
import { motion } from 'framer-motion'

const STAGES = [
  { label: 'Visits', width: 100, color: '#8b5cf6' },
  { label: 'Signups', width: 72, color: '#a855f7' },
  { label: 'Trials', width: 48, color: '#d946ef' },
  { label: 'Paid', width: 30, color: '#f0abfc' },
]

/**
 * Conversion Funnel — bars grow from 0 to their encoded width on a
 * spring stagger; labels and conversion counts fade in behind them.
 * Replay remounts the whole draw via epoch.
 */
export function FunnelChart() {
  const [epoch, setEpoch] = useState(0)

  return (
    <div key={epoch} className="flex w-full max-w-[230px] flex-col gap-2 p-4">
      {STAGES.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2.5">
          <span className="w-14 shrink-0 text-right font-mono text-[9px] uppercase tracking-wider text-fog">{s.label}</span>
          <div className="relative h-6 flex-1">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${s.width}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, delay: i * 0.12 }}
              className="h-full rounded-md"
              style={{ background: `linear-gradient(90deg, ${s.color}cc, ${s.color}55)` }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[9px] text-mist"
            >
              {(s.width * 24).toLocaleString()}
            </motion.span>
          </div>
        </div>
      ))}
      <button onClick={() => setEpoch((e) => e + 1)} className="mx-auto mt-2 rounded-md border border-line px-3 py-1.5 text-[10px] text-mist transition hover:text-white">
        ↻ replay
      </button>
    </div>
  )
}
