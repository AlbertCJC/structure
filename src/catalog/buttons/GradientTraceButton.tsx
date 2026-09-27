/**
 * Gradient Trace Button.
 *
 * An oversized conic-gradient disc (inset -150% → 4× the button) spins
 * behind a rounded, overflow-hidden wrapper with a 1.5px padding ring.
 * Because the disc is far larger than the visible area, the rotating
 * gradient always paints the border edge — the visible result is a comet
 * tail of violet→fuchsia→cyan tracing the perimeter. Hover scales the
 * button 3% and lets the shadow breathe.
 */
export function GradientTraceButton() {
  return (
    <div className="p-6">
      <div className="group relative overflow-hidden rounded-2xl p-[1.5px]">
        <div
          aria-hidden
          className="absolute -inset-[150%]"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, #8b5cf6 80deg, #d946ef 160deg, transparent 240deg, #22d3ee 320deg, transparent 360deg)',
            animation: 'conic-spin 4s linear infinite',
          }}
        />
        <button className="relative block rounded-[13.5px] bg-abyss px-9 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-violet-500/0 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-violet-500/25">
          Trace the border
        </button>
      </div>
    </div>
  )
}
