import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const LIMIT = 140
const SEED = 'This field grows with your words —'
const RING_C = 2 * Math.PI * 9
// Mount-time ring offset for the pre-filled seed text — framer cannot read
// SVG attrs back from the DOM, so without this seed it animates "from undefined".
const SEED_OFFSET = RING_C * (1 - (LIMIT - SEED.length) / LIMIT)

/**
 * Autosizing Textarea — the classic hidden-mirror trick: a pre element
 * replicates the text (+ a trailing space so the last line counts) and
 * the textarea overlays it, inheriting its natural height via grid stack.
 * The character ring counts down to the limit with a color shift.
 */
export function AutosizeTextarea() {
  const [text, setText] = useState(SEED)
  const [focused, setFocused] = useState(false)
  const mirrorRef = useRef<HTMLPreElement>(null)
  const remaining = LIMIT - text.length

  return (
    <div className="w-full max-w-[240px] p-4">
      <div
        className={`grid rounded-xl border bg-panel transition-colors duration-300 ${
          focused ? 'border-violet-400/60' : 'border-line'
        }`}
      >
        <pre ref={mirrorRef} aria-hidden className="invisible col-start-1 row-start-1 m-0 min-h-16 whitespace-pre-wrap break-words px-3.5 py-3 font-sans text-xs leading-relaxed">
          {text + ' '}
        </pre>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, LIMIT))}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={1}
          placeholder="Type something long…"
          className="col-start-1 row-start-1 resize-none overflow-hidden bg-transparent px-3.5 py-3 font-sans text-xs leading-relaxed text-white placeholder:text-fog focus:outline-none"
        />
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className={`font-mono text-[10px] ${remaining < 20 ? 'text-rose-400' : 'text-fog'}`}>
          {remaining} left
        </span>
        <svg viewBox="0 0 24 24" className="h-6 w-6 -rotate-90">
          <circle cx="12" cy="12" r="9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
          <motion.circle
            cx="12" cy="12" r="9" fill="none" strokeWidth="2.5" strokeLinecap="round"
            style={{ strokeDashoffset: SEED_OFFSET }}
            initial={{
              strokeDashoffset: SEED_OFFSET,
              stroke: '#8b5cf6',
            }}
            animate={{
              strokeDashoffset: RING_C * (1 - remaining / LIMIT),
              stroke: remaining < 20 ? '#fb7185' : '#8b5cf6',
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            strokeDasharray={2 * Math.PI * 9}
          />
        </svg>
      </div>
    </div>
  )
}
