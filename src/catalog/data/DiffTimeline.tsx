import { motion } from 'framer-motion'

const COMMITS = [
  { hash: 'a3f9c12', msg: 'feat: spring physics pass', time: '2h' },
  { hash: '8b04e77', msg: 'fix: tilt cleanup on unmount', time: '5h' },
  { hash: 'f21d9b3', msg: 'chore: bump framer-motion', time: '1d' },
]

/**
 * Commit Timeline — the rail draws itself (scaleY), then commit dots pop
 * in sequence with a ping ring, and labels slide in from the left. The
 * whole choreography replays on a 6s loop via a keyframe-free approach:
 * an interval bumps the visible count.
 */
export function DiffTimeline() {
  return (
    <div className="relative w-full max-w-[240px] p-4 pl-5">
      {/* rail */}
      <motion.div
        className="absolute bottom-6 left-7 top-6 w-px origin-top bg-gradient-to-b from-violet-400/60 to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {COMMITS.map((c, i) => (
        <div key={c.hash} className="relative mb-4 flex items-start gap-3 last:mb-0">
          <span className="relative -ml-2 mt-0.5">
            <motion.span
              className="block h-3 w-3 rounded-full border-2 border-violet-400 bg-abyss"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.5, type: 'spring', stiffness: 400, damping: 18 }}
            />
            <motion.span
              className="absolute inset-0 rounded-full border border-violet-400"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.7, 0], scale: [1, 2.2, 2.4] }}
              transition={{ delay: 0.6 + i * 0.5, duration: 1.1, repeat: Infinity, repeatDelay: 2.4 }}
            />
          </span>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.5 }}
            className="min-w-0"
          >
            <p className="truncate text-[11px] text-white">{c.msg}</p>
            <p className="font-mono text-[9px] text-fog">
              {c.hash} · {c.time} ago
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
