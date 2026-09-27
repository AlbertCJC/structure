import { useState } from 'react'
import { motion } from 'framer-motion'

const TABS = [
  { icon: '⌂', label: 'Home' },
  { icon: '◎', label: 'Explore' },
  { icon: '✚', label: 'Create' },
  { icon: '♡', label: 'Saved' },
]

/**
 * Lifted Bottom Tab Bar — the active tab rides a layoutId pill that
 * rises 8px above the bar; the icon inside pops (scale keyframes on remount
 * via key) and a dot indicator fades in. Inactive icons dim to fog.
 */
export function BottomTabBar() {
  const [active, setActive] = useState(0)

  return (
    <div className="p-8">
      <div className="flex w-72 items-center justify-between rounded-2xl border border-white/12 bg-panel/90 px-3 py-2 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur">
        {TABS.map((t, i) => (
          <button key={t.label} onClick={() => setActive(i)} className="relative flex w-14 flex-col items-center gap-0.5 py-1">
            {active === i && (
              <motion.span
                layoutId="tabbar-pill"
                className="absolute -top-1 h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 ring-1 ring-violet-400/30"
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              />
            )}
            <motion.span
              key={`${t.label}-${active === i}`}
              initial={active === i ? { scale: 0.7, y: 2 } : false}
              animate={{ scale: 1, y: active === i ? -4 : 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className={`relative z-10 text-lg ${active === i ? 'text-white' : 'text-fog'}`}
            >
              {t.icon}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.4 }}
              className="relative z-10 h-1 w-1 rounded-full bg-fuchsia-300"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
