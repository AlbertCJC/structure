import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const RAIL = ['Overview', 'Members', 'Settings', 'Billing']
const SECTIONS = ['Intro', 'Work', 'About', 'Contact']

/** (GrowingDotTabs lives in IndicatorNavs.tsx — the sibling family file.) */

/** Vertical rail — a 2px white marker slides along the sidebar rail to the picked row. */
export function VerticalRailIndicator() {
  const [active, setActive] = useState(1)
  return (
    <div className="flex p-6 pl-0">
      <div className="relative mr-3 w-px bg-white/10">
        {RAIL.map((_, i) =>
          active === i ? (
            <motion.span
              key={i}
              layoutId="rail-marker"
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
              className="absolute -left-px h-8 w-[2.5px] rounded-full bg-white"
              style={{ top: i * 36 }}
            />
          ) : null,
        )}
      </div>
      <div className="flex flex-col">
        {RAIL.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} className={`h-9 text-left text-sm ${active === i ? 'font-semibold text-white' : 'text-fog hover:text-mist'}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}

/** Boxed hover — a glass pill snaps behind whichever item you hover (group-hover without JS follow). */
export function BoxedHoverIndicator() {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1 p-6">
      {['Features', 'Pricing', 'Changelog'].map((t, i) => (
        <button key={t} onMouseEnter={() => setHover(i)} className="relative rounded-lg px-3.5 py-2 text-sm text-white">
          {hover === i && (
            <motion.span
              layoutId="boxed-hover"
              transition={{ type: 'spring', stiffness: 480, damping: 32 }}
              className="absolute inset-0 rounded-lg border border-white/15 bg-white/5"
            />
          )}
          <span className="relative">{t}</span>
        </button>
      ))}
    </div>
  )
}

/** Scroll dot indicator — internal scroll region; right rail dots track the section in view. */
export function ScrollDotIndicator() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  return (
    <div className="relative w-full p-6">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget
          const h = el.clientHeight
          setActive(Math.min(SECTIONS.length - 1, Math.round(el.scrollTop / (h * 0.82))))
        }}
        className="h-28 w-52 snap-y snap-mandatory space-y-1 overflow-y-auto rounded-xl border border-line"
      >
        {SECTIONS.map((s, i) => (
          <div key={s} className="flex h-[6.4rem] snap-start items-center justify-center text-xs font-semibold tracking-wide text-mist" style={{ background: i % 2 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
            {s}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {SECTIONS.map((s, i) => (
          <motion.span key={s} initial={{ opacity: 1 }} animate={{ scale: active === i ? 1.5 : 1, opacity: active === i ? 1 : 0.35 }} transition={{ type: 'spring', stiffness: 500, damping: 26 }} className="h-1.5 w-1.5 rounded-full bg-white" />
        ))}
      </div>
    </div>
  )
}
