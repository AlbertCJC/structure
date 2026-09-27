import { motion } from 'framer-motion'

/**
 * Living Area Chart — same seamless-wrap trick as the liquid button: a
 * 200%-wide wave path drifts left forever inside a clipped viewport, under
 * a gradient fade and a glowing horizon line. Pure compositor work.
 */
export function AreaWaveChart() {
  const WAVE =
    'M0,38 C60,20 120,52 180,36 C240,20 300,50 360,34 C420,20 480,52 540,38 C600,24 660,50 720,38 L720,80 L0,80 Z'

  return (
    <div className="w-full max-w-[250px] p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-fog">traffic · live</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-lime-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-400" /> streaming
        </span>
      </div>
      <div className="relative h-24 overflow-hidden rounded-xl border border-white/10 bg-abyss">
        <motion.svg
          viewBox="0 0 720 80"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-[200%]"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        >
          <defs>
            <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(139,92,246,0.5)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.02)" />
            </linearGradient>
          </defs>
          <path d={WAVE} fill="url(#area-fill)" />
          <path
            d="M0,38 C60,20 120,52 180,36 C240,20 300,50 360,34 C420,20 480,52 540,38 C600,24 660,50 720,38"
            fill="none" stroke="#c4b5fd" strokeWidth="1.5"
          />
        </motion.svg>
      </div>
      <p className="mt-2 text-center font-mono text-[10px] text-mist">2,431 req/s · p95 84ms</p>
    </div>
  )
}
