import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STATES = [
  { label: 'OPERATIONAL', color: '#a3e635' },
  { label: 'DEGRADED', color: '#fbbf24' },
  { label: 'RECOVERING', color: '#22d3ee' },
]

/**
 * Live Status Badge.
 *
 * A 2.6s interval cycles the state index. The dot's PING ring is a looping
 * scale/opacity keyframe; the label crossfades vertically (popLayout) and
 * the whole pill animates its border + glow shadow to the new color — so
 * every transition is three synchronized springs rather than a hard swap.
 */
export function LiveStatusBadge() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const iv = window.setInterval(() => setI((v) => (v + 1) % STATES.length), 2600)
    return () => window.clearInterval(iv)
  }, [])

  const s = STATES[i]

  return (
    <div className="flex flex-col items-center gap-5">
      <motion.div
        animate={{ borderColor: `${s.color}66`, boxShadow: `0 0 24px -6px ${s.color}55` }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 rounded-full border bg-surface/80 px-5 py-2.5"
      >
        <span className="relative flex h-2.5 w-2.5">
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ background: s.color }}
            animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-[11px] font-bold tracking-[0.25em]"
            style={{ color: s.color }}
          >
            {s.label}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="font-mono text-[10px] text-fog">latency 42ms · ap-southeast-1</span>
    </div>
  )
}
