import { motion } from 'framer-motion'

/**
 * Baseline grid — body lines sit exactly on a visible 16px grid; the demo's
 * point is that the grid IS the decoration.
 */
export function BaselineGridHero() {
  return (
    <div
      className="relative m-6 h-28 w-56 overflow-hidden rounded-lg border border-white/10 px-3"
      style={{ backgroundImage: 'repeating-linear-gradient(180deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 16px)' }}
    >
      {[0, 1, 2, 3].map((i) => (
        <p key={i} className="font-mono text-[12px] leading-4 text-white" style={{ marginTop: i === 0 ? 0 : 0 }}>
          const row_{i} = grid.snap(type[{i}])
        </p>
      ))}
      {[4, 5, 6].map((i) => (
        <p key={i} className="font-mono text-[12px] leading-4 text-fog/60">
          // row {i} reserved
        </p>
      ))}
      <span className="absolute right-2 top-1 font-mono text-[8px] uppercase tracking-widest text-fog">16px baseline</span>
    </div>
  )
}

/**
 * Cropped display — a display line too big for its lane, sliding forever;
 * the crop makes the type graphic, not verbal.
 */
export function CroppedDisplayLoop() {
  return (
    <div className="p-6 pb-4">
      <div className="w-60 overflow-hidden border-y border-white/15 py-2">
        <motion.div animate={{ x: ['2%', '-62%'] }} transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }} className="whitespace-nowrap">
          <span className="text-4xl font-black uppercase leading-none tracking-tight text-white">overflow is honestoverflow is honest</span>
        </motion.div>
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-fog">crop-first headline</p>
    </div>
  )
}

/**
 * Syntax hero — a mono code line whose token colors shift through focus
 * cycles (mono palette first — white intents, not rainbow).
 */
export function SyntaxMonoHero() {
  return (
    <div className="p-6">
      <p className="rounded-lg border border-white/10 bg-panel px-3.5 py-2.5 font-mono text-[13px] leading-6">
        <span className="text-fog">const</span> <span className="text-white">catalog</span> <span className="text-fog">=</span>{' '}
        <motion.span animate={{ color: ['#ffffff', '#a78bfa', '#ffffff'] }} transition={{ duration: 3, repeat: Infinity }} className="font-semibold">
          count(<span className="text-white/80">components</span>)
        </motion.span>
        <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-white/80" />
      </p>
    </div>
  )
}

const LAYERS = [
  { cls: 'font-mono text-[9px] uppercase tracking-widest text-fog', text: 'field report · no. 41', d: 0 },
  { cls: 'text-lg font-bold leading-tight text-white', text: 'The grid stopped flashing.', d: 0.1 },
  { cls: 'text-[11px] leading-relaxed text-mist', text: 'content-visibility keeps 388 cards from painting themselves all at once.', d: 0.2 },
]

/**
 * Stack entrance — kicker, headline, rule, subcopy arrive as one
 * composition: same vector (up), staged by depth in the stack.
 */
export function StackLayoutEntrance() {
  return (
    <div className="w-56 space-y-1.5 p-6">
      {LAYERS.slice(0, 2).map((l) => (
        <motion.p key={l.text} initial={{ y: 14, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: l.d, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={l.cls}>
          {l.text}
        </motion.p>
      ))}
      <motion.span initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.35 }} className="block h-px w-10 origin-left bg-white/50" />
      <motion.p initial={{ y: 14, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.28, duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className={LAYERS[2].cls}>
        {LAYERS[2].text}
      </motion.p>
    </div>
  )
}
