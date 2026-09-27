import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Stroke-Draw Checkbox.
 *
 * Two synchronized pathLength animations: the box border tightens its
 * stroke color while the check path draws 0 → 1 on a spring (stiffness
 * 200 — drawn strokes feel right with a touch of overshoot). Unchecking
 * simply retracts the same path.
 */
export function DrawCheckToggle() {
  const [on, setOn] = useState(true)

  return (
    <div className="flex flex-col items-center gap-5">
      <button onClick={() => setOn((v) => !v)} aria-pressed={on} className="group flex items-center gap-3">
        <svg viewBox="0 0 32 32" className="h-12 w-12">
          <motion.rect
            x="2" y="2" width="28" height="28" rx="8"
            fill="none" strokeWidth="2.5"
            animate={{ stroke: on ? '#a3e635' : 'rgba(255,255,255,0.25)', fill: on ? 'rgba(163,230,53,0.08)' : 'rgba(255,255,255,0)' }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M9 16.5l5 5L23 11"
            fill="none" stroke="#a3e635" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={false}
            animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </svg>
        <span className="text-sm text-mist">Enable auto-save</span>
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">{on ? 'drawn · on' : 'retracted · off'}</span>
    </div>
  )
}
