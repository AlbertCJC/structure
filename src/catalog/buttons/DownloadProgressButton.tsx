import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

type Phase = 'idle' | 'working' | 'done'

/**
 * Download Progress Button.
 *
 * The shell IS the progress bar: a gradient fill layer scales on X from 0
 * while an interval marches the percentage. At 100% the button swaps to a
 * success chip (width springs narrower, label swaps to ✓). Reset after 2s.
 * The interval is cleaned on unmount — the card can leave the grid any time.
 */
export function DownloadProgressButton() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [pct, setPct] = useState(0)
  const iv = useRef(0)

  useEffect(() => () => window.clearInterval(iv.current), [])

  const start = () => {
    if (phase !== 'idle') return
    setPhase('working')
    setPct(0)
    iv.current = window.setInterval(() => {
      setPct((v) => {
        const next = Math.min(100, v + 2 + Math.random() * 3)
        if (next >= 100) {
          window.clearInterval(iv.current)
          setPhase('done')
          window.setTimeout(() => {
            setPhase('idle')
            setPct(0)
          }, 2000)
        }
        return next
      })
    }, 60)
  }

  return (
    <div className="p-8">
      <motion.button
        layout
        onClick={start}
        className="relative h-12 overflow-hidden rounded-xl border border-white/15 bg-surface text-sm font-semibold text-white"
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-left bg-gradient-to-r from-sky-500/60 to-cyan-400/60"
          animate={{ scaleX: pct / 100 }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
        <span className="relative z-10 flex min-w-40 items-center justify-center gap-2 px-6">
          {phase === 'idle' && <>↓ Download asset</>}
          {phase === 'working' && (
            <span className="font-mono text-xs">
              {Math.round(pct)}% · receiving…
            </span>
          )}
          {phase === 'done' && <motion.span initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 18 }}>✓ Saved locally</motion.span>}
        </span>
      </motion.button>
    </div>
  )
}
