import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Morphing Modal — the signature shared-layoutId pattern. The trigger
 * button and the modal share layoutId "morph-modal-card": when the modal
 * mounts, Framer Motion measures the trigger's last geometry and springs
 * the modal FROM it; on close the animation runs in reverse, so the modal
 * visibly collapses back into the button. Backdrop is a plain fade.
 */
export function MorphModal() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            className="absolute inset-0 z-10 bg-void/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          layoutId="morph-modal-card"
          onClick={() => setOpen(true)}
          className="z-20 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30"
        >
          Open modal
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            key="modal"
            layoutId="morph-modal-card"
            className="absolute z-20 w-64 overflow-hidden rounded-2xl bg-panel shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-white/10"
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 p-4">
              <p className="text-sm font-bold text-white">Morphing modal</p>
              <p className="text-[11px] text-white/80">I grew out of the button.</p>
            </div>
            <div className="p-4">
              <p className="text-xs leading-relaxed text-mist">
                Shared <code className="font-mono text-violet-300">layoutId</code> carries geometry between the two elements — no manual measurement.
              </p>
              <button onClick={() => setOpen(false)} className="mt-3 w-full rounded-lg border border-line py-2 text-xs font-medium text-white transition hover:bg-white/5">
                Collapse me back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
