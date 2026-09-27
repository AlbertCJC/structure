import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STEPS = ['Invite lands in their inbox', 'They pick a display name', 'They join your workspace']

/**
 * Chain popover — a three-step explainer that swaps content in place with
 * a directional slide; progress dots keep the chain honest.
 */
export function ChainStepPopover() {
  const [i, setI] = useState(0)
  return (
    <div className="p-6">
      <div className="w-56 overflow-hidden rounded-xl border border-white/15 bg-raised shadow-xl">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="px-3.5 py-3"
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-fog">step {i + 1} / {STEPS.length}</p>
            <p className="mt-1 text-[12px] text-white">{STEPS[i]}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center justify-between border-t border-white/10 px-3.5 py-2">
          <div className="flex gap-1">
            {STEPS.map((_, s) => (
              <span key={s} className={`h-1.5 rounded-full transition-all duration-300 ${s === i ? 'w-4 bg-white' : 'w-1.5 bg-white/25'}`} />
            ))}
          </div>
          <button onClick={() => setI((x) => (x + 1) % STEPS.length)} className="text-[10px] font-semibold text-white hover:underline">
            {i === STEPS.length - 1 ? 'restart' : 'next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

const EMOJI = ['👍', '🔥', '🫡', '🎉']

/**
 * Reaction fly — click the bubble’s + and the emoji rail lifts out; picking
 * one flies the emoji INTO the message's reaction tray.
 */
export function ReactionFlyPicker() {
  const [rail, setRail] = useState(false)
  const [picked, setPicked] = useState<string[]>([])
  return (
    <div className="relative p-6">
      <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/12 bg-panel px-3 py-2">
        <span className="text-[11px] text-white">spy audit is green ✅</span>
        <button onClick={() => setRail((r) => !r)} aria-label="Add reaction" className="ml-1 grid h-5 w-5 place-items-center rounded-full border border-white/20 text-[10px] text-fog hover:text-white">
          +
        </button>
      </div>
      <div className="ml-2 mt-1 flex gap-1">
        <AnimatePresence>
          {picked.map((e, i) => (
            <motion.span key={`${e}-${i}`} layout initial={{ scale: 0, y: -8 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 22 }} className="rounded-full border border-white/20 bg-white/5 px-1.5 py-0.5 text-[10px]">
              {e}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {rail && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 430, damping: 26 }}
            className="absolute left-[88px] top-4 flex gap-1 rounded-full border border-white/15 bg-raised px-2 py-1 shadow-xl"
          >
            {EMOJI.map((e) => (
              <motion.button
                key={e}
                whileHover={{ scale: 1.25, y: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setPicked((p) => [...p, e])
                  setRail(false)
                }}
                className="text-sm"
              >
                {e}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Share anchor — the popover is anchored to its share trigger; copying
 * turns the row into a ✓ confirmation inside the SAME popover.
 */
export function ShareCopyAnchor() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative p-6">
      <button
        onClick={() => {
          setOpen((o) => !o)
          setCopied(false)
        }}
        className="rounded-lg border border-white/20 px-3.5 py-1.5 text-[11px] text-white hover:bg-white/5"
      >
        Share ↗
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="absolute left-6 top-16 z-10 w-56 rounded-xl border border-white/15 bg-raised p-2 shadow-2xl"
          >
            <button
              onClick={() => {
                navigator.clipboard?.writeText('https://structura.dev/share/x2').catch(() => {})
                setCopied(true)
                window.setTimeout(() => setCopied(false), 1600)
              }}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-[11px] hover:bg-white/5"
            >
              <span className={copied ? 'text-white' : 'text-mist'}>{copied ? '✓ Copied to clipboard' : 'Copy link'}</span>
              <span className="font-mono text-[9px] text-fog">structura.dev/x2</span>
            </button>
            <button className="block w-full rounded-lg px-2.5 py-2 text-left text-[11px] text-mist hover:bg-white/5 hover:text-white">Invite by email…</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Tour ring tip — a pulsing ring targets the feature while its tip reads
 * alongside; Next slides the tip between anchor points.
 */
export function TourRingTip() {
  const [step, setStep] = useState(0)
  const anchors = [
    { left: 24, top: 24, text: '1 · Your projects live here' },
    { left: 150, top: 60, text: '2 · Drag to reorder — springs do the rest' },
  ]
  const a = anchors[step]
  return (
    <div className="relative h-40 rounded-xl border border-white/10 m-4 p-3">
      <div className="absolute left-5 top-4 h-9 w-16 rounded-lg border border-white/15 bg-panel" />
      <div className="absolute left-[150px] top-[58px] h-8 w-24 rounded-lg border border-white/15 bg-panel" />
      <motion.div animate={{ left: a.left - 6, top: a.top - 6 }} transition={{ type: 'spring', stiffness: 240, damping: 24 }} className="absolute">
        <motion.span
          initial={{ scale: 1, opacity: 0.9 }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.9, 0.4, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="block h-[76px] w-[92px] rounded-xl border-2 border-white"
          style={{ width: step === 0 ? 76 : 112, height: step === 0 ? 48 : 44 }}
        />
      </motion.div>
      <motion.div animate={{ left: a.left, top: a.top + (step === 0 ? 52 : 50) }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} className="absolute z-10 w-44 rounded-lg border border-white/20 bg-raised px-2.5 py-2 shadow-xl">
        <p className="text-[10px] text-white">{a.text}</p>
        <button onClick={() => setStep((s) => (s + 1) % anchors.length)} className="mt-1 text-[9px] font-bold text-white underline underline-offset-2">
          {step === 0 ? 'next' : 'done'} →
        </button>
      </motion.div>
    </div>
  )
}
