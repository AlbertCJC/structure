import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Tick step slider — clicking anywhere on the track snaps the knob to the
 * nearest of five ticks; knob and fill travel on one spring.
 */
export function TickStepSlider() {
  const [v, setV] = useState(50)
  const steps = [0, 25, 50, 75, 100]
  return (
    <div className="p-6">
      <div className="relative h-8 w-52">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/15" />
        <motion.div className="absolute top-1/2 h-1 origin-left -translate-y-1/2 rounded-full bg-white" animate={{ width: `${v}%` }} transition={{ type: 'spring', stiffness: 350, damping: 28 }} />
        <button
          aria-label="Set value"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            const pct = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100))
            setV(steps.reduce((a, b) => (Math.abs(b - pct) < Math.abs(a - pct) ? b : a)))
          }}
          className="absolute inset-0 w-full cursor-pointer"
        />
        {steps.map((s) => (
          <span key={s} className="absolute top-1/2 h-2.5 w-px -translate-y-1/2 bg-white/40" style={{ left: `${s}%` }} />
        ))}
        <motion.span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow" animate={{ left: `${v}%` }} transition={{ type: 'spring', stiffness: 350, damping: 24 }} />
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-fog">{v}%</p>
    </div>
  )
}

/**
 * Vertical slider — drag or tap the rail; pointer capture against the rail
 * rect maps clientY to 0-100 from the bottom.
 */
export function VerticalSlider() {
  const [v, setV] = useState(40)
  const rail = useRef<HTMLDivElement>(null)

  const setFrom = (clientY: number) => {
    const el = rail.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((r.bottom - clientY) / r.height) * 100))
    setV(Math.round(pct))
  }

  return (
    <div className="flex items-center gap-4 p-6">
      <div
        ref={rail}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setFrom(e.clientY)
        }}
        onPointerMove={(e) => e.buttons === 1 && setFrom(e.clientY)}
        className="relative h-36 w-8 cursor-pointer touch-none"
      >
        <div className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-white/15" />
        <motion.div className="absolute bottom-0 left-1/2 w-1 -translate-x-1/2 rounded-full bg-white" animate={{ height: `${v}%` }} transition={{ type: 'spring', stiffness: 350, damping: 28 }} />
        <motion.span
          className="absolute left-1/2 h-4 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow"
          animate={{ bottom: `${v}%` }}
          transition={{ type: 'spring', stiffness: 350, damping: 24 }}
        />
      </div>
      <span className="font-mono text-sm text-white">{v}</span>
    </div>
  )
}

/**
 * Temperature slider — the fill's gray level IS the value: cold is near
 * black, hot is near white (MONO-friendly by construction).
 */
export function TemperatureSlider() {
  const [v, setV] = useState(35)
  const g = Math.round(40 + (v / 100) * 215)
  const fill = `rgb(${g},${g},${g})`
  return (
    <div className="p-6">
      <div className="relative h-8 w-52">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-white/15" />
        <motion.div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full" animate={{ width: `${v}%`, backgroundColor: fill }} transition={{ type: 'spring', stiffness: 300, damping: 28 }} />
        <input
          type="range"
          min={0}
          max={100}
          value={v}
          onChange={(e) => setV(Number(e.target.value))}
          aria-label="Temperature"
          className="absolute inset-0 w-full cursor-pointer opacity-0"
        />
        <motion.span className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow" animate={{ left: `${v}%`, backgroundColor: fill }} style={{ border: '2px solid #fff' }} transition={{ type: 'spring', stiffness: 300, damping: 24 }} />
      </div>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-fog">{v < 33 ? 'cold' : v < 66 ? 'warm' : 'hot'} · {v}°</p>
    </div>
  )
}

const MOODS = ['😞', '😐', '😄']

/**
 * Mood slider — three faces hold three ranges; crossing a threshold pops
 * the new face in while the knob slide stays springy.
 */
export function MoodSlider() {
  const [v, setV] = useState(60)
  const mood = v < 34 ? 0 : v < 67 ? 1 : 2
  return (
    <div className="p-6">
      <div className="flex w-56 items-center gap-3">
        <motion.span
          key={mood}
          initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 450, damping: 20 }}
          className="w-8 text-center text-2xl"
        >
          {MOODS[mood]}
        </motion.span>
        <input type="range" min={0} max={100} value={v} onChange={(e) => setV(Number(e.target.value))} aria-label="Mood" className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 accent-white" />
      </div>
    </div>
  )
}
