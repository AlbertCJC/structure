import { useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'

const TRAVEL = 116 // 224 track - 16 padding - 92 handle

/**
 * Slide-to-Unlock Switch.
 *
 * Commit logic mirrors the elastic toggle but with an AUTHORIZATION GATE:
 * the projected position must pass 70% of the travel to unlock — a timid
 * drag always springs back, a confident flick fires the ACCESS GRANTED
 * flash (a lime wash that decays over 0.8s). The handle is constrained to
 * the track (dragConstraints 0..TRAVEL, elastic 0.05) and the success
 * state re-animates the same x target through the spring, so unlock and
 * lock-out share one motion system.
 */
export function CyberUnlockSwitch() {
  const [unlocked, setUnlocked] = useState(false)
  const [dragging, setDragging] = useState(false)

  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false)
    const projected = info.offset.x + info.velocity.x / 10
    setUnlocked(projected > TRAVEL * 0.7)
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={`relative h-14 w-56 overflow-hidden rounded-xl border transition-colors duration-300 ${
          unlocked ? 'border-lime-400/60' : 'border-cyan-500/30'
        }`}
        style={{ background: 'linear-gradient(135deg, #0a0f1a, #0d1526)' }}
      >
        {/* scanline texture */}
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: 'repeating-linear-gradient(0deg, transparent 0 2px, rgba(34,211,238,0.35) 2px 3px)' }}
        />
        {/* hazard target zone */}
        <div
          className="absolute bottom-1 right-1 top-1 w-9 rounded-md opacity-40"
          style={{ background: 'repeating-linear-gradient(45deg, #a3e635 0 6px, transparent 6px 12px)' }}
        />

        <span
          className={`absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.3em] transition-colors ${
            unlocked ? 'text-lime-300' : 'text-cyan-300/60'
          }`}
        >
          {unlocked ? 'ACCESS · GRANTED' : 'AUTH · REQUIRED'}
        </span>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: TRAVEL }}
          dragElastic={0.05}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          animate={{ x: unlocked ? TRAVEL : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className={`absolute left-1 top-1 flex h-12 w-[92px] cursor-grab items-center justify-center rounded-lg border font-mono text-[10px] tracking-[0.25em] active:cursor-grabbing ${
            unlocked
              ? 'border-lime-400/70 bg-[#0f1f12] text-lime-300'
              : 'border-white/20 bg-raise text-cyan-200/80'
          }`}
        >
          {dragging ? '···' : unlocked ? '✓ OPEN' : 'SLIDE ⟶'}
        </motion.div>

        <AnimatePresence>
          {unlocked && (
            <motion.div
              key="flash"
              className="pointer-events-none absolute inset-0 bg-lime-400/30"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        {unlocked ? 'flick left to re-lock' : 'flick the handle to the end'}
      </span>
    </div>
  )
}
