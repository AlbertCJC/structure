import { useState } from 'react'
import { motion } from 'framer-motion'

const SLICES = [
  { label: 'design', v: 40, c: '#ffffff' },
  { label: 'motion', v: 34, c: '#ffffff80' },
  { label: 'bugs', v: 26, c: '#ffffff38' },
]

/** Slice geometry helpers — arcs for 3 static slices of the same pie. */
function pt(deg: number, r: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)]
}
function wedgePath(a0: number, a1: number) {
  const [x0, y0] = pt(a0, 44)
  const [x1, y1] = pt(a1, 44)
  return `M50 50 L${x0} ${y0} A44 44 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1} ${y1} Z`
}

/**
 * Slice pull — hovering a slice tugs it out along its mid-angle (translate,
 * not path morphing: cheap and buttery).
 */
export function SlicePullPie() {
  const [hover, setHover] = useState(-1)
  let acc = 0
  const segs = SLICES.map((s, i) => {
    const a0 = (acc / 100) * 360
    acc += s.v
    const a1 = (acc / 100) * 360
    const mid = ((a0 + a1) / 2 - 90) * (Math.PI / 180)
    return { ...s, d: wedgePath(a0, a1 - 0.8), dx: hover === i ? Math.cos(mid) * 5 : 0, dy: hover === i ? Math.sin(mid) * 5 : 0, i }
  })
  return (
    <div className="p-6">
      <svg viewBox="0 0 100 100" className="h-32 w-32">
        {segs.map((s) => (
          <motion.path
            key={s.label}
            d={s.d}
            fill={s.c}
            animate={{ x: s.dx, y: s.dy }}
            onMouseEnter={() => setHover(s.i)}
            onMouseLeave={() => setHover(-1)}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>
      <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-widest text-fog">{hover >= 0 ? `${SLICES[hover].label} ${SLICES[hover].v}%` : 'hover a slice'}</p>
    </div>
  )
}

const DONUT = [
  { label: 'core', v: 50, a: '#fff' },
  { label: 'plugins', v: 30, a: '#ffffff80' },
  { label: 'docs', v: 20, a: '#ffffff40' },
]

/**
 * Donut grow — arcs sit at r=40; hovering one inflates its strokeWidth
 * while its opacity amps up.
 */
export function GrowArcDonut() {
  const [hover, setHover] = useState(-1)
  const R = 40
  const C = 2 * Math.PI * R
  let acc = 0
  return (
    <div className="p-6">
      <svg viewBox="0 0 100 100" className="h-32 w-32 -rotate-90">
        {DONUT.map((d, i) => {
          const off = acc
          acc += d.v
          return (
            <motion.circle
              key={d.label}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={d.a}
              strokeDasharray={`${(d.v / 100) * C - 1.5} ${C}`}
              strokeDashoffset={-(off / 100) * C}
              initial={{ strokeWidth: 9, opacity: 1 }}
              animate={{ strokeWidth: hover === i ? 15 : 9, opacity: hover === -1 || hover === i ? 1 : 0.35 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              style={{ cursor: 'pointer' }}
            />
          )
        })}
      </svg>
      <p className="mt-1 text-center font-mono text-[9px] uppercase tracking-widest text-fog">{hover >= 0 ? DONUT[hover].label : 'hover an arc'}</p>
    </div>
  )
}

/**
 * Half donut — a semicircular arc fills to 62% via pathLength; value label
 * rides the same spring.
 */
export function HalfDonutLoad() {
  const [run, setRun] = useState(0)
  return (
    <div className="grid justify-items-center p-6">
      <div className="relative">
        <svg viewBox="0 0 100 56" className="h-16 w-28">
          <path d="M8 52 A44 44 0 0 1 92 52" fill="none" stroke="#ffffff18" strokeWidth="10" strokeLinecap="round" />
          <motion.path
            key={run}
            d="M8 52 A44 44 0 0 1 92 52"
            fill="none"
            stroke="#fff"
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.62 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-sm font-bold text-white">62%</span>
      </div>
      <button onClick={() => setRun((r) => r + 1)} className="mt-2 rounded-full border border-white/20 px-3 py-0.5 text-[9px] text-fog hover:text-white">
        refill
      </button>
    </div>
  )
}

/**
 * Legend sync — hovering a legend row highlights its slice: same data,
 * two views, one hover state.
 */
export function LegendSyncDonut() {
  const [hover, setHover] = useState(-1)
  const R = 36
  const C = 2 * Math.PI * R
  let acc = 0
  const rows = [
    { label: 'direct', v: 46, a: '#fff' },
    { label: 'search', v: 34, a: '#ffffff90' },
    { label: 'social', v: 20, a: '#ffffff45' },
  ]
  return (
    <div className="flex items-center gap-5 p-6">
      <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
        {rows.map((r, i) => {
          const off = acc
          acc += r.v
          return (
            <motion.circle
              key={r.label}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={r.a}
              strokeWidth="13"
              strokeDasharray={`${(r.v / 100) * C - 1.5} ${C}`}
              strokeDashoffset={-(off / 100) * C}
              initial={{ opacity: 1 }}
              animate={{ opacity: hover === -1 || hover === i ? 1 : 0.25 }}
              transition={{ duration: 0.2 }}
            />
          )
        })}
      </svg>
      <ul className="space-y-1.5">
        {rows.map((r, i) => (
          <li key={r.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} className={`flex cursor-default items-center gap-2 text-[11px] transition-opacity ${hover === -1 || hover === i ? 'text-white' : 'text-fog/40'}`}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: r.a }} />
            {r.label}
            <span className="ml-auto pl-3 font-mono text-[9px]">{r.v}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
