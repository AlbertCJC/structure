import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Activity Heatmap — deterministic pseudo-random intensities (seeded by
 * cell index math so re-renders never reshuffle). Hover scales the cell
 * and reports its coordinates + value below; cells bloom in on mount with
 * a diagonal stagger.
 */
export function HeatmapGrid() {
  const [hover, setHover] = useState<{ w: number; d: number; v: number } | null>(null)

  const cells = useMemo(
    () =>
      Array.from({ length: 84 }, (_, i) => {
        const seed = Math.sin(i * 12.9898) * 43758.5453
        return { w: Math.floor(i / 7), d: i % 7, v: Math.abs(seed % 1) }
      }),
    [],
  )

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {cells.map((c, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (c.w + c.d) * 0.015, duration: 0.25 }}
            onMouseEnter={() => setHover(c)}
            onMouseLeave={() => setHover(null)}
            whileHover={{ scale: 1.5 }}
            className="h-3 w-3 rounded-[3px]"
            style={{ backgroundColor: `rgba(74,222,128,${0.08 + c.v * 0.85})` }}
            aria-label={`week ${c.w + 1}, day ${c.d + 1}`}
          />
        ))}
      </div>
      <span className="h-4 font-mono text-[10px] text-fog">
        {hover ? `wk ${hover.w + 1} · day ${hover.d + 1} — ${Math.round(hover.v * 9)} commits` : 'hover the grid'}
      </span>
    </div>
  )
}
