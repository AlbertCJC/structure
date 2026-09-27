import { motion } from 'framer-motion'

/**
 * Deep Press Button (neumorphic).
 *
 * At rest: raised via a light/dark shadow pair. On press (whileTap):
 * scale 0.96, y+2, and the shadow pair SWAPS to inset — the brain reads
 * the inset shadows as "below the surface". One gesture, three channels,
 * all on the same stiff spring so they land together.
 */
export function TiltPressButton() {
  return (
    <div className="p-8">
      <motion.button
        initial={false}
        whileTap={{
          scale: 0.96,
          y: 2,
          boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.04)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="rounded-2xl bg-raise px-9 py-4 text-sm font-semibold text-mist shadow-[5px_5px_12px_rgba(0,0,0,0.55),-3px_-3px_8px_rgba(255,255,255,0.05)]"
      >
        Press deep
      </motion.button>
      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">soft-ui depth</p>
    </div>
  )
}
