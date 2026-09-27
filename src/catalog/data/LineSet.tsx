import { useState } from 'react'
import { motion } from 'framer-motion'

const PTS = [12, 26, 18, 34, 28, 46, 40, 58]

function linePath(vals: number[], w = 210, h = 56) {
  const max = Math.max(...vals)
  return vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (vals.length - 1)) * w} ${h - (v / max) * (h - 6)}`).join(' ')
}

/**
 * Pulsing point spark — the sparkline draws itself in; the final point
 * pulses and wears its value as a charm.
 */
export function PulsingPointSpark() {
  const max = Math.max(...PTS)
  const end = { x: 210, y: 56 - (PTS[PTS.length - 1] / max) * 50 }
  return (
    <div className="p-6">
      <div className="relative">
        <svg viewBox="0 -8 210 72" className="h-20 w-56">
          <motion.path d={linePath(PTS)} fill="none" stroke="#fff" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
          <motion.circle fill="#ffffff30" initial={{ cx: end.x, cy: end.y, r: 5, opacity: 0.5 }} animate={{ r: [5, 8, 5], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <circle cx={end.x} cy={end.y} r="2.6" fill="#fff" />
        </svg>
        <span className="absolute -top-2 right-0 rounded bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold text-black">{PTS[PTS.length - 1]}</span>
      </div>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">signups · 8 weeks</p>
    </div>
  )
}

const ACTUAL = [20, 30, 26, 40, 36, 52, 48, 60]
const PLAN = [24, 24, 32, 34, 44, 44, 54, 56]

/**
 * Compare dashed — actual is the solid draw, plan is the dashed ghost;
 * draw-in pairs them, then labels settle.
 */
export function CompareDashedLines() {
  return (
    <div className="p-6">
      <svg viewBox="0 0 210 62" className="h-20 w-56">
        <motion.path d={linePath(PLAN, 210, 60)} fill="none" stroke="#ffffff50" strokeWidth="1.5" strokeDasharray="4 3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
        <motion.path d={linePath(ACTUAL, 210, 60)} fill="none" stroke="#fff" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
      </svg>
      <p className="mt-1 flex gap-3 font-mono text-[9px] uppercase tracking-widest text-fog">
        <span className="text-white">— actual</span>
        <span>– –</span>
        <span>plan</span>
      </p>
    </div>
  )
}

const SNAP = [14, 22, 18, 30, 26, 36, 31, 42]

/**
 * Crosshair snap — sweep the chart: a dot rides the nearest sample point
 * and its value tags along. X-quantized steps, never between samples.
 */
export function CrosshairSnapChart() {
  const [i, setI] = useState<number | null>(null)
  const w = 210
  const h = 56
  const max = Math.max(...SNAP)
  const y = (v: number) => h - (v / max) * (h - 6)
  return (
    <div className="p-6">
      <div
        className="relative"
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          const x = ((e.clientX - r.left) / r.width) * w
          setI(Math.min(SNAP.length - 1, Math.max(0, Math.round((x / w) * (SNAP.length - 1)))))
        }}
        onPointerLeave={() => setI(null)}
      >
        <svg viewBox={`0 0 ${w} ${h}`} className="h-20 w-56">
          <path d={linePath(SNAP, w, h)} fill="none" stroke="#fff" strokeWidth="1.8" />
          {i !== null && (
            <circle cx={(i / (SNAP.length - 1)) * w} cy={y(SNAP[i])} r="3.4" fill="#fff" />
          )}
        </svg>
        {i !== null && (
          <span
            className="pointer-events-none absolute -top-1 rounded bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold text-black"
            style={{ left: `${(i / (SNAP.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
          >
            {SNAP[i]}
          </span>
        )}
      </div>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">sweep the chart</p>
    </div>
  )
}

const THR = [18, 26, 21, 33, 29, 44, 38, 52, 47]

/**
 * Threshold flash — a faded area, a hard threshold line, and samples above
 * it get a one-time celebratory flash after draw-in.
 */
export function ThresholdFlashChart() {
  const [burst, setBurst] = useState(false)
  const w = 210
  const h = 56
  const threshold = 30
  const y = (v: number) => h - (v / 60) * (h - 6)
  return (
    <div className="p-6">
      <svg viewBox={`0 0 ${w} ${h + 6}`} className="h-20 w-56">
        <path d={`${linePath(THR, w, h)} L ${w} ${h} L 0 ${h} Z`} fill="#ffffff0d" />
        <motion.path d={linePath(THR, w, h)} fill="none" stroke="#fff" strokeWidth="1.8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3 }} onAnimationComplete={() => setBurst(true)} />
        <line x1="0" x2={w} y1={y(threshold)} y2={y(threshold)} stroke="#ffffff40" strokeDasharray="3 3" />
        {burst &&
          THR.map((v, i) =>
            v > threshold ? (
              <motion.circle key={i} initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1] }} transition={{ duration: 0.8, delay: i * 0.04 }} cx={(i / (THR.length - 1)) * w} cy={y(v)} r="3" fill="#fff" />
            ) : null,
          )}
      </svg>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">sla line · pulses above 30</p>
    </div>
  )
}
