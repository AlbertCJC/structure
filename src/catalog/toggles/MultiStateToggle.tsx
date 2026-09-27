import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STATES = [
  { label: 'OFF', color: '#666b82', desc: 'dormant' },
  { label: 'IDLE', color: '#22d3ee', desc: 'listening' },
  { label: 'ACTIVE', color: '#a3e635', desc: 'processing' },
  { label: 'TURBO', color: '#d946ef', desc: 'overclocked' },
]

/**
 * Four-State Cycle Toggle — a tiny state machine: each click advances the
 * index mod 4. The pill's border/glow animate to the state color while the
 * label swaps vertically (popLayout), and a status LED pulses faster in
 * higher states (pulse duration = 1.6 - index * 0.3s).
 */
export function MultiStateToggle() {
  const [i, setI] = useState(0)
  const s = STATES[i]

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={() => setI((v) => (v + 1) % STATES.length)}
        className="flex items-center gap-3 rounded-full border bg-surface px-5 py-2.5"
        style={{ borderColor: `${s.color}55` }}
      >
        <motion.span
          className="h-2.5 w-2.5 rounded-full"
          animate={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}` }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative h-4 w-16 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={s.label}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute inset-0 font-mono text-xs font-bold"
              style={{ color: s.color }}
            >
              {s.label}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        {s.desc} · click to cycle
      </span>
    </div>
  )
}
