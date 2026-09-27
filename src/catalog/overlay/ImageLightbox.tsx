import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SHOTS = [
  { id: 'shot-a', from: '#8b5cf6', to: '#22d3ee', label: 'Aurora grid' },
  { id: 'shot-b', from: '#d946ef', to: '#fbbf24', label: 'Sunset bento' },
  { id: 'shot-c', from: '#a3e635', to: '#0ea5e9', label: 'Lime circuit' },
]

/**
 * Morphing Lightbox — each thumbnail and the lightbox share a layoutId
 * (`lightbox-${id}`): clicking a thumbnail makes the lightbox spring FROM
 * that exact rect (position AND size), and closing reverses it. Backdrop
 * fades independently so the image flight reads clearly.
 */
export function ImageLightbox() {
  const [openId, setOpenId] = useState<string | null>(null)
  const shot = SHOTS.find((s) => s.id === openId)

  return (
    <div className="relative flex h-full w-full items-center justify-center gap-3 overflow-hidden">
      {SHOTS.map((s) => (
        <button key={s.id} onClick={() => setOpenId(s.id)} aria-label={`Open ${s.label}`}>
          {openId !== s.id && (
            <motion.span
              layoutId={`lightbox-${s.id}`}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="block h-16 w-20 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
            />
          )}
        </button>
      ))}

      <AnimatePresence>
        {shot && (
          <>
            <motion.div
              className="absolute inset-0 z-10 bg-void/70 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpenId(null)}
            />
            <motion.div
              layoutId={`lightbox-${shot.id}`}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute z-20 flex h-44 w-64 flex-col justify-end overflow-hidden rounded-xl"
              style={{ background: `linear-gradient(135deg, ${shot.from}, ${shot.to})` }}
              onClick={() => setOpenId(null)}
            >
              <div className="bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-xs font-bold text-white">{shot.label}</p>
                <p className="font-mono text-[9px] text-white/70">click anywhere to close</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
