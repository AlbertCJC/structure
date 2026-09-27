import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Onboarding Spotlight — a dim layer covers the stage, and a "hole"
 * element (huge box-shadow trick) springs between target rects measured
 * via refs on each step change. The tooltip card rides along underneath.
 * Next/Finish advances the step machine; Done shows a recap chip.
 */
export function TourSpotlight() {
  const [step, setStep] = useState(0) // 0..2 = targets, 3 = done
  const [hole, setHole] = useState({ x: 0, y: 0, w: 0, h: 0 })
  const rootRef = useRef<HTMLDivElement>(null)
  const targets = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (step > 2) return
    const el = targets.current[step]
    const root = rootRef.current
    if (!el || !root) return
    const r = el.getBoundingClientRect()
    const rr = root.getBoundingClientRect()
    setHole({ x: r.left - rr.left - 6, y: r.top - rr.top - 6, w: r.width + 12, h: r.height + 12 })
  }, [step])

  const COPY = [
    { t: 'Search anything', d: '⌘K opens the fuzzy palette from anywhere.' },
    { t: 'Filter by motion', d: 'Facet pills stack: OR within, AND across.' },
    { t: 'Copy real code', d: 'Every card ships its true source file.' },
  ]

  return (
    <div ref={rootRef} className="relative flex h-full w-full flex-col p-5">
      <div className="flex items-center justify-between">
        <button ref={(el) => { targets.current[0] = el }} className="rounded-lg border border-line bg-panel px-3 py-2 text-[10px] text-mist">🔍 Search</button>
        <button ref={(el) => { targets.current[1] = el }} className="rounded-lg border border-line bg-panel px-3 py-2 text-[10px] text-mist">◐ Filters</button>
        <button ref={(el) => { targets.current[2] = el }} className="rounded-lg border border-line bg-panel px-3 py-2 text-[10px] text-mist">⧉ Copy</button>
      </div>

      <div className="mt-4 flex-1 rounded-xl border border-dashed border-white/10 p-3">
        <div className="mb-2 h-2 w-3/4 rounded-full bg-white/[0.07]" />
        <div className="mb-2 h-2 w-1/2 rounded-full bg-white/[0.05]" />
        <div className="h-2 w-2/3 rounded-full bg-white/[0.06]" />
      </div>

      <AnimatePresence>
        {step <= 2 && (
          <>
            {/* dim + hole */}
            <motion.div
              key="hole"
              className="absolute z-10 rounded-xl"
              animate={{ left: hole.x, top: hole.y, width: hole.w, height: hole.h }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              style={{ boxShadow: '0 0 0 999px rgba(3,3,8,0.72)' }}
            />
            <motion.div
              key="tip"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-4 left-1/2 z-20 w-56 -translate-x-1/2 rounded-xl border border-violet-400/30 bg-panel p-3 shadow-xl"
            >
              <p className="text-[11px] font-bold text-white">
                {step + 1}/3 · {COPY[step].t}
              </p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-fog">{COPY[step].d}</p>
              <button
                onClick={() => setStep((s) => s + 1)}
                className="mt-2 w-full rounded-lg bg-violet-500 py-1.5 text-[10px] font-bold text-white"
              >
                {step === 2 ? 'Finish' : 'Next →'}
              </button>
            </motion.div>
          </>
        )}
        {step === 3 && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 z-20 grid place-items-center">
            <div className="rounded-xl border border-lime-400/30 bg-panel px-5 py-3 text-center shadow-xl">
              <p className="text-xs font-bold text-lime-300">Tour complete ✓</p>
              <button onClick={() => setStep(0)} className="mt-1 font-mono text-[9px] text-fog hover:text-white">replay</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
