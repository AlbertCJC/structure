import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * iOS-style pill — grayscale take on the platform switch: track inverts to
 * white ON, the knob rides a stiff spring with a slight overshoot at the end.
 */
export function IosSwitch() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((o) => !o)}
        className={`flex h-7 w-[52px] items-center rounded-full p-1 transition-colors duration-300 ${on ? 'bg-white' : 'bg-white/15'}`}
      >
        <motion.span
          layout
          animate={{ x: on ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 550, damping: 30 }}
          className={`h-5 w-5 rounded-full ${on ? 'bg-black' : 'bg-white'}`}
        />
      </button>
    </div>
  )
}

/**
 * Square-thumb switch — desktop-OS geometry: square knob, square track,
 * hard snap from a very stiff spring (no bounce).
 */
export function SquareThumbSwitch() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((o) => !o)}
        className={`flex h-7 w-[52px] items-center rounded-md border p-1 transition-colors ${on ? 'border-white/80 bg-white/10' : 'border-white/25'}`}
      >
        <motion.span layout animate={{ x: on ? 24 : 0 }} transition={{ type: 'spring', stiffness: 800, damping: 32 }} className="h-[18px] w-[18px] rounded-[3px] bg-white" />
      </button>
    </div>
  )
}

/**
 * Jelly knob — the knob squishes on every arrest: width overshoots then
 * settles, so each toggle lands with a wobble instead of a stop.
 */
export function JellySwitch() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn((o) => !o)}
        className={`flex h-7 w-[52px] items-center rounded-full p-1 transition-colors ${on ? 'bg-white/25' : 'bg-white/10'}`}
      >
        <motion.span
          key={String(on)}
          initial={{ x: on ? 0 : 24 }}
          animate={{ x: on ? 24 : 0, scaleX: [1, 1.4, 0.9, 1] }}
          transition={{ x: { type: 'spring', stiffness: 500, damping: 20 }, scaleX: { duration: 0.55, times: [0, 0.35, 0.7, 1] } }}
          className="h-5 w-5 origin-center rounded-full bg-white"
        />
      </button>
    </div>
  )
}

/**
 * Counter switch — a switch with a memory: the track reports how many times
 * it has been flipped, digit rolling per flip.
 */
export function CounterSwitch() {
  const [on, setOn] = useState(false)
  const [flips, setFlips] = useState(0)
  return (
    <div className="flex items-center gap-3 p-6">
      <button
        role="switch"
        aria-checked={on}
        onClick={() => {
          setOn((o) => !o)
          setFlips((f) => f + 1)
        }}
        className={`flex h-7 w-[52px] items-center rounded-full p-1 transition-colors ${on ? 'bg-white' : 'bg-white/15'}`}
      >
        <motion.span layout animate={{ x: on ? 24 : 0 }} transition={{ type: 'spring', stiffness: 550, damping: 30 }} className={`h-5 w-5 rounded-full ${on ? 'bg-black' : 'bg-white'}`} />
      </button>
      <motion.span key={flips} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-mono text-xs text-fog">
        ×{flips}
      </motion.span>
    </div>
  )
}
