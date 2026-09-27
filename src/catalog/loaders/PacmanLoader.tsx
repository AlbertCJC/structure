import { motion } from 'framer-motion'

/**
 * Chomp Loader — the head is two half-discs rotating around the center:
 * the top jaw rotates 0 → -35° → 0 while the bottom mirrors it, at chomp
 * speed (0.35s). Pellets march leftward on a staggered x-loop and vanish
 * as they reach the mouth.
 */
export function PacmanLoader() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-16 w-16">
        <motion.div
          className="absolute inset-x-0 top-0 h-8 origin-bottom rounded-t-full bg-amber-300"
          animate={{ rotate: [0, -32, 0] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-8 origin-top rounded-b-full bg-amber-300"
          animate={{ rotate: [0, 32, 0] }}
          transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="absolute left-7 top-2 h-2 w-2 rounded-full bg-[#0a0a12]" />
      </div>

      <div className="flex flex-col gap-0">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="mb-3 h-2.5 w-2.5 rounded-full bg-white/80"
            initial={{ opacity: 1 }} animate={{ x: [36, -30], opacity: [1, 1, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear', delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}
