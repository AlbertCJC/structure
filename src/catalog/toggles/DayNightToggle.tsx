import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Deterministic pseudo-random star field (seeded by index arithmetic so
 * SSR/StrictMode re-renders never reshuffle the sky).
 */
const STARS = Array.from({ length: 24 }, (_, i) => ({
  left: (i * 37 + 11) % 96,
  top: (i * 53 + 7) % 50,
  size: 1 + (i % 3),
  delay: (i % 6) * 0.4,
}))

/**
 * Day / Night Sky Morph — a full scene toggle in one card.
 *
 *  • Skies: gradients can't be interpolated by Framer Motion, so day and
 *    night are TWO stacked layers and the night layer crossfades on opacity
 *    (0.9s ease) — the classic scene-cut.
 *  • Stars: each star fades in with a staggered delay, then runs a CSS
 *    twinkle loop (independent of the framer-driven opacity).
 *  • Sun ↔ moon: a popLayout crossfade where the outgoing body scales down
 *    and rotates 90° while the incoming one blooms in — reads as a morph.
 *  • Dune: the silhouette's fill color animates on the same switch.
 */
export function DayNightToggle() {
  const [night, setNight] = useState(false)

  return (
    <div className="flex w-full max-w-[270px] flex-col items-center gap-3">
      <button
        onClick={() => setNight((v) => !v)}
        className="relative h-36 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]"
        aria-label="Toggle day / night"
      >
        {/* day sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-amber-200" />
        {/* night sky */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#04040f] via-[#101034] to-[#31174f]"
          initial={{ opacity: 0 }}
          animate={{ opacity: night ? 1 : 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        />

        {/* stars */}
        {STARS.map((s, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{ left: `${s.left}%`, top: `${s.top}%`, opacity: 0 }}
            animate={{ opacity: night ? 1 : 0 }}
            transition={{ duration: 0.5, delay: night ? s.delay * 0.3 : 0 }}
          >
            <span
              className="block rounded-full bg-white"
              style={{
                width: s.size,
                height: s.size,
                animation: `twinkle ${1.8 + (i % 3) * 0.6}s ease-in-out ${s.delay * 0.2}s infinite`,
              }}
            />
          </motion.span>
        ))}

        {/* drifting cloud (day only) */}
        <motion.div
          className="absolute left-6 top-9 h-4 w-16 rounded-full bg-white/70 blur-[2px]"
          initial={{ opacity: 0.8, x: 0 }}
          animate={{ opacity: night ? 0 : 0.8, x: [0, 22, 0] }}
          transition={{ opacity: { duration: 0.8 }, x: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
        />

        {/* sun / moon */}
        <AnimatePresence mode="popLayout">
          {night ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              className="absolute right-8 top-8 h-12 w-12"
            >
              <div className="h-full w-full rounded-full bg-slate-100 shadow-[0_0_24px_6px_rgba(226,232,240,0.35)]" />
              <div className="absolute left-2 top-3 h-2.5 w-2.5 rounded-full bg-slate-300/70" />
              <div className="absolute left-6 top-6 h-2 w-2 rounded-full bg-slate-300/60" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.4, rotate: 90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, rotate: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 18 }}
              className="absolute right-8 top-8 h-12 w-12"
            >
              <div className="h-full w-full rounded-full bg-amber-300 shadow-[0_0_36px_10px_rgba(252,211,77,0.55)]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* dune silhouette */}
        <svg viewBox="0 0 260 60" className="absolute bottom-0 w-full" preserveAspectRatio="none" style={{ height: 56 }}>
          <motion.path
            d="M0,40 C60,10 120,55 180,30 C220,15 245,35 260,25 L260,60 L0,60 Z"
            animate={{ fill: night ? '#05050d' : '#166534' }}
            transition={{ duration: 0.9 }}
            opacity="0.9"
          />
        </svg>
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">
        {night ? 'night mode — click the sky' : 'day mode — click the sky'}
      </span>
    </div>
  )
}
