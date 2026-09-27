import { useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'

const H = 190 // sandbox height inside this card
const SNAPS = [0, 0.5, 1] // closed, half, full (as fraction of travel)

/**
 * Snapping Bottom Sheet — the sheet drags on Y; on release we PROJECT the
 * position forward by velocity/8 and snap to the nearest of three stops.
 * The spring lands it exactly, so fast flicks jump two stops in one
 * gesture — the behavior users expect from native sheets.
 */
export function BottomSheet() {
  const travel = H - 46 // full-open leaves a 46px header strip
  const [snap, setSnap] = useState(0.5)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const current = travel * (1 - snap)
    const projected = info.offset.y + info.velocity.y / 8
    const nextY = current + projected
    const frac = 1 - nextY / travel
    const nearest = SNAPS.reduce((a, b) => (Math.abs(b - frac) < Math.abs(a - frac) ? b : a), SNAPS[0])
    setSnap(nearest)
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* faux page content behind the sheet */}
      <div className="space-y-2 p-4 opacity-40">
        {[80, 60, 70, 50, 65].map((w, i) => (
          <div key={i} className="h-2 rounded-full bg-white/15" style={{ width: `${w}%` }} />
        ))}
      </div>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: travel }}
        dragElastic={0.02}
        dragMomentum={false}
        onDragEnd={onDragEnd}
        animate={{ y: travel * (1 - snap) }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="absolute inset-x-3 bottom-3 rounded-t-2xl border border-white/12 bg-panel/95 p-3 shadow-[0_-16px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
        style={{ height: H }}
      >
        <button className="mx-auto block w-full cursor-grab touch-none active:cursor-grabbing" aria-label="Drag sheet">
          <span className="mx-auto block h-1 w-9 rounded-full bg-white/20" />
        </button>
        <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
          {snap === 0 ? 'peek' : snap === 0.5 ? 'half' : 'full'} sheet
        </p>
        <div className="mt-3 space-y-2">
          {['Share pattern', 'Add to board', 'Open in editor', 'Report issue'].map((item) => (
            <div key={item} className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
              <span className="h-5 w-5 rounded-md bg-violet-500/20" />
              <span className="text-[11px] text-mist">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
