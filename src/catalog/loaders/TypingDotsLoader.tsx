import { motion } from 'framer-motion'

/**
 * Typing Indicator — the chat classic. Three dots bounce in a 160ms
 * stagger inside a soft glass bubble; the whole bubble breathes on a 2.4s
 * scale loop so it feels like someone is actually hesitating.
 */
export function TypingDotsLoader() {
  return (
    <motion.div
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.07] px-4 py-3 backdrop-blur"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-mist"
          initial={{ opacity: 0.4 }} animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut', delay: i * 0.16 }}
        />
      ))}
    </motion.div>
  )
}
