import { useState } from 'react'
import { motion } from 'framer-motion'

const BOX = ['Canvas', 'Layers', 'Assets']
const ICONS = [
  { icon: '◧', label: 'Split' },
  { icon: '◎', label: 'Focus' },
  { icon: '▤', label: 'Rows' },
  { icon: '◈', label: 'Detail' },
]
const MANY = ['Today', 'Tomorrow', 'This week', 'This month', 'Quarter', 'Year', 'All time', 'Custom…']

/** Sliding box — a white panel karaoke-slides behind the active label. */
export function SlidingBoxTabs() {
  const [active, setActive] = useState(0)
  return (
    <div className="inline-flex gap-1 rounded-xl border border-white/15 p-1 m-6">
      {BOX.map((t, i) => (
        <button key={t} onClick={() => setActive(i)} className="relative rounded-lg px-4 py-2 text-sm">
          {active === i && (
            <motion.span layoutId="slide-box" transition={{ type: 'spring', stiffness: 460, damping: 32 }} className="absolute inset-0 rounded-lg bg-white" />
          )}
          <span className={`relative ${active === i ? 'font-semibold text-black' : 'text-fog'}`}>{t}</span>
        </button>
      ))}
    </div>
  )
}

/** Icon tabs — the active tile inflates on a spring while the icon gets the accent. */
export function BoxedIconTabs() {
  const [active, setActive] = useState(1)
  return (
    <div className="flex gap-1.5 p-6">
      {ICONS.map((t, i) => (
        <motion.button
          key={t.label}
          onClick={() => setActive(i)}
          animate={{ scale: active === i ? 1.06 : 1, backgroundColor: active === i ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0)' }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 460, damping: 24 }}
          className="flex w-14 flex-col items-center gap-1 rounded-xl border border-white/10 py-2.5"
        >
          <span className={`text-base ${active === i ? 'text-white' : 'text-fog'}`}>{t.icon}</span>
          <span className={`text-[9px] ${active === i ? 'text-white' : 'text-fog'}`}>{t.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

/** (VerticalMarkerTabs lives in TabsSet.tsx — the sibling family file.)
 *  VERT list retained for the other three tabs in this family. */

/** Edge-fade tabs — overflow row with gradient masks telling you there's more to swipe. */
export function ScrollEdgeTabs() {
  const [active, setActive] = useState(2)
  return (
    <div className="relative w-60 p-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-void to-transparent" />
      <div className="flex gap-4 overflow-x-auto pb-1 pt-0.5" style={{ scrollbarWidth: 'none' }}>
        {MANY.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`shrink-0 text-sm ${active === i ? 'font-semibold text-white underline decoration-white/60 underline-offset-4' : 'text-fog hover:text-mist'}`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
