import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Avatar detail popover — click the avatar; the card grows from THE BUTTON
 * (transform-origin top-left), selling spatial continuity.
 */
export function AvatarDetailPopover() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative p-6">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="h-10 w-10 rounded-full bg-white text-center font-black leading-10 text-black">
        MK
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -4 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            style={{ originX: 0, originY: 0 }}
            className="absolute left-6 top-[72px] z-10 w-52 rounded-xl border border-white/15 bg-raised p-3 shadow-2xl"
          >
            <p className="text-[12px] font-semibold text-white">Mika Kondo</p>
            <p className="text-[10px] text-fog">Design Engineer — online</p>
            <div className="mt-2 flex gap-1.5">
              <button className="flex-1 rounded-md bg-white px-2 py-1.5 text-[10px] font-semibold text-black">Message</button>
              <button onClick={() => setOpen(false)} className="rounded-md border border-white/15 px-2 py-1.5 text-[10px] text-mist">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Anchored confirm — the tiny yes/no popover points back at the trigger
 * with an arrow die; no full-modal gravity for a small question.
 */
export function AnchorConfirmPop() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative grid h-40 place-items-end justify-center p-4">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 430, damping: 26 }}
            style={{ originY: 1 }}
            className="absolute left-1/2 top-6 z-10 -translate-x-1/2"
          >
            <div className="rounded-lg border border-white/15 bg-raised p-2.5 shadow-xl">
              <p className="mb-1.5 whitespace-nowrap text-[11px] text-white">Remove filter?</p>
              <div className="flex gap-1.5">
                <button onClick={() => setOpen(false)} className="flex-1 rounded bg-white px-2 py-1 text-[10px] font-bold text-black">
                  Yes
                </button>
                <button onClick={() => setOpen(false)} className="rounded border border-white/20 px-2 py-1 text-[10px] text-mist">
                  No
                </button>
              </div>
            </div>
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/15 bg-raised" />
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((o) => !o)} aria-label="Remove filter" className="rounded-lg border border-white/15 bg-panel p-2.5 text-sm text-fog transition-colors hover:text-white">
        ⌫
      </button>
    </div>
  )
}

/**
 * Zoom chip — the thumbnail literally BECOMES the preview: layoutId hands
 * the element between chip and enlarged tile.
 */
export function ZoomChipOverlay() {
  const [zoom, setZoom] = useState(false)
  return (
    <div className="grid h-40 place-items-center p-4">
      <motion.button
        layoutId="zoom-chip-img"
        onClick={() => setZoom((z) => !z)}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
        className={`grid place-items-center rounded-xl border border-white/25 font-mono text-[10px] text-white shadow-xl ${zoom ? 'h-32 w-52' : 'h-14 w-20'}`}
        style={{ background: 'linear-gradient(140deg,#3d3d47,#15151d 65%)' }}
      >
        {zoom ? '1344 × 896 · click to shrink' : 'img.png'}
      </motion.button>
    </div>
  )
}

/**
 * Hover preview — links get a 400ms-armed preview card; fast mouse leaves
 * never see it and re-entering cancels the clock.
 */
export function HoverDelayPreview() {
  const [show, setShow] = useState(false)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return (
    <div className="relative p-6">
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        onMouseEnter={() => {
          timer.current = window.setTimeout(() => setShow(true), 400)
        }}
        onMouseLeave={() => {
          window.clearTimeout(timer.current)
          setShow(false)
        }}
        className="text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
      >
        @structura/grid
      </a>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
            className="absolute left-6 top-14 z-10 w-56 rounded-xl border border-white/15 bg-raised p-3 shadow-2xl"
          >
            <p className="text-[11px] font-semibold text-white">structura/grid</p>
            <p className="mt-0.5 text-[10px] leading-snug text-fog">388 animated components · content-visibility culling · zero runtime deps in cards.</p>
            <p className="mt-1.5 font-mono text-[9px] text-mist">updated 2h ago · MIT</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
