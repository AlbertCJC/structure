import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Phase = 'idle' | 'loading' | 'done'

/**
 * Dot Loading Button — a three-phase state machine:
 * idle → loading (three staggered bouncing dots) → done (spring check)
 * → idle after 1.4s. All swaps run through one popLayout AnimatePresence
 * so the content crossfades inside a fixed-size slot (no width jumps).
 */
export function DotLoadingButton() {
  const [phase, setPhase] = useState<Phase>('idle')
  const timers = useRef<number[]>([])

  const submit = () => {
    if (phase !== 'idle') return
    setPhase('loading')
    timers.current.push(
      window.setTimeout(() => setPhase('done'), 1700),
      window.setTimeout(() => setPhase('idle'), 3100),
    )
  }

  return (
    <div className="p-8">
      <button
        onClick={submit}
        className="flex h-12 w-44 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {phase === 'idle' && (
            <motion.span key="idle" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              Submit order
            </motion.span>
          )}
          {phase === 'loading' && (
            <motion.span key="dots" className="flex gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-white"
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                />
              ))}
            </motion.span>
          )}
          {phase === 'done' && (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              ✓ Order placed
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
