import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const APPS = [
  { icon: '🎨', label: 'Design' },
  { icon: '⚡', label: 'Motion' },
  { icon: '🧩', label: 'Structura' },
  { icon: '📦', label: 'Packages' },
  { icon: '🔧', label: 'Config' },
  { icon: '🚀', label: 'Deploy' },
  { icon: '🗂️', label: 'Files' },
]

const ICON_W = 52
const GAP = 6
const PAD = 12
const SIGMA = 110 // Gaussian width — how far the magnification reaches

/**
 * Dock Magnifier — the macOS dock formula. mousemove stores the cursor's
 * dock-LOCAL x (measured via ref, no DOM queries in render); each icon
 * then evaluates a Gaussian bump of its distance from the cursor:
 *
 *   scale = 1 + 0.65·e^(−d²/2σ²)      lift = 14·e^(−d²/2σ²)
 *
 * The per-icon springs (400/28) smooth the discrete mousemove stream.
 * Leaving the dock nulls the cursor → every transform eases to identity.
 */
export function DockMagnifier() {
  const dockRef = useRef<HTMLDivElement>(null)
  const [mx, setMx] = useState<number | null>(null)

  return (
    <div className="flex h-full w-full items-end justify-center pb-5">
      <div
        ref={dockRef}
        onMouseMove={(e) => {
          const r = dockRef.current?.getBoundingClientRect()
          if (r) setMx(e.clientX - r.left)
        }}
        onMouseLeave={() => setMx(null)}
        className="flex items-end gap-1.5 rounded-2xl border border-white/12 bg-white/[0.06] p-3 backdrop-blur-md"
      >
        {APPS.map((app, i) => {
          let scale = 1
          let lift = 0
          if (mx !== null) {
            const center = PAD + i * (ICON_W + GAP) + ICON_W / 2
            const d = mx - center
            const bump = Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
            scale = 1 + 0.65 * bump
            lift = 14 * bump
          }
          return (
            <motion.button
              key={app.label}
              title={app.label}
              animate={{ scale, y: -lift }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="grid h-[52px] w-[52px] place-items-center rounded-xl bg-gradient-to-br from-white/12 to-white/[0.04] text-2xl shadow-md"
            >
              {app.icon}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
