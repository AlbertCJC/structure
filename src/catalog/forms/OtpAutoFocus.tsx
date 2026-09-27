import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon } from '../../components/ui/Icons'

const LEN = 6

/**
 * OTP Auto-Focus Field.
 *
 * State: a plain string[6]. The interesting logic is all in the handlers:
 *  • onChange keeps only the LAST digit (so select-all + type works), then
 *    moves focus forward.
 *  • Backspace on an EMPTY cell rewinds focus to the previous cell —
 *    the detail that makes OTPs feel professional.
 *  • onPaste distributes up to 6 digits across the cells and focuses the
 *    landing position.
 * When all six are filled, the whole row pulses once (scale keyframes) and
 * a VERIFIED caption springs in.
 */
export function OtpAutoFocus() {
  const [vals, setVals] = useState<string[]>(Array(LEN).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])
  const complete = vals.every((v) => v !== '')

  const setCell = (i: number, raw: string) => {
    const d = raw.replace(/\D/g, '').slice(-1)
    setVals((prev) => {
      const next = [...prev]
      next[i] = d
      return next
    })
    if (d && i < LEN - 1) refs.current[i + 1]?.focus()
  }

  const onKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !vals[i] && i > 0) refs.current[i - 1]?.focus()
  }

  const onPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, LEN)
    if (!digits) return
    e.preventDefault()
    setVals((prev) =>
      Array.from({ length: LEN }, (_, i) => digits[i] ?? prev[i]),
    )
    refs.current[Math.min(digits.length, LEN - 1)]?.focus()
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2" onPaste={onPaste}>
        {vals.map((v, i) => (
          <motion.input
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            value={v}
            inputMode="numeric"
            onChange={(e) => setCell(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            animate={{
              borderColor: complete ? 'rgba(163,230,53,0.6)' : v ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.12)',
              scale: complete ? [1, 1.06, 1] : 1,
            }}
            transition={{ duration: 0.35 }}
            className="h-11 w-10 rounded-lg border bg-surface/80 text-center font-mono text-lg text-white caret-violet-400 outline-none focus:border-violet-400/70"
          />
        ))}
      </div>

      <AnimatePresence>
        {complete && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.25em] text-lime-300"
          >
            <CheckIcon className="h-3.5 w-3.5" /> VERIFIED
          </motion.p>
        )}
      </AnimatePresence>
      <p className="text-[10px] text-fog">paste or type — focus auto-advances</p>
    </div>
  )
}
