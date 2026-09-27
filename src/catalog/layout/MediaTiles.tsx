import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Slow zoom tile — background zooms gently on hover while the caption
 * tracks upward; gradients stand in for imagery (mono-friendly).
 */
export function SlowZoomTile() {
  return (
    <div className="p-6">
      <div className="group relative h-32 w-52 cursor-pointer overflow-hidden rounded-xl border border-white/12">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ background: 'linear-gradient(135deg,#3a3a44,#14141c 60%,#54545e)' }}
        />
        <div className="absolute inset-x-0 bottom-0 translate-y-1 bg-gradient-to-t from-black/70 to-transparent p-2.5 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-[11px] font-semibold text-white">Cebu, 6:04 AM</p>
          <p className="text-[9px] text-white/60">gradient stand-in · 2048px</p>
        </div>
      </div>
    </div>
  )
}

/**
 * Corner caption — the tile is quiet until hover, when the caption chip
 * slides in from the bottom edge.
 */
export function BottomCaptionTile() {
  return (
    <div className="p-6">
      <div className="group relative h-28 w-44 cursor-pointer overflow-hidden rounded-xl border border-white/12 bg-panel">
        <span className="grid h-full place-items-center font-mono text-lg text-white/25">A1</span>
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white px-2.5 py-1.5 transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="text-[10px] font-semibold text-black">Landing hero — v3</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Play thumb — cursor tilts the tile in 3D while the play die grows to
 * meet it; no video needed to sell the affordance.
 */
export function PlayThumbTile() {
  return (
    <div className="p-6" style={{ perspective: 600 }}>
      <motion.div
        whileHover={{ rotateX: 8, rotateY: -8 }}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        className="relative grid h-28 w-44 place-items-center overflow-hidden rounded-xl border border-white/15"
        style={{ background: 'linear-gradient(160deg,#2c2c34,#101018 70%)', transformStyle: 'preserve-3d' }}
      >
        <motion.div whileHover={{ scale: 1.18 }} className="grid h-11 w-11 place-items-center rounded-full bg-white text-black">
          ▶
        </motion.div>
        <span className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 font-mono text-[8px] text-white">12:48</span>
      </motion.div>
    </div>
  )
}

const RATIOS = ['16/9', '1/1', '4/5']

/**
 * Ratio cycler — clicking cycles 16:9 → 1:1 → 4:5; framer's layout
 * animation tweens the box's actual proportions.
 */
export function RatioCycleTile() {
  const [i, setI] = useState(0)
  return (
    <button onClick={() => setI((x) => (x + 1) % 3)} className="grid h-36 place-items-center p-4" title="Cycle aspect ratio">
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        style={{ aspectRatio: RATIOS[i], width: RATIOS[i] === '4/5' ? 76 : RATIOS[i] === '1/1' ? 96 : 130 }}
        className="relative grid place-items-center overflow-hidden rounded-xl border border-white/20 bg-panel"
      >
        <span className="font-mono text-[10px] text-white">{RATIOS[i]}</span>
      </motion.div>
    </button>
  )
}
