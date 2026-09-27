import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/** Shared shell: 44px rounded square that inverts its tint when ON. */
function Shell({ on, onToggle, label, children }: { on: boolean; onToggle: () => void; label: string; children: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      aria-pressed={on}
      aria-label={label}
      onClick={onToggle}
      animate={{
        backgroundColor: on ? '#ffffff' : 'rgba(255,255,255,0.04)',
        borderColor: on ? '#ffffff' : 'rgba(255,255,255,0.18)',
        color: on ? '#0a0a12' : '#ffffff',
      }}
      className="grid h-11 w-11 place-items-center rounded-xl border text-white"
    >
      {children}
    </motion.button>
  )
}

/**
 * Airplane mode — the plane rotates 45° into climb attitude ON and the
 * shell inverts; OFF cruises level.
 */
export function AirplaneModeToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <Shell on={on} onToggle={() => setOn((o) => !o)} label="Airplane mode">
        <motion.span animate={{ rotate: on ? 45 : 0, x: on ? 2 : 0, y: on ? -2 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }} className="text-lg">
          ✈
        </motion.span>
      </Shell>
    </div>
  )
}

/**
 * Bluetooth — the rune stays put; ON fires a pair of expanding rings from
 * behind it, like the radio waking up.
 */
export function BluetoothToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <Shell on={on} onToggle={() => setOn((o) => !o)} label="Bluetooth">
        <span className="relative grid place-items-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5">
            <path d="M7 7l10 10-5 4V3l5 4L7 17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {on && (
            <motion.span
              key="ring"
              className="absolute h-6 w-6 rounded-full border border-current"
              initial={{ scale: 0.5, opacity: 0.8 }}
              animate={{ scale: 1.7, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 0.6 }}
            />
          )}
        </span>
      </Shell>
    </div>
  )
}

/**
 * Flashlight — ON slides a beam out of the torch in two staggered wedges.
 */
export function FlashlightToggle() {
  const [on, setOn] = useState(false)
  return (
    <div className="p-6">
      <Shell on={on} onToggle={() => setOn((o) => !o)} label="Flashlight">
        <span className="relative">
          <span className="text-lg">🔦</span>
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute -right-1 top-1/2 h-[3px] w-4 origin-right rounded-full bg-current"
              initial={{ scaleX: 0, opacity: 0, rotate: i === 0 ? -18 : 12 }} animate={{ scaleX: on ? 1 : 0, opacity: on ? 0.9 : 0, rotate: i === 0 ? -18 : 12 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
            />
          ))}
        </span>
      </Shell>
    </div>
  )
}

/**
 * Eye — ON shows the pupil; OFF sweeps a lid line across the eye with a
 * spring draw. Password-visibility mechanics in miniature.
 */
export function EyeToggle() {
  const [on, setOn] = useState(true)
  return (
    <div className="p-6">
      <Shell on={on} onToggle={() => setOn((o) => !o)} label="Visibility">
        <svg viewBox="0 0 24 24" className="h-5 w-5">
          <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <motion.circle cx="12" cy="12" r="2.6" fill="currentColor" initial={{ scale: 0, opacity: 0 }} animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }} />
          <motion.path
            d="M4 20 20 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: on ? 0 : 1, opacity: on ? 0 : 1 }}
            transition={{ duration: 0.25 }}
          />
        </svg>
      </Shell>
    </div>
  )
}
