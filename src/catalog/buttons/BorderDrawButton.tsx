import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Border Draw Button.
 *
 * An SVG rect overlays the button; `pathLength` is normalized by Framer
 * Motion, so animating 0 → 1 draws the full perimeter regardless of the
 * rect's pixel size. vector-effect keeps the stroke weight constant under
 * the preserveAspectRatio stretch. Leave reverses the draw.
 */
export function BorderDrawButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-8">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-2xl px-9 py-4 text-sm font-semibold text-white transition-colors"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 200 60">
          <rect x="1.5" y="1.5" width="197" height="57" rx="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <motion.rect
            x="1.5" y="1.5" width="197" height="57" rx="15"
            fill="none" stroke="url(#bd-grad)" strokeWidth="2" vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ pathLength: hovered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
          <defs>
            <linearGradient id="bd-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <span className="relative z-10">Draw my border</span>
      </button>
    </div>
  )
}
