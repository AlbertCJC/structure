import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Shortcut Save Button.
 *
 * A real window keydown listener (cleaned up on unmount) watches for the
 * bare `s` key — pressing it OR clicking runs the same save flow: the
 * button flashes a lime ring and a "Saved" chip springs out beside it.
 * The kbd hint pulses when its key is pressed.
 */
export function KbdShortcutButton() {
  const [saved, setSaved] = useState(false)
  const [keyLit, setKeyLit] = useState(false)

  const save = () => {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 1300)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's' && !e.metaKey && !e.ctrlKey) {
        const t = e.target as HTMLElement
        if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return
        setKeyLit(true)
        save()
        window.setTimeout(() => setKeyLit(false), 250)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex items-center gap-4 p-8">
      <motion.button
        onClick={save}
        animate={saved ? { boxShadow: '0 0 0 5px rgba(163,230,53,0.25), 0 0 30px -4px rgba(163,230,53,0.5)' } : { boxShadow: '0 0 0 0 rgba(163,230,53,0)' }}
        className="flex items-center gap-3 rounded-xl border border-white/15 bg-surface px-6 py-3.5 text-sm font-semibold text-white"
      >
        Save changes
        <motion.kbd
          animate={{ backgroundColor: keyLit ? 'rgba(163,230,53,0.3)' : 'rgba(255,255,255,0.06)' }}
          className="rounded-md border border-white/20 px-1.5 py-0.5 font-mono text-[10px] text-mist"
        >
          S
        </motion.kbd>
      </motion.button>

      <AnimatePresence>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -8, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
            className="font-mono text-[11px] tracking-[0.2em] text-lime-300"
          >
            SAVED ✓
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
