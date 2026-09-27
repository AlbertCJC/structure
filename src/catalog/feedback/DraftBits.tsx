import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Typing indicator — three dots wave in a loop inside a chat bubble;
 * the canonical "someone is writing" feedback.
 */
export function TypingDotsBubble() {
  return (
    <div className="p-6">
      <div className="flex w-16 items-center justify-around rounded-2xl rounded-bl-md border border-white/12 bg-panel px-3 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.4 }} animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.14, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-white"
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Read receipt — the message's ✓ doubles and whitens as the fake reply
 * arrives: sent → delivered → read, on autopilot.
 */
export function ReadReceiptBubble() {
  const [phase, setPhase] = useState(0) // 0 sent, 1 delivered, 2 read
  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase(1), 1200)
    const t2 = window.setTimeout(() => setPhase(2), 2600)
    const t3 = window.setInterval(() => {
      setPhase(0)
      window.setTimeout(() => setPhase(1), 1200)
      window.setTimeout(() => setPhase(2), 2600)
    }, 6000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearInterval(t3)
    }
  }, [])
  return (
    <div className="p-6">
      <div className="w-fit max-w-56 rounded-2xl rounded-br-md bg-white px-3.5 py-2 text-[12px] text-black">
        shipping the audit today — 0 suspects or it doesn’t go out 🫡
        <span className={`mt-0.5 block text-right text-[9px] font-mono ${phase === 2 ? 'text-black' : 'text-black/40'}`}>
          {phase === 0 ? '✓ sent' : phase === 1 ? '✓✓ delivered' : '✓✓ read'}
        </span>
      </div>
    </div>
  )
}

/**
 * Autosave chip — type in the mini doc and the chip runs
 * editing → saving → "saved · just now", debounced 700ms.
 */
export function AutosaveStatusChip() {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const timer = useRef<number>(undefined)
  return (
    <div className="w-56 p-6">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium text-white">untitled.md</span>
        <motion.span
          key={state}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-full px-2 py-0.5 font-mono text-[9px] ${state === 'saved' ? 'bg-white/10 text-mist' : state === 'saving' ? 'text-fog' : 'text-fog/50'}`}
        >
          {state === 'saving' ? 'saving…' : state === 'saved' ? '✓ saved just now' : 'ready'}
        </motion.span>
      </div>
      <textarea
        rows={2}
        placeholder="type something…"
        onChange={() => {
          setState('saving')
          window.clearTimeout(timer.current)
          timer.current = window.setTimeout(() => setState('saved'), 700)
        }}
        className="mt-2 w-full resize-none rounded-lg border border-white/12 bg-panel p-2.5 text-[11px] text-white placeholder:text-fog focus:border-white/40 focus:outline-none"
      />
    </div>
  )
}

/**
 * Presence cursors — two fake collaborators drift around the canvas on
 * sinuous looped paths with their name tags trailing the pointer.
 */
export function PresenceCursorsArea() {
  return (
    <div className="p-6">
      <div className="relative h-28 w-60 overflow-hidden rounded-xl border border-white/12">
        <span className="absolute left-2.5 top-2 font-mono text-[9px] uppercase tracking-widest text-fog">2 collaborators</span>
        <motion.div animate={{ x: [20, 150, 90, 20], y: [40, 20, 70, 40] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} className="absolute">
          <span className="text-white">◤</span>
          <span className="ml-2 rounded bg-white px-1.5 py-0.5 text-[8px] font-bold text-black">Ravi</span>
        </motion.div>
        <motion.div animate={{ x: [170, 60, 190, 170], y: [55, 15, 30, 55] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }} className="absolute">
          <span className="text-mist">◤</span>
          <span className="ml-2 rounded bg-mist px-1.5 py-0.5 text-[8px] font-bold text-black">June</span>
        </motion.div>
      </div>
    </div>
  )
}
