import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Brutalist Press Button.
 *
 * The whole interaction is a mechanical key: a hard 8px fuchsia offset
 * shadow that the button physically TRANSLATES INTO on press (whileTap),
 * with the shadow shrinking in lockstep. No gradients, no anti-aliasing
 * softness — 3px stroke, mono type, maximum contrast.
 */
export function BrutalistPressButton() {
  const [stamps, setStamps] = useState(0)

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        whileTap={{ x: 5, y: 5, boxShadow: '4px 4px 0 #d946ef' }}
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        onClick={() => setStamps((n) => n + 1)}
        className="rounded-md border-[3px] border-[#0a0a12] bg-[#f2f2f8] px-9 py-4 font-mono text-sm font-extrabold uppercase tracking-[0.18em] text-[#0a0a12] shadow-[8px_8px_0_#d946ef]"
      >
        Press me
      </motion.button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        stamps: <span className="text-fuchsia-300">{stamps}</span>
      </span>
    </div>
  )
}
