/**
 * Radar Sweep — a conic-gradient sweep (existing conic-spin keyframe)
 * rotates over three concentric rings. Blips blink on independent clocks
 * (twinkle with different delays), and the sweep's leading edge is the
 * bright stop of the gradient itself.
 */
export function RadarSweepLoader() {
  return (
    <div className="relative h-32 w-32 rounded-full border border-lime-400/25 bg-[#060b06]">
      {[22, 44, 64].map((inset) => (
        <div key={inset} className="absolute rounded-full border border-lime-400/15" style={{ inset }} />
      ))}
      <div className="absolute left-1/2 top-1/2 h-px w-1/2 origin-left bg-lime-400/10" />
      <div className="absolute left-1/2 top-0 h-full w-px bg-lime-400/10" style={{ transform: 'translateX(-50%) rotate(90deg)' }} />

      {/* sweep */}
      <div
        className="absolute inset-0 overflow-hidden rounded-full"
        style={{ animation: 'conic-spin 2.6s linear infinite' }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'conic-gradient(from 0deg, rgba(163,230,53,0.5), rgba(163,230,53,0.08) 70deg, transparent 90deg)' }}
        />
      </div>

      {/* contacts */}
      <span className="absolute left-[30%] top-[38%] h-1.5 w-1.5 rounded-full bg-lime-300" style={{ animation: 'twinkle 2.6s ease-in-out infinite' }} />
      <span className="absolute left-[62%] top-[58%] h-1.5 w-1.5 rounded-full bg-lime-300" style={{ animation: 'twinkle 2.6s ease-in-out 1.1s infinite' }} />
      <span className="absolute left-[48%] top-[24%] h-1 w-1 rounded-full bg-lime-200" style={{ animation: 'twinkle 2.6s ease-in-out 1.9s infinite' }} />
    </div>
  )
}
