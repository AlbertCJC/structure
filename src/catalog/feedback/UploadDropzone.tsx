import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type Phase = 'idle' | 'over' | 'uploading' | 'done'

/**
 * Upload Dropzone — hover simulates drag-over (border brightens, icon
 * lifts), clicking starts a simulated transfer: the ring fills on a
 * spring-chased percentage, then the whole zone morphs into a success
 * state before resetting.
 */
export function UploadDropzone() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [pct, setPct] = useState(0)

  const start = () => {
    if (phase === 'uploading' || phase === 'done') return
    setPhase('uploading')
    setPct(0)
    const iv = window.setInterval(() => {
      setPct((v) => {
        const next = Math.min(100, v + 4 + Math.random() * 5)
        if (next >= 100) {
          window.clearInterval(iv)
          setPhase('done')
          window.setTimeout(() => setPhase('idle'), 1800)
        }
        return next
      })
    }, 80)
  }

  return (
    <div className="p-6">
      <motion.button
        onClick={start}
        onMouseEnter={() => phase === 'idle' && setPhase('over')}
        onMouseLeave={() => phase === 'over' && setPhase('idle')}
        animate={{
          borderColor: phase === 'over' ? 'rgba(139,92,246,0.7)' : phase === 'done' ? 'rgba(163,230,53,0.6)' : 'rgba(255,255,255,0.18)',
          backgroundColor: phase === 'over' ? 'rgba(139,92,246,0.06)' : 'rgba(255,255,255,0.02)',
        }}
        className="relative w-56 rounded-2xl border-2 border-dashed p-5"
      >
        <AnimatePresence mode="wait">
          {phase === 'done' ? (
            <motion.span key="ok" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-1.5">
              <span className="text-2xl text-lime-300">✓</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300">uploaded</span>
            </motion.span>
          ) : phase === 'uploading' ? (
            <motion.span key="up" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2.5">
              <svg viewBox="0 0 40 40" className="h-10 w-10 -rotate-90">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <motion.circle
                  cx="20" cy="20" r="16" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 16}
                  // seed the full-offset start so the spring never begins "from undefined"
                  style={{ strokeDashoffset: 2 * Math.PI * 16 }}
                  initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - pct / 100) }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </svg>
              <span className="font-mono text-[10px] text-mist">{Math.round(pct)}%</span>
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: phase === 'over' ? -3 : 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-2xl">⇪</span>
              <span className="text-xs font-medium text-mist">{phase === 'over' ? 'Release to drop' : 'Drop file or click'}</span>
              <span className="font-mono text-[9px] text-fog">PNG · up to 5MB</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
