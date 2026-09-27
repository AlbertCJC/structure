import { useState } from 'react'

const WORDS = ['STRUCTURA', 'MOTION', 'REACT', 'GSAP', 'FRAMER', 'ZUSTAND', 'TAILWIND']

/**
 * Infinite Marquee Band — two identical word rows inside a w-max strip;
 * translating exactly -50% wraps seamlessly (marquee-y is reused on X via
 * a dedicated keyframe below the component). Hover drops the animation
 * duration multiplier → the band eases to a stop, then speeds back up.
 */
export function MarqueeBand() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full overflow-hidden border-y border-white/10 bg-panel py-3"
    >
      <div
        className="flex w-max items-center gap-8"
        style={{ animation: 'marquee-x 16s linear infinite', animationPlayState: hovered ? 'paused' : 'running' }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8">
            {WORDS.map((w) => (
              <span key={`${half}-${w}`} className="flex items-center gap-8 whitespace-nowrap font-mono text-sm font-bold tracking-[0.3em] text-mist">
                {w} <span className="text-violet-400">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
