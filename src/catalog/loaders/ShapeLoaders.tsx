import { motion } from 'framer-motion'

/**
 * Triangle spin — a solid clip-path triangle on a steady 1.4s rotation with
 * a subtle breathing scale layered in.
 */
export function TriangleSpinLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <motion.div
        className="h-9 w-9 bg-white"
        style={{ clipPath: 'polygon(50% 2%, 98% 96%, 2% 96%)' }}
        animate={{ rotate: 360, scale: [1, 0.82, 1] }}
        transition={{
          rotate: { duration: 1.4, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' },
        }}
      />
    </div>
  )
}

/**
 * Heart pulse — the classic double-thump: two contractions per cycle via a
 * 5-key scale set timed asymmetrically.
 */
export function HeartPulseLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <motion.svg viewBox="0 0 24 24" className="h-9 w-9" animate={{ scale: [1, 1.28, 1, 1.16, 1] }} transition={{ duration: 1.15, repeat: Infinity, times: [0, 0.18, 0.38, 0.55, 1] }}>
        <path d="M12 21s-7.5-4.9-10-9.3C.4 8.6 2.3 5 5.7 5c2 0 3.6 1.1 4.3 2.7h4c.7-1.6 2.3-2.7 4.3-2.7 3.4 0 5.3 3.6 3.7 6.7C19.5 16.1 12 21 12 21Z" fill="white" />
      </motion.svg>
    </div>
  )
}

/**
 * Hex ripple — expanding hexagon echoes fade as they grow; staggered delays
 * keep two rings in flight at all times.
 */
export function HexRippleLoader() {
  const hex = 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)'
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10">
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 bg-white/25"
            style={{ clipPath: hex }}
            animate={{ scale: [0.55, 1.45], opacity: [0.65, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, delay: i * 0.85, ease: 'easeOut' }}
          />
        ))}
        <span className="absolute inset-[11px] bg-white" style={{ clipPath: hex }} />
      </div>
    </div>
  )
}

/**
 * CSS cube — five faces in preserve-3d with translateZ placement; the whole
 * assembly tumbles on X and Y simultaneously over 4s.
 */
export function CubeRotateLoader() {
  const F = 16 // face half-size → translateZ
  const faces = [
    `translateZ(${F}px)`,
    `rotateY(180deg) translateZ(${F}px)`,
    `rotateY(90deg) translateZ(${F}px)`,
    `rotateY(-90deg) translateZ(${F}px)`,
    `rotateX(90deg) translateZ(${F}px)`,
  ]
  return (
    <div className="grid h-full place-items-center p-6" style={{ perspective: 420 }}>
      <motion.div
        className="relative h-8 w-8 [transform-style:preserve-3d]"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map((t) => (
          <span key={t} className="absolute inset-0 border border-white/60 bg-white/10" style={{ transform: t }} />
        ))}
      </motion.div>
    </div>
  )
}
