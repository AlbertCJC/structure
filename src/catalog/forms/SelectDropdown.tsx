import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const OPTIONS = ['Violet Dusk', 'Cyan Signal', 'Lime Circuit', 'Rose Static']

/**
 * Morphing Select — custom select with three moving parts: the chevron
 * rotates 180°, the option list blooms (scaleY origin-top + 30ms item
 * stagger), and choosing springs the panel closed while the trigger label
 * swaps with a vertical slide.
 */
export function SelectDropdown() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(OPTIONS[0])

  return (
    <div className="w-full max-w-[220px] p-4">
      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-line bg-panel px-4 py-3 text-sm text-white"
        >
          <motion.span key={value} initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="overflow-hidden">
            {value}
          </motion.span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="text-fog">
            ▾
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="absolute left-0 right-0 top-full z-20 mt-2 origin-top overflow-hidden rounded-xl border border-white/12 bg-panel/95 py-1 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
            >
              {OPTIONS.map((o, i) => (
                <motion.button
                  key={o}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => {
                    setValue(o)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-xs transition ${
                    o === value ? 'text-violet-300' : 'text-mist hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {o}
                  {o === value && <span>✓</span>}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] text-fog">selected: {value}</p>
    </div>
  )
}
