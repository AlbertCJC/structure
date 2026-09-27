import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Place = 'top' | 'right' | 'bottom' | 'left'

const POS: Record<Place, { pos: string; from: { x?: number; y?: number } }> = {
  top: { pos: 'bottom-full left-1/2 mb-2 -translate-x-1/2', from: { y: 5 } },
  bottom: { pos: 'top-full left-1/2 mt-2 -translate-x-1/2', from: { y: -5 } },
  left: { pos: 'right-full top-1/2 mr-2 -translate-y-1/2', from: { x: 5 } },
  right: { pos: 'left-full top-1/2 ml-2 -translate-y-1/2', from: { x: -5 } },
}

/**
 * Tooltip Quartet — one target, four placements. Each tooltip rises in
 * FROM its target (top rises up, left slides left…) via a per-placement
 * entry vector, with a rotated-square arrow nub. Only one shows at a time.
 */
export function TooltipCollection() {
  const [shown, setShown] = useState<Place | null>(null)

  return (
    <div className="relative grid h-full w-full place-items-center">
      <div className="grid grid-cols-3 gap-6">
        {(['top', 'left', 'right'] as Place[]).map((p) => (
          <Target key={p} place={p} shown={shown} setShown={setShown} />
        ))}
        <div />
        <Target place="bottom" shown={shown} setShown={setShown} />
      </div>
    </div>
  )
}

function Target({ place, shown, setShown }: { place: Place; shown: Place | null; setShown: (p: Place | null) => void }) {
  const cfg = POS[place]
  return (
    <div
      className="relative"
      onMouseEnter={() => setShown(place)}
      onMouseLeave={() => setShown(null)}
    >
      <button className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-raise font-mono text-[9px] uppercase text-mist transition hover:border-violet-400/50 hover:text-white">
        {place}
      </button>
      <AnimatePresence>
        {shown === place && (
          <motion.span
            initial={{ opacity: 0, ...cfg.from }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...cfg.from }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className={`pointer-events-none absolute z-20 whitespace-nowrap rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#0a0a12] shadow-xl ${cfg.pos}`}
          >
            Tooltip · {place}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
