import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Marker swoop — the highlight draws behind the phrase on entry: a
 * background-size 0%→100% sweep with the text anchored on top.
 */
export function MarkerSwoopHighlight() {
  return (
    <div className="p-6">
      <p className="text-lg font-medium leading-snug text-mist">
        Good animation is{' '}
        <motion.span
          initial={{ backgroundSize: '0% 50%' }}
          whileInView={{ backgroundSize: '100% 50%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
          className="bg-left bg-no-repeat text-white"
          style={{ backgroundImage: 'linear-gradient(104deg, transparent 5%, rgba(255,255,255,0.22) 6%, rgba(255,255,255,0.22) 94%, transparent 95%)', backgroundPosition: '0 70%' }}
        >
          honest about physics
        </motion.span>
        .
      </p>
    </div>
  )
}

/**
 * Todo strike — clicking strikes the line through and dims it; the strike
 * is a hairline drawn center-out over the glyph tops.
 */
export function TodoStrikeText() {
  const [done, setDone] = useState(false)
  return (
    <div className="p-6">
      <button onClick={() => setDone((d) => !d)} className="group flex items-center gap-2 text-left">
        <span className={`grid h-4 w-4 place-items-center rounded border text-[9px] ${done ? 'border-white bg-white text-black' : 'border-white/40 text-transparent'}`}>✓</span>
        <span className={`relative text-base transition-colors duration-300 ${done ? 'text-fog' : 'text-white'}`}>
          Rewrite the README
          <motion.span className="absolute left-0 top-1/2 h-px w-full origin-center bg-white/80" initial={false} animate={{ scaleX: done ? 1 : 0 }} transition={{ duration: 0.25 }} />
        </span>
      </button>
    </div>
  )
}

/**
 * KBD inline copy — kbd chips sit INSIDE body text without breaking
 * rhythm: sized in em so they obey the line they're reading in.
 */
export function KbdInlineCopy() {
  return (
    <div className="p-6">
      <p className="w-60 text-sm leading-relaxed text-mist">
        Press{' '}
        <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.8em] text-white shadow-[0_2px_0_rgba(255,255,255,0.15)]">⌘K</kbd>{' '}
        to open the palette, then <kbd className="rounded border border-white/15 bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.8em] text-white shadow-[0_2px_0_rgba(255,255,255,0.15)]">↵</kbd>{' '}
        to open the first result.
      </p>
    </div>
  )
}

/**
 * Pull quote — the giant " mark slides in behind the quote on entry while
 * the copy itself stays perfectly still.
 */
export function PullQuoteMark() {
  return (
    <div className="relative p-6 pl-10">
      <motion.span
        aria-hidden
        initial={{ x: -16, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.35 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 180, damping: 20 }}
        className="absolute left-2 top-0 select-none font-serif text-6xl text-white"
      >
        “
      </motion.span>
      <blockquote className="w-52">
        <p className="text-sm italic leading-relaxed text-white">Constraints are not the enemy. A slow grid is.</p>
        <footer className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-fog">— review notes, week 12</footer>
      </blockquote>
    </div>
  )
}
