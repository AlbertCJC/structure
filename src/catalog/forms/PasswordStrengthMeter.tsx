import { useState } from 'react'
import { motion } from 'framer-motion'

const LEVELS = ['WEAK', 'FAIR', 'GOOD', 'STRONG', 'FORTRESS']
const COLORS = ['#f43f5e', '#fbbf24', '#a3e635', '#34d399', '#22d3ee']

/** Cheap heuristic: length, length+, mixed case+digits, symbols. 0..4. */
function score(pw: string): number {
  if (!pw) return 0
  let s = 0
  if (pw.length >= 8) s++
  if (pw.length >= 12) s++
  if (/[A-Z]/.test(pw) && /\d/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return Math.min(s, 4)
}

/**
 * Password Strength Meter.
 *
 * Four bars, each an independent spring (240/22) with a 30ms cascade delay.
 * On a score change, bars cross the threshold one by one — heights animate
 * between 22% and 100% and colors jump to the level color, so the meter
 * reads as a staggered wave rather than four simultaneous pops.
 */
export function PasswordStrengthMeter() {
  const [pw, setPw] = useState('hunter2!')
  const s = score(pw)

  return (
    <div className="w-full max-w-[240px] p-4">
      <div className="rounded-xl border border-line bg-surface/70 px-4 py-3">
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="password"
          className="w-full bg-transparent font-mono text-sm text-white placeholder:text-fog focus:outline-none"
        />
      </div>

      <div className="mt-3 flex h-7 items-end gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              height: i < s ? '100%' : '22%',
              backgroundColor: i < s ? COLORS[s] : '#26263c',
            }}
            transition={{ type: 'spring', stiffness: 240, damping: 22, delay: i * 0.03 }}
            className="w-10 origin-bottom rounded-sm"
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: COLORS[s] }}>
          {LEVELS[s]}
        </span>
        <span className="font-mono text-[10px] text-fog">{pw.length} chars</span>
      </div>
    </div>
  )
}
