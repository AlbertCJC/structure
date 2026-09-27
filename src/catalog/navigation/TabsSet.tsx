import { useId, useState } from 'react'
import { motion } from 'framer-motion'

const VTABS = ['Profile', 'Team', 'Billing']

/**
 * Vertical marker tabs — a hairline marker slides to the active row; the
 * marker's Y is index × row height, sprung, never measured.
 */
export function VerticalMarkerTabs() {
  const [active, setActive] = useState(0)
  return (
    <div className="relative p-6 pl-5">
      <motion.span
        className="absolute left-3 w-0.5 rounded bg-white"
        animate={{ y: active * 36, height: 36 }}
        transition={{ type: 'spring', stiffness: 460, damping: 32 }}
        style={{ top: 24 }}
      />
      {VTABS.map((t, i) => (
        <button key={t} onClick={() => setActive(i)} className={`block h-9 w-32 px-4 text-left text-sm transition-colors ${active === i ? 'text-white' : 'text-fog hover:text-mist'}`}>
          {t}
        </button>
      ))}
    </div>
  )
}

const EDGE_TABS = ['Today', 'Week', 'Sprint', 'Month', 'Quarter', 'Year', 'All time']

/**
 * Fade-edge tabs — a horizontally scrollable strip whose ends dissolve via
 * mask-image, quietly teaching that more exists offscreen. CSS only.
 */
export function FadeEdgeTabs() {
  const [active, setActive] = useState(1)
  return (
    <div className="w-60 overflow-hidden p-6">
      <div
        className="flex gap-5 overflow-x-auto pb-1"
        style={{
          scrollbarWidth: 'none',
          maskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)',
        }}
      >
        {EDGE_TABS.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} className={`shrink-0 text-sm transition-colors ${active === i ? 'font-semibold text-white' : 'text-fog'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

const BTABS = [
  { label: 'Inbox', n: 4 },
  { label: 'Mentions', n: 12 },
  { label: 'Drafts', n: 2 },
]

/**
 * Badge count tabs — the underline travels with layoutId; each badge pops
 * once per activation swap (keyed on the active index).
 */
export function BadgeCountTabs() {
  const [active, setActive] = useState(0)
  const uid = useId()
  return (
    <div className="flex items-start gap-6 p-6">
      {BTABS.map((t, i) => (
        <button key={t.label} onClick={() => setActive(i)} className="relative flex items-center gap-1.5 pb-2 text-sm">
          <span className={active === i ? 'font-semibold text-white' : 'text-fog'}>{t.label}</span>
          <motion.span
            key={`${active === i}-${t.n}`}
            initial={active === i ? { scale: 0.4 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            className={`rounded-full px-1.5 py-px font-mono text-[9px] ${active === i ? 'bg-white text-black' : 'bg-white/10 text-fog'}`}
          >
            {t.n}
          </motion.span>
          {active === i && (
            <motion.span layoutId={`bt-${uid}`} transition={{ type: 'spring', stiffness: 420, damping: 30 }} className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />
          )}
        </button>
      ))}
    </div>
  )
}

const UTABS = ['Canvas', 'Inspect', 'Layers', 'Assets']

/**
 * layoutId underline — the single shared underline element migrates to
 * whichever tab is active, springing across the gaps between them.
 */
export function LayoutIdUnderlineTabs() {
  const [active, setActive] = useState(0)
  const uid = useId()
  return (
    <div className="flex gap-1 rounded-xl border border-white/10 p-1 m-6">
      {UTABS.map((t, i) => (
        <button key={t} onClick={() => setActive(i)} className="relative rounded-lg px-3.5 py-1.5 text-sm">
          {active === i && (
            <motion.span layoutId={`uu-${uid}`} transition={{ type: 'spring', stiffness: 420, damping: 32 }} className="absolute inset-0 rounded-lg bg-white/12" />
          )}
          <span className={`relative ${active === i ? 'text-white' : 'text-fog'}`}>{t}</span>
        </button>
      ))}
    </div>
  )
}
