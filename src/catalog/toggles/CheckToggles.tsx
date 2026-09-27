import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Circle check — the disc inverts to white ON while the check draws itself
 * in dark ink via pathLength. Two coupled animations, one state.
 */
export function CircleCheckToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.85 }}
        aria-pressed={on}
        onClick={() => setOn((o) => !o)}
        animate={{ backgroundColor: on ? '#ffffff' : 'rgba(255,255,255,0)' }}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/30"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <motion.path
            d="M5 12.5 10 17.5 19 7"
            fill="none"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ pathLength: on ? 1 : 0, stroke: on ? '#0a0a12' : '#ffffff' }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </svg>
      </motion.button>
    </div>
  )
}

/**
 * Box check — a rounded square whose border burns brighter ON; the check
 * springs in with a slight overshoot rather than drawing.
 */
export function BoxCheckToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.88 }}
        aria-pressed={on}
        onClick={() => setOn((o) => !o)}
        animate={{ borderColor: on ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)', backgroundColor: on ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0)' }}
        className="grid h-11 w-11 place-items-center rounded-xl border-2"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: on ? [0.4, 1.3, 1] : 0.4, opacity: on ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 19 }}
          className="text-lg text-white"
        >
          ✓
        </motion.span>
      </motion.button>
    </div>
  )
}

/**
 * Favorite star — outline fills with a rotate-pop on ON and four rays burst
 * outward once. Toggling off settles quietly.
 */
export function FavoriteStarToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.85 }}
        aria-pressed={on}
        onClick={() => setOn((o) => !o)}
        className="relative grid h-11 w-11 place-items-center"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          animate={{ scale: on ? [1, 1.3, 1] : 1, rotate: on ? [0, -14, 0] : 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.path
            d="M12 3.2 14.8 9l6.3.7-4.7 4.3 1.3 6.2L12 17l-5.7 3.2 1.3-6.2L2.9 9.7 9.2 9z"
            fill="white"
            stroke="white"
            strokeWidth="1.4"
            strokeLinejoin="round"
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: on ? 1 : 0 }}
          />
        </motion.svg>
        {on &&
          [0, 1, 2, 3].map((i) => (
            <motion.span
              key={`${String(on)}-${i}`}
              className="absolute h-0.5 w-2 rounded-full bg-white/70"
              initial={{ opacity: 0.8, x: 0, y: 0, scale: 0.4, rotate: i * 90 + 45 }}
              animate={{ opacity: 0, x: Math.cos((i * Math.PI) / 2 + Math.PI / 4) * 22, y: Math.sin((i * Math.PI) / 2 + Math.PI / 4) * 22, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ))}
      </motion.button>
    </div>
  )
}

/**
 * Heart like — fill snaps in on a quick spring with a single overshoot
 * beat; unlike the double-tap demo this one is a plain toggle control.
 */
export function HeartLikeToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.82 }}
        aria-pressed={on}
        onClick={() => setOn((o) => !o)}
        className="grid h-11 w-11 place-items-center"
      >
        <motion.svg viewBox="0 0 24 24" className="h-7 w-7" animate={{ scale: on ? [1, 1.35, 1] : 1 }} transition={{ type: 'spring', stiffness: 480, damping: 15 }}>
          <motion.path
            d="M12 20.7s-7.2-4.6-9.6-8.9C.9 8.9 2.8 5.4 6 5.4c1.9 0 3.5 1.1 4.2 2.7h3.6c.7-1.6 2.3-2.7 4.2-2.7 3.2 0 5.1 3.5 3.6 6.4-2.4 4.3-9.6 8.9-9.6 8.9Z"
            fill="white"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: on ? 1 : 0 }}
          />
        </motion.svg>
      </motion.button>
    </div>
  )
}
