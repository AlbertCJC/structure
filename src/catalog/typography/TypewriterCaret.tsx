import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const PHRASES = ['Design systems.', 'Motion languages.', 'Zero shortcuts.']

/**
 * Typewriter + Caret — a small state machine: TYPE a phrase at 55ms/char,
 * HOLD 1.2s, DELETE at 28ms/char, then advance to the next phrase. The
 * caret blinks on a separate CSS-free framer opacity loop so it keeps
 * blinking even while characters stream.
 */
export function TypewriterCaret() {
  const [phrase, setPhrase] = useState(0)
  const [sub, setSub] = useState('')
  const [mode, setMode] = useState<'type' | 'hold' | 'delete'>('type')

  useEffect(() => {
    const target = PHRASES[phrase]
    let t: number
    if (mode === 'type') {
      if (sub.length < target.length) t = window.setTimeout(() => setSub(target.slice(0, sub.length + 1)), 55)
      else t = window.setTimeout(() => setMode('delete'), 1200)
    } else {
      if (sub.length > 0) t = window.setTimeout(() => setSub(sub.slice(0, -1)), 28)
      else {
        setPhrase((p) => (p + 1) % PHRASES.length)
        setMode('type')
      }
    }
    return () => window.clearTimeout(t)
  }, [sub, mode, phrase])

  return (
    <div className="flex items-center gap-1 p-8 font-mono">
      <span className="text-fog">$</span>
      <span className="text-sm text-white">{sub}</span>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', ease: 'steps(1)' }}
        className="inline-block h-4 w-2 bg-violet-400"
      />
    </div>
  )
}
