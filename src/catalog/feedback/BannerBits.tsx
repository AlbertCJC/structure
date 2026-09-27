import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Sticky announce — slides down on mount, dismiss springs it away. Borders
 * instead of fills keep it calm inside a dark page.
 */
export function StickyAnnounceBar() {
  const [show, setShow] = useState(true)
  return (
    <div className="grid h-32 content-start p-4">
      {!show && (
        <button onClick={() => setShow(true)} className="justify-self-center rounded-full border border-white/20 px-3 py-1 text-[11px] text-fog hover:text-white">
          show banner
        </button>
      )}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 27 }}
            className="flex w-60 items-center justify-between rounded-lg border border-white/15 bg-raised px-3 py-2 text-[11px] text-white"
          >
            <span>
              <span className="mr-1.5 rounded-full bg-white px-1.5 py-px font-mono text-[8px] font-bold text-black">NEW</span>
              Structura v3 is live
            </span>
            <button aria-label="Dismiss" onClick={() => setShow(false)} className="text-fog hover:text-white">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Offline banner — toggle signals the connection; the amber-striped warning
 * slides down and becomes a quiet "back online" flash on recovery.
 */
export function OfflineWarningBanner() {
  const [offline, setOffline] = useState(false)
  const [flash, setFlash] = useState(false)
  return (
    <div className="relative h-36 p-4">
      <div className="absolute right-4 top-4">
        <button onClick={() => { setOffline((o) => !o); if (offline) { setFlash(true); window.setTimeout(() => setFlash(false), 1800) } }} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-white hover:bg-white/5">
          {offline ? 'Reconnect' : 'Go offline'}
        </button>
      </div>
      <AnimatePresence>
        {offline && (
          <motion.div key="off" initial={{ y: -44 }} animate={{ y: 0 }} exit={{ y: -44 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} className="flex w-60 items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-400/10 px-3 py-2 text-[11px] text-amber-200">
            ⚠ You’re offline — changes will queue locally
          </motion.div>
        )}
        {flash && !offline && (
          <motion.div key="on" initial={{ y: -44, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="flex w-60 items-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-[11px] text-mist">
            ✓ Back online — 3 queued changes sent
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Promo entry — the banner slides in, THEN the offer text scrolls through
 * on a marquee loop. Staged timing: container first, content second.
 */
export function PromoEntryBanner() {
  const [show, setShow] = useState(true)
  return (
    <div className="grid h-28 content-center justify-items-center p-4">
      {!show ? (
        <button onClick={() => setShow(true)} className="rounded-full border border-white/20 px-3 py-1 text-[11px] text-fog hover:text-white">
          show promo
        </button>
      ) : (
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ type: 'spring', stiffness: 240, damping: 24 }} className="w-60 origin-center overflow-hidden rounded-lg border border-white/15 bg-panel">
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="flex w-max whitespace-nowrap px-3 py-2 text-[11px] font-medium text-white">
            <span className="pr-6">✦ PRO comes with every component · 50% this week </span>
            <span className="pr-6">✦ PRO comes with every component · 50% this week </span>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

/**
 * Cookie mini — bottom-right notice; after Accept it collapses into a quiet
 * status chip instead of vanishing awkwardly.
 */
export function CookieAcceptBanner() {
  const [state, setState] = useState<'ask' | 'done'>('ask')
  return (
    <div className="grid h-36 place-items-end p-4">
      <AnimatePresence mode="wait">
        {state === 'ask' ? (
          <motion.div key="ask" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ type: 'spring', stiffness: 360, damping: 28 }} className="w-56 rounded-xl border border-white/15 bg-raised p-3 shadow-xl">
            <p className="text-[11px] leading-snug text-mist">We use one cookie — the one that remembers you said no to the others.</p>
            <div className="mt-2 flex gap-1.5">
              <button onClick={() => setState('done')} className="flex-1 rounded-md bg-white px-2 py-1.5 text-[11px] font-semibold text-black">
                Accept
              </button>
              <button onClick={() => setState('done')} className="rounded-md border border-white/15 px-2 py-1.5 text-[11px] text-fog hover:text-white">
                Decline
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button key="chip" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={() => setState('ask')} className="rounded-full border border-white/15 bg-raised px-3 py-1 text-[10px] text-mist">
            cookies set ✓ · reopen
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
