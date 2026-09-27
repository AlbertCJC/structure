import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

/** Formatting-bar button: 40px mono square that inverts when active. */
function FmtBtn({ on, onToggle, label, children }: { on: boolean; onToggle: () => void; label: string; children: ReactNode }) {
  return (
    <motion.button
      whileTap={{ scale: 0.88 }}
      aria-pressed={on}
      aria-label={label}
      onClick={onToggle}
      animate={{
        backgroundColor: on ? '#ffffff' : 'rgba(255,255,255,0.03)',
        color: on ? '#0a0a12' : '#ffffff',
        borderColor: on ? '#ffffff' : 'rgba(255,255,255,0.18)',
      }}
      className="grid h-10 w-10 place-items-center rounded-lg border font-mono text-sm font-bold"
    >
      {children}
    </motion.button>
  )
}

/** Stage: the button plus a live sample word wearing the applied style. */
function Stage({ btn, sample }: { btn: ReactNode; sample: ReactNode }) {
  return (
    <div className="flex items-center gap-4 p-6">
      {btn}
      <span className="text-sm text-mist">{sample}</span>
    </div>
  )
}

/** Bold — sample text thickens on toggle; the B inverts. */
export function BoldFormatToggle() {
  const [on, setOn] = useState(false)
  return (
    <Stage
      btn={<FmtBtn on={on} onToggle={() => setOn((o) => !o)} label="Bold">B</FmtBtn>}
      sample={
        <motion.span animate={{ fontWeight: on ? 800 : 400 }} transition={{ duration: 0.2 }}>
          Weight
        </motion.span>
      }
    />
  )
}

/** Italic — sample leans over on a spring (skew toward 8deg of true italics). */
export function ItalicFormatToggle() {
  const [on, setOn] = useState(false)
  return (
    <Stage
      btn={<FmtBtn on={on} onToggle={() => setOn((o) => !o)} label="Italic"><span className="italic">I</span></FmtBtn>}
      sample={
        <motion.span animate={{ skewX: on ? -10 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }} className="inline-block">
          Slant
        </motion.span>
      }
    />
  )
}

/** Underline — the rule draws itself under the sample via scaleX. */
export function UnderlineFormatToggle() {
  const [on, setOn] = useState(false)
  return (
    <Stage
      btn={<FmtBtn on={on} onToggle={() => setOn((o) => !o)} label="Underline"><span className="underline underline-offset-4">U</span></FmtBtn>}
      sample={
        <span className="relative inline-block pb-0.5">
          Anchor
          <motion.span
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-white"
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: on ? 1 : 0, opacity: on ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </span>
      }
    />
  )
}

/** Strikethrough — the bar strikes through the sample like a pen stroke. */
export function StrikeFormatToggle() {
  const [on, setOn] = useState(false)
  return (
    <Stage
      btn={<FmtBtn on={on} onToggle={() => setOn((o) => !o)} label="Strikethrough"><span className="line-through">S</span></FmtBtn>}
      sample={
        <span className="relative inline-block">
          Regret
          <motion.span
            className="absolute left-0 top-1/2 h-[1.5px] w-full origin-left -translate-y-1/2 bg-white"
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: on ? 1 : 0, opacity: on ? 1 : 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          />
        </span>
      }
    />
  )
}
