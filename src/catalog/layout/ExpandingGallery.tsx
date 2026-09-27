import { useState } from 'react'
import { motion } from 'framer-motion'

const PANELS = [
  { hue: 265, label: 'Violet Sector' },
  { hue: 190, label: 'Cyan Drift' },
  { hue: 310, label: 'Fuchsia Ridge' },
  { hue: 90, label: 'Lime Field' },
  { hue: 35, label: 'Amber Coast' },
]

/**
 * Expanding Panel Gallery — five flex panels share a row; the active one
 * springs to flex-grow 3 while the rest hold 1 (animate: flexGrow on a
 * spring). The active panel's caption + gradient brighten in step.
 * Featured card width gives the expansion room to breathe.
 */
export function ExpandingGallery() {
  const [active, setActive] = useState(1)

  return (
    <div className="flex h-full w-full gap-2 p-4">
      {PANELS.map((p, i) => {
        const isActive = active === i
        return (
          <motion.button
            key={p.label}
            onMouseEnter={() => setActive(i)}
            animate={{ flexGrow: isActive ? 3 : 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
            className="relative min-w-0 flex-1 basis-0 overflow-hidden rounded-xl border border-white/10 text-left"
            style={{ background: `linear-gradient(165deg, hsl(${p.hue} 80% 55% / ${isActive ? 0.4 : 0.16}), #0a0a12 78%)` }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
              transition={{ delay: isActive ? 0.15 : 0 }}
              className="absolute bottom-3 left-3 right-3"
            >
              <span className="block truncate text-xs font-bold text-white">{p.label}</span>
              <span className="mt-0.5 block text-[9px] text-white/60">sector {String(i + 1).padStart(2, '0')}</span>
            </motion.span>
            <span className={`absolute left-3 top-3 font-mono text-[9px] ${isActive ? 'text-white/90' : 'text-white/40'}`}>
              0{i + 1}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}
