import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Split Pane Resizer — the divider is a vertical drag handle; its x
 * offset (dragMomentum off, elastic 0) maps onto a percentage clamped to
 * 20–80%. Both panes re-flow off that single value via flex-basis, and
 * the panes' labels report their live share. Double-click resets 50/50.
 */
export function SplitPaneResizer() {
  const [split, setSplit] = useState(50) // percent

  return (
    <div className="flex h-full w-full gap-0 p-4">
      <motion.div className="flex flex-col justify-between overflow-hidden rounded-l-xl border border-white/10 bg-panel p-3" style={{ width: `${split}%` }}>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-violet-300">editor</span>
        <div className="space-y-1.5">
          {[80, 60, 70, 45].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full bg-white/10" style={{ width: `${w}%` }} />
          ))}
        </div>
        <span className="font-mono text-[9px] text-fog">{Math.round(split)}%</span>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        dragMomentum={false}
        onDrag={(_, info) => {
          // 224px ≈ visible track width inside the card
          setSplit((s) => Math.min(80, Math.max(20, s + (info.delta.x / 224) * 100)))
        }}
        onDoubleClick={() => setSplit(50)}
        className="group relative z-10 -mx-1 flex w-2 shrink-0 cursor-col-resize items-center justify-center"
        title="Drag to resize · double-click to reset"
      >
        <span className="h-10 w-1 rounded-full bg-white/20 transition group-hover:bg-violet-400 group-active:bg-violet-300" />
      </motion.div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-r-xl border border-white/10 bg-abyss p-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">preview</span>
        <div className="grid h-12 place-items-center rounded-lg border border-dashed border-white/15">
          <span className="font-mono text-[9px] text-fog">live</span>
        </div>
        <span className="font-mono text-[9px] text-fog">{100 - Math.round(split)}%</span>
      </div>
    </div>
  )
}
