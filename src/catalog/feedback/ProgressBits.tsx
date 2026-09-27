import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const RUNS = [
  { label: 'parse', to: 60, d: 0 },
  { label: 'analyze', to: 85, d: 0.15 },
  { label: 'publish', to: 100, d: 0.3 },
]

/**
 * Multi-bar progress — one click kicks three pipelines; each bar chases its
 * own target on a slight delay so the set reads as orchestrated, not synced.
 */
export function MultiBarProgress() {
  const [run, setRun] = useState(0)
  return (
    <div className="w-60 space-y-2.5 p-6">
      {RUNS.map((r) => (
        <div key={r.label}>
          <div className="mb-1 flex justify-between font-mono text-[9px] uppercase tracking-widest text-fog">
            <span>{r.label}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: run ? `${r.to}%` : '0%' }}
              transition={{ type: 'spring', stiffness: 120, damping: 22, delay: r.d }}
            />
          </div>
        </div>
      ))}
      <button onClick={() => setRun((r) => r + 1)} className="mt-1 rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5">
        Run pipeline
      </button>
    </div>
  )
}

const POINTS = ['Cart', 'Details', 'Payment', 'Done']

/**
 * Checkpoint progress — a line of stops that fill left-to-right; Next
 * advances, Back retreats, the connector is a single animated div.
 */
export function CheckpointProgress() {
  const [step, setStep] = useState(1)
  return (
    <div className="p-6">
      <div className="relative flex w-56 justify-between">
        <div className="absolute left-3 right-3 top-[7px] h-px bg-white/15" />
        <motion.div className="absolute left-3 top-[7px] h-px bg-white" animate={{ width: `${((step - 1) / (POINTS.length - 1)) * 82}%` }} transition={{ type: 'spring', stiffness: 160, damping: 24 }} />
        {POINTS.map((p, i) => (
          <div key={p} className="relative z-10 flex w-6 flex-col items-center gap-1">
            <motion.span
              animate={{ backgroundColor: i < step ? '#ffffff' : '#0a0a12', borderColor: i < step ? '#ffffff' : '#ffffff40', scale: i === step - 1 ? 1.25 : 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              className="h-[15px] w-[15px] rounded-full border"
            />
            <span className={`text-[8px] font-mono ${i < step ? 'text-white' : 'text-fog'}`}>{p}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button disabled={step <= 1} onClick={() => setStep((s) => Math.max(1, s - 1))} className="rounded-md border border-white/15 px-2.5 py-1 text-[10px] text-fog disabled:opacity-30">
          Back
        </button>
        <button disabled={step >= POINTS.length} onClick={() => setStep((s) => Math.min(POINTS.length, s + 1))} className="rounded-md bg-white px-2.5 py-1 text-[10px] font-semibold text-black disabled:opacity-30">
          Next
        </button>
      </div>
    </div>
  )
}

/**
 * Countdown chip — 5→0 rolls digits vertically; at zero a ✓ lands with an
 * overshoot and the chip settles.
 */
export function CountdownStartChip() {
  const [n, setN] = useState<number | null>(null)
  const timer = useRef<number>(undefined)
  useEffect(() => () => window.clearInterval(timer.current), [])
  const start = () => {
    if (n !== null) return
    setN(5)
    timer.current = window.setInterval(() => {
      setN((x) => {
        if (x === null || x <= 1) {
          window.clearInterval(timer.current)
          window.setTimeout(() => setN(null), 1600)
          return 0
        }
        return x - 1
      })
    }, 800)
  }
  return (
    <div className="p-6">
      <button onClick={start} className="flex h-10 w-36 items-center justify-center gap-2 rounded-full border border-white/20 text-sm text-white transition hover:bg-white/5">
        {n === null ? (
          'Start export'
        ) : (
          <span className="relative h-5 w-5 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={n} initial={{ y: 14 }} animate={{ y: 0 }} exit={{ y: -14 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }} className="absolute inset-0 grid place-items-center font-mono text-[13px]">
                {n === 0 ? '✓' : n}
              </motion.span>
            </AnimatePresence>
          </span>
        )}
      </button>
    </div>
  )
}

/**
 * Indeterminate thinking — sliding dot loop for "no known ETA" work;
 * Cancel interrupts to a ✕ flash instead of leaving the UI lying.
 */
export function IndeterminateThinkingChip() {
  const [state, setState] = useState<'run' | 'cancel' | 'idle'>('idle')
  useEffect(() => {
    if (state === 'cancel') {
      const t = window.setTimeout(() => setState('idle'), 1500)
      return () => window.clearTimeout(t)
    }
  }, [state])
  return (
    <div className="p-6">
      {state === 'idle' ? (
        <button onClick={() => setState('run')} className="rounded-full border border-white/20 px-4 py-1.5 text-[11px] text-white hover:bg-white/5">
          Ask the model
        </button>
      ) : (
        <div className="flex h-9 w-44 items-center gap-2.5 overflow-hidden rounded-full border border-white/15 bg-panel px-3">
          <motion.span animate={{ x: state === 'cancel' ? 0 : [-4, 96, -4] }} transition={state === 'cancel' ? { duration: 0.2 } : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="text-[11px] text-mist">{state === 'cancel' ? '✕ cancelled' : 'thinking…'}</span>
          {state === 'run' && (
            <button onClick={() => setState('cancel')} className="ml-auto rounded-full border border-white/20 px-2 py-0.5 text-[9px] uppercase text-fog hover:text-white">
              esc
            </button>
          )}
        </div>
      )}
    </div>
  )
}
