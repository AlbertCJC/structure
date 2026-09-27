import { useState } from 'react'
import { motion } from 'framer-motion'

const OPTIONS = ['Day', 'Week', 'Month', 'Year']

/**
 * Neumorphic Segmented Control.
 *
 * Soft-UI shadows are INSET pairs: light from top-left, shadow to
 * bottom-right (and their inverses on raised elements). The sliding thumb
 * is a layoutId spring element carrying its OWN raised shadow pair, so it
 * appears physically pressed into the track while traveling.
 */
export function SegmentedControl() {
  const [value, setValue] = useState('Week')

  return (
    <div className="p-6">
      <div className="rounded-2xl bg-raise p-1.5 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.65),inset_-1px_-1px_3px_rgba(255,255,255,0.06)]">
        <div className="flex">
          {OPTIONS.map((o) => (
            <button
              key={o}
              onClick={() => setValue(o)}
              className={`relative rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                value === o ? 'text-white' : 'text-fog hover:text-mist'
              }`}
            >
              {value === o && (
                <motion.span
                  layoutId="seg-indicator"
                  className="absolute inset-0 rounded-xl bg-surface shadow-[2px_2px_6px_rgba(0,0,0,0.5),-1px_-1px_3px_rgba(255,255,255,0.05)]"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative z-10">{o}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">range: {value}</p>
    </div>
  )
}
