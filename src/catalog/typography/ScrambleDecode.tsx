import { useEffect, useState } from 'react'

const TARGET = 'DECRYPTING SIGNAL'
const GLYPHS = '█▓▒░<>/\\|=+*#@01'

/**
 * Scramble Decode — each frame, resolved characters (index < reveal) stay
 * put while everything to the right churns through the glyph pool. The
 * reveal cursor advances every 60ms; when it reaches the end the string
 * holds for a beat, then re-scrambles. Pure interval, cleanup on unmount.
 */
export function ScrambleDecode() {
  const [reveal, setReveal] = useState(0)
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const iv = window.setInterval(() => {
      setFrame((f) => f + 1)
      setReveal((r) => (r >= TARGET.length + 14 ? 0 : r + 1))
    }, 60)
    return () => window.clearInterval(iv)
  }, [])

  const text = TARGET.split('')
    .map((ch, i) => {
      if (ch === ' ') return ' '
      if (i < reveal) return ch
      return GLYPHS[(i * 7 + frame * 3) % GLYPHS.length]
    })
    .join('')

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <span className="font-mono text-lg font-bold tracking-[0.2em] text-lime-300 [text-shadow:0_0_16px_rgba(163,230,53,0.5)]">
        {text}
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fog">
        {reveal >= TARGET.length ? 'signal locked' : 'decoding…'}
      </span>
    </div>
  )
}
