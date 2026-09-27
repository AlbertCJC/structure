import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Play ⇄ pause — the two glyphs crossfade with a 90° spin on a shared
 * mount point (popLayout), so the eye reads one shape turning into the other.
 */
export function PlayToggleButton() {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? 'Pause' : 'Play'}
        className="grid h-12 w-12 place-items-center rounded-full bg-white text-black"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={String(playing)}
            initial={{ scale: 0.4, opacity: 0, rotate: -90 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.4, opacity: 0, rotate: 90 }}
            transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            className="text-base"
          >
            {playing ? '❚❚' : '▶'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/**
 * Bookmark — outline SVG fills with a spring scale-pop; a faint ring blooms
 * behind it once per save.
 */
export function BookmarkPopButton() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={() => setSaved((s) => !s)}
        className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/15"
        aria-label={saved ? 'Remove bookmark' : 'Bookmark'}
      >
        <motion.svg viewBox="0 0 24 24" className="h-5 w-5" animate={{ scale: saved ? [1, 1.35, 1] : 1 }} transition={{ duration: 0.35 }}>
          <motion.path
            d="M6 3h12v18l-6-4.5L6 21z"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinejoin="round"
            initial={{ fillOpacity: 0 }}
            animate={{ fillOpacity: saved ? 1 : 0 }}
            style={{ fill: 'white' }}
          />
        </motion.svg>
        <AnimatePresence>
          {saved && (
            <motion.span
              key="ring"
              className="absolute inset-0 rounded-xl border border-white/60"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/**
 * Bell ringer — click swings the bell through a decaying rotation keyframe
 * set; a badge dot springs in and holds.
 */
export function BellShakeButton() {
  const [nudged, setNudged] = useState(0) // key bump = re-ring
  const [seen, setSeen] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          setNudged((n) => n + 1)
          setSeen(true)
        }}
        className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/15 text-lg"
        aria-label="Notifications"
      >
        <motion.span
          key={nudged}
          animate={{ rotate: [0, -18, 14, -10, 6, 0] }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="inline-block origin-top"
        >
          🔔
        </motion.span>
        <AnimatePresence>
          {seen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 16 }}
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white"
            />
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/**
 * Send — the plane arcs out on staggered x/y springs and fades at the apex;
 * the label confirms, then both restore.
 */
export function SendPlaneButton() {
  const [sent, setSent] = useState(false)
  const fire = () => {
    if (sent) return
    setSent(true)
    window.setTimeout(() => setSent(false), 1900)
  }
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={fire}
        className="relative flex h-10 items-center gap-2 overflow-hidden rounded-lg bg-white px-5 text-sm font-semibold text-black"
      >
        {sent ? 'Sent' : 'Send'}
        <motion.span
          key={String(sent)}
          animate={sent ? { x: [0, 52], y: [0, -34], opacity: [1, 1, 0], rotate: [0, 14] } : { x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.65, ease: 'easeIn', rotate: { duration: 0.3 } }}
          className="inline-block"
        >
          ➤
        </motion.span>
      </motion.button>
    </div>
  )
}
