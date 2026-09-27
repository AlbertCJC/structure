import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Wobble arrow — the tooltip rises on a spring and its arrow arrives
 * 60ms late with its own overshoot, like the tail catching up with the dog.
 */
export function WobbleArrowTooltip() {
  const [on, setOn] = useState(false)
  return (
    <div className="grid h-36 place-items-center p-4">
      <div className="relative" onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-sm text-white">?</button>
        <AnimatePresence>
          {on && (
            <div className="absolute -top-11 left-1/2 -translate-x-1/2">
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ type: 'spring', stiffness: 430, damping: 22 }}
                className="whitespace-nowrap rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-black"
              >
                Sorts by tap velocity
              </motion.div>
              <motion.span
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 16, delay: 0.06 }}
                className="absolute -bottom-[3px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-white"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Pinned tip — hover previews, CLICK pins: the tip stays open (pin icon
 * appears) until clicked away. Two interaction depths on one anchor.
 */
export function PinnedTipToggle() {
  const [pinned, setPinned] = useState(false)
  const [hover, setHover] = useState(false)
  const show = pinned || hover
  return (
    <div className="grid h-36 place-items-center p-4">
      <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <button onClick={() => setPinned((p) => !p)} className="rounded-lg border border-white/15 bg-panel px-3.5 py-2 text-[11px] text-white">
          usage: 68%
        </button>
        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-12 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-md border border-white/15 bg-raised px-2.5 py-1.5 text-[10px] text-white shadow-xl"
            >
              monthly transfer budget
              <button onClick={() => setPinned((p) => !p)} className={pinned ? 'text-white' : 'text-fog'} aria-label="Pin tip">
                {pinned ? '⌂' : '⌄'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Cursor tip — the tooltip follows the pointer around the region with a
 * soft trail (spring on x/y motion values, zero rerenders per move).
 */
export function CursorFollowTip() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  return (
    <div className="p-6">
      <div
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
        }}
        onPointerLeave={() => setPos(null)}
        className="relative h-24 w-56 cursor-help rounded-xl border border-dashed border-white/20"
      >
        <span className="absolute left-2.5 top-2 font-mono text-[9px] uppercase tracking-widest text-fog">inspect zone</span>
        {pos && (
          <motion.div
            animate={{ x: pos.x + 12, y: pos.y - 26 }}
            transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.6 }}
            className="pointer-events-none absolute left-0 top-0 rounded-md bg-white px-2 py-0.5 text-[9px] font-semibold text-black"
          >
            x{Math.round(pos.x)} y{Math.round(pos.y)}
          </motion.div>
        )}
      </div>
    </div>
  )
}

/**
 * Hold hint — you must hover a full second before the explanation appears;
 * quick glances stay clean. Timer cancels on leave, like it should.
 */
export function HoldHintDot() {
  const [show, setShow] = useState(false)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <div className="relative p-6">
      <button
        onMouseEnter={() => {
          timer.current = window.setTimeout(() => setShow(true), 1000)
        }}
        onMouseLeave={() => {
          window.clearTimeout(timer.current)
          setShow(false)
        }}
        className="flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-mist"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-white/40" />
          <span className="h-2 w-2 rounded-full bg-white" />
        </span>
        experimental
      </button>
      <AnimatePresence>
        {show && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-6 top-16 w-52 rounded-lg border border-white/15 bg-raised p-2.5 text-[10px] leading-snug text-mist shadow-xl"
          >
            Hold-hints reward commitment: they only show after 1s of intentional hover.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
