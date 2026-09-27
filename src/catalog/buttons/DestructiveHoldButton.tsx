import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HOLD_MS = 1400

/**
 * Hold to Delete — destructive-action gating.
 *
 * Same rAF charge mechanic as Hold-to-Confirm, dressed for danger: a red
 * fill creeps left→right while the label counts down tenths of a second.
 * Releasing early is ALWAYS safe (the charge snaps back), which is the
 * whole point of hold-gating destructive actions.
 */
export function DestructiveHoldButton() {
  const [fill, setFill] = useState(0)
  const [holding, setHolding] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const raf = useRef(0)
  const t0 = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const tick = () => {
    const p = Math.min(1, (performance.now() - t0.current) / HOLD_MS)
    setFill(p)
    if (p >= 1) {
      setHolding(false)
      setDeleted(true)
      window.setTimeout(() => {
        setDeleted(false)
        setFill(0)
      }, 1800)
    } else {
      raf.current = requestAnimationFrame(tick)
    }
  }

  const begin = () => {
    if (deleted) return
    setHolding(true)
    t0.current = performance.now()
    raf.current = requestAnimationFrame(tick)
  }
  const stop = () => {
    if (deleted) return
    setHolding(false)
    cancelAnimationFrame(raf.current)
    setFill(0)
  }

  return (
    <div className="p-8">
      <button
        onPointerDown={begin}
        onPointerUp={stop}
        onPointerLeave={stop}
        className={`relative w-60 select-none overflow-hidden rounded-lg border-2 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
          deleted ? 'border-red-500/70 text-red-300' : 'border-red-500/50 text-red-200'
        }`}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-left bg-red-600/70"
          animate={{ scaleX: deleted ? 1 : fill }}
          transition={{ type: 'spring', stiffness: deleted ? 120 : 320, damping: 28 }}
        />
        <span className="relative z-10">
          {deleted
            ? '✕ workspace deleted'
            : holding
              ? `hold… ${((HOLD_MS / 1000) * (1 - fill)).toFixed(1)}s`
              : 'hold to delete workspace'}
        </span>
      </button>
    </div>
  )
}
