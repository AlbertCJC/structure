import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = ['Upload', 'Scan', 'Index']

/**
 * Step Progress Feedback — an interval advances the pipeline; the bar
 * fills in thirds (spring per segment) and each icon crossfades to a
 * check as its stage completes. Loops so the demo stays alive.
 */
export function ProgressSteps() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const iv = window.setInterval(() => setStep((s) => (s + 1) % 4), 1300)
    return () => window.clearInterval(iv)
  }, [])

  return (
    <div className="w-full max-w-[240px] p-4">
      <div className="mb-4 flex justify-between">
        {STEPS.map((s, i) => {
          const done = step > i
          return (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <motion.span
                animate={{
                  backgroundColor: done ? 'rgba(163,230,53,0.15)' : 'rgba(255,255,255,0.05)',
                  borderColor: done ? 'rgba(163,230,53,0.6)' : 'rgba(255,255,255,0.12)',
                  scale: step === i + 1 ? [1, 1.15, 1] : 1,
                }}
                transition={{ duration: 0.35 }}
                className="grid h-8 w-8 place-items-center rounded-full border text-[11px]"
              >
                {done ? <span className="text-lime-300">✓</span> : <span className="text-fog">{i + 1}</span>}
              </motion.span>
              <span className={`font-mono text-[9px] uppercase tracking-wider ${done ? 'text-lime-300' : 'text-fog'}`}>{s}</span>
            </div>
          )
        })}
      </div>

      <div className="flex gap-1">
        {STEPS.map((_, i) => (
          <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-lime-400 to-emerald-400"
              animate={{ scaleX: step > i ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
