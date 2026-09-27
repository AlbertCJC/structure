import { motion } from 'framer-motion'

/**
 * Gooey Liquid Morph.
 *
 * The "goo" is an SVG filter applied to the WHOLE animated container:
 *   feGaussianBlur (stdDev 8)  →  feColorMatrix (alpha 22x - 11)
 * The blur fuses nearby blobs; the matrix re-thresholds alpha so the fused
 * mass snaps back to a hard edge — metaball behavior with zero JS. Four
 * blobs bounce on a 1.1s ease-in-out loop with 0.18s stagger, so the
 * merge/split choreography never repeats in the same phase.
 */
export function GooeyLoader() {
  return (
    <div className="relative h-24 w-48">
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id="goo-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0" style={{ filter: 'url(#goo-liquid)' }}>
        <div className="absolute bottom-4 left-1/2 h-8 w-32 -translate-x-1/2 rounded-full bg-violet-500" />
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-4 h-7 w-7 rounded-full bg-violet-500"
            style={{ left: `${16 + i * 22}%` }}
            animate={{ y: [0, -34, 0] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }}
          />
        ))}
      </div>
    </div>
  )
}
