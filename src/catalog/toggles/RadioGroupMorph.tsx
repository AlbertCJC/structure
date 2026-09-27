import { useState } from 'react'
import { motion } from 'framer-motion'

const OPTIONS = ['Standard', 'Priority', 'Overnight']

/**
 * Radio Group Morph — the selected dot is ONE layoutId element rendered
 * inside the active row, so it springs row-to-row keeping its glow. The
 * outer ring of each radio is constant; only the inner traveler moves.
 */
export function RadioGroupMorph() {
  const [value, setValue] = useState(1)

  return (
    <div className="w-full max-w-[230px] rounded-2xl border border-line bg-panel p-3">
      {OPTIONS.map((o, i) => (
        <button key={o} onClick={() => setValue(i)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-white/5">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-white/25">
            {value === i && (
              <motion.span
                layoutId="radio-dot"
                className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]"
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              />
            )}
          </span>
          <span className={`text-xs ${value === i ? 'font-semibold text-white' : 'text-mist'}`}>{o}</span>
          {i === 1 && <span className="ml-auto rounded-md bg-amber-400/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-300">POPULAR</span>}
        </button>
      ))}
    </div>
  )
}
