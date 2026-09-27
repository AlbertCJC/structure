import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Submenu slide — hovering "More tools" slides a second menu out to the
 * right; both menus spring from their shared seam.
 */
export function SubmenuSlideMenu() {
  const [sub, setSub] = useState(false)
  return (
    <div className="relative p-6 pl-10">
      <div className="w-44 rounded-xl border border-white/15 bg-raised p-1.5 shadow-2xl">
        {['Duplicate', 'Rename'].map((t) => (
          <button key={t} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] text-mist hover:bg-white/5 hover:text-white">
            {t}
          </button>
        ))}
        <button onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)} className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[11px] text-fog hover:bg-white/5 hover:text-white">
          More tools ›
          <AnimatePresence>
            {sub && (
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ type: 'spring', stiffness: 430, damping: 28 }}
                className="absolute left-full top-2 ml-1 w-36 rounded-xl border border-white/15 bg-raised p-1.5 shadow-2xl"
              >
                {['Wrap fragment', 'Extract hook', 'Copy path'].map((t) => (
                  <button key={t} className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] text-mist hover:bg-white/5 hover:text-white">
                    {t}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  )
}

const CMDS = ['Open component…', 'Toggle MONO mode', 'Copy source of focused']

/**
 * Mini command — scale-y from the top edge like a curtain unrolling;
 * up/down arrows (or just hovering) move the selection pill.
 */
export function MiniCommandScale() {
  const [sel, setSel] = useState(0)
  return (
    <div className="p-6">
      <motion.div
        initial={{ scaleY: 0.6, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        style={{ originY: 0 }}
        className="w-60 rounded-xl border border-white/15 bg-raised shadow-2xl"
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') setSel((s) => (s + 1) % CMDS.length)
          if (e.key === 'ArrowUp') setSel((s) => (s + CMDS.length - 1) % CMDS.length)
        }}
        tabIndex={0}
      >
        <div className="border-b border-white/10 px-3 py-2 font-mono text-[10px] text-fog">⌘K — try ↑ ↓ here</div>
        {CMDS.map((c, i) => (
          <button key={c} onMouseEnter={() => setSel(i)} className={`block w-full px-3 py-2 text-left text-[11px] ${sel === i ? 'bg-white/10 text-white' : 'text-mist'}`}>
            {c}
          </button>
        ))}
      </motion.div>
    </div>
  )
}

/**
 * Avatar menu — click the avatar: the list staggers its items in from the
 * top with a slight overlapping fade (account-menu canon).
 */
export function AvatarMenuStagger() {
  const [open, setOpen] = useState(false)
  const items = ['Profile', 'Billing', 'Sign out']
  return (
    <div className="relative p-6">
      <button onClick={() => setOpen((o) => !o)} className="h-9 w-9 rounded-full bg-white text-center text-[11px] font-black leading-9 text-black">
        DK
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-6 top-16 z-10 w-40 rounded-xl border border-white/15 bg-raised p-1.5 shadow-2xl"
          >
            {items.map((t, i) => (
              <motion.button
                key={t}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', stiffness: 430, damping: 28 }}
                onClick={() => setOpen(false)}
                className="block w-full rounded-lg px-2.5 py-1.5 text-left text-[11px] text-mist hover:bg-white/5 hover:text-white"
              >
                {t}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const TIMES = ['Any time', 'Past week', 'Past day']

/**
 * Menu dot travel — a single radiogroup dot tracks the selected row via
 * layoutId so switching feels like one object traveling, not two toggles.
 */
export function MenuDotTravel() {
  const [sel, setSel] = useState(0)
  return (
    <div className="p-6">
      <div className="w-44 rounded-xl border border-white/15 bg-raised p-1.5 shadow-xl">
        {TIMES.map((t, i) => (
          <button key={t} onClick={() => setSel(i)} className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[11px] hover:bg-white/5">
            <span className="grid h-3 w-3 place-items-center rounded-full border border-white/30">
              {sel === i && <motion.span layoutId="menu-dot-v2" transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            <span className={sel === i ? 'text-white' : 'text-fog'}>{t}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
