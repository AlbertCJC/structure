import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const NOTES = [
  { icon: '◈', text: 'Kai approved your motion spec', time: '2m' },
  { icon: '✦', text: 'New star on gradient-trace', time: '14m' },
  { icon: '⚑', text: 'Deploy #214 finished', time: '1h' },
]

/**
 * Bell Notification Panel — the badge count springs in/out (scale), the
 * panel drops down from the bell on a Y spring with list stagger, and
 * "Mark read" drains the badge to zero with a check pulse.
 */
export function NotificationPanel() {
  const [open, setOpen] = useState(false)
  const [count, setCount] = useState(3)

  return (
    <div className="flex h-full w-full items-start justify-center pt-4">
      <div className="relative">
        <button onClick={() => setOpen((v) => !v)} className="relative grid h-11 w-11 place-items-center rounded-xl border border-line bg-panel text-lg text-mist transition hover:text-white" aria-label="Notifications">
          🔔
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rose-500 font-mono text-[10px] font-bold text-white ring-2 ring-void"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute left-1/2 top-full z-20 mt-2 w-60 -translate-x-1/2 origin-top rounded-xl border border-white/12 bg-panel/95 p-2 shadow-[0_24px_60px_-16px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              {NOTES.slice(0, count || 3).map((n, i) => (
                <motion.div
                  key={n.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="flex items-start gap-2.5 rounded-lg px-2.5 py-2 hover:bg-white/[0.05]"
                >
                  <span className="mt-0.5 text-violet-300">{n.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11px] text-white">{n.text}</span>
                    <span className="font-mono text-[9px] text-fog">{n.time} ago</span>
                  </span>
                </motion.div>
              ))}
              {count === 0 && <p className="px-2.5 py-4 text-center text-[11px] text-fog">all caught up ✨</p>}
              <button onClick={() => setCount(0)} className="mt-1 w-full rounded-lg border border-line py-1.5 text-[10px] text-mist transition hover:text-white">
                Mark all read
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
