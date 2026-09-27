import { useRef, useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'

const TRAVEL = 36 // inner width (64) minus thumb (28)

/**
 * Elastic Snap Toggle.
 *
 * Physics, in three acts:
 *  1. DRAG — the thumb is free on X (constraints 0..36, dragElastic 0.08
 *     so it barely resists at the walls) and STRETCHES via scaleX 1.35
 *     (origin left) while held — rubber-band feedback.
 *  2. COMMIT — on release we PROJECT the pointer forward one frame
 *     (offset + velocity/9) and decide the target from that projection,
 *     so a fast flick past center commits even if the thumb hasn't
 *     visually crossed it. This is the "velocity-aware" feel.
 *  3. SETTLE — the target is applied through a stiff spring (500/30,
 *     mass 0.5) from the thumb's CURRENT drag position — it glides, never
 *     teleports.
 *
 * The track itself is a button: a plain click (no drag) also toggles,
 * guarded by `skipClick` so a drag release doesn't double-fire.
 */
export function ElasticToggle() {
  const [on, setOn] = useState(true)
  const [dragging, setDragging] = useState(false)
  const offset = useRef(0)
  const skipClick = useRef(false)

  const decide = (info: PanInfo) => {
    const base = on ? TRAVEL : 0
    const projected = base + offset.current + info.velocity.x / 9
    setOn(projected > TRAVEL / 2)
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <button
        aria-pressed={on}
        onClick={() => {
          if (skipClick.current) {
            skipClick.current = false
            return
          }
          setOn((v) => !v)
        }}
        className="relative h-9 w-[72px] cursor-pointer rounded-full border border-white/10 p-1"
      >
        {/* track fill crossfades (gradients don't interpolate — two layers) */}
        <span className="absolute inset-1 rounded-full bg-[#23233a]" />
        <motion.span
          className="absolute inset-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        />

        <motion.span
          drag="x"
          dragConstraints={{ left: 0, right: TRAVEL }}
          dragElastic={0.08}
          onDragStart={() => setDragging(true)}
          onDrag={(_, info) => {
            offset.current = info.offset.x
          }}
          onDragEnd={(_, info) => {
            setDragging(false)
            if (Math.abs(offset.current) > 6) skipClick.current = true
            decide(info)
            offset.current = 0
          }}
          animate={{ x: on ? TRAVEL : 0, scaleX: dragging ? 1.35 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
          className="absolute left-1 top-1 z-10 block h-7 w-7 cursor-grab rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.45)] origin-left active:cursor-grabbing"
        />
      </button>
      <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${on ? 'text-fuchsia-300' : 'text-fog'}`}>
        {on ? 'elastic · on' : 'elastic · off'}
      </span>
    </div>
  )
}
