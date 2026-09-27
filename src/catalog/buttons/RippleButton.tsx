import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Ripple {
  id: number
  x: number
  y: number
}

/**
 * Ink Ripple Button.
 *
 * pointerdown captures the coordinate RELATIVE to the button, spawns a
 * Ripple entry, and the span scales 0→3 while fading — a spring with low
 * stiffness (120) makes the bloom feel liquid, not mechanical. Entries
 * self-remove onAnimationComplete so repeated clicks never accumulate DOM.
 */
export function RippleButton() {
  const [ripples, setRipples] = useState<Ripple[]>([])
  const nextId = useRef(0)

  const onDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setRipples((prev) => [...prev, { id: nextId.current++, x: e.clientX - r.left, y: e.clientY - r.top }])
  }
  const remove = (id: number) => setRipples((prev) => prev.filter((p) => p.id !== id))

  return (
    <div className="p-8">
      <button
        onPointerDown={onDown}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-9 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25"
      >
        <span className="relative z-10">Click me anywhere</span>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.4 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            onAnimationComplete={() => remove(r.id)}
            className="pointer-events-none absolute h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{ left: r.x, top: r.y }}
          />
        ))}
      </button>
    </div>
  )
}
