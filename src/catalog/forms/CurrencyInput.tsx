import { useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

/**
 * Currency Input — digits-only entry with live thousands separators, and
 * a DISPLAY value that spring-chases the parsed number (stiffness 80 for
 * a heavy odometer feel), formatted back into currency on every frame via
 * useTransform on the MotionValue — no re-renders during the chase.
 */
export function CurrencyInput() {
  const [raw, setRaw] = useState('12500')
  const target = Number(raw.replace(/\D/g, '')) || 0

  const spring = useSpring(target, { stiffness: 80, damping: 20 })
  const display = useTransform(spring, (v) => `$${Math.round(v).toLocaleString('en-US')}`)
  spring.set(target)

  return (
    <div className="flex w-full max-w-[230px] flex-col gap-4 p-4">
      <div className="flex items-center gap-1 rounded-xl border border-line bg-panel px-4 py-3 focus-within:border-lime-400/50">
        <span className="font-mono text-sm text-lime-300">$</span>
        <input
          value={Number(raw).toLocaleString('en-US')}
          onChange={(e) => setRaw(e.target.value.replace(/[^\d]/g, '').slice(0, 9))}
          inputMode="numeric"
          className="w-full bg-transparent font-mono text-sm text-white focus:outline-none"
        />
        <span className="font-mono text-[10px] text-fog">.00</span>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-lime-400/20 bg-lime-400/[0.06] px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-200/70">balance</span>
        <motion.span className="font-mono text-lg font-bold text-lime-300">{display}</motion.span>
      </div>
    </div>
  )
}
