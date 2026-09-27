import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

/**
 * Parallax Depth Layers (GSAP).
 *
 * Four absolute planes (star field → aurora blobs → glass panels → near
 * orb) each get a pair of gsap.quickTo steers. quickTo is fire-and-forget:
 * it retargets the in-flight tween in ~0ms, which is exactly what continuous
 * pointer input needs (no tween pile-up, 60fps friendly).
 *
 * Depth = index * 10px: the farthest plane drifts 10px, the nearest surges
 * 40px — the differential IS the parallax. mouseleave steers everything
 * home; unmount kills the tweens and resets transforms (no orphan tweens
 * after the card leaves the grid).
 */
export function ParallaxDepthLayers() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const layers = Array.from(root.querySelectorAll<HTMLElement>('.plx-layer'))
    // quickTo returns a callable steer (QuickToFunc) — no kill() on its type,
    // so cleanup reaps its internal tweens per target via killTweensOf.
    const steers = layers.map((el) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3' }),
    }))

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      layers.forEach((_, i) => {
        const depth = (i + 1) * 10
        steers[i].x(-nx * depth)
        steers[i].y(-ny * depth)
      })
    }
    const onLeave = () => {
      steers.forEach((s) => {
        s.x(0)
        s.y(0)
      })
    }

    root.addEventListener('mousemove', onMove)
    root.addEventListener('mouseleave', onLeave)
    return () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('mouseleave', onLeave)
      layers.forEach((el) => gsap.killTweensOf(el))
      layers.forEach((el) => gsap.set(el, { x: 0, y: 0 }))
    }
  }, [])

  return (
    <div ref={rootRef} className="relative h-full w-full overflow-hidden">
      {/* plane 0 — farthest: star field */}
      <div className="plx-layer absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${(i * 41) % 100}%`,
              top: `${(i * 29) % 100}%`,
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
            }}
          />
        ))}
      </div>

      {/* plane 1 — aurora blobs */}
      <div className="plx-layer absolute inset-0">
        <div className="absolute left-[12%] top-[18%] h-24 w-24 rounded-full bg-violet-500/40 blur-2xl" />
        <div className="absolute right-[16%] top-[30%] h-20 w-20 rounded-full bg-cyan-400/30 blur-2xl" />
      </div>

      {/* plane 2 — glass panels */}
      <div className="plx-layer absolute inset-0">
        <div className="absolute left-[16%] top-[38%] h-16 w-28 rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-[2px]" />
        <div className="absolute right-[18%] top-[28%] h-14 w-24 rounded-xl border border-white/15 bg-white/[0.05] backdrop-blur-[2px]" />
      </div>

      {/* plane 3 — nearest orb */}
      <div className="plx-layer absolute inset-0">
        <div className="absolute bottom-[16%] left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_40px_8px_rgba(139,92,246,0.4)]" />
      </div>

      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-void/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mist backdrop-blur">
        move pointer · 4 depth planes
      </span>
    </div>
  )
}
