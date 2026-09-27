/**
 * External link — two ↗ glyphs trade places on hover: one exits up-right,
 * its twin enters from down-left. An overflow clip makes it a clean swap.
 */
export function ExternalLinkHover() {
  return (
    <div className="p-6">
      <a href="#" onClick={(e) => e.preventDefault()} className="group inline-flex items-center gap-1 text-sm font-medium text-white">
        Docs
        <span className="relative inline-block h-4 w-4 overflow-hidden">
          <span className="absolute inset-0 grid place-items-center transition-transform duration-200 group-hover:translate-x-[6px] group-hover:-translate-y-[6px]">↗</span>
          <span className="absolute inset-0 grid -translate-x-[6px] translate-y-[6px] place-items-center transition-transform duration-200 group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
        </span>
      </a>
    </div>
  )
}

/**
 * Center-out underline — the rule blooms from the middle on hover
 * (origin-center scaleX), calmer than the usual left sweep.
 */
export function CenterUnderlineLink() {
  return (
    <div className="p-6">
      <a href="#" onClick={(e) => e.preventDefault()} className="group relative pb-0.5 text-sm text-white">
        Manifesto
        <span className="absolute bottom-0 left-1/2 h-px w-full origin-center -translate-x-1/2 scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
      </a>
    </div>
  )
}

/**
 * Wipe reveal — the top label is clipped away left-to-right on hover,
 * uncovering the alt line beneath. clip-path inset is fully animatable.
 */
export function WipeRevealLink() {
  return (
    <div className="p-6">
      <a href="#" onClick={(e) => e.preventDefault()} className="group relative inline-block text-sm font-semibold">
        <span className="text-fog">Free for open source</span>
        <span className="absolute inset-0 text-white transition-[clip-path] duration-300 [clip-path:inset(0_0_0_0)] group-hover:[clip-path:inset(0_100%_0_0)]">
          Pricing for teams
        </span>
      </a>
    </div>
  )
}

const CRUMBS = ['Home', 'Library', 'Buttons', 'Magnetic']

/**
 * Home breadcrumb — the final crumb is bold; intermediate crumbs lift and
 * brighten on hover while their chevrons nudge right.
 */
export function HomeChevronBreadcrumb() {
  return (
    <div className="flex flex-wrap items-center gap-1 p-6 font-mono text-xs">
      {CRUMBS.map((c, i) => (
        <span key={c} className="flex items-center gap-1">
          {i > 0 && <span className="text-fog transition-transform duration-150 group-hover:translate-x-0.5">›</span>}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`rounded px-1.5 py-0.5 transition-colors ${
              i === CRUMBS.length - 1 ? 'font-bold text-white' : 'text-fog hover:bg-white/5 hover:text-white'
            }`}
          >
            {i === 0 ? '⌂' : c}
          </a>
        </span>
      ))}
    </div>
  )
}
