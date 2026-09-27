import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Cookie Consent Banner — slides up from the bottom edge after mount
 * (0.6s delay feels like a real site). Accept collapses it into a lime
 * check chip for a beat; decline dismisses instantly. Re-arm link replays.
 */
export function CookieBanner() {
  const [state, setState] = useState<'banner' | 'accepted' | 'gone'>('banner')

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <p className="font-mono text-[10px] text-fog">{state === 'gone' ? 'banner dismissed —' : 'page content…'}</p>
      {state === 'gone' && (
        <button onClick={() => setState('banner')} className="absolute bottom-3 font-mono text-[9px] text-violet-300 underline-offset-2 hover:underline">
          ↺ re-arm banner
        </button>
      )}

      <AnimatePresence>
        {state === 'banner' && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26, delay: 0.4 }}
            className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-xl border border-white/12 bg-panel/95 p-3 shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
          >
            <span className="text-lg">🍪</span>
            <p className="min-w-0 flex-1 text-[10px] leading-relaxed text-mist">We use cookies to remember your filters.</p>
            <button onClick={() => setState('gone')} className="text-[10px] text-fog transition hover:text-white">
              Decline
            </button>
            <button onClick={() => setState('accepted')} className="rounded-lg bg-violet-500 px-3 py-1.5 text-[10px] font-bold text-white">
              Accept
            </button>
          </motion.div>
        )}
        {state === 'accepted' && (
          <motion.div
            key="ok"
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onAnimationComplete={() => window.setTimeout(() => setState('gone'), 1400)}
            className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-xl border border-lime-400/40 bg-lime-400/10 p-3"
          >
            <span className="text-lime-300">✓</span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-lime-300">PREFERENCES SAVED</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
