import { motion } from 'framer-motion'

/**
 * Diagonal Grid Pulse — a 3×3 matrix where each cell's loop delay is
 * proportional to (row + col), so the pulse travels diagonally like a
 * wavefront. Cells scale and glow together on a 1.8s cycle.
 */
export function GridPulseLoader() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3)
        const col = i % 3
        return (
          <motion.span
            key={i}
            className="h-6 w-6 rounded-md bg-violet-400"
            initial={{ opacity: 0.15, scale: 0.8 }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.05, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: (row + col) * 0.18 }}
          />
        )
      })}
    </div>
  )
}
