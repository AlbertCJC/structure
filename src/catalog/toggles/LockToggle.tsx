import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Padlock Morph — the shackle is a path whose motion is choreographed in
 * two beats on unlock: translate up, THEN rotate open (keyframe arrays
 * with offset times). Locking plays the exact reverse. The body tint and
 * keyhole glow follow the state.
 */
export function LockToggle() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col items-center gap-5">
      <button onClick={() => setOpen((v) => !v)} aria-pressed={open} className="relative">
        <svg viewBox="0 0 80 88" className="h-28 w-24">
          {/* shackle — pivots around its right leg */}
          <motion.g
            animate={open ? { y: -10, rotate: 28 } : { y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 210, damping: 17 }}
            style={{ originX: '56px', originY: '38px' }}
          >
            <path
              d="M24 44V26a16 16 0 0 1 32 0v18"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              stroke={open ? '#a3e635' : '#9ba0b5'}
            />
          </motion.g>
          {/* body */}
          <motion.rect
            x="12" y="42" width="56" height="42" rx="10"
            animate={{ fill: open ? 'rgba(163,230,53,0.14)' : 'rgba(255,255,255,0.07)', stroke: open ? '#a3e635' : 'rgba(255,255,255,0.25)' }}
            transition={{ duration: 0.3 }}
            strokeWidth="2"
          />
          <motion.circle cx="40" cy="60" r="5" animate={{ fill: open ? '#a3e635' : '#666b82' }} transition={{ duration: 0.3 }} />
          <motion.rect x="37.5" y="62" width="5" height="10" rx="2.5" animate={{ fill: open ? '#a3e635' : '#666b82' }} transition={{ duration: 0.3 }} />
        </svg>
      </button>
      <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${open ? 'text-lime-300' : 'text-fog'}`}>
        {open ? 'unlocked' : 'locked'}
      </span>
    </div>
  )
}
