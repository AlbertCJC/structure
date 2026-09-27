import { useState } from 'react'
import { motion } from 'framer-motion'

const NAMES = ['Ava', 'Kai', 'Rio']
const MEDALS = ['🥇', '🥈', '🥉']

/**
 * Podium Leaderboard — bars are ordered by score; a reshuffle re-sorts the
 * array and `layout` springs each column to its new position and height
 * simultaneously — rank changes read as physical movement, not swaps.
 */
export function Leaderboard() {
  const [scores, setScores] = useState([84, 61, 92])

  const ranked = scores.map((s, i) => ({ name: NAMES[i], score: s, i })).sort((a, b) => b.score - a.score)

  return (
    <div className="flex w-full max-w-[220px] flex-col items-center gap-3 p-4">
      <div className="flex h-32 w-full items-end justify-center gap-3">
        {ranked.map((r, rank) => (
          <motion.div key={r.name} layout transition={{ type: 'spring', stiffness: 220, damping: 24 }} className="flex w-14 flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-mist">{r.score}</span>
            <motion.div
              layout
              animate={{ height: `${(r.score / 100) * 88 + 8}px` }}
              transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              className={`w-full rounded-t-lg bg-gradient-to-t ${rank === 0 ? 'from-amber-500/80 to-amber-300/80' : rank === 1 ? 'from-slate-500/70 to-slate-300/70' : 'from-orange-800/70 to-orange-500/70'}`}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-3">
        {ranked.map((r) => (
          <motion.span key={r.name} layout className="w-14 text-center font-mono text-[10px] text-fog">
            {MEDALS[ranked.indexOf(r)]} {r.name}
          </motion.span>
        ))}
      </div>
      <button
        onClick={() => setScores(scores.map(() => 40 + Math.round(Math.random() * 58)))}
        className="rounded-md border border-line px-3 py-1.5 text-[10px] text-mist transition hover:border-amber-400/50 hover:text-white"
      >
        ⤨ reshuffle scores
      </button>
    </div>
  )
}
