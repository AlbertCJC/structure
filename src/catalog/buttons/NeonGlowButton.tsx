/**
 * Neon Glow Button — pure CSS (see .neon-btn in index.css).
 *
 * Three stacked shadows do the work: an inset glow (the glass of the
 * sign), an outer bloom, and a text-shadow for the tube itself. The
 * neon-flicker keyframe hits near-random opacity dips at 19% / 23% / 54%
 * of the cycle — irregular enough to feel electrical, regular enough to
 * feel designed.
 */
export function NeonGlowButton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <button className="neon-btn rounded-lg px-10 py-4 text-sm font-bold uppercase">PWR ON</button>
      <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-200/40">grid link · stable</p>
    </div>
  )
}
