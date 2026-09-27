import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Split Reveal Button.
 *
 * Two absolutely-positioned halves cover a label layer. On hover both
 * halves translate outward (±110%) on springs with slightly different
 * stiffnesses — the asymmetry makes the parting feel mechanical rather
 * than mirrored. The label scales up from 0.8 underneath.
 */
export function SplitHoverButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-10">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative h-14 w-52 overflow-hidden rounded-xl border border-white/15 bg-abyss"
      >
        <span className="absolute inset-0 grid place-items-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-lime-300">
          <motion.span initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: hovered ? 1 : 0.7, opacity: hovered ? 1 : 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
            Revealed
          </motion.span>
        </span>
        <motion.span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1/2 border-r border-white/10 bg-gradient-to-br from-[#2a2a44] to-[#191927]"
          animate={{ x: hovered ? '-108%' : '0%' }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        />
        <motion.span
          aria-hidden
          className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-[#2a2a44] to-[#191927]"
          animate={{ x: hovered ? '108%' : '0%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        />
        <span className={`pointer-events-none absolute inset-0 grid place-items-center font-mono text-xs font-bold uppercase tracking-[0.3em] text-mist transition-opacity duration-200 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          Split me
        </span>
      </button>
    </div>
  )
}
