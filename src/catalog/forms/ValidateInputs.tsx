import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Email validity dot — a live dot at the field's edge: gray while typing,
 * bright when the shape is right. Restrained real-time validation.
 */
export function EmailFormatBadge() {
  const [v, setV] = useState('')
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
  return (
    <div className="p-6">
      <div className="flex w-64 items-center gap-2.5">
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="name@company.com"
          className="h-11 w-full rounded-lg border border-white/15 bg-panel px-3.5 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none"
        />
        <motion.span
          animate={{ scale: ok ? [1, 1.4, 1] : 1, backgroundColor: ok ? '#ffffff' : '#4b4b55' }}
          transition={{ duration: 0.3 }}
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          title={ok ? 'valid' : 'invalid'}
        />
      </div>
    </div>
  )
}

/**
 * Password match pair — the confirm field reports agreement: borders only
 * burn once BOTH fields hold matching text.
 */
export function PasswordMatchPair() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const state = !b ? 'idle' : a === b ? 'match' : 'miss'
  const cls = state === 'match' ? 'border-white/70' : state === 'miss' ? 'border-rose-400/60' : 'border-white/15'
  return (
    <div className="w-56 space-y-2 p-6">
      <input type="password" value={a} onChange={(e) => setA(e.target.value)} placeholder="new password" className="h-10 w-full rounded-lg border border-white/15 bg-panel px-3 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none" />
      <input type="password" value={b} onChange={(e) => setB(e.target.value)} placeholder="repeat it" className={`h-10 w-full rounded-lg border bg-panel px-3 text-sm text-white placeholder:text-fog focus:outline-none transition-colors ${cls}`} />
      <p className="h-4 text-[11px]">
        {state === 'match' && <span className="text-mist">✓ passwords match</span>}
        {state === 'miss' && <span className="text-rose-300/90">✕ not the same yet</span>}
      </p>
    </div>
  )
}

const LIMIT = 24

/**
 * Character limit bar — a hairline under the field fills with use; the last
 * segment gets an overshoot bounce when the cap hits.
 */
export function CharLimitBar() {
  const [v, setV] = useState('')
  const pct = Math.min(1, v.length / LIMIT)
  const full = v.length >= LIMIT
  return (
    <div className="p-6">
      <div className="w-60">
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          placeholder="Tagline (24 chars)"
          className="h-10 w-full border-b border-white/20 bg-transparent text-sm text-white placeholder:text-fog focus:outline-none"
        />
        <div className="h-[3px] w-full bg-white/10">
          <motion.div
            className={`h-full ${full ? 'bg-white' : 'bg-white/70'}`}
            animate={{ width: `${pct * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          />
        </div>
        <p className={`mt-1 text-right font-mono text-[10px] ${full ? 'text-white' : 'text-fog'}`}>
          {v.length}/{LIMIT}
        </p>
      </div>
    </div>
  )
}

/**
 * ZIP pattern — digits only, capped at 5; non-digits never enter state.
 * Counter chip slides in once you start.
 */
export function ZipPatternInput() {
  const [v, setV] = useState('')
  return (
    <div className="p-6">
      <div className="flex items-center gap-2.5">
        <input
          value={v}
          inputMode="numeric"
          onChange={(e) => setV(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="ZIP code"
          className="h-11 w-40 rounded-lg border border-white/15 bg-panel px-3.5 font-mono text-sm tracking-[0.3em] text-white placeholder:tracking-normal placeholder:text-fog focus:border-white/50 focus:outline-none"
        />
        {v && <span className="rounded-md bg-white/10 px-2 py-1 font-mono text-[10px] text-mist">{v.length}/5</span>}
      </div>
    </div>
  )
}
