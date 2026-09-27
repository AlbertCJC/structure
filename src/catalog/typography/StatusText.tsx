import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const TARGET = 'STABLE'
const FAKE = ['S', 'T', 'A', 'B', 'L', 'E']

/**
 * Shuffle resolve — click scrambles the letter ORDER into fixed wrong
 * slots; letters then waft back home one by one on a spring stagger.
 */
export function ShuffleResolveWord() {
  const [key, setKey] = useState(0)
  const shoved = [3, 0, 5, 1, 4, 2] // deterministic "wrong" order
  return (
    <div className="grid justify-items-center gap-2 p-6">
      <div className="flex gap-1 font-mono text-xl font-bold text-white">
        {FAKE.map((_, slot) => {
          const charIdx = shoved[slot]
          return (
            <motion.span
              key={`${key}-${slot}`}
              initial={{ y: slot % 2 ? -14 : 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20, delay: slot * 0.05 }}
              className={slot === charIdx ? 'text-white' : 'text-fog'}
            >
              {TARGET[charIdx]}
            </motion.span>
          )
        })}
      </div>
      <button onClick={() => setKey((k) => k + 1)} className="rounded-full border border-white/20 px-3 py-0.5 text-[10px] text-fog hover:text-white">
        scramble again
      </button>
    </div>
  )
}

/**
 * Blur swap — two labels cross-fade WITH blur drift: the outgoing blurs
 * out, the incoming sharpens in. Text hand-off with depth.
 */
export function BlurSwapLabel() {
  const [final, setFinal] = useState(false)
  return (
    <button onClick={() => setFinal((f) => !f)} className="relative m-6 grid h-10 w-32 place-items-center overflow-hidden rounded-lg border border-white/15">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={final ? 'f' : 'd'}
          initial={{ filter: 'blur(6px)', opacity: 0 }}
          animate={{ filter: 'blur(0px)', opacity: 1 }}
          exit={{ filter: 'blur(6px)', opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-sm tracking-widest text-white"
        >
          {final ? '■ FINAL' : '◇ draft'}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

/**
 * Marching dash — the underline is a repeating dash gradient whose
 * background-position loops, so the dashes perpetually run forward.
 */
export function MarchingDashUnderline() {
  return (
    <div className="p-6">
      <span
        className="cursor-default pb-1 text-lg font-semibold text-white"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #fff 0 6px, transparent 6px 12px)',
          backgroundPosition: '0 100%',
          backgroundRepeat: 'repeat-x',
          backgroundSize: '100% 2px',
          animation: 'dashMarch 0.9s linear infinite',
        }}
      >
        in motion
      </span>
      <style>{`@keyframes dashMarch { to { background-position: 24px 100%; } }`}</style>
    </div>
  )
}

/**
 * Chevron march — three link chevrons pulse through a staggered opacity
 * loop, implying direction without moving anything.
 */
export function ChevronMarchLink() {
  return (
    <div className="p-6">
      <a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-0.5 text-sm font-medium text-white">
        documentation
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            className="text-white group-hover:translate-x-0.5 transition-transform"
          >
            ›
          </motion.span>
        ))}
      </a>
    </div>
  )
}
