import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * File chip list — type a "filename" and press Enter: it becomes a chip
 * with a spring arrival and an × that pops it out. Upload-list UX without
 * touching the real filesystem.
 */
export function FileChipList() {
  const [v, setV] = useState('')
  const [files, setFiles] = useState<string[]>(['hero.png'])
  return (
    <div className="w-60 p-6">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && v.trim()) {
            setFiles((f) => [...f, v.trim()])
            setV('')
          }
        }}
        placeholder="filename + Enter"
        className="h-10 w-full rounded-lg border border-white/15 bg-panel px-3 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none"
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        <AnimatePresence initial={false}>
          {files.map((f) => (
            <motion.span
              key={f}
              layout
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 26 }}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white"
            >
              {f}
              <button aria-label={`Remove ${f}`} onClick={() => setFiles((x) => x.filter((y) => y !== f))} className="text-fog hover:text-white">
                ×
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Avatar slot — dashed circle invites a click; on click it "uploads"
 * (spins, then lands an initials avatar); click again to retire it.
 */
export function AvatarUploadSlot() {
  const [state, setState] = useState<'empty' | 'busy' | 'set'>('empty')
  const click = () => {
    if (state === 'set') return setState('empty')
    if (state !== 'empty') return
    setState('busy')
    window.setTimeout(() => setState('set'), 700)
  }
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={click}
        className={`grid h-16 w-16 place-items-center rounded-full border-2 text-lg transition-colors ${
          state === 'set' ? 'border-white bg-white font-bold text-black' : 'border-dashed border-white/30 text-fog'
        }`}
        aria-label="Upload avatar"
      >
        {state === 'busy' ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" /> : state === 'set' ? 'AK' : '+'}
      </motion.button>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-fog">{state === 'set' ? 'click to remove' : 'avatar'}</p>
    </div>
  )
}

/**
 * Paste intercept — paste anything and the zone reports how many
 * characters arrived, swallowing the event into its own chip.
 */
export function PasteHintZone() {
  const [n, setN] = useState<number | null>(null)
  return (
    <div className="p-6">
      <div
        tabIndex={0}
        onPaste={(e) => {
          e.preventDefault()
          setN(e.clipboardData.getData('text').length)
        }}
        className="grid h-20 w-56 cursor-text place-items-center rounded-xl border border-dashed border-white/25 text-sm text-fog outline-none transition-colors focus:border-white/60 focus:text-mist"
      >
        {n === null ? 'focus & paste here' : (
          <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
            got {n} chars {n > 0 ? '✓' : ''}
          </motion.span>
        )}
      </div>
    </div>
  )
}

/**
 * Drop hint — drag-over enters an armed state (border warms, icon lifts);
 * leaving or dropping reports the drop. Drag counter prevents flicker.
 */
export function DropHintCard() {
  const [state, setState] = useState<'idle' | 'over' | 'dropped'>('idle')
  return (
    <div className="p-6">
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setState('over')
        }}
        onDragLeave={() => setState('idle')}
        onDrop={(e) => {
          e.preventDefault()
          setState('dropped')
          window.setTimeout(() => setState('idle'), 1500)
        }}
        className={`grid h-24 w-56 place-items-center rounded-xl border-2 border-dashed transition-all duration-200 ${
          state === 'over' ? 'border-white/70 bg-white/5' : state === 'dropped' ? 'border-white bg-white/10' : 'border-white/20'
        }`}
      >
        <div className="text-center">
          <motion.div animate={{ y: state === 'over' ? -3 : 0 }} className="text-xl">
            {state === 'dropped' ? '✓' : '⇪'}
          </motion.div>
          <p className="text-[11px] text-fog">{state === 'over' ? 'release to drop' : state === 'dropped' ? '1 file received' : 'drag a file here'}</p>
        </div>
      </div>
    </div>
  )
}
