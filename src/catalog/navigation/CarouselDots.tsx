import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Morphing Carousel Dots — the active dot stretches into a pill via one
 * layoutId element; autoplay advances every 1.8s unless the user clicked
 * recently (interaction pauses autoplay for one cycle — feels respectful).
 */
export function CarouselDots() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const iv = window.setInterval(() => setActive((a) => (a + 1) % 5), 1800)
    return () => window.clearInterval(iv)
  }, [paused])

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* faux slide viewport */}
      <div className="relative h-16 w-52 overflow-hidden rounded-xl border border-white/10 bg-panel">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 grid place-items-center font-mono text-xs text-mist"
            animate={{ x: `${(i - active) * 100}%` }}
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg">{['◐', '◑', '◒', '◓', '●'][i]}</span>
              slide {i + 1}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => {
              setActive(i)
              setPaused(true)
              window.setTimeout(() => setPaused(false), 2000)
            }}
            className="h-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            <motion.span
              layoutId="carousel-dot"
              animate={{ width: active === i ? 22 : 8, backgroundColor: active === i ? '#e879f9' : 'rgba(255,255,255,0.2)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="block h-2 rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
