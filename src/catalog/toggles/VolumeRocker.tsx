import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Volume Rocker — a vertical level whose fill height is spring-animated
 * (stiffness 160 gives a satisfying wobble at each step). + / − move in
 * 12.5% steps; the speaker icon crossfades to a muted variant at zero.
 */
export function VolumeRocker() {
  const [level, setLevel] = useState(0.65)
  const step = (d: number) => setLevel((v) => Math.min(1, Math.max(0, v + d)))

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-28 w-10 overflow-hidden rounded-full border border-white/12 bg-surface">
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-violet-600 to-cyan-400"
          animate={{ height: `${level * 100}%` }}
          transition={{ type: 'spring', stiffness: 160, damping: 17 }}
        />
        {/* tick marks */}
        {[0.25, 0.5, 0.75].map((t) => (
          <div key={t} className="absolute inset-x-2 h-px bg-white/15" style={{ bottom: `${t * 100}%` }} />
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <button onClick={() => step(0.125)} className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-raise text-mist transition hover:text-white" aria-label="Volume up">
          +
        </button>
        <motion.span key={level === 0 ? 'mute' : 'on'} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-lg">
          {level === 0 ? '🔇' : level > 0.6 ? '🔊' : '🔉'}
        </motion.span>
        <button onClick={() => step(-0.125)} className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-raise text-mist transition hover:text-white" aria-label="Volume down">
          −
        </button>
        <span className="font-mono text-[10px] text-fog">{Math.round(level * 100)}%</span>
      </div>
    </div>
  )
}
