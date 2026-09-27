import { useState } from 'react'
import { motion } from 'framer-motion'

const HEIGHTS = [52, 72, 44, 64, 84, 56]
const HUES = ['#8b5cf6', '#22d3ee', '#a3e635', '#d946ef', '#fbbf24', '#fb7185']

/**
 * Shuffle Masonry — three CSS columns of cards. Hitting shuffle
 * re-randomizes heights AND bumps the `epoch` key, which remounts every
 * card through its enter animation (rise + fade with a diagonal stagger),
 * so each shuffle replays the reveal choreography.
 */
export function MasonryReveal() {
  const [epoch, setEpoch] = useState(0)
  const [heights, setHeights] = useState(HEIGHTS)

  const shuffle = () => {
    setHeights((h) => [...h].sort(() => Math.random() - 0.5))
    setEpoch((e) => e + 1)
  }

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">masonry · {heights.length} tiles</span>
        <button onClick={shuffle} className="rounded-md border border-line px-2.5 py-1 text-[10px] text-mist transition hover:border-violet-400/50 hover:text-white">
          ⤨ shuffle
        </button>
      </div>
      <div className="columns-3 gap-2.5" key={epoch}>
        {heights.map((h, i) => (
          <motion.div
            key={`${epoch}-${i}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24, delay: i * 0.05 }}
            className="mb-2.5 break-inside-avoid rounded-lg border border-white/10"
            style={{ height: h, background: `linear-gradient(160deg, ${HUES[i]}26, #0a0a12)` }}
          />
        ))}
      </div>
    </div>
  )
}
