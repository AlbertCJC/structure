import { motion } from 'framer-motion'

/**
 * Border beam — a conic-gradient disc spins behind the shell; the label is
 * an opaque inset cover leaving exactly 1px of beam visible. Pure CSS loop
 * (reuses the global conic-spin keyframes).
 */
export function BorderBeamButton() {
  return (
    <div className="p-6">
      <button className="relative overflow-hidden rounded-xl p-px">
        <span
          aria-hidden
          className="absolute -inset-[80%] animate-[conic-spin_2.6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.9)_40deg,transparent_80deg)]"
        />
        <span className="relative block rounded-[11px] bg-void px-6 py-2.5 text-sm font-medium text-white">
          Deploy to edge
        </span>
      </button>
    </div>
  )
}

// Perimeter waypoints for a 160×40 shell — the comet traces the rounded rect.
const W = 160
const H = 40

/**
 * Orbit dot — a glowing comet travels the button's perimeter on framer
 * keyframe waypoints, linear per segment so corners don't slow down.
 */
export function OrbitDotButton() {
  return (
    <div className="p-6">
      <button className="relative rounded-xl border border-white/15 text-sm text-white" style={{ width: W, height: H }}>
        Track parcel
        <motion.span
          className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]"
          animate={{ x: [3, W - 3, W - 3, 3, 3], y: [3, 3, H - 3, H - 3, 3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', times: [0, 0.25, 0.5, 0.75, 1] }}
          style={{ left: 0, top: 0 }}
        />
      </button>
    </div>
  )
}

/**
 * Pulse ring — expanding outline rings broadcast outward from the shell on
 * an infinite loop; staggered delays keep the rhythm continuous.
 */
export function PulseRingButton() {
  return (
    <div className="p-6">
      <button className="relative rounded-xl border border-white/20 bg-white/5 px-6 py-2.5 text-sm text-white">
        Go live
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl border border-white/50"
            initial={{ scale: 1, opacity: 0.55 }} animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.8, ease: 'easeOut' }}
          />
        ))}
      </button>
    </div>
  )
}

/**
 * Ping dot — the classic availability ping: a static core plus a
 * scale-fade twin on a 1.4s loop. Cheap, instantly readable.
 */
export function PingDotButton() {
  return (
    <div className="p-6">
      <button className="flex h-10 items-center gap-2.5 rounded-full border border-white/15 px-4 text-sm text-white">
        <span className="relative flex h-2 w-2">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-white/60"
            initial={{ scale: 1, opacity: 0.7 }} animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Changelog
      </button>
    </div>
  )
}
