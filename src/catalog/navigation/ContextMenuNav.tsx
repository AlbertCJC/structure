import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ACTIONS = [
  { icon: '✎', label: 'Rename' },
  { icon: '⧉', label: 'Duplicate' },
  { icon: '⇪', label: 'Export' },
  { icon: '✕', label: 'Delete', danger: true },
]

/**
 * Right-Click Context Menu.
 *
 * contextmenu is intercepted inside the stage; the menu blooms at the
 * exact pointer coordinate, scaling from its top-left origin. Edge-flip:
 * if the click lands in the right/bottom half, the transform origin and
 * offset flip so the menu never clips. Any click elsewhere closes it.
 */
export function ContextMenuNav() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = () => setMenu(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  const onContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    const r = stageRef.current?.getBoundingClientRect()
    if (!r) return
    setMenu({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const flipX = menu !== null && menu.x > 130
  const flipY = menu !== null && menu.y > 110

  return (
    <div
      ref={stageRef}
      onContextMenu={onContextMenu}
      className="relative h-full w-full select-none overflow-hidden"
    >
      <div className="grid h-full place-items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">right-click anywhere in this stage</p>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 480, damping: 30 }}
            style={{
              left: flipX ? undefined : menu.x,
              right: flipX ? stageRef.current!.clientWidth - menu.x : undefined,
              top: flipY ? undefined : menu.y,
              bottom: flipY ? stageRef.current!.clientHeight - menu.y : undefined,
            }}
            className="absolute z-20 w-36 overflow-hidden rounded-xl border border-white/12 bg-panel/95 py-1 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.9)] backdrop-blur-md"
          >
            {ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={(e) => {
                  e.stopPropagation()
                  setMenu(null)
                }}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-xs transition ${
                  a.danger ? 'text-red-300 hover:bg-red-500/10' : 'text-mist hover:bg-white/[0.07] hover:text-white'
                }`}
              >
                <span className="w-4 text-center">{a.icon}</span>
                {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
