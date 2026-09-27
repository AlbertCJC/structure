import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ITEMS = [
  { icon: '◉', label: 'View profile' },
  { icon: '✎', label: 'Edit status' },
  { icon: '⇅', label: 'Switch workspace' },
  { icon: '→', label: 'Sign out' },
]

/**
 * Avatar Popover Menu — anchored to the avatar, scaling from its
 * bottom-right corner (transform-origin matches the anchor). Outside
 * clicks close it via a document listener guarded by a ref check.
 */
export function PopoverMenu() {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  return (
    <div className="grid h-full w-full place-items-center">
      <div ref={rootRef} className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 ring-2 ring-white/15 transition hover:ring-violet-400/50"
          aria-label="Account menu"
        />
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-void bg-lime-400" />

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -2 }}
              transition={{ type: 'spring', stiffness: 440, damping: 28 }}
              className="absolute left-1/2 top-full z-20 mt-3 w-44 origin-top -translate-x-1/2 overflow-hidden rounded-xl border border-white/12 bg-panel/95 py-1.5 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              <p className="px-3.5 pb-1.5 pt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">ava nakamura</p>
              {ITEMS.map((it, i) => (
                <motion.button
                  key={it.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.03 }}
                  className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-xs text-mist transition hover:bg-white/[0.07] hover:text-white"
                >
                  <span className="w-3.5 text-center text-violet-300">{it.icon}</span>
                  {it.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
