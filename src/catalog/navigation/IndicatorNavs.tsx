import { useId, useState } from 'react'
import { motion } from 'framer-motion'

const FLOORS = ['5', '4', '3', '2', '1']

/**
 * Elevator floors — a white cabin knob rides behind the active floor on a
 * layoutId spring, scoped per instance with useId (card + modal can never
 * teleport the knob between each other).
 */
export function ElevatorFloorNav() {
  const [floor, setFloor] = useState(2)
  const uid = useId()
  return (
    <div className="flex gap-1 p-6">
      {FLOORS.map((f, i) => (
        <button key={f} onClick={() => setFloor(i)} className="relative h-9 w-10 text-sm">
          {floor === i && (
            <motion.span
              layoutId={`cab-${uid}`}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              className="absolute inset-0 rounded-lg bg-white"
            />
          )}
          <span className={`relative ${floor === i ? 'font-bold text-black' : 'text-fog'}`}>{f}</span>
        </button>
      ))}
    </div>
  )
}

const DOT_TABS = ['Feed', 'Live', 'Saved']

/**
 * Growing dot tabs — the active tab rests on a dot that stretches into a
 * pill as it travels (layoutId morphs both position and width).
 */
export function GrowingDotTabs() {
  const [active, setActive] = useState(0)
  const uid = useId()
  return (
    <div className="flex gap-6 p-6">
      {DOT_TABS.map((t, i) => (
        <button key={t} onClick={() => setActive(i)} className="relative pb-2.5 text-sm">
          <span className={active === i ? 'font-semibold text-white' : 'text-fog'}>{t}</span>
          {active === i && (
            <motion.span
              layoutId={`dot-${uid}`}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute -bottom-0.5 left-1/2 h-1.5 w-6 -translate-x-1/2 rounded-full bg-white"
            />
          )}
        </button>
      ))}
    </div>
  )
}

/**
 * Arrow chase — station-list treatment: the arrow slips in from the left
 * while the row text makes room. Pure CSS group-hover.
 */
export function ArrowChaseLink() {
  return (
    <div className="w-52 space-y-1 p-6">
      {['Changelog', 'Roadmap', 'Status'].map((t) => (
        <a key={t} href="#" onClick={(e) => e.preventDefault()} className="group relative flex h-9 items-center rounded-lg px-2 text-sm text-mist transition-colors hover:bg-white/5 hover:text-white">
          <span className="absolute left-2 -translate-x-3 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">→</span>
          <span className="transition-transform duration-200 group-hover:translate-x-5">{t}</span>
        </a>
      ))}
    </div>
  )
}

const BRACKET_ITEMS = ['Work', 'Studio', 'Contact']

/**
 * Bracket hover — square brackets tighten around the label on hover,
 * sliding in from outside. Terminal-flavored, CSS only.
 */
export function BracketHoverNav() {
  return (
    <div className="flex gap-7 p-6">
      {BRACKET_ITEMS.map((t) => (
        <a key={t} href="#" onClick={(e) => e.preventDefault()} className="group relative px-3 py-1 font-mono text-sm text-white">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">[</span>
          {t}
          <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">]</span>
        </a>
      ))}
    </div>
  )
}
