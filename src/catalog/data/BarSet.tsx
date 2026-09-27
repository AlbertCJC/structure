import { useState } from 'react'
import { motion } from 'framer-motion'

const PAIRS = [
  { label: 'Q1', a: 42, b: 30 },
  { label: 'Q2', a: 66, b: 48 },
  { label: 'Q3', a: 38, b: 62 },
  { label: 'Q4', a: 80, b: 58 },
]

/**
 * Grouped pair bars — hover a group: both bars lift and the raw values tag
 * in above them; neighbors recede.
 */
export function GroupedPairBars() {
  const [hover, setHover] = useState(-1)
  return (
    <div className="flex h-32 items-end gap-5 p-6 pt-8">
      {PAIRS.map((g, i) => (
        <div key={g.label} className="relative flex items-end gap-1" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}>
        {hover === i && (
          <span className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-1.5 py-0.5 font-mono text-[8px] font-bold text-black">
            {g.a} · {g.b}
          </span>
        )}
          {[g.a, g.b].map((v, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 1 }} animate={{ height: v * (hover === i ? 1.06 : 1), opacity: hover === -1 || hover === i ? 1 : 0.35 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className={`w-3.5 rounded-t ${j === 0 ? 'bg-white' : 'bg-white/40'}`}
              style={{ height: v }}
            />
          ))}
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[8px] text-fog">{g.label}</span>
        </div>
      ))}
    </div>
  )
}

/**
 * Goal marker bar — the fill springs to 72% on rerun while the goal tick
 * stays put at 80%: progress read against a benchmark, not alone.
 */
export function GoalMarkerBar() {
  const [run, setRun] = useState(0)
  return (
    <div className="w-56 p-6">
      <p className="mb-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-fog">
        <span>sprint velocity</span>
        <span>goal 80</span>
      </p>
      <div className="relative h-2.5 rounded-full bg-white/10">
        <motion.div
          key={run}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.72 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20 }}
          className="h-full origin-left rounded-full bg-white"
        />
        <span className="absolute -top-1.5 h-3 w-0.5 bg-white" style={{ left: '80%' }} />
      </div>
      <div className="mt-2 flex justify-between">
        <span className="font-mono text-[10px] text-white">72 / 80 pts</span>
        <button onClick={() => setRun((r) => r + 1)} className="text-[9px] uppercase text-fog underline-offset-2 hover:text-white hover:underline">
          re-run
        </button>
      </div>
    </div>
  )
}

const RACERS = [
  { name: 'north', v: 44 },
  { name: 'east', v: 68 },
  { name: 'south', v: 31 },
  { name: 'west', v: 57 },
]

/**
 * Racing frames — click to reshuffle the race; every bar chases its new
 * width on its own spring so the frame feels like a live replay.
 */
export function RacingFrameBars() {
  const [vals, setVals] = useState(RACERS.map((r) => r.v))
  return (
    <div className="w-56 space-y-1.5 p-6">
      {RACERS.map((r, i) => (
        <div key={r.name} className="flex items-center gap-2">
          <span className="w-10 font-mono text-[9px] text-fog">{r.name}</span>
          <div className="h-3.5 flex-1 rounded bg-white/[0.06]">
            <motion.div animate={{ width: `${vals[i]}%` }} transition={{ type: 'spring', stiffness: 110 + i * 22, damping: 20 }} className="h-full rounded bg-white" />
          </div>
        </div>
      ))}
      <button
        onClick={() => setVals([...RACERS].sort(() => 0.5 - Math.random()).map((r) => r.v))}
        className="mt-1 rounded-full border border-white/20 px-3 py-1 text-[10px] text-fog hover:text-white"
      >
        next frame ▸▸
      </button>
    </div>
  )
}

const WL = [
  { name: 'mon', d: 26 },
  { name: 'tue', d: -18 },
  { name: 'wed', d: 40 },
  { name: 'thu', d: -32 },
  { name: 'fri', d: 24 },
]

/**
 * Diverging win/loss — bars swing left (loss) or right (win) from a center
 * axis per day; solid white wins, hollow losses.
 */
export function DivergingWinlossBars() {
  return (
    <div className="w-56 space-y-1.5 p-6">
      {WL.map((d) => (
        <div key={d.name} className="relative flex h-4 items-center">
          <span className="w-7 font-mono text-[8px] text-fog">{d.name}</span>
          <div className="relative h-full flex-1">
            <span className="absolute left-1/2 top-0 h-full w-px bg-white/20" />
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 160, damping: 20 }}
              className={`absolute top-0 h-full ${d.d < 0 ? 'right-1/2 origin-right border border-white/50' : 'left-1/2 origin-left bg-white'}`}
              style={{ width: `${Math.abs(d.d)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
