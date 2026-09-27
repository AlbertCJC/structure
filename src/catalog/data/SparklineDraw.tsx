import { motion } from 'framer-motion'

const PTS = 'M4,44 L20,38 L36,41 L52,28 L68,32 L84,18 L100,24 L116,10'
const AREA = `${PTS} L116,56 L4,56 Z`

/**
 * Sparkline Draw — the line draws left→right via pathLength, the gradient
 * area fades up behind it with a delay, and the endpoint pulses forever.
 * Replay button remounts the drawing via an epoch key.
 */
export function SparklineDraw() {
  return (
    <div className="flex w-full max-w-[230px] flex-col items-center gap-3 p-4">
      <svg viewBox="0 0 120 58" className="h-20 w-full">
        <defs>
          <linearGradient id="spark-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>
        <motion.path d={AREA} fill="url(#spark-area)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.6 }} />
        <motion.path
          d={PTS}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />
        <motion.circle cx="116" cy="10" r="3" fill="#22d3ee"
          initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1] }} transition={{ delay: 1, duration: 0.4 }} />
        <motion.circle cx="116" cy="10" r="3" fill="none" stroke="#22d3ee" strokeWidth="1.5"
          // r MUST be in initial: with an initial target object, framer reads the
          // current DOM value for any prop NOT listed — SVG attrs read back as
          // `undefined`, which then gets written to the attribute (r="undefined").
          initial={{ opacity: 0.8, r: 3 }}
          animate={{ opacity: [0.8, 0], r: [3, 9] }}
          transition={{ delay: 1.2, duration: 1.4, repeat: Infinity, ease: 'easeOut' }} />
      </svg>
      <div className="flex w-full items-center justify-between font-mono text-[10px]">
        <span className="text-fog">REVENUE / 7D</span>
        <span className="text-cyan-300">+18.2% ↗</span>
      </div>
    </div>
  )
}
