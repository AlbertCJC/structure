import { motion } from 'framer-motion'

const BLUR_WORD = 'Clarity'

/**
 * Blur-in heading — each glyph starts blurred + lifted and resolves with a
 * tiny stagger; filter on transform-animated text, sealed by `once`.
 */
export function BlurInHeading() {
  return (
    <div className="p-6">
      <h3 className="flex text-3xl font-bold tracking-tight text-white">
        {[...BLUR_WORD].map((c, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {c}
          </motion.span>
        ))}
      </h3>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">blur → sharp per glyph</p>
    </div>
  )
}

/**
 * Mask rise — two lines ride up out of their own overflow-hidden masks on
 * a spring stagger, the editorial hero entrance.
 */
export function MaskRiseHeadline() {
  const lines = ['Ship the audit.', 'Then the apology.']
  return (
    <div className="p-6">
      {lines.map((l, i) => (
        <div key={l} className="overflow-hidden py-0.5">
          <motion.p
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: 'spring', stiffness: 140, damping: 20 }}
            className="text-2xl font-bold leading-tight text-white"
          >
            {l}
          </motion.p>
        </div>
      ))}
    </div>
  )
}

const WIPE = ['Read', 'the', 'fine', 'motion.']

/**
 * Clip wipe — words reveal by an inset clip that opens left-to-right,
 * stepping across the sentence in 90ms hops.
 */
export function ClipWipeWords() {
  return (
    <div className="flex flex-wrap gap-x-1.5 p-6 text-xl font-semibold text-white">
      {WIPE.map((w, i) => (
        <motion.span
          key={i}
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0.3 }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.09, duration: 0.35, ease: 'easeOut' }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  )
}

const SCATTER = 'gather'

/**
 * Scatter → gather — characters fly in from deterministic pseudo-random
 * offsets (seeded per index — stable across re-renders) and click home.
 */
export function ScatterGatherText() {
  const seeds = [
    { x: -46, y: -18, r: -40 },
    { x: 30, y: -40, r: 25 },
    { x: -20, y: 44, r: 60 },
    { x: 50, y: 30, r: -55 },
    { x: -58, y: 8, r: 35 },
    { x: 22, y: -30, r: 80 },
    { x: -10, y: 50, r: -70 },
  ]
  return (
    <div className="p-6">
      <span className="flex text-3xl font-black text-white">
        {[...SCATTER].map((c, i) => (
          <motion.span
            key={i}
            initial={{ x: seeds[i].x, y: seeds[i].y, rotate: seeds[i].r, opacity: 0 }}
            whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 180, damping: 16, delay: i * 0.04 }}
          >
            {c}
          </motion.span>
        ))}
      </span>
    </div>
  )
}
