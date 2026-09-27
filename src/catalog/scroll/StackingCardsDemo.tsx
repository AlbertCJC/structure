import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

const SLIDES = [
  { n: '01', t: 'Pin the context', d: 'This panel pins while the next one slides in over it.', g: 'from-violet-500/20' },
  { n: '02', t: 'Layer the story', d: 'Each card scales down as it yields — pure scrub, zero scroll math.', g: 'from-cyan-400/20' },
  { n: '03', t: 'Own the scroll', d: 'The scroller is this card; the page scroll is never touched.', g: 'from-lime-400/15' },
  { n: '04', t: 'Ship the pattern', d: 'GSAP ScrollTrigger + position: sticky. That is the whole trick.', g: 'from-fuchsia-500/20' },
]

/**
 * Sticky Stacking Cards (GSAP ScrollTrigger).
 *
 * The sandbox IS the scroller (overflow-y-auto). Each slide is a
 * `position: sticky; top: 3px` panel, so they physically stack as you
 * scroll — later slides paint over earlier ones via z-index.
 *
 * ScrollTrigger then SCRUBS a scale/opacity tween on each card, mapped to
 * the next card's journey from "entering the scroller's bottom" to "fully
 * pinned":
 *    trigger: next card · start: 'top bottom' · end: 'top top'
 * scrub: 0.3 adds a tiny smoothing so the shrink feels weighted.
 *
 * Cleanup is via gsap.context — ctx.revert() kills every tween and trigger
 * scoped to the scroller when the card unmounts from the grid.
 */
export function StackingCardsDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card', scroller)
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.fromTo(
          card,
          { scale: 1, opacity: 1 },
          {
            scale: 0.92,
            opacity: 0.55,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: next,
              scroller,
              start: 'top bottom',
              end: 'top top',
              scrub: 0.3,
            },
          },
        )
      })
    }, scroller)

    // Re-measure once fonts/layout have settled (sandbox height is fixed,
    // but the grid's enter animation can still shift things on mount).
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      window.clearTimeout(t)
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={scrollerRef}
      className="h-full w-full overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex h-[38%] items-center justify-center">
        <span className="animate-bounce font-mono text-[10px] uppercase tracking-[0.3em] text-fog">scroll inside ↓</span>
      </div>

      {SLIDES.map((s, i) => (
        <div key={s.n} className="sticky top-3 px-4" style={{ zIndex: i + 1, marginBottom: '12%' }}>
          <div
            className={`stack-card flex h-44 flex-col justify-between rounded-2xl border border-white/12 bg-gradient-to-br ${s.g} to-abyss bg-abyss p-5 backdrop-blur-md`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-white/50">{s.n}</span>
              <span className="font-mono text-[10px] text-fog">GSAP · ScrollTrigger</span>
            </div>
            <div>
              <p className="text-base font-bold text-white">{s.t}</p>
              <p className="mt-1 max-w-[42ch] text-xs leading-relaxed text-mist">{s.d}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="h-[30%]" />
    </div>
  )
}
