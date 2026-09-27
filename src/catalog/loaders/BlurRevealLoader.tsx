import { motion } from 'framer-motion'

const WORD = 'COMPILING'

/**
 * Progressive Blur Reveal.
 *
 * Each letter runs the same 2s keyframe trip — opacity 0.12→1→0.12 with a
 * blur(10px)→0→blur(10px) sweep and a violet text-shadow bloom at the peak —
 * but with a 0.1s per-letter delay. The stagger turns nine identical
 * animations into a traveling wave. A scanning bar below keeps the eye
 * moving in the same direction.
 */
export function BlurRevealLoader() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-[0.3em] font-mono text-xl font-bold tracking-[0.35em] text-white">
        {WORD.split('').map((ch, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.12 }}
            animate={{
              opacity: [0.12, 1, 0.12],
              filter: ['blur(10px)', 'blur(0px)', 'blur(10px)'],
              textShadow: [
                '0 0 0px rgba(139,92,246,0)',
                '0 0 18px rgba(139,92,246,0.8)',
                '0 0 0px rgba(139,92,246,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
          animate={{ x: ['-100%', '400%'] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
