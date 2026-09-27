import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const VERBS = ['sketch', 'prototype', 'ship']

/**
 * Verb carousel — the static lead stays put while the verb rotates through
 * its list: rises in, pauses 1.1s, lifts out. popLayout keeps the lane full.
 */
export function VerbSwapLoop() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % VERBS.length), 1600)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div className="flex items-baseline gap-2 p-6 text-2xl font-bold text-white">
      <span>Always</span>
      <span className="relative inline-flex h-8 w-36 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={VERBS[i]}
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -22, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="absolute left-0 text-white underline decoration-white/30 underline-offset-4"
          >
            {VERBS[i]}.
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  )
}

const LYRIC = 'motion is a language'

/**
 * Karaoke sweep — word by word the highlight fills left to right, one 350ms
 * pass per word then reset. Reading pace set by the animation itself.
 */
export function KaraokeSweepLine() {
  const words = LYRIC.split(' ')
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setCur((c) => (c + 1) % (words.length + 2)), 700)
    return () => window.clearInterval(t)
  }, [words.length])
  return (
    <div className="flex gap-x-2 p-6 text-xl font-semibold">
      {words.map((w, i) => (
        <span key={w} className={`transition-colors duration-300 ${i < cur ? 'text-white' : 'text-fog/50'}`}>
          {w}
        </span>
      ))}
    </div>
  )
}

/**
 * Breathing tagline — scale and letter-spacing ride one slow sine so the
 * type itself inhales. Reduced-motion-friendly (transform-only).
 */
export function BreathingTagline() {
  return (
    <div className="p-6">
      <motion.p
        initial={{ scale: 1, letterSpacing: '0em', opacity: 0.65 }}
        animate={{ scale: [1, 1.04, 1], letterSpacing: ['0em', '0.06em', '0em'], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        className="text-xl font-semibold text-white"
      >
        stay curious
      </motion.p>
    </div>
  )
}

/**
 * Tracking pulse — letter-spacing oscillates wide→tight around a display
 * line; the wordmark inhales like a metronome.
 */
export function TrackingPulseText() {
  return (
    <div className="p-6">
      <motion.h4
        animate={{ letterSpacing: ['0.02em', '0.3em', '0.02em'] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="whitespace-nowrap text-lg font-bold uppercase text-white"
      >
        structura
      </motion.h4>
    </div>
  )
}
