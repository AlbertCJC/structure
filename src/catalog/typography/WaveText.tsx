import { motion } from 'framer-motion'

const WORD = 'FLOATING'

/**
 * Wave Text — each letter rides the same sine loop offset by 70ms, so the
 * word becomes a traveling wave. A soft hue shift per letter keeps it from
 * reading as a monochrome metronome.
 */
export function WaveText() {
  return (
    <div className="flex gap-[0.12em] p-8 text-2xl font-extrabold tracking-wide">
      {WORD.split('').map((ch, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
          style={{ color: `hsl(${265 + i * 14} 85% 72%)` }}
        >
          {ch}
        </motion.span>
      ))}
    </div>
  )
}
