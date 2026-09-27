import { motion } from 'framer-motion'

/**
 * Floating Empty State — a pure-CSS illustration: a bobbing planet with an
 * orbiting moon (the orbit is a rotating wrapper, the moon rides its rim —
 * same trick as the quantum orbits). The CTA pulses gently to invite action.
 */
export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="relative h-24 w-24">
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-3 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-600 shadow-[0_14px_30px_-8px_rgba(139,92,246,0.5)]">
          <div className="absolute left-3 top-4 h-2.5 w-2.5 rounded-full bg-white/25" />
          <div className="absolute bottom-4 right-4 h-3.5 w-3.5 rounded-full bg-white/15" />
        </motion.div>
        <div className="absolute inset-0" style={{ animation: 'conic-spin 6s linear infinite' }}>
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white">No projects yet</p>
        <p className="mt-1 max-w-40 text-[11px] leading-relaxed text-fog">This sector of space is empty. Launch something.</p>
      </div>
      <motion.button
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-lg bg-violet-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/30"
      >
        + New project
      </motion.button>
    </div>
  )
}
