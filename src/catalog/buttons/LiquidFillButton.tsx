import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Liquid Fill Button.
 *
 * Two stacked animations:
 *  1. RISE — the fill layer (absolute inset-0) translates on Y from 103%
 *     (fully below the button) to 0% on hover, on a soft spring
 *     (stiffness 100 / damping 18) so the liquid surges and settles.
 *  2. DRIFT — inside the fill, a 200%-wide SVG loops on X (0 → -50%).
 *     The wave path is periodic over half its width (1200 units), so the
 *     -50% shift is a seamless wrap: the surface drifts forever.
 *     A second, translucent path offset by 14 units gives the wave depth.
 */
export function LiquidFillButton() {
  const [hovered, setHovered] = useState(false)

  // Wave: period 1200, amplitude ~45, fill to bottom.
  const WAVE =
    'M0,50 C200,95 400,5 600,50 C800,95 1000,5 1200,50 C1400,95 1600,5 1800,50 C2000,95 2200,5 2400,50 L2400,300 L0,300 Z'

  return (
    <div className="p-8">
      <motion.button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative overflow-hidden rounded-xl border border-white/15 px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em]"
      >
        <span
          className={`relative z-10 transition-colors duration-300 ${hovered ? 'text-white' : 'text-mist'}`}
        >
          Fill me
        </span>

        <motion.span
          aria-hidden
          className="absolute inset-0"
          animate={{ y: hovered ? '0%' : '103%' }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
          <motion.svg
            viewBox="0 0 2400 300"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-[200%]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <linearGradient id="liq-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path d={WAVE} fill="rgba(217,70,239,0.35)" transform="translate(0,14)" />
            <path d={WAVE} fill="url(#liq-grad)" />
          </motion.svg>
        </motion.span>
      </motion.button>
    </div>
  )
}
