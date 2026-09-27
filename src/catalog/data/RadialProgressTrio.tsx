import { motion } from 'framer-motion'

const RINGS = [
  { pct: 72, color: '#8b5cf6', label: 'CPU', spring: { stiffness: 90, damping: 18 } },
  { pct: 45, color: '#22d3ee', label: 'MEM', spring: { stiffness: 140, damping: 16 } },
  { pct: 88, color: '#a3e635', label: 'SSD', spring: { stiffness: 200, damping: 14 } },
]

const R = 24
const CIRC = 2 * Math.PI * R

/**
 * Radial Progress Trio — three dash-offset rings, each chased by a
 * DIFFERENT spring weight (soft → snappy) so their personalities differ
 * even though the visuals rhyme. A classic KPI cluster.
 */
export function RadialProgressTrio() {
  return (
    <div className="flex items-center gap-5 p-6">
      {RINGS.map((ring) => (
        <div key={ring.label} className="flex flex-col items-center gap-2">
          <div className="relative h-16 w-16">
            <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
              <circle cx="30" cy="30" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <motion.circle
                cx="30" cy="30" r={R} fill="none" stroke={ring.color} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={CIRC}
                style={{ strokeDashoffset: CIRC }}
                initial={{ strokeDashoffset: CIRC }}
                animate={{ strokeDashoffset: CIRC * (1 - ring.pct / 100) }}
                transition={{ type: 'spring', ...ring.spring }}
              />
            </svg>
            <span className="absolute inset-0 grid place-items-center font-mono text-[11px] font-bold text-white">{ring.pct}%</span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">{ring.label}</span>
        </div>
      ))}
    </div>
  )
}
