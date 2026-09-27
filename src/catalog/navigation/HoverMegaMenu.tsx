import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ITEMS = [
  { icon: '◆', title: 'Components', desc: '128 live patterns' },
  { icon: '▲', title: 'Templates', desc: 'Production starters' },
  { icon: '●', title: 'Tokens', desc: 'Design system core' },
]

/**
 * Hover Mega Menu — enter opens instantly, but LEAVING is debounced 180ms
 * so traveling diagonally into the panel doesn't flicker it closed (the
 * classic mega-menu bug). The panel scales from its top edge origin.
 */
export function HoverMegaMenu() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(0)

  const enter = () => {
    window.clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const leave = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 180)
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-6 border-b border-line px-8 py-3" onMouseLeave={leave}>
        <span className="text-xs font-bold tracking-[0.2em] text-white">ACME</span>
        <button onMouseEnter={enter} className={`text-xs transition-colors ${open ? 'text-violet-300' : 'text-mist hover:text-white'}`}>
          Products ▾
        </button>
        <span className="text-xs text-mist">Pricing</span>
        <span className="text-xs text-mist">Docs</span>
      </div>

      <div className="relative flex-1" onMouseEnter={enter} onMouseLeave={leave}>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="absolute left-6 right-6 top-1 origin-top rounded-xl border border-white/12 bg-panel/95 p-2 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              {ITEMS.map((it) => (
                <button key={it.title} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-white/[0.06]">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-violet-500/15 text-violet-300">{it.icon}</span>
                  <span>
                    <span className="block text-xs font-semibold text-white">{it.title}</span>
                    <span className="block text-[10px] text-fog">{it.desc}</span>
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <p className="px-8 pt-10 text-center font-mono text-[10px] text-fog">hover "Products" · 180ms leave debounce</p>
      </div>
    </div>
  )
}
