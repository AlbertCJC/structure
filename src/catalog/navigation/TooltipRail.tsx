import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ITEMS = ['✦', '◈', '✎', '⚙']

/**
 * Icon Rail + Tooltips — hovering an icon slides its label out to the
 * right (x: -6 → 0 with opacity) alongside an arrow nub. The rail itself
 * is a narrow neumorphic strip; only ONE tooltip can exist at a time.
 */
export function TooltipRail() {
  const [hovered, setHovered] = useState<number | null>(null)
  const labels = ['Favorites', 'Collections', 'Compose', 'Settings']

  return (
    <div className="flex items-center gap-8 p-6">
      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-panel p-2 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.5)]">
        {ITEMS.map((icon, i) => (
          <div key={i} className="relative" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <button
              className={`grid h-10 w-10 place-items-center rounded-xl text-base transition-colors ${
                hovered === i ? 'bg-white/10 text-white' : 'text-mist hover:text-white'
              }`}
            >
              {icon}
            </button>
            <AnimatePresence>
              {hovered === i && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="absolute left-full top-1/2 z-10 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-line bg-raise px-2.5 py-1.5 text-[11px] font-medium text-white shadow-lg"
                >
                  {labels[i]}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-raise" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <p className="max-w-24 font-mono text-[10px] leading-relaxed text-fog">hover the rail — labels slide out with an arrow nub</p>
    </div>
  )
}
