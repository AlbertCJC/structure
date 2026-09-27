import { motion } from 'framer-motion'

/**
 * Grow-on-view divider — the rule draws itself from the center the first
 * time it enters the viewport (whileInView, no observer boilerplate).
 */
export function ScrollGrowDivider() {
  return (
    <div className="w-56 p-6">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-fog">section break</p>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="block h-px origin-center bg-white/60"
      />
      <p className="mt-3 text-right font-mono text-[9px] text-fog">§ 03</p>
    </div>
  )
}

/**
 * Sweeping edge — a white spark loops along the gray rule, one luminous
 * degree of separation from a boring hr.
 */
export function SweepingEdgeDivider() {
  return (
    <div className="w-56 p-6">
      <div className="relative h-px overflow-visible bg-white/20">
        <motion.span
          animate={{ x: ['-10%', '105%'] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-[1.5px] h-1 w-10 rounded-full bg-white blur-[2px]"
        />
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-fog">loading divider</p>
    </div>
  )
}

/**
 * OR divider — the center die electrifies on hover (springs up + burns
 * white) while its rails fade back in deference.
 */
export function OrChipDivider() {
  return (
    <div className="group flex w-56 cursor-default items-center gap-3 p-6">
      <span className="h-px flex-1 bg-white/20 transition group-hover:bg-white/10" />
      <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 font-mono text-[9px] text-fog transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-white group-hover:bg-white group-hover:text-black">
        or
      </span>
      <span className="h-px flex-1 bg-white/20 transition group-hover:bg-white/10" />
    </div>
  )
}

/**
 * Timeline divider — a vertical dotted thread; the latest entry pulse-travels
 * down the line on a loop so the list reads as *alive*.
 */
export function TimelineDotDivider() {
  return (
    <div className="flex gap-4 p-6">
      <div className="relative w-px self-stretch border-l border-dashed border-white/25">
        <motion.span
          initial={{ opacity: 1 }} animate={{ y: [0, 96], opacity: [1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeIn' }}
          className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-white"
        />
      </div>
      <ul className="space-y-3 py-1 text-[11px]">
        {['design review', 'motion pass', 'today — ship'].map((t, i) => (
          <li key={t} className={i === 2 ? 'text-white' : 'text-fog'}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
