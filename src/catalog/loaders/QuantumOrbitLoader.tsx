import type { CSSProperties } from 'react'

/**
 * Quantum 3D Orbits — three CSS-3D ring systems, no JS.
 *
 * Each ring is a flat circle (border) that is TILTED on X (rotateX --tilt)
 * and then continuously SPUN on its own normal (rotateZ 0→1turn) — see the
 * orbit-tilt keyframes. The electron sits at the rim (top center); as the
 * system rotates, it rides the tilted ellipse. Different tilts, radii,
 * periods and directions keep the three orbits from ever phase-locking.
 */
const RINGS = [
  { tilt: 66, inset: '0px', dur: 4.5, reverse: false, color: '#22d3ee' },
  { tilt: 80, inset: '16px', dur: 6.5, reverse: true, color: '#d946ef' },
  { tilt: 50, inset: '32px', dur: 8.5, reverse: false, color: '#a3e635' },
]

export function QuantumOrbitLoader() {
  return (
    <div className="relative h-40 w-40 [perspective:520px]">
      {/* nucleus */}
      <div
        className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_20px_6px_rgba(34,211,238,0.55)]"
        style={{ animation: 'twinkle 2.2s ease-in-out infinite' }}
      />
      {RINGS.map((r, i) => (
        <div
          key={i}
          className="absolute"
          style={
            {
              inset: r.inset,
              transformStyle: 'preserve-3d',
              animation: `orbit-tilt ${r.dur}s linear infinite ${r.reverse ? 'reverse' : ''}`,
              '--tilt': `${r.tilt}deg`,
            } as CSSProperties
          }
        >
          <div className="absolute inset-0 rounded-full border border-white/12" />
          <div
            className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: r.color, boxShadow: `0 0 12px 2px ${r.color}99` }}
          />
        </div>
      ))}
    </div>
  )
}
