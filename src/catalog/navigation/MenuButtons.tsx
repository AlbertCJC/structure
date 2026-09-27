import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Hamburger ⇄ X — three bars collapse: both outer bars rotate onto the
 * center line while the middle one fades out sideways.
 */
export function HamburgerXButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
      >
        <span className="relative block h-3.5 w-5">
          <motion.span className="absolute left-0 top-0 h-0.5 w-full bg-white" animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }} transition={{ type: 'spring', stiffness: 380, damping: 24 }} />
          <motion.span className="absolute left-0 top-[6.5px] h-0.5 w-full bg-white" initial={{ opacity: 1, x: 0 }} animate={{ opacity: open ? 0 : 1, x: open ? -8 : 0 }} transition={{ duration: 0.2 }} />
          <motion.span className="absolute left-0 top-[13px] h-0.5 w-full bg-white" animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }} transition={{ type: 'spring', stiffness: 380, damping: 24 }} />
        </span>
      </motion.button>
    </div>
  )
}

/**
 * Hamburger ⇄ back arrow — outer bars shrink to half width and rotate into
 * the arrowhead while the middle bar holds as the shaft.
 */
export function ArrowBackButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        aria-label="Back"
        onClick={() => setOpen((o) => !o)}
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
      >
        <span className="relative block h-3.5 w-5">
          <motion.span className="absolute left-0 top-0 h-0.5 bg-white" animate={{ width: open ? '55%' : '100%', rotate: open ? -38 : 0, y: open ? 2 : 0, x: open ? -1 : 0 }} transition={{ type: 'spring', stiffness: 380, damping: 24 }} style={{ originX: 0 }} />
          <motion.span className="absolute left-0 top-[6.5px] h-0.5 w-full bg-white" initial={{ opacity: 1 }} animate={{ opacity: 1 }} />
          <motion.span className="absolute left-0 top-[13px] h-0.5 bg-white" animate={{ width: open ? '55%' : '100%', rotate: open ? 38 : 0, y: open ? -2 : 0, x: open ? -1 : 0 }} transition={{ type: 'spring', stiffness: 380, damping: 24 }} style={{ originX: 0 }} />
        </span>
      </motion.button>
    </div>
  )
}

/**
 * Plus FAB — a "+" severed at exactly 45° reads as "×"; spin one symbol
 * instead of swapping two, and the morph feels mechanical.
 */
export function PlusRotateFab() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        aria-expanded={open}
        aria-label="Create"
        onClick={() => setOpen((o) => !o)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 20 }}
        whileTap={{ scale: 0.9 }}
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-medium text-black"
      >
        +
      </motion.button>
    </div>
  )
}

/**
 * Chevron cycle — label and chevron state stay in sync: the chevron flips
 * on X while the label swaps on the wait channel.
 */
export function ChevronCycleButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm text-white"
      >
        {open ? 'See less' : 'See more'}
        <motion.span animate={{ rotateX: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 350, damping: 24 }} className="inline-block">
          ⌄
        </motion.span>
      </button>
    </div>
  )
}
