import { useState } from 'react'
import { motion } from 'framer-motion'

const CELLS = ['a', 'b', 'c', 'd']

/**
 * Expandable cell — clicking a cell widens it to two grid columns; `layout`
 * on every cell animates BOTH the growing and the squeezed siblings.
 */
export function ExpandableCellGrid() {
  const [active, setActive] = useState(0)
  return (
    <div className="p-6">
      <div className="grid w-60 grid-cols-4 gap-1.5">
        {CELLS.map((c, i) => (
          <motion.button
            key={c}
            layout
            onClick={() => setActive(i)}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            style={{ gridColumn: active === i ? 'span 2' : 'span 1' }}
            className={`h-16 rounded-lg border text-[11px] font-mono transition-colors ${
              active === i ? 'border-white/60 bg-white/10 text-white' : 'border-white/12 text-fog'
            }`}
          >
            {c}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

const MOSAIC = ['Portraits', 'Streets', 'Coast', 'Studio', 'Night', 'Print']

/**
 * Mosaic dim — the hovered tile scales up slightly while siblings dim; CSS
 * does the whole choreography with :has on the parent.
 */
export function MosaicDimGrid() {
  return (
    <div className="group/grid grid w-56 grid-cols-3 gap-1.5 p-6">
      {MOSAIC.map((m, i) => (
        <button
          key={m}
          className={`grid h-14 place-items-center rounded-lg border border-white/10 bg-panel text-[9px] uppercase tracking-wider text-fog transition-all duration-300 hover:scale-[1.06] hover:border-white/40 hover:text-white group-hover/grid:[&:not(:hover)]:opacity-40 ${
            i === 1 || i === 4 ? 'row-span-1' : ''
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}

/**
 * Proportion slices — three vertical slices share the width; hovering one
 * redistributes flex-grow 1→2.5 and framer smooths the reallocations.
 */
export function FlexProportionSlices() {
  const [hover, setHover] = useState(-1)
  return (
    <div className="flex h-24 w-56 gap-1.5 p-6 pb-6">
      {['Copy', 'Motion', 'Ship'].map((t, i) => (
        <motion.button
          key={t}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(-1)}
          animate={{ flexGrow: hover === i ? 2.5 : 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className={`grid flex-1 place-items-center rounded-lg border font-mono text-[10px] transition-colors ${
            hover === i ? 'border-white/50 bg-white/10 text-white' : 'border-white/12 text-fog'
          }`}
          style={{ flexBasis: 0 }}
        >
          {t}
        </motion.button>
      ))}
    </div>
  )
}

/**
 * Crosshair guides — hovering a tile draws full-width/height guides through
 * its center, like alignment rulers snapping on.
 */
export function CrosshairGuideTile() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <div
        onMouseEnter={() => setOn(true)}
        onMouseLeave={() => setOn(false)}
        className="relative grid h-24 w-40 cursor-pointer place-items-center overflow-hidden rounded-xl border border-white/15 bg-panel"
      >
        <motion.span className="absolute left-0 right-0 top-1/2 h-px origin-left bg-white/50" animate={{ scaleX: on ? 1 : 0 }} transition={{ duration: 0.25 }} />
        <motion.span className="absolute bottom-0 left-1/2 top-0 w-px origin-top bg-white/50" animate={{ scaleY: on ? 1 : 0 }} transition={{ duration: 0.25, delay: 0.05 }} />
        <span className="relative z-10 rounded bg-void px-2 py-0.5 font-mono text-[10px] text-white">128 × 96</span>
      </div>
    </div>
  )
}
