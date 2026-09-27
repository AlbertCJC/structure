import { useState } from 'react'
import { motion } from 'framer-motion'

const SWATCHES = ['#8b5cf6', '#d946ef', '#22d3ee', '#a3e635', '#fbbf24', '#fb7185', '#f8fafc']

/**
 * Swatch Color Picker — the selection ring is one layoutId element that
 * springs between swatches. The hue slider drives a live gradient chip so
 * custom colors feel first-class next to the presets.
 */
export function ColorSwatchPicker() {
  const [picked, setPicked] = useState(2)
  const [hue, setHue] = useState(265)

  return (
    <div className="flex w-full max-w-[230px] flex-col gap-5 p-4">
      <div className="flex items-center justify-between rounded-xl border border-line bg-panel p-3">
        <div className="flex gap-2">
          {SWATCHES.map((c, i) => (
            <button key={c} onClick={() => setPicked(i)} className="relative grid h-7 w-7 place-items-center">
              {picked === i && (
                <motion.span
                  layoutId="swatch-ring"
                  className="absolute -inset-0.5 rounded-full border-2 border-white/80"
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                />
              )}
              <span className="h-5 w-5 rounded-full shadow-inner" style={{ background: c }} />
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-line bg-panel p-3">
        <input
          type="range"
          min={0}
          max={360}
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{ background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}
        />
        <div className="mt-3 flex items-center gap-3">
          <motion.div
            animate={{ background: `linear-gradient(135deg, hsl(${hue} 90% 62%), hsl(${(hue + 60) % 360} 90% 55%))` }}
            className="h-9 w-9 rounded-lg shadow-lg"
          />
          <span className="font-mono text-[11px] text-mist">hsl({hue}, 90%, 60%)</span>
        </div>
      </div>
    </div>
  )
}
