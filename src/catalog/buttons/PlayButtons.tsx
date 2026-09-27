import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Runaway — hover makes it dodge (springs to a random offset three times),
 * then it surrenders and becomes clickable. Pure novelty; spring offsets
 * keep the dodges smooth instead of teleporting.
 */
export function RunawayButton() {
  const [dodges, setDodges] = useState(0)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [caught, setCaught] = useState(false)
  const dodge = () => {
    if (dodges >= 3) return
    setPos({
      x: (Math.random() < 0.5 ? -1 : 1) * (36 + Math.random() * 44),
      y: (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 22),
    })
    setDodges((d) => d + 1)
  }
  return (
    <div className="grid h-28 place-items-center p-6">
      <motion.button
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 18 }}
        onMouseEnter={dodge}
        onFocus={dodge}
        onClick={() => setCaught(true)}
        className="h-10 rounded-lg border border-white/15 px-5 text-sm text-white"
      >
        {caught ? 'You got me 🎯' : dodges >= 3 ? 'Fine — click me' : 'Try to click me'}
      </motion.button>
    </div>
  )
}

/**
 * Double face — two absolutely-stacked faces in a preserve-3d shell; hover
 * rotates the stack 180° on Y, backface-visibility hides the reverse side.
 * The classic card-flip compressed into 40px of button.
 */
export function DoubleFaceButton() {
  return (
    <div className="p-6" style={{ perspective: 500 }}>
      <button className="group relative h-10 w-40" aria-label="Subscribe">
        <span className="absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <span className="absolute inset-0 grid place-items-center rounded-lg border border-white/20 bg-white/5 text-sm text-white [backface-visibility:hidden]">
            Subscribe
          </span>
          <span className="absolute inset-0 grid place-items-center rounded-lg bg-white text-sm font-semibold text-black [backface-visibility:hidden] [transform:rotateY(180deg)]">
            Go →
          </span>
        </span>
      </button>
    </div>
  )
}

/**
 * Elastic drag — dragable with dragElastic on a zero-width constraint box:
 * framer applies rubber-band resistance while held and spring-returns on
 * release. One prop does the whole trick.
 */
export function ElasticDragButton() {
  return (
    <div className="p-6">
      <motion.button
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.55}
        transition={{ type: 'spring', stiffness: 320, damping: 14 }}
        className="h-11 cursor-grab rounded-xl border border-white/15 bg-white/5 px-7 text-sm text-white active:cursor-grabbing"
      >
        Pull me — I snap back
      </motion.button>
    </div>
  )
}

/**
 * Keyboard key — a physical keycap: bright bottom "stem" shadow gives the
 * resting height; pressing collapses the shadow and translates the cap down
 * into it. Brutalist tactility, pure CSS.
 */
export function PressKeyButton() {
  return (
    <div className="p-6">
      <button className="grid h-12 w-14 place-items-center rounded-lg border-2 border-white bg-raise font-mono text-lg font-bold text-white shadow-[0_6px_0_rgba(255,255,255,0.85)] transition-all duration-75 active:translate-y-[6px] active:shadow-none">
        B
      </button>
    </div>
  )
}
