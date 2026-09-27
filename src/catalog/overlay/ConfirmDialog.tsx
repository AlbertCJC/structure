import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Danger Confirm Dialog — cancel doesn't just close: it SHAKEs the dialog
 * on X (keyframed rotateX wobble) as if saying "are you sure?", while
 * confirm morphs the red button into a check before dismissing. Entry is
 * the standard scale-from-0.9 spring with backdrop fade.
 */
export function ConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [shake, setShake] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const cancel = () => {
    setShake(true)
    window.setTimeout(() => {
      setShake(false)
      setOpen(false)
    }, 420)
  }

  const confirm = () => {
    setConfirmed(true)
    window.setTimeout(() => {
      setConfirmed(false)
      setOpen(false)
    }, 900)
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <button onClick={() => setOpen(true)} className="rounded-lg border border-red-500/40 bg-red-500/10 px-5 py-2.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/20">
        Delete project…
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="absolute inset-0 z-10 bg-void/60 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: shake ? [0, -6, 5, -3, 0] : 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              className="absolute z-20 w-60 rounded-2xl border border-white/12 bg-panel p-4 shadow-2xl [perspective:600px]"
            >
              <p className="text-sm font-bold text-white">Delete “Structura v2”?</p>
              <p className="mt-1 text-[11px] leading-relaxed text-fog">This removes 128 components and cannot be undone.</p>
              <div className="mt-4 flex gap-2">
                <button onClick={cancel} className="flex-1 rounded-lg border border-line py-2 text-xs text-mist transition hover:text-white">
                  Cancel
                </button>
                <motion.button
                  onClick={confirm}
                  animate={{ backgroundColor: confirmed ? '#a3e635' : '#f43f5e' }}
                  className="flex-1 rounded-lg py-2 text-xs font-bold text-white"
                >
                  {confirmed ? '✓' : 'Delete'}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
