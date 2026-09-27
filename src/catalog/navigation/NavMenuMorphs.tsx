import { useState } from 'react'
import { motion } from 'framer-motion'

/** (HamburgerXButton lives in MenuButtons.tsx — the sibling family file.) */

/** Hamburger ⇄ back arrow — the middle line inherits the arrow shaft. */
export function ArrowBackMorphButton() {
  const [back, setBack] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setBack((b) => !b)}
        aria-label={back ? 'Menu' : 'Back'}
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/15"
      >
        <span className="relative flex h-4 w-5 items-center">
          <motion.span
            className="absolute left-0 h-[2px] w-full rounded-full bg-white"
            animate={back ? { rotate: -38, width: 11, x: -2, y: -4 } : { rotate: 0, width: 20, x: 0, y: -7 }}
            transition={{ type: 'spring', stiffness: 480, damping: 26 }}
          />
          <motion.span className="h-[2px] w-full rounded-full bg-white" animate={back ? { width: 18, x: 1 } : { width: 20, x: 0 }} transition={{ type: 'spring', stiffness: 480, damping: 26 }} />
          <motion.span
            className="absolute left-0 h-[2px] w-full rounded-full bg-white"
            animate={back ? { rotate: 38, width: 11, x: -2, y: 4 } : { rotate: 0, width: 20, x: 0, y: 7 }}
            transition={{ type: 'spring', stiffness: 480, damping: 26 }}
          />
        </span>
      </motion.button>
    </div>
  )
}

/** Plus FAB — the cross spins 45° into an X AS the button rotates, two motions one spring. */
export function PlusCloseFabButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close actions' : 'Open actions'}
        animate={{
          rotate: open ? 225 : 0,
          backgroundColor: open ? '#ffffff' : 'rgba(255,255,255,0.06)',
          color: open ? '#0a0a12' : '#ffffff',
          borderColor: open ? '#ffffff' : 'rgba(255,255,255,0.15)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className="grid h-12 w-12 place-items-center rounded-full border text-xl font-light"
      >
        +
      </motion.button>
    </div>
  )
}

/** Kebab ⇄ rail — three dots slide into one continuous bar (emptied state cue). */
export function KebabRailButton() {
  const [rail, setRail] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setRail((r) => !r)}
        aria-label={rail ? 'Less options' : 'More options'}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-xl border border-white/15"
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-[3px] rounded-full bg-white"
            animate={rail ? { width: i === 1 ? 20 : 12, x: i === 1 ? 0 : i === 0 ? -4 : 4, y: 0 } : { width: 3, x: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 26, delay: i * 0.03 }}
          />
        ))}
      </motion.button>
    </div>
  )
}
