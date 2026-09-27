import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Rolling Digit Counter — each digit is a vertical strip of 0–9 inside an
 * overflow-hidden window; the strip springs its translateY to the current
 * digit (−digit × rowHeight). A timer feeds a rising count, and because
 * each column springs independently, digits visibly "roll" at different
 * speeds — odometer mechanics with zero plugins.
 */
export function FlipCounter() {
  const [count, setCount] = useState(4213)

  useEffect(() => {
    const iv = window.setInterval(() => setCount((c) => (c + 7) % 10000), 700)
    return () => window.clearInterval(iv)
  }, [])

  const digits = String(count).padStart(4, '0').split('')
  const ROW = 34

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex gap-1.5">
        {digits.map((d, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-white/12 bg-panel" style={{ height: ROW, width: 26 }}>
            <motion.div
              animate={{ y: -Number(d) * ROW }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              className="flex flex-col"
            >
              {Array.from({ length: 10 }).map((_, n) => (
                <span key={n} className="grid shrink-0 place-items-center font-mono text-base font-bold text-white" style={{ height: ROW }}>
                  {n}
                </span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog">events processed</span>
    </div>
  )
}
