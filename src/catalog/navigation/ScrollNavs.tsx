import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const CHAPTERS = [
  { label: 'Teaser', at: 0 },
  { label: 'Setup', at: 25 },
  { label: 'Demo', at: 55 },
  { label: 'Recap', at: 82 },
]

/** Chapter rail — click a chapter tick; the playhead snaps there and the fill follows. */
export function ChapterRailPlayer() {
  const [pct, setPct] = useState(12)
  const [active, setActive] = useState(0)
  return (
    <div className="w-full max-w-60 p-6">
      <div className="relative h-2.5 rounded-full bg-white/10">
        <motion.div className="absolute inset-y-0 left-0 rounded-full bg-white" animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} />
        {CHAPTERS.map((c, i) => (
          <button
            key={c.label}
            onClick={() => {
              setPct(c.at + 5)
              setActive(i)
            }}
            aria-label={`Chapter ${c.label}`}
            className="group absolute top-1/2 -translate-y-1/2"
            style={{ left: `${c.at}%` }}
          >
            <motion.span animate={{ scale: active === i ? 1.4 : 1 }} className="block h-2 w-0.5 rounded-full bg-white group-hover:bg-white" style={{ opacity: active === i ? 1 : 0.4 }} />
          </button>
        ))}
      </div>
      <div className="mt-2.5 flex justify-between font-mono text-[9px] text-fog">
        <span className="text-mist">{CHAPTERS[active].label}</span>
        <span>{pct}%</span>
      </div>
    </div>
  )
}

