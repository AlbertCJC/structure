import { motion } from 'framer-motion'

/**
 * Dash ring — a dashed SVG circle on a slow spin. Chunky dashes + round caps
 * read as a "preparing" state rather than a plain spinner.
 */
export function DashRingLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <svg className="h-11 w-11 animate-spin text-white/80" style={{ animationDuration: '2.6s' }} viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeDasharray="10 13" />
      </svg>
    </div>
  )
}

const C = 2 * Math.PI * 24

/**
 * Comet tail — a short bright arc chases its own white→transparent tail:
 * a 25%-length dash spinning fast on a gradient stroke.
 */
export function CometTailLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <svg className="h-11 w-11 animate-spin" style={{ animationDuration: '1.1s' }} viewBox="0 0 60 60">
        <defs>
          <linearGradient id="comet-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="24" fill="none" stroke="url(#comet-g)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${0.32 * C} ${C}`} />
      </svg>
    </div>
  )
}

/**
 * Tick tock — two clock hands on independent linear loops (minute 2s,
 * hour 8s). The ratio makes the mechanism feel real.
 */
export function TickTockLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-11 w-11 rounded-full border-2 border-white/50">
        <motion.span
          className="absolute left-1/2 top-1/2 h-3.5 w-0.5 origin-top rounded bg-white"
          style={{ translateX: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 h-2 w-0.5 origin-top rounded bg-white/60"
          style={{ translateX: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

/**
 * Segment fade — 8 spokes on a wheel, each holding opacity 1 then fading
 * out; per-spoke delays make the fade chase clockwise (iOS classic).
 */
export function SegmentFadeLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 45}deg)` }}>
            <motion.span
              className="mx-auto block h-2.5 w-[3px] rounded-full bg-white"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 0.15, 0.15] }}
              transition={{ duration: 0.96, repeat: Infinity, delay: i * 0.12, times: [0, 0.55, 1] }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
