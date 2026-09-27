import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

/**
 * Goal ring — a full circle fills against its % goal; the center label is
 * a live projection of the same motion value.
 */
export function GoalFillRing() {
  const mv = useMotionValue(0)
  const label = useTransform(mv, (v) => `${Math.round(v)}%`)
  const ring = useTransform(mv, (v) => v / 100)
  const [run, setRun] = useState(0)
  useEffect(() => {
    const c = animate(mv, 84, { type: 'spring', stiffness: 60, damping: 18 })
    return () => c.stop()
  }, [run, mv])
  return (
    <button onClick={() => { mv.set(0); setRun((r) => r + 1) }} className="group grid justify-items-center gap-1.5 p-6" title="Replay">
      <div className="relative">
        <svg viewBox="0 0 84 84" className="h-24 w-24 -rotate-90">
          <circle cx="42" cy="42" r="34" fill="none" stroke="#ffffff14" strokeWidth="10" />
          <motion.circle cx="42" cy="42" r="34" fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" style={{ pathLength: ring }} />
        </svg>
        <motion.span className="absolute inset-0 grid place-items-center font-mono text-sm font-bold text-white">{label}</motion.span>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-fog group-hover:text-mist">monthly scan goal · replay ↻</span>
    </button>
  )
}

const SPARK = [4, 7, 5, 9, 8, 12]

/**
 * Delta spark chip — stat, mini-spark, and a delta box that pulses once on
 * mount (the page-load accent that says "this one's alive").
 */
export function DeltaSparkChip() {
  const w = 52
  const h = 16
  const path = SPARK.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (SPARK.length - 1)) * w} ${h - (v / 12) * (h - 2)}`).join(' ')
  return (
    <div className="p-6">
      <div className="inline-flex items-center gap-3 rounded-xl border border-white/12 bg-panel px-3.5 py-2.5">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-fog">audits</p>
          <p className="text-lg font-bold text-white">1,208</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="h-4 w-[52px]">
          <motion.path d={path} fill="none" stroke="#ffffff90" strokeWidth="1.5" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} />
        </svg>
        <motion.span initial={{ scale: 0.6, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, type: 'spring', stiffness: 400, damping: 18 }} className="rounded-md bg-white px-1.5 py-0.5 font-mono text-[9px] font-bold text-black">
          +14%
        </motion.span>
      </div>
    </div>
  )
}

/**
 * Cap warning — usage bar with 20 tick miles; entering the top 10% flips
 * the end-segment treatment to striped caution.
 */
export function CapWarningBar() {
  const [v, setV] = useState(72)
  const danger = v >= 90
  return (
    <div className="w-56 p-6">
      <p className="mb-1.5 flex justify-between font-mono text-[9px] uppercase tracking-widest text-fog">
        <span>storage</span>
        <span className={danger ? 'text-white' : ''}>{v}%</span>
      </p>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{ width: `${v}%` }}
          transition={{ type: 'spring', stiffness: 160, damping: 24 }}
          className={`h-full rounded-full ${danger ? 'bg-white' : 'bg-white/70'}`}
          style={danger ? { backgroundImage: 'repeating-linear-gradient(45deg, #fff 0 5px, #9a9aa3 5px 8px)' } : undefined}
        />
      </div>
      <div className="mt-1 flex justify-between">
        {[0, 25, 50, 75, 100].map((m) => (
          <span key={m} className="font-mono text-[8px] text-fog/60">{m}</span>
        ))}
      </div>
      <button onClick={() => setV((x) => (x >= 95 ? 62 : x + 9))} className="mt-2 rounded-full border border-white/20 px-3 py-0.5 text-[9px] text-fog hover:text-white">
        add files
      </button>
    </div>
  )
}

/**
 * Streak week — seven day dots; "log today" fills the next empty dot with
 * a spring pop and the counter follows.
 */
export function StreakWeekDots() {
  const [n, setN] = useState(3)
  const days = ['m', 't', 'w', 't', 'f', 's', 's']
  return (
    <div className="grid justify-items-center gap-2 p-6">
      <div className="flex gap-2">
        {days.map((d, i) => (
          <div key={i} className="grid justify-items-center gap-1">
            <motion.span
              key={`${i}-${i < n}`}
              initial={i === n - 1 ? { scale: 0 } : false}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              className={`h-3.5 w-3.5 rounded-full ${i < n ? 'bg-white' : 'bg-white/15'}`}
            />
            <span className="font-mono text-[8px] text-fog/60">{d}</span>
          </div>
        ))}
      </div>
      <p className="font-mono text-[10px] text-white">{n}-day streak</p>
      <button onClick={() => setN((x) => (x >= 7 ? 1 : x + 1))} className="rounded-full border border-white/20 px-3 py-1 text-[10px] text-fog hover:text-white">
        log today
      </button>
    </div>
  )
}
