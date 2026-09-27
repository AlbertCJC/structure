import { useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

/**
 * Odometer Stat Counter — the target number lives in state; a soft spring
 * (stiffness 60) chases it into a MotionValue, and useTransform rounds it
 * into locale text every frame — zero React re-renders while counting.
 * Buttons bump the stat by ±1,000 so you can feel the spring weight.
 */
export function StatCounter() {
  const [target, setTarget] = useState(48212)
  const spring = useSpring(target, { stiffness: 60, damping: 18 })
  const text = useTransform(spring, (v) => Math.round(v).toLocaleString('en-US'))
  spring.set(target)

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="rounded-2xl border border-line bg-panel px-8 py-5 text-center">
        <motion.p className="font-mono text-3xl font-bold tracking-tight text-white">{text}</motion.p>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-fog">monthly actives</p>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setTarget((t) => Math.max(0, t - 1000))} className="rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-mist transition hover:text-white">
          −1k
        </button>
        <button onClick={() => setTarget((t) => t + 1000)} className="rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-mist transition hover:text-white">
          +1k
        </button>
      </div>
    </div>
  )
}
