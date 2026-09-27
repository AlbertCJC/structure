import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

const PANELS = [
  { n: '01', t: 'Onboarding', d: 'Zero-config project scaffolding with team presets.', g: 'from-violet-500/30 to-fuchsia-500/10' },
  { n: '02', t: 'Analytics', d: 'Realtime dashboards with edge-side queries.', g: 'from-cyan-400/30 to-blue-500/10' },
  { n: '03', t: 'Automations', d: 'Trigger-driven pipelines, fully versioned.', g: 'from-lime-400/25 to-emerald-500/10' },
  { n: '04', t: 'Billing', d: 'Usage-based metering and one-click invoicing.', g: 'from-amber-400/25 to-orange-500/10' },
  { n: '05', t: 'Settings', d: 'Granular roles, SSO, and immutable audit logs.', g: 'from-fuchsia-400/25 to-pink-500/10' },
]

/**
 * Horizontal Scroll Hijack (GSAP).
 *
 * The card owns its own scroll surface: a `w-max` track wider than the
 * sandbox. Both input sources — WHEEL (non-passive listener so we can
 * preventDefault and eat the page scroll) and POINTER DRAG — are remapped
 * onto the progress of ONE paused GSAP x-tween (ease: 'none', duration 1 →
 * progress is linear distance). Because every input goes through
 * tween.progress(), the motion is always perfectly smooth and never
 * accumulates state; the progress bar is driven by the tween's onUpdate.
 *
 * Cleanup: the wheel/pointer listeners are removed and the tween killed on
 * unmount (important — the card can leave the grid via filters).
 */
export function HorizontalScrollHijack() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const track = root.querySelector<HTMLElement>('.hs-track')
    const bar = root.querySelector<HTMLElement>('.hs-bar')
    if (!track || !bar) return

    const maxScroll = () => Math.max(track.scrollWidth - root.clientWidth, 1)

    const tween = gsap.to(track, {
      x: () => -maxScroll(),
      ease: 'none',
      duration: 1,
      paused: true,
      onUpdate: () => {
        bar.style.transform = `scaleX(${tween.progress()})`
      },
    })

    const onWheel = (e: WheelEvent) => {
      e.preventDefault() // THIS is the hijack — the page never scrolls
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      tween.progress(Math.min(1, Math.max(0, tween.progress() + d / maxScroll())))
    }

    let dragging = false
    let startX = 0
    let startP = 0
    const onDown = (e: PointerEvent) => {
      dragging = true
      startX = e.clientX
      startP = tween.progress()
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      tween.progress(Math.min(1, Math.max(0, startP + (startX - e.clientX) / maxScroll())))
    }
    const onUp = () => {
      dragging = false
    }

    root.addEventListener('wheel', onWheel, { passive: false })
    root.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    return () => {
      root.removeEventListener('wheel', onWheel)
      root.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      tween.kill()
    }
  }, [])

  return (
    <div ref={rootRef} className="relative h-full w-full cursor-grab select-none overflow-hidden active:cursor-grabbing">
      <div className="hs-track flex h-full w-max items-center gap-5 px-8">
        {PANELS.map((p) => (
          <div
            key={p.n}
            className={`relative flex h-44 w-60 shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.g} bg-abyss p-5`}
          >
            <span className="font-mono text-[10px] text-white/50">{p.n}</span>
            <div>
              <p className="text-base font-bold text-white">{p.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-mist">{p.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-3 left-8 right-8 h-0.5 overflow-hidden rounded-full bg-white/10">
        <div className="hs-bar h-full origin-left bg-gradient-to-r from-violet-400 to-cyan-300" style={{ transform: 'scaleX(0)' }} />
      </div>
      <span className="absolute right-3 top-3 rounded-md border border-white/10 bg-void/70 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mist backdrop-blur">
        wheel / drag →
      </span>
    </div>
  )
}
