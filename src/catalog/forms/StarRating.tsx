import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Spring Star Rating — hover PREVIEWs the score (filled = hovered ?? value)
 * and clicking LOCKS it, firing a left-to-right pop cascade: each newly
 * lit star scales [1 → 1.4 → 1] with a 40ms stagger from the click point.
 */
export function StarRating() {
  const [value, setValue] = useState(3)
  const [hover, setHover] = useState<number | null>(null)
  const [burstKey, setBurstKey] = useState(0)
  const lit = hover ?? value

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex gap-1.5" onMouseLeave={() => setHover(null)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <motion.button
            key={`${n}-${burstKey}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => {
              setValue(n)
              setBurstKey((k) => k + 1)
            }}
            animate={n <= lit && burstKey > 0 ? { scale: [1, 1.35, 1] } : { scale: 1 }}
            transition={{ delay: Math.max(0, n - Math.min(value, lit)) * 0.04, duration: 0.35 }}
            whileHover={{ scale: 1.2 }}
            aria-label={`${n} stars`}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8">
              <path
                d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2l-6.1 3.4 1.4-6.8L2.2 9.1l6.9-.8z"
                fill={n <= lit ? '#fbbf24' : 'none'}
                stroke={n <= lit ? '#fbbf24' : '#4b4b63'}
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        ))}
      </div>
      <span className="font-mono text-[11px] text-fog">
        {value}/5 · {value === 5 ? 'flawless' : value === 4 ? 'great' : value === 3 ? 'solid' : value === 2 ? 'meh' : 'rough'}
      </span>
    </div>
  )
}
