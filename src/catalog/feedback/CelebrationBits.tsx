import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

const SPREAD = [
  { x: -42, y: -34, r: -120 },
  { x: -20, y: -52, r: 60 },
  { x: 4, y: -58, r: 200 },
  { x: 30, y: -46, r: -80 },
  { x: 48, y: -26, r: 140 },
  { x: -50, y: -12, r: -60 },
  { x: 52, y: 2, r: 95 },
  { x: -30, y: 8, r: 300 },
]

/**
 * Mono confetti — eight paper-white squares explode from the button and
 * rain out on gravity. Celebration legible in pure black & white.
 */
export function MonoConfettiBurst() {
  const [burst, setBurst] = useState(0)
  return (
    <div className="grid h-36 place-items-center p-4">
      <div className="relative">
        {burst > 0 && (
          <div key={burst} className="pointer-events-none absolute inset-0">
            {SPREAD.map((s, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ x: s.x, y: [s.y, s.y + 46], rotate: s.r, opacity: [1, 1, 0] }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`absolute left-1/2 top-1/2 h-2 w-1 rounded-[1px] ${i % 2 ? 'bg-white' : 'bg-white/60'}`}
              />
            ))}
          </div>
        )}
        <button onClick={() => setBurst((b) => b + 1)} className="relative rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition active:scale-95">
          Publish ✦
        </button>
      </div>
    </div>
  )
}

/**
 * Ring count-up — a motion value animates 0 → 100: the ring's pathLength
 * and the centered number are two views of the same progress.
 */
export function RingCountupProgress() {
  const mv = useMotionValue(0)
  const pct = useTransform(mv, (v) => `${Math.round(v)}%`)
  const ring = useTransform(mv, (v) => v / 100)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!run) return
    const controls = animate(mv, 100, { duration: 2.2, ease: [0.65, 0, 0.2, 1] })
    return () => controls.stop()
  }, [run, mv])

  return (
    <div className="grid place-items-center gap-3 p-6">
      <div className="relative">
        <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#ffffff1c" strokeWidth="7" />
          <motion.circle cx="40" cy="40" r="34" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" style={{ pathLength: ring }} />
        </svg>
        <motion.span className="absolute inset-0 grid place-items-center font-mono text-sm font-bold text-white">{pct}</motion.span>
      </div>
      <button
        onClick={() => {
          mv.set(0)
          setRun((r) => r + 1)
        }}
        className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5"
      >
        Run scan
      </button>
    </div>
  )
}

/**
 * Sparkle title — ✦ stars twinkle in a staggered loop around a headline on
 * entry; the card reads "new and shipped".
 */
export function SparkleTitleEntry() {
  return (
    <div className="grid h-32 place-items-center p-4">
      <div className="relative">
        <h4 className="text-xl font-bold tracking-tight text-white">Version 3.0</h4>
        {[
          { x: -26, y: -6, d: 0 },
          { x: 102, y: -14, d: 0.35 },
          { x: 116, y: 18, d: 0.7 },
          { x: -34, y: 20, d: 0.5 },
        ].map((s, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0.6, 1], opacity: [0, 1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: s.d, repeatDelay: 0.4 }}
            className="absolute text-sm text-white"
            style={{ left: s.x, top: s.y }}
          >
            ✦
          </motion.span>
        ))}
      </div>
    </div>
  )
}

/**
 * NEW pulse — a soft expanding ring loops behind the badge until the user
 * dismisses it; attention without sound.
 */
export function NewPulseBadge() {
  const [seen, setSeen] = useState(false)
  return (
    <div className="grid h-32 place-items-center p-4">
      {seen ? (
        <button onClick={() => setSeen(false)} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-fog hover:text-white">
          show badge again
        </button>
      ) : (
        <button onClick={() => setSeen(true)} className="relative rounded-lg border border-white/12 bg-panel px-4 py-2 text-sm text-white">
          Changelog
          <span className="absolute -right-2 -top-2">
            <motion.span
              initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: [1, 1.9], opacity: [0.7, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-white"
            />
            <span className="relative grid h-5 w-5 place-items-center rounded-full bg-white text-[8px] font-bold text-black">3</span>
          </span>
        </button>
      )}
    </div>
  )
}
