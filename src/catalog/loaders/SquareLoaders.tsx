import { motion } from 'framer-motion'

/**
 * Flipping square — rotateY flips to 180°, holds, flips through 360°: the
 * plateau keyframes (repeated values) create the resting beat between flips.
 */
export function FlippingSquareLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <motion.div
        className="h-9 w-9 rounded-[4px] bg-white"
        animate={{ rotateY: [0, 180, 180, 360, 360] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.3, 0.5, 0.8, 1] }}
      />
    </div>
  )
}

/**
 * Dual square — two outlined squares counter-rotating at different periods
 * (2s vs 3s), so the overlap pattern never exactly repeats quickly.
 */
export function DualSquareSpinLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10">
        <motion.span className="absolute inset-0 rounded-[3px] border-2 border-white" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        <motion.span className="absolute inset-[7px] rounded-[3px] border-2 border-white/50" animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} />
      </div>
    </div>
  )
}

/**
 * Morph square↔circle — borderRadius and rotation loop together, so the
 * shape travels from square to disc while making a full turn.
 */
export function MorphSquareCircleLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <motion.div
        className="h-9 w-9 bg-white"
        animate={{ borderRadius: ['14%', '50%', '14%'], rotate: [0, 180, 360] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

// Waypoints for a 36px square track
const T = 34

/**
 * Square path — a solid square rolls corner to corner around an invisible
 * square track, rotating 90° exactly as it passes each corner.
 */
export function SquarePathLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-11 w-11">
        <motion.div
          className="absolute left-0.5 top-0.5 h-3 w-3 rounded-[3px] bg-white"
          animate={{ x: [0, T, T, 0, 0], y: [0, 0, T, T, 0], rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.25, 0.5, 0.75, 1] }}
        />
      </div>
    </div>
  )
}
