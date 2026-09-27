import { useState } from 'react'
import { motion } from 'framer-motion'

const CARDS = [
  { front: '◐', title: 'Design', back: 'Tokens, grids & type scales.' },
  { front: '◈', title: 'Motion', back: 'Spring physics & GSAP scrubs.' },
  { front: '✦', title: 'Ship', back: 'Copy the source, paste, own it.' },
]

/**
 * 3D Flip Cards — each card is a preserve-3d sandwich; clicking toggles a
 * rotateY spring. Faces are backface-hidden and the back face carries a
 * 180° pre-rotation, so both read correctly at rest and flipped.
 */
export function FlipCardGrid() {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false])

  return (
    <div className="flex gap-3 p-4 [perspective:900px]">
      {CARDS.map((c, i) => (
        <button
          key={c.title}
          onClick={() => setFlipped((f) => f.map((v, idx) => (idx === i ? !v : v)))}
          className="h-32 w-24 [transform-style:preserve-3d]"
          aria-label={`Flip ${c.title}`}
        >
          <motion.div
            animate={{ rotateY: flipped[i] ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 240, damping: 22 }}
            className="relative h-full w-full [transform-style:preserve-3d]"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-white/12 bg-gradient-to-br from-surface to-abyss [backface-visibility:hidden]">
              <span className="text-2xl text-violet-300">{c.front}</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{c.title}</span>
            </div>
            <div className="absolute inset-0 grid place-items-center rounded-xl border border-violet-400/30 bg-gradient-to-br from-violet-600/30 to-fuchsia-600/20 p-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="text-center text-[10px] leading-relaxed text-white">{c.back}</p>
            </div>
          </motion.div>
        </button>
      ))}
    </div>
  )
}
