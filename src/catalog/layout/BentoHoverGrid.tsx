import { motion } from 'framer-motion'

const TILES = [
  { t: 'Motion', v: '128', g: 'from-violet-500/25' },
  { t: 'Uptime', v: '99.9%', g: 'from-cyan-400/25' },
  { t: 'Users', v: '4.2k', g: 'from-lime-400/20' },
  { t: 'Stars', v: '12k', g: 'from-fuchsia-500/25' },
]

/**
 * Bento Hover Grid — each tile is a whileHover spring (y-lift + scale)
 * plus a gradient wash that fades in under the pointer. The metadata row
 * slides up on hover so tiles read "flat" at rest and "alive" on visit.
 */
export function BentoHoverGrid() {
  return (
    <div className="grid h-full w-full grid-cols-2 gap-2.5 p-4">
      {TILES.map((tile) => (
        <motion.div
          key={tile.t}
          whileHover={{ y: -3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br ${tile.g} to-abyss bg-abyss p-3`}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-fog">{tile.t}</span>
          <div>
            <p className="text-lg font-bold text-white">{tile.v}</p>
            <motion.p
              initial={false}
              className="text-[9px] text-mist opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              ↗ view report
            </motion.p>
          </div>
          <span className="pointer-events-none absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </motion.div>
      ))}
    </div>
  )
}
