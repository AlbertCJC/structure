import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SEGMENTS = [
  { pct: 38, color: '#8b5cf6' },
  { pct: 27, color: '#22d3ee' },
  { pct: 21, color: '#d946ef' },
  { pct: 14, color: '#a3e635' },
]

const R = 42
const CIRC = 2 * Math.PI * R

/**
 * Donut Chart Draw — each segment is a circle with strokeDasharray set to
 * its arc share, rotated into place; pathLength animates 0 → 1 in a
 * sequential 0.15s stagger so arcs draw one after another. The center
 * number counts up on the same clock via an interval.
 */
export function DonutChartDraw() {
  const [total, setTotal] = useState(0)
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    setTotal(0)
    const iv = window.setInterval(() => setTotal((t) => Math.min(100, t + 2)), 24)
    return () => window.clearInterval(iv)
  }, [epoch])

  let angle = -90 // start at 12 o'clock

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="11" />
          {SEGMENTS.map((s, i) => {
            const start = angle
            angle += (s.pct / 100) * 360
            return (
              <motion.circle
                key={`${epoch}-${i}`}
                cx="50" cy="50" r={R}
                fill="none" stroke={s.color} strokeWidth="11" strokeLinecap="round"
                strokeDasharray={`${(s.pct / 100) * CIRC} ${CIRC}`}
                transform={`rotate(${start} 50 50)`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.16, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-mono text-lg font-bold text-white">{total}%</span>
        </div>
      </div>
      <button onClick={() => setEpoch((e) => e + 1)} className="rounded-md border border-line px-3 py-1.5 text-[10px] text-mist transition hover:text-white">
        ↻ replay draw
      </button>
    </div>
  )
}
