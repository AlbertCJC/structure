import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Denied — click swings the shell through a decaying horizontal shake and
 * stamps the label. Error feedback at the point of action, not a toast.
 */
export function DenyShakeButton() {
  const [kicks, setKicks] = useState(0)
  const [denied, setDenied] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        key={kicks}
        animate={{ x: [0, -9, 9, -6, 6, -3, 0] }}
        transition={{ duration: 0.42 }}
        onClick={() => {
          setKicks((k) => k + 1)
          setDenied(true)
          window.setTimeout(() => setDenied(false), 1100)
        }}
        className={`h-10 w-36 rounded-lg border text-sm font-medium transition-colors ${
          denied ? 'border-rose-400/70 text-rose-200' : 'border-white/15 text-white'
        }`}
      >
        {denied ? 'Access denied' : 'Admin only'}
      </motion.button>
    </div>
  )
}

/**
 * Approve — a single confident pulse: scale overshoot with a low-damping
 * spring, check flashes, state relaxes back.
 */
export function ApprovePulseButton() {
  const [ok, setOk] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        animate={{ scale: ok ? [1, 1.14, 0.97, 1] : 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => {
          setOk(true)
          window.setTimeout(() => setOk(false), 1300)
        }}
        className={`h-10 w-36 rounded-lg border text-sm font-semibold transition-colors ${
          ok ? 'border-lime-300/60 bg-lime-300/10 text-lime-200' : 'border-white/15 text-white'
        }`}
      >
        {ok ? '✓ Approved' : 'Approve'}
      </motion.button>
    </div>
  )
}

/**
 * Unlock slide — drag the knob; past 60% it snaps ARMED (spring to the end
 * cap), short of it the knob springs home. Framer drag constraints do the
 * physics; the parent only keeps the armed boolean.
 */
export function UnlockSlideButton() {
  const track = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false)

  const maxX = () => (track.current ? track.current.clientWidth - 40 : 0)

  return (
    <div className="p-6">
      <div
        ref={track}
        className={`relative flex h-11 w-44 items-center rounded-full border px-1 transition-colors ${
          armed ? 'border-white/60 bg-white/10' : 'border-white/15 bg-white/5'
        }`}
      >
        <span className="absolute inset-0 grid place-items-center font-mono text-[9px] uppercase tracking-[0.25em] text-fog">
          {armed ? 'armed' : 'drag to unlock'}
        </span>
        <motion.div
          drag="x"
          dragConstraints={track}
          dragElastic={0.08}
          dragMomentum={false}
          animate={{ x: armed ? maxX() : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          onDragEnd={(_, info) => setArmed(info.offset.x > maxX() * 0.6)}
          className="relative z-10 grid h-9 w-9 cursor-grab place-items-center rounded-full bg-white text-xs text-black active:cursor-grabbing"
        >
          {armed ? '✓' : '→'}
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Error flash — a timed failure state: the shell's border and label flare,
 * then recover automatically (real async UX without the fake network).
 */
export function ErrorFlashButton() {
  const [failed, setFailed] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        onClick={() => {
          setFailed(true)
          window.setTimeout(() => setFailed(false), 1600)
        }}
        animate={failed ? { borderColor: 'rgba(251,113,133,0.8)', color: '#fecdd3' } : { borderColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
        className="h-10 w-44 rounded-lg border text-sm"
      >
        {failed ? '⚠ Payment failed' : 'Charge card'}
      </motion.button>
    </div>
  )
}
