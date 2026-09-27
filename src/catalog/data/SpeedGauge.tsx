import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Spring Speed Gauge — the needle maps 0..1 onto a 240° arc (−120°..+120°)
 * and swings on a LOW-damping spring (stiffness 110, damping 11) so it
 * overshoots and wobbles exactly like an analog dial. REV randomizes the
 * target; tick marks are rotated around the dial center.
 */
export function SpeedGauge() {
  const [value, setValue] = useState(0.4)
  // Arc length of the 240° dial (r=65). Declared as a const so the spring
  // always animates between real numbers — and so `style` can seed the
  // starting offset; framer cannot read SVG attrs back from the DOM.
  const LEN = Math.PI * 65 * (240 / 180)

  return (
    <div className="flex flex-col items-center gap-3 p-2">
      <div className="relative h-28 w-40">
        <svg viewBox="0 0 160 100" className="h-full w-full">
          {/* dial arc */}
          <path d="M20 90 A65 65 0 1 1 140 90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="7" strokeLinecap="round" />
          {/* active arc */}
          <motion.path
            d="M20 90 A65 65 0 1 1 140 90"
            fill="none"
            stroke="url(#gauge-grad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={LEN}
            style={{ strokeDashoffset: LEN * (1 - 0.4) }}
            initial={{ strokeDashoffset: LEN * (1 - 0.4) }}
            animate={{ strokeDashoffset: LEN * (1 - value) }}
            transition={{ type: 'spring', stiffness: 110, damping: 14 }}
          />
          {/* ticks */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="80" y1="22" x2="80" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="2" transform={`rotate(${-120 + i * 30} 80 85)`} />
          ))}
          <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
        {/* needle */}
        <motion.div
          className="absolute left-1/2 top-[85%] h-[52px] w-0.5 origin-bottom rounded-full bg-white"
          style={{ translateX: '-50%' }}
          animate={{ rotate: -120 + value * 240 }}
          transition={{ type: 'spring', stiffness: 110, damping: 11 }}
        />
        <span className="absolute left-1/2 top-[85%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </div>
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-mist">{Math.round(value * 240)} <span className="text-fog">RPM×100</span></span>
        <button onClick={() => setValue(Math.random())} className="rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-1.5 font-mono text-[10px] font-bold tracking-[0.2em] text-[#0a0a12]">
          REV
        </button>
      </div>
    </div>
  )
}
