import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Corner Fold Button.
 *
 * The fold is two triangles growing together from the top-right corner:
 * an "underside" (darker) and a "flap" (lighter, with the fold gradient).
 * Both are clip-path'd squares whose size springs 0 → 44px on hover —
 * animating clip-path avoids reflow entirely.
 */
export function CornerFoldButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-10">
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative rounded-xl border border-white/12 bg-surface px-9 py-4 text-sm font-medium text-white shadow-lg transition-colors hover:border-white/25"
      >
        Hover for the fold
        {/* fold shadow region */}
        <motion.span
          aria-hidden
          className="absolute right-0 top-0 bg-black/40"
          style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
          animate={{ width: hovered ? 44 : 0, height: hovered ? 44 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        />
        {/* the flap itself */}
        <motion.span
          aria-hidden
          className="absolute right-0 top-0 bg-gradient-to-br from-[#3d3d5c] to-[#23233a] shadow-[-2px_2px_6px_rgba(0,0,0,0.4)]"
          style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
          animate={{ width: hovered ? 44 : 0, height: hovered ? 44 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        />
      </button>
    </div>
  )
}
