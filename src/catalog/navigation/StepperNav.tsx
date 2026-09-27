import { useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = ['Cart', 'Shipping', 'Payment']

/**
 * Animated Stepper — connectors are motion.divs whose scaleX fills 0→1
 * when the step behind them completes; nodes draw a check via pathLength
 * when passed. Next/Back buttons drive the state machine; the active node
 * carries a pulsing ring.
 */
export function StepperNav() {
  const [step, setStep] = useState(1)

  return (
    <div className="flex w-full max-w-[270px] flex-col items-center gap-7 p-4">
      <div className="flex w-full items-center">
        {STEPS.map((label, i) => {
          const done = i < step
          const active = i === step
          return (
            <div key={label} className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}>
              <div className="relative grid h-9 w-9 shrink-0 place-items-center">
                {active && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    animate={{ boxShadow: ['0 0 0 2px rgba(139,92,246,0.5)', '0 0 0 6px rgba(139,92,246,0.12)', '0 0 0 2px rgba(139,92,246,0.5)'] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                )}
                <div
                  className={`grid h-9 w-9 place-items-center rounded-full border text-xs font-bold transition-colors duration-300 ${
                    done ? 'border-violet-400 bg-violet-500 text-white' : active ? 'border-violet-400 bg-surface text-violet-300' : 'border-white/15 bg-surface text-fog'
                  }`}
                >
                  {done ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
                      <motion.path d="M5 12l5 5 9-10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.35 }} />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-1.5 h-0.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full origin-left bg-violet-400"
                    animate={{ scaleX: done ? 1 : 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-lg border border-line px-4 py-2 text-xs text-mist transition hover:text-white">
          Back
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fog">{STEPS[step]}</span>
        <button onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))} className="rounded-lg bg-violet-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-violet-400">
          Next
        </button>
      </div>
    </div>
  )
}
