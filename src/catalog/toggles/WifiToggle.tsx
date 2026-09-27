import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Signal Arcs Toggle — three concentric arc strokes plus the base dot.
 * Connecting lights the arcs in a 90ms stagger from the dot outward;
 * disconnecting drains them back. Arcs are SVG paths stroked in cyan with
 * a pathLength draw for extra crispness.
 */
export function WifiToggle() {
  const [on, setOn] = useState(true)
  const ARCS = [
    'M26 34a14 14 0 0 1 20 0',
    'M20 27a23 23 0 0 1 32 0',
    'M14 20a32 32 0 0 1 44 0',
  ]

  return (
    <div className="flex flex-col items-center gap-5">
      <button onClick={() => setOn((v) => !v)} aria-pressed={on} className="rounded-2xl border border-line bg-panel p-5">
        <svg viewBox="0 0 72 52" className="h-16 w-20">
          {ARCS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              strokeWidth="4.5"
              strokeLinecap="round"
              initial={false}
              animate={{
                stroke: on ? '#22d3ee' : 'rgba(255,255,255,0.12)',
                opacity: on ? 1 : 0.6,
                filter: on ? 'drop-shadow(0 0 4px rgba(34,211,238,0.6))' : 'none',
              }}
              transition={{ duration: 0.25, delay: on ? i * 0.09 : (2 - i) * 0.09 }}
            />
          ))}
          <motion.circle cx="36" cy="44" r="4" animate={{ fill: on ? '#22d3ee' : 'rgba(255,255,255,0.2)' }} transition={{ duration: 0.25 }} />
        </svg>
      </button>
      <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${on ? 'text-cyan-300' : 'text-fog'}`}>
        {on ? 'connected · 5GHz' : 'airplane mode'}
      </span>
    </div>
  )
}
