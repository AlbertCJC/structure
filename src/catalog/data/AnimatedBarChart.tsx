import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Spring Bar Chart — bars grow from the baseline with a 40ms stagger;
 * shuffle re-rolls values and every bar springs to its new height in
 * parallel. Height is a percentage of the fixed chart box, and the value
 * label rides on top of each bar via the same spring.
 */
export function AnimatedBarChart() {
  const [values, setValues] = useState([62, 38, 78, 51, 88])

  return (
    <div className="flex w-full max-w-[240px] flex-col p-4">
      <div className="flex h-32 items-end justify-between gap-3 border-b border-white/10 pb-px">
        {values.map((v, i) => (
          <div key={i} className="relative flex h-full w-8 flex-col justify-end">
            <motion.span
              animate={{ y: -(v / 100) * 116 - 14 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: i * 0.04 }}
              className="absolute left-1/2 -translate-x-1/2 font-mono text-[9px] text-mist"
            >
              {v}
            </motion.span>
            <motion.div
              animate={{ height: `${v}%` }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: i * 0.04 }}
              className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-400"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => setValues(values.map(() => 20 + Math.round(Math.random() * 75)))}
        className="mx-auto mt-3 rounded-md border border-line px-3 py-1.5 text-[10px] text-mist transition hover:border-violet-400/50 hover:text-white"
      >
        ⤨ shuffle dataset
      </button>
    </div>
  )
}
