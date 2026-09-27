import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const HOLD_MS = 1200

/**
 * Hold to Confirm.
 *
 * pointerdown starts a requestAnimationFrame loop writing progress 0→1
 * over 1.2s. Releasing early leaves `done` false → the fill spring-charges
 * back to 0 (stiffness 300 = snap). Reaching 1 flips the confirmed state
 * and schedules a reset. rAF is cancelled on pointerup AND unmount.
 */
export function HoldToConfirmButton() {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const raf = useRef(0)
  const start = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const tick = () => {
    const p = Math.min(1, (performance.now() - start.current) / HOLD_MS)
    setProgress(p)
    if (p >= 1) {
      setConfirmed(true)
      setHolding(false)
      window.setTimeout(() => {
        setConfirmed(false)
        setProgress(0)
      }, 1500)
    } else {
      raf.current = requestAnimationFrame(tick)
    }
  }

  const begin = () => {
    if (confirmed) return
    setHolding(true)
    start.current = performance.now()
    raf.current = requestAnimationFrame(tick)
  }
  const release = () => {
    if (confirmed) return
    setHolding(false)
    cancelAnimationFrame(raf.current)
    setProgress(0)
  }

  return (
    <div className="p-8">
      <button
        onPointerDown={begin}
        onPointerUp={release}
        onPointerLeave={release}
        className="relative w-56 select-none overflow-hidden rounded-xl border border-violet-400/40 bg-violet-500/10 px-6 py-4 text-sm font-semibold text-violet-200"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-left bg-gradient-to-r from-violet-600/70 to-fuchsia-500/70"
          animate={{ scaleX: confirmed ? 1 : progress }}
          transition={{ type: 'spring', stiffness: confirmed ? 120 : 300, damping: 26 }}
        />
        <span className="relative z-10">
          {confirmed ? '✓ Confirmed' : holding ? `Charging ${Math.round(progress * 100)}%` : 'Hold to confirm'}
        </span>
      </button>
    </div>
  )
}
