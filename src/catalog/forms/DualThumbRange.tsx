import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Dual-Thumb Range.
 *
 * Pointer-scrub with thumb arbitration: on pointerdown we pick whichever
 * thumb is CLOSER to the click and move only that one — the natural feel
 * of real range sliders. The min thumb clamps at hi−5, max at lo+5, so
 * they can never cross. Fill span and both thumbs spring to their values.
 */
export function DualThumbRange() {
  const [lo, setLo] = useState(24)
  const [hi, setHi] = useState(72)
  const [active, setActive] = useState<'lo' | 'hi' | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const pctAt = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect()
    if (!r) return 0
    return Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100))
  }

  const onDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    const p = pctAt(e.clientX)
    const which: 'lo' | 'hi' = Math.abs(p - lo) <= Math.abs(p - hi) ? 'lo' : 'hi'
    setActive(which)
    move(which, p)
  }
  const move = (which: 'lo' | 'hi', p: number) => {
    if (which === 'lo') setLo(Math.min(p, hi - 5))
    else setHi(Math.max(p, lo + 5))
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={(e) => active && move(active, pctAt(e.clientX))}
        onPointerUp={() => setActive(null)}
        onPointerCancel={() => setActive(null)}
        className="relative h-2 w-56 cursor-pointer touch-none rounded-full bg-white/10"
      >
        <motion.div
          className="absolute inset-y-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
          animate={{ left: `${lo}%`, width: `${hi - lo}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <motion.div
          animate={{ left: `${lo}%`, scale: active === 'lo' ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-cyan-300 bg-white shadow-md"
        />
        <motion.div
          animate={{ left: `${hi}%`, scale: active === 'hi' ? 1.3 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-violet-300 bg-white shadow-md"
        />
      </div>
      <div className="flex gap-3 font-mono text-[11px]">
        <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-cyan-300">${Math.round(lo * 10)}</span>
        <span className="text-fog">—</span>
        <span className="rounded-md bg-violet-400/10 px-2 py-1 text-violet-300">${Math.round(hi * 10)}</span>
      </div>
    </div>
  )
}
