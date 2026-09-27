import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DECK = ['Invoice #2481', 'Contract v4', 'NDA — signed']

/**
 * Deck carousel — the top card clicks AWAY to the back: it flings off and
 * lands at the bottom of the z-order while depth scales keep the stack legible.
 */
export function DeckCarouselCards() {
  const [order, setOrder] = useState(DECK)
  const sendBack = () => setOrder((o) => [o[1], o[2], o[0]])
  return (
    <div className="grid h-40 place-items-center p-4">
      <div className="relative h-28 w-56">
        {order.map((c, i) => (
          <motion.button
            key={c}
            layout
            onClick={sendBack}
            initial={false}
            animate={{ y: -i * 8, scale: 1 - i * 0.05, opacity: 1 - i * 0.25, zIndex: 3 - i }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="absolute inset-x-0 bottom-0 grid h-20 place-items-center rounded-xl border border-white/20 bg-panel font-mono text-[11px] text-white shadow-xl"
          >
            {c} {i === 0 && <span className="absolute right-2 top-2 text-[9px] text-fog">tap →</span>}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/**
 * Fan spread — a tight stack of "prints" that fans out on hover; each card
 * targets its own rotation/translation, converging when idle.
 */
export function FanSpreadStack() {
  const [open, setOpen] = useState(false)
  const cards = [
    { x: -56, r: -16 },
    { x: -18, r: -6 },
    { x: 18, r: 6 },
    { x: 56, r: 16 },
  ]
  return (
    <div className="grid h-36 place-items-center p-4">
      <div className="relative h-24 w-56" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
        {cards.map((c, i) => (
          <motion.div
            key={i}
            animate={{ x: open ? c.x : (i - 1.5) * 6, rotate: open ? c.r : 0, y: open ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="absolute inset-x-0 top-0 mx-auto h-24 w-16 rounded-lg border border-white/20 bg-panel shadow-lg"
            style={{ originY: 1.4 }}
          >
            <span className="grid h-full place-items-center font-mono text-[9px] text-fog">print {i + 1}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const LINES = ['rendered 388/388 ✓', 'bundle: 214kb gz', 'mono toggle works!']

/**
 * Incoming stack — "Send" pushes a bubble into the log; new arrivals spring
 * from below while old ones lay out upward (layout on a column-reverse log).
 */
export function IncomingMessageStack() {
  const [msgs, setMsgs] = useState<string[]>(['ready when you are'])
  const [i, setI] = useState(0)
  return (
    <div className="flex h-40 w-56 flex-col justify-end gap-1.5 overflow-hidden p-4">
      <AnimatePresence initial={false}>
        {msgs.slice(-3).map((m) => (
          <motion.div
            key={m}
            layout
            initial={{ y: 24, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="w-fit max-w-full self-end rounded-xl rounded-br-sm bg-white px-3 py-1.5 text-[11px] text-black"
          >
            {m}
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        onClick={() => {
          setMsgs((m) => [...m, `${LINES[i % LINES.length]}`])
          setI((n) => n + 1)
        }}
        className="mt-1 self-end rounded-full border border-white/20 px-3 py-1 text-[10px] text-fog hover:text-white"
      >
        reply →
      </button>
    </div>
  )
}

/**
 * Panel focus — two overlapping panels trade the front seat; the switch
 * punches z-index, scale and blur in one spring.
 */
export function PanelFocusSwap() {
  const [front, setFront] = useState(0)
  const panels = ['Preview', 'Settings']
  return (
    <div className="relative h-36 p-6">
      {panels.map((p, i) => {
        const isFront = front === i
        return (
          <motion.button
            key={p}
            onClick={() => setFront(i)}
            animate={{
              x: isFront ? 0 : 52,
              y: isFront ? 0 : 16,
              scale: isFront ? 1 : 0.88,
              zIndex: isFront ? 2 : 1,
              opacity: isFront ? 1 : 0.7,
              filter: isFront ? 'blur(0px)' : 'blur(1px)',
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="absolute grid h-24 w-44 place-items-center rounded-xl border border-white/20 bg-panel text-[12px] font-medium text-white shadow-xl"
          >
            {p}
          </motion.button>
        )
      })}
    </div>
  )
}
