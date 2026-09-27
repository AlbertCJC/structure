import { motion } from 'framer-motion'

/**
 * Hourglass Flip — the SVG holds its pose (easeOut hold), flips 180°
 * quickly, holds again, then the loop restarts. The keyframe TIMES array
 * creates the "drain → flip → drain" rhythm without any JS timers.
 */
export function HourglassFlipLoader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <motion.svg
        viewBox="0 0 60 60"
        className="h-16 w-16"
        animate={{ rotate: [0, 0, 180, 180, 360] }}
        transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.42, 0.5, 0.92, 1], ease: 'easeInOut' }}
      >
        <path d="M14 6h32M14 54h32" stroke="#9ba0b5" strokeWidth="4" strokeLinecap="round" />
        <path d="M18 8c0 12 8 14 12 22-4 8-12 10-12 22M42 8c0 12-8 14-12 22 4 8 12 10 12 22" stroke="#d946ef" strokeWidth="3" fill="none" strokeLinecap="round" />
        <motion.path
          d="M24 14h12l-6 10z"
          fill="#d946ef"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.15, 1, 0.15, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.42, 0.5, 0.92, 1] }}
        />
      </motion.svg>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">sand settling…</span>
    </div>
  )
}