/** Elevation header — a sticky header inside its own scroll region gains blur + shadow past 8px. */
export function ElevationStickyHeader() {
  const [lift, setLift] = useState(false)
  return (
    <div className="h-40 w-56 overflow-y-auto rounded-xl border border-line">
      <div
        className={`sticky top-0 z-10 flex items-center justify-between px-3 py-2 text-xs font-semibold text-white transition-all duration-200 ${
          lift ? 'bg-void/85 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        structura
        <span className="font-mono text-[9px] font-normal text-fog">v3.0</span>
      </div>
      <div className="space-y-2 p-3" onScrollCapture={(e) => setLift(e.currentTarget.parentElement!.scrollTop > 8)}>
        {Array.from({ length: 9 }, (_, i) => (
          <p key={i} className="text-[11px] text-fog">
            Scroll the region — the header elevates as soon as content slides beneath it.
          </p>
        ))}
      </div>
    </div>
  )
}

const ANCHORS = ['Cards', 'Charts', 'Forms', 'Toasts']

/** Inner anchors — pill buttons smooth-scroll their own panel to each section. */
export function InnerScrollAnchors() {
  const ref = useRef<HTMLDivElement>(null)
  const scrollTo = (i: number) => {
    const el = ref.current
    if (!el) return
    el.scrollTo({ top: i * el.clientHeight * 0.84, behavior: 'smooth' })
  }
  return (
    <div className="p-6">
      <div className="mb-2 flex gap-1.5">
        {ANCHORS.map((a, i) => (
          <button key={a} onClick={() => scrollTo(i)} className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-mist hover:border-white/40 hover:text-white">
            {a}
          </button>
        ))}
      </div>
      <div ref={ref} className="h-24 w-56 snap-y snap-mandatory overflow-y-auto rounded-xl border border-line">
        {ANCHORS.map((a, i) => (
          <div key={a} className="flex h-[5.05rem] snap-start items-center justify-center text-xs font-semibold text-mist" style={{ background: i % 2 ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
            {a} section
          </div>
        ))}
      </div>
    </div>
  )
}

/** Back-to-top — the pill appears once the region is scrolled past 40% and vanishes top-side. */
export function BackToTopPill() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative w-56 p-6">
      <div
        onScroll={(e) => {
          const el = e.currentTarget
          setShow(el.scrollTop > el.scrollHeight * 0.25)
        }}
        className="h-28 overflow-y-auto rounded-xl border border-line p-3"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="mb-2 text-[11px] leading-snug text-fog">
            Row {i + 1} — keep scrolling; a way back appears.
          </p>
        ))}
      </div>
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            onClick={(e) => (e.currentTarget.parentElement!.querySelector(':scope > div') as HTMLDivElement)?.scrollTo({ top: 0, behavior: 'smooth' })}
            className="absolute bottom-8 right-8 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-black shadow-lg"
          >
            ↑ Top
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── family set 2: scroll-region companions ─────────────────────────── */

/** Back-to-top FAB — its own progress ring fills with scroll; full ring = one hop home. */
export function BackToTopFabInner() {
  const [p, setP] = useState(0)
  const R = 17
  const C = 2 * Math.PI * R
  return (
    <div className="relative w-52 p-6">
      <div
        onScroll={(e) => {
          const el = e.currentTarget
          setP(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
        }}
        className="h-28 overflow-y-auto rounded-xl border border-line p-3"
      >
        {Array.from({ length: 14 }, (_, i) => (
          <p key={i} className="mb-2 text-[11px] leading-snug text-fog">
            Tidbit {i + 1} — ring fills as you descend.
          </p>
        ))}
      </div>
      <button
        onClick={(e) => (e.currentTarget.parentElement!.querySelector(':scope > div') as HTMLDivElement)?.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="absolute bottom-8 right-8 grid h-11 w-11 place-items-center rounded-full bg-white font-bold text-black shadow-xl"
      >
        <svg viewBox="0 0 40 40" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="20" cy="20" r={R} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="3" />
          <circle cx="20" cy="20" r={R} fill="none" stroke="#0a0a12" strokeWidth="3" strokeDasharray={C} strokeDashoffset={C * (1 - p)} strokeLinecap="round" />
        </svg>
        ↑
      </button>
    </div>
  )
}

/** Scroll progress mini — hairline bar pinned to the region top, pure onScroll-driven width. */
export function ScrollProgressMini() {
  const [p, setP] = useState(0)
  return (
    <div className="relative h-28 w-52 overflow-hidden rounded-xl border border-line m-6">
      <div className="absolute inset-x-0 top-0 z-10 h-0.5 bg-white/10">
        <div className="h-full bg-white transition-[width] duration-75" style={{ width: `${p * 100}%` }} />
      </div>
      <div
        onScroll={(e) => {
          const el = e.currentTarget
          setP(el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight))
        }}
        className="h-full overflow-y-auto p-3 pt-4"
      >
        {Array.from({ length: 13 }, (_, i) => (
          <p key={i} className="mb-2 text-[11px] leading-snug text-fog">
            Chapter {i + 1} — the rail above is your page-through.
          </p>
        ))}
      </div>
    </div>
  )
}

/** Shrinking navbar — type and height deflate past 40px; the logo survives condensed. */
export function NavbarShrinkMini() {
  const [small, setSmall] = useState(false)
  return (
    <div className="h-28 w-56 overflow-y-auto rounded-xl border border-line">
      <div
        className={`sticky top-0 z-10 flex items-end justify-between bg-void/90 px-3 backdrop-blur transition-all duration-300 ${
          small ? 'h-9 border-b border-line' : 'h-14 border-b border-transparent'
        }`}
      >
        <span className={`font-bold text-white transition-all ${small ? 'text-xs pb-1.5' : 'text-base pb-2'}`}>registry</span>
        <span className={`font-mono text-fog transition-all ${small ? 'pb-1.5 text-[8px]' : 'pb-2 text-[9px]'}`}>44 entries</span>
      </div>
      <div className="p-3">
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i} className="mb-2 text-[11px] leading-snug text-fog">
            Entry {i + 1} — scroll; title condenses when space gets dear.
          </p>
        ))}
      </div>
    </div>
  )
}

const CHIPS = ['All', 'Unread', 'Flagged', 'Done']

/** Sticky chip rail — filter chips pinned to the region top over flowing rows. */
export function StickyChipMini() {
  const [chip, setChip] = useState(0)
  return (
    <div className="h-28 w-56 overflow-y-auto rounded-xl border border-line">
      <div className="sticky top-0 z-10 flex gap-1.5 bg-void/90 px-3 py-2 backdrop-blur">
        {CHIPS.map((c, i) => (
          <button key={c} onClick={() => setChip(i)} className={`rounded-full px-2.5 py-0.5 text-[10px] ${chip === i ? 'bg-white font-semibold text-black' : 'border border-white/15 text-fog'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="p-3">
        {Array.from({ length: 11 }, (_, i) => (
          <p key={i} className="mb-2 text-[11px] leading-snug text-fog">
            Row {i + 1} — chips stay above the stream, always one tap away.
          </p>
        ))}
      </div>
    </div>
  )
}
