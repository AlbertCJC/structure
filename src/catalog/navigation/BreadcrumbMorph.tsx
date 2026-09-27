import { useState } from 'react'
import { motion } from 'framer-motion'

const CRUMBS = ['Home', 'Library', 'Components', 'Breadcrumb']

/**
 * Breadcrumb Trail — clicking a crumb truncates the path to that depth.
 * The active (last) crumb is bold white; depth changes animate via
 * AnimatePresence on the removed tail so crumbs slide away leftward.
 */
export function BreadcrumbMorph() {
  const [depth, setDepth] = useState(3)
  const visible = CRUMBS.slice(0, depth + 1)

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 font-mono text-xs">
        {visible.map((c, i) => {
          const last = i === visible.length - 1
          return (
            <motion.span key={c} layout className="flex items-center gap-2">
              {i > 0 && <span className="text-fog">/</span>}
              <button
                onClick={() => setDepth(i)}
                className={`transition-colors ${last ? 'font-bold text-white' : 'text-mist hover:text-white'}`}
              >
                {c}
              </button>
            </motion.span>
          )
        })}
        <motion.button
          layout
          onClick={() => setDepth(3)}
          className={`ml-2 rounded-md border border-line px-2 py-0.5 text-[10px] text-fog transition hover:text-white ${depth === 3 ? 'opacity-40' : ''}`}
        >
          reset
        </motion.button>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] text-fog">click any crumb to travel back</p>
    </div>
  )
}
