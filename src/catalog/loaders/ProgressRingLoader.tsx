import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const R = 52
const CIRC = 2 * Math.PI * R

/**
 * Spring Progress Ring.
 *
 * The percentage increments in tiny 0.9% steps every 50ms (a jittery,
 * "real telemetry" feed). The stroke-dashoffset is CHASED by a soft spring
 * (stiffness 90 / damping 20) instead of matching instantly — the visible
 * lag between number and arc is the personality of the component.
 */
export function ProgressRingLoader() {
  const [pct, setPct] = useState(12)

  useEffect(() => {
    const iv = window.setInterval(() => setPct((v) => (v >= 99 ? 4 : v + 0.9)), 50)
    return () => window.clearInterval(iv)
  }, [])

  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="9" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          // style seeds the start value — framer cannot read SVG presentation
          // attrs back from the DOM, so without this it animates "from undefined".
          style={{ strokeDashoffset: CIRC }}
          initial={{ strokeDashoffset: CIRC }}
          animate={{ strokeDashoffset: CIRC * (1 - pct / 100) }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-mono text-lg font-bold text-white">
          {Math.round(pct)}
          <span className="text-[10px] text-fog">%</span>
        </span>
      </div>
    </div>
  )
}
