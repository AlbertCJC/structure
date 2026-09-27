import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const HUES = ['#8b5cf6', '#d946ef', '#22d3ee', '#a3e635', '#fbbf24', '#fb7185']

interface Piece {
  id: number
  x: number
  y: number
  rot: number
  hue: string
  w: number
  h: number
}

/**
 * Confetti Burst Button.
 *
 * One click spawns 14 pieces, each with a randomized ballistic vector:
 * horizontal spread ±120px, upward arc 60–130px followed by gravity
 * (keyframes [0, -rise, +fall] with asymmetric times), plus a full spin.
 * Opacity fades only in the last 30% so pieces stay visible while flying.
 */
export function ConfettiBurstButton() {
  const [pieces, setPieces] = useState<Piece[]>([])

  const burst = () => {
    const base = Date.now()
    setPieces(
      Array.from({ length: 14 }, (_, i) => ({
        id: base + i,
        x: (Math.random() - 0.5) * 240,
        y: 60 + Math.random() * 80,
        rot: (Math.random() - 0.5) * 720,
        hue: HUES[i % HUES.length],
        w: 5 + Math.random() * 4,
        h: 8 + Math.random() * 5,
      })),
    )
    window.setTimeout(() => setPieces([]), 1400)
  }

  return (
    <div className="relative p-10">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10">
        <AnimatePresence>
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{ x: p.x, y: [0, -p.y, 40], rotate: p.rot, opacity: [1, 1, 0] }}
              transition={{ duration: 1.25, times: [0, 0.45, 1], ease: 'easeOut' }}
              className="absolute rounded-[1px]"
              style={{ width: p.w, height: p.h, background: p.hue }}
            />
          ))}
        </AnimatePresence>
      </div>
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={burst}
        className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-amber-400 px-9 py-4 text-sm font-bold text-[#1a0a1f] shadow-lg shadow-fuchsia-500/30"
      >
        Celebrate 🎉
      </motion.button>
    </div>
  )
}
