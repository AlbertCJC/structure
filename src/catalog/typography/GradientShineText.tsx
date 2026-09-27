import { motion } from 'framer-motion'

/**
 * Gradient Shine Headline — the text is clipped out of a 300%-wide
 * aurora gradient whose backgroundPosition loops 0% → -150% forever.
 * Animating background-position on a clipped gradient is the cheapest
 * way to get liquid color moving through letterforms.
 */
export function GradientShineText() {
  return (
    <div className="flex flex-col items-center gap-3 p-6">
      <motion.h2
        animate={{ backgroundPosition: ['0% 50%', '-150% 50%'] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
        className="bg-clip-text text-3xl font-extrabold tracking-tight text-transparent"
        style={{
          backgroundImage: 'linear-gradient(90deg, #8b5cf6, #22d3ee, #d946ef, #a3e635, #8b5cf6)',
          backgroundSize: '300% 100%',
        }}
      >
        Structura
      </motion.h2>
      <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-fog">motion · shipped · daily</p>
    </div>
  )
}
