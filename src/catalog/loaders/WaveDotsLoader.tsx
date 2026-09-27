import { motion } from 'framer-motion'

/**
 * Wave Dots — five dots on a staggered sine loop. Each dot runs the same
 * y-keyframe but offset by 110ms, so the group renders a traveling wave.
 * A synced scale pulse gives the crest extra weight.
 */
export function WaveDotsLoader() {
  return (
    <div className="flex items-center gap-2.5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="h-3.5 w-3.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          animate={{ y: [10, -12, 10], scale: [0.85, 1.15, 0.85] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.11 }}
        />
      ))}
    </div>
  )
}
