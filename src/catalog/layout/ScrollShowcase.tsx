const ROW = ['buttons ✦', 'loaders ✦', 'toggles ✦', 'menus ✦', 'cards ✦', 'charts ✦']

/**
 * Dual counter-marquee — two rows drift in opposite directions; the -50%
 * loop works because each track carries exactly one duplicate.
 */
export function DualCounterMarquee() {
  return (
    <div className="w-60 space-y-2 overflow-hidden p-6" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)' }}>
      {[1, -1].map((dir) => (
        <div key={dir} className="flex w-max gap-2 whitespace-nowrap" style={{ animation: `counterMarquee 9s linear infinite ${dir === -1 ? 'reverse' : ''}` }}>
          <style>{`@keyframes counterMarquee{to{transform:translateX(-50%)}}`}</style>
          {[...ROW, ...ROW].map((t, i) => (
            <span key={i} className="rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-fog">
              {t}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

const CHIPS = ['spring', 'stagger', 'layoutId', 'popLayout', 'motion', 'whileInView', 'variants', 'wAAPI', 'exit', 'keyframes']

/**
 * Vertical chip marquee — chips scroll up in an infinite column; the same
 * -50% trick, rotated 90°.
 */
export function VerticalChipMarquee() {
  return (
    <div className="h-32 w-40 overflow-hidden p-6 pl-8" style={{ maskImage: 'linear-gradient(180deg,transparent,#000 15%,#000 85%,transparent)', WebkitMaskImage: 'linear-gradient(180deg,transparent,#000 15%,#000 85%,transparent)' }}>
      <div className="flex w-max flex-col gap-1.5" style={{ animation: 'vertMarquee 7s linear infinite' }}>
        <style>{`@keyframes vertMarquee{to{transform:translateY(-50%)}}`}</style>
        {[...CHIPS, ...CHIPS].map((c, i) => (
          <span key={i} className="w-fit rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] text-fog">
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}

const CARDS = ['Release', 'Roadmap', 'Changelog', 'Blog', 'Docs', 'API']

/**
 * Hover-pause autoscroll — cards drift endlessly; holding the cursor over
 * them pauses the play-state so you can actually read.
 */
export function PauseHoverAutoscroll() {
  return (
    <div className="group w-56 overflow-hidden p-6" style={{ maskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)' }}>
      <div className="flex w-max gap-2 group-hover:[animation-play-state:paused]" style={{ animation: 'autoscrollX 10s linear infinite' }}>
        <style>{`@keyframes autoscrollX{to{transform:translateX(-50%)}}`}</style>
        {[...CARDS, ...CARDS].map((c, i) => (
          <div key={i} className="grid h-16 w-24 shrink-0 place-items-center rounded-xl border border-white/12 bg-panel text-[10px] font-medium text-white">
            {c} ↗
          </div>
        ))}
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-fog">hover to pause</p>
    </div>
  )
}

const CLOUD = ['hover', 'tap', 'drag', 'scroll', 'focus', 'mount', 'exit', 'layout']

/**
 * Floating chip cloud — every chip bobs on its own phase-offset sine, so
 * the cloud feels weightless instead of synchronized.
 */
export function FloatingChipCloud() {
  return (
    <div className="flex h-28 w-56 flex-wrap content-center justify-center gap-1.5 p-4">
      {CLOUD.map((w, i) => (
        <span key={w} className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[10px] text-mist" style={{ animation: `chipFloat ${2.4 + (i % 3) * 0.7}s ease-in-out ${i * 0.25}s infinite` }}>
          <style>{`@keyframes chipFloat{50%{transform:translateY(-6px)}}`}</style>
          {w}
        </span>
      ))}
    </div>
  )
}
