import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

/**
 * Spring stat — one motion value sprints 0 → 842 on click; the number is a
 * live transform of the same value (rounded in the projection).
 */
export function SpringStatNumber() {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => Math.round(v).toLocaleString())
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (!run) return
    const c = animate(mv, 842, { type: 'spring', stiffness: 70, damping: 16 })
    return () => c.stop()
  }, [run, mv])
  return (
    <div className="grid justify-items-center gap-2 p-6">
      <motion.span className="font-mono text-4xl font-black text-white">{text}</motion.span>
      <p className="text-[10px] uppercase tracking-widest text-fog">components rendered</p>
      <button
        onClick={() => {
          mv.set(0)
          setRun((r) => r + 1)
        }}
        className="mt-1 rounded-full border border-white/20 px-3.5 py-1 text-[10px] text-mist hover:text-white"
      >
        count again
      </button>
    </div>
  )
}

/**
 * Delta tick — the number sits steady; "+N" deltas pop and float off on
 * every increment like XP pickups.
 */
export function DeltaTickCounter() {
  const [n, setN] = useState(120)
  const [delta, setDelta] = useState(0)
  return (
    <div className="grid justify-items-center gap-2 p-6">
      <button
        onClick={() => {
          setN((x) => x + 12)
          setDelta((d) => d + 1)
        }}
        className="group relative rounded-xl border border-white/15 px-5 py-3 text-center transition hover:bg-white/5"
      >
        <motion.span key={n} initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="block font-mono text-2xl font-bold text-white">
          {n}
        </motion.span>
        <span className="text-[9px] uppercase tracking-widest text-fog">points · click to score</span>
        {delta > 0 && (
          <motion.span
            key={delta}
            initial={{ y: 4, opacity: 1 }}
            animate={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute -right-2 top-0 font-mono text-[10px] font-bold text-white"
          >
            +12
          </motion.span>
        )}
      </button>
    </div>
  )
}

const UNITS = ['3 days', '72 hours', '4,320 minutes']

/**
 * Unit cycler — the SAME timespan reframed per click; label cross-swaps
 * while the meaning stays constant. Useful for age/duration displays.
 */
export function UnitCycleCounter() {
  const [i, setI] = useState(0)
  return (
    <button onClick={() => setI((x) => (x + 1) % UNITS.length)} className="m-6 grid w-44 justify-items-center gap-1 rounded-xl border border-white/12 bg-panel px-4 py-3 transition hover:border-white/30">
      <span className="text-[9px] uppercase tracking-widest text-fog">last deploy</span>
      <motion.span key={i} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 24 }} className="font-mono text-lg font-bold text-white">
        {UNITS[i]} ago
      </motion.span>
      <span className="text-[9px] text-fog">tap to reframe</span>
    </button>
  )
}

/**
 * Percent fill — the word fill sweeps like a progress bar: a solid layer
 * clip-paths itself across a hollow outline base on hover.
 */
export function PercentFillWord() {
  return (
    <div className="group cursor-default p-6">
      <div className="relative inline-block">
        <span className="block text-3xl font-black uppercase tracking-tight text-transparent" style={{ WebkitTextStroke: '1.2px #666' }}>
          LOADING
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block text-3xl font-black uppercase tracking-tight text-white transition-[clip-path] duration-700 ease-in-out [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0_0_0)]"
        >
          LOADING
        </span>
      </div>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">hover — the word is the bar</p>
    </div>
  )
}
