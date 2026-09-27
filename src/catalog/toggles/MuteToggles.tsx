import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/** Icon-with-slash shell: glyph stays, slash draws across when MUTED. */
function MuteShell({ on, onToggle, label, children }: { on: boolean; onToggle: () => void; label: string; children: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      aria-pressed={!on}
      aria-label={label}
      onClick={onToggle}
      initial={{ opacity: 1 }}
      animate={{
        borderColor: on ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
        backgroundColor: on ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
        opacity: on ? 1 : 0.6,
      }}
      className="relative grid h-11 w-11 place-items-center rounded-xl border text-white"
    >
      {children}
      <svg viewBox="0 0 24 24" className="pointer-events-none absolute h-6 w-6">
        <motion.path
          d="M4 20 20 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: on ? 0 : 1, opacity: on ? 0 : 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        />
      </svg>
    </motion.button>
  )
}

/**
 * Speaker — two sound arcs fade in/out with the state while the slash does
 * the mute stamp.
 */
export function SoundWavesToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <MuteShell on={on} onToggle={() => setOn((o) => !o)} label="Sound">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
          <motion.path d="M16 9.4a4 4 0 0 1 0 5.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" initial={{ opacity: 1 }} animate={{ opacity: on ? 1 : 0 }} />
          <motion.path d="M18.4 7a7.4 7.4 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" initial={{ opacity: 1 }} animate={{ opacity: on ? 1 : 0 }} />
        </svg>
      </MuteShell>
    </div>
  )
}

/**
 * Mic — rounded capsule + cradle, mute draws the slash.
 */
export function MicMuteToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <MuteShell on={on} onToggle={() => setOn((o) => !o)} label="Microphone">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <rect x="9" y="3" width="6" height="10" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </MuteShell>
    </div>
  )
}

/**
 * Camera — body + lens circle with a record dot that blinks only while ON.
 */
export function VideoToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <MuteShell on={on} onToggle={() => setOn((o) => !o)} label="Camera">
        <span className="relative">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <rect x="3" y="7" width="13" height="11" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="m16 11 5-3v9l-5-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
          {on && (
            <motion.span
              className="absolute -left-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-rose-400"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </span>
      </MuteShell>
    </div>
  )
}

/**
 * Bell — snooze draws the slash; two drifting "z" glyphs appear while muted.
 */
export function BellSnoozeToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <MuteShell on={on} onToggle={() => setOn((o) => !o)} label="Bell">
        <span className="relative">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M6 16v-5a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M10 21a2.2 2.2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {!on && (
            <motion.span
              key="z"
              className="absolute -top-1 left-4 font-mono text-[8px]"
              initial={{ y: -2, x: 0, opacity: 0 }}
              animate={{ y: [-2, -8], x: [0, 4], opacity: [0, 1, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            >
              z
            </motion.span>
          )}
        </span>
      </MuteShell>
    </div>
  )
}
