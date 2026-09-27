import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Sweep gauge — needle sweeps from rest to 64% on click against a ticked
 * arc; the little bounce over the final value sells momentum.
 */
export function SweepTickGauge() {
  const [run, setRun] = useState(0)
  const angle = -120 + 64 * 2.4 // 0..100 maps to -120..120
  return (
    <div className="grid justify-items-center gap-2 p-6">
      <div className="relative">
        <svg viewBox="0 0 120 74" className="h-20 w-32">
          {Array.from({ length: 9 }).map((_, i) => {
            const a = ((-120 + i * 30) * Math.PI) / 180
            const x1 = 60 + Math.sin(a) * 46
            const y1 = 64 - Math.cos(a) * 46
            const x2 = 60 + Math.sin(a) * 40
            const y2 = 64 - Math.cos(a) * 40
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff40" strokeWidth="1.4" />
          })}
          <motion.line
            key={run}
            x1="60"
            y1="64"
            x2="60"
            y2="26"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={{ rotate: -120 }}
            animate={{ rotate: angle }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
            style={{ originX: '60px', originY: '64px' }}
          />
          <circle cx="60" cy="64" r="4" fill="#fff" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white">64</span>
      </div>
      <button onClick={() => setRun((r) => r + 1)} className="rounded-full border border-white/20 px-3 py-0.5 text-[9px] text-fog hover:text-white">
        measure again
      </button>
    </div>
  )
}

/**
 * Block meter — ten pips fill bottom-up; each pip's spring delay grows with
 * its altitude so the meter visibly STACKS.
 */
export function CapacityBlockMeter() {
  const [n, setN] = useState(6)
  return (
    <div className="flex items-end gap-3 p-6">
      <div className="flex flex-col-reverse gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{ backgroundColor: i < n ? '#ffffff' : '#ffffff14', scale: i === n - 1 ? [1, 1.18, 1] : 1 }}
            transition={{ delay: i * 0.03, type: 'spring', stiffness: 400, damping: 22 }}
            className="h-3.5 w-10 rounded-[3px]"
          />
        ))}
      </div>
      <div className="grid gap-1">
        <span className="font-mono text-sm font-bold text-white">{n * 10}%</span>
        <button onClick={() => setN((x) => (x >= 10 ? 3 : x + 1))} className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] text-fog hover:text-white">
          +
        </button>
      </div>
    </div>
  )
}

/**
 * Thermo column — a vertical meter with ruler marks; value droplets sit at
 * 25/50/75% as ghost notches the fill passes through.
 */
export function ThermoRulerMeter() {
  const [v, setV] = useState(55)
  return (
    <div className="flex items-center gap-4 p-6">
      <div className="relative h-32 w-4 overflow-hidden rounded-full border border-white/20">
        <motion.div className="absolute inset-x-0 bottom-0 bg-white" animate={{ height: `${v}%` }} transition={{ type: 'spring', stiffness: 130, damping: 22 }} />
        {[25, 50, 75].map((m) => (
          <span key={m} className="absolute inset-x-0 h-px bg-black/60 mix-blend-difference" style={{ bottom: `${m}%` }} />
        ))}
      </div>
      <div className="space-y-1.5 font-mono text-[9px]">
        {[100, 75, 50, 25, 0].map((m) => (
          <div key={m} className={v >= m ? 'text-white' : 'text-fog/50'}>
            {m}
          </div>
        ))}
      </div>
      <button onClick={() => setV((x) => (x >= 90 ? 30 : x + 15))} className="rounded-full border border-white/20 px-2.5 py-1 text-[9px] text-fog hover:text-white">
        heat
      </button>
    </div>
  )
}

/**
 * Jitter meter — the readout hovers around 4200 with ±90 jitter on a slow
 * loop: feels instrumented, not random.
 */
export function JitterRpmMeter() {
  const [v, setV] = useState(4200)
  useEffect(() => {
    const t = window.setInterval(() => setV(4200 + Math.round((Math.random() - 0.5) * 180)), 900)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div className="grid justify-items-center gap-1.5 p-6">
      <div className="flex items-baseline gap-1">
        <motion.span key={v} initial={{ y: 5, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 360, damping: 26 }} className="font-mono text-3xl font-bold tabular-nums text-white">
          {v.toLocaleString()}
        </motion.span>
        <span className="font-mono text-[10px] uppercase text-fog">rpm</span>
      </div>
      <div className="flex h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
        <motion.div animate={{ width: `${(v / 6000) * 100}%` }} transition={{ type: 'spring', stiffness: 200, damping: 26 }} className="bg-white" />
      </div>
      <span className="font-mono text-[9px] text-fog/60">jitter ±90 — the machine is warm</span>
    </div>
  )
}
