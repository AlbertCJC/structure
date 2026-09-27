import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Phase = 'idle' | 'done'

/**
 * Cart → Check Morph.
 *
 * The two icons share a popLayout AnimatePresence: the outgoing one scales
 * to 0.4 while rotating away, the incoming blooms from 0.4 — reads as a
 * morph without any path interpolation. A timeout holds the success state
 * for 1.6s (tracked in a ref so a re-render can't leak it).
 */
export function IconMorphButton() {
  const [phase, setPhase] = useState<Phase>('idle')
  const timer = useRef<number>(0)

  const add = () => {
    if (phase === 'done') return
    setPhase('done')
    timer.current = window.setTimeout(() => setPhase('idle'), 1600)
  }

  return (
    <div className="p-8">
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={add}
        className={`relative flex items-center gap-3 rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors duration-300 ${
          phase === 'done' ? 'bg-lime-500/90 text-[#0a0a12]' : 'bg-white text-[#0a0a12] hover:bg-white/90'
        }`}
      >
        <span className="grid h-5 w-5 place-items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {phase === 'idle' ? (
              <motion.svg key="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: 40, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="h-5 w-5"
              >
                <circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" />
                <path d="M2 3h3l2.6 12.4a1 1 0 0 0 1 .8h9.7a1 1 0 0 0 1-.8L21 8H6" />
              </motion.svg>
            ) : (
              <motion.svg key="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                initial={{ scale: 0.4, rotate: 40, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: -40, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="h-5 w-5"
              >
                <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
        {phase === 'done' ? 'Added to cart' : 'Add to cart'}
      </motion.button>
    </div>
  )
}
