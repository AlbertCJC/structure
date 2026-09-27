import { useState } from 'react'

/**
 * Stroke-to-Fill Text — glyphs start as outlines (-webkit-text-stroke,
 * transparent fill). On hover, a clipped gradient slides in from the left
 * via background-position + background-size choreography (pure CSS
 * transition — no JS animation), filling the letters like ink.
 */
export function StrokeFillText() {
  const [hovered, setHovered] = useState(false)

  return (
    <div className="p-8">
      <span
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-default select-none text-3xl font-extrabold tracking-tight"
        style={{
          WebkitTextStroke: '1.5px rgba(255,255,255,0.5)',
          color: 'transparent',
          backgroundImage: 'linear-gradient(90deg, #d946ef, #8b5cf6, #22d3ee)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          backgroundRepeat: 'no-repeat',
          backgroundSize: hovered ? '100% 100%' : '0% 100%',
          transition: 'background-size 0.7s cubic-bezier(0.6, 0, 0.2, 1)',
        }}
      >
        FILL ME
      </span>
      <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-fog">hover to flood</p>
    </div>
  )
}
