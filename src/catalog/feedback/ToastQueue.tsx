import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'

interface Toast {
  id: number
  title: string
  msg: string
  color: string
  icon: string
}

const CYCLE: Omit<Toast, 'id'>[] = [
  { title: 'Deploy complete', msg: 'v2.4.1 is live on edge', color: '#a3e635', icon: '✓' },
  { title: 'Sync started', msg: 'Pulling 1,204 records…', color: '#22d3ee', icon: 'ℹ' },
  { title: 'Build failed', msg: 'TS2339 in grid.module.ts', color: '#f43f5e', icon: '✕' },
]

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 3800

/**
 * Toast Queue + Swipe.
 *
 * Queue state: a capped array (MAX_TOASTS) — pushing past the cap drops the
 * OLDEST entry, so the newest three are always visible and the layout
 * `layout` prop re-stacks them with a spring.
 *
 * Dismiss physics: each toast drags on X with dragConstraints {0,0} +
 * dragElastic 0.7 — it always wants to spring back, but on dragEnd we
 * measure the FLICK (offset > 110px or velocity > 900px/s) and remove it;
 * the exit is a sideways scale/fade, so a successful swipe "throws" the
 * toast out. Timers for auto-dismiss are tracked in a Set and cleared on
 * unmount (no zombie timeouts after the card exits the grid).
 */
export function ToastQueue() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)
  const timers = useRef(new Set<number>())

  useEffect(() => {
    const t = timers.current
    return () => t.forEach((id) => window.clearTimeout(id))
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  const push = () => {
    const template = CYCLE[nextId.current % CYCLE.length]
    const toast: Toast = { ...template, id: nextId.current++ }
    setToasts((prev) => [...prev.slice(-(MAX_TOASTS - 1)), toast])
    const timer = window.setTimeout(() => dismiss(toast.id), AUTO_DISMISS_MS)
    timers.current.add(timer)
  }

  const onDragEnd = (t: Toast, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 900) dismiss(t.id)
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <button
        onClick={push}
        className="rounded-lg border border-white/15 bg-raise px-4 py-2 text-xs font-medium text-white transition hover:border-violet-400/50 hover:bg-raise/80"
      >
        + Trigger notification
      </button>

      <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 140, scale: 0.9, transition: { duration: 0.25 } }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => onDragEnd(t, info)}
              className="flex cursor-grab items-center gap-3 rounded-xl border bg-panel/95 p-3 backdrop-blur active:cursor-grabbing"
              style={{ borderColor: `${t.color}44` }}
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-bold"
                style={{ background: `${t.color}1f`, color: t.color, border: `1px solid ${t.color}44` }}
              >
                {t.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold text-white">{t.title}</span>
                <span className="block truncate text-[11px] text-mist">{t.msg}</span>
              </span>
              <span className="select-none text-fog" aria-hidden>
                ⋮⋮
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
