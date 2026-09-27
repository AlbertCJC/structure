import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/** Bracket hover — square brackets close in around the label like a code selection. */
export function BracketHoverLink() {
  return (
    <div className="p-6">
      <a href="#brackets" onClick={(e) => e.preventDefault()} className="group relative inline-flex items-center gap-2 px-4 py-2 font-mono text-sm text-white">
        <span className="translate-x-1 text-white/40 transition-transform duration-200 group-hover:translate-x-0 group-hover:text-white">[</span>
        components.dev
        <span className="-translate-x-1 text-white/40 transition-transform duration-200 group-hover:translate-x-0 group-hover:text-white">]</span>
      </a>
    </div>
  )
}

/** Arrow sweep — hovering sweeps an arrow under the text from left, text nudges right. */
export function ArrowSweepLink() {
  return (
    <div className="p-6">
      <a href="#sweep" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-0 text-sm font-medium text-white">
        <span className="w-0 -translate-x-2 overflow-hidden opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:opacity-100">→</span>
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">Read the changelog</span>
      </a>
    </div>
  )
}

/** Wipe underline — the rule draws itself left to right via origin-left scaleX. */
export function WipeUnderlineLink() {
  return (
    <div className="p-6">
      <a href="#wipe" onClick={(e) => e.preventDefault()} className="group relative text-sm text-white">
        About the library
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100" />
      </a>
    </div>
  )
}

/** External hint — hovering arms a 400ms timer before the "opens in new tab" chip shows. */
export function ExternalPopoverLink() {
  const [show, setShow] = useState(false)
  const timer = useRef<number | null>(null)
  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current) }, [])
  return (
    <div className="relative p-6">
      <a
        href="https://example.com"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => {
          timer.current = window.setTimeout(() => setShow(true), 400)
        }}
        onMouseLeave={() => {
          if (timer.current) window.clearTimeout(timer.current)
          setShow(false)
        }}
        className="text-sm font-medium text-white underline decoration-dotted decoration-white/40 underline-offset-4"
      >
        Astro docs ↗
      </a>
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 3, scale: 0.96 }}
            className="absolute left-16 top-2 whitespace-nowrap rounded-md bg-white px-2 py-1 font-mono text-[9px] font-semibold text-black"
          >
            opens in new tab
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
