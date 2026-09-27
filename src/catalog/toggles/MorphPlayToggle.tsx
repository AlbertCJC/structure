import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Morphing Play Toggle.
 *
 * Play and pause are two SVG glyphs crossfaded in a popLayout: the outgoing
 * one scales to 0.5 and rotates while the incoming one blooms from 0.5 —
 * a cheap, smooth "morph" that needs no path interpolation library. The
 * whole button breathes on a 3s y-bob so it feels like a physical fader.
 */
export function MorphPlayToggle() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={() => setPlaying((v) => !v)}
        aria-label={playing ? 'Pause' : 'Play'}
        className="relative grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-surface/80 shadow-[0_16px_40px_-16px_rgba(139,92,246,0.5)]"
      >
        <motion.span
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: playing
              ? '0 0 0 6px rgba(139,92,246,0.15), 0 0 40px -4px rgba(139,92,246,0.45)'
              : '0 0 0 0px rgba(139,92,246,0), 0 0 0px rgba(139,92,246,0)',
          }}
          transition={{ duration: 0.4 }}
        />
        <AnimatePresence mode="popLayout">
          {playing ? (
            <motion.svg
              key="pause"
              viewBox="0 0 24 24"
              initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="h-8 w-8"
            >
              <rect x="6" y="4" width="4" height="16" rx="1.5" fill="#e879f9" />
              <rect x="14" y="4" width="4" height="16" rx="1.5" fill="#e879f9" />
            </motion.svg>
          ) : (
            <motion.svg
              key="play"
              viewBox="0 0 24 24"
              initial={{ scale: 0.5, rotate: 20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="h-8 w-8 translate-x-0.5"
            >
              <path d="M7 4.5v15a1 1 0 0 0 1.5.87l13-7.5a1 1 0 0 0 0-1.74l-13-7.5A1 1 0 0 0 7 4.5Z" fill="#e879f9" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        {playing ? 'now playing' : 'standby'}
      </span>
    </div>
  )
}
