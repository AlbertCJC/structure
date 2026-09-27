import { motion } from 'framer-motion'

/**
 * DNA Helix — anti-phase sine pairs fake 3D rotation. Each column has two
 * beads: the top bead rides y = sin(t), the bottom rides -sin(t); both
 * scale up when "in front" (keyframed together with their y). A 130ms
 * stagger across columns twists the pair into a helix.
 */
export function DnaHelixLoader() {
  return (
    <div className="flex items-center gap-3.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="relative h-20 w-2.5">
          {/* rung connecting the beads */}
          <div className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-white/10" />
          <motion.span
            className="absolute left-0 h-2.5 w-2.5 rounded-full bg-fuchsia-400"
            animate={{ y: [-14, 14, -14], scale: [1.15, 0.7, 1.15] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
          />
          <motion.span
            className="absolute bottom-0 left-0 h-2.5 w-2.5 rounded-full bg-cyan-300"
            animate={{ y: [14, -14, 14], scale: [0.7, 1.15, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.13 }}
          />
        </div>
      ))}
    </div>
  )
}
