import { motion } from 'framer-motion'

/**
 * Equalizer Bars — five scaleY bars, each on its OWN duration (0.9–1.5s).
 * Coprime-ish durations mean the combined pattern takes a long time to
 * repeat, so it reads as "audio" rather than "animation".
 */
const BARS = [
  { dur: 1.0, color: '#22d3ee' },
  { dur: 1.4, color: '#8b5cf6' },
  { dur: 0.9, color: '#d946ef' },
  { dur: 1.5, color: '#8b5cf6' },
  { dur: 1.1, color: '#22d3ee' },
]

export function EqualizerBarsLoader() {
  return (
    <div className="flex h-16 items-end gap-2">
      {BARS.map((b, i) => (
        <motion.span
          key={i}
          className="w-3 origin-bottom rounded-sm"
          style={{ background: b.color, height: 56 }}
          animate={{ scaleY: [0.25, 1, 0.45, 0.9, 0.25] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
