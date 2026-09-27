import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Roll label — two stacked labels in an overflow clip; hover slides the
 * stack up 100%. Pure CSS transition, zero JS per hover.
 */
export function RollLabelButton() {
  return (
    <div className="p-6">
      <button className="group h-10 overflow-hidden rounded-lg border border-white/15 px-7">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
          <span className="block h-10 text-sm leading-10 text-white">Download</span>
          <span className="block h-10 text-sm leading-10 text-white/60">14 MB · PDF</span>
        </span>
      </button>
    </div>
  )
}

/**
 * Per-character roll — every glyph is a two-deep stack inside its own clip;
 * staggered transition delays make the word cascade on hover.
 */
export function SwapCharsButton() {
  const word = 'UPGRADE'.split('')
  return (
    <div className="p-6">
      <button className="group rounded-lg border border-white/15 px-7 py-2.5 font-mono text-sm tracking-[0.25em] text-white">
        {word.map((ch, i) => (
          <span key={i} className="inline-block h-[1.2em] overflow-hidden align-top">
            <span
              className="block transition-transform duration-300 ease-out group-hover:-translate-y-1/2"
              style={{ transitionDelay: `${i * 28}ms` }}
            >
              <span className="block h-[1.2em] leading-[1.2em]">{ch}</span>
              <span className="block h-[1.2em] leading-[1.2em] text-white/50">{ch}</span>
            </span>
          </span>
        ))}
      </button>
    </div>
  )
}

/**
 * Slide-arrow — label nudges left while an arrow slips in from the right;
 * the resting state hides the arrow at width 0 so nothing reflows.
 */
export function SlideArrowButton() {
  return (
    <div className="p-6">
      <button className="group relative h-10 w-44 overflow-hidden rounded-lg bg-white text-sm font-semibold text-black">
        <span className="absolute inset-0 grid place-items-center transition-transform duration-300 group-hover:-translate-x-3">
          Start building
        </span>
        <span className="absolute top-1/2 right-6 -translate-y-1/3 translate-x-8 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          →
        </span>
      </button>
    </div>
  )
}

/**
 * Countdown release — click starts 3-2-1; each tick pops on a fresh key,
 * then a success hold, then the idle state returns. Interval stored in a
 * ref and cleaned on unmount.
 */
export function CountdownReleaseButton() {
  const [n, setN] = useState<number | null>(null)
  const iv = useRef<number>(undefined)

  useEffect(() => () => window.clearInterval(iv.current), [])

  const start = () => {
    if (n !== null) return
    setN(3)
    iv.current = window.setInterval(() => {
      setN((v) => {
        if (v === null) return v
        if (v <= 1) {
          window.clearInterval(iv.current)
          window.setTimeout(() => setN(null), 1400)
          return 0
        }
        return v - 1
      })
    }, 650)
  }

  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={start}
        className="h-11 w-40 rounded-lg border border-white/15 font-mono text-sm text-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={n === null ? 'idle' : n}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.4, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            {n === null ? 'Launch' : n === 0 ? '🚀 GO' : n}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
