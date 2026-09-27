import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic Button.
 *
 * Physics: the pointer offset from the wrapper's center (px, py) is scaled
 * by a pull factor (0.35 / 0.5) and fed into springs with LOW damping
 * (14) and low mass (0.35) — the response overshoots slightly and settles,
 * which is the "snap" that reads as magnetism. The label runs its own,
 * stiffer spring (240/16) so it lags behind the shell → parallax depth.
 * The handler lives on the PADDING FIELD (p-12), not the button, so the
 * element is attracted *before* the cursor reaches it.
 */
export function MagneticButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.35 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.35 })
  // Label moves ~60% of the shell's displacement.
  const lx = useSpring(x, { stiffness: 240, damping: 16, mass: 0.25 })
  const ly = useSpring(y, { stiffness: 240, damping: 16, mass: 0.25 })

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.5)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div className="p-12" onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.button
        style={{ x: sx, y: sy }}
        className="relative rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-xl hover:shadow-violet-500/40"
      >
        <motion.span style={{ x: lx, y: ly }} className="block">
          Magnetic CTA
        </motion.span>
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-white/0 transition group-hover:bg-white/10" />
      </motion.button>
    </div>
  )
}
