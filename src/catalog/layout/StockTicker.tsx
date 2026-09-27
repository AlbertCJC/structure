import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Quote {
  sym: string
  price: number
  delta: number
}

/**
 * Stock Ticker Strip — every 1.4s one random symbol ticks: its price
 * nudges ±, the delta flips sign when it crosses zero, and the cell
 * flashes green/red via an animate keyframe. Arrows morph with the sign.
 */
export function StockTicker() {
  const [quotes, setQuotes] = useState<Quote[]>([
    { sym: 'STRC', price: 142.6, delta: 2.4 },
    { sym: 'MOTN', price: 88.1, delta: -1.1 },
    { sym: 'GSAP', price: 310.4, delta: 0.8 },
  ])
  const [flash, setFlash] = useState<number | null>(null)

  useEffect(() => {
    const iv = window.setInterval(() => {
      const i = Math.floor(Math.random() * 3)
      setQuotes((prev) =>
        prev.map((q, idx) => {
          if (idx !== i) return q
          const nudge = (Math.random() - 0.5) * 3
          return { ...q, price: Math.max(1, q.price + nudge), delta: Math.round((q.delta + nudge / 2) * 10) / 10 }
        }),
      )
      setFlash(i)
      window.setTimeout(() => setFlash(null), 700)
    }, 1400)
    return () => window.clearInterval(iv)
  }, [])

  return (
    <div className="flex w-full max-w-[260px] flex-col gap-2 p-4">
      {quotes.map((q, i) => {
        const up = q.delta >= 0
        return (
          <motion.div
            key={q.sym}
            animate={flash === i ? { backgroundColor: up ? 'rgba(163,230,53,0.12)' : 'rgba(244,63,94,0.12)' } : { backgroundColor: 'rgba(255,255,255,0.03)' }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between rounded-lg border border-white/[0.07] px-3.5 py-2.5"
          >
            <span className="font-mono text-xs font-bold text-white">{q.sym}</span>
            <span className="font-mono text-xs text-mist">${q.price.toFixed(1)}</span>
            <span className={`flex items-center gap-1 font-mono text-[11px] ${up ? 'text-lime-300' : 'text-rose-400'}`}>
              <motion.span key={`${up}`} initial={{ rotate: up ? 180 : 0, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="inline-block">
                ▲
              </motion.span>
              {Math.abs(q.delta).toFixed(1)}%
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}
