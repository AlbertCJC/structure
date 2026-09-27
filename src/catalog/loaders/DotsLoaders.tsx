import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Bounce dots — three dots hop in sequence with 120ms offsets. Bigger and
 * friendlier than typing dots: the "content incoming" personality.
 */
export function BounceDotsLoader() {
  return (
    <div className="flex h-full items-center justify-center gap-2 p-6">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-3 w-3 rounded-full bg-white"
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/**
 * Dots ring — eight dots on a wheel; a scale ripple travels clockwise via
 * per-dot delays (0.15s of a 1.2s cycle each).
 */
export function DotsRingLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 45}deg)` }}>
            <motion.span
              className="mx-auto block h-1.5 w-1.5 rounded-full bg-white"
              initial={{ opacity: 0.3 }} animate={{ scale: [0.35, 1, 0.35], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Dots → check — a self-cycling state machine (loading 2.2s → done 0.9s):
 * three dots breathe, then a check draws itself with pathLength, then reset.
 */
export function DotsToCheckLoader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    let alive = true
    const cycle = () => {
      if (!alive) return
      setDone(false)
      window.setTimeout(() => {
        if (!alive) return
        setDone(true)
        window.setTimeout(cycle, 900)
      }, 2200)
    }
    cycle()
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="grid h-full place-items-center p-6">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.svg key="ok" viewBox="0 0 24 24" className="h-8 w-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.path
              d="M4 12.5 9.5 18 20 6.5"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </motion.svg>
        ) : (
          <motion.div key="dots" className="flex gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-white"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.16 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Chasing dots — two dots orbit the same circle at different directions and
 * periods (1.3s vs 2.6s): they pass each other every ~2.6s.
 */
export function ChasingDotsLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10">
        <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}>
          <span className="mx-auto block h-2 w-2 rounded-full bg-white" />
        </motion.div>
        <motion.div className="absolute inset-0" animate={{ rotate: -360 }} transition={{ duration: 2.6, repeat: Infinity, ease: 'linear' }}>
          <span className="mx-auto block h-1.5 w-1.5 rounded-full bg-white/60" />
        </motion.div>
      </div>
    </div>
  )
}
