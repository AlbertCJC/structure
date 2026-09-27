import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Syncing chip — the arrow rotates while syncing, then converts to a check.
 * Click flips intent; the label cross-fades on the wait channel.
 */
export function SyncingStatusChip() {
  const [syncing, setSyncing] = useState(true)
  return (
    <div className="p-6">
      <button onClick={() => setSyncing((s) => !s)} className="flex items-center gap-2 rounded-full border border-white/15 bg-panel px-3.5 py-1.5 text-[11px] text-white">
        <AnimatePresence mode="wait" initial={false}>
          {syncing ? (
            <motion.span key="spin" exit={{ opacity: 0, scale: 0.5 }} className="inline-block animate-spin [animation-duration:1.2s]">
              ↻
            </motion.span>
          ) : (
            <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
              ✓
            </motion.span>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={syncing ? 'a' : 'b'} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.16 }}>
            {syncing ? 'syncing…' : 'synced just now'}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  )
}

const STAGES = ['queued', 'building', 'deploying', 'live']

/**
 * Build stages — a CI chip that cycles its stage every 2s; each stage word
 * pops in while the background warms toward solid on "live".
 */
export function BuildStageChip() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = window.setInterval(() => setI((x) => (x + 1) % STAGES.length), 2000)
    return () => window.clearInterval(t)
  }, [])
  const live = STAGES[i] === 'live'
  return (
    <div className="p-6">
      <div className={`flex w-40 items-center gap-2.5 rounded-full border px-3.5 py-1.5 transition-colors duration-300 ${live ? 'border-white bg-white' : 'border-white/15 bg-panel'}`}>
        <span className="relative flex h-2 w-2">
          <motion.span initial={{ opacity: 1 }} animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 1, repeat: live ? 0 : Infinity }} className={`h-2 w-2 rounded-full ${live ? 'bg-black' : 'bg-white'}`} />
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={STAGES[i]} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} transition={{ duration: 0.18 }} className={`font-mono text-[11px] ${live ? 'font-bold text-black' : 'text-white'}`}>
            {STAGES[i]}
          </motion.span>
        </AnimatePresence>
        <span className={`ml-auto font-mono text-[9px] ${live ? 'text-black/60' : 'text-fog'}`}>47s</span>
      </div>
    </div>
  )
}

/**
 * Presence dot — breathes when online (opacity drift 60→100%), frozen gray
 * when busy. Toggle to see both.
 */
export function PresenceDotUser() {
  const [online, setOnline] = useState(true)
  return (
    <button onClick={() => setOnline((o) => !o)} className="m-6 flex w-52 items-center gap-3 rounded-xl border border-white/12 bg-panel px-3.5 py-2.5 text-left transition-colors hover:border-white/25">
      <span className="relative">
        <span className="block h-9 w-9 rounded-full bg-white/15 text-center text-sm font-bold leading-9 text-white">AN</span>
        <motion.span
          initial={{ opacity: 0.6 }} animate={online ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
          transition={online ? { duration: 2, repeat: Infinity } : { duration: 0.2 }}
          className={`absolute -bottom-px -right-px h-3 w-3 rounded-full border-2 border-panel ${online ? 'bg-white' : 'bg-white/30'}`}
        />
      </span>
      <span>
        <span className="block text-[12px] font-medium text-white">Aya Nakamura</span>
        <span className="block text-[10px] text-fog">{online ? 'Active now' : 'Focus mode'}</span>
      </span>
    </button>
  )
}

/**
 * Battery chip — the fill grows and the cap keeps pace; % drifts upward on
 * a timer so the chip feels instrumented.
 */
export function BatteryFillChip() {
  const [n, setN] = useState(30)
  useEffect(() => {
    const t = window.setInterval(() => setN((x) => (x >= 96 ? 24 : x + 12)), 1400)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-panel px-3 py-1.5">
        <svg viewBox="0 0 28 12" className="h-3.5 w-7">
          <rect x="0.5" y="0.5" width="24" height="11" rx="2.5" fill="none" stroke="#ffffff60" />
          <rect x="25.5" y="3.5" width="2" height="5" rx="1" fill="#ffffff60" />
          <motion.rect x={2.5} y={2.5} height={7} rx={1.5} fill="#fff" initial={{ width: 6 }} animate={{ width: (n / 100) * 20 }} transition={{ type: 'spring', stiffness: 200, damping: 24 }} />
        </svg>
        <span className="w-8 font-mono text-[11px] text-white">{n}%</span>
      </div>
    </div>
  )
}
