import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const COLORS = ['#f472b6', '#fb7185', '#c084fc', '#fbbf24', '#34d399']

interface Burst {
  id: number
  particles: { angle: number; dist: number; color: string; size: number }[]
}

/**
 * Double-Tap Like.
 *
 * Double-click arms the like AND spawns a Burst of 8 particles; each gets
 * a randomized angle/distance/color at spawn time (frozen into state — the
 * randomness must not reshuffle on re-render). Particles fly on springs
 * and fade; the heart itself blooms via a keyframed scale pop.
 */
export function DoubleTapLikeButton() {
  const [liked, setLiked] = useState(false)
  const [burst, setBurst] = useState<Burst | null>(null)

  const fire = () => {
    setLiked(true)
    setBurst({
      id: Date.now(),
      particles: Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2 + Math.random() * 0.5,
        dist: 44 + Math.random() * 26,
        color: COLORS[i % COLORS.length],
        size: 5 + Math.random() * 4,
      })),
    })
  }

  return (
    <div className="relative p-10">
      <button onDoubleClick={fire} onClick={() => setLiked(false)} aria-label="Like" className="relative block">
        {/* particles */}
        <AnimatePresence>
          {burst && (
            <motion.span key={burst.id} className="pointer-events-none absolute left-1/2 top-1/2" exit={{ opacity: 0 }}>
              {burst.particles.map((p, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ x: Math.cos(p.angle) * p.dist, y: Math.sin(p.angle) * p.dist, opacity: 0, scale: 0.3 }}
                  transition={{ type: 'spring', stiffness: 90, damping: 14, duration: 0.9 }}
                  className="absolute rounded-full"
                  style={{ width: p.size, height: p.size, background: p.color }}
                />
              ))}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.svg
          key={liked ? 'on' : 'off'}
          viewBox="0 0 24 24"
          animate={liked ? { scale: [0.6, 1.35, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, times: [0, 0.6, 1] }}
          className="h-16 w-16"
        >
          <path
            d="M12 21s-7.5-4.9-10-9.6C.3 8 2.4 4.5 6 4.1c2-.2 3.9.8 6 3 2.1-2.2 4-3.2 6-3 3.6.4 5.7 3.9 4 7.3C19.5 16.1 12 21 12 21Z"
            fill={liked ? '#f43f5e' : 'none'}
            stroke={liked ? '#f43f5e' : '#9ba0b5'}
            strokeWidth="1.6"
          />
        </motion.svg>
      </button>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        double-click to like · click to unlike
      </p>
    </div>
  )
}
