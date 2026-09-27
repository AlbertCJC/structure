import { motion } from 'framer-motion'

/**
 * Squash & Stretch — Disney principle #2. Keyframed with explicit `times`:
 *  • apex (t=0, 0.5): normal shape, stretched slightly on the way down
 *  • impact (t=0.25): y at the floor, scaleX 1.35 / scaleY 0.6 squash
 * The shadow widens and darkens exactly at impact, sold by the same times.
 */
export function SquashBounceLoader() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-28 w-32">
        <motion.div
          className="absolute bottom-4 left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-600"
          animate={{
            y: [0, 52, 0, 52, 0],
            scaleX: [1, 1.35, 1, 1.35, 1],
            scaleY: [1, 0.6, 1, 0.6, 1],
          }}
          transition={{ duration: 1.3, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-black/50 blur-[3px]"
          initial={{ opacity: 0.35 }} animate={{ scaleX: [0.6, 1.2, 0.6, 1.2, 0.6], opacity: [0.35, 0.7, 0.35, 0.7, 0.35] }}
          transition={{ duration: 1.3, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1], ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
