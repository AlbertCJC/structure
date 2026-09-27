import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Split-flap title — the word is drawn twice with top/bottom clip-paths;
 * hover slides the halves apart 6px and rejoins them on leave.
 */
export function SplitFlapTitle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
      <div className="relative inline-block cursor-default">
        <span className="invisible block text-3xl font-black uppercase tracking-tight">Divide</span>
        {[0, 1].map((half) => (
          <motion.span
            key={half}
            aria-hidden
            animate={{ x: on ? (half === 0 ? -6 : 6) : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="absolute inset-0 block text-3xl font-black uppercase tracking-tight text-white"
            style={{ clipPath: half === 0 ? 'inset(0 0 50% 0)' : 'inset(50% 0 0 0)' }}
          >
            Divide
          </motion.span>
        ))}
      </div>
    </div>
  )
}

const GLOWWORD = 'Luminous'

/**
 * Proximity glow — hovering the word sweeps a brighten wave across the
 * glyphs (staggered lighten via parent variant, not per-pixel math).
 */
export function ProximityCharGlow() {
  return (
    <motion.div
      className="flex p-6 text-2xl font-bold"
      initial="idle"
      whileHover="lit"
      transition={{ staggerChildren: 0.045 }}
    >
      {[...GLOWWORD].map((c, i) => (
        <motion.span
          key={i}
          variants={{
            idle: { color: '#565660', textShadow: '0 0 0px rgba(255,255,255,0)' },
            lit: { color: '#ffffff', textShadow: '0 0 18px rgba(255,255,255,0.65)' },
          }}
          transition={{ duration: 0.3 }}
        >
          {c}
        </motion.span>
      ))}
    </motion.div>
  )
}

/**
 * Jitter glitch — while hovered, the word shakes at 9px amplitude with a
 * 40ms loop; off-screen fast so it reads static-shaken, not seasick.
 */
export function JitterGlitchWord() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <motion.span
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        animate={on ? { x: [0, -2, 2, -1, 1, 0], y: [0, 1, -1, 2, -2, 0] } : { x: 0, y: 0 }}
        transition={on ? { duration: 0.32, repeat: Infinity } : { duration: 0.15 }}
        className="cursor-default font-mono text-2xl font-bold uppercase tracking-widest text-white"
      >
        unsYNC
      </motion.span>
    </div>
  )
}

/**
 * Squiggle underline — hovering draws a hand-made wavy two-path underline
 * via pathLength, second path delayed like a double-stroke.
 */
export function SquiggleUnderlineDraw() {
  const [on, setOn] = useState(false)
  const wave = 'M0 3 Q 10 0, 20 3 T 40 3 T 60 3 T 80 3'
  return (
    <div className="p-6">
      <span
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        className="relative inline-block cursor-default text-xl font-semibold text-white"
      >
        nearly perfect
        <svg viewBox="0 0 80 6" className="absolute -bottom-2 left-0 h-2.5 w-full" preserveAspectRatio="none">
          <motion.path d={wave} fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.3 }} />
          <motion.path d="M6 5 Q 30 6, 74 5" fill="none" stroke="#ffffff66" strokeWidth="1.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.12 }} />
        </svg>
      </span>
    </div>
  )
}
