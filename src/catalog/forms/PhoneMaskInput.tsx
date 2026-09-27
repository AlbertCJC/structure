import { useState } from 'react'

/**
 * Phone Mask Input — formatting follows the input: digits are stripped,
 * then rebuilt into (555) 123-4567 shape. The mask is applied on change,
 * so the caret naturally sits after the last formatted character.
 */
export function PhoneMaskInput() {
  const [value, setValue] = useState('')

  const format = (raw: string) => {
    const d = raw.replace(/\D/g, '').slice(0, 10)
    if (d.length < 4) return d
    if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  }

  return (
    <div className="flex w-full max-w-[240px] flex-col items-center gap-4 p-6">
      <div className="flex w-full items-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 focus-within:border-cyan-400/60">
        <span className="font-mono text-sm text-fog">📞</span>
        <input
          value={value}
          onChange={(e) => setValue(format(e.target.value))}
          placeholder="(555) 123-4567"
          inputMode="numeric"
          className="w-full bg-transparent font-mono text-sm tracking-wide text-white placeholder:text-fog focus:outline-none"
        />
      </div>
      <div className="flex h-4 items-center gap-1.5">
        {[0, 3, 6].map((mark) => (
          <span key={mark} className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${value.replace(/\D/g, '').length > mark ? 'bg-cyan-400' : 'bg-white/10'}`} />
        ))}
        <span className="ml-2 font-mono text-[10px] text-fog">{value.replace(/\D/g, '').length}/10</span>
      </div>
    </div>
  )
}
