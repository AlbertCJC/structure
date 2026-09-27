import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Spring Drawer — slides in from the right on a spring (300/30) with a
 * blurred backdrop. Escape closes it (listener added only while open).
 * Content children stagger in 40ms after the panel lands.
 */
export function SlideDrawer() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <button onClick={() => setOpen(true)} className="rounded-lg border border-line bg-raise px-5 py-2.5 text-xs font-medium text-white transition hover:border-white/25">
        Open drawer →
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="bd"
              className="absolute inset-0 z-10 bg-void/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute bottom-0 right-0 top-0 z-20 w-52 border-l border-white/10 bg-panel p-4 shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.8)]"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white">Settings</p>
                <button onClick={() => setOpen(false)} className="text-fog hover:text-white">✕</button>
              </div>
              {['Profile', 'Appearance', 'Notifications', 'API keys'].map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.04 }}
                  className="mb-1 block w-full rounded-lg px-3 py-2.5 text-left text-xs text-mist transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item}
                </motion.button>
              ))}
              <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">esc to close</p>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
