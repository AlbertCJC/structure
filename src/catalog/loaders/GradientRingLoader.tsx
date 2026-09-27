/**
 * Gradient Ring Spinner — a conic disc masked into a 3px ring. The mask is
 * a radial gradient that keeps only the outer band, so the spinner is one
 * rotating element with no SVG at all. conic-spin runs on the compositor.
 */
export function GradientRingLoader() {
  return (
    <div className="relative h-20 w-20">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent 12%, #8b5cf6 55%, #22d3ee 78%, transparent 100%)',
          animation: 'conic-spin 1.2s linear infinite',
          maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))',
          WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px))',
        }}
      />
      <div className="absolute inset-[7px] grid place-items-center rounded-full border border-white/5">
        <span className="font-mono text-[10px] text-fog">42%</span>
      </div>
    </div>
  )
}
