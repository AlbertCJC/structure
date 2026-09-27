import { useState } from 'react'
import { motion } from 'framer-motion'

const THEMES = [
  { id: 'light', label: '☀', bg: '#e5e7eb', panel: '#ffffff', text: '#111827' },
  { id: 'dim', label: '◐', bg: '#2b2b3d', panel: '#3a3a52', text: '#cbd5e1' },
  { id: 'dark', label: '☾', bg: '#0a0a12', panel: '#15151f', text: '#94a3b8' },
]

/**
 * Light / Dim / Dark — the segmented thumb is a layoutId spring, and the
 * little preview window below actually re-lights: bg, panel and text
 * colors all crossfade on the same 0.35s curve as the thumb travels.
 */
export function ThemeTripleToggle() {
  const [i, setI] = useState(2)
  const t = THEMES[i]

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex rounded-full border border-line bg-surface p-1">
        {THEMES.map((th, idx) => (
          <button key={th.id} onClick={() => setI(idx)} className="relative rounded-full px-4 py-2 text-sm">
            {i === idx && (
              <motion.span
                layoutId="theme-thumb"
                className="absolute inset-0 rounded-full bg-white/15"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${i === idx ? 'text-white' : 'text-fog'}`}>{th.label}</span>
          </button>
        ))}
      </div>

      {/* live preview window */}
      <motion.div
        animate={{ backgroundColor: t.bg }}
        transition={{ duration: 0.35 }}
        className="w-48 rounded-xl border border-white/10 p-3"
      >
        <motion.div animate={{ backgroundColor: t.panel }} transition={{ duration: 0.35 }} className="rounded-lg p-2.5">
          <motion.div animate={{ backgroundColor: t.text }} transition={{ duration: 0.35 }} className="mb-1.5 h-2 w-20 rounded-full opacity-80" />
          <motion.div animate={{ backgroundColor: t.text }} transition={{ duration: 0.35 }} className="h-2 w-14 rounded-full opacity-40" />
        </motion.div>
      </motion.div>
    </div>
  )
}
