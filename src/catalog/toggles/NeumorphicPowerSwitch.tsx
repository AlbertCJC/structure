import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Neumorphic Power Button — a round key that swaps its shadow pair:
 * raised (light top-left, dark bottom-right) when off, inset when on,
 * with a green glow ring blooming behind it. whileTap gives the physical
 * sink before the state flips.
 */
export function NeumorphicPowerSwitch() {
  const [on, setOn] = useState(false)

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <motion.span
          className="absolute -inset-3 rounded-full"
          animate={{ boxShadow: on ? '0 0 34px 6px rgba(74,222,128,0.35)' : '0 0 0px 0px rgba(74,222,128,0)' }}
          transition={{ duration: 0.5 }}
        />
        <motion.button
          onClick={() => setOn((v) => !v)}
          whileTap={{ scale: 0.94 }}
          animate={{
            boxShadow: on
              ? 'inset 4px 4px 10px rgba(0,0,0,0.65), inset -2px -2px 6px rgba(255,255,255,0.05)'
              : '6px 6px 14px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.05)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="relative grid h-20 w-20 place-items-center rounded-full bg-raise"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" strokeWidth="2.4" strokeLinecap="round">
            <motion.path
              d="M12 3v8"
              animate={{ stroke: on ? '#4ade80' : '#666b82' }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              d="M7 6.5a8 8 0 1 0 10 0"
              animate={{ stroke: on ? '#4ade80' : '#666b82' }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.button>
      </div>
      <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${on ? 'text-lime-300' : 'text-fog'}`}>
        {on ? 'system online' : 'standby'}
      </span>
    </div>
  )
}
