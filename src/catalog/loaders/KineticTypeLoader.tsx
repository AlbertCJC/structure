/**
 * Kinetic Typography Loop — zero JS, pure CSS/SVG.
 *
 *  • Rotating disc: SVG <textPath> on a circle, spun with conic-spin
 *    (10s linear infinite). The string repeats so the loop point is
 *    invisible.
 *  • Vertical marquee: four identical lines inside a 2-line-tall mask;
 *    marquee-y translates exactly -50% of the content, so the wrap is
 *    seamless. The mask-image gradient feathers the top and bottom.
 */
export function KineticTypeLoader() {
  return (
    <div className="flex items-center gap-10">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full" style={{ animation: 'conic-spin 10s linear infinite' }}>
          <defs>
            <path id="kt-circle" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
          </defs>
          <text
            fill="#9ba0b5"
            fontSize="7.4"
            letterSpacing="2.1"
            style={{ fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase' }}
          >
            <textPath href="#kt-circle">structura · motion lab · structura ·</textPath>
          </text>
        </svg>
        <div className="absolute inset-0 m-auto h-3.5 w-3.5 animate-pulse rounded-full bg-fuchsia-400 shadow-[0_0_14px_3px_rgba(217,70,239,0.6)]" />
      </div>

      <div className="h-24 w-36 overflow-hidden [mask-image:linear-gradient(transparent,black_30%,black_70%,transparent)]">
        <div className="flex flex-col gap-1 font-mono text-[11px] tracking-[0.4em] text-mist" style={{ animation: 'marquee-y 2.6s linear infinite' }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="shrink-0">
              ASSEMBLING UI
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
