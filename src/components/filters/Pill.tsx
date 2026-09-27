import { motion } from 'framer-motion'

interface PillProps {
  label: string
  active: boolean
  onClick: () => void
  /** Optional count badge (category facets). */
  count?: number
  /** CSS background for the leading swatch dot — solid color or gradient. */
  dot?: string
  /** Mono styling for the motion-engine facet. */
  mono?: boolean
}

/**
 * Pill toggle — the atomic filter control. `aria-pressed` for assistive tech,
 * whileTap for the micro-press, and a soft glow when active so the "selected
 * state" reads without heavy fills (structural minimalism).
 */
export function Pill({ label, active, onClick, count, dot, mono }: PillProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
        mono ? 'font-mono text-[11px]' : ''
      } ${
        active
          ? 'border-white/30 bg-white/10 text-white shadow-[0_0_16px_-4px_rgba(255,255,255,0.25)]'
          : 'border-line bg-surface/50 text-mist hover:border-white/20 hover:text-white'
      }`}
    >
      {dot && <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: dot }} />}
      {label}
      {count !== undefined && (
        <span
          className={`rounded-full px-1.5 font-mono text-[9px] ${
            active ? 'bg-white/15 text-white' : 'bg-white/5 text-fog'
          }`}
        >
          {count}
        </span>
      )}
    </motion.button>
  )
}
