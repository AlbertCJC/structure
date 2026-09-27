import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Shine Sweep Button.
 *
 * A rotated highlight strip rides a linear x-loop (-140% → 240%) forever,
 * but the strip's OPACITY is bound to hover state — so the sweep is only
 * "lit" while the pointer is over the shell, and fades out smoothly when
 * it leaves (opacity spring, not a hard cut).
 */
export function ShineSweepButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-8">
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.03 }}
        className="relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-[#26263c] to-[#15151f] px-9 py-4 text-sm font-semibold text-white shadow-lg"
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-4 bottom-0 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ opacity: 0 }} animate={{ x: ['-140%', '340%'], opacity: hovered ? 1 : 0 }}
          transition={{
            x: { duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 },
            opacity: { duration: 0.3 },
          }}
        />
        <span className="relative z-10">Polished finish</span>
      </motion.button>
    </div>
  )
}
