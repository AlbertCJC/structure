import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Value Bubble Slider.
 *
 * Scrub model: pointerdown on the track captures the pointer and every
 * pointermove maps clientX → 0..100 against the track rect. This is more
 * robust than per-thumb drag (no state/tween fighting, works on track
 * clicks too). The thumb position springs to the value; the bubble pops
 * out on grab with overshoot and hides on release.
 */
export function SliderBubble() {
  const [value, setValue] = useState(42)
  const [grabbing, setGrabbing] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const scrub = (clientX: number) => {
    const r = trackRef.current?.getBoundingClientRect()
    if (!r) return
    setValue(Math.round(Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * 100))
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6 pt-10">
      <div className="relative w-56">
        {/* value bubble */}
        <motion.div
          className="pointer-events-none absolute -top-9 z-10"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ left: `${value}%`, scale: grabbing ? 1 : 0.5, opacity: grabbing ? 1 : 0 }}
          transition={{ left: { type: 'spring', stiffness: 300, damping: 28 }, scale: { type: 'spring', stiffness: 420, damping: 18 } }}
        >
          <span className="relative block -translate-x-1/2 rounded-lg bg-violet-500 px-2 py-1 font-mono text-[11px] font-bold text-white shadow-lg">
            {value}
            <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-violet-500" />
          </span>
        </motion.div>

        <div
          ref={trackRef}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId)
            setGrabbing(true)
            scrub(e.clientX)
          }}
          onPointerMove={(e) => grabbing && scrub(e.clientX)}
          onPointerUp={() => setGrabbing(false)}
          onPointerCancel={() => setGrabbing(false)}
          className="relative h-2 cursor-pointer touch-none rounded-full bg-white/10"
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400"
            animate={{ width: `${value}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          />
          <motion.div
            animate={{ left: `${value}%`, scale: grabbing ? 1.25 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-violet-300 bg-white shadow-md"
          />
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">scrub the track</span>
    </div>
  )
}
