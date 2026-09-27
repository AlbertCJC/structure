import { useState } from 'react'
import { motion } from 'framer-motion'

const ROWS = [
  { name: 'Violet Dusk', role: 'Design', v: '$2.4k' },
  { name: 'Cyan Signal', role: 'Motion', v: '$1.8k' },
  { name: 'Lime Circuit', role: 'Eng', v: '$3.1k' },
  { name: 'Rose Static', role: 'Ops', v: '$0.9k' },
]

/**
 * Selectable Data Table — rows glow on hover (bg crossfade) and clicking
 * toggles a spring check; selected rows keep a faint violet tint so the
 * selection set is scannable. The data-grid baseline, zero dependencies.
 */
export function TableHover() {
  const [selected, setSelected] = useState<string[]>(['Lime Circuit'])

  const toggle = (name: string) =>
    setSelected((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]))

  return (
    <div className="w-full max-w-[240px] overflow-hidden rounded-xl border border-line bg-panel p-0">
      <div className="grid grid-cols-[1fr_52px_48px] gap-2 border-b border-white/[0.06] px-3.5 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-fog">
        <span>Member</span><span>Role</span><span className="text-right">MRR</span>
      </div>
      {ROWS.map((r) => {
        const isSel = selected.includes(r.name)
        return (
          <motion.button
            key={r.name}
            onClick={() => toggle(r.name)}
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            animate={{ backgroundColor: isSel ? 'rgba(139,92,246,0.08)' : 'rgba(255,255,255,0)' }}
            className="grid w-full grid-cols-[1fr_52px_48px] items-center gap-2 border-b border-white/[0.04] px-3.5 py-2.5 text-left last:border-0"
          >
            <span className="flex items-center gap-2 truncate text-[11px] text-white">
              <motion.span
                initial={{ scale: 0.6, opacity: 0.25 }}
        animate={{ scale: isSel ? 1 : 0.6, opacity: isSel ? 1 : 0.25 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded border text-[8px] ${isSel ? 'border-violet-400 bg-violet-500 text-white' : 'border-white/25'}`}
              >
                {isSel && '✓'}
              </motion.span>
              {r.name}
            </span>
            <span className="font-mono text-[10px] text-fog">{r.role}</span>
            <span className="text-right font-mono text-[10px] text-mist">{r.v}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
